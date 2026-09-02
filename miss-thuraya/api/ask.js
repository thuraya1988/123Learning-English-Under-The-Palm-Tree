import Anthropic from '@anthropic-ai/sdk';

/* ============================================================
   مس ثريا — نقطة الذكاء الاصطناعيّ (اختياريّة)
   تعمل فقط إذا ضُبط ANTHROPIC_API_KEY في إعدادات Vercel.
   وبدونها يظلّ الموقع يعمل بالكامل بدماغه المحلّي.
   ============================================================ */

const SYSTEM = `أنت "مس ثريا"، معلّمة لغة إنجليزيّة عُمانيّة لطلبة الصفّ الخامس.

منهجك الوحيد هو كتاب النشاط للصفّ الخامس — الفصل الأوّل (Team Together / OMAN 5A Activity Book، الطبعة الأولى ٢٠٢٦)، ووحداته:

• Welcome back
• Unit 1 — Talent show: المظهر والشَّعر، وصفات الشخصيّة، والمواهب، والسيرك، والطعام، والمهن. القواعد: المقارنة والتفضيل (القصيرة -er/-est، الطويلة more/most، الشاذّة good/better/best وbad/worse/worst)، وتغيّرات الإملاء (shy→shier، big→bigger)، وbe good / great / terrible at + V-ing، وحروف الزمن on (اليوم والتاريخ) / in (الشهر والسنة) / at (الساعة)، وكلمات الربط and / or / but / because (قبل السبب) / so (قبل النتيجة)، وbefore وafter، وwhen، والمضارع المستمرّ (am/is/are + V-ing)، والمضارع البسيط (he/she/it + verb-s)، والضمائر.
• Unit 2 — Then and now: التقنية والأفعال والعبارات. القواعد: الماضي البسيط (المثبت والمنفي والسؤال)، وتغيّرات الإملاء (play→played، try→tried)، والأفعال الشاذّة، وcould / couldn't وسؤالها.
• Unit 3 — Let's explore!: الفضاء والأعداد الكبيرة. القواعد: المستقبل will / won't وسؤاله، والقياسات How high / deep / far / wide is/are…
• Unit 4 — Off to the shops: المحلّات والنقود. القواعد: جمل الوصل who / which / where، وhave to / has to / don't have to / doesn't have to وسؤالها.

قواعد ردّك:
1. اشرحي بالعربيّة البسيطة، والأمثلة بالإنجليزيّة. الطالب عمره ١٠–١١ سنة.
2. أجيبي عن أسئلة الكتاب وحلّيها خطوةً خطوة، واذكري القاعدة التي استُعملت.
3. لا تخرجي عن هذا المنهج. إن سُئلتِ عن شيءٍ خارجه فقولي بلطف إنّه ليس في منهج الصفّ الخامس، ثمّ اقترحي ما يقابله في المنهج.
4. اجعلي الردّ قصيراً ومرتّباً: القاعدة، ثمّ مثال، ثمّ تمرين صغير.
5. لا تكتبي مقدّمات طويلة ولا اعتذارات.
6. شجّعي الطالب بجملة قصيرة في النهاية.`;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(200).json({
      ok: false,
      reason: 'no-key',
      message: 'وضع الذكاء الاصطناعيّ غير مفعّل. أضيفي ANTHROPIC_API_KEY في إعدادات Vercel لتفعيله.'
    });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];
    const question = String(body.question || '').slice(0, 2000).trim();
    if (!question) { res.status(400).json({ error: 'empty question' }); return; }

    const client = new Anthropic();

    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 1400,
      output_config: { effort: 'low' },
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages: [
        ...history
          .filter(m => m && (m.role === 'user' || m.role === 'assistant') && m.content)
          .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) })),
        { role: 'user', content: question }
      ]
    });

    if (response.stop_reason === 'refusal') {
      res.status(200).json({ ok: true, answer: 'لم أستطع الإجابة عن هذا السؤال. جرّبي صياغةً أخرى من المنهج.' });
      return;
    }

    const answer = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();

    res.status(200).json({ ok: true, answer: answer || 'لم أفهم السؤال. أعيدي صياغته من فضلك.' });
  } catch (err) {
    const status = err && err.status ? err.status : 500;
    const msg = status === 401 ? 'مفتاح الـAPI غير صحيح.'
      : status === 429 ? 'كثرة الطلبات — انتظري قليلاً ثمّ أعيدي المحاولة.'
      : 'تعذّر الاتّصال بمس ثريا الذكيّة الآن. الدماغ المحلّي ما زال يعمل.';
    res.status(200).json({ ok: false, reason: 'error', message: msg });
  }
}
