import test from 'node:test';
import assert from 'node:assert/strict';
import {requireLiveResponse, fingerprint} from '../scripts/snapshot-source.mjs';
test('export refuses a cached fallback instead of publishing it as a fresh snapshot',()=>{
  assert.throws(()=>requireLiveResponse(new Response('old snapshot',{headers:{'x-portfolio-origin':'github-pages'}})),/fallback/);
  assert.throws(()=>requireLiveResponse(new Response('offline',{status:503})),/503/);
  assert.doesNotThrow(()=>requireLiveResponse(new Response('live')));
});
test('unchanged snapshots have a stable hash, and media-only changes are detected',()=>{
  const first=fingerprint('page',{b:'hash-b',a:'hash-a'},{b:'/b',a:'/a'});
  assert.equal(first,fingerprint('page',{a:'hash-a',b:'hash-b'},{a:'/a',b:'/b'}));
  assert.notEqual(first,fingerprint('edited page',{a:'hash-a',b:'hash-b'},{a:'/a',b:'/b'}));
  assert.notEqual(first,fingerprint('page',{a:'new-image',b:'hash-b'},{a:'/a',b:'/b'}));
});
