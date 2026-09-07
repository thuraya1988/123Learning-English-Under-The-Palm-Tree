/* قصر النخيل — المحرّك.
 *
 * مبنيٌّ على الشفرة التي أرسلتها ثريّا، مع أربعة إصلاحات وتغييرٍ واحد
 * في طريقة التحميل، وكلُّها موصوفةٌ عند موضعها:
 *
 *   ١) ثلاثةُ أقواسٍ مغلقةٍ خطأً في بناء الحشرات كسرت الملفَّ كلَّه.
 *   ٢) H غير معرَّف في بناء الجدران (الصحيح HH) — يوقف بناء الطابق.
 *   ٣) Sound.step دالّةٌ ثمّ يُسنَد إليها رقمٌ في startMusic، فتختفي
 *      الدالّة ويسقط الصوتُ عند أوّل خطوةٍ يمشيها الطالب.
 *   ٤) G.solvedStage() تُنادى ولا وجودَ لها.
 *
 * والتغيير: three.js كان يُحمَّل من cdn.jsdelivr.net، وشبكاتُ المدارس
 * تحجبه فتصير اللعبةُ شاشةً سوداء. فصار يُحمَّل من المستودع نفسِه.
 * ونسختُنا r128 تسمّي فضاء الألوان encoding لا colorSpace، فعُدِّلت
 * المواضعُ التسعة.
 */
import { RIDDLES } from './qasr-riddles.js';

const THREE = window.THREE;
if (!THREE) throw new Error('three.js لم يُحمَّل');

/* ══════ ٠) أدوات عامة ══════ */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const AR = '٠١٢٣٤٥٦٧٨٩';
const ar = n => String(n).split('').map(c => /\d/.test(c) ? AR[+c] : c).join('');
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr,rnd){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

/* ══════ ١) الثيمات العُمانية ══════ */
const THEMES={
  fort:{ar:'حصن',wall:0xc69a63,wall2:0x8a6236,floor:0x9a7a52,ceil:0x6b4f30,trim:0xe8c17a,
        fog:0x3d2b1c,fogD:.021,sky:['#2a1a2e','#6b3f2a','#c47a35'],sun:0xffd39a,sunI:1.15,amb:0x6b4a33,ambI:.55,
        lamp:0xffb45e,part:'dust',maqam:'rast',bpm:84,outdoor:false},
  desert:{ar:'صحراء',wall:0xd8b478,wall2:0xa8813f,floor:0xc69f62,ceil:0x000000,trim:0xf6dfa6,
        fog:0xd8a96a,fogD:.014,sky:['#1c2a4a','#e08a3c','#f6cf8a'],sun:0xffdf9e,sunI:1.55,amb:0x9c7a4a,ambI:.7,
        lamp:0xffc46a,part:'sand',maqam:'kurd',bpm:72,outdoor:true},
  wadi:{ar:'وادي',wall:0x8b9a7c,wall2:0x5a6b4f,floor:0x6f7d63,ceil:0x4a5540,trim:0xbfe0a8,
        fog:0x2d4438,fogD:.026,sky:['#0d2420','#2f6b52','#8fd0a8'],sun:0xc9ffe0,sunI:1.0,amb:0x3f6b52,ambI:.65,
        lamp:0x8dffc4,part:'mist',maqam:'nahawand',bpm:66,outdoor:true},
  coast:{ar:'ساحل',wall:0xdcd6c4,wall2:0xa8a08c,floor:0xc8c0aa,ceil:0x8b8474,trim:0x8fe3ff,
        fog:0x7fa8bd,fogD:.017,sky:['#0d2a4a','#2f7fa8','#bfe8f6'],sun:0xd8f4ff,sunI:1.35,amb:0x5c8ba0,ambI:.7,
        lamp:0x9fe8ff,part:'spray',maqam:'ajam',bpm:96,outdoor:true},
  mountain:{ar:'جبل',wall:0x9c8f86,wall2:0x6a5f58,floor:0x7d7268,ceil:0x544a44,trim:0xffb0a0,
        fog:0x4a4048,fogD:.024,sky:['#1a1430','#5a3a5e','#e08a7a'],sun:0xffc9b0,sunI:1.05,amb:0x6a5468,ambI:.6,
        lamp:0xffa88a,part:'mist',maqam:'bayati',bpm:78,outdoor:true},
  frank:{ar:'أرض اللبان',wall:0xbfa98c,wall2:0x8a7355,floor:0xa08b6d,ceil:0x6d5c44,trim:0xf0e2a8,
        fog:0x6a5a44,fogD:.030,sky:['#241a2e','#8a6a3a','#e8cf94'],sun:0xffe6a8,sunI:.95,amb:0x7a6a4a,ambI:.6,
        lamp:0xffe0a0,part:'incense',maqam:'hijaz',bpm:60,outdoor:false},
  souq:{ar:'سوق',wall:0xc08a5a,wall2:0x8a5a34,floor:0x9a7048,ceil:0x5e4228,trim:0xffcf7a,
        fog:0x4a3020,fogD:.028,sky:['#1a1020','#7a3f1a','#e09a4a'],sun:0xffb870,sunI:.85,amb:0x7a4a2a,ambI:.65,
        lamp:0xff9a4a,part:'incense',maqam:'hijaz',bpm:104,outdoor:false},
  night:{ar:'ليل',wall:0x4a4468,wall2:0x2c2844,floor:0x3a3552,ceil:0x241f38,trim:0xa89cff,
        fog:0x141028,fogD:.035,sky:['#05040f','#141030','#2c2450'],sun:0x9aa8ff,sunI:.5,amb:0x3a3468,ambI:.5,
        lamp:0x8f7aff,part:'dust',maqam:'kurd',bpm:58,outdoor:false},
  cave:{ar:'كهف',wall:0x6b5a4e,wall2:0x463a32,floor:0x584a40,ceil:0x332a24,trim:0x9fd8c8,
        fog:0x1c1814,fogD:.046,sky:['#0a0808','#1a1614','#241e1a'],sun:0xbfa88a,sunI:.4,amb:0x4a3e34,ambI:.5,
        lamp:0x8fe8d0,part:'mist',maqam:'nahawand',bpm:54,outdoor:false},
  oasis:{ar:'واحة',wall:0xc9b489,wall2:0x93804f,floor:0xa89768,ceil:0x77683f,trim:0xa8e88a,
        fog:0x6a7a4a,fogD:.020,sky:['#1a2a20','#5a8a4a','#d0e8a0'],sun:0xe8ffc0,sunI:1.3,amb:0x6a8a4a,ambI:.72,
        lamp:0xc0ff90,part:'leaf',maqam:'rast',bpm:90,outdoor:true},
  harbor:{ar:'ميناء',wall:0xb09a7e,wall2:0x7a6448,floor:0x8d7a5e,ceil:0x5c4c38,trim:0x7ad8ff,
        fog:0x4a5a6a,fogD:.022,sky:['#101a30','#3a5a7a','#c0a878'],sun:0xffe0b0,sunI:1.1,amb:0x5a6a78,ambI:.65,
        lamp:0x9fd8ff,part:'spray',maqam:'ajam',bpm:100,outdoor:true},
  garden:{ar:'حديقة',wall:0xa8c08a,wall2:0x6a8450,floor:0x7a9a58,ceil:0x000000,trim:0xfff0a8,
        fog:0x3a5a3a,fogD:.014,sky:['#102a1a','#4a8a5a','#e8f0b0'],sun:0xfff0c0,sunI:1.5,amb:0x6a9a5a,ambI:.85,
        lamp:0xd0ff90,part:'leaf',maqam:'rast',bpm:112,outdoor:true}
};

/* ══════ ٢) الطوابق المائة ══════ */
const LEVELS=[
["بوّابة النخيل","أولُ أبواب القصر","fort"],["حِصن نَزْوى","قبّةُ الشرق","fort"],
["فلج دارس","ماءٌ تحت الرمال","wadi"],["سُوق نَزْوى","حِرفةٌ وبَخور","souq"],
["حِصن جَبرين","قصرُ الإمام","fort"],["جبل شمس","شَرفاتُ الهاوية","mountain"],
["الحَمراء القديمة","بيوتُ الطين","oasis"],["إزكي والقَرنين","بلدةُ التلال","fort"],
["مَنْح وقلعتُها","ظلُّ النخيل","oasis"],["سمائل وبَهْلاء","دربُ الأئمة","mountain"],
["قلعةُ الرِّستاق","ثلاثةُ أبراج","fort"],["نَخْل وحِمّاها","ماءٌ وحصن","wadi"],
["بركاء والحَزْم","مدافعُ البحر","harbor"],["المُصنَعة","سهلُ الباطنة","coast"],
["السُّوَيق","واحةُ الباطنة","oasis"],["الخَابورة","ساحلُ النخيل","coast"],
["صَحْم ولُوَى","رمالٌ وبحر","coast"],["صُحار","بوّابةُ الصين","harbor"],
["شِنَاص","أقصى شمال الباطنة","coast"],["العَوابي ووادي بني خَروص","فلجُ المالكي","wadi"],
["صلالة وخُور البَليد","أرضُ اللبان","frank"],["وادي دُوكة","شجرُ البَخور","frank"],
["مَرباط وقَلعتها","ميناءُ اللبان","harbor"],["طاقة وحِصنها","بيوتُ الظلّ","frank"],
["سَدح ورَخْيوت","جروفُ المحيط","coast"],["ضُلْكوت","أقصى الغرب","mountain"],
["ثمريت","دربُ القوافل","desert"],["مَقشِن وشَليم","جزرُ الحَلانيات","desert"],
["المَزْيونة","هضبةُ سمحان","mountain"],["خَريف صلالة","موسمُ الخضرة","wadi"],
["صُور والبَغْلة","أحواضُ السفن","harbor"],["رأس الحَدّ","شواطئُ السلاحف","coast"],
["رأس الجِنز","مَحميةُ السلاحف","coast"],["وادي شاب","شلّالاتٌ خفيّة","wadi"],
["وادي بني خالد","عيونُ الشرق","wadi"],["إبراء والقابل","مضاربُ البدو","desert"],
["بِدْية","كثبانُ الشرقية","desert"],["المُضيبي","سهلُ الهَجَر","oasis"],
["جَعْلان بني بوعلي","ساحلُ الشرق","desert"],["الكامل والوافي","واحةُ الجنوب","oasis"],
["جزيرة مَصيرة","أكبرُ الجزر","coast"],["الدُّقم","رأسُ الوسطى","desert"],
["مسقط القديمة","بين الجبلين","fort"],["قصرُ العَلَم","واجهةُ البحر","harbor"],
["قلعةُ الجَلالي","الحارسُ الشرقي","fort"],["قلعةُ المِيراني","الحارسُ الغربي","fort"],
["مَطرَح وسُوقها","دَربُ البَخور","souq"],["السِّيب","ساحلُ العاصمة","coast"],
["قُريَات وبِمَة","جرفُ البحر","mountain"],["العامرات","وِديانُ مسقط","mountain"],
["خَصَب ومُسندم","نرويجُ العرب","coast"],["دَبَا","سوقُ العرب القديم","harbor"],
["بُخا وكُمزار","قرى المضيق","coast"],["مَدْحَاء","الواحةُ المحاطة","oasis"],
["مضيقُ هُرمز","عنقُ الخليج","harbor"],["جُزر الديمانيات","مَحميةُ المرجان","coast"],
["عَبري وبَات","مقابِرُ الألفِ الثالثة","desert"],["يَنْقُل","وِديانُ الظاهرة","mountain"],
["ضَنْك","حِصنُ الظاهرة","fort"],["البُريمي","واحةُ الحدود","oasis"],
["مَحضة والسُّنَينة","رِمالٌ ونخيل","desert"],["هِيما","قلبُ الوُسطى","desert"],
["الجازر ومَحوت","ساحلُ الوسطى","coast"],["خَنْجرُ نَزْوى","رمزُ الرجولة","souq"],
["فِضّةُ عُمان","الحُلِيُّ والصَّوْغ","souq"],["فَخّارُ بَهْلاء","طينٌ ونار","souq"],
["سَعفياتُ النخيل","خُوصٌ وظلال","oasis"],["نَسِيجُ البادية","صوفٌ ووَبَر","desert"],
["سُفنُ صُور","خشبٌ وقِلاع","harbor"],["الحلوى العُمانية","مِرجَلٌ وهَيْل","souq"],
["أفلاجُ عُمان","هندسةُ الماء","wadi"],["السَّبلةُ العُمانية","مجلسُ الشورى","fort"],
["الرَّزحة","سيفٌ وطبلٌ كبير","souq"],["العَازي","شعرُ الفخر","desert"],
["البَرْعة","نَغمةُ ظفار","frank"],["اللِّيوَا","إيقاعُ الساحل","coast"],
["المَيْدان","غناءُ البحر","harbor"],["التَّغرود","حداءُ الإبل","desert"],
["الهَمبل والطُّبول","كَاسِرٌ ورَحْماني","mountain"],["الربّابة","وترُ البادية","desert"],
["مَاجَان","أرضُ النحاس","desert"],["مُزُون","الاسمُ القديم","wadi"],
["الأزدُ ومالكُ بن فَهم","الهجرةُ الكبرى","coast"],["الجلندى والإسلام","وفدُ عُمان","oasis"],
["مازنُ بن غَضوبة","صحابيٌّ من سَمائل","mountain"],["جابرُ بن زيد","عالمُ عُمان","fort"],
["دولةُ اليَعاربة","تحريرُ السواحل","fort"],["الإمامُ ناصرُ بن مُرشد","مؤسِّسُ الدولة","fort"],
["الدولةُ البوسعيدية","١٧٤٤م","harbor"],["سعيدُ بن سلطان","إمبراطوريةُ البحر","harbor"],
["زنجبارُ وعُمان","قرنفلٌ وسفن","coast"],["أحمدُ بن ماجد","أسدُ البحر","harbor"],
["رحلةُ سُفينة صحار","إلى الصين ١٩٨٠","harbor"],["النّهضةُ المبارَكة","٢٣ يوليو ١٩٧٠","fort"],
["اليومُ الوطني","١٨ نوفمبر","desert"],["مواقعُ اليونسكو","خمسةُ كنوز","wadi"],
["المَها العربي","غزالُ الوُسطى","desert"],["النَّمِرُ العربي","جبلُ سَمْحان","mountain"],
["الوَعلُ والطَّهرُ","حُرّاسُ الحَجَر","mountain"],["النخيلُ الستّون","شجرةُ الخير","oasis"],
["الحديقةُ الكبرى","قلبُ القصر","garden"]
];

/* ══════ ٣) الصوت ══════ */
const MAQAM={
  rast:[0,2,3.5,5,7,9,10.5], hijaz:[0,1,4,5,7,8,11],
  bayati:[0,2,3,5,7,9,10], nahawand:[0,2,3,5,7,8,10],
  kurd:[0,1,3,5,7,8,10], ajam:[0,2,4,5,7,9,11]
};
class Sound{
  /* «step» كانت اسمَ دالّةِ صوتِ الخطوة واسمَ عدّادِ النغمة معًا، فيُسنَد
     إليها رقمٌ في startMusic فتختفي الدالّة ويسقط الصوتُ عند أوّل خطوة.
     فصار العدّادُ tick. */
  constructor(){this.ok=false;this.on=true;this.vol=.55;this.mode='rast';this.bpm=84;this.playing=false;this.tickN=0;}
  init(){
    if(this.ok)return;
    try{
      this.ctx=new (window.AudioContext||window.webkitAudioContext)();
      this.master=this.ctx.createGain();this.master.gain.value=this.on?this.vol:0;this.master.connect(this.ctx.destination);
      this.mus=this.ctx.createGain();this.mus.gain.value=.5;this.mus.connect(this.master);
      this.rev=this.ctx.createConvolver();
      const len=this.ctx.sampleRate*2.1,buf=this.ctx.createBuffer(2,len,this.ctx.sampleRate);
      for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++){d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);}}
      this.rev.buffer=buf;
      const rg=this.ctx.createGain();rg.gain.value=.32;this.rev.connect(rg);rg.connect(this.master);
      this.dry=this.ctx.createGain();this.dry.gain.value=.88;this.dry.connect(this.master);
      this.dronG=this.ctx.createGain();this.dronG.gain.value=0;this.dronG.connect(this.mus);this.dronG.connect(this.rev);
      this.ok=true;
    }catch(e){this.ok=false;}
  }
  setOn(v){this.on=v;if(this.ok)this.master.gain.setTargetAtTime(v?this.vol:0,this.ctx.currentTime,.1);}
  to(node){node.connect(this.dry);node.connect(this.rev);}
  oud(t,f,dur,g){
    if(!this.ok)return;const c=this.ctx;
    const o1=c.createOscillator(),o2=c.createOscillator(),fl=c.createBiquadFilter(),gn=c.createGain();
    o1.type='sawtooth';o1.frequency.value=f;o2.type='triangle';o2.frequency.value=f*2.005;
    fl.type='lowpass';fl.frequency.setValueAtTime(f*7,t);fl.frequency.exponentialRampToValueAtTime(Math.max(40,f*1.6),t+dur);fl.Q.value=2.4;
    gn.gain.setValueAtTime(.0001,t);gn.gain.linearRampToValueAtTime(g,t+.006);gn.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o1.connect(fl);o2.connect(fl);fl.connect(gn);this.to(gn);
    o1.start(t);o2.start(t);o1.stop(t+dur+.05);o2.stop(t+dur+.05);
  }
  ney(t,f,dur,g){
    if(!this.ok)return;const c=this.ctx;
    const o=c.createOscillator(),lfo=c.createOscillator(),lg=c.createGain(),fl=c.createBiquadFilter(),gn=c.createGain();
    o.type='sine';o.frequency.value=f;
    lfo.frequency.value=5.2;lg.gain.value=f*.011;lfo.connect(lg);lg.connect(o.frequency);
    fl.type='bandpass';fl.frequency.value=f*2.4;fl.Q.value=1.1;
    gn.gain.setValueAtTime(.0001,t);gn.gain.linearRampToValueAtTime(g*.6,t+.09);
    gn.gain.setValueAtTime(g*.6,t+dur*.55);gn.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(fl);fl.connect(gn);this.to(gn);
    o.start(t);lfo.start(t);o.stop(t+dur+.05);lfo.stop(t+dur+.05);
  }
  drum(t,type,g){
    if(!this.ok)return;const c=this.ctx;
    const o=c.createOscillator(),gn=c.createGain();
    if(type==='rahmani'){o.type='sine';o.frequency.setValueAtTime(145,t);o.frequency.exponentialRampToValueAtTime(46,t+.22);
      gn.gain.setValueAtTime(g,t);gn.gain.exponentialRampToValueAtTime(.0001,t+.42);}
    else if(type==='kaser'){o.type='triangle';o.frequency.setValueAtTime(320,t);o.frequency.exponentialRampToValueAtTime(120,t+.09);
      gn.gain.setValueAtTime(g*.75,t);gn.gain.exponentialRampToValueAtTime(.0001,t+.16);}
    else {o.type='square';o.frequency.setValueAtTime(1700,t);gn.gain.setValueAtTime(g*.28,t);gn.gain.exponentialRampToValueAtTime(.0001,t+.05);}
    o.connect(gn);this.to(gn);o.start(t);o.stop(t+.6);
    const nb=c.createBufferSource(),buf=c.createBuffer(1,Math.floor(c.sampleRate*.12),c.sampleRate),bd=buf.getChannelData(0);
    for(let i=0;i<bd.length;i++)bd[i]=(Math.random()*2-1)*Math.pow(1-i/bd.length,4);
    nb.buffer=buf;const nf=c.createBiquadFilter();nf.type='bandpass';nf.frequency.value=type==='riq'?6500:1200;nf.Q.value=1.4;
    const ng=c.createGain();ng.gain.setValueAtTime(g*(type==='riq'?.35:.5),t);ng.gain.exponentialRampToValueAtTime(.0001,t+.11);
    nb.connect(nf);nf.connect(ng);this.to(ng);nb.start(t);
  }
  droneOn(){
    if(!this.ok||this.dronOn)return;this.dronOn=true;const c=this.ctx;
    const base=this.baseFreq||110;
    [1,1.5,2].forEach((m,i)=>{
      const o=c.createOscillator(),g=c.createGain();o.type=i===0?'sawtooth':'triangle';o.frequency.value=base*m/2;
      g.gain.value=0;o.connect(g);g.connect(this.dronG);o.start();
      g.gain.setTargetAtTime(i===0?.09:.035,c.currentTime,2.5);
      const l=c.createOscillator(),lg=c.createGain();l.frequency.value=.06+i*.03;lg.gain.value=.9;l.connect(lg);lg.connect(o.frequency);l.start();
    });
    this.dronG.gain.setTargetAtTime(.55,c.currentTime,3);
  }
  droneOff(){if(!this.ok||!this.dronOn)return;this.dronG.gain.setTargetAtTime(0,this.ctx.currentTime,.6);setTimeout(()=>{this.dronOn=false;},900);}
  step(v){if(!this.ok)return;const c=this.ctx,t=c.currentTime;
    const nb=c.createBufferSource(),buf=c.createBuffer(1,Math.floor(c.sampleRate*.09),c.sampleRate),bd=buf.getChannelData(0);
    for(let i=0;i<bd.length;i++)bd[i]=(Math.random()*2-1)*Math.pow(1-i/bd.length,3.5);
    nb.buffer=buf;const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=340+Math.random()*220;f.Q.value=1.1;
    const g=c.createGain();g.gain.value=v*.18;nb.connect(f);f.connect(g);g.connect(this.dry);g.connect(this.rev);nb.start(t);}
  click(){if(!this.ok)return;this.drum(this.ctx.currentTime,'riq',.5);}
  correct(){if(!this.ok)return;const t=this.ctx.currentTime;
    [523.25,659.25,783.99,1046.5].forEach((f,i)=>this.oud(t+i*.09,f,.75,.30));
    this.drum(t,'riq',.5);this.drum(t+.18,'kaser',.4);}
  wrong(){if(!this.ok)return;const c=this.ctx,t=c.currentTime;
    const o=c.createOscillator(),g=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(150,t);
    o.frequency.exponentialRampToValueAtTime(68,t+.42);
    const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=600;
    g.gain.setValueAtTime(.22,t);g.gain.exponentialRampToValueAtTime(.0001,t+.48);
    o.connect(f);f.connect(g);g.connect(this.dry);o.start(t);o.stop(t+.55);}
  key(){if(!this.ok)return;const t=this.ctx.currentTime;
    [784,1046.5,1318.5,1568,2093].forEach((f,i)=>this.ney(t+i*.06,f,.6,.16));
    this.drum(t,'kaser',.4);}
  unlock(){if(!this.ok)return;const t=this.ctx.currentTime;
    this.drum(t,'rahmani',.7);this.drum(t+.13,'rahmani',.5);
    [196,261.6,329.6].forEach((f,i)=>this.oud(t+.22+i*.07,f,1.0,.26));}
  door(){if(!this.ok)return;const c=this.ctx,t=c.currentTime;
    const nb=c.createBufferSource(),buf=c.createBuffer(1,Math.floor(c.sampleRate*.8),c.sampleRate),bd=buf.getChannelData(0);
    for(let i=0;i<bd.length;i++)bd[i]=(Math.random()*2-1)*Math.pow(1-i/bd.length,1.6)*.5;
    nb.buffer=buf;const f=c.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(900,t);
    f.frequency.exponentialRampToValueAtTime(180,t+.8);
    const g=c.createGain();g.gain.value=.35;nb.connect(f);f.connect(g);g.connect(this.dry);g.connect(this.rev);nb.start(t);
    this.drum(t+.05,'rahmani',.8);}
  chime(f=1046){if(!this.ok)return;this.ney(this.ctx.currentTime,f,1.5,.14);}
  win(){if(!this.ok)return;const t=this.ctx.currentTime;
    const b=this.baseFreq||220;
    [0,2,4,7,4,7,9,11].forEach((s,i)=>this.oud(t+i*.13,b*Math.pow(2,s/12),1.1,.3));
    for(let i=0;i<8;i++)this.drum(t+i*.13,i%2?'kaser':'rahmani',.55);
    this.drum(t+1.1,'rahmani',.9);this.drum(t+1.24,'rahmani',.9);}
  buzz(){if(!this.ok)return;const c=this.ctx,t=c.currentTime,d=.25+Math.random()*.2;
    const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain();
    o.type='sawtooth';o.frequency.value=440+Math.random()*120;o2.type='square';o2.frequency.value=o.frequency.value*1.5;
    const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=2200;f.Q.value=6;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.045,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(f);o2.connect(f);f.connect(g);g.connect(this.dry);o.start(t);o2.start(t);o.stop(t+d);o2.stop(t+d);}
  chirp(){if(!this.ok)return;const c=this.ctx,t=c.currentTime;
    for(let k=0;k<3;k++){const st=t+k*.09;
      const o=c.createOscillator(),g=c.createGain();o.type='square';
      o.frequency.setValueAtTime(4200,st);o.frequency.exponentialRampToValueAtTime(2600,st+.05);
      g.gain.setValueAtTime(.0001,st);g.gain.linearRampToValueAtTime(.022,st+.01);g.gain.exponentialRampToValueAtTime(.0001,st+.06);
      o.connect(g);g.connect(this.dry);o.start(st);o.stop(st+.08);}}
  startMusic(mode,bpm){
    this.init();if(!this.ok)return;this.mode=mode||'rast';this.bpm=bpm||84;
    this.baseFreq=98*Math.pow(2,(mode==='hijaz'?2:0)/12);
    if(this.playing)return;this.playing=true;this.tickN=0;
    this.nextT=this.ctx.currentTime+.15;this.droneOn();
    this.timer=setInterval(()=>this.pump(),25);
  }
  stopMusic(){if(!this.playing)return;this.playing=false;clearInterval(this.timer);this.droneOff();}
  pump(){
    if(!this.ok)return;const c=this.ctx;
    const s16=(60/this.bpm)/4;
    while(this.nextT<c.currentTime+.25){this.sched(this.nextT,this.tickN);this.tickN++;this.nextT+=s16;}
  }
  sched(t,s){
    const sc=MAQAM[this.mode]||MAQAM.rast, b=this.baseFreq||110;
    const f=d=>b*Math.pow(2,d/12);
    const m=s%64;
    const pat=[1,0,0,2,0,0,1,0, 0,2,0,0,3,0,2,0];
    const p=pat[m%16];
    if(p===1)this.drum(t,'rahmani',.75);
    else if(p===2)this.drum(t,'kaser',.6);
    else if(p===3)this.drum(t,'riq',.55);
    if(m%8===0||(m%16===6&&Math.random()<.5)){
      const deg=sc[Math.floor(Math.random()*sc.length)]+(Math.random()<.4?12:0);
      this.oud(t,f(deg),.85+Math.random()*.5,.17);
    }
    if(m%16===4&&Math.random()<.55){
      const d1=sc[Math.floor(Math.random()*5)],d2=sc[Math.floor(Math.random()*5)]+12;
      this.oud(t,f(d1),.6,.14);this.oud(t+.16,f(d2),.7,.13);
    }
    if(m%32===0){
      const seq=[sc[0],sc[2],sc[4],sc[2],sc[5],sc[4],sc[2],sc[0]];
      seq.forEach((d,i)=>{if(Math.random()<.85)this.ney(t+i*.34,f(d+12),.42,.075);});
    }
  }
}
const SND=new Sound();

/* ══════ ٤) النقوش العُمانية — بلا نجومٍ خماسية ══════ */
function cv(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function noise(ctx,w,h,amt){
  const d=ctx.getImageData(0,0,w,h),p=d.data;
  for(let i=0;i<p.length;i+=4){const n=(Math.random()-.5)*amt;p[i]+=n;p[i+1]+=n;p[i+2]+=n;}
  ctx.putImageData(d,0,0);
}
const hex=c=>'#'+c.toString(16).padStart(6,'0');
function tx(c){const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;}

function khatam(ctx,x,y,r,col){   /* ثماني + معيّن — نقشٌ إسلاميّ لا نجمة */
  ctx.save();ctx.translate(x,y);ctx.strokeStyle=col;ctx.lineWidth=Math.max(1,r*.09);
  ctx.beginPath();
  for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;const px=Math.cos(a)*r,py=Math.sin(a)*r;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}
  ctx.closePath();ctx.stroke();
  ctx.rotate(Math.PI/4);ctx.beginPath();ctx.rect(-r*.55,-r*.55,r*1.1,r*1.1);ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,r*.28,0,7);ctx.stroke();
  ctx.restore();
}
function khanjarPath(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();
  ctx.moveTo(-.1,-1);ctx.quadraticCurveTo(.42,-.72,.34,.05);ctx.quadraticCurveTo(.22,.85,-.05,1.05);
  ctx.quadraticCurveTo(-.22,.72,-.16,.05);ctx.quadraticCurveTo(-.34,-.7,-.1,-1);ctx.closePath();ctx.restore();
}
function palmPath(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();
  ctx.moveTo(0,1);ctx.quadraticCurveTo(.04,0,0,-.35);
  ctx.moveTo(0,-.35);ctx.quadraticCurveTo(-.6,-.6,-1,-.25);ctx.moveTo(0,-.35);ctx.quadraticCurveTo(.6,-.6,1,-.25);
  ctx.moveTo(0,-.35);ctx.quadraticCurveTo(-.45,-1,-.8,-1);ctx.moveTo(0,-.35);ctx.quadraticCurveTo(.45,-1,.8,-1);
  ctx.moveTo(0,-.35);ctx.quadraticCurveTo(-.1,-1,0,-1.25);ctx.restore();
}
function dhowPath(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();
  ctx.moveTo(-1,.4);ctx.quadraticCurveTo(0,.85,1,.4);ctx.lineTo(.85,.22);ctx.lineTo(-.85,.22);ctx.closePath();
  ctx.moveTo(-.05,.2);ctx.lineTo(-.05,-1);ctx.moveTo(-.05,-1);ctx.lineTo(.75,.15);ctx.lineTo(-.05,.15);
  ctx.restore();
}
function falajPath(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();
  for(let i=0;i<3;i++){ctx.moveTo(-1,-.5+i*.5);ctx.quadraticCurveTo(-.5,-.85+i*.5,0,-.5+i*.5);ctx.quadraticCurveTo(.5,-.15+i*.5,1,-.5+i*.5);}
  ctx.restore();
}
function symbolDraw(ctx,name,x,y,s,col){
  ctx.save();ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=Math.max(1.4,s*.075);ctx.lineCap='round';ctx.lineJoin='round';
  if(name==='khanjar'){khanjarPath(ctx,x,y,s);ctx.stroke();}
  else if(name==='palm'){palmPath(ctx,x,y,s);ctx.stroke();}
  else if(name==='dhow'){dhowPath(ctx,x,y,s);ctx.stroke();}
  else if(name==='falaj'){falajPath(ctx,x,y,s);ctx.stroke();}
  else if(name==='khatam'){khatam(ctx,x,y,s,col);}
  else if(name==='frank'){
    ctx.beginPath();ctx.moveTo(x,y-s);ctx.quadraticCurveTo(x+s*.8,y,x,y+s*.85);ctx.quadraticCurveTo(x-s*.8,y,x,y-s);ctx.stroke();
    ctx.beginPath();ctx.arc(x,y+s*.1,s*.22,0,7);ctx.fill();
  }
  else if(name==='arch'){
    ctx.beginPath();ctx.moveTo(x-s*.6,y+s);ctx.lineTo(x-s*.6,y-.1);
    ctx.quadraticCurveTo(x-s*.6,y-s*.85,x,y-s*.85);ctx.quadraticCurveTo(x+s*.6,y-s*.85,x+s*.6,y-.1);
    ctx.lineTo(x+s*.6,y+s);ctx.stroke();
  }
  else if(name==='letter'){
    ctx.font='700 '+(s*2)+"px 'Amiri',serif";ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('ع',x,y);
  }
  ctx.restore();
}
const SYMS=['khanjar','palm','dhow','falaj','khatam','frank','arch','letter'];

function texWall(base,dark,accent,sym){
  const S=512,c=cv(S,S),x=c.getContext('2d');
  x.fillStyle=hex(base);x.fillRect(0,0,S,S);
  const rows=8,cols=4;
  for(let r=0;r<rows;r++){
    const off=(r%2)*(S/cols/2);
    for(let cl=-1;cl<cols+1;cl++){
      const w=S/cols,h=S/rows,px=cl*w+off,py=r*h;
      const l=1+((Math.sin(r*12.9+cl*7.7)*43758.5)%1)*.12-.06;
      x.fillStyle='rgba(0,0,0,'+((1-l)*.22)+')';x.fillRect(px,py,w,h);
      x.strokeStyle='rgba(0,0,0,.30)';x.lineWidth=3;x.strokeRect(px+2,py+2,w-4,h-4);
      x.strokeStyle='rgba(255,255,255,.10)';x.lineWidth=2;x.strokeRect(px+4,py+4,w-8,h-8);
    }
  }
  x.save();x.globalAlpha=.5;
  [S*.28,S*.62].forEach(by=>{
    x.fillStyle='rgba(0,0,0,.16)';x.fillRect(0,by,S,64);
    x.strokeStyle=hex(accent);x.lineWidth=2;x.strokeRect(4,by+4,S-8,56);
    for(let i=0;i<6;i++) symbolDraw(x,SYMS[(i+sym)%SYMS.length],S/12+i*S/6,by+32,17,hex(accent));
  });
  x.restore();
  noise(x,S,S,26);
  const t=tx(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
}
function texFloor(base,dark,accent){
  const S=512,c=cv(S,S),x=c.getContext('2d');
  x.fillStyle=hex(base);x.fillRect(0,0,S,S);
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){
    const w=S/4,px=i*w,py=j*w;
    x.fillStyle='rgba(255,255,255,'+(.02+((i+j)%2)*.05)+')';x.fillRect(px,py,w,w);
    x.strokeStyle='rgba(0,0,0,.32)';x.lineWidth=4;x.strokeRect(px+2,py+2,w-4,w-4);
  }
  x.save();x.globalAlpha=.24;
  for(let i=0;i<4;i++)for(let j=0;j<4;j++) if((i+j)%2===0) khatam(x,i*S/4+S/8,j*S/4+S/8,S/16,hex(accent));
  x.restore();
  noise(x,S,S,30);
  const t=tx(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
}
function texCarpet(accent,base){
  const S=512,c=cv(S,S),x=c.getContext('2d');
  x.fillStyle=hex(base);x.fillRect(0,0,S,S);
  const A=hex(accent);
  x.strokeStyle=A;x.lineWidth=8;x.strokeRect(20,20,S-40,S-40);
  x.lineWidth=3;x.strokeRect(38,38,S-76,S-76);
  for(let i=0;i<4;i++)for(let j=0;j<4;j++) khatam(x,80+i*118,80+j*118,30,A);
  x.save();x.globalAlpha=.7;
  symbolDraw(x,'palm',S/2,S/2,42,A);
  symbolDraw(x,'khanjar',120,S/2,26,A);symbolDraw(x,'khanjar',S-120,S/2,26,A);
  x.restore();
  noise(x,S,S,18);
  const t=tx(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
}
function texGlow(col){
  const S=128,c=cv(S,S),x=c.getContext('2d');
  const g=x.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);
  g.addColorStop(0,col||'rgba(255,240,200,1)');
  g.addColorStop(.28,'rgba(255,210,140,.55)');
  g.addColorStop(1,'rgba(0,0,0,0)');
  x.fillStyle=g;x.fillRect(0,0,S,S);
  return tx(c);
}
function texTablet(accent){
  const W=512,H=640,c=cv(W,H),x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1024');g.addColorStop(.5,'#241533');g.addColorStop(1,'#120a1c');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  const A=hex(accent);
  x.strokeStyle=A;x.lineWidth=7;x.strokeRect(16,16,W-32,H-32);
  x.lineWidth=2.5;x.strokeRect(34,34,W-68,H-68);
  x.save();x.globalAlpha=.55;
  for(let i=0;i<5;i++)khatam(x,64+i*(W-128)/4,64,20,A);
  for(let i=0;i<5;i++)khatam(x,64+i*(W-128)/4,H-64,20,A);
  symbolDraw(x,'khanjar',80,H/2,34,A);symbolDraw(x,'khanjar',W-80,H/2,34,A);
  symbolDraw(x,'palm',W/2,130,38,A);symbolDraw(x,'falaj',W/2,H-130,34,A);
  x.restore();
  x.font="700 62px 'Amiri',serif";x.textAlign='center';x.textBaseline='middle';x.fillStyle=A;
  x.fillText('لُغْز',W/2,H/2-30);
  x.font="400 40px 'Amiri',serif";x.fillStyle='rgba(255,240,210,.85)';
  x.fillText('اقترب واضغط E',W/2,H/2+40);
  return tx(c);
}
function texDoor(accent,locked){
  const S=512,c=cv(S,S),x=c.getContext('2d');
  x.fillStyle=locked?'#3a2418':'#4a3220';x.fillRect(0,0,S,S);
  for(let i=0;i<6;i++){x.fillStyle='rgba(0,0,0,'+(.06+(i%2)*.07)+')';x.fillRect(i*S/6,0,S/6,S);}
  x.strokeStyle='rgba(0,0,0,.5)';x.lineWidth=4;
  for(let i=0;i<=6;i++){x.beginPath();x.moveTo(i*S/6,0);x.lineTo(i*S/6,S);x.stroke();}
  const A=hex(accent);
  x.strokeStyle=A;x.lineWidth=6;x.strokeRect(26,26,S-52,S-52);
  for(let i=0;i<5;i++)for(let j=0;j<6;j++){
    x.beginPath();x.arc(70+i*93,70+j*76,9,0,7);
    x.fillStyle='#c9963f';x.fill();x.strokeStyle='rgba(0,0,0,.4)';x.lineWidth=2;x.stroke();
  }
  x.save();x.globalAlpha=.9;
  symbolDraw(x,locked?'khanjar':'arch',S/2,S/2,80,A);
  x.restore();
  noise(x,S,S,22);
  return tx(c);
}
function texWeb(){
  const S=256,c=cv(S,S),x=c.getContext('2d');
  x.clearRect(0,0,S,S);x.strokeStyle='rgba(235,235,240,.75)';x.lineWidth=1.4;
  const R=S*1.45;
  for(let i=0;i<14;i++){const a=i/14*Math.PI/2;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*R,Math.sin(a)*R);x.stroke();}
  for(let r=1;r<=9;r++){
    x.beginPath();
    for(let i=0;i<=14;i++){const a=i/14*Math.PI/2,rr=R*r/9*(1+.06*Math.sin(a*7+r));
      const px=Math.cos(a)*rr,py=Math.sin(a)*rr;i?x.lineTo(px,py):x.moveTo(px,py);}
    x.stroke();
  }
  return tx(c);
}
function texFrond(){
  const W=256,H=512,c=cv(W,H),x=c.getContext('2d');
  x.clearRect(0,0,W,H);
  x.strokeStyle='#2d5a2a';x.lineWidth=6;x.beginPath();x.moveTo(W/2,H);x.quadraticCurveTo(W/2,H*.4,W/2,10);x.stroke();
  for(let i=0;i<H;i+=7){
    const t=i/H,w=Math.sin(t*Math.PI)*(W*.44)*(1-t*.35),y=H-i;
    x.strokeStyle='hsl('+(92+Math.random()*22)+','+(42+t*18)+'%,'+(26+t*20)+'%)';x.lineWidth=3.2;
    x.beginPath();x.moveTo(W/2,y);x.lineTo(W/2-w,y-16);x.stroke();
    x.beginPath();x.moveTo(W/2,y);x.lineTo(W/2+w,y-16);x.stroke();
  }
  return tx(c);
}
function texBark(){
  const S=256,c=cv(S,S),x=c.getContext('2d');
  x.fillStyle='#6b5335';x.fillRect(0,0,S,S);
  for(let i=0;i<S;i+=9){
    x.strokeStyle='rgba('+(40+Math.random()*40|0)+','+(30+Math.random()*28|0)+','+(18+Math.random()*18|0)+',.85)';
    x.lineWidth=3+Math.random()*4;x.beginPath();
    x.moveTo(0,i+Math.random()*5);x.bezierCurveTo(S/3,i+6,2*S/3,i-6,S,i+Math.random()*5);x.stroke();
  }
  noise(x,S,S,34);
  const t=tx(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
}
function texPath(col){
  const S=128,c=cv(S,S),x=c.getContext('2d');
  x.clearRect(0,0,S,S);
  x.fillStyle=col;x.globalAlpha=.9;
  x.beginPath();x.moveTo(S/2,10);x.lineTo(S-14,S/2);x.lineTo(S/2,S-10);x.lineTo(14,S/2);x.closePath();x.fill();
  x.globalAlpha=.5;x.strokeStyle=col;x.lineWidth=4;x.stroke();
  return tx(c);
}

/* ══════ ٥) الحشرات ══════ */
const M=(c,r=.55,m=.05)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
function leg(len1,len2,mat,r=.012){
  const g=new THREE.Group();
  const a=new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.2,len1,6),mat);a.position.y=-len1/2;a.rotation.z=.5;g.add(a);
  const p=new THREE.Group();p.position.set(Math.sin(.5)*len1,-Math.cos(.5)*len1,0);g.add(p);
  const b=new THREE.Mesh(new THREE.CylinderGeometry(r*.8,r,len2,6),mat);b.position.y=-len2/2;b.rotation.z=-.85;p.add(b);
  return g;
}
function makeInsect(kind,accent){
  const G=new THREE.Group();const parts={legs:[],ant:[],wings:[]};
  const dark=M(0x20160f,.5,.15),body=M(0x38261a,.6,.05),red=M(0xc02a20,.28,.12),
        shine=M(new THREE.Color(accent).offsetHSL(0,0,-.15),.22,.55),black=M(0x0c0a09,.4,.2),
        wing=new THREE.MeshStandardMaterial({color:0xdfe8f0,transparent:true,opacity:.42,roughness:.15,side:THREE.DoubleSide});
  if(kind==='ant'){
    const hd=new THREE.Mesh(new THREE.SphereGeometry(.10,14,12),dark);hd.position.z=.30;hd.scale.set(1,.9,1.15);G.add(hd);
    [-1,1].forEach(o=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.026,8,6),black);e.position.set(o*.055,.03,.36);G.add(e);});
    const th=new THREE.Mesh(new THREE.SphereGeometry(.09,14,12),dark);th.position.z=.10;th.scale.set(.85,.8,1.3);G.add(th);
    const ab=new THREE.Mesh(new THREE.SphereGeometry(.145,16,14),body);ab.position.z=-.22;ab.scale.set(.9,.95,1.45);G.add(ab);
    const am=M(0x1b120c,.6);
    [-1,1].forEach(o=>{const p=new THREE.Group();p.position.set(o*.05,.05,.35);
      const a1=new THREE.Mesh(new THREE.CylinderGeometry(.008,.01,.20,5),am);a1.position.y=.1;a1.rotation.z=o*.6;p.add(a1);
      G.add(p);parts.ant.push({g:p,s:o});});
    for(let i=0;i<3;i++)[-1,1].forEach(o=>{
      const L=leg(.19,.22,am,.011);L.position.set(o*.075,-.045,.18-i*.16);L.rotation.z=o*.7;L.rotation.y=o*(i-1)*.5;
      G.add(L);parts.legs.push({g:L,ph:i*1.3+(o>0?0:Math.PI),amp:.42});});
  }
  else if(kind==='spider'){
    const c=new THREE.Mesh(new THREE.SphereGeometry(.11,14,12),dark);c.position.z=.14;c.scale.set(1,.8,1.1);G.add(c);
    const a=new THREE.Mesh(new THREE.SphereGeometry(.19,18,16),body);a.position.z=-.13;a.scale.set(1,.95,1.2);G.add(a);
    for(let i=0;i<4;i++)[-1,1].forEach(o=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.017,7,5),black);
      e.position.set(o*(.035+i*.022),.03+i*.012,.235);G.add(e);});
    const sm=M(0x14100c,.7);
    for(let i=0;i<4;i++)[-1,1].forEach(o=>{
      const L=leg(.30,.34,sm,.012);L.position.set(o*.09,.02,.10-i*.10);
      L.rotation.z=o*(1.05+i*.09);L.rotation.y=o*(.75-i*.42);
      G.add(L);parts.legs.push({g:L,ph:i*.8+(o>0?0:Math.PI),amp:.22});});
  }
  else if(kind==='ladybug'){
    const bd=new THREE.Mesh(new THREE.SphereGeometry(.17,20,16),red);bd.scale.set(1,.68,1.16);bd.position.y=.06;G.add(bd);
    const bl=new THREE.Mesh(new THREE.SphereGeometry(.085,14,12),black);bl.position.set(0,.05,.19);G.add(bl);
    const ln=new THREE.Mesh(new THREE.BoxGeometry(.014,.02,.34),black);ln.position.set(0,.175,0);G.add(ln);
    for(let i=0;i<3;i++)[-1,1].forEach(o=>{const sp=new THREE.Mesh(new THREE.SphereGeometry(.036,10,8),black);
      sp.position.set(o*.085,.155,-.09+i*.10);G.add(sp);});
    [-1,1].forEach(o=>{const p=new THREE.Group();p.position.set(o*.03,.15,.1);
      const w=new THREE.Mesh(new THREE.PlaneGeometry(.17,.34),wing);
      w.rotation.x=-Math.PI/2;w.position.set(o*.04,0,-.12);p.add(w);G.add(p);parts.wings.push({g:p,s:o});});
    for(let i=0;i<3;i++)[-1,1].forEach(o=>{const L=leg(.10,.11,black,.012);L.position.set(o*.10,-.02,.12-i*.12);L.rotation.z=o*1.2;G.add(L);
      parts.legs.push({g:L,ph:i,amp:.3});});
  }
  else if(kind==='fly'){
    const th=new THREE.Mesh(new THREE.SphereGeometry(.09,14,12),M(0x2c2a2e,.45,.2));th.position.z=.06;th.scale.set(1,.85,1.3);G.add(th);
    const ab=new THREE.Mesh(new THREE.SphereGeometry(.085,14,12),M(0x38343a,.5,.15));ab.position.z=-.14;ab.scale.set(.8,.8,1.7);G.add(ab);
    const hd=new THREE.Mesh(new THREE.SphereGeometry(.075,14,12),M(0x232025,.4,.2));hd.position.z=.19;G.add(hd);
    [-1,1].forEach(o=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.045,12,10),M(0x8f2018,.25,.3));
      e.position.set(o*.045,.02,.21);G.add(e);});
    [-1,1].forEach(o=>{const p=new THREE.Group();p.position.set(o*.05,.08,.05);
      const w=new THREE.Mesh(new THREE.PlaneGeometry(.13,.42),wing);w.position.set(o*.06,0,-.16);p.add(w);G.add(p);parts.wings.push({g:p,s:o});});
    for(let i=0;i<3;i++)[-1,1].forEach(o=>{const L=leg(.11,.13,black,.010);L.position.set(o*.07,-.05,.12-i*.11);L.rotation.z=o*1.4;G.add(L);
      parts.legs.push({g:L,ph:i,amp:.25});});
  }
  else if(kind==='beetle'){
    const sh=new THREE.Mesh(new THREE.SphereGeometry(.20,20,16),shine);sh.scale.set(1,.6,1.35);sh.position.y=.06;G.add(sh);
    const pr=new THREE.Mesh(new THREE.SphereGeometry(.11,16,12),shine);pr.position.set(0,.05,.24);pr.scale.set(1.15,.6,.9);G.add(pr);
    const hd=new THREE.Mesh(new THREE.SphereGeometry(.075,14,10),black);hd.position.set(0,.02,.34);G.add(hd);
    [-1,1].forEach(o=>{
      const mn=new THREE.Mesh(new THREE.ConeGeometry(.022,.10,6),black);
      mn.position.set(o*.04,-.01,.42);mn.rotation.x=1.5;mn.rotation.z=-o*.5;G.add(mn);
      const an=new THREE.Mesh(new THREE.CylinderGeometry(.007,.010,.20,5),black);
      an.position.set(o*.06,.07,.38);an.rotation.x=.6;an.rotation.z=o*.6;G.add(an);});
    const ln=new THREE.Mesh(new THREE.BoxGeometry(.012,.015,.42),black);ln.position.set(0,.185,.02);G.add(ln);
    /* هنا كان القوسُ مغلقاً خطأً: }); بدل }); داخل push */
    for(let i=0;i<3;i++)[-1,1].forEach(o=>{const L=leg(.16,.18,black,.014);L.position.set(o*.15,-.03,.16-i*.16);L.rotation.z=o*1.0;G.add(L);
      parts.legs.push({g:L,ph:i*1.2+(o>0?0:Math.PI),amp:.4});});
  }
  else if(kind==='mosquito'){
    const bm=M(0x3a332c,.6);
    const ab=new THREE.Mesh(new THREE.CylinderGeometry(.022,.012,.42,8),bm);ab.rotation.x=Math.PI/2.4;ab.position.set(0,.03,-.18);G.add(ab);
    const th=new THREE.Mesh(new THREE.SphereGeometry(.045,12,10),bm);th.position.z=.04;G.add(th);
    const hd=new THREE.Mesh(new THREE.SphereGeometry(.035,12,10),bm);hd.position.z=.10;G.add(hd);
    const pb=new THREE.Mesh(new THREE.CylinderGeometry(.005,.005,.20,5),black);pb.position.set(0,-.02,.19);pb.rotation.x=1.4;G.add(pb);
    [-1,1].forEach(o=>{const p=new THREE.Group();p.position.set(o*.02,.05,.03);
      const w=new THREE.Mesh(new THREE.PlaneGeometry(.055,.34),wing);w.position.set(o*.02,0,-.15);p.add(w);G.add(p);parts.wings.push({g:p,s:o});});
    for(let i=0;i<3;i++)[-1,1].forEach(o=>{const p=new THREE.Group();p.position.set(o*.035,-.02,.05-i*.05);
      const l1=new THREE.Mesh(new THREE.CylinderGeometry(.006,.005,.30,5),bm);l1.position.y=-.14;l1.rotation.z=o*.35;p.add(l1);
      G.add(p);parts.legs.push({g:p,ph:i,amp:.12});});
  }
  else if(kind==='roach'){
    const bm=M(0x5a3418,.42,.18);
    const ab=new THREE.Mesh(new THREE.SphereGeometry(.22,20,16),bm);ab.scale.set(.95,.32,1.5);ab.position.y=.02;G.add(ab);
    const pr=new THREE.Mesh(new THREE.SphereGeometry(.13,16,12),bm);pr.position.set(0,.03,.28);pr.scale.set(1.25,.35,.85);G.add(pr);
    const hd=new THREE.Mesh(new THREE.SphereGeometry(.07,12,10),M(0x3a2010,.5));hd.position.set(0,.0,.40);G.add(hd);
    [-1,1].forEach(o=>{const an=new THREE.Mesh(new THREE.CylinderGeometry(.006,.004,.55,5),M(0x2a1608,.7));
      an.position.set(o*.09,.03,.62);an.rotation.x=1.35;an.rotation.z=o*.42;G.add(an);parts.ant.push({g:an,s:o});});
    /* والقوسُ الثاني المغلقُ خطأً */
    for(let i=0;i<3;i++)[-1,1].forEach(o=>{const L=leg(.20,.24,M(0x2a1608,.6),.013);L.position.set(o*.15,-.02,.20-i*.20);L.rotation.z=o*1.15;G.add(L);
      parts.legs.push({g:L,ph:i*1.1+(o>0?0:Math.PI),amp:.55});});
  }
  else{ /* cricket */
    const bm=M(0x4a5a22,.6);
    const ab=new THREE.Mesh(new THREE.CylinderGeometry(.09,.06,.44,12),bm);ab.rotation.x=Math.PI/2;ab.position.z=-.20;G.add(ab);
    const th=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),bm);th.position.z=.08;th.scale.set(1,.9,1.2);G.add(th);
    const hd=new THREE.Mesh(new THREE.SphereGeometry(.085,14,12),bm);hd.position.z=.24;G.add(hd);
    [-1,1].forEach(o=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.026,10,8),black);e.position.set(o*.05,.03,.28);G.add(e);
      const an=new THREE.Mesh(new THREE.CylinderGeometry(.005,.003,.55,5),M(0x2f3a14,.7));
      an.position.set(o*.05,.08,.50);an.rotation.x=1.2;an.rotation.z=o*.25;G.add(an);parts.ant.push({g:an,s:o});});
    /* والقوسُ الثالث */
    for(let i=0;i<2;i++)[-1,1].forEach(o=>{const L=leg(.14,.16,M(0x39481a,.6),.012);L.position.set(o*.09,-.05,.10-i*.14);L.rotation.z=o*1.0;G.add(L);
      parts.legs.push({g:L,ph:i,amp:.3});});
    [-1,1].forEach(o=>{const p=new THREE.Group();p.position.set(o*.10,-.02,-.02);
      const f1=new THREE.Mesh(new THREE.CylinderGeometry(.032,.024,.24,8),bm);f1.position.set(o*.05,-.06,.02);f1.rotation.z=o*.9;p.add(f1);
      G.add(p);parts.legs.push({g:p,ph:0,amp:.25});});
  }
  G.userData.parts=parts;G.userData.kind=kind;
  return G;
}
class Bug{
  constructor(kind,accent,bounds,rnd){
    this.kind=kind;this.rnd=rnd;this.bounds=bounds;this.t=rnd()*100;
    this.o=makeInsect(kind,accent);
    this.mode=(kind==='fly'||kind==='mosquito'||kind==='ladybug')?'air':(kind==='spider'?'hang':'ground');
    if(this.mode==='ground'){this.o.position.set(this.rx(),.02,this.rz());this.y=.02;this.sp=.55+rnd()*.9;}
    else if(this.mode==='air'){this.o.position.set(this.rx(),1.0+rnd()*2.2,this.rz());this.sp=1.1+rnd()*1.4;this.cy=this.o.position.y;}
    else{this.o.position.set(this.rx(),2.6+rnd()*1.0,this.rz());this.sp=.4;}
    this.wp=this.newTarget();this.flip=rnd()<.5?-1:1;
    this.chirpT=rnd()*6;this.buzzT=rnd()*4;
  }
  rx(){const b=this.bounds;return b.x+(this.rnd()-.5)*b.w*.85;}
  rz(){const b=this.bounds;return b.z+(this.rnd()-.5)*b.d*.85;}
  newTarget(){return new THREE.Vector3(this.rx(),0,this.rz());}
  update(dt,time,player){
    const p=this.o.userData.parts;this.t+=dt;
    const walk=sp=>{p.legs.forEach(L=>{L.g.rotation.x=Math.sin(this.t*sp*7+L.ph)*L.amp;});
      p.ant.forEach(a=>{a.g.rotation.x=.6+Math.sin(this.t*3+a.s)*.25;});};
    if(this.mode==='ground'){
      const d=this.wp.clone().sub(this.o.position);d.y=0;
      if(d.length()<.5)this.wp=this.newTarget();
      d.normalize();
      const ang=Math.atan2(d.x,d.z);
      let da=ang-this.o.rotation.y;while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;
      this.o.rotation.y+=da*Math.min(1,dt*4);
      this.o.position.addScaledVector(d,this.sp*dt);
      const b=this.bounds;
      if(Math.abs(this.o.position.x-b.x)>b.w/2)this.wp=this.newTarget();
      if(Math.abs(this.o.position.z-b.z)>b.d/2)this.wp=this.newTarget();
      this.o.position.y=this.y+Math.abs(Math.sin(this.t*this.sp*7))*.012;
      walk(this.sp);
      if(this.kind==='cricket'){
        this.o.position.y+=Math.abs(Math.sin(this.t*2.2))*.30;
        this.chirpT-=dt;
        if(this.chirpT<=0){this.chirpT=3+this.rnd()*6;
          if(player&&this.o.position.distanceTo(player)<14)SND.chirp();}
      }
      if(this.kind==='roach'&&player){
        const dp=this.o.position.distanceTo(player);
        if(dp<3.2){const away=this.o.position.clone().sub(player).setY(0).normalize();
          this.wp.copy(this.o.position).addScaledVector(away,6);this.sp=3.4;}
        else this.sp=.9;
      }
    }
    else if(this.mode==='air'){
      const spd=this.sp;
      this.o.position.x+=Math.sin(this.t*spd*.9+this.flip*3)*dt*1.7;
      this.o.position.z+=Math.cos(this.t*spd*.7)*dt*1.7;
      this.o.position.y=this.cy+Math.sin(this.t*spd*1.6)*.55;
      if(player&&(this.kind==='mosquito'||this.kind==='fly')){
        if(this.kind==='mosquito'){
          const d=player.clone().sub(this.o.position);
          if(d.length()<7)this.o.position.addScaledVector(d.normalize(),dt*.9);
        }
        this.buzzT-=dt;
        if(this.buzzT<=0){this.buzzT=1.4+this.rnd()*3;
          if(this.o.position.distanceTo(player)<3.6)SND.buzz();}
      }
      const fs=(this.kind==='fly'||this.kind==='mosquito')?52:26;
      p.wings.forEach(w=>{w.g.rotation.z=w.s*Math.abs(Math.sin(this.t*fs))*(this.kind==='ladybug'?.75:1.1);});
      p.legs.forEach(L=>{L.g.rotation.x=Math.sin(this.t*fs*.3+L.ph)*.12;});
      const b=this.bounds;
      if(Math.abs(this.o.position.x-b.x)>b.w/2)this.flip*=-1;
      if(Math.abs(this.o.position.z-b.z)>b.d/2)this.cy=1+this.rnd()*2.2;
    }
    else{
      this.o.position.y=2.4+Math.sin(this.t*.5)*.5;
      this.o.rotation.y+=dt*.4;
      p.legs.forEach(L=>{L.g.rotation.x=Math.sin(this.t*1.2+L.ph)*.12;});
    }
  }
}
function addWebs(scene,bounds,rnd,n){
  const t=texWeb(),arr=[];
  const mat=new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false});
  for(let i=0;i<n;i++){
    const m=new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.2),mat);
    const side=Math.floor(rnd()*4),h=2.4+rnd()*1.4;
    const x=(rnd()-.5)*bounds.w*.9,z=(rnd()-.5)*bounds.d*.9;
    if(side===0){m.position.set(-bounds.w/2+.15,h,z);m.rotation.y=Math.PI/2;}
    else if(side===1){m.position.set(bounds.w/2-.15,h,z);m.rotation.y=-Math.PI/2;}
    else if(side===2){m.position.set(x,h,-bounds.d/2+.15);}
    else{m.position.set(x,h,bounds.d/2-.15);m.rotation.y=Math.PI;}
    scene.add(m);arr.push(m);
  }
  return arr;
}

/* ══════ ٦) المحرّك ══════ */
const holder=$('#scene');
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
renderer.outputEncoding=THREE.sRGBEncoding;   /* r128: encoding لا colorSpace */
holder.appendChild(renderer.domElement);

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(72,innerWidth/innerHeight,.08,420);
camera.position.set(0,1.7,0);
const clock=new THREE.Clock();

let W={colliders:[],pedestals:[],gate:null,keyObj:null,bugs:[],webs:[],pathMarks:[],
       maze:null,cell:5,cols:9,rows:9,lanterns:[],particles:null,bounds:{x:0,z:0,w:45,d:45},palms:[],stage:0,theme:THEMES.fort};

function disposeAll(){
  scene.traverse(o=>{
    if(o.geometry)o.geometry.dispose();
    if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];
      ms.forEach(m=>{for(const k in m){if(m[k]&&m[k].isTexture)m[k].dispose();}m.dispose();});}
  });
  while(scene.children.length)scene.remove(scene.children[0]);
}
function buildSky(theme){
  const c=cv(8,256),x=c.getContext('2d');
  const gr=x.createLinearGradient(0,0,0,256);
  gr.addColorStop(0,theme.sky[0]);gr.addColorStop(.55,theme.sky[1]);gr.addColorStop(1,theme.sky[2]);
  x.fillStyle=gr;x.fillRect(0,0,8,256);
  const m=new THREE.MeshBasicMaterial({map:tx(c),side:THREE.BackSide,fog:false});
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(300,32,20),m));
  /* هلالٌ بدل النجوم */
  const mc=cv(128,128),mx=mc.getContext('2d');
  mx.fillStyle='rgba(255,246,214,.95)';mx.beginPath();mx.arc(64,64,40,0,7);mx.fill();
  mx.globalCompositeOperation='destination-out';mx.beginPath();mx.arc(84,54,38,0,7);mx.fill();
  const moon=new THREE.Sprite(new THREE.SpriteMaterial({map:tx(mc),transparent:true,fog:false,opacity:.85}));
  moon.scale.set(38,38,1);moon.position.set(-120,120,-180);scene.add(moon);
}
function genMaze(cols,rows,rnd,open){
  const g=[];
  for(let y=0;y<rows;y++){g[y]=[];for(let x=0;x<cols;x++)g[y][x]={n:true,s:true,e:true,w:true,v:false};}
  const st=[[0,0]];g[0][0].v=true;
  while(st.length){
    const [cx,cy]=st[st.length-1];const nb=[];
    if(cy>0&&!g[cy-1][cx].v)nb.push([0,-1]);
    if(cy<rows-1&&!g[cy+1][cx].v)nb.push([0,1]);
    if(cx>0&&!g[cy][cx-1].v)nb.push([-1,0]);
    if(cx<cols-1&&!g[cy][cx+1].v)nb.push([1,0]);
    if(!nb.length){st.pop();continue;}
    const [dx,dy]=nb[Math.floor(rnd()*nb.length)];
    const nx=cx+dx,ny=cy+dy;
    if(dx===1){g[cy][cx].e=false;g[ny][nx].w=false;}
    if(dx===-1){g[cy][cx].w=false;g[ny][nx].e=false;}
    if(dy===1){g[cy][cx].s=false;g[ny][nx].n=false;}
    if(dy===-1){g[cy][cx].n=false;g[ny][nx].s=false;}
    g[ny][nx].v=true;st.push([nx,ny]);
  }
  for(let i=0;i<open;i++){
    const x=Math.floor(rnd()*cols),y=Math.floor(rnd()*rows),d=Math.floor(rnd()*4);
    const dx=[0,0,1,-1][d],dy=[-1,1,0,0][d],nx=x+dx,ny=y+dy;
    if(nx<0||ny<0||nx>=cols||ny>=rows)continue;
    if(dx===1){g[y][x].e=false;g[ny][nx].w=false;}
    if(dx===-1){g[y][x].w=false;g[ny][nx].e=false;}
    if(dy===1){g[y][x].s=false;g[ny][nx].n=false;}
    if(dy===-1){g[y][x].n=false;g[ny][nx].s=false;}
  }
  return g;
}
function bfsDist(g,cols,rows,sx,sy){
  const d=Array.from({length:rows},()=>new Array(cols).fill(-1));
  const q=[[sx,sy]];d[sy][sx]=0;
  while(q.length){
    const [x,y]=q.shift();
    [[0,-1,'n'],[0,1,'s'],[1,0,'e'],[-1,0,'w']].forEach(([dx,dy,a])=>{
      const nx=x+dx,ny=y+dy;
      if(nx<0||ny<0||nx>=cols||ny>=rows||g[y][x][a])return;
      if(d[ny][nx]!==-1)return;d[ny][nx]=d[y][x]+1;q.push([nx,ny]);
    });
  }
  return d;
}
function bfsPath(g,cols,rows,sx,sy,tx2,ty){
  const prev={};const seen=Array.from({length:rows},()=>new Array(cols).fill(false));
  const q=[[sx,sy]];seen[sy][sx]=true;
  while(q.length){
    const [x,y]=q.shift();
    if(x===tx2&&y===ty)break;
    [[0,-1,'n'],[0,1,'s'],[1,0,'e'],[-1,0,'w']].forEach(([dx,dy,a])=>{
      const nx=x+dx,ny=y+dy;
      if(nx<0||ny<0||nx>=cols||ny>=rows||g[y][x][a]||seen[ny][nx])return;
      seen[ny][nx]=true;prev[ny*cols+nx]=[x,y];q.push([nx,ny]);
    });
  }
  const out=[];let cx=tx2,cy=ty,guard=0;
  while(!(cx===sx&&cy===sy)&&guard++<4000){out.push([cx,cy]);const p=prev[cy*cols+cx];if(!p)break;cx=p[0];cy=p[1];}
  out.reverse();return out;
}

function buildStage(levelIdx,stage){
  disposeAll();
  const L=LEVELS[levelIdx-1],th=stage===3?THEMES.garden:THEMES[L[2]];
  const rnd=mulberry32(levelIdx*977+stage*31+7);
  scene.fog=new THREE.FogExp2(th.fog,th.fogD);
  scene.background=new THREE.Color(th.sky[1]);
  buildSky(th);

  scene.add(new THREE.HemisphereLight(th.sun,th.amb,th.ambI));
  scene.add(new THREE.AmbientLight(th.amb,th.ambI*.55));
  const sun=new THREE.DirectionalLight(th.sun,th.sunI);
  sun.position.set(38,60,-25);sun.castShadow=true;
  sun.shadow.mapSize.set(1024,1024);
  const sd=52;sun.shadow.camera.left=-sd;sun.shadow.camera.right=sd;sun.shadow.camera.top=sd;sun.shadow.camera.bottom=-sd;
  sun.shadow.camera.near=1;sun.shadow.camera.far=180;sun.shadow.bias=-.0008;
  scene.add(sun);

  const CELL=stage===3?6.2:5.2, HH=stage===3?4.6:4.35, T=.55;
  const cols=stage===3?9:(stage===0?9:stage===1?10:8), rows=cols;
  const maze=genMaze(cols,rows,rnd,stage===3?26:Math.floor(cols*rows*.10));
  const offX=-(cols*CELL)/2+CELL/2, offZ=-(rows*CELL)/2+CELL/2;
  const cx=c=>offX+c*CELL, cz=r=>offZ+r*CELL;

  const W_=cols*CELL+2,D_=rows*CELL+2;
  const fTex=texFloor(th.floor,th.wall2,th.trim);fTex.repeat.set(cols*1.4,rows*1.4);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(W_,D_),new THREE.MeshStandardMaterial({map:fTex,roughness:.92,metalness:.03}));
  floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
  const cTex=texCarpet(th.trim,th.wall2);cTex.repeat.set(2,2);
  const rug=new THREE.Mesh(new THREE.PlaneGeometry(CELL*2.6,CELL*2.6),new THREE.MeshStandardMaterial({map:cTex,roughness:.95}));
  rug.rotation.x=-Math.PI/2;rug.position.y=.012;rug.receiveShadow=true;scene.add(rug);

  if(!th.outdoor){
    const ceil=new THREE.Mesh(new THREE.PlaneGeometry(W_,D_),
      new THREE.MeshStandardMaterial({color:th.ceil,roughness:.95,side:THREE.DoubleSide}));
    ceil.rotation.x=Math.PI/2;ceil.position.y=HH;scene.add(ceil);
  }

  /* الجدران. كان طولُ الجدار الغربيّ يُكتب H وهو غير معرَّف، فيسقط
     بناءُ الطابق كلِّه قبل أن يظهر شيء. الصحيح HH. */
  const wTex=texWall(th.wall,th.wall2,th.trim,Math.floor(rnd()*8));wTex.repeat.set(1.6,1);
  const wallMat=new THREE.MeshStandardMaterial({map:wTex,roughness:.88,metalness:.04});
  const segs=[];
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
    const c=maze[y][x];
    if(c.n)segs.push([cx(x)-CELL/2,cz(y)-T/2,CELL+T,T]);
    if(c.w)segs.push([cx(x)-T/2,cz(y)-CELL/2,T,CELL+T]);
    if(y===rows-1&&c.s)segs.push([cx(x)-CELL/2,cz(y)+CELL/2+T/2,CELL+T,T]);
    if(x===cols-1&&c.e)segs.push([cx(x)+CELL/2+T/2,cz(y)-CELL/2,T,CELL+T]);
  }
  const inst=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),wallMat,segs.length);
  inst.castShadow=true;inst.receiveShadow=true;
  const dm=new THREE.Object3D(), colliders=[];
  segs.forEach((s,i)=>{
    const [px,pz,wdt,dep]=s;
    dm.position.set(px,HH/2,pz);dm.scale.set(wdt,HH,dep);dm.updateMatrix();
    inst.setMatrixAt(i,dm.matrix);
    colliders.push({minX:px-wdt/2-.32,maxX:px+wdt/2+.32,minZ:pz-dep/2-.32,maxZ:pz+dep/2+.32});
  });
  inst.instanceMatrix.needsUpdate=true;scene.add(inst);

  const pilMat=new THREE.MeshStandardMaterial({color:th.trim,roughness:.5,metalness:.22});
  for(let i=0;i<10;i++){
    const c=Math.floor(rnd()*cols),r=Math.floor(rnd()*rows);
    const p=new THREE.Mesh(new THREE.CylinderGeometry(.30,.36,HH,10),pilMat);
    p.position.set(cx(c)+CELL*.34,HH/2,cz(r)+CELL*.34);p.castShadow=true;scene.add(p);
    const cp=new THREE.Mesh(new THREE.BoxGeometry(.85,.30,.85),pilMat);
    cp.position.set(cx(c)+CELL*.34,HH-.15,cz(r)+CELL*.34);scene.add(cp);
  }

  W={colliders,pedestals:[],gate:null,keyObj:null,bugs:[],webs:[],pathMarks:[],
     maze,cell:CELL,cols,rows,lanterns:[],bounds:{x:0,z:0,w:cols*CELL,d:rows*CELL},palms:[],stage,
     cx,cz,HH,theme:th,levelIdx,particles:null,water:null};

  const lampTex=texGlow('rgba(255,214,140,1)');
  for(let i=0;i<Math.min(9,6+stage);i++){
    const c=Math.floor(rnd()*cols),r=Math.floor(rnd()*rows);
    const g=new THREE.Group();g.position.set(cx(c),0,cz(r));
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(.055,.08,2.1,8),M(0x3a2a18,.6,.4));
    pole.position.y=1.05;pole.castShadow=true;g.add(pole);
    const body=new THREE.Mesh(new THREE.OctahedronGeometry(.26,0),
      new THREE.MeshStandardMaterial({color:th.trim,emissive:th.lamp,emissiveIntensity:2.1,roughness:.3,metalness:.5}));
    body.position.y=2.32;g.add(body);
    const top=new THREE.Mesh(new THREE.ConeGeometry(.30,.30,6),M(0x5a4020,.5,.6));
    top.position.y=2.72;g.add(top);
    const pl=new THREE.PointLight(th.lamp,2.6,15,2);pl.position.y=2.35;g.add(pl);
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:lampTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.85}));
    sp.scale.set(2.4,2.4,1);sp.position.y=2.35;g.add(sp);
    scene.add(g);W.lanterns.push({g,light:pl,body,base:2.6,ph:rnd()*9});
  }

  const startCell=[0,rows-1];
  const dist=bfsDist(maze,cols,rows,startCell[0],startCell[1]);
  let far=[0,0],fd=-1;
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(dist[y][x]>fd){fd=dist[y][x];far=[x,y];}
  const cells=[];
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)
    if(!(x===0&&y===rows-1)&&!(x===far[0]&&y===far[1]))cells.push([x,y]);
  const sc=shuffle(cells,rnd);

  const need=stage===3?0:10;
  const tabTex=texTablet(th.trim);
  for(let i=0;i<need;i++){
    const [c,r]=sc[i];
    const g=new THREE.Group();g.position.set(cx(c),0,cz(r));
    const base=new THREE.Mesh(new THREE.CylinderGeometry(.55,.68,.35,12),M(th.wall2,.8));
    base.position.y=.175;base.castShadow=true;base.receiveShadow=true;g.add(base);
    const col=new THREE.Mesh(new THREE.CylinderGeometry(.26,.32,1.15,10),M(th.trim,.45,.4));
    col.position.y=.92;col.castShadow=true;g.add(col);
    const tab=new THREE.Mesh(new THREE.PlaneGeometry(1.05,1.32),
      new THREE.MeshStandardMaterial({map:tabTex,emissive:0xffffff,emissiveMap:tabTex,emissiveIntensity:.85,transparent:true,side:THREE.DoubleSide}));
    tab.position.y=2.15;g.add(tab);
    const back=new THREE.Mesh(new THREE.PlaneGeometry(1.15,1.42),
      new THREE.MeshStandardMaterial({color:th.wall2,roughness:.7,side:THREE.DoubleSide}));
    back.position.set(0,2.15,-.02);g.add(back);
    const gl=new THREE.PointLight(th.trim,1.5,7,2);gl.position.y=2.2;g.add(gl);
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:texGlow('rgba(255,240,200,1)'),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.6}));
    sp.scale.set(3.2,3.2,1);sp.position.y=2.15;g.add(sp);
    scene.add(g);
    W.pedestals.push({g,tab,gl,sp,pos:new THREE.Vector3(cx(c),0,cz(r)),solved:false,idx:i,spin:rnd()*6});
  }

  if(stage<3){
    const [kc,kr]=far;
    const altar=new THREE.Group();altar.position.set(cx(kc),0,cz(kr));
    const ab=new THREE.Mesh(new THREE.CylinderGeometry(.95,1.15,.5,12),M(th.wall2,.75));
    ab.position.y=.25;ab.castShadow=true;ab.receiveShadow=true;altar.add(ab);
    const ab2=new THREE.Mesh(new THREE.CylinderGeometry(.72,.85,.55,12),M(th.trim,.4,.55));
    ab2.position.y=.78;altar.add(ab2);
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2;
      const cn=new THREE.Mesh(new THREE.ConeGeometry(.07,.34,5),M(th.trim,.35,.7));
      cn.position.set(Math.cos(a)*.72,1.2,Math.sin(a)*.72);altar.add(cn);
    }
    scene.add(altar);
    const kg=new THREE.Group();
    const bs=new THREE.Shape();
    bs.moveTo(-.055,0);bs.quadraticCurveTo(.24,.28,.19,.72);
    bs.quadraticCurveTo(.10,1.06,-.02,1.16);bs.quadraticCurveTo(-.13,.86,-.09,.42);
    bs.quadraticCurveTo(-.16,.16,-.055,0);
    const blade=new THREE.Mesh(new THREE.ExtrudeGeometry(bs,{depth:.045,bevelEnabled:true,bevelSize:.012,bevelThickness:.01,bevelSegments:2}),
      new THREE.MeshStandardMaterial({color:0xe8d9a8,roughness:.18,metalness:.95,emissive:th.trim,emissiveIntensity:.25}));
    kg.add(blade);
    const hilt=new THREE.Mesh(new THREE.TorusGeometry(.10,.028,8,18),M(0xb98a3c,.25,.95));
    hilt.position.y=-.10;hilt.rotation.x=Math.PI/2;kg.add(hilt);
    kg.position.set(0,1.9,0);kg.visible=false;altar.add(kg);
    const kl=new THREE.PointLight(th.trim,3.2,14,2);kl.position.set(0,2.4,0);kl.visible=false;altar.add(kl);
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.42,.62,5.5,14,1,true),
      new THREE.MeshBasicMaterial({color:th.trim,transparent:true,opacity:.11,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));
    beam.position.y=3.0;beam.visible=false;altar.add(beam);
    W.keyObj={g:kg,light:kl,beam,pos:new THREE.Vector3(cx(kc),0,cz(kr)),taken:false};

    const [gc,gr]=sc[need+2]||[Math.floor(cols/2),0];
    const gate=new THREE.Group();gate.position.set(cx(gc),0,cz(gr));
    const arch=new THREE.Mesh(new THREE.TorusGeometry(1.5,.24,8,20,Math.PI),M(th.trim,.4,.6));
    arch.position.y=2.6;gate.add(arch);
    const dl=new THREE.Mesh(new THREE.BoxGeometry(2.9,3.2,.28),new THREE.MeshStandardMaterial({map:texDoor(th.trim,true),roughness:.7}));
    dl.position.y=1.6;dl.castShadow=true;gate.add(dl);
    const lockSym=new THREE.Sprite(new THREE.SpriteMaterial({map:texGlow('rgba(255,120,90,1)'),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
    lockSym.scale.set(1.6,1.6,1);lockSym.position.set(0,1.9,.3);gate.add(lockSym);
    const gl2=new THREE.PointLight(0xff7a55,1.4,9,2);gl2.position.set(0,2.2,.6);gate.add(gl2);
    scene.add(gate);
    W.gate={g:gate,door:dl,pos:new THREE.Vector3(cx(gc),0,cz(gr)),open:false,lockSym,light:gl2,final:false};
  }else{
    const fMat=new THREE.MeshStandardMaterial({map:texFrond(),transparent:true,alphaTest:.42,side:THREE.DoubleSide,roughness:.85});
    const bMat=new THREE.MeshStandardMaterial({map:texBark(),roughness:.95});
    for(let i=0;i<36;i++){
      const a=i/36*Math.PI*2, rad=CELL*1.9+((i%3)*CELL*.85);
      const px=Math.cos(a)*rad,pz=Math.sin(a)*rad;
      const p=new THREE.Group();p.position.set(px,0,pz);
      const h=5.5+rnd()*2.6, segsN=7;
      for(let s=0;s<segsN;s++){
        const sg=new THREE.Mesh(new THREE.CylinderGeometry(.30-s*.026,.34-s*.026,h/segsN+.1,9),bMat);
        sg.position.y=h/segsN*(s+.5)+Math.sin(s*.35)*.12;sg.rotation.z=Math.sin(s*.4)*.05;sg.castShadow=true;p.add(sg);
      }
      const crown=new THREE.Group();crown.position.y=h+.2;p.add(crown);
      for(let f=0;f<11;f++){
        const piv=new THREE.Group();piv.rotation.y=f/11*Math.PI*2;piv.rotation.z=-.55-Math.random()*.35;
        const fr=new THREE.Mesh(new THREE.PlaneGeometry(1.15,3.6),fMat);
        fr.position.set(0,0,1.8);fr.rotation.y=Math.PI/2;piv.add(fr);crown.add(piv);
      }
      const co=new THREE.Mesh(new THREE.SphereGeometry(.42,10,8),M(0x6d5a2a,.9));
      co.position.y=-.25;crown.add(co);
      scene.add(p);W.palms.push({g:p,crown});
    }
    const wg=new THREE.Mesh(new THREE.PlaneGeometry(3.2,cols*CELL*1.1),
      new THREE.MeshStandardMaterial({color:0x2a6a8a,roughness:.08,metalness:.55,transparent:true,opacity:.85,emissive:0x0e3a4a,emissiveIntensity:.6}));
    wg.rotation.x=-Math.PI/2;wg.position.y=.05;scene.add(wg);W.water=wg;
    const gate=new THREE.Group();gate.position.set(0,0,-CELL*1.2);
    const arch=new THREE.Mesh(new THREE.TorusGeometry(2.0,.30,10,26,Math.PI),
      new THREE.MeshStandardMaterial({color:th.trim,roughness:.3,metalness:.75,emissive:th.trim,emissiveIntensity:.4}));
    arch.position.y=3.1;gate.add(arch);
    [-1,1].forEach(o=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.34,.42,3.2,12),M(th.wall2,.5,.4));
      p.position.set(o*2.0,1.6,0);p.castShadow=true;gate.add(p);});
    const gl2=new THREE.PointLight(th.trim,4,20,2);gl2.position.set(0,3.4,0);gate.add(gl2);
    scene.add(gate);
    W.gate={g:gate,pos:new THREE.Vector3(0,0,-CELL*1.2),open:true,light:gl2,final:true};
    colliders.push({minX:-3.6,maxX:-1.2,minZ:-CELL*1.6,maxZ:-CELL*.8});
    colliders.push({minX:1.2,maxX:3.6,minZ:-CELL*1.6,maxZ:-CELL*.8});
  }

  buildParticles(th,rnd,cols*CELL);

  const kinds=['ant','spider','ladybug','fly','beetle','mosquito','roach','cricket'];
  for(let i=0;i<(stage===3?16:20);i++){
    const b=new Bug(kinds[Math.floor(rnd()*kinds.length)],th.trim,W.bounds,rnd);
    scene.add(b.o);W.bugs.push(b);
  }
  W.webs=addWebs(scene,W.bounds,rnd,stage===3?6:14);

  const pathTex=texPath(hex(th.trim));
  for(let i=0;i<180;i++){
    const m=new THREE.Mesh(new THREE.PlaneGeometry(.85,.85),
      new THREE.MeshBasicMaterial({map:pathTex,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));
    m.rotation.x=-Math.PI/2;m.visible=false;scene.add(m);W.pathMarks.push(m);
  }

  player.pos.set(cx(startCell[0]),0,cz(startCell[1])+CELL*.28);
  player.yaw=Math.PI;player.pitch=0;
  updateHud();updateObjective();
  return th;
}
function buildParticles(th,rnd,size){
  const n=260,pos=new Float32Array(n*3),vel=[];
  const t=texGlow(th.part==='sand'?'rgba(230,190,130,1)':th.part==='mist'?'rgba(200,230,230,1)':
             th.part==='incense'?'rgba(240,225,190,1)':th.part==='leaf'?'rgba(180,230,140,1)':
             th.part==='spray'?'rgba(190,225,255,1)':'rgba(255,235,190,1)');
  for(let i=0;i<n;i++){
    pos[i*3]=(rnd()-.5)*size;pos[i*3+1]=rnd()*4.2;pos[i*3+2]=(rnd()-.5)*size;
    vel.push({x:(rnd()-.5)*.25,y:th.part==='leaf'?-.25:th.part==='sand'?-.5:(rnd()-.5)*.12,z:(rnd()-.5)*.25});
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const m=new THREE.PointsMaterial({size:th.part==='mist'?.42:.16,map:t,transparent:true,opacity:.62,
    depthWrite:false,blending:THREE.AdditiveBlending,sizeAttenuation:true});
  const p=new THREE.Points(g,m);scene.add(p);
  W.particles={p,vel,size};
}

/* ══════ ٧) اللاعب ══════ */
const player={pos:new THREE.Vector3(),yaw:0,pitch:0,keys:{},bob:0,stepT:0,
  speed:3.4,run:6.0,radius:.44,running:false};
const lookDrag={active:false,x:0,y:0};
function collide(nx,nz){
  let x=nx,z=nz;
  for(const c of W.colliders){
    if(x+player.radius>c.minX&&x-player.radius<c.maxX&&z+player.radius>c.minZ&&z-player.radius<c.maxZ){
      const ox1=(x+player.radius)-c.minX, ox2=c.maxX-(x-player.radius);
      const oz1=(z+player.radius)-c.minZ, oz2=c.maxZ-(z-player.radius);
      const mx=Math.min(ox1,ox2),mz=Math.min(oz1,oz2);
      if(mx<mz)x+=(ox1<ox2?-mx:mx); else z+=(oz1<oz2?-mz:mz);
    }
  }
  const b=W.bounds;
  return [clamp(x,-b.w/2+.9,b.w/2-.9),clamp(z,-b.d/2+.9,b.d/2-.9)];
}
function cellOf(x,z){
  const c=Math.round((x-(-((W.cols*W.cell)/2)+W.cell/2))/W.cell);
  const r=Math.round((z-(-((W.rows*W.cell)/2)+W.cell/2))/W.cell);
  return [clamp(c,0,W.cols-1),clamp(r,0,W.rows-1)];
}

/* ══════ ٨) الحالة ══════ */
const SAVE_KEY='qasr_alnakhil_v2';
let save={unlocked:1,done:{},sound:true};
try{const s=JSON.parse(localStorage.getItem(SAVE_KEY));if(s)save=Object.assign(save,s);}catch(e){}
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(save));}catch(e){}}

const G={level:1,stage:0,totalSolved:0,keys:0,attempts:0,correct:0,
  riddles:[],playing:false,startTime:0,pathOn:true,mapOn:true,inRiddle:false};
const STAGE_NAMES=['الدور الأول — المدخل','الدور الثاني — الحُجُرات','الدور الثالث — القلب','الحديقة'];
const STAGE_NUM=['I','II','III','❋'];

function levelRiddles(level){
  const rnd=mulberry32(level*7919+101);
  const off=(level*53)%RIDDLES.length;
  const pool=shuffle(RIDDLES.slice(off).concat(RIDDLES.slice(0,off)),rnd).slice(0,30);
  return pool.map(r=>{
    const sh=shuffle([0,1,2,3],rnd);
    return {q:r[0],o:sh.map(k=>r[1][k]),c:sh.indexOf(r[2]),e:r[3]};
  });
}
function startLevel(n,stage=0){
  G.level=clamp(n,1,100);G.stage=stage;G.totalSolved=0;G.keys=0;G.attempts=0;G.correct=0;
  G.riddles=levelRiddles(G.level);G.playing=true;G.startTime=performance.now();
  const th=THEMES[LEVELS[G.level-1][2]];
  buildStage(G.level,G.stage);
  SND.startMusic(th.maqam,th.bpm);
  showScreen(null);
  $('#hud').classList.add('on');
  if(isTouch)$('#touch').classList.add('on');
  toast('الطابق '+ar(G.level)+' — '+LEVELS[G.level-1][0],3200);
  setTimeout(()=>Coach.say('ابدأ · Begin',
    'امشِ بـ W A S D أو باصبعك. اتبع الدربَ المضيء إلى أقربِ مِسَلَّة، واضغط E عندها.',6500,'🏰'),2600);
}
/* G.solvedStage() كانت تُنادى ولا وجودَ لها، فيسقط تحديثُ الشريط. */
function stageSolved(){return W.pedestals.filter(p=>p.solved).length;}
function updateHud(){
  const L=LEVELS[G.level-1],th=G.stage===3?THEMES.garden:THEMES[L[2]];
  const c=hex(th.trim);
  $('#hudLv').textContent='الطابق '+ar(G.level);
  $('#hudName').textContent=L[0]+' · '+L[1];
  $('#hudDot').style.background=c;$('#hudDot').style.color=c;
  $('#hudFloor').textContent=STAGE_NUM[G.stage];
  $('#hudRid').textContent=ar(G.totalSolved)+' / ٣٠';
  $('#hudKey').textContent=ar(G.keys);
}
function updateObjective(){
  let t;
  if(G.stage===3)t='امشِ إلى بوّابة الحديقة الكبرى — سِتٌّ وثلاثون نخلةً تنتظرك.';
  else{
    const s=stageSolved();
    if(s<10)t='حُلَّ الألغاز: '+ar(s)+' / ١٠ — اتبع الدرب المضيء إلى أقرب مِسَلَّة.';
    else if(W.keyObj&&!W.keyObj.taken)t='ظهر مفتاحُ الدور على المذبح! اذهب وخُذه.';
    else if(W.gate&&!W.gate.open)t='الباب مقفل — حُلَّ الألغاز العشرة ليظهر المفتاح.';
    else t='الباب مفتوح! ادخله لتصعد إلى الدور التالي.';
  }
  $('#objTxt').textContent=t;
}
function currentTarget(){
  if(G.stage===3)return W.gate?W.gate.pos:null;
  const un=W.pedestals.filter(p=>!p.solved);
  if(un.length){un.sort((a,b)=>a.pos.distanceToSquared(player.pos)-b.pos.distanceToSquared(player.pos));return un[0].pos;}
  if(W.keyObj&&!W.keyObj.taken)return W.keyObj.pos;
  return W.gate?W.gate.pos:null;
}
function nearestInteractable(){
  let best=null,bd=3.0;
  for(const p of W.pedestals){
    if(p.solved)continue;
    const d=Math.hypot(p.pos.x-player.pos.x,p.pos.z-player.pos.z);
    if(d<bd){bd=d;best={type:'ped',o:p,label:'حُلَّ اللغز ('+ar(p.idx+1)+'/١٠)'};}
  }
  if(W.keyObj&&!W.keyObj.taken&&W.keyObj.g.visible){
    const d=Math.hypot(W.keyObj.pos.x-player.pos.x,W.keyObj.pos.z-player.pos.z);
    if(d<3.0&&d<bd){bd=d;best={type:'key',o:W.keyObj,label:'خُذ مفتاح الدور'};}
  }
  if(W.gate){
    const d=Math.hypot(W.gate.pos.x-player.pos.x,W.gate.pos.z-player.pos.z);
    if(d<(W.gate.final?3.4:3.0)&&d<bd){
      if(W.gate.final)best={type:'final',o:W.gate,label:'ادخل الحديقة'};
      else if(W.gate.open)best={type:'gate',o:W.gate,label:'اصعد إلى '+STAGE_NAMES[G.stage+1]};
      else best={type:'locked',o:W.gate,label:'الباب مقفل — يحتاج مفتاح الدور'};
    }
  }
  return best;
}
function interact(){
  if(G.inRiddle||!G.playing)return;
  const t=nearestInteractable();
  if(!t)return;
  if(t.type==='ped')openRiddle(t.o);
  else if(t.type==='key'){
    t.o.taken=true;t.o.g.visible=false;t.o.light.visible=false;t.o.beam.visible=false;
    G.keys++;SND.key();SND.unlock();updateHud();updateObjective();
    toast('◆ حصلتَ على مفتاح الدور! فُتحت البوابة.',3000);
    if(W.gate){W.gate.open=true;W.gate.lockSym.material.opacity=0;W.gate.light.color.set(0x7aff9a);
      W.gate.door.material.map=texDoor(W.theme.trim,false);W.gate.door.material.needsUpdate=true;}
  }
  else if(t.type==='gate'||t.type==='final')advanceStage();
  else if(t.type==='locked'){toast('✖ الباب مقفل — حُلَّ الألغاز العشرة أولًا.',2200);SND.wrong();}
}
function advanceStage(){
  if(G.busy)return; G.busy=true;
  SND.door();SND.chime(784);
  fade(()=>{
    if(G.stage<2){G.stage++;buildStage(G.level,G.stage);
      const th=THEMES[LEVELS[G.level-1][2]];
      SND.stopMusic();setTimeout(()=>SND.startMusic(th.maqam,th.bpm),200);
      toast('صعدتَ إلى '+STAGE_NAMES[G.stage],2600);}
    else if(G.stage===2){G.stage=3;buildStage(G.level,3);
      SND.stopMusic();setTimeout(()=>SND.startMusic('rast',112),200);
      toast('❋ انفتحت الحديقة… سِتٌّ وثلاثون نخلةً تنحني',3000);}
    else finishLevel();
    G.busy=false;
  });
}
function finishLevel(){
  G.playing=false;SND.stopMusic();SND.win();
  const t=Math.floor((performance.now()-G.startTime)/1000);
  $('#fsR').textContent=ar(G.totalSolved);$('#fsK').textContent=ar(G.keys);
  $('#fsT').textContent=ar(Math.floor(t/60))+':'+ar(String(t%60).padStart(2,'0'));
  $('#fsA').textContent=ar(G.attempts?Math.round(G.correct/G.attempts*100):100);
  const last=G.level>=100;
  $('#finTitle').textContent=last?'تَمَّتِ المائةُ طابقًا!':'انفتحتِ الحديقة';
  $('#finText').innerHTML=last
    ? 'مئةُ طابقٍ… وآلافُ الألغاز…<br>ستٌّ وثلاثون نخلةً في كل حديقةٍ انحنَت لك.<br>لقد صِرتَ حارسَ قصرِ النخيل، وراويةَ تاريخِ عُمان.'
    : 'ثلاثةُ أدوارٍ قُهرت، وثلاثون لُغزًا أُجيبت.<br>سِتٌّ وثلاثون نخلةً تنحني وأنت تعبر.<br><b style="color:var(--gold)">الطابق '+ar(G.level)+' — '+LEVELS[G.level-1][0]+'</b> اكتمل.';
  $('#finNext').textContent=last?'◈ الطوابق':'الطابق '+ar(G.level+1)+' ▶';
  save.done[G.level]=true;
  if(G.level+1<=100)save.unlocked=Math.max(save.unlocked,G.level+1);
  persist();
  $('#hud').classList.remove('on');$('#touch').classList.remove('on');
  Coach.hide();
  $('#finale').classList.add('on');
}

/* ══════ ٩) المرشد ══════ */
const Coach=(function(){
  let el=null,box=null,t=null,last=0,lastMsg='';
  function say(title,text,ms,face){
    if(!el){el=$('#coach');box=el&&el.querySelector('.cb');}
    if(!el||!box)return;
    const now=Date.now();
    if(now-last<9000||text===lastMsg)return;
    last=now;lastMsg=text;
    el.querySelector('.cf').textContent=face||'🧭';
    box.innerHTML='<b>'+title+'</b>'+text;
    el.classList.add('on');
    clearTimeout(t);t=setTimeout(()=>el.classList.remove('on'),ms||5200);
  }
  return {say,hide(){if(el)el.classList.remove('on');}};
})();
function coachNudge(){
  if(!G.playing||G.inRiddle)return;
  if(G.stage===3){Coach.say('البوّابة · The gate','امشِ إلى القوس المضيء في وسط الحديقة.',6000,'🌴');return;}
  const left=10-stageSolved();
  if(left>0)Coach.say('ابحثْ · Look around',
    'بقيَ '+ar(left)+' من ألغاز هذا الدور. المِسَلّاتُ المضيئة على الخريطة أسفلَ اليسار.',6000,'🧭');
  else if(W.keyObj&&!W.keyObj.taken)Coach.say('المفتاح · The key',
    'أجبتَ عن ألغاز الدور كلِّها. بقي المفتاحُ الذهبيّ على المذبح — البوصلةُ تشير إليه.',6000,'🗝️');
  else Coach.say('الباب · The door','معكَ المفتاح، والبابُ صار مفتوحًا. امشِ إليه.',6000,'🚪');
}

/* ══════ ١٠) الألغاز ══════ */
let curPed=null,wrongCount=0;
function openRiddle(ped){
  curPed=ped;wrongCount=0;G.inRiddle=true;Coach.hide();
  const r=G.riddles[ped.idx+G.stage*10];if(!r)return;
  const L=LEVELS[G.level-1],th=G.stage===3?THEMES.garden:THEMES[L[2]];
  $('#rTag').textContent='اللغز '+ar(G.totalSolved+1)+' / ٣٠';
  $('#rTag').style.background='linear-gradient(180deg,'+hex(th.trim)+',#8a6428)';
  $('#rCnt').textContent='◆ '+STAGE_NAMES[G.stage];
  $('#rQ').textContent=r.q;
  $('#rSub').textContent='— من تراث عُمان: '+L[1]+' —';
  const box=$('#rOpts');box.innerHTML='';
  r.o.forEach((o,i)=>{
    const b=document.createElement('div');b.className='opt';b.dataset.i=i;
    b.innerHTML='<span class="lit">'+['أ','ب','ج','د'][i]+'</span><span>'+o+'</span>';
    b.onclick=()=>answer(i,b,r);box.appendChild(b);
  });
  $('#rFoot').classList.remove('on');
  $('#riddle').classList.add('on');
  SND.click();
}
function markSolved(){
  curPed.solved=true;G.totalSolved++;
  curPed.gl.intensity=.35;curPed.sp.material.opacity=.14;
  updateHud();updateObjective();
  if(stageSolved()===10&&W.keyObj&&!W.keyObj.taken){
    W.keyObj.g.visible=true;W.keyObj.light.visible=true;W.keyObj.beam.visible=true;
    setTimeout(()=>{SND.key();toast('◆ ظهر مفتاحُ الدور على المذبح!',3000);},900);
  }
}
function answer(i,el,r){
  if(el.classList.contains('dis'))return;
  G.attempts++;
  const all=$$('#rOpts .opt');
  if(i===r.c){
    G.correct++;
    el.classList.add('right');all.forEach(o=>o.classList.add('dis'));
    curPed.tab.material.color.set(0x2a4a2a);curPed.tab.material.emissiveIntensity=.25;
    SND.correct();
    $('#rLore').innerHTML='<b>✦ صحيح.</b> '+r.e;
    $('#rFoot').classList.add('on');$('#rNext').textContent='متابعة ← (مسافة)';
    markSolved();
  }else{
    wrongCount++;
    el.classList.add('wrong');el.classList.add('dis');
    SND.wrong();
    if(wrongCount===1){
      $('#rLore').innerHTML='<b>❖ تلميح من التراث:</b> '+r.e.slice(0,Math.min(70,r.e.length))+'…';
      $('#rFoot').classList.add('on');$('#rNext').textContent='حاول ثانية ← (مسافة)';
    }else{
      all.forEach(o=>{o.classList.add('dis');if(+o.dataset.i===r.c)o.classList.add('right');});
      $('#rLore').innerHTML='<b>✦ الإجابة الصحيحة:</b> '+r.o[r.c]+'<br>'+r.e;
      $('#rFoot').classList.add('on');$('#rNext').textContent='متابعة ← (مسافة)';
      curPed.tab.material.color.set(0x4a2a2a);
      markSolved();
    }
  }
}
function closeRiddle(){$('#riddle').classList.remove('on');G.inRiddle=false;curPed=null;}
function riddleNext(){
  const all=$$('#rOpts .opt');
  if(all.some(o=>o.classList.contains('right')))closeRiddle();
  else{$('#rFoot').classList.remove('on');all.forEach(o=>o.classList.remove('wrong'));}
}

/* ══════ ١١) الواجهة ══════ */
let toastT=null;
function toast(msg,ms=2200){
  const t=$('#toast');t.innerHTML=msg;t.classList.add('on');
  clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),ms);
}
function fade(cb){const f=$('#fade');f.classList.add('on');
  setTimeout(()=>{cb&&cb();setTimeout(()=>f.classList.remove('on'),90);},560);}
function showScreen(id){$$('.screen').forEach(s=>s.classList.remove('on'));if(id)$(id).classList.add('on');}
function buildLevelGrid(){
  const chapNames=['الداخلية — الحُصون والأفلاج','الباطنة — السواحل والقلاع','ظفار — أرض اللبان والخريف',
    'الشرقية — الرمال والبحر','مسقط ومسندم — البحر والجبل','الظاهرة والوسطى والبريمي — الصحارى والآثار',
    'الحِرف والصناعات التقليدية','الفنون والموسيقى الشعبية','التاريخ والدول','الطبيعة والحديقة الكبرى'];
  const list=$('#chapList');list.innerHTML='';
  for(let c=0;c<10;c++){
    const div=document.createElement('div');
    div.innerHTML='<div class="chapTitle"><span>◈ '+chapNames[c]+'</span><i></i></div>';
    const g=document.createElement('div');g.className='lvGrid';
    for(let i=c*10+1;i<=c*10+10;i++){
      const L=LEVELS[i-1],col=hex(THEMES[L[2]].trim);
      const unlocked=i<=save.unlocked,done=save.done[i];
      const b=document.createElement('div');
      b.className='lv'+(unlocked?'':' locked')+(i===save.unlocked?' cur':'');
      b.style.background='linear-gradient(160deg,'+col+'55,#0d0818 72%)';
      b.style.borderColor=col+'88';
      b.innerHTML='<span class="num">'+ar(i)+'</span>'+(done?'<span class="done">✓</span>':'')+
        '<b style="color:'+col+'">◆</b><small>'+L[0]+'</small>';
      if(unlocked)b.onclick=()=>{SND.init();startLevel(i);};
      else b.onclick=()=>{toast('✖ هذا الطابق مقفل — أكمل الطابق '+ar(i-1)+' أولًا.',2200);SND.wrong();};
      g.appendChild(b);
    }
    div.appendChild(g);list.appendChild(div);
  }
}
function buildSymbols(){
  const defs=[
    ['khanjar','الخنجر','رمز الرجولة — يظهر على البوّابة المقفلة'],
    ['palm','النخلة','دليل الحديقة والنهاية'],
    ['dhow','الشراع','يدلّ على المسار إلى البوابة'],
    ['falaj','الفلج','موجات الماء — قرب المفتاح'],
    ['khatam','الخاتم','نقشٌ هندسي — زخرفة الجدران'],
    ['frank','قطرة اللبان','تدلّ على الألغاز غير المحلولة'],
    ['arch','القوس','بوّابة الدور التالي'],
    ['letter','حرف العين','نقشُ عُمان على الجدران']
  ];
  const row=$('#symRow');row.innerHTML='';
  defs.forEach(([n,t,d])=>{
    const c=cv(104,104),x=c.getContext('2d');
    symbolDraw(x,n,52,52,34,'#e8c17a');
    const div=document.createElement('div');div.className='sym';
    div.innerHTML='<img src="'+c.toDataURL()+'" alt="'+t+'" style="width:52px;height:52px"><b>'+t+'</b><small>'+d+'</small>';
    row.appendChild(div);
  });
  const bugs=[['🐜','النمل','يسير على الأرض في صفوف'],['🕷️','العنكبوت','يتدلّى من السقف'],
    ['🐞','الدعسوقة','تطير وترفرف جناحيها'],['🪰','الذبابة','تطنّ قرب الأذن'],
    ['🕸️','الشبكة','في زوايا الجدران'],['🪲','الخنفساء','درعٌ لامع'],
    ['🦟','البعوضة','تحوم عند الرأس'],['🦗','الجُدجُد','يقفز ويُصوّت'],
    ['🪳','الصرصور','يفرّ منك مسرعًا']];
  const br=$('#bugRow');br.innerHTML='';
  bugs.forEach(([e,t,d])=>{
    const div=document.createElement('div');div.className='sym';
    div.innerHTML='<div style="font-size:2.1rem;line-height:1">'+e+'</div><b>'+t+'</b><small>'+d+'</small>';
    br.appendChild(div);
  });
}
function buildPalmSil(){
  const g=$('#palmSil');g.innerHTML='';
  for(let i=0;i<13;i++){
    const x=40+i*92,h=110+((i*37)%60);
    const p=document.createElementNS('http://www.w3.org/2000/svg','g');
    p.setAttribute('fill','#150d22');
    p.innerHTML='<rect x="'+(x-4)+'" y="'+(190-h)+'" width="8" height="'+h+'"/>'+
      Array.from({length:7},(_,k)=>{const a=-1.3+k*.43;
        const ex=x+Math.cos(a)*34, ey=190-h+Math.sin(a)*20;
        return '<ellipse cx="'+ex+'" cy="'+ey+'" rx="34" ry="9" transform="rotate('+(a*40)+' '+ex+' '+ey+')"/>';}).join('');
    g.appendChild(p);
  }
}
function pauseMenu(){
  G.playing=false;SND.stopMusic();Coach.hide();
  $('#hud').classList.remove('on');$('#touch').classList.remove('on');
  showScreen('#title');
  $('#progLine').textContent='آخر طابق مفتوح: '+ar(save.unlocked)+' · مكتملة: '+ar(Object.keys(save.done).length)+' من ١٠٠';
}

/* ══════ ١٢) المدخلات ══════ */
addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();
  player.keys[k]=true;
  if(k==='shift')player.running=true;
  if(k==='escape'){ if(G.inRiddle)closeRiddle(); else if(G.playing)pauseMenu(); return; }
  if(G.inRiddle){
    if(k===' '||k==='enter'){riddleNext();e.preventDefault();}
    if(['1','2','3','4'].includes(k)){const o=$$('#rOpts .opt')[+k-1];if(o)o.click();}
    return;
  }
  if((k==='e'||k===' ')&&G.playing){interact();e.preventDefault();}
  if(k==='p'&&G.playing){G.pathOn=!G.pathOn;$('#ibPath').classList.toggle('off',!G.pathOn);
    toast(G.pathOn?'◆ المسار مُفعَّل':'◆ المسار مُخفي',1400);}
  if(k==='m'&&G.playing){G.mapOn=!G.mapOn;$('#ibMap').classList.toggle('off',!G.mapOn);
    $('#minimap').style.display=G.mapOn?'':'none';}
});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();player.keys[k]=false;if(k==='shift')player.running=false;});

const cvEl=renderer.domElement;
cvEl.addEventListener('pointerdown',e=>{if(!G.playing||G.inRiddle)return;
  lookDrag.active=true;lookDrag.x=e.clientX;lookDrag.y=e.clientY;});
addEventListener('pointerup',e=>{
  if(lookDrag.active&&Math.abs(e.clientX-lookDrag.x)<6&&Math.abs(e.clientY-lookDrag.y)<6&&G.playing&&!G.inRiddle)interact();
  lookDrag.active=false;});
addEventListener('pointermove',e=>{
  if(!lookDrag.active)return;
  player.yaw-=(e.clientX-lookDrag.x)*.0042;
  player.pitch=clamp(player.pitch-(e.clientY-lookDrag.y)*.0032,-.85,.85);
  lookDrag.x=e.clientX;lookDrag.y=e.clientY;});

$$('.tb').forEach(b=>{
  const k=b.dataset.k;
  const on=e=>{e.preventDefault();
    if(k==='e'){interact();return;} if(k==='look')return;
    if(k==='run')player.running=true;else player.keys[k]=true;};
  const off=e=>{e.preventDefault();if(k==='run')player.running=false;else player.keys[k]=false;};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);
  b.addEventListener('pointercancel',off);b.addEventListener('pointerleave',off);
});

$('#bStart').onclick=()=>{SND.init();startLevel(save.unlocked);};
$('#bLevels').onclick=()=>{SND.init();buildLevelGrid();showScreen('#levels');};
$('#bInst').onclick=()=>{SND.init();showScreen('#inst');};
$('#bInstBack').onclick=()=>showScreen('#title');
$('#bInstPlay').onclick=()=>{SND.init();startLevel(save.unlocked);};
$('#bLvBack').onclick=()=>showScreen('#title');
$('#bLvReset').onclick=()=>{if(confirm('تصفير كل التقدُّم؟')){save={unlocked:1,done:{},sound:save.sound};persist();buildLevelGrid();}};
$('#bSound').onclick=()=>{SND.init();save.sound=!save.sound;SND.setOn(save.sound);persist();
  $('#bSound').textContent=save.sound?'♪ الصوت: مُفعَّل':'♪ الصوت: مكتوم';};
$('#ibSnd').onclick=()=>{save.sound=!save.sound;SND.setOn(save.sound);persist();$('#ibSnd').classList.toggle('off',!save.sound);};
$('#ibPath').onclick=()=>{G.pathOn=!G.pathOn;$('#ibPath').classList.toggle('off',!G.pathOn);};
$('#ibMap').onclick=()=>{G.mapOn=!G.mapOn;$('#ibMap').classList.toggle('off',!G.mapOn);$('#minimap').style.display=G.mapOn?'':'none';};
$('#ibHelp').onclick=()=>{const wasPlaying=G.playing;G.playing=false;showScreen('#inst');
  $('#bInstBack').onclick=()=>{showScreen(null);if(wasPlaying)G.playing=true;};};
$('#ibMenu').onclick=()=>pauseMenu();
$('#rClose').onclick=()=>closeRiddle();
$('#rNext').onclick=()=>riddleNext();
$('#finNext').onclick=()=>{const n=G.level+1;$('#finale').classList.remove('on');
  if(n<=100)startLevel(n);else{buildLevelGrid();showScreen('#levels');}};
$('#finLv').onclick=()=>{$('#finale').classList.remove('on');buildLevelGrid();showScreen('#levels');};
$('#finHome').onclick=()=>{$('#finale').classList.remove('on');pauseMenu();};

/* ══════ ١٣) الخريطة والبوصلة والمسار ══════ */
function drawMinimap(){
  if(!G.mapOn||!W.maze)return;
  const S=344,m=$('#minimap').getContext('2d');
  m.clearRect(0,0,S,S);
  const col=hex(W.theme.trim);
  const cs=S/(Math.max(W.cols,W.rows)+1),ox=(S-W.cols*cs)/2,oy=(S-W.rows*cs)/2;
  m.fillStyle='rgba(10,6,18,.55)';m.fillRect(0,0,S,S);
  m.strokeStyle=col+'66';m.lineWidth=3;
  for(let y=0;y<W.rows;y++)for(let x=0;x<W.cols;x++){
    const c=W.maze[y][x],px=ox+x*cs,py=oy+y*cs;
    if(c.n){m.beginPath();m.moveTo(px,py);m.lineTo(px+cs,py);m.stroke();}
    if(c.w){m.beginPath();m.moveTo(px,py);m.lineTo(px,py+cs);m.stroke();}
    if(y===W.rows-1&&c.s){m.beginPath();m.moveTo(px,py+cs);m.lineTo(px+cs,py+cs);m.stroke();}
    if(x===W.cols-1&&c.e){m.beginPath();m.moveTo(px+cs,py);m.lineTo(px+cs,py+cs);m.stroke();}
  }
  const toMap=(wx,wz)=>[ox+(wx+W.bounds.w/2)/W.cell*cs,oy+(wz+W.bounds.d/2)/W.cell*cs];
  W.pedestals.forEach(p=>{const [mx,my]=toMap(p.pos.x,p.pos.z);
    m.beginPath();m.arc(mx,my,cs*.20,0,7);m.fillStyle=p.solved?'rgba(120,140,120,.6)':col;m.fill();});
  if(W.keyObj&&!W.keyObj.taken&&W.keyObj.g.visible){const [mx,my]=toMap(W.keyObj.pos.x,W.keyObj.pos.z);
    m.beginPath();m.arc(mx,my,cs*.26,0,7);m.fillStyle='#ffe08a';m.fill();}
  if(W.gate){const [mx,my]=toMap(W.gate.pos.x,W.gate.pos.z);
    m.save();m.translate(mx,my);m.rotate(Math.PI/4);
    m.fillStyle=(W.gate.open||W.gate.final)?'#7aff9a':'#ff7a55';m.fillRect(-cs*.24,-cs*.24,cs*.48,cs*.48);m.restore();}
  const [px2,py2]=toMap(player.pos.x,player.pos.z);
  m.save();m.translate(px2,py2);m.rotate(-player.yaw);
  m.beginPath();m.moveTo(0,-cs*.42);m.lineTo(cs*.3,cs*.3);m.lineTo(0,cs*.13);m.lineTo(-cs*.3,cs*.3);m.closePath();
  m.fillStyle='#fff3d0';m.fill();m.restore();
}
function drawCompass(){
  const t=currentTarget(),svg=$('#compass'),col=hex((W.theme||THEMES.fort).trim);
  let ang=0,dist=0;
  if(t){ang=Math.atan2(t.x-player.pos.x,t.z-player.pos.z)-player.yaw;
    dist=Math.hypot(t.x-player.pos.x,t.z-player.pos.z);}
  svg.innerHTML=
  '<circle cx="50" cy="50" r="46" fill="rgba(8,5,15,.72)" stroke="'+col+'" stroke-width="1.6"/>'+
  '<circle cx="50" cy="50" r="38" fill="none" stroke="'+col+'" stroke-width=".8" opacity=".4" stroke-dasharray="3 6"/>'+
  Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;
    return '<line x1="'+(50+Math.sin(a)*41)+'" y1="'+(50-Math.cos(a)*41)+'" x2="'+(50+Math.sin(a)*46)+'" y2="'+(50-Math.cos(a)*46)+'" stroke="'+col+'" stroke-width="'+(i%2?1:2.4)+'"/>';}).join('')+
  '<g transform="rotate('+(-ang*180/Math.PI).toFixed(1)+' 50 50)">'+
    '<path d="M50 16 L60 52 L50 45 L40 52 Z" fill="'+col+'"/>'+
    '<path d="M50 84 L44 60 L50 65 L56 60 Z" fill="'+col+'" opacity=".45"/></g>'+
  '<circle cx="50" cy="50" r="4" fill="#fff3d0"/>'+
  '<text x="50" y="98" text-anchor="middle" font-family="Reem Kufi" font-size="12" fill="'+col+'">'+(t?ar(Math.round(dist))+'م':'')+'</text>';
}
let pathT=0;
function updatePath(dt,t){
  if(!W.maze||!G.pathOn){W.pathMarks.forEach(m=>m.visible=false);return;}
  const tgt=currentTarget();
  if(!tgt){W.pathMarks.forEach(m=>m.visible=false);return;}
  pathT-=dt;
  if(pathT<=0){
    pathT=.35;
    const [pc,pr]=cellOf(player.pos.x,player.pos.z);
    const [tc,tr]=cellOf(tgt.x,tgt.z);
    const route=bfsPath(W.maze,W.cols,W.rows,pc,pr,tc,tr);
    const pts=route.map(([c,r])=>new THREE.Vector3(W.cx(c),0,W.cz(r)));
    pts.push(tgt.clone().setY(0));
    W._route=pts;
  }
  const pts=W._route||[],col=new THREE.Color(W.theme.trim);
  let idx=0;
  for(let i=0;i<pts.length&&idx<W.pathMarks.length;i++){
    const a=pts[i],b=pts[i+1];
    const steps=b?Math.max(1,Math.floor(a.distanceTo(b)/1.1)):1;
    for(let s=0;s<steps&&idx<W.pathMarks.length;s++){
      const p=b?a.clone().lerp(b,s/steps):a.clone();
      const m=W.pathMarks[idx++];
      m.visible=true;m.position.set(p.x,.035,p.z);
      m.rotation.z=t*.9+idx*.4;
      m.material.opacity=Math.max(0,.30+.30*Math.sin(t*3.2-idx*.42))*(1-idx/42*.5);
      m.material.color.copy(col);
    }
  }
  for(let i=idx;i<W.pathMarks.length;i++)W.pathMarks[i].visible=false;
}

/* ══════ ١٤) الحلقة ══════ */
let frameCount=0,lastProgress=Date.now(),lastSolved=-1,lastKeys=-1;
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),.05), t=clock.elapsedTime;
  frameCount++;

  if(G.playing&&!G.inRiddle){
    const k=player.keys;
    let fwd=0,turn=0;
    if(k['w']||k['ص'])fwd+=1;
    if(k['s']||k['س'])fwd-=1;
    if(k['a']||k['ش'])turn+=1;
    if(k['d']||k['ي'])turn-=1;
    if(k['arrowleft'])turn+=1;
    if(k['arrowright'])turn-=1;
    if(k['arrowup'])player.pitch=clamp(player.pitch+dt*1.1,-.85,.85);
    if(k['arrowdown'])player.pitch=clamp(player.pitch-dt*1.1,-.85,.85);
    player.yaw+=turn*dt*2.05;
    const sp=player.running?player.run:player.speed;
    const mx=Math.sin(player.yaw)*fwd*sp*dt, mz=Math.cos(player.yaw)*fwd*sp*dt;
    const [fx,fz]=collide(player.pos.x+mx,player.pos.z+mz);
    const moved=Math.hypot(fx-player.pos.x,fz-player.pos.z);
    player.pos.x=fx;player.pos.z=fz;
    if(moved>.001){
      player.stepT+=moved;
      player.bob=Math.sin(player.stepT*2.6)*.045;
      if(player.stepT>(player.running?.95:1.35)){player.stepT=0;SND.step(player.running?1.4:1);}
    }else player.bob*=.9;

    camera.position.set(player.pos.x,1.70+player.bob,player.pos.z);
    camera.rotation.order='YXZ';
    camera.rotation.y=player.yaw;camera.rotation.x=player.pitch;

    W.pedestals.forEach(p=>{
      p.tab.rotation.y=Math.sin(t*.7+p.spin)*.28;
      if(!p.solved){
        p.sp.material.opacity=.42+Math.sin(t*2.4+p.spin)*.22;
        p.gl.intensity=1.2+Math.sin(t*3.1+p.spin)*.5;
        p.tab.position.y=2.15+Math.sin(t*1.6+p.spin)*.06;
      }
    });
    if(W.keyObj&&!W.keyObj.taken&&W.keyObj.g.visible){
      W.keyObj.g.rotation.y+=dt*1.5;
      W.keyObj.g.position.y=1.9+Math.sin(t*2.2)*.16;
      W.keyObj.beam.material.opacity=.08+Math.sin(t*2)*.045;
      W.keyObj.light.intensity=2.6+Math.sin(t*3)*.9;
    }
    if(W.gate&&W.gate.light){
      if(W.gate.open||W.gate.final){
        W.gate.light.intensity=3+Math.sin(t*2.4)*1.4;
        if(W.gate.door)W.gate.door.rotation.y=lerp(W.gate.door.rotation.y,-1.35,dt*2.4);
      }else W.gate.light.intensity=1.2+Math.sin(t*4)*.4;
    }
    W.lanterns.forEach(l=>{
      const f=.86+Math.sin(t*7.3+l.ph)*.09+Math.sin(t*13.1+l.ph*2)*.05;
      l.light.intensity=l.base*f;l.body.material.emissiveIntensity=1.6+f;
    });
    if(W.particles){
      const pos=W.particles.p.geometry.attributes.position,vel=W.particles.vel,sz=W.particles.size;
      for(let i=0;i<vel.length;i++){
        pos.array[i*3]+=vel[i].x*dt;
        pos.array[i*3+1]+=vel[i].y*dt;
        pos.array[i*3+2]+=vel[i].z*dt;
        if(pos.array[i*3+1]<0)pos.array[i*3+1]=4.2;
        if(Math.abs(pos.array[i*3])>sz/2)pos.array[i*3]*=-.98;
        if(Math.abs(pos.array[i*3+2])>sz/2)pos.array[i*3+2]*=-.98;
      }
      pos.needsUpdate=true;
    }
    W.palms.forEach((p,i)=>{
      const d=Math.hypot(p.g.position.x-player.pos.x,p.g.position.z-player.pos.z);
      const bow=d<9?clamp((9-d)/9,0,1)*.30:0;
      p.crown.rotation.x=lerp(p.crown.rotation.x,bow,dt*2.2);
      p.crown.rotation.z=Math.sin(t*.6+i)*.035;
      p.g.rotation.z=lerp(p.g.rotation.z,bow*.22,dt*2);
    });
    if(W.water){W.water.material.emissiveIntensity=.5+Math.sin(t*1.6)*.22;}
    W.bugs.forEach(b=>b.update(dt,t,camera.position));
    W.webs.forEach((w,i)=>{w.rotation.z=Math.sin(t*.5+i)*.02;});
    updatePath(dt,t);
    if(frameCount%3===0){drawMinimap();drawCompass();}
    const tgt=nearestInteractable();
    const pr=$('#prompt'),ch=$('#crosshair');
    if(tgt){pr.textContent='〔 E 〕 '+tgt.label;pr.classList.add('on');ch.classList.add('hot');}
    else{pr.classList.remove('on');ch.classList.remove('hot');}
    /* المرشد: عشرون ثانيةً بلا تقدّم */
    const s=stageSolved();
    if(s!==lastSolved||G.keys!==lastKeys){lastSolved=s;lastKeys=G.keys;lastProgress=Date.now();}
    else if(Date.now()-lastProgress>20000){lastProgress=Date.now();coachNudge();}
  }else if(W.palms&&W.palms.length){
    W.palms.forEach((p,i)=>{p.crown.rotation.z=Math.sin(t*.6+i)*.05;});
    W.bugs.forEach(b=>b.update(dt,t,null));
  }
  renderer.render(scene,camera);
}
addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

/* ══════ ١٥) الإقلاع ══════ */
(async function boot(){
  const steps=['يُقطَع الخشبُ لأبواب الحصن…','يُنقَش الخنجرُ على الجدران…','تُضاء الفوانيسُ في الممرّات…',
    'تُسكب مياهُ الفلج في القناة…','تُزرَع سِتٌّ وثلاثون نخلة…','تستيقظ كائناتُ القصر…','تُعزَف أولُ نغمة…'];
  try{await document.fonts.ready;}catch(e){}
  buildSymbols();buildPalmSil();buildLevelGrid();
  $('#bSound').textContent=save.sound?'♪ الصوت: مُفعَّل':'♪ الصوت: مكتوم';
  $('#progLine').textContent='آخر طابق مفتوح: '+ar(save.unlocked)+' · مكتملة: '+ar(Object.keys(save.done).length)+' من ١٠٠';
  for(let i=0;i<=steps.length;i++){
    $('#loadBar').style.width=(i/steps.length*100)+'%';
    if(i<steps.length)$('#loadTxt').textContent=steps[i];
    await new Promise(r=>setTimeout(r,220));
  }
  /* مشهدٌ خلفيٌّ للعنوان */
  disposeAll();
  const th=THEMES.fort;
  scene.fog=new THREE.FogExp2(th.fog,.017);
  buildSky(th);
  scene.add(new THREE.HemisphereLight(th.sun,th.amb,.7));
  const sun=new THREE.DirectionalLight(th.sun,1.0);sun.position.set(20,40,-20);scene.add(sun);
  const rnd=mulberry32(9);
  const fTex=texFloor(th.floor,th.wall2,th.trim);fTex.repeat.set(30,30);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.MeshStandardMaterial({map:fTex,roughness:.95}));
  fl.rotation.x=-Math.PI/2;scene.add(fl);
  const fMat=new THREE.MeshStandardMaterial({map:texFrond(),transparent:true,alphaTest:.4,side:THREE.DoubleSide});
  const bMat=new THREE.MeshStandardMaterial({map:texBark(),roughness:.95});
  const palms=[],bugs=[];
  for(let i=0;i<36;i++){
    const a=i/36*Math.PI*2,rad=16+((i%3)*6);
    const p=new THREE.Group();p.position.set(Math.cos(a)*rad,0,Math.sin(a)*rad);
    const h=6+rnd()*3;
    for(let s=0;s<7;s++){const sg=new THREE.Mesh(new THREE.CylinderGeometry(.32-s*.03,.36-s*.03,h/7+.1,8),bMat);
      sg.position.y=h/7*(s+.5);sg.rotation.z=Math.sin(s*.4)*.05;p.add(sg);}
    const crown=new THREE.Group();crown.position.y=h;p.add(crown);
    for(let f=0;f<11;f++){const piv=new THREE.Group();piv.rotation.y=f/11*Math.PI*2;piv.rotation.z=-.6;
      const fr=new THREE.Mesh(new THREE.PlaneGeometry(1.2,3.8),fMat);fr.position.set(0,0,1.9);fr.rotation.y=Math.PI/2;piv.add(fr);crown.add(piv);}
    scene.add(p);palms.push({crown,g:p});
  }
  const kinds=['ladybug','fly','cricket','beetle','ant'];
  for(let i=0;i<14;i++){const b=new Bug(kinds[i%kinds.length],th.trim,{x:0,z:0,w:34,d:34},rnd);scene.add(b.o);bugs.push(b);}
  W={palms,bugs,lanterns:[],pathMarks:[],theme:th,webs:[],particles:null,maze:null,
     bounds:{x:0,z:0,w:34,d:34},pedestals:[],colliders:[],gate:null,keyObj:null,cols:9,rows:9,cell:5,stage:0};
  camera.position.set(0,3.4,26);
  let ta=0;
  (function titleLoop(){
    if(!G.playing){
      ta+=.0015;
      camera.position.set(Math.sin(ta)*24,3.6+Math.sin(ta*1.7)*.6,Math.cos(ta)*24);
      camera.lookAt(0,3.2,0);
      palms.forEach((p,i)=>{p.crown.rotation.z=Math.sin(ta*2+i)*.06;});
      bugs.forEach(b=>b.update(.016,ta,null));
      renderer.render(scene,camera);
    }
    requestAnimationFrame(titleLoop);
  })();
  showScreen('#title');
  animate();
})();
