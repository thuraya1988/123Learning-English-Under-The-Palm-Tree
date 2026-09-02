/* Miss Thuraya - Grade 5A curriculum knowledge and coaching engine.
   Structured from the supplied Class Book, Activity Book and exam guides.
   It stores teaching summaries and original practice, not full textbook pages. */
(function(){
  'use strict';

  const UNITS = {
    0: {
      title: 'Welcome back', pages: 'Class Book 10-13; Activity Book 8-11',
      topics: ['school routines','weekly activities','appearance and hair','food revision'],
      grammar: ['present simple for routines','present continuous for actions now','before / after','when clauses'],
      skills: {
        reading: 'Short dialogue about returning to school and weekly routines.',
        listening: 'Identify people, routines and current actions.',
        speaking: 'Describe a person and talk about a weekly planner.',
        writing: 'Write clear sentences about routines and what happens before or after school.'
      }
    },
    1: {
      title: 'Talent show', pages: 'Class Book 14-27; Activity Book 12-23',
      vocab: ['personality adjectives','hobbies and talents'],
      grammar: ['comparative adjectives','superlative adjectives','irregular good/better/best and bad/worse/worst','be good/great/terrible at + verb-ing'],
      culture: 'Good manners around the world', project: 'A good manners book',
      function: 'Describing people: He is very friendly. He seems very shy.',
      pronunciation: ['/eə/: there, fair, hair, chair','/eɪ/: today, painting, eight, grey'],
      reading: 'A police report about the missing Morgan Diamond; identify text type, suspects, evidence and correct false statements.',
      listening: 'Listen for evidence and identify the thieves.',
      speaking: 'Describe an important family member: appearance, personality and interests.',
      writing: {
        genre: 'Description of an important person',
        plan: ['Who are you writing about?','What does he or she look like?','What is he or she like?','What does he or she like doing?','What do you like about him or her?'],
        frame: ['My ... is called ... and is ... years old.','He/She has got ...','He/She is ... because ...','He/She likes ... but does not like ...','I like ... because ...'],
        checklist: ['capital letters','full stops','correct spelling','clear handwriting','linking words: and, or, but, so, because'],
        model: "My little sister is called Zakeya and she is eight years old. She has got long, dark, curly hair. She is very kind. She likes sports and she loves playing games with me. I like being with her because we have fun together."
      },
      movers: ['Class Book: Reading and Writing Part 4; Listening Part 4','Activity Book: Reading and Writing Part 2; Speaking Part 4'],
      readers: ['The Baking Day','The Tennis Lesson']
    },
    2: {
      title: 'Then and now', pages: 'Class Book 36-49; Activity Book 24-35',
      vocab: ['technology','common verbs','past-and-present phrases'],
      grammar: ['past simple affirmative','past simple negative with did not + base verb','past simple questions with Did + subject + base verb','regular spelling changes','irregular past verbs','could / could not for past ability'],
      culture: 'World museums', project: 'A guide to a museum in Oman',
      function: "Asking for information: I would like some information about the museum, please. What time does it open and close?",
      pronunciation: ['/ɪd/: visited','/t/: looked','/d/: cried'],
      reading: 'Majid’s science blog about the history, uses and strength of cardboard; match paragraph headings and locate details.',
      listening: 'Identify places children visited and listen for museum information.',
      speaking: 'Talk about a museum visit using Where did you go? What did you see? What could you do?',
      writing: {
        genre: 'Report about a museum or interesting-place visit',
        plan: ['When and where did you go?','What is special about it?','What could you see or do?','What did you learn?'],
        frame: ['On ..., I visited ...','The museum/place is ...','It is special because ...','You could see ...','I learnt ...'],
        checklist: ['start with the date','capital letters','paragraphs','linking words','full stops','correct spelling','clear handwriting'],
        model: 'On Saturday 3rd July, I visited the Natural History Museum of Oman in Muscat. It is special because visitors can learn about the plants, animals, deserts and mountains of Oman. You could see animals, birds and fish. I learnt a lot about our amazing country.'
      },
      movers: ['Class Book: Speaking Part 3; Reading and Writing Part 3','Activity Book: Listening Part 2; Speaking Part 4'],
      readers: ['At the Technology Museum','The Special Race']
    },
    3: {
      title: "Let's explore!", pages: 'Class Book 58-71; Activity Book 36-47',
      vocab: ['space and planets','large numbers up to one million'],
      grammar: ['will / will not + base verb','Will + subject + base verb?','How high/deep/far/wide ...?','measurements with metres and kilometres'],
      culture: 'Frankincense Land', project: 'A class book of ancient places in Oman',
      function: "Giving personal information: I am interested in joining the Space Explorers Club. How do you spell your last name?",
      pronunciation: ['/s/: astronauts, likes','/ɪz/: races, places','/z/: others, beds'],
      reading: 'An informational text about life on the International Space Station: orbit, astronauts’ jobs, spacesuits, exercise and daily life.',
      listening: 'Listen for facts about an astronaut, time on the ISS, hobbies, supplies and rocket measurements.',
      speaking: 'Imagine life on the ISS and explain what you will do for food, repairs, washing and hobbies.',
      writing: {
        genre: 'Blog post about life on the International Space Station',
        plan: ['Choose food, clothes, repairs or hobbies.','What do astronauts eat, wear or do?','How is it different from Earth?','What interesting fact can you turn into a question?'],
        frame: ["Hi, I am ... My blog post today is about ...",'In space, we ...','It is different from Earth because ...','Did you know ...?'],
        checklist: ['capital letters','paragraphs','linking words','at least one question','question mark','full stops','correct spelling','clear handwriting'],
        model: 'Hi, I am Amjed. My blog post today is about clothes on the ISS. Astronauts wear T-shirts and trousers inside. Outside the station, they must wear a spacesuit because there is no air to breathe. Did you know that clothes do not get dirty as quickly in space? That is different from Earth!'
      },
      movers: ['Class Book: Reading and Writing Part 2; Speaking Part 4','Activity Book: Speaking Part 2; Speaking Part 3'],
      readers: ['The Space Race','The New Telescope']
    },
    4: {
      title: 'Off to the shops', pages: 'Class Book 80-93; Activity Book 48-59',
      vocab: ['shops','money nouns','money and shopping verbs','prices'],
      grammar: ['relative clauses: who for people, which for things, where for places','have to / has to','do not have to / does not have to','Do/Does ... have to?'],
      culture: 'The world of the corner shop', project: 'A TV advert for a corner shop',
      function: 'Asking for a price and making suggestions: How much is it? How about visiting the toy shop?',
      pronunciation: ['/ʒ/: pleasure, measure, unusual, treasure'],
      reading: 'Razan’s email about blue shoes; answer true/false questions and choose a summary containing all important points.',
      listening: 'Listen for details about a shopping street, market, shopping mall, shops and services.',
      speaking: 'Ask and answer where you like to shop and explain what you buy there.',
      writing: {
        genre: 'Email giving shopping advice to a friend',
        plan: ['Which shops should your friend visit?','Are they in a mall, market or street?','What special things can your friend buy?'],
        frame: ['Hi, ...','You asked for some advice about ...','At the market ...','At the shopping mall ...','I love ...','Remember to ...','See you soon!','Love from ...'],
        checklist: ['greeting and ending','capital letters','full stops','linking words','apostrophes in shop names','correct spelling','clear handwriting'],
        model: 'Hi, Basma. You asked for some advice about shops in my town. The toy shop is in the shopping mall, where there is a lot to see and do. You can buy amazing kites there. There is a fishmonger’s, too. Remember to bring your pocket money! See you soon! Love from Sharifa.'
      },
      movers: ['Class Book: Listening Part 3; Reading and Writing Part 6','Activity Book: Reading and Writing Part 5; Listening Part 5'],
      readers: ['Dates for Dad','The Treasure Chest']
    }
  };

  const ORIGINAL_PRACTICE = {
    reading: {
      1:{passage:'Maha is confident on stage, but her brother Salim is shy. Maha is good at juggling and Salim is great at fixing toys. They practise together because they want their talent show to be successful.',qs:[['Who is shy?','salim'],['What is Maha good at?','juggling'],['Why do they practise together?','talent show']]},
      2:{passage:'Last Friday, Noor visited a small science museum. She saw an old telephone and a very large computer. She could touch some models, but she could not use the oldest machine. She learnt how people sent messages in the past.',qs:[['Where did Noor go?','science museum'],['What could she touch?','models'],['What did she learn about?','messages in the past']]},
      3:{passage:'A satellite will travel around Earth and send information to scientists. It will carry a small telescope, but it will not carry astronauts. The satellite is three metres wide.',qs:[['What will the satellite send?','information'],['Will it carry astronauts?','no'],['How wide is it?','three metres']]},
      4:{passage:"Huda went to a corner shop where her uncle works. She bought a card which was made in Oman. Her uncle is the man who owns the shop. Huda did not have to pay for a bag.",qs:[['Where does her uncle work?','corner shop'],['What did Huda buy?','card'],['Did she have to pay for a bag?','no']]}
    },
    listening: {
      1:{script:'Aisha is friendly and hard-working. She is good at baking cakes, but she is terrible at juggling.',qs:[['What is Aisha good at?','baking cakes'],['Is she good at juggling?','no']]},
      2:{script:'When Khalid was five, he could tell a story, but he could not tie his shoelaces. Last year, he learnt how to do it.',qs:[['What could Khalid do at five?','tell a story'],['What could he not do?','tie his shoelaces']]},
      3:{script:'The new rocket will travel next Tuesday. It will carry a satellite. The rocket is seventy metres high.',qs:[['When will the rocket travel?','next tuesday'],['What will it carry?','satellite'],['How high is it?','seventy metres']]},
      4:{script:"Mariam likes the market where her aunt has a greengrocer’s. Today she has to buy apples, but she does not have to buy fish.",qs:[['Which shop does her aunt have?',"greengrocer's"],['What does Mariam have to buy?','apples'],['Does she have to buy fish?','no']]}
    }
  };

  const session={practice:null,writing:null};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s).toLowerCase().replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[ًٌٍَُِّْ]/g,'').replace(/[’]/g,"'").trim();
  const hasAny=(s,items)=>items.some(x=>s.includes(x));
  function unitOf(s){
    const t=norm(s).replace(/[١٢٣٤]/g,d=>({'١':'1','٢':'2','٣':'3','٤':'4'}[d]));
    const m=t.match(/(?:unit|يونت|وحده)\s*(?:ال)?\s*(welcome|back|[0-4]|واحد|اثنين|ثلاث|اربع|الاولي|الثانيه|الثالثه|الرابعه)/);
    if(!m)return null;
    const map={welcome:0,back:0,'0':0,'1':1,'2':2,'3':3,'4':4,واحد:1,اثنين:2,ثلاث:3,اربع:4,الاولي:1,الثانيه:2,الثالثه:3,الرابعه:4};
    return map[m[1]];
  }
  const list=a=>'<ul>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
  function overview(n){
    const u=UNITS[n]; if(!u)return null;
    let out=`📚 <b>${n?`Unit ${n} - `:''}${u.title}</b><br><small>${u.pages}</small>`;
    if(u.vocab)out+='<br><br><b>Vocabulary</b>'+list(u.vocab);
    out+='<b>Grammar</b>'+list(u.grammar);
    if(u.reading)out+='<br><b>Reading:</b> '+u.reading;
    if(u.listening)out+='<br><b>Listening:</b> '+u.listening;
    if(u.speaking)out+='<br><b>Speaking:</b> '+u.speaking;
    if(u.writing)out+='<br><b>Writing:</b> '+u.writing.genre;
    if(u.project)out+='<br><b>Project:</b> '+u.project;
    out+='<br><br>اكتبي: <b>مهارات Unit '+n+'</b> أو <b>دربيني على كتابة Unit '+n+'</b>.';
    return out;
  }
  function skills(n){
    const u=UNITS[n]; if(!u)return 'حددي الوحدة من 1 إلى 4.';
    return `🧩 <b>مهارات Unit ${n} - ${u.title}</b><br><br>`+
      `<b>Reading:</b> ${u.reading}<br><br><b>Listening:</b> ${u.listening}<br><br>`+
      `<b>Speaking:</b> ${u.speaking}<br><br><b>Writing:</b> ${u.writing.genre}<br><br>`+
      `<b>English in action:</b> ${u.function}<br><b>Pronunciation:</b> ${u.pronunciation.join(' | ')}<br>`+
      `<b>Culture:</b> ${u.culture}<br><b>Project:</b> ${u.project}<br>`+
      `<b>A1 Movers:</b>${list(u.movers)}<b>Graded readers:</b>${list(u.readers)}`;
  }
  function writingStart(n,showModel){
    const u=UNITS[n]; if(!u||!u.writing)return 'اختاري Unit 1 أو 2 أو 3 أو 4.';
    session.practice=null;
    if(showModel)return `📝 <b>نموذج Unit ${n}: ${u.writing.genre}</b><br><br>${u.writing.model}<br><br><b>لا تنسخي النموذج.</b> غيّري الشخص أو المكان أو المعلومات واكتبي بأسلوبك.`;
    session.writing={unit:n};
    return `✍️ <b>تدريب كتابة Unit ${n}</b><br><b>${u.writing.genre}</b><br><br><b>1. خططي:</b>${list(u.writing.plan)}<b>2. استخدمي هذا الهيكل:</b>${list(u.writing.frame.map(x=>'<code>'+x+'</code>'))}<b>3. اكتبي مسودتك الآن.</b><br>سأراجع الفكرة والتنظيم والقواعد والمفردات والإملاء وعلامات الترقيم، ثم أطلب منك تحسينها.`;
  }
  function reviewWriting(raw){
    const n=session.writing.unit, u=UNITS[n], text=String(raw).trim();
    const english=(text.match(/[A-Za-z]/g)||[]).length;
    if(english<15)return 'اكتبي مسودتك بالإنجليزية أولًا، حتى لو كانت 3 جمل فقط. سأساعدك خطوة خطوة.';
    const sentences=text.split(/[.!?]+/).filter(x=>x.trim()).length;
    const startsCapital=/^[^A-Za-z]*[A-Z]/.test(text);
    const ending=/[.!?]$/.test(text);
    const links=(text.match(/\b(and|but|because|so|where|which|who|also|then)\b/gi)||[]).length;
    const issues=[];
    if(!startsCapital)issues.push('ابدئي الجملة الأولى بحرف كبير.');
    if(!ending)issues.push('ضعي نقطة أو علامة سؤال في النهاية.');
    if(sentences<3)issues.push('أضيفي تفاصيل حتى تصبح المسودة 3 جمل على الأقل.');
    if(!links)issues.push('أضيفي كلمة ربط مثل and أو but أو because أو so.');
    if(/didn['’]?t\s+(went|saw|had|made|wrote|bought)\b/i.test(text))issues.push("بعد didn't نستخدم المصدر: didn't go / see / have / make / write / buy.");
    if(/\bwill\s+to\s+/i.test(text))issues.push('بعد will يأتي الفعل مباشرة بلا to.');
    if(/\b(he|she|it)\s+have to\b/i.test(text))issues.push('مع he/she/it نقول has to.');
    const checks=u.writing.checklist.map(x=>'□ '+x).join('<br>');
    const result=issues.length?'<b>حسّني هذه النقاط:</b>'+list(issues):'✅ التنظيم الأساسي جيد. الآن حسّني التفاصيل واختاري مفردات أقوى من الوحدة.';
    return `📝 <b>مراجعة مسودة Unit ${n}</b><br>عدد الجمل التقريبي: ${sentences}<br><br>${result}<br><br><b>قائمة المراجعة:</b><br>${checks}<br><br>عدّلي المسودة وأرسلي النسخة الثانية. اكتبي <b>انتهيت من الكتابة</b> عندما تريدين إنهاء التدريب.`;
  }
  function startPractice(type,n){
    const p=ORIGINAL_PRACTICE[type]?.[n]; if(!p)return 'اختاري نوع التدريب والوحدة من 1 إلى 4.';
    session.writing=null; session.practice={type,unit:n,index:0,data:p};
    const lead=type==='reading'?'📖 <b>تدريب قراءة جديد - ليس منسوخًا من الكتاب</b>':'🎧 <b>تدريب استماع جديد</b><br>اطلبي من الجهاز قراءة النص بصوت عالٍ، أو اجعلي المعلمة تقرؤه دون أن تنظري.';
    return `${lead}<br><br>${p.passage||p.script}<br><br><b>السؤال 1:</b> ${p.qs[0][0]}<br><small>سؤال واحد كل مرة. اكتبي إجابتك.</small>`;
  }
  function checkPractice(raw){
    const s=session.practice, q=s.data.qs[s.index], a=norm(raw), expected=norm(q[1]);
    const yesNo=expected==='no' && hasAny(a,['no','لا','could not','couldn','will not','won','does not','doesn']);
    const ok=yesNo||a.includes(expected)||expected.split(' ').every(w=>a.includes(w));
    const feedback=ok?'✅ إجابة صحيحة.':`🔎 حاولي مرة أخرى. تلميح: ابحثي أو استمعي إلى الجزء الذي يتحدث عن <b>${esc(expected.split(' ')[0])}</b>.`;
    if(!ok)return feedback;
    s.index++;
    if(s.index>=s.data.qs.length){session.practice=null;return feedback+'<br><br>🎉 أكملتِ التدريب. اطلبي تدريبًا آخر أو انتقلي إلى الكتابة.';}
    return feedback+`<br><br><b>السؤال ${s.index+1}:</b> ${s.data.qs[s.index][0]}`;
  }
  function speaking(n){
    const u=UNITS[n]; if(!u)return 'حددي الوحدة.';
    const prompts={1:['Describe an important person.','What does he/she look like?','What is he/she like?'],2:['Talk about a museum visit.','Where did you go?','What did you see and learn?'],3:["Imagine you are on the ISS.",'What will you eat, wear or do?','How is it different from Earth?'],4:['Talk about shopping.','Where do you like to shop?','What do you buy there and why?']};
    return `🗣️ <b>Speaking - Unit ${n}</b><br>${u.speaking}<br><br><b>تحدثي عن:</b>${list(prompts[n])}<b>طريقة التدريب:</b> قولي 3 جمل، ثم أعيديها مع سبب باستخدام <code>because</code>. يمكنك كتابة ما ستقولينه هنا وسأصححه.`;
  }
  function project(n){const u=UNITS[n];return u?`🌟 <b>مشروع Unit ${n}</b><br>${u.project}<br><br>خطوات العمل: اختاري الفكرة - اجمعي معلومات قصيرة - اكتبي مسودة - أضيفي عنوانًا وصورًا - راجعي اللغة - قدمي المشروع شفهيًا.`:'حددي الوحدة.';}
  function examGuide(){
    return `🎯 <b>تدريب اختبار الصف الخامس</b><br><br>من نماذج الاختبارات المرفقة، التقييم يدور حول:<br>`+
      list(['Listening: فهم الفكرة والتفاصيل','Vocabulary and Grammar: مفردات الوحدات والقواعد','Reading: اختيار، مطابقة، صح/خطأ وفهم التفاصيل','Writing: الحروف الكبيرة والترقيم، جمل واضحة، ثم مهمة كتابة منظمة'])+
      `<b>معيار الكتابة:</b> إنجاز المطلوب، وضوح المعنى، التنظيم، صحة القواعد والمفردات، الإملاء والترقيم.<br><br>اكتبي <b>اختبار Unit 3</b> مثلًا، أو اختاري وضع القراءة أو الكتابة من الأعلى.`;
  }
  function activityHelp(n){
    return `📘 <b>مساعدة أنشطة ${n?`Unit ${n}`:'الكتاب'}</b><br><br>لن أخمّن رقم الصفحة أو السؤال، ولن أعطي الحل مباشرة من أول محاولة.<br>`+
      `اكتبي نص السؤال والخيارات، أو أرسلي صورة واضحة للصفحة. سأعمل هكذا:<br>1) أحدد المهارة والقاعدة.<br>2) أعطي تلميحًا قصيرًا.<br>3) تكتب الطالبة محاولتها.<br>4) أصحح وأشرح السبب.<br>5) أعطي سؤالًا مشابهًا جديدًا.<br><br>إذا أردتِ الحل النهائي اكتبي بوضوح: <b>أعطيني الحل مع الشرح</b>.`;
  }
  function progress(n){const u=UNITS[n];return u?`📊 <b>Progress Path - Unit ${n}</b><br>قيّمي نفسك: OK / good / excellent.<br><br>هل تستطيعين استخدام: ${u.grammar.join(' - ')}؟<br>هل تستطيعين أداء مهام القراءة والاستماع والتحدث؟<br>هل تستطيعين كتابة: ${u.writing.genre}؟<br><br>اكتبي المهارة التي تحتاجين تدريبًا عليها وسأبدأ بسؤال واحد.`:'حددي Unit 1 أو 2 أو 3 أو 4.';}
  function allGradeFive(){
    return `🌴 <b>خريطة منهج الصف الخامس 5A</b><br><br>`+
      Object.keys(UNITS).map(k=>`<b>${k==='0'?'Welcome':`Unit ${k}`}</b>: ${UNITS[k].title}`).join('<br>')+
      `<br><br>تشمل القاعدة: Vocabulary - Grammar - Reading - Listening - Speaking - Writing - Pronunciation - English in action - Culture - Projects - Review - Progress Path - A1 Movers - Graded Readers - Exam practice.<br><br>ابدئي مثلًا بـ: <b>كل شيء في Unit 3</b>.`;
  }
  function answer(raw){
    const original=String(raw||'').trim(), t=norm(original), n=unitOf(t);
    if(!original)return null;
    if(hasAny(t,['خروج','انهاء التدريب','انتهيت من الكتابه','stop','exit'])){session.practice=null;session.writing=null;return 'تم إنهاء التدريب. اختاري مهارة أو وحدة جديدة.';}
    const explicitCommand=hasAny(t,['unit','يونت','وحده','مهارات','قراءه','reading','استماع','listening','تحدث','speaking','كتابه','writing','مشروع','project','اختبار','exam','نشاط','صفحه','page','progress','graded','قارئ']);
    if(session.practice&&!explicitCommand)return checkPractice(original);
    if(session.writing&&!explicitCommand)return reviewWriting(original);

    if(hasAny(t,['كل منهج الصف الخامس','كل شي صف خامس','كل شيء صف خامس','خريطه المنهج','كامل الصف الخامس']))return allGradeFive();
    if(hasAny(t,['اختبار شامل','نمط الاختبار','exam guide','معيار التصحيح','روبرك','rubric']))return examGuide();
    if(hasAny(t,['نشاط','انشطه','تمرين الكتاب','صفحه','page','exercise'])&&hasAny(t,['ساعد','حل','كيف','اشرح','نشاط','تمرين','صفحه','page','exercise']))return activityHelp(n);
    if(n!==null&&hasAny(t,['كل شي','كل شيء','كامل','ملخص الوحده','overview']))return overview(n);
    if(n!==null&&hasAny(t,['مهارات','skills']))return skills(n);
    if(n!==null&&hasAny(t,['نموذج كتابه','نموذج الكتابه','writing model','model']))return writingStart(n,true);
    if(n!==null&&hasAny(t,['كتابه','writing','اكتب فقره','اكتب ايميل','اكتب تقرير','دربيني على الكتابه']))return writingStart(n,false);
    if(n!==null&&hasAny(t,['قراءه','reading','دربيني على القراءه']))return startPractice('reading',n);
    if(n!==null&&hasAny(t,['استماع','listening','دربيني على الاستماع']))return startPractice('listening',n);
    if(n!==null&&hasAny(t,['تحدث','محادثه','speaking']))return speaking(n);
    if(n!==null&&hasAny(t,['مشروع','project','culture']))return project(n);
    if(n!==null&&hasAny(t,['progress','تقدم','تقييم ذاتي','مراجعه الوحده']))return progress(n);
    if(n!==null&&hasAny(t,['graded','قارئ','قراءه متدرجه','قصص الوحده']))return `📚 <b>Graded Readers - Unit ${n}</b>${list(UNITS[n].readers)}قبل القراءة: توقعي الموضوع من العنوان. أثناء القراءة: رتبي الأحداث وحددي الفكرة. بعد القراءة: لخّصي القصة وغيّري حدثًا واحدًا.`;
    if(n!==null&&hasAny(t,['اختبار','exam','quiz']))return `🎯 سأبني اختبار Unit ${n} من مفرداتها وقواعدها ومهاراتها، سؤالًا واحدًا كل مرة.<br>ابدئي باختيار: <b>قراءة Unit ${n}</b> أو <b>استماع Unit ${n}</b> أو <b>كتابة Unit ${n}</b>.`;
    return null;
  }

  window.G5_KB={units:UNITS,answer,reset:function(){session.practice=null;session.writing=null;}};
})();
