import test from 'node:test';
import assert from 'node:assert/strict';
import {requireLiveResponse} from '../scripts/snapshot-source.mjs';
test('export refuses a cached fallback instead of publishing it as a fresh snapshot',()=>{
  assert.throws(()=>requireLiveResponse(new Response('old snapshot',{headers:{'x-portfolio-origin':'github-pages'}})),/fallback/);
  assert.throws(()=>requireLiveResponse(new Response('offline',{status:503})),/503/);
  assert.doesNotThrow(()=>requireLiveResponse(new Response('live')));
});
