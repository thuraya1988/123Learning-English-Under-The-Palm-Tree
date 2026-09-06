/* فحصٌ شاملٌ لكلّ صفحة: هل تعمل؟ فيها تعليمات؟ نقاط؟ مستويات؟ */
import { chromium } from 'playwright';
import fs from 'fs';
const all=JSON.parse(fs.readFileSync('/tmp/all-pages.json','utf8'));
const from=+(process.argv[2]||0), to=+(process.argv[3]||all.length);
const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
const res=[];
for(const g of all.slice(from,to)){
  const ctx=await b.newContext({viewport:{width:430,height:860}});
  await ctx.route('**/*',r=>{const u=r.request().url();
    return (u.startsWith('http://127.0.0.1:8899')||u.startsWith('data:')||u.startsWith('blob:'))?r.continue():r.abort();});
  const p=await ctx.newPage();
  const errs=[],http=[];
  p.on('pageerror',e=>errs.push(e.message.slice(0,80)));
  p.on('console',m=>{if(m.type()==='error'&&!/ERR_FAILED|Failed to load resource/.test(m.text()))errs.push('C:'+m.text().slice(0,70));});
  p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1:8899'))http.push(r.url().split('/').pop().slice(0,32));});
  let o={};
  try{
    await p.goto('http://127.0.0.1:8899/'+g.f,{waitUntil:'load',timeout:35000});
    await p.waitForTimeout(3500);
    o=await p.evaluate(()=>{
      const tx=(document.body.innerText||'').replace(/\s+/g,' ').trim();
      return {text:tx.length, canvas:document.querySelectorAll('canvas').length,
        btns:[...document.querySelectorAll('button,a')].filter(e=>e.offsetParent).length,
        instr:/اسحب|اضغط|المطلوب|التعليم|كيف تلعب|الهدف|اجمع|رتّب|رتب|اختر|احزر|طريقة اللعب/.test(tx),
        score:/نقاط|النقاط|score|points/i.test(tx),
        level:/المستوى|مستوى|level|المرحلة/i.test(tx)};
    });
  }catch(e){ o={fail:e.message.split('\n')[0].slice(0,50)}; }
  res.push({...g,...o,errs:[...new Set(errs)].slice(0,2),http:[...new Set(http)].slice(0,3)});
  await ctx.close();
}
fs.writeFileSync('/tmp/audit-'+from+'.json',JSON.stringify(res));
console.log('shard',from,'done',res.length);
await b.close();
