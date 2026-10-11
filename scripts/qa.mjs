import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.QA_URL||'http://127.0.0.1:8117';
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const context=await browser.newContext({viewport:{width:1280,height:900}});
await context.route('**/pub.hugoborges.dev.br/**',route=>route.abort());
const page=await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',response=>{if(response.url().startsWith(base)&&response.status()>=400)errors.push(response.status()+' '+response.url());});
try{
  await page.goto(base,{waitUntil:'networkidle'});
  await page.locator('img').evaluateAll(images=>images.forEach(image=>image.loading='eager'));
  await page.waitForFunction(()=>[...document.images].every(image=>image.complete&&image.naturalWidth>0));
  const data=await page.locator('#entries').evaluate(el=>JSON.parse(el.textContent));
  assert.equal(data.projects.length,16);
  await page.locator('[data-lang="pt"]').click();
  assert.equal(await page.locator('[data-lang="pt"]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-set="tools"]').click();
  assert.equal(await page.locator('[data-set="tools"]').getAttribute('aria-checked'),'true');
  await page.locator('[data-set="all"]').click();
  for(const id of Object.keys(data.docs)){
    await page.locator('[data-doc="'+id+'"]').first().click();
    assert.equal(await page.locator('#reader-close').isVisible(),true);
    const resume=await page.locator('#reader-pdf').getAttribute('href').catch(()=>null);
    if(id==='resume'&&resume)assert.equal((await context.request.head(new URL(resume,base).href)).status(),200);
    await page.locator('#reader-close').click();
  }
  const html=await fs.readFile(new URL('../site/index.html',import.meta.url),'utf8');
  const urls=[...new Set(html.match(/\/p\/portfolio\/_snapshot\/files\/[a-zA-Z0-9._-]+/g))];
  for(const url of urls)assert.equal((await context.request.head(base+url)).status(),200,url);
  assert.deepEqual(errors,[]);
  await fs.mkdir('test-results',{recursive:true});
  await page.screenshot({path:'test-results/portfolio.png',fullPage:true});
  console.log(JSON.stringify({passed:true,projects:data.projects.length,documents:Object.keys(data.docs).length,mediaChecked:urls.length,libraryBlocked:true}));
}finally{await browser.close();}
