export async function generatedPath(pathname){
  const canonical=pathname.replace('/p/portfolio/assets/','/p/portfolio/_assets/');
  if(!/^\/p\/portfolio\/(?:_assets\/|ref\/[0-9a-f]+\/).+\.[a-z0-9]{1,8}$/i.test(canonical))return null;
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(canonical));
  const hash=[...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('').slice(0,16);
  const basename=decodeURIComponent(canonical.slice(canonical.lastIndexOf('/')+1)).replace(/[^a-zA-Z0-9._-]/g,'-');
  return '/p/portfolio/_snapshot/files/'+hash+'-'+basename;
}
