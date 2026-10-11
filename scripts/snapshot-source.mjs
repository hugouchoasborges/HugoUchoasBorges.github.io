export function requireLiveResponse(response){
  if(!response.ok)throw new Error('Library unavailable: '+response.status);
  if(response.headers.get('x-portfolio-origin')==='github-pages'){
    throw new Error('Library is offline; refusing to export the fallback as a fresh snapshot');
  }
}
