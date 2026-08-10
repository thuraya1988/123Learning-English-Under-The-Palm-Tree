GUFA FOLKLORE ADVENTURE — "Under the Palm Tree"
RUSHING FALAJ EDITION (collection-run gameplay)
Launch Instructions / تعليمات التشغيل
================================================================

ENGLISH
-------
Gufa Folklore Adventure is a first-person RIDE in a traditional woven Omani
gufa (round palm-frond boat) down a rushing village falaj — part roller-
coaster, part endless-runner. The current is violent: the channel winds in
S-curves through a dense palm farm, rapids churn white, ramps throw the
boat airborne, and the camera rolls into every curve.

The gameplay happens IN MOTION. A big TOPIC WORD (the level's title) is
engraved at the top of the screen. Labelled glowing orbs stream toward you
on the water: WARM burgundy/amber orbs carry facts that belong to the topic
(collect them: points, chime, streak +1); COLD slate-blue orbs are
distractors (touching one splashes you, resets the streak, costs points —
never kills you). Collect enough true tokens and the current SURGES you to
the carved stone gate, which grinds open with a badge (Bronze Apprentice /
Linen Woven / Burgundy Master). At the gate you may answer 3 optional
engraved-stone bonus riddles — or skip them and ride on. Every ~45–90
seconds a KHAMASEEN hot-wind gust sweeps through: sand haze, thrashing
palms, a speed surge and a token magnet. An adaptive darbuka/frame-drum
loop drives with your speed and streak; oud plucks return in calm moments.

1. Requirements: a WebGPU-capable browser — Chrome or Edge version 113+
   (desktop or Android), Safari 18+, or Firefox 141+ with WebGPU enabled.
2. You must serve the folder over HTTP (ES modules will not load from
   file://). From inside this folder run one of:
       python3 -m http.server 8000
   or  npx serve .
3. Open in your browser:
       http://localhost:8000/
4. Click the scene to lock the mouse and look around. Steer across the
   channel with A/D or the Left/Right arrow keys, and jump with Space,
   ArrowUp or W (jump clears a wrong token in your lane instead of only
   letting you steer around it). On touch devices, drag to look around
   and use the ◀ ▶ and JUMP buttons at the bottom of the screen to steer
   and jump. Hitting a stone bank only scrapes the hull — sparks, foam, a
   momentary slowdown. Esc or the ⏸ button pauses; M mutes; P opens the
   settings panel.
5. Each gate segment = one level: collect true-topic tokens (HUD shows
   N/9) or simply reach the gate. The bonus riddles at the gate use keys
   1–4 and Enter, and are always skippable.
6. Difficulty eases up over the 100 levels: faster current, denser wrong
   tokens, rarer correct ones, and riddle pools drawn from the harder part
   of each level's question bank.
7. Narrator: bonus riddles and events are read aloud (Web Speech API) and
   ALWAYS shown as subtitles for accessibility. Toggle in settings.
8. Progress is saved automatically (localStorage): current level, score,
   per-gate best badge. On reload you'll be asked to continue or start anew.
9. Settings panel: time of day, water flow, boat-speed multiplier, sound,
   narrator, render quality, live FPS.

Files: index.html, main.js, questions.js (question bank — replaceable
content file following the window.QUESTION_BANK contract), README.txt.
No build step, no frameworks, no image/audio/model files — everything is
procedural: three.js r170 WebGPURenderer + TSL (Gerstner-wave rushing
water with speed streaks, analytic sky, woven gufa, carved gates, dense
chunked palm farm, instanced token orbs with runtime canvas labels,
particle pools) and WebAudio synthesis (speed-adaptive drums, oud plucks,
water, wind whoosh, collect chimes, splashes, gate grind).

العربية
-------
«مغامرة القُفّة والتراث» — نسخة الفلج الهادر. رحلة بمنظور الشخص الأول في
قُفّة عُمانية منسوجة من سعف النخيل تنطلق بسرعة في فلج القرية — مثل
الأفعوانية ولعبة الجري المتواصل. التيار عنيف: القناة تلتوي عبر مزرعة
نخيل كثيفة، والخوالب تزبد، والمنحدرات تقذف القارب في الهواء، والكاميرا
تميل مع كل منعطف.

اللعب يحدث أثناء الحركة: كلمة الموضوع تظهر منقوشة أعلى الشاشة، والكرات
المضيئة تحمل كلمات تنساب نحوك. الكرات الدافئة (عنّابية/كهرمانية) تحمل
حقائق من الموضوع — اجمعها لتكسب نقاطاً وسلسلة متتالية؛ والكرات الباردة
(رمادية مزرقّة) مشتّتات — لمسها يرشّك بالماء ويصفّر السلسلة ويخصم نقاطاً
دون أن يُسقطك أبداً. اجمع ما يكفي من الرموز الصحيحة فيندفع التيار بك نحو
بوابة الحجر المنحوتة التي تنفتح بصرير وتمنحك وساماً. عند البوابة ثلاثة
ألغاز إضافية اختيارية يمكن تخطّيها. وكل ٤٥–٩٠ ثانية تهبّ رياح الخماسين:
غبار وسرعة إضافية ومغناطيس يجذب الرموز إليك. إيقاع الدربوكة يتسارع مع
سرعتك وسلسلتك، والعود يعود في لحظات الهدوء.

١. المتطلبات: متصفح يدعم WebGPU — كروم أو إيدج 113+ (كمبيوتر أو
   أندرويد)، سفاري 18+، أو فايرفوكس 141+ مع تفعيل WebGPU.
٢. يجب تشغيل اللعبة عبر خادم محلي (وحدات ES لا تعمل من file://):
       python3 -m http.server 8000
   أو:
       npx serve .
٣. افتح في المتصفح:  http://localhost:8000/
٤. انقر المشهد لقفل الفأرة والنظر. وجّه القارب عرض القناة بـ A/D أو
   الأسهم، واقفز بمفتاح المسافة أو ↑ أو W (القفزة تتخطى الرمز الخطأ في
   مسارك بدل ما تحتاج تتفاداه بس بالتوجيه). على الشاشات اللمسية: اسحب
   للنظر حولك واستخدم أزرار ◀ ▶ وJUMP أسفل الشاشة للتوجيه والقفز.
   الاحتكاك بضفة الحجر يشرط البدن ويبطئك فقط.
   Esc أو زر ⏸ للإيقاف المؤقت، M لكتم الصوت، P للإعدادات.
٥. كل مقطع حتى البوابة = مستوى: اجمع رموز الموضوع الصحيحة (يظهر العدد
   في الواجهة) أو فقط بلغ البوابة. ألغاز البوابة الإضافية بالأرقام 1–4
   وEnter ويمكن تخطّيها دائماً.
٦. الصعوبة تتدرج عبر المستويات المئة: تيار أسرع، مشتّتات أكثر، ورموز
   صحيحة أندر، وأسئلة من الجزء الأصعب من بنك كل مستوى.
٧. الراوي يقرأ الألغاز والأحداث بصوته مع ترجمة نصية دائمة على الشاشة.
٨. يُحفظ تقدمك تلقائياً: المستوى والنقاط وأفضل وسام لكل بوابة، وعند
   إعادة التحميل تُسأل عن المتابعة أو البدء من جديد.
٩. لوحة الإعدادات: وقت اليوم، تدفق الماء، مضاعف سرعة القارب، الصوت،
   الراوي، جودة الرسوم، وعدّاد الإطارات FPS.

كل شيء مولّد برمجياً (three.js r170 WebGPU + TSL للماء والسماء والقُفّة
والبوابات ومزرعة النخيل والكرات الرمزية، وWebAudio للطبول المتكيفة مع
السرعة والعود وهسهسة الريح وأصوات الجمع والرشّ) — لا ملفات صور أو صوت.
ملف questions.js يحتوي بنك الأسئلة ويمكن استبداله بنفس الصيغة.
