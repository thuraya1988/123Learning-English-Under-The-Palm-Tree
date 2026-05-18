"use client";

import React, { useMemo, useState } from "react";

type Language = "ar" | "en";

type CharacterItem = {
  id: string;
  imageCandidates: string[];
  descAr?: string;
  descEn?: string;
  messageAr?: string;
  messageEn?: string;
};

const IMAGE_BASE = "/assets/characters";
const PLACEHOLDER_IMAGE = `${IMAGE_BASE}/placeholder-name+background.png`;

const placeholderAr = "سيُضاف وصف هذه الشخصية قريبًا.";
const placeholderEn = "This character description will be added soon.";
const placeholderMessageAr = "رسالة الشخصية ستُضاف قريبًا.";
const placeholderMessageEn = "The character message will be added soon.";

const characters: CharacterItem[] = [
  {
    id: "ahmed",
    imageCandidates: [
      `${IMAGE_BASE}/Ahmed-name+background.png`,
      `${IMAGE_BASE}/ahmed-name+background.png`,
    ],
    descAr:
      "أحمد هو المدير العام المصغّر. يجلس مستقيمًا كأنه جاء المدرسة يقيّم أداء البقية، وليس ليدرس فقط. شكله يقول: رجاءً التزموا بالنظام، حتى لو كان عمركم عشر سنوات.",
    descEn:
      "Ahmed is a tiny general manager in student form. He sits upright like he came to school to evaluate everyone else, not just to study.",
    messageAr: "الجدية والالتزام يلفتون النظر حتى بدون ضجيج.",
    messageEn: "Discipline and seriousness stand out even without noise.",
  },
  {
    id: "ali",
    imageCandidates: [
      `${IMAGE_BASE}/ali-name+background.png`,
      `${IMAGE_BASE}/Ali-name+background.png`,
    ],
    descAr:
      "علي هو الذكي الهادئ. يفهم قبل ما يخلص الشرح، ويعطيك إحساسًا أنك أنت الذي تحتاج درسًا إضافيًا، لا هو.",
    descEn:
      "Ali is the quiet smart one. He understands the lesson before the explanation ends and somehow makes everyone else feel a little underprepared.",
    messageAr: "الذكاء لا يحتاج صوتًا عاليًا، فقط انتباهًا.",
    messageEn: "Intelligence does not need volume; it needs attention.",
  },
  {
    id: "fatakat",
    imageCandidates: [
      `${IMAGE_BASE}/fatakat-name+background.png`,
      `${IMAGE_BASE}/fatakat-name+background.PNG`,
      `${IMAGE_BASE}/fatkat-name+background.png`,
    ],
    descAr:
      "فتكات قوية، سريعة الرد، وحاضرة دائمًا. شكلها يقول: أنا مسيطرة… إلى أن يدخل السكن كير الشعبي ويقلبها إلى ليمونة رسمية مع صوفيا.",
    descEn:
      "Fatakat is quick, sharp, and always in control... until traditional skin care turns her into an official lemon beside Sophia.",
    messageAr: "مو كل شيء مكتوب عليه عناية يعني البشرة وافقت.",
    messageEn: "Not everything called skin care has your skin's approval.",
  },
  {
    id: "john",
    imageCandidates: [
      `${IMAGE_BASE}/john-name+background.png`,
      `${IMAGE_BASE}/John-name+background.png`,
    ],
    descAr:
      "جون من برّا أجنبي، ومن داخل عماني قديم متنكر. إذا فصل واشتغل العرق العماني، يتحول من Mr. John إلى سلوم الغبر: يتحمس، يجرب، ويقول Adventure قبل ما يفكر إذا القرار أصلًا آمن.",
    descEn:
      "John looks British, but inside he is basically an Omani uncle in disguise. Once the Omani spirit kicks in, 'Mr. John' becomes 'Saloom Al-Ghabar' and starts adventures first, thinking later.",
    messageAr: "المكان الجديد قد يكشف النسخة الحقيقية بداخلك.",
    messageEn: "A new place can reveal the real version of you.",
  },
  {
    id: "khalaf",
    imageCandidates: [
      `${IMAGE_BASE}/khalaf-name+background.png`,
      `${IMAGE_BASE}/Khalaf-name+background.png`,
    ],
    descAr:
      "خلف مظلوم الإشاعات. مظهره الجاد وعصاه جعلوا الناس يبنون عنه أساطير، بينما هو في الحقيقة رجل هادئ فقط يريد أن يعيش بعيدًا عن دراما الأطفال وجرائم مالود الزراعية.",
    descEn:
      "Khalaf is a victim of rumors. His serious look and walking stick made people turn him into a legend, while he is really just a quiet man trying to survive children and Malood.",
    messageAr: "لا تصدّق كل قصة تُقال عن الناس.",
    messageEn: "Do not believe every story people tell about others.",
  },
  {
    id: "khalil",
    imageCandidates: [
      `${IMAGE_BASE}/khalil-name+background.png`,
      `${IMAGE_BASE}/Khalil-name+background.png`,
    ],
    descAr:
      "خليل هو الابتسامة المشبوهة. لطيف، يساعد، ويضحك… لكنه دائمًا قريب جدًا من أي موقف يضحك أو يورّط.",
    descEn:
      "Khalil is the suspicious smile. Friendly, helpful, and funny... yet always just a little too close to the next hilarious disaster.",
    messageAr: "خفّة الروح جميلة إذا مشت معها مسؤولية.",
    messageEn: "A light spirit is lovely when it comes with responsibility.",
  },
  {
    id: "khamees",
    imageCandidates: [
      `${IMAGE_BASE}/khamees-name+background.png`,
      `${IMAGE_BASE}/Khamees-name+background.png`,
    ],
    descAr:
      "خميس طاقته من طاقة أولاد القرية الأصيلة: حركة، حضور، وفضول دائم. إذا صار شيء في الساحة، غالبًا خميس قريب منه أو في قلبه.",
    descEn:
      "Khamees carries classic village-boy energy: movement, curiosity, and a strong chance of being near any event worth watching.",
    messageAr: "الفضول إذا وُجّه صح يصير معرفة.",
    messageEn: "Curiosity becomes knowledge when guided well.",
  },
  {
    id: "malood",
    imageCandidates: [
      `${IMAGE_BASE}/malood-name+background.png`,
      `${IMAGE_BASE}/Malood-name+background.png`,
    ],
    descAr:
      "مالود ليس ماعزًا فقط، بل وزارة كاملة للتخريب والثروة الحيوانية. يأكل الدفاتر، يسرق اللمعان، يدخل البيوت وكأنه يدفع الإيجار، ثم ينظر للجميع بوجه يقول: أنا المظلوم هنا.",
    descEn:
      "Malood is not just a goat. He is a full ministry of chaos. He eats notebooks, steals shiny things, enters houses like he pays rent, and still looks offended when blamed.",
    messageAr: "الفوضى أحيانًا تصنع أجمل الذكريات.",
    messageEn: "Chaos sometimes creates the best memories.",
  },
  {
    id: "mansoor",
    imageCandidates: [
      `${IMAGE_BASE}/mansoorname+background.png`,
      `${IMAGE_BASE}/mansoor-name+background.png`,
      `${IMAGE_BASE}/Mansoor-name+background.png`,
    ],
    descAr:
      "منصور ليس طفلًا، بل إنذار طوارئ متنقل. إذا وجد كرسيًا وقف فوقه، وإذا وجد هدوءًا اعتبره استفزازًا شخصيًا يجب كسره فورًا.",
    descEn:
      "Mansoor is not a child. He is a mobile emergency alert. If he finds a chair, he stands on it. If he finds silence, he ends it immediately.",
    messageAr: "الطاقة إذا انضبطت تصير موهبة.",
    messageEn: "Energy becomes talent when it is guided.",
  },
  {
    id: "marhoon",
    imageCandidates: [
      `${IMAGE_BASE}/marhoon-name+background.png`,
      `${IMAGE_BASE}/Marhoon-name+background.png`,
    ],
    descAr:
      "مرهون يدخل المكان فيصير الجو رسميًا تلقائيًا. وجهه يقول: أنا لا أمزح. وإذا تكلم، تكفيه جملة واحدة بدل محاضرة كاملة.",
    descEn:
      "Marhoon walks in and the atmosphere instantly turns official. His face says, 'I am not here for jokes,' and one sentence from him is worth a full lecture.",
    messageAr: "بعض الهيبة لا تحتاج شرحًا.",
    messageEn: "Some forms of authority need no explanation.",
  },
  {
    id: "mathla",
    imageCandidates: [
      `${IMAGE_BASE}/math;a-name+background.png`,
      `${IMAGE_BASE}/mathla-name+background.png`,
      `${IMAGE_BASE}/Mathla-name+background.png`,
    ],
    descAr:
      "مثلى تدخل المشهد وكأن عندها موسيقى تصويرية خاصة. مرتبة، أنيقة، وواثقة. حضورها يقول: نعم، أنا اللقطة.",
    descEn:
      "Mathla enters a scene like she has her own soundtrack. Neat, elegant, and confident. Her energy says: yes, I am the moment.",
    messageAr: "الثقة والترتيب يصنعان حضورًا واضحًا.",
    messageEn: "Confidence and order create strong presence.",
  },
  {
    id: "minnah-mustafa",
    imageCandidates: [
      `${IMAGE_BASE}/minnah+mustafa-name+background.png`,
      `${IMAGE_BASE}/Minnah+Mustafa-name+background.png`,
    ],
    descAr:
      "منّة ومصطفى ثنائي سريع الإيقاع: تعليق جاهز، حضور واضح، وطاقة تجعل أي مشهد أكثر حياة. مصطفى عنده مايك داخلي، ومنّة تخطف المشهد بتعليق مضبوط.",
    descEn:
      "Minnah and Mostafa are a fast-paced duo: instant reactions, strong presence, and enough energy to make any scene feel alive. Mostafa has an internal microphone, and Minnah steals scenes with perfect timing.",
    messageAr: "الصحبة الحلوة تخفف الغربة وتزيد الضحك.",
    messageEn: "Good company softens distance and multiplies laughter.",
  },
  {
    id: "mohamadain",
    imageCandidates: [
      `${IMAGE_BASE}/mohamadain-name+background.png`,
      `${IMAGE_BASE}/mohamadeen-name+background.png`,
      `${IMAGE_BASE}/Mohamadain-name+background.png`,
    ],
    descAr:
      "محمدين يدخل المكان ومعه هيبة وكاريزما مصرية في نفس اللحظة. يقدر يشرح، يضبط الصف، ويطلق تعليقًا ذكيًا يجعل الكل يضحك ويحترم.",
    descEn:
      "Mohamadain arrives with authority and Egyptian charisma at the same time. He can teach, control the room, and drop a witty line that makes everyone laugh and listen.",
    messageAr: "المعلم الحقيقي يجعل المعلومة تعيش.",
    messageEn: "A real teacher makes knowledge feel alive.",
  },
  {
    id: "nasser",
    imageCandidates: [
      `${IMAGE_BASE}/nasser-name+background.png`,
      `${IMAGE_BASE}/Nasser-name+background.png`,
    ],
    descAr:
      "ناصر هو ملك البيك أب الأسطوري. سيارته صوتها يقول: هذا آخر يوم لي، لكن ثقته تقول: لا، هذه مجرد البداية.",
    descEn:
      "Nasser is the king of the legendary pickup truck. The truck sounds like it is on its final day, but his confidence says: no, this is only the beginning.",
    messageAr: "الخبرة تجعل الطريق الصعب يبدو عاديًا.",
    messageEn: "Experience makes difficult roads look ordinary.",
  },
  {
    id: "noorah",
    imageCandidates: [
      `${IMAGE_BASE}/noorah-name+background.png`,
      `${IMAGE_BASE}/Noorah-name+background.png`,
      `${IMAGE_BASE}/noura-name+background.png`,
    ],
    descAr:
      "نورة هي هيئة الأسئلة والاستفسارات. تسأل قبل الدرس وأثناءه وبعده، وربما عن سبب وجوده من الأساس. إذا سكتت، فهي فقط تعيد شحن الأسئلة.",
    descEn:
      "Noorah is the official department of questions. She asks before, during, and after the lesson—and maybe why the lesson exists in the first place.",
    messageAr: "السؤال بداية الفهم.",
    messageEn: "Questions are the beginning of understanding.",
  },
  {
    id: "obaid",
    imageCandidates: [
      `${IMAGE_BASE}/Obaid-name+background.png`,
      `${IMAGE_BASE}/obaid-name+background.png`,
      `${IMAGE_BASE}/Ubaid-name+background.png`,
    ],
    descAr:
      "عبيد من الشخصيات التي تحضر بهدوء لكن لا تمر مرورًا عاديًا. هدوءه يجعلك تتوقع أنه يعرف تفاصيل أكثر مما يقول.",
    descEn:
      "Obaid has the kind of quiet presence that never feels empty. You get the sense that he knows more than he says.",
    messageAr: "الهدوء ليس فراغًا، أحيانًا هو عمق.",
    messageEn: "Silence is not emptiness; sometimes it is depth.",
  },
  {
    id: "palm-tree-family",
    imageCandidates: [
      `${IMAGE_BASE}/palm-tree-family.png`,
      `${IMAGE_BASE}/Palm-tree-family.png`,
    ],
    descAr:
      "هذه ليست شخصية واحدة، بل روح العالم كله: العائلة، القرية، الضحك، والفوضى الجميلة تحت ظل النخلة.",
    descEn:
      "This is not one character—it is the spirit of the whole world: family, village life, laughter, and beautiful chaos under the palm tree.",
    messageAr: "القصص الجميلة تكبر عندما تشبه العائلة.",
    messageEn: "Beautiful stories grow when they feel like family.",
  },
  {
    id: "rahma",
    imageCandidates: [
      `${IMAGE_BASE}/rahma-name+background.png`,
      `${IMAGE_BASE}/Rahma-name+background.png`,
    ],
    descAr:
      "رحمة هي الهدوء اللطيف وسط مهرجان الضوضاء. وجودها يذكّر الجميع أن العالم لا يتكون فقط من صراخ ومطاردات ماعز.",
    descEn:
      "Rahma is the gentle calm in the middle of a noise festival. She reminds everyone that not all life is shouting and goat chases.",
    messageAr: "اللطف قوة أيضًا.",
    messageEn: "Gentleness is a kind of strength too.",
  },
  {
    id: "sadoo",
    imageCandidates: [
      `${IMAGE_BASE}/sadoo-name+background.png`,
      `${IMAGE_BASE}/Sadoo-name+background.png`,
    ],
    descAr:
      "سادو هو أبو المهمات المستحيلة. صاحب دكان، خياط، وتاجر، وربما عنده حل لكل شيء إلا الهدوء. لو طلبت منه باب غواصة، غالبًا سيقول: دقيقة أشوف لك.",
    descEn:
      "Sadoo is the master of impossible tasks. Shopkeeper, tailor, merchant, and maybe the answer to every problem except silence. Ask him for a submarine door and he may actually check.",
    messageAr: "الإنسان النافع يصير جزءًا من ذاكرة المكان.",
    messageEn: "A useful person becomes part of a place's memory.",
  },
  {
    id: "sofia",
    imageCandidates: [
      `${IMAGE_BASE}/sofia-name+background.png`,
      `${IMAGE_BASE}/Sophia-name+background.png`,
      `${IMAGE_BASE}/sofia-name+background.PNG`,
    ],
    descAr:
      "صوفيا هي وزيرة الاعتراضات الرسمية. جون يقترح، وهي ترفض بعينها قبل لسانها. لا يوجد في داخلها أي أرض تتسع لفصلات جون.",
    descEn:
      "Sophia is the official minister of objections. John proposes chaos, and she rejects it with her eyes before her mouth. There is absolutely no spare land inside her for John's dramatic episodes.",
    messageAr: "ليس كل قرار متحمس قرارًا جيدًا.",
    messageEn: "Not every excited decision is a good one.",
  },
  {
    id: "thuraya",
    imageCandidates: [
      `${IMAGE_BASE}/thuraya-name+background.png`,
      `${IMAGE_BASE}/Thuraya-name+background.png`,
    ],
    descAr:
      "ثريا هي الإدارة العليا للقرية: تنظيم، تعليم، ترجمة، وتهدئة أزمات. قوية جدًا… لكن إذا ظهرت الوزغة، تنهار الهيبة في ثانيتين وتتحول من مديرة تنفيذية إلى فنزوز قادر على الطيران بسرعة: تشوووووو.",
    descEn:
      "Thuraya is the village's full executive office: organizer, teacher, translator, and crisis manager. Strong and composed... until a lizard appears, and then the CEO becomes a flying panic rocket.",
    messageAr: "القوة ليست غياب الخوف، بل العودة للتماسك بعده.",
    messageEn: "Strength is not the absence of fear; it is recovering after it.",
  },
  {
    id: "zahran",
    imageCandidates: [
      `${IMAGE_BASE}/zahran-name+background.png`,
      `${IMAGE_BASE}/Zahran-name+background.png`,
    ],
    descAr:
      "زهران هو الشايب الذي إذا سألته سؤالًا أعطاك تاريخ القرية من سنة التأسيس. يهرف كثيرًا، لكن عنده أرشيف حي يمشي على قدمين.",
    descEn:
      "Zahran is the elder who can turn one question into a full village documentary. He talks a lot, but he is basically a walking archive.",
    messageAr: "بعض الناس قصصهم أطول من الطرق نفسها.",
    messageEn: "Some people carry stories longer than the roads themselves.",
  },
];

function mergeSources(candidates: string[]) {
  const unique = new Set<string>([...candidates, PLACEHOLDER_IMAGE]);
  return [...unique];
}

function SmartImage({
  sources,
  alt,
}: {
  sources: string[];
  alt: string;
}) {
  const allSources = useMemo(() => mergeSources(sources), [sources]);
  const [index, setIndex] = useState(0);

  const currentSrc = allSources[index] ?? PLACEHOLDER_IMAGE;

  const handleError = () => {
    setIndex((prev) => {
      if (prev < allSources.length - 1) return prev + 1;
      return prev;
    });
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className="character-image"
      loading="lazy"
    />
  );
}

function CharacterCard({
  item,
  language,
  onToggle,
}: {
  item: CharacterItem;
  language: Language;
  onToggle: () => void;
}) {
  const isArabic = language === "ar";

  const desc = isArabic
    ? item.descAr || placeholderAr
    : item.descEn || placeholderEn;

  const message = isArabic
    ? item.messageAr || placeholderMessageAr
    : item.messageEn || placeholderMessageEn;

  return (
    <article className="character-card" dir={isArabic ? "rtl" : "ltr"}>
      <div className="image-arch">
        <SmartImage sources={item.imageCandidates} alt={item.id} />
      </div>

      <button
        type="button"
        className={`text-card ${isArabic ? "arabic" : "english"}`}
        onClick={onToggle}
        aria-label={`Toggle ${item.id} card language`}
      >
        <div className="lang-pill">{isArabic ? "AR" : "EN"}</div>

        <div className="text-card-body">
          <p className="character-description">{desc}</p>
          <div className="message-box">
            <span className="message-label">
              {isArabic ? "رسالة الشخصية" : "Character message"}
            </span>
            <p className="character-message">{message}</p>
          </div>
          <span className="tap-hint">
            {isArabic
              ? "اضغطي للتبديل إلى الإنجليزية"
              : "Tap to switch to Arabic"}
          </span>
        </div>
      </button>
    </article>
  );
}

export default function CharactersSection() {
  const initialState = Object.fromEntries(
    characters.map((item) => [item.id, "ar"])
  ) as Record<string, Language>;

  const [cardLanguage, setCardLanguage] =
    useState<Record<string, Language>>(initialState);

  const toggleLanguage = (id: string) => {
    setCardLanguage((prev) => ({
      ...prev,
      [id]: prev[id] === "ar" ? "en" : "ar",
    }));
  };

  return (
    <section className="characters-section" aria-labelledby="characters-title">
      <div className="section-head">
        <h2 id="characters-title">Characters</h2>
        <p>
          Semi-circle image cards with bilingual toggle text. Missing assets use
          placeholders automatically.
        </p>
      </div>

      <div className="characters-grid">
        {characters.map((item) => (
          <CharacterCard
            key={item.id}
            item={item}
            language={cardLanguage[item.id]}
            onToggle={() => toggleLanguage(item.id)}
          />
        ))}
      </div>

      <style jsx>{`
        .characters-section {
          width: 100%;
          padding: 48px 20px 72px;
          background: radial-gradient(
              circle at top,
              rgba(240, 232, 220, 0.24),
              transparent 30%
            ),
            linear-gradient(180deg, #f8f1e7 0%, #f2e7d8 100%);
        }

        .section-head {
          max-width: 980px;
          margin: 0 auto 28px;
          text-align: center;
        }

        .section-head h2 {
          margin: 0 0 10px;
          font-size: clamp(1.8rem, 2vw, 2.4rem);
          color: #2b251f;
        }

        .section-head p {
          margin: 0;
          color: #6c6258;
          font-size: 0.98rem;
        }

        .characters-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px 24px;
          align-items: start;
        }

        .character-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .image-arch {
          position: relative;
          overflow: hidden;
          border-radius: 999px 999px 28px 28px;
          background: #d9cfbe;
          box-shadow: 0 18px 40px rgba(48, 37, 24, 0.12),
            inset 0 0 0 1px rgba(99, 80, 58, 0.12);
          aspect-ratio: 1 / 1.08;
        }

        .character-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center top;
        }

        .text-card {
          position: relative;
          width: 100%;
          border: none;
          border-radius: 22px;
          padding: 18px 18px 16px;
          text-align: start;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            background 0.2s ease;
          box-shadow: 0 16px 30px rgba(50, 34, 18, 0.12);
          min-height: 220px;
        }

        .text-card:hover {
          transform: translateY(-4px);
        }

        .text-card.arabic {
          background: linear-gradient(180deg, #fff6ea 0%, #f7ead7 100%);
          color: #4c3622;
          border: 1px solid rgba(166, 119, 55, 0.2);
        }

        .text-card.english {
          background: linear-gradient(180deg, #eef6ff 0%, #ddeeff 100%);
          color: #223b56;
          border: 1px solid rgba(73, 115, 168, 0.18);
        }

        .lang-pill {
          position: absolute;
          top: 12px;
          inset-inline-end: 12px;
          min-width: 44px;
          height: 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
        }

        .text-card-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 18px;
        }

        .character-description {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.8;
          font-weight: 600;
        }

        .message-box {
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.52);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .message-label {
          display: block;
          font-size: 0.77rem;
          font-weight: 800;
          margin-bottom: 6px;
          opacity: 0.78;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .character-message {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.7;
          font-weight: 600;
        }

        .tap-hint {
          display: inline-block;
          margin-top: auto;
          font-size: 0.8rem;
          opacity: 0.75;
          font-weight: 700;
        }

        @media (max-width: 640px) {
          .characters-section {
            padding-inline: 14px;
          }

          .characters-grid {
            grid-template-columns: 1fr;
          }

          .text-card {
            min-height: 200px;
          }
        }
      `}</style>
    </section>
  );
}
