// Public backend for the "نجوم الفصل" (class stars) tracker at
// miss-thuraya/stars/index.html. Anyone can list results (so parents can
// open the page and see live counts); adding, undoing, or resetting stars
// requires the shared teacher PIN. Only its SHA-256 hash is stored in
// class_stars_config; the plaintext PIN is never shipped in the public page.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type", "Access-Control-Allow-Methods": "POST,OPTIONS", "Content-Type": "application/json; charset=utf-8" };
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: cors });
const clean = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);

// Kept in sync with the ROSTER constant in miss-thuraya/stars/index.html —
// only these (class, name) pairs may be written.
const ROSTER: Record<string, string[]> = {"5/1": ["أريام بنت خليل بن محمد صالح العامرية", "إسراء بنت يوسف بن سالم خميس النبهانية", "أسماء بنت خالد بن خلفان سعيد العامرية", "أسيل بنت إدريس بن سليمان سالم السيابية", "أفنان بنت أحمد بن محمود خميس الهنائية", "ألمى بنت سليمان بن محمد سليمان الحضرمية", "أمنية بنت خميس بن مبيوع مبارك القطيطية", "أميمة بنت عمر بن خميس سعيد النبهانية", "إيمان بنت سليمان بن سالم صالح السليمية", "اطياف بنت بدر بن حبيب حميد الريامية", "المزن بنت نبيل بن عواد سويد الجابرية", "تسنيم بنت محمود بن محمد حمود الرواحية", "جود عاصم الصادق محمد احمد", "حور بنت محمد بن سالم علي الراشدية", "حور بنت نصر بن ناصر سعيد الرحبية", "خاشعة بنت سليمان بن محمد عبدالله الطيوانية", "خديجة بنت اسعد بن حمود حمدان القاسمية", "خديجة بنت عبدالله بن حمد عبدالله الحضرمية", "رؤيا بنت هلال بن عيسى شيخان الشامسية", "رزن بنت سالم بن يعقوب سالم الراشدية", "رغد بنت قاسم بن سليمان شابط السليمية", "ريان بنت رشيد بن خلفان راشد العميرية", "سبأ بنت طلال بن محمد صالح البوشرية", "شهد بنت يحيى بن خلفان سعود المنذرية", "ضياء بنت ابراهيم بن ربيع محمد الحضرمية", "عزيزة بنت محمد بن ناصر عبدالله العامرية", "عهد بنت ياسر بن سعيد سلام الحضرمية", "فاطمة بنت عبدالله بن محمد سليمان الربيعية", "مريم بنت حمد بن سالم فايل المسكرية", "مريم بنت عيسى بن محمد هلال الرواحية", "مريم بنت ماجد بن ناصر سليمان الحراصية", "مياسه بنت محمد بن خلفان سعود المنذرية", "ندى بنت محمد بن خميس ناصر الجابرية", "نورهان محمد رمضان احمد", "هاجر بنت سعيد بن أحمد محمد الرواحية"], "5/2": ["أسماء بنت بدر بن سيف خلفان الدرعية", "آية بنت نصر بن سالم شنون الجابرية", "آيه بنت منذر بن يحيى سالم الهنائية", "بيلسان بنت ماجد بن يعقوب سالم الجابرية", "جنى بنت جمال بن عواد سويد الجابرية", "جود بنت عبدالله بن ناصر سالم الغافرية", "جود بنت محمد بن حمود سيف الحضرمية", "جود بنت محمد بن سليمان سعود العامرية", "حور بنت صالح بن محمد صالح البوشرية", "رتيل بنت علي بن حمدان محمد البرومية", "ريان بنت وليد بن سعيد عبدالله الرواحية", "ريفال بنت محمد بن خميس حمد الدغيشية", "زينب بنت يوسف بن عبدالله سيف الرواحية", "سما بنت أشرف بن محمد خلفان المحاربية", "شموخ بنت محمد بن سعيد حمد الشامسية", "شيم بنت قيس بن محمد علي العامرية", "شيم بنت يحيى بن حميد سليمان الحضرمية", "عائشة بنت خميس بن مبارك سعيد العامرية", "عائشة بنت محمود بن سالم سليمان الرواحية", "عزاء بنت عبدالله بن محمد حمود الرواحية", "علياء بنت عبدالله بن سعيد خلفان النبهانية", "غدق عبدالرحيم الزبير الصديق", "فاطمة بنت عبدالله بن محمد علي الربيعي", "فداء بنت احمد بن سعيد عبدالله الزكوية", "فرح بنت صالح بن علي حمد الراشدية", "فرح بنت ماجد بن سيف عبدالله الرواحية", "في بنت عبدالعزيز بن سعيد علي الجابري", "ليان بنت محمد بن سعيد سالم الكندية", "مريم بنت سليمان بن خميس محمد الرواحية", "مريم بنت سيف بن سعيد سيف السيابية", "مها بنت سليمان بن فرج خميس الخليلية", "ميرة بنت حمد بن محمد سعيد المسعودية", "نعيمه بنت أيمن بن عبدالله محمد الربيعية", "هالة بنت هزاع بن زائد توفيق الهنائية", "هناء بنت سيف بن سالم حمود الهنائية"], "5/3": ["أرين بنت عمر بن سعيد ثني السيابية", "أساور بنت حاتم بن أحمد صالح الطائية", "ألين بنت يحيى بن يعقوب مبروك الهنائية", "أمامة بنت حاتم بن يحيى يوسف الرواحية", "آية بنت عبدالله بن محمد علي الجابرية", "المزن بنت مازن بن منصور سلام الهنائية", "بيان بنت سعيد بن محمد سعيد الحضرمية", "بيلسان بنت وحيد بن خميس عبيد الرواحية", "جود بنت محمد بن ياسر سعيد الشكيلية", "حنين بنت حسين بن خليفه مبروك الهنائية", "حور بنت حاتم بن خلفان سالم الحضرمية", "خديجة بنت سلطان بن محمد سلطان الرواحية", "رحمة بنت أحمد بن سعيد سليمان الرواحية", "رسيل بنت خميس بن خصيف شبط الرمضانية", "رفيدة بنت موسى بن قسور منصور العامرية", "رواء بنت حمود بن ناصر سعيد الرحبية", "ريم بنت سلطان بن مسلم سالم القصابية", "ريم بنت علي بن خلفان علي الرواحية", "زينب بنت محمد بن هديب وتين المحرزية", "شمس بنت ناصر بن سالم عزان الصارمية", "عزيزة بنت احمد بن سعيد جمعه الغطريفية", "غزل بنت سالم بن عيد سالم الهاشمية", "فاطمة بنت بدر بن خميس سالم الرواحية", "فداء بنت فهد بن خميس حميد السليمية", "فرح بنت أحمد بن يوسف سيف العامرية", "فرح بنت سيف بن سالم خميس السيابية", "فرح بنت عبدالله بن يحيى عبدالله الحارثية", "مرام محمد عبدالسميع محمد عليوه", "مريم بنت عزيز بن مبارك خميس الهنائية", "مريم بنت مصطفى بن أحمد محمد الغطريفية", "مناسك بنت خالد بن خليفه خميس السعدية", "نور بنت غصن بن حارب سيف الجابرية", "هاجر بنت هيثم بن خلفان محمد الجابرية", "هديل بنت طلال بن يعقوب سعيد الجابرية", "وجد بنت عبدالله بن موسى يوسف العامرية"]};

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function requirePin(body: any, db: any): Promise<boolean> {
  const pin = clean(body.pin, 20);
  if (!pin) return false;
  const { data, error } = await db.from("class_stars_config")
    .select("pin_hash")
    .eq("singleton", true)
    .maybeSingle();
  return !error && !!data?.pin_hash && (await sha256(pin)) === data.pin_hash;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);
  let body: any = {};
  try { body = await req.json(); } catch { return json({ ok: false, error: "invalid_json" }, 400); }
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const action = clean(body.action, 30);

  if (action === "list") {
    const { data, error } = await db.from("class_stars_students").select("cls,name,stars,losses");
    if (error) return json({ ok: false, error: "read_failed" }, 500);
    return json({ ok: true, items: data || [] });
  }

  if (!(await requirePin(body, db))) return json({ ok: false, error: "forbidden" }, 403);

  if (action === "verify") return json({ ok: true });

  if (action === "import") {
    const source = Array.isArray(body.items) ? body.items.slice(0, 120) : [];
    const items = source.flatMap((item: any) => {
      const cls = clean(item?.cls, 20), name = clean(item?.name, 200);
      if (!ROSTER[cls] || !ROSTER[cls].includes(name)) return [];
      const stars = Array.isArray(item?.stars) ? item.stars.map((x: unknown) => clean(x, 40)).slice(0, 2000) : [];
      const losses = Array.isArray(item?.losses) ? item.losses.map((x: unknown) => clean(x, 40)).slice(0, 2000) : [];
      return [{ cls, name, stars, losses, updated_at: new Date().toISOString() }];
    });
    if (!items.length) return json({ ok: true, imported: 0 });
    const { error } = await db.from("class_stars_students")
      .upsert(items, { onConflict: "cls,name" });
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true, imported: items.length });
  }

  if (action === "save") {
    const cls = clean(body.cls, 20), name = clean(body.name, 200);
    if (!ROSTER[cls] || !ROSTER[cls].includes(name)) return json({ ok: false, error: "invalid_input" }, 400);
    const stars = Array.isArray(body.stars) ? body.stars.map((x: unknown) => clean(x, 40)).slice(0, 2000) : [];
    const losses = Array.isArray(body.losses) ? body.losses.map((x: unknown) => clean(x, 40)).slice(0, 2000) : [];
    const { error } = await db.from("class_stars_students")
      .upsert({ cls, name, stars, losses, updated_at: new Date().toISOString() }, { onConflict: "cls,name" });
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true });
  }

  if (action === "reset") {
    const cls = clean(body.cls, 20);
    if (!ROSTER[cls]) return json({ ok: false, error: "invalid_input" }, 400);
    const { error } = await db.from("class_stars_students").delete().eq("cls", cls);
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true });
  }

  return json({ ok: false, error: "unknown_action" }, 400);
});
