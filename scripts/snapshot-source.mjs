import {createHash} from 'node:crypto';

export function fingerprint(html,media,manifest){
  const sorted=value=>Object.entries(value).sort(([a],[b])=>a<b?-1:a>b?1:0);
  return createHash('sha256').update(JSON.stringify([html,sorted(media),sorted(manifest)])).digest('hex');
}

export function requireLiveResponse(response){
  if(!response.ok)throw new Error('Library unavailable: '+response.status);
  if(response.headers.get('x-portfolio-origin')==='github-pages'){
    throw new Error('Library is offline; refusing to export the fallback as a fresh snapshot');
  }
}
