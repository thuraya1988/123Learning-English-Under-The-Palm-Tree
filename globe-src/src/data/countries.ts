import type { Country } from '@/types';

/**
 * Story World — Under the Palm Tree
 *
 * Every country on the globe is a real place from Thuraya's novel.
 * Every card links to a real page on play.under-palm-tree.com:
 * chapters, games, skills, the museum, and the novel itself.
 */

const SITE = 'https://play.under-palm-tree.com';
const HERITAGE =
  'https://raw.githubusercontent.com/thuraya1988/123Learning-English-Under-The-Palm-Tree/main/public/gallery/heritage';

export const countries: Country[] = [
  // OMAN — the heart of the story (Al-Qurawashiyah, Samail, 1973)
  {
    id: 'OM',
    name: 'Oman — Al-Qurawashiyah',
    flag: '🇴🇲',
    lat: 23.3,
    lon: 57.98,
    region: 'Samail · 1973',
    timezone: 'UTC+4',
    content: [
      {
        id: 'om-novel-en',
        type: 'liveLesson',
        title: 'The Novel — Under the Palm Tree',
        description:
          'The complete story in English with audio narration. John and Sophia arrive in a small Omani village in 1973 — and everything changes. 36 Palms, one unforgettable year.',
        teacher: { name: 'Thuraya', avatar: 'T', bio: 'The narrator — Omani English teacher' },
        platform: 'custom',
        streamUrl: `${SITE}/Palm_Tree_ENGLISH-TTS.html`,
        thumbnail: `${HERITAGE}/heritage-25.jpg`,
        isLive: true,
        viewerCount: 36,
        scheduledStart: '2026-01-01T16:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'intermediate',
        tags: ['Novel', 'Listening', 'Reading', '1973'],
      },
      {
        id: 'om-novel-ar',
        type: 'culturalVideo',
        title: 'الرواية بالعربي — تحت ظلّ النخلة',
        description:
          'اقرئي واستمعي للقصة كاملة بالعربية. قرية القرواشية، سمائل، عُمان ١٩٧٣ — حكاية جون وصوفيا ومعلود والقرية التي علّمت الجميع.',
        teacher: { name: 'ثريا', avatar: 'ث', bio: 'الراوية — معلمة إنجليزية عمانية' },
        platform: 'custom',
        streamUrl: `${SITE}/Palm_Tree_ARABIC-TTS.html`,
        thumbnail: `${HERITAGE}/heritage-14.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T16:00:00Z',
        language: 'Arabic',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'beginner',
        tags: ['رواية', 'استماع', 'قراءة'],
      },
      {
        id: 'om-museum',
        type: 'historicalExperience',
        title: 'Omani Heritage Museum — 3D',
        description:
          'Walk through a virtual 3D museum of 34 scenes from Omani heritage: the falaj, Razha sword dance, palm-frond weaving, coffee rituals, and the village games children played in 1973.',
        teacher: { name: 'Shayb Khalaf', avatar: 'ش', bio: 'Keeper of village memory' },
        platform: 'custom',
        streamUrl: `${SITE}/oman-heritage-museum-3d.html`,
        thumbnail: `${HERITAGE}/heritage-22.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T10:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'beginner',
        tags: ['Museum', '3D', 'Culture', 'Oman'],
      },
      {
        id: 'om-games',
        type: 'challenge',
        title: 'Games & Skills Hub',
        description:
          'Fifteen games and eleven skills born from the story: Malood’s Adventure, Quffah Match, Falaj Sentence Builder, Domnah, and practice for reading, speaking, listening and more.',
        teacher: { name: 'Malood', avatar: 'M', bio: 'The goat who ate Sophia’s ring' },
        platform: 'custom',
        streamUrl: `${SITE}/games-skills.html`,
        thumbnail: `${HERITAGE}/heritage-02.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T12:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Games', 'Skills', 'Practice'],
      },
      {
        id: 'om-salon',
        type: 'culturalVideo',
        title: 'Saloan Marhoona — The Omani Beauty Atelier',
        description:
          'Thirty-six traditional beauty rituals from the village: rosewater welcome, bukhoor lighting, henna nights, and the nine sacred ingredients. Learn the English of Omani heritage.',
        teacher: { name: 'Marhoona', avatar: 'م', bio: 'Keeper of the village rituals' },
        platform: 'custom',
        streamUrl: `${SITE}/saloan-marhoona-themed.html`,
        thumbnail: `${HERITAGE}/heritage-08.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T15:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Vocabulary',
        level: 'intermediate',
        tags: ['Heritage', 'Rituals', 'Vocabulary'],
      },
      {
        id: 'om-kitchen',
        type: 'event',
        title: 'Mooza’s Kitchen',
        description:
          'Cook 36 Omani dishes with Mooza — from morning tea with cardamom to Eid halwa. Every recipe teaches imperative verbs and food vocabulary.',
        teacher: { name: 'Mooza', avatar: 'مو', bio: 'The village cook — every spice is a story' },
        platform: 'custom',
        streamUrl: `${SITE}/mooza-kitchen-themed.html`,
        thumbnail: `${HERITAGE}/heritage-27.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T09:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Food', 'Verbs', 'Culture'],
      },
      {
        id: 'om-falaj',
        type: 'historicalExperience',
        title: 'The Aflaj of Oman — 4,000 Rivers of Stone',
        description:
          'Oman has nearly 4,000 aflaj — ancient channels that carry mountain water to villages by gravity alone, some over 1,500 years old. Five of them are UNESCO World Heritage sites, including Falaj Daris in Nizwa. Water shares (athar) were once timed by the stars. In the story, the falaj is where the village children play and learn.',
        teacher: { name: 'Khalil', avatar: 'خ', bio: 'Helping others was his reflex' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/falaj-builder-sentence.html`,
        thumbnail: `${HERITAGE}/heritage-28.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T07:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Falaj', 'UNESCO', 'Water', 'Heritage'],
      },
      {
        id: 'om-palms',
        type: 'culturalVideo',
        title: 'The Treasure of Dates — Oman’s 8 Million Palms',
        description:
          'Oman grows around eight million date palms. Its most beloved varieties are Fardh, Khalas, and Khunaizi. A palm gives more than fruit: fronds become baskets (quffah) and mats, trunks become roofs, and the summer harvest (jadad al-nakheel) gathers the whole village. That is why the story is called Under the Palm Tree.',
        teacher: { name: 'Sadou', avatar: 'س', bio: 'He climbed the palm in Palm 14' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/seedling-lab.html`,
        thumbnail: `${HERITAGE}/heritage-24.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T06:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Palms', 'Dates', 'Fardh', 'Khalas'],
      },
    ],
  },

  // UNITED KINGDOM — where John & Sophia's journey begins
  {
    id: 'GB',
    name: 'United Kingdom — London',
    flag: '🇬🇧',
    lat: 51.5074,
    lon: -0.1278,
    region: 'Where the letter arrived',
    timezone: 'UTC+0',
    content: [
      {
        id: 'gb-letter',
        type: 'culturalVideo',
        title: 'The Letter That Started Everything',
        description:
          'London, 1973. John reads a letter inviting two teachers to a village in Oman he cannot find on any map. Sophia hesitates. Read Palm One — where the whole journey begins.',
        teacher: { name: 'John', avatar: 'J', bio: 'British teacher — tall, patient, kind' },
        platform: 'custom',
        streamUrl: `${SITE}/Palm_Tree_ENGLISH-TTS.html`,
        thumbnail: `${HERITAGE}/heritage-04.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T08:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'intermediate',
        tags: ['Palm 1', 'London', 'Beginning'],
      },
      {
        id: 'gb-echo',
        type: 'challenge',
        title: 'Echo Speak — British Pronunciation',
        description:
          'Practise speaking with the same calm British voice John brought to the village classroom. Listen, repeat, and build your confidence sentence by sentence.',
        teacher: { name: 'John', avatar: 'J', bio: 'He wrote HELLO on the chalkboard first' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/palm-echo-speak.html`,
        thumbnail: `${HERITAGE}/heritage-09.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T11:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Speaking',
        level: 'beginner',
        tags: ['Pronunciation', 'Speaking', 'British'],
      },
      {
        id: 'gb-grammar',
        type: 'liveLesson',
        title: 'Grove Grammar — John’s Classroom',
        description:
          'Grammar the way John taught it under the palm grove: from real sentences the children spoke, not from dry rules. Tenses, questions, and the day nobody spoke Arabic.',
        teacher: { name: 'Sophia', avatar: 'S', bio: 'Her ring was eaten by a goat named Malood' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/palm-grove-grammar.html`,
        thumbnail: `${HERITAGE}/heritage-29.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T13:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Grammar',
        level: 'intermediate',
        tags: ['Grammar', 'Classroom', 'Palm 20'],
      },
    ],
  },

  // TURKEY — where Thuraya writes her Book of Thoughts (2026)
  {
    id: 'TR',
    name: 'Türkiye — Thuraya’s Desk',
    flag: '🇹🇷',
    lat: 39.0,
    lon: 35.0,
    region: 'Where the story is remembered · 2026',
    timezone: 'UTC+3',
    content: [
      {
        id: 'tr-book',
        type: 'culturalVideo',
        title: 'Thuraya’s Book of Thoughts — Palm 01',
        description:
          'Türkiye, 2026. Thuraya opens her notebook and remembers everything: the letter, the flight, the heat of arrival, and the village that taught the teachers. The frame of the whole novel.',
        teacher: { name: 'Thuraya', avatar: 'T', bio: 'Writer, teacher, keeper of the story' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/pronunciation-skill-app.html`,
        thumbnail: `${HERITAGE}/heritage-14.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T20:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Speaking',
        level: 'beginner',
        tags: ['Palm 1', 'Listen & Repeat', 'Memories'],
      },
      {
        id: 'tr-write',
        type: 'challenge',
        title: 'Write Your Own Book of Thoughts',
        description:
          'Like Thuraya, keep a writer’s notebook. Guided writing practice: describe a memory, a place you love, a person who changed you. Your words, your palms.',
        teacher: { name: 'Thuraya', avatar: 'T', bio: 'Every writer starts with one honest page' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/palm-scribe-write.html`,
        thumbnail: `${HERITAGE}/heritage-21.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T21:00:00Z',
        language: 'English',
        ageGroup: 'adults',
        topic: 'Stories',
        level: 'intermediate',
        tags: ['Writing', 'Journal', 'Creative'],
      },
    ],
  },

  // ZANZIBAR — the trader and the saffron mask (Palm 19)
  {
    id: 'TZ',
    name: 'Zanzibar',
    flag: '🇹🇿',
    lat: -6.1659,
    lon: 39.2026,
    region: 'The trader’s route · Palm 19',
    timezone: 'UTC+3',
    content: [
      {
        id: 'tz-trader',
        type: 'historicalExperience',
        title: 'The Zanzibari Trader & the Saffron Mask',
        description:
          'Palm 19. A trader from Zanzibar arrives at the souq with stories, spices, and a saffron mask. Oman and Zanzibar share centuries of history — read the chapter that connects them.',
        teacher: { name: 'The Trader', avatar: 'Z', bio: 'He carried two coasts in one dhow' },
        platform: 'custom',
        streamUrl: `${SITE}/Palm_Tree_ENGLISH-TTS.html`,
        thumbnail: `${HERITAGE}/heritage-15.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T14:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'intermediate',
        tags: ['Palm 19', 'Trade', 'History'],
      },
      {
        id: 'tz-quffah',
        type: 'challenge',
        title: 'Quffah Match — Souq Memory Game',
        description:
          'Fill your quffah (palm basket) at the souq! Match the market words the trader taught the children: spices, fruits, tools, and treasures.',
        teacher: { name: 'Sadoo', avatar: 'س', bio: 'The shopkeeper who calls everyone habibi' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/quffah-match-memory.html`,
        thumbnail: `${HERITAGE}/heritage-16.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T17:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Memory', 'Souq', 'Vocabulary'],
      },
    ],
  },

  // BAHRAIN — a son from Bahrain (Palm 33)
  {
    id: 'BH',
    name: 'Bahrain',
    flag: '🇧🇭',
    lat: 26.0667,
    lon: 50.5577,
    region: 'The truth behind the story · Palm 33',
    timezone: 'UTC+3',
    content: [
      {
        id: 'bh-son',
        type: 'culturalVideo',
        title: 'A Son from Bahrain — The Truth Behind the Story',
        description:
          'Palm 33. A visitor from Bahrain arrives in the village carrying a question that unlocks one of the story’s oldest secrets. Some truths travel across the Gulf to be told.',
        teacher: { name: 'Shayb Khalaf', avatar: 'ش', bio: 'The elder who feared only one thing' },
        platform: 'custom',
        streamUrl: `${SITE}/Palm_Tree_ENGLISH-TTS.html`,
        thumbnail: `${HERITAGE}/heritage-18.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T19:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'advanced',
        tags: ['Palm 33', 'Mystery', 'Gulf'],
      },
      {
        id: 'bh-quiz',
        type: 'challenge',
        title: 'Palm Quiz Show — Test the Whole Story',
        description:
          'How well do you know the village? Characters, chapters, culture, and English — the grand quiz across all 36 Palms.',
        teacher: { name: 'Ahmed', avatar: 'أ', bio: 'Always has a pencil ready in his pocket' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/palm-quiz-show.html`,
        thumbnail: `${HERITAGE}/heritage-32.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T18:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Grammar',
        level: 'intermediate',
        tags: ['Quiz', 'Review', 'Challenge'],
      },
    ],
  },

  // IRAN — the qanat: grandfather of all falaj systems
  {
    id: 'IR',
    name: 'Iran — Land of Qanats',
    flag: '🇮🇷',
    lat: 32.4279,
    lon: 53.688,
    region: 'Where underground rivers began',
    timezone: 'UTC+3:30',
    content: [
      {
        id: 'ir-qanat',
        type: 'historicalExperience',
        title: 'The Qanat — 3,000 Years of Water Wisdom',
        description:
          'Persia dug the first qanats nearly 3,000 years ago — underground tunnels that walk water from mountain aquifers to desert towns. Iran still has tens of thousands, and eleven Persian qanats are UNESCO World Heritage. The Omani falaj and the qanat are cousins: the same genius, two names.',
        teacher: { name: 'The Falaj Keeper', avatar: 'ق', bio: 'Time was measured by stars and water' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/falaj-builder-sentence.html`,
        thumbnail: `${HERITAGE}/heritage-28.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T07:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Vocabulary',
        level: 'intermediate',
        tags: ['Qanat', 'Falaj', 'UNESCO', 'Water'],
      },
    ],
  },

  // UAE — Al Ain aflaj and date culture
  {
    id: 'AE',
    name: 'United Arab Emirates — Al Ain',
    flag: '🇦🇪',
    lat: 24.2075,
    lon: 55.7447,
    region: 'The oasis neighbour',
    timezone: 'UTC+4',
    content: [
      {
        id: 'ae-falaj',
        type: 'historicalExperience',
        title: 'Al Ain — The Falaj Oasis Next Door',
        description:
          'Just across the mountains from Samail, the Al Ain oasis has run on aflaj for 3,000 years — its falaj-fed gardens are a UNESCO World Heritage site. Omani and Emirati families share this water heritage, and many of the same date varieties grow on both sides of the border.',
        teacher: { name: 'Uncle Nasser', avatar: 'ن', bio: 'His pickup carried the children to the souq' },
        platform: 'custom',
        streamUrl: `${SITE}/oman-heritage-museum-3d.html`,
        thumbnail: `${HERITAGE}/heritage-20.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T08:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'beginner',
        tags: ['Falaj', 'Oasis', 'UNESCO', 'Gulf'],
      },
    ],
  },

  // SAUDI ARABIA — Ajwa and Sukkari dates
  {
    id: 'SA',
    name: 'Saudi Arabia — Madinah',
    flag: '🇸🇦',
    lat: 24.4672,
    lon: 39.6111,
    region: 'Home of Ajwa dates',
    timezone: 'UTC+3',
    content: [
      {
        id: 'sa-palms',
        type: 'culturalVideo',
        title: 'Thirty Million Palms — Ajwa, Sukkari, Khalas',
        description:
          'Saudi Arabia grows over thirty million date palms. The most famous variety is Ajwa of Madinah — dark, soft, and treasured for centuries — alongside golden Sukkari from Qassim. Dates open the iftar table in Ramadan across the Gulf, exactly as they do in the village of the story.',
        teacher: { name: 'Habbabouh Saif', avatar: 'ح', bio: 'Unforgettable, from the Samail souq' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/quffah-match-memory.html`,
        thumbnail: `${HERITAGE}/heritage-30.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T09:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Dates', 'Ajwa', 'Sukkari', 'Ramadan'],
      },
    ],
  },

  // IRAQ — Basra, once the world's palm forest
  {
    id: 'IQ',
    name: 'Iraq — Basra',
    flag: '🇮🇶',
    lat: 30.5085,
    lon: 47.7804,
    region: 'The old palm forest of the world',
    timezone: 'UTC+3',
    content: [
      {
        id: 'iq-palms',
        type: 'culturalVideo',
        title: 'Basra — Where Rivers of Palms Once Grew',
        description:
          'A century ago Iraq held the largest palm groves on Earth — some thirty million trees along the Shatt al-Arab river, famous for Barhi and Zahdi dates. Sailors from Basra and sailors from Oman traded dates across the same Gulf waters that carry the story’s dhows.',
        teacher: { name: 'The Dhow Captain', avatar: 'د', bio: 'Every port knew his sail' },
        platform: 'custom',
        streamUrl: `${SITE}/Palm_Tree_ENGLISH-TTS.html`,
        thumbnail: `${HERITAGE}/heritage-13.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T10:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'intermediate',
        tags: ['Palms', 'Barhi', 'Rivers', 'Trade'],
      },
    ],
  },

  // EGYPT — the world's biggest date producer today
  {
    id: 'EG',
    name: 'Egypt — Siwa Oasis',
    flag: '🇪🇬',
    lat: 29.2032,
    lon: 25.5196,
    region: 'World’s largest date producer',
    timezone: 'UTC+2',
    content: [
      {
        id: 'eg-palms',
        type: 'culturalVideo',
        title: 'Egypt — More Dates Than Any Country on Earth',
        description:
          'Today Egypt produces more dates than any other country — well over a million tonnes a year. In the Siwa oasis, palms have shaded mud-brick houses for thousands of years, and pharaohs were buried with baskets of dates for the journey. The palm connects Egypt’s deserts to Oman’s valleys.',
        teacher: { name: 'The Historian', avatar: 'هـ', bio: 'Reader of old walls' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/seedling-lab.html`,
        thumbnail: `${HERITAGE}/heritage-31.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T11:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Dates', 'Siwa', 'History', 'Pharaohs'],
      },
    ],
  },

  // MOROCCO — the khettara of Marrakech
  {
    id: 'MA',
    name: 'Morocco — Marrakech',
    flag: '🇲🇦',
    lat: 31.6295,
    lon: -7.9811,
    region: 'The khettara gardens',
    timezone: 'UTC+1',
    content: [
      {
        id: 'ma-khettara',
        type: 'historicalExperience',
        title: 'The Khettara — Falaj of the Maghreb',
        description:
          'Under the palm groves of Marrakech and Tafilalet run the khettaras — underground water channels dug nine centuries ago. Same idea as Oman’s falaj, same result: green oases in dry land, and sweet dates ripening at the desert’s edge.',
        teacher: { name: 'The Gardener', avatar: 'ج', bio: 'He knew every channel by sound' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/falaj-builder-sentence.html`,
        thumbnail: `${HERITAGE}/heritage-07.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T12:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Vocabulary',
        level: 'intermediate',
        tags: ['Khettara', 'Falaj', 'Oasis', 'Maghreb'],
      },
    ],
  },

  // SPAIN — al-Andalus and the acequia
  {
    id: 'ES',
    name: 'Spain — Granada',
    flag: '🇪🇸',
    lat: 37.1773,
    lon: -3.5986,
    region: 'Al-Andalus water heritage',
    timezone: 'UTC+1',
    content: [
      {
        id: 'es-acequia',
        type: 'historicalExperience',
        title: 'The Acequia — An Arabic Word Watering Spain',
        description:
          'Spain’s irrigation channels are still called acequias — from the Arabic as-sāqiya. Moorish engineers of al-Andalus carried falaj wisdom to Granada and Valencia a thousand years ago; the Alhambra’s gardens and Valencia’s Water Court (a UNESCO tradition) still run on it. Water carried the language with it.',
        teacher: { name: 'The Traveller', avatar: 'ر', bio: 'Words travel further than ships' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/vocabulary-skill-app.html`,
        thumbnail: `${HERITAGE}/heritage-06.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T13:00:00Z',
        language: 'English',
        ageGroup: 'adults',
        topic: 'Vocabulary',
        level: 'advanced',
        tags: ['Acequia', 'Al-Andalus', 'Arabic words', 'UNESCO'],
      },
    ],
  },

  // TUNISIA — Deglet Nour, queen of dates
  {
    id: 'TN',
    name: 'Tunisia — Tozeur',
    flag: '🇹🇳',
    lat: 33.9197,
    lon: 8.1335,
    region: 'Queen of dates',
    timezone: 'UTC+1',
    content: [
      {
        id: 'tn-palms',
        type: 'culturalVideo',
        title: 'Deglet Nour — The Date of Light',
        description:
          'Tunisia’s Deglet Nour — “date of light” — is so translucent you can see the sun through it. Around Tozeur, a thousand-year-old oasis of hundreds of thousands of palms is watered by channels an engineer named Ibn Chabbat organised in the 13th century. Every date country tells the same story: water plus patience.',
        teacher: { name: 'The Oasis Farmer', avatar: 'ف', bio: 'Patience is the first crop' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/quffah-match-memory.html`,
        thumbnail: `${HERITAGE}/heritage-26.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T14:00:00Z',
        language: 'English',
        ageGroup: 'kids',
        topic: 'Vocabulary',
        level: 'beginner',
        tags: ['Deglet Nour', 'Oasis', 'Tozeur', 'Dates'],
      },
    ],
  },

  // CHINA — the karez of Turpan
  {
    id: 'CN',
    name: 'China — Turpan',
    flag: '🇨🇳',
    lat: 42.9513,
    lon: 89.1895,
    region: 'The karez of the Silk Road',
    timezone: 'UTC+8',
    content: [
      {
        id: 'cn-karez',
        type: 'historicalExperience',
        title: 'The Karez — Falaj at the Silk Road’s Edge',
        description:
          'In Turpan, one of the hottest places in China, thousands of kilometres of karez channels bring snow-melt underground to vineyards and orchards — the same invention as the falaj, carried east along the Silk Road. Wherever deserts meet mountains, people dug the same brilliant answer.',
        teacher: { name: 'The Silk Road Guide', avatar: 'ط', bio: 'Every road remembers its wells' },
        platform: 'custom',
        streamUrl: `${SITE}/public/new-version/falaj-builder-sentence.html`,
        thumbnail: `${HERITAGE}/heritage-11.jpg`,
        isLive: false,
        viewerCount: 0,
        scheduledStart: '2026-01-01T15:00:00Z',
        language: 'English',
        ageGroup: 'all',
        topic: 'Stories',
        level: 'intermediate',
        tags: ['Karez', 'Silk Road', 'Falaj', 'Water'],
      },
    ],
  },

];

export const getCountryById = (id: string): Country | undefined =>
  countries.find((c) => c.id === id);

export const getLiveContentCount = (): number =>
  countries.reduce(
    (sum, c) => sum + c.content.filter((item) => item.isLive).length,
    0
  );

export const getTotalViewerCount = (): number =>
  countries.reduce(
    (sum, c) =>
      sum + c.content.reduce((s, item) => s + (item.isLive ? item.viewerCount : 0), 0),
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

export const levelFilters = [
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;

export const topicFilters = [
  'Grammar',
  'Speaking',
  'Vocabulary',
  'Stories',
] as const;

export const ageFilters = [
  'Kids',
  'Adults',
] as const;
