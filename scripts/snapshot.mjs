import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';
import {requireLiveResponse,fingerprint} from './snapshot-source.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const origin='https://pub.hugoborges.dev.br';
const source=origin+'/p/portfolio/content';
const prefix='/p/portfolio/_snapshot';
const stage=path.join(root,'.snapshot-stage');
const manifest={};
const mediaHashes={};
const pending=new Map();
let total=0;

async function download(input){
  const url=new URL(input,source);
  if(url.origin!==origin)return input;
  if(!url.pathname.startsWith('/p/portfolio/'))throw new Error('Unexpected Library dependency: '+url.pathname);
  url.hash='';
  if(pending.has(url.href))return pending.get(url.href);
  const promise=(async()=>{
    const response=await fetch(url,{signal:AbortSignal.timeout(90000)});
    requireLiveResponse(response);
    if((response.headers.get('content-type')||'').includes('text/html'))throw new Error('Expected media, received HTML: '+url.pathname);
    const bytes=Buffer.from(await response.arrayBuffer());
    if(bytes.length>95*1024*1024)throw new Error('Asset too large for ordinary Git storage: '+url.pathname);
    total+=bytes.length;
    if(total>900*1024*1024)throw new Error('Snapshot exceeds site size budget');
    const filename=crypto.createHash('sha256').update(url.pathname).digest('hex').slice(0,16)+'-'+decodeURIComponent(path.basename(url.pathname)).replace(/[^a-zA-Z0-9._-]/g,'-');
    const target=prefix+'/files/'+filename;
    mediaHashes[target]=crypto.createHash('sha256').update(bytes).digest('hex');
    await fs.writeFile(path.join(stage,target),bytes);
    manifest[url.pathname]=target;
    if(url.pathname.includes('/_assets/'))manifest[url.pathname.replace('/_assets/','/assets/')]=target;
    console.log(JSON.stringify({asset:url.pathname,bytes:bytes.length}));
    return target;
  })();
  pending.set(url.href,promise);
  return promise;
}

function decodeEmail(value){
  const key=parseInt(value.slice(0,2),16);
  return (value.slice(2).match(/../g)||[]).map(x=>String.fromCharCode(parseInt(x,16)^key)).join('');
}

async function rewriteHtml(html,base,fragment=false){
  const $=load(html,{decodeEntities:false},!fragment);
  $('script[src*="cloudflareinsights"],script[src*="/cdn-cgi/"]').remove();
  $('a[href*="/cdn-cgi/l/email-protection"]').each((_,element)=>{
    const el=$(element), encoded=el.attr('href').split('#')[1]||el.find('[data-cfemail]').attr('data-cfemail');
    if(encoded){const email=decodeEmail(encoded);el.attr('href','mailto:'+email);el.find('[data-cfemail]').replaceWith(email);}
  });
  for(const el of $('[src],[poster],[data-anim],[href],[srcset]').toArray()){
    for(const attr of ['src','poster','data-anim','href']){
      const value=$(el).attr(attr);
      if(!value||value.startsWith('#')||/^(data:|mailto:|javascript:)/.test(value))continue;
      const url=new URL(value,base);
      if(url.origin!==origin)continue;
      if(attr==='href'&&!/\.(pdf|png|jpe?g|gif|webp|svg|mp4|webm)(?:$|\?)/i.test(url.pathname))continue;
      $(el).attr(attr,await download(url.href));
    }
    const srcset=$(el).attr('srcset');
    if(srcset){const parts=[];for(const item of srcset.split(',')){const [src,...size]=item.trim().split(/\s+/);parts.push([await download(new URL(src,base).href),...size].join(' '));}$(el).attr('srcset',parts.join(', '));}
  }
  return $.html();
}

async function main(){
  // Stage separately so a failed export cannot replace the last good snapshot.
  if(path.dirname(stage)!==root)throw new Error('Unsafe staging path');
  await fs.rm(stage,{recursive:true,force:true});
  await fs.mkdir(path.join(stage,prefix,'files'),{recursive:true});
  const response=await fetch(source,{signal:AbortSignal.timeout(60000)});
  requireLiveResponse(response);
  const live=await response.text();
  const $=load(live);
  const entries=$('#entries');
  if(entries.length!==1)throw new Error('Portfolio entries missing; refusing to publish an error page');
  const data=JSON.parse(entries.text());
  for(const group of ['projects','experience','courses']){
    for(const entry of data[group]||[]){
      for(const key of ['art','still'])if(entry.props?.[key]?.startsWith('_assets/'))entry.props[key]=await download(new URL(entry.props[key],source).href);
      if(entry.cover?.startsWith('/p/')||entry.cover?.startsWith('_assets/'))entry.cover=await download(new URL(entry.cover,source).href);
    }
  }
  for(const [id,doc] of Object.entries(data.docs||{})){
    const base=new URL(doc.base+'/',origin).href;
    for(const lang of ['en','pt'])if(doc[lang])doc[lang]=await rewriteHtml(doc[lang],base,true);
    if(id==='resume'){
      const nextBase=prefix+'/resume';
      await fs.mkdir(path.join(stage,nextBase),{recursive:true});
      for(const name of ['hugo-uchoas-borges-resume-en.pdf','hugo-uchoas-borges-curriculo-pt.pdf']){
        const original=new URL(name,base);
        const local=await download(original.href);
        await fs.copyFile(path.join(stage,local),path.join(stage,nextBase,name));
        manifest[original.pathname]=nextBase+'/'+name;
      }
      doc.base=nextBase;
    }
  }
  entries.text(JSON.stringify(data).replace(/</g,'\\u003c'));
  const html=await rewriteHtml($.html(),source);
  const contentHash=fingerprint(html,mediaHashes,manifest);
  let previous;
  try{previous=JSON.parse(await fs.readFile(path.join(root,'site','snapshot.json'),'utf8'));}
  catch(error){if(error.code!=='ENOENT')throw error;}
  if(previous?.contentHash===contentHash){
    await fs.rm(stage,{recursive:true,force:true});
    if(process.env.GITHUB_OUTPUT)await fs.appendFile(process.env.GITHUB_OUTPUT,'changed=false\n');
    console.log(JSON.stringify({done:true,changed:false,contentHash}));
    return;
  }
  await fs.writeFile(path.join(stage,'index.html'),html);
  await fs.writeFile(path.join(stage,'.nojekyll'),'');
  await fs.writeFile(path.join(stage,'snapshot.json'),JSON.stringify({source:origin+'/p/portfolio',generated:new Date().toISOString(),contentHash,assets:Object.keys(manifest).length,mediaBytes:total,projects:data.projects.length,documents:Object.keys(data.docs).length},null,2)+'\n');
  const site=path.join(root,'site');
  if(path.dirname(site)!==root||path.dirname(stage)!==root)throw new Error('Unsafe output path');
  await fs.rm(site,{recursive:true,force:true});
  await fs.rename(stage,site);
  await fs.writeFile(path.join(root,'fallback','manifest.mjs'),'export default '+JSON.stringify(manifest,null,2)+';\n');
  if(process.env.GITHUB_OUTPUT)await fs.appendFile(process.env.GITHUB_OUTPUT,'changed=true\n');
  console.log(JSON.stringify({done:true,changed:true,files:pending.size,mediaBytes:total,contentHash}));
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
