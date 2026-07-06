import type { Country } from '@/types';

/**
 * Story World — a standalone cultural journey.
 * No games, no novel links here: every card is verified information,
 * a video to watch, and references — hooked to memories from the story.
 */

const HERITAGE =
  'https://raw.githubusercontent.com/thuraya1988/123Learning-English-Under-The-Palm-Tree/main/public/gallery/heritage';

export const countries: Country[] = [
  {
    id: 'OM', name: 'عُمان — سلطنة المجد البحري', flag: '🇴🇲',
    lat: 23.3, lon: 57.98, region: 'قلب الرحلة · Samail 1973', timezone: 'UTC+4',
    content: [
      {
        id: 'om-history', type: 'historicalExperience',
        title: 'عُمان — أرض مجان وسفن المحيط',
        description: 'تتذكرون حبابوه سيف في سوق سمائل؟ ذلك السوق امتدادٌ لتجارةٍ عمرها خمسة آلاف سنة: عرفها السومريون باسم «مجان» أرض النحاس، وأبحرت سفنها من صحار ومسقط حتى الصين وشرق أفريقيا. وفي عام ١٩٧٠ بدأت النهضة الحديثة فتحوّلت عُمان خلال جيلٍ واحد من ثلاث مدارس فقط إلى تعليمٍ يصل كل قرية — وهذا سرّ وصول المعلمين إلى قريتنا في الرواية. 📚 المراجع: الموسوعة العُمانية، وزارة التراث والسياحة.',
        teacher: { name: 'حبابوه سيف', avatar: 'ح', bio: 'من سوق سمائل — لا يُنسى' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A%20%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE%20%D8%B9%D9%85%D8%A7%D9%86%20%D8%A7%D9%84%D8%A8%D8%AD%D8%B1%D9%8A%20%D9%85%D8%AC%D8%A7%D9%86',
        thumbnail: `${HERITAGE}/heritage-15.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T10:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['تاريخ', 'مجان', 'النهضة', 'بحر'],
      },
      {
        id: 'om-falaj', type: 'historicalExperience',
        title: 'الأفلاج — أنهار العُمانيين الحجرية',
        description: 'تتذكرون لعب الأطفال في الفلج؟ في عُمان نحو أربعة آلاف فلجٍ تحمل ماء الجبال إلى القرى بالانحدار وحده، بعضها يتجاوز عمره ألفاً وخمسمئة سنة. خمسة أفلاج مسجّلة في قائمة اليونسكو للتراث العالمي، أشهرها فلج دارس في نزوى، وكانت حصص الماء (الأثر) تُحسب قديماً بمواقع النجوم. 📚 المرجع: اليونسكو — أنظمة الري بالأفلاج في عُمان.',
        teacher: { name: 'الخليل', avatar: 'خ', bio: 'المساعدة عنده فطرة' },
        platform: 'custom', streamUrl: 'https://whc.unesco.org/en/list/1207/',
        thumbnail: `${HERITAGE}/heritage-28.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T07:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'beginner', tags: ['أفلاج', 'يونسكو', 'ماء', 'نزوى'],
      },
      {
        id: 'om-palms', type: 'culturalVideo',
        title: 'ثمانية ملايين نخلة — الفرض والخلاص والخنيزي',
        description: 'تتذكرون مشهد «جَداد النخيل» في متحفنا؟ في عُمان نحو ثمانية ملايين نخلة، وأشهر تمورها الفرض والخلاص والخنيزي. النخلة لا تعطي التمر وحده: سعفها قفافٌ وسِمّة، وجذوعها سقوف، وموسم الجداد الصيفي يجمع القرية كلها كما جمعها في الرواية. 📚 المرجع: اليونسكو — النخلة تراث إنساني مشترك.',
        teacher: { name: 'سدو', avatar: 'س', bio: 'صاحب الدكان — تسلّق النخلة في Palm 14' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D8%AC%D8%AF%D8%A7%D8%AF%20%D8%A7%D9%84%D9%86%D8%AE%D9%8A%D9%84%20%D9%81%D9%8A%20%D8%B9%D9%85%D8%A7%D9%86',
        thumbnail: `${HERITAGE}/heritage-24.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T06:00:00Z', language: 'Arabic', ageGroup: 'kids',
        topic: 'Vocabulary', level: 'beginner', tags: ['نخيل', 'خنيزي', 'جداد', 'تمور'],
      },
    ],
  },
  {
    id: 'TZ', name: 'زنجبار — الشقيقة السواحلية', flag: '🇹🇿',
    lat: -6.1659, lon: 39.2026, region: 'Palm 19 · طريق التاجر', timezone: 'UTC+3',
    content: [
      {
        id: 'tz-history', type: 'historicalExperience',
        title: 'عُمان وزنجبار — حكاية بحرَين',
        description: 'تتذكرون التاجر الزنجباري وقناع الزعفران في الرواية؟ خلفه تاريخٌ حقيقي: في أربعينيات القرن التاسع عشر نقل السيد سعيد بن سلطان بلاطه من مسقط إلى زنجبار، فصارت الجزيرة عاصمة القرنفل في العالم، وامتزجت العربية بالسواحلية حتى إن آلاف الكلمات السواحلية اليوم من أصل عربي. عائلات كثيرة في عُمان — وربما في سمائل نفسها — لها أقارب وذكريات هناك. 📚 المراجع: اليونسكو، الموسوعة البريطانية.',
        teacher: { name: 'التاجر الزنجباري', avatar: 'ز', bio: 'حمل ساحلَين في مركبٍ واحد' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D8%B9%D9%85%D8%A7%D9%86%20%D9%88%D8%B2%D9%86%D8%AC%D8%A8%D8%A7%D8%B1%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A%20%D8%A7%D9%84%D8%B3%D9%8A%D8%AF%20%D8%B3%D8%B9%D9%8A%D8%AF%20%D8%A8%D9%86%20%D8%B3%D9%84%D8%B7%D8%A7%D9%86',
        thumbnail: `${HERITAGE}/heritage-13.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T14:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['زنجبار', 'تاريخ', 'قرنفل', 'سواحلية'],
      },
      {
        id: 'tz-song', type: 'culturalVideo',
        title: '🎵 «عطوني رطبة خنيزي… ما أبا زنجبار»',
        description: 'أغنية شعبية عمانية محفوظة في الذاكرة: طفلٌ يطلب رطبةً من تمر الخنيزي ويقول إنه لا يريد الرحيل إلى زنجبار — صدى زمنٍ كانت فيه المراكب تحمل الآباء والأبناء عبر المحيط، فتغنّت البيوت بالحنين إلى رطب الديار. أغنيةٌ واحدة تحفظ التمر والبحر والشوق معاً. استمعوا إليها وقارنوا: كم كلمة تعرفونها من الرواية؟ 📚 المرجع: التراث الغنائي العُماني الشفهي (تسجيلات الثمانينيات).',
        teacher: { name: 'أطفال القرية', avatar: 'ط', bio: 'الأغاني ذاكرة لا تشيخ' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D8%B9%D8%B7%D9%86%D9%8A%20%D8%A8%D8%B3%D8%B1%D8%A9%20%D8%AE%D9%86%D9%8A%D8%B2%D9%8A%20%D9%85%D8%A7%20%D8%A8%D8%A7%20%D8%B2%D9%86%D8%AC%D8%A8%D8%A7%D8%B1%20%D8%A7%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B9%D9%85%D8%A7%D9%86%D9%8A%D8%A9',
        thumbnail: `${HERITAGE}/heritage-10.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T15:00:00Z', language: 'Arabic', ageGroup: 'kids',
        topic: 'Stories', level: 'beginner', tags: ['أغنية', 'خنيزي', 'تراث', 'حنين'],
      },
      {
        id: 'tz-stonetown', type: 'historicalExperience',
        title: 'ستون تاون — مدينة الأبواب العُمانية',
        description: 'في قلب زنجبار تقف «المدينة الحجرية» — ستون تاون — بأبوابها الخشبية المنقوشة على الطراز العُماني وأسواقها العطرة بالقرنفل والهيل. سجّلتها اليونسكو تراثاً عالمياً لأنها المدينة التي التقى فيها العرب والأفارقة والهنود قروناً طويلة. من يمشي في أزقّتها اليوم يسمع أصداء مسقط. 📚 المرجع: اليونسكو — Stone Town of Zanzibar.',
        teacher: { name: 'صوفيا', avatar: 'S', bio: 'كانت تدوّن كل بابٍ منقوش' },
        platform: 'custom', streamUrl: 'https://whc.unesco.org/en/list/173/',
        thumbnail: `${HERITAGE}/heritage-04.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T16:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['ستون تاون', 'يونسكو', 'أبواب', 'قرنفل'],
      },
    ],
  },
  {
    id: 'GB', name: 'بريطانيا — حيث بدأت الرسالة', flag: '🇬🇧',
    lat: 51.5074, lon: -0.1278, region: 'لندن · بداية الرحلة', timezone: 'UTC+0',
    content: [
      {
        id: 'gb-history', type: 'historicalExperience',
        title: 'من لندن إلى سمائل — لماذا جاء المعلمون؟',
        description: 'تتذكرون رسالة جون في أول الرواية؟ لم تكن خيالاً بعيداً: فصداقة عُمان وبريطانيا من أقدم العلاقات الدبلوماسية في المنطقة، وحين انطلقت النهضة عام ١٩٧٠ واحتاجت المدارس الجديدة معلمين للإنجليزية، عبر مدرسون من بريطانيا وغيرها نحو الخليج — تماماً كما فعل جون وصوفيا. وراء كل معلمٍ وصل قريةً بعيدة، رسالةٌ وقرارٌ شجاع. 📚 المراجع: وثائق النهضة العُمانية ١٩٧٠.',
        teacher: { name: 'جون', avatar: 'J', bio: 'قرأ الرسالة… وغيّرت حياته' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D8%B9%D9%85%D8%A7%D9%86%201970%20%D8%A7%D9%84%D9%86%D9%87%D8%B6%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A',
        thumbnail: `${HERITAGE}/heritage-29.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T08:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['لندن', 'الرسالة', 'التعليم', '1970'],
      },
    ],
  },
  {
    id: 'TR', name: 'تركيا — مكتب ثريّا', flag: '🇹🇷',
    lat: 39.0, lon: 35.0, region: 'حيث تُكتب الذكريات · 2026', timezone: 'UTC+3',
    content: [
      {
        id: 'tr-istanbul', type: 'historicalExperience',
        title: 'إسطنبول — جسر القارتين',
        description: 'تتذكرون ثريّا وهي تفتح دفتر أفكارها في تركيا لتكتب حكاية القرية؟ اختارت مدينةً تشبه الحكاية نفسها: إسطنبول الواقفة بقدمٍ في آسيا وقدمٍ في أوروبا، عاصمة إمبراطوريتين، ومدينة القهوة التي وصلت أوروبا من موانئها. من مضيق البوسفور تبدو الجغرافيا درساً: الحكايات العظيمة تولد حيث تلتقي العوالم. 📚 المراجع: اليونسكو — المناطق التاريخية في إسطنبول.',
        teacher: { name: 'ثريّا', avatar: 'ث', bio: 'تكتب القرية من ضفة البوسفور' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D8%A7%D8%B3%D8%B7%D9%86%D8%A8%D9%88%D9%84%20%D8%AC%D8%B3%D8%B1%20%D8%A7%D9%84%D9%82%D8%A7%D8%B1%D8%A7%D8%AA%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A',
        thumbnail: `${HERITAGE}/heritage-14.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T20:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'beginner', tags: ['إسطنبول', 'البوسفور', 'قارتان'],
      },
    ],
  },
  {
    id: 'BH', name: 'البحرين — أرض دلمون واللؤلؤ', flag: '🇧🇭',
    lat: 26.0667, lon: 50.5577, region: 'Palm 33 · سرّ عبر الخليج', timezone: 'UTC+3',
    content: [
      {
        id: 'bh-pearl', type: 'historicalExperience',
        title: 'دلمون واللؤلؤ — كنوز البحرين',
        description: 'تتذكرون «ابن من البحرين» الذي حمل سؤالاً قديماً إلى القرية؟ جاء من جزيرةٍ عرفها القدماء باسم «دلمون» أرض الخلود في أساطير سومر، واشتهرت قروناً بأجود لؤلؤ الأرض؛ حتى إن اليونسكو سجّلت «طريق اللؤلؤ» في المحرّق تراثاً عالمياً يروي حياة الغوّاصين والنواخذة. بحرٌ واحد ربط البحرين وعُمان بالغوص والسفر والقرابة. 📚 المرجع: اليونسكو — Pearling, Testimony of an Island Economy.',
        teacher: { name: 'شايب خلف', avatar: 'ش', bio: 'حارس أسرار القرية' },
        platform: 'custom', streamUrl: 'https://whc.unesco.org/en/list/1364/',
        thumbnail: `${HERITAGE}/heritage-19.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T19:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['دلمون', 'لؤلؤ', 'يونسكو', 'غوص'],
      },
    ],
  },
  {
    id: 'IR', name: 'إيران — موطن القنوات', flag: '🇮🇷',
    lat: 32.4279, lon: 53.688, region: 'حيث بدأت الأنهار الجوفية', timezone: 'UTC+3:30',
    content: [
      {
        id: 'ir-qanat', type: 'historicalExperience',
        title: 'القنات الفارسية — جَدّ الأفلاج',
        description: 'قبل نحو ثلاثة آلاف سنة حفر الفرس أولى «القنوات»: أنفاقاً تمشي بالماء من سفوح الجبال إلى مدن الصحراء. ما زالت في إيران عشرات الآلاف منها، وسجّلت اليونسكو أحد عشر قناتاً فارسية تراثاً عالمياً. القنات والفلج العُماني ابنا فكرةٍ واحدة عبقرية — اسمان لنهرٍ مدفون. 📚 المرجع: اليونسكو — The Persian Qanat.',
        teacher: { name: 'وكيل الفلج', avatar: 'ق', bio: 'كان الوقت يُقاس بالنجم والماء' },
        platform: 'custom', streamUrl: 'https://whc.unesco.org/en/list/1506/',
        thumbnail: `${HERITAGE}/heritage-28.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T07:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['قنات', 'يونسكو', 'ماء'],
      },
    ],
  },
  {
    id: 'AE', name: 'الإمارات — واحة العين', flag: '🇦🇪',
    lat: 24.2075, lon: 55.7447, region: 'جارة الأفلاج', timezone: 'UTC+4',
    content: [
      {
        id: 'ae-falaj', type: 'historicalExperience',
        title: 'أفلاج العين — ثلاثة آلاف سنة من الخضرة',
        description: 'خلف الجبال المطلّة على سمائل مباشرةً تعيش واحة العين على أفلاجها منذ ثلاثة آلاف سنة، وقد سجّلتها اليونسكو ضمن مواقع العين الثقافية. الأهل على جانبَي الحدود يتشاركون الماء نفسه وأصناف التمر نفسها — فالفلج لا يعرف الحدود. 📚 المرجع: اليونسكو — Cultural Sites of Al Ain.',
        teacher: { name: 'العم ناصر', avatar: 'ن', bio: 'سيارته حملت أطفال الرواية للسوق' },
        platform: 'custom', streamUrl: 'https://whc.unesco.org/en/list/1343/',
        thumbnail: `${HERITAGE}/heritage-20.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T08:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'beginner', tags: ['العين', 'أفلاج', 'يونسكو'],
      },
    ],
  },
  {
    id: 'SA', name: 'السعودية — عجوة المدينة', flag: '🇸🇦',
    lat: 24.4672, lon: 39.6111, region: 'ثلاثون مليون نخلة', timezone: 'UTC+3',
    content: [
      {
        id: 'sa-palms', type: 'culturalVideo',
        title: 'عجوة وسكّري وخلاص — قصة ثلاثين مليون نخلة',
        description: 'في السعودية أكثر من ثلاثين مليون نخلة، أشهر تمورها «عجوة المدينة» الداكنة الغالية و«السكّري» الذهبي من القصيم. وعلى امتداد الخليج والجزيرة يفتتح التمر مائدة الإفطار في رمضان — تماماً كما في بيوت قريتنا. وقد سجّلت اليونسكو المعارف المرتبطة بالنخلة تراثاً إنسانياً مشتركاً لأربع عشرة دولة عربية. 📚 المرجع: اليونسكو — النخلة: المعارف والمهارات والتقاليد.',
        teacher: { name: 'راوي السوق', avatar: 'ر', bio: 'لكل تمرةٍ حكاية' },
        platform: 'custom', streamUrl: 'https://ich.unesco.org/en/RL/date-palm-knowledge-skills-traditions-and-practices-01509',
        thumbnail: `${HERITAGE}/heritage-30.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T09:00:00Z', language: 'Arabic', ageGroup: 'kids',
        topic: 'Vocabulary', level: 'beginner', tags: ['عجوة', 'سكري', 'رمضان', 'يونسكو'],
      },
    ],
  },
  {
    id: 'IQ', name: 'العراق — بصرة النخيل', flag: '🇮🇶',
    lat: 30.5085, lon: 47.7804, region: 'غابة النخيل الأولى في العالم', timezone: 'UTC+3',
    content: [
      {
        id: 'iq-palms', type: 'culturalVideo',
        title: 'شطّ العرب — حيث كانت أكبر غابة نخيل على الأرض',
        description: 'قبل قرنٍ من الزمان كانت ضفاف شطّ العرب في البصرة تحمل نحو ثلاثين مليون نخلة — أكبر غابة نخيل عرفها العالم — تشتهر بالبرحي والزهدي. ومن موانئها أبحر التمر إلى الهند وأوروبا في المراكب نفسها التي عرفت طريقها إلى موانئ عُمان. 📚 المراجع: منظمة الأغذية والزراعة (فاو)، الموسوعة البريطانية.',
        teacher: { name: 'نوخذة المركب', avatar: 'د', bio: 'كل ميناء يعرف شراعه' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D9%86%D8%AE%D9%8A%D9%84%20%D8%A7%D9%84%D8%A8%D8%B5%D8%B1%D8%A9%20%D8%B4%D8%B7%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A',
        thumbnail: `${HERITAGE}/heritage-13.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T10:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['البصرة', 'برحي', 'شط العرب'],
      },
    ],
  },
  {
    id: 'EG', name: 'مصر — واحة سيوة', flag: '🇪🇬',
    lat: 29.2032, lon: 25.5196, region: 'أكبر منتج للتمور في العالم', timezone: 'UTC+2',
    content: [
      {
        id: 'eg-palms', type: 'culturalVideo',
        title: 'سيوة — نخيلٌ يظلّل التاريخ',
        description: 'مصر اليوم أكبر منتجٍ للتمور في العالم بما يفوق مليون طنٍ سنوياً. وفي واحة سيوة النائية غرب الصحراء، ظلّلت النخيل البيوت الطينية آلاف السنين، وكان قدماء المصريين يضعون سلال التمر في مقابرهم زاداً للرحلة الأخيرة. النخلة تصل صحراء مصر بوديان عُمان بخيطٍ أخضر واحد. 📚 المراجع: منظمة الأغذية والزراعة (فاو).',
        teacher: { name: 'قارئ الجدران', avatar: 'هـ', bio: 'يقرأ ما كتبه الزمن' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D9%88%D8%A7%D8%AD%D8%A9%20%D8%B3%D9%8A%D9%88%D8%A9%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A',
        thumbnail: `${HERITAGE}/heritage-31.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T11:00:00Z', language: 'Arabic', ageGroup: 'kids',
        topic: 'Vocabulary', level: 'beginner', tags: ['سيوة', 'تمور', 'فراعنة'],
      },
    ],
  },
  {
    id: 'MA', name: 'المغرب — خطّارات مراكش', flag: '🇲🇦',
    lat: 31.6295, lon: -7.9811, region: 'فلج المغرب الأقصى', timezone: 'UTC+1',
    content: [
      {
        id: 'ma-khettara', type: 'historicalExperience',
        title: 'الخطّارة — النهر المدفون تحت مراكش',
        description: 'تحت بساتين مراكش وتافيلالت تجري «الخطّارات»: قنواتٌ جوفية حُفرت قبل تسعة قرون لتروي الواحات على حافة الصحراء. الفكرة نفسها التي حفرها العُمانيون فلجاً والفرس قناتاً — حيثما التقت الصحراء بالجبل، حفر الإنسان الجواب العبقري نفسه. 📚 المراجع: دراسات الواحات المغربية، الإيسيسكو.',
        teacher: { name: 'بستاني الواحة', avatar: 'ج', bio: 'يعرف كل قناةٍ من صوتها' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D8%A7%D9%84%D8%AE%D8%B7%D8%A7%D8%B1%D8%A7%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A',
        thumbnail: `${HERITAGE}/heritage-07.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T12:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['خطارة', 'مراكش', 'واحات'],
      },
    ],
  },
  {
    id: 'ES', name: 'إسبانيا — ميراث الأندلس', flag: '🇪🇸',
    lat: 37.1773, lon: -3.5986, region: 'غرناطة · كلمة عربية تسقي أوروبا', timezone: 'UTC+1',
    content: [
      {
        id: 'es-acequia', type: 'historicalExperience',
        title: 'الساقية — Acequia — عربيةٌ تجري في إسبانيا',
        description: 'ما زالت قنوات الري في إسبانيا تُسمّى «Acequia» — من «الساقية» العربية. حملها مهندسو الأندلس قبل ألف سنة إلى غرناطة وبلنسية، وما زالت حدائق قصر الحمراء تُروى بها، وما زالت «محكمة الماء» في بلنسية تنعقد كل خميس منذ ألف عام — سجّلتها اليونسكو تراثاً إنسانياً. الماء حمل اللغة معه. 📚 المرجع: اليونسكو — محاكم الريّ في شرق إسبانيا.',
        teacher: { name: 'الرحّالة', avatar: 'ر', bio: 'الكلمات تسافر أبعد من السفن' },
        platform: 'custom', streamUrl: 'https://ich.unesco.org/en/RL/irrigators-tribunals-of-the-spanish-mediterranean-coast-the-council-of-wise-men-of-the-plain-of-murcia-and-the-water-tribunal-of-the-plain-of-valencia-00171',
        thumbnail: `${HERITAGE}/heritage-06.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T13:00:00Z', language: 'Arabic', ageGroup: 'adults',
        topic: 'Vocabulary', level: 'advanced', tags: ['ساقية', 'أندلس', 'الحمراء', 'يونسكو'],
      },
    ],
  },
  {
    id: 'TN', name: 'تونس — توزر', flag: '🇹🇳',
    lat: 33.9197, lon: 8.1335, region: 'ملكة التمور', timezone: 'UTC+1',
    content: [
      {
        id: 'tn-palms', type: 'culturalVideo',
        title: 'دقلة النور — تمرة الضوء',
        description: '«دقلة النور» التونسية شفّافة حتى لتكاد ترى الشمس من خلالها — ولهذا سُمّيت تمرة الضوء. حول مدينة توزر تمتد واحةٌ عمرها ألف سنة بمئات آلاف النخيل، نظّم مياهها في القرن الثالث عشر مهندسٌ اسمه ابن شبّاط بنظامٍ دقيق للحصص. كل بلد تمرٍ يحكي القصة نفسها: ماءٌ وصبرٌ ونخلة. 📚 المراجع: الموسوعة التونسية، دراسات الواحات.',
        teacher: { name: 'فلّاح الواحة', avatar: 'ف', bio: 'الصبر أول المحاصيل' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D8%AA%D9%88%D8%B2%D8%B1%20%D8%AF%D9%82%D9%84%D8%A9%20%D8%A7%D9%84%D9%86%D9%88%D8%B1%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A',
        thumbnail: `${HERITAGE}/heritage-26.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T14:00:00Z', language: 'Arabic', ageGroup: 'kids',
        topic: 'Vocabulary', level: 'beginner', tags: ['دقلة النور', 'توزر', 'واحة'],
      },
    ],
  },
  {
    id: 'CN', name: 'الصين — تربان', flag: '🇨🇳',
    lat: 42.9513, lon: 89.1895, region: 'كاريز طريق الحرير', timezone: 'UTC+8',
    content: [
      {
        id: 'cn-karez', type: 'historicalExperience',
        title: 'الكاريز — الفلج في أقصى طريق الحرير',
        description: 'في تربان، إحدى أشد بقاع الصين حرارة، تجري آلاف الكيلومترات من قنوات «الكاريز» حاملةً ذوب الثلوج تحت الأرض إلى كروم العنب والبساتين — الاختراع نفسه الذي سافر شرقاً مع قوافل طريق الحرير. حيثما التقت صحراء بجبل، حفر الإنسان الجواب العبقري ذاته. 📚 المراجع: دراسات طريق الحرير، الموسوعة الصينية.',
        teacher: { name: 'دليل القوافل', avatar: 'ط', bio: 'كل طريقٍ يحفظ آباره' },
        platform: 'youtube', streamUrl: 'https://www.youtube.com/results?search_query=%D9%83%D8%A7%D8%B1%D9%8A%D8%B2%20%D8%AA%D8%B1%D8%A8%D8%A7%D9%86%20%D8%A7%D9%84%D8%B5%D9%8A%D9%86%20%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A',
        thumbnail: `${HERITAGE}/heritage-11.jpg`, isLive: false, viewerCount: 0,
        scheduledStart: '2026-01-01T15:00:00Z', language: 'Arabic', ageGroup: 'all',
        topic: 'Stories', level: 'intermediate', tags: ['كاريز', 'طريق الحرير', 'تربان'],
      },
    ],
  },
];

export const getCountryById = (id: string): Country | undefined =>
  countries.find((c) => c.id === id);

export const getLiveContentCount = (): number =>
  countries.reduce((sum, c) => sum + c.content.filter((i) => i.isLive).length, 0);

export const getTotalViewerCount = (): number =>
  countries.reduce(
    (sum, c) => sum + c.content.reduce((s, i) => s + (i.isLive ? i.viewerCount : 0), 0),
    0
  );

export const filterContentTypes = [
  { id: 'all', label: 'All' },
  { id: 'liveLesson', label: 'Live Lessons' },
  { id: 'culturalVideo', label: 'Story & Culture' },
  { id: 'historicalExperience', label: 'Heritage' },
  { id: 'event', label: 'Events' },
  { id: 'challenge', label: 'Challenges' },
] as const;

export const levelFilters = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const topicFilters = ['Grammar', 'Speaking', 'Vocabulary', 'Stories'] as const;
export const ageFilters = ['Kids', 'Adults'] as const;
