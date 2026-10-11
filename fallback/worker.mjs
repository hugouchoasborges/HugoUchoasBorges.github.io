import assets from './manifest.mjs';
import {generatedPath} from './asset-path.mjs';
const PREFIX='/p/portfolio';

export async function handle(request,env,fetcher=fetch){
  const url=new URL(request.url);
  const inScope=url.pathname===PREFIX || url.pathname.startsWith(PREFIX+'/');
  const readOnly=request.method==='GET'||request.method==='HEAD';
  if(!inScope||!readOnly)return fetcher(request);
  const snapshot=url.pathname.startsWith(PREFIX+'/_snapshot/');
  if(!snapshot){
    const abort=new AbortController();
    const timer=setTimeout(()=>abort.abort(),Number(env.TIMEOUT_MS||4500));
    try{
      // A Route fetch to its own hostname reaches the original origin.
      const live=await fetcher(new Request(request,{signal:abort.signal}),{cf:{cacheTtl:0}});
      if(live.status<500)return live;
      await live.body?.cancel();
    }catch(error){console.log(JSON.stringify({event:'portfolio-origin-unavailable',kind:error.name}));}
    finally{clearTimeout(timer);}
  }
  let path=snapshot?url.pathname:assets[url.pathname];
  if([PREFIX,PREFIX+'/',PREFIX+'/content'].includes(url.pathname))path='/index.html';
  if(!path)path=await generatedPath(url.pathname);
  if(!path)return new Response('Portfolio temporarily unavailable',{status:503,headers:{'retry-after':'30'}});
  const target=new URL(path,env.FALLBACK_ORIGIN);
  const headers=new Headers();
  for(const name of ['range','if-range','accept'])if(request.headers.has(name))headers.set(name,request.headers.get(name));
  try{
    const response=await fetcher(new Request(target,{method:request.method,headers,signal:AbortSignal.timeout(10000)}));
    const out=new Response(response.body,response);
    out.headers.set('x-portfolio-origin','github-pages');
    if(path==='/index.html')out.headers.set('cache-control','no-store');
    return out;
  }catch(error){
    console.log(JSON.stringify({event:'portfolio-fallback-unavailable',kind:error.name}));
    return new Response('Portfolio temporarily unavailable',{status:503,headers:{'retry-after':'30'}});
  }
}

export default {fetch(request,env){return handle(request,env);}};
