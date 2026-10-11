import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import worker, { handle } from '../fallback/worker.mjs';
const env = { FALLBACK_ORIGIN: 'https://hugouchoasborges.github.io', TIMEOUT_MS: '30' };
const request = path => new Request('https://pub.hugoborges.dev.br' + path);
test('Cloudflare entrypoint does not treat execution context as fetch', async () => {
  const previous=globalThis.fetch;
  globalThis.fetch=async()=>new Response('live');
  try{assert.equal(await (await worker.fetch(request('/p/portfolio'),env,{waitUntil(){}})).text(),'live');}
  finally{globalThis.fetch=previous;}
});

test('live response remains primary, without contacting GitHub', async () => {
  const calls=[];
  const response=await handle(request('/p/portfolio'),env,async req=>{calls.push(String(req.url||req));return new Response('live');});
  assert.equal(await response.text(),'live');
  assert.equal(calls.length,1);
});
test('offline or 5xx serves snapshot without changing public URL', async () => {
  for(const failure of ['throw',503]){
    const calls=[];
    const response=await handle(request('/p/portfolio/content'),env,async req=>{
      calls.push(String(req.url||req));
      if(calls.length===1){if(failure==='throw')throw new Error('offline');return new Response('down',{status:failure});}
      return new Response('snapshot');
    });
    assert.equal(await response.text(),'snapshot');
    assert.equal(calls[1],'https://hugouchoasborges.github.io/index.html');
    assert.equal(response.headers.get('x-portfolio-origin'),'github-pages');
  }
});
test('404 stays 404 and unrelated routes bypass fallback', async () => {
  let calls=0;
  const fetcher=async()=>{calls++;return new Response('not found',{status:404});};
  assert.equal((await handle(request('/p/portfolio/not-found'),env,fetcher)).status,404);
  assert.equal((await handle(request('/p/portfolio-other'),env,fetcher)).status,404);
  assert.equal(calls,2);
});
test('fallback does not forward cookies, authorization or POST to GitHub', async () => {
  let second;
  let calls=0;
  await handle(new Request(request('/p/portfolio'),{headers:{cookie:'private',authorization:'Bearer private'}}),env,async req=>{
    if(++calls===1)throw new Error('offline');second=req;return new Response('ok');
  });
  assert.equal(second.headers.get('cookie'),null);
  assert.equal(second.headers.get('authorization'),null);
  calls=0;
  assert.equal((await handle(new Request(request('/p/portfolio'),{method:'POST',body:'x'}),env,async()=>{calls++;return new Response('down',{status:503});})).status,503);
  assert.equal(calls,1);
});
test('timeout falls back and snapshot media bypasses the failed origin', async () => {
  const calls=[];
  const result=await handle(request('/p/portfolio'),env,async req=>{
    calls.push(req.url);
    if(calls.length===1)return new Promise((resolve,reject)=>req.signal.addEventListener('abort',()=>reject(new Error('timeout'))));
    return new Response('snapshot');
  });
  assert.equal(await result.text(),'snapshot');
  calls.length=0;
  await handle(request('/p/portfolio/_snapshot/files/test.png'),env,async req=>{calls.push(req.url);return new Response('image');});
  assert.deepEqual(calls,['https://hugouchoasborges.github.io/p/portfolio/_snapshot/files/test.png']);
});
test('new automatically exported media works without redeploying the Worker',async()=>{
  const original='/p/portfolio/_assets/future.gif';
  let calls=0,target;
  const response=await handle(request(original),env,async req=>{
    if(++calls===1)return new Response('down',{status:503});
    target=req.url;return new Response('new image');
  });
  const hash=createHash('sha256').update(original).digest('hex').slice(0,16);
  assert.equal(target,'https://hugouchoasborges.github.io/p/portfolio/_snapshot/files/'+hash+'-future.gif');
  assert.equal(await response.text(),'new image');
});
