/* ألغازُ الجُمل — مئةُ جملة.
 *
 * لا نكتب القواعدَ يدويًّا لكلِّ جملة: تُشتقّ من الجملة نفسِها.
 * فالكلمةُ الأولى تكبر لأنّها تفتح الجملة، و«I» تكبر دائمًا، وأسماءُ
 * الأيّام والشهور والأعلام والبلدان تكبر أينما وقعت. والنقطةُ في
 * الآخر. وكلُّ سببٍ له تلميحٌ يتكلّم بلسان الكلمة نفسِها، كما أرادت
 * ثريّا: «‏i am a day, my first letter is big».
 */
(function (root) {
  'use strict';

  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
    'august', 'september', 'october', 'november', 'december'];
  const NAMES = ['lulwa', 'adam', 'taha', 'aws', 'smeed', 'yara', 'hala', 'sara', 'omar', 'nora'];
  const PLACES = ['oman', 'muscat', 'nizwa', 'salalah', 'sur', 'ibri', 'sohar', 'samail', 'egypt', 'india'];

  /* سببُ الكِبَر ← تلميحُه بلسان الكلمة */
  const WHY = {
    start: { en: 'I start the sentence. My first letter is big.', ar: 'أنا أفتحُ الجملة، فأوّلُ حرفٍ فيّ كبير.' },
    pron: { en: 'I am I. I am always big.', ar: 'أنا «I»، وأنا كبيرةٌ دائمًا أينما كنت.' },
    day: { en: 'I am a day. My first letter is big.', ar: 'أنا يومٌ من أيّام الأسبوع، فأوّلُ حرفٍ فيّ كبير.' },
    month: { en: 'I am a month. My first letter is big.', ar: 'أنا شهر، فأوّلُ حرفٍ فيّ كبير.' },
    name: { en: 'I am a name. My first letter is big.', ar: 'أنا اسمُ عَلَم، فأوّلُ حرفٍ فيّ كبير.' },
    place: { en: 'I am a place. My first letter is big.', ar: 'أنا اسمُ مكان، فأوّلُ حرفٍ فيّ كبير.' },
    stop: { en: 'A sentence ends with a full stop.', ar: 'الجملةُ تنتهي بنقطة.' }
  };

  function whyOf(word, index) {
    const w = word.toLowerCase();
    if (w === 'i') return 'pron';
    if (DAYS.indexOf(w) >= 0) return 'day';
    if (MONTHS.indexOf(w) >= 0) return 'month';
    if (NAMES.indexOf(w) >= 0) return 'name';
    if (PLACES.indexOf(w) >= 0) return 'place';
    if (index === 0) return 'start';
    return null;
  }

  /* الجملُ المئة. مرتّبةٌ من الأقصر إلى الأطول — والمستوى يأخذ بقدره. */
  const RAW = [
    'i am a boy.', 'i am a girl.', 'i can run.', 'i can jump.', 'i see a tree.',
    'we are friends.', 'the sun is hot.', 'my name is adam.', 'my name is lulwa.', 'i like dates.',
    'taha has a book.', 'aws is my friend.', 'the palm is tall.', 'i am very tired.', 'we walk together.',
    'i rest in the shade.', 'the moon is bright.', 'smeed is a friend.', 'my school is near.', 'i drink water.',
    'the cat is small.', 'birds fly high.', 'we play in the sand.', 'i help my mother.', 'the door is open.',
    'my father works hard.', 'we eat together.', 'the sky is blue.', 'i read every day.', 'the road is long.',
    'today is monday.', 'today is friday.', 'we go on sunday.', 'school starts on sunday.', 'i rest on friday.',
    'saturday is a busy day.', 'thursday is my day.', 'we travel on tuesday.', 'the market opens on wednesday.', 'i study on monday.',
    'my birthday is in may.', 'we travel in july.', 'the rain comes in january.', 'school ends in june.', 'dates ripen in august.',
    'we visit oman in march.', 'december is cold.', 'april brings flowers.', 'the heat starts in april.', 'we swim in september.',
    'adam lives in nizwa.', 'lulwa comes from samail.', 'taha visits muscat.', 'aws walks to sohar.', 'we live in oman.',
    'smeed sleeps in the sand.', 'nora reads a story.', 'omar plants a tree.', 'sara counts the stars.', 'yara paints a house.',
    'i give adam a date.', 'taha and aws are friends.', 'lulwa helps her mother.', 'we meet omar at school.', 'nora sees a butterfly.',
    'my sister sings a song.', 'the falaj brings water.', 'the old house is quiet.', 'we carry the basket.', 'the wind moves the leaves.',
    'i wake up early.', 'we clean the yard.', 'the teacher writes a word.', 'children run in the street.', 'my grandmother tells a story.',
    'the goat eats the grass.', 'we count the palm trees.', 'the bread smells good.', 'i wash my hands.', 'the lamp gives light.',
    'on friday we visit nizwa.', 'in june the days are long.', 'adam and lulwa read a book.', 'taha meets aws on monday.', 'we plant a tree in march.',
    'my school is far from muscat.', 'the sun sets behind the mountain.', 'we drink coffee with dates.', 'smeed makes a wish on tuesday.', 'nora walks to school with sara.',
    'i write a letter to my friend.', 'the children play under the palm.', 'we watch the stars at night.', 'my father drives to salalah.', 'the old man tells us a story.',
    'in august the dates are sweet.', 'lulwa and yara run to the falaj.', 'we say good morning to the teacher.', 'the little cat sleeps on the mat.', 'adam finds a shell near the sea.'
  ];

  const PUZZLES = RAW.map(function (s, i) {
    const noStop = s.replace(/[.!?]$/, '');
    const words = noStop.split(/\s+/);
    return {
      id: i + 1,
      words: words,                                   /* بحروفٍ صغيرةٍ كلُّها */
      caps: words.map(whyOf),                          /* سببُ الكِبَر أو null */
      solution: words.map(function (w, j) {
        return whyOf(w, j) ? w.charAt(0).toUpperCase() + w.slice(1) : w;
      }).join(' ') + '.',
      len: words.length
    };
  });

  root.PalmPuzzles = { PUZZLES: PUZZLES, WHY: WHY, whyOf: whyOf };
})(typeof window !== 'undefined' ? window : globalThis);
