import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../site');
const types={'.html':'text/html; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.pdf':'application/pdf','.mp4':'video/mp4','.json':'application/json'};
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const bytes=await fs.readFile(file);
    res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','content-length':bytes.length});
    res.end(req.method==='HEAD'?undefined:bytes);
  }catch{res.writeHead(404).end('Not found');}
}).listen(8117,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:8117'));
