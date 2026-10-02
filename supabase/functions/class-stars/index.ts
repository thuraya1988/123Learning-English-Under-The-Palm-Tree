// Backend for the class-stars tracker. Public users can read; teacher writes
// require the shared PIN whose SHA-256 hash is stored in class_stars_config.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: cors });
const clean = (value: unknown, max = 200) => String(value ?? "").trim().slice(0, max);

const ROSTER: Record<string, string[]> = {"5/1":["أريام بنت خليل بن محمد صالح العامرية","إسراء بنت يوسف بن سالم خميس النبهانية","أسماء بنت خالد بن خلفان سعيد العامرية","أسيل بنت إدريس بن سليمان سالم السيابية","أفنان بنت أحمد بن محمود خميس الهنائية","ألمى بنت سليمان بن محمد سليمان الحضرمية","أمنية بنت خميس بن مبيوع مبارك القطيطية","أميمة بنت عمر بن خميس سعيد النبهانية","إيمان بنت سليمان بن سالم صالح السليمية","اطياف بنت بدر بن حبيب حميد الريامية","المزن بنت نبيل بن عواد سويد الجابرية","تسنيم بنت محمود بن محمد حمود الرواحية","جود عاصم الصادق محمد احمد","حور بنت محمد بن سالم علي الراشدية","حور بنت نصر بن ناصر سعيد الرحبية","خاشعة بنت سليمان بن محمد عبدالله الطيوانية","خديجة بنت اسعد بن حمود حمدان القاسمية","خديجة بنت عبدالله بن حمد عبدالله الحضرمية","رؤيا بنت هلال بن عيسى شيخان الشامسية","رزن بنت سالم بن يعقوب سالم الراشدية","رغد بنت قاسم بن سليمان شابط السليمية","ريان بنت رشيد بن خلفان راشد العميرية","سبأ بنت طلال بن محمد صالح البوشرية","شهد بنت يحيى بن خلفان سعود المنذرية","ضياء بنت ابراهيم بن ربيع محمد الحضرمية","عزيزة بنت محمد بن ناصر عبدالله العامرية","عهد بنت ياسر بن سعيد سلام الحضرمية","فاطمة بنت عبدالله بن محمد سليمان الربيعية","مريم بنت عيسى بن محمد هلال الرواحية","مريم بنت ماجد بن ناصر سليمان الحراصية","مياسه بنت محمد بن خلفان سعود المنذرية","ندى بنت محمد بن خميس ناصر الجابرية","نورهان محمد رمضان احمد","هاجر بنت سعيد بن أحمد محمد الرواحية","وصايف بنت حمود بن سليمان حمود المحرزية"],"5/2":["أسماء بنت بدر بن سيف خلفان الدرعية","آية بنت نصر بن سالم شنون الجابرية","آيه بنت منذر بن يحيى سالم الهنائية","بيلسان بنت ماجد بن يعقوب سالم الجابرية","جنى بنت جمال بن عواد سويد الجابرية","جود بنت عبدالله بن ناصر سالم الغافرية","جود بنت محمد بن حمود سيف الحضرمية","جود بنت محمد بن سليمان سعود العامرية","حور بنت صالح بن محمد صالح البوشرية","رتيل بنت علي بن حمدان محمد البرومية","ريان بنت وليد بن سعيد عبدالله الرواحية","ريفال بنت محمد بن خميس حمد الدغيشية","زينب بنت يوسف بن عبدالله سيف الرواحية","سما بنت أشرف بن محمد خلفان المحاربية","شموخ بنت محمد بن سعيد حمد الشامسية","شيم بنت قيس بن محمد علي العامرية","شيم بنت يحيى بن حميد سليمان الحضرمية","عائشة بنت خميس بن مبارك سعيد العامرية","عائشة بنت محمود بن سالم سليمان الرواحية","عزاء بنت عبدالله بن محمد حمود الرواحية","علياء بنت عبدالله بن سعيد خلفان النبهانية","غدق عبدالرحيم الزبير الصديق","فاطمة بنت سالم بن يعقوب سالم الجابرية","فاطمة بنت عبدالله بن محمد علي الربيعي","فداء بنت احمد بن سعيد عبدالله الأزكوية","فرح بنت ماجد بن سيف عبدالله الرواحية","في بنت عبدالعزيز بن سعيد علي الجابري","ليان بنت محمد بن سعيد سالم الكندية","مريم بنت سليمان بن خميس محمد الرواحية","مريم بنت سيف بن سعيد سيف السيابية","مها بنت سليمان بن فرج خميس الخليلية","ميرة بنت حمد بن محمد سعيد المسعودية","نعيمه بنت أيمن بن عبدالله محمد الربيعية","هالة بنت هزاع بن زائد توفيق الهنائية"],"5/3":["أرين بنت عمر بن سعيد ثني السيابية","أساور بنت حاتم بن أحمد صالح الطائية","ألين بنت يحيى بن يعقوب مبروك الهنائية","أمامة بنت حاتم بن يحيى يوسف الرواحية","آية بنت عبدالله بن محمد علي الجابرية","المُزن بنت مازن بن منصور سلام الهنائية","بيان بنت سعيد بن محمد سعيد الحضرمية","بيلسان بنت وحيد بن خميس عبيد الرواحية","جود بنت محمد بن ياسر سعيد الشكيلية","حنين بنت حسين بن خليفه مبروك الهنائية","حور بنت حاتم بن خلفان سالم الحضرمية","خديجة بنت سلطان بن محمد سلطان الرواحية","رحمة بنت أحمد بن سعيد سليمان الرواحية","رسيل بنت خميس بن خصيف شبط الرمضانية","رفيدة بنت موسى بن قسور منصور العامرية","رواء بنت حمود بن ناصر سعيد الرحبية","ريم بنت سلطان بن مسلم سالم القصابية","ريم بنت علي بن خلفان علي الرواحية","زينب بنت محمد بن هديب وتين المحرزية","شمس بنت ناصر بن سالم عزان الصارمية","عزة بنت محمد بن ناصر سالم السيابية","عزيزة بنت احمد بن سعيد جمعه الغطريفية","غزل بنت سالم بن عيد سالم الهاشمية","فاطمة بنت بدر بن خميس سالم الرواحية","فداء بنت فهد بن خميس حميد السليمية","فرح بنت أحمد بن يوسف سيف العامرية","فرح بنت سيف بن سالم خميس السيابية","فرح بنت عبدالله بن يحيى عبدالله الحارثية","مرام محمد عبدالسميع محمد عليوه","مريم بنت عزيز بن مبارك خميس الهنائية","مريم بنت مصطفى بن أحمد محمد الغطريفية","مناسك بنت خالد بن خليفه خميس السعدية","نور بنت غصن بن حارب سيف الجابرية","هاجر بنت هيثم بن خلفان محمد الجابرية","هديل بنت طلال بن يعقوب سعيد الجابرية"]};

const POSITIVE_REASONS: Record<string, { label: string; kind: "star" | "cup" }> = {
  order: { label: "النظام", kind: "star" },
  english: { label: "التحدث باللغة الإنجليزية", kind: "star" },
  cooperation: { label: "التعاون", kind: "star" },
  active_participation: { label: "المشاركة الفاعلة", kind: "star" },
  cleanliness: { label: "النظافة العامة", kind: "star" },
  hard_question_cup: { label: "الإجابة عن سؤال صعب", kind: "cup" },
  correct_answer: { label: "الإجابة الصحيحة", kind: "star" },
  calm: { label: "الهدوء", kind: "star" },
  group_star: { label: "نجمة المجموعة", kind: "star" },
};

const LOSS_REASONS: Record<string, string> = {
  arabic_speaking: "التحدث باللغة العربية",
  disorder: "عدم النظام",
  unclean: "عدم النظافة",
  noise: "الإزعاج",
  broke_rule: "كسر قانون المعلمة في الصف",
  chatting: "الانشغال بالحديث مع الزميلات",
  incorrect_answer: "عدم معرفة الإجابة الصحيحة",
};

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function requirePin(body: any, db: any): Promise<boolean> {
  const pin = clean(body.pin, 20);
  if (!pin) return false;
  const { data, error } = await db.from("class_stars_config")
    .select("pin_hash").eq("singleton", true).maybeSingle();
  return !error && !!data?.pin_hash && (await sha256(pin)) === data.pin_hash;
}

function validGroup(cls: string, groupNo: number): boolean {
  return !!ROSTER[cls] && Number.isInteger(groupNo) && groupNo >= 1 && groupNo <= 6;
}

function selectedNames(cls: string, value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(ROSTER[cls] || []);
  return [...new Set(value.map((item) => clean(item, 200)).filter((name) => allowed.has(name)))].slice(0, 40);
}

async function publicGroupState(db: any) {
  const [groupsResult, membersResult, eventsResult, legacyResult] = await Promise.all([
    db.from("class_stars_groups").select("cls,group_no,group_name").order("cls").order("group_no"),
    db.from("class_stars_group_members").select("cls,group_no,student_name").order("student_name"),
    db.from("class_stars_group_events")
      .select("id,cls,group_no,event_kind,reason_key,reason_label,points,selected_students,note,created_at")
      .order("created_at", { ascending: false }).limit(5000),
    db.from("class_stars_students").select("cls,name,stars,losses"),
  ]);
  const error = groupsResult.error || membersResult.error || eventsResult.error || legacyResult.error;
  if (error) throw error;
  return {
    groups: groupsResult.data || [],
    members: membersResult.data || [],
    events: eventsResult.data || [],
    legacy: legacyResult.data || [],
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: any = {};
  try { body = await req.json(); }
  catch { return json({ ok: false, error: "invalid_json" }, 400); }

  const db = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
  const action = clean(body.action, 40);

  // Legacy read endpoint retained so cached older pages continue to work.
  if (action === "list") {
    const { data, error } = await db.from("class_stars_students").select("cls,name,stars,losses");
    if (error) return json({ ok: false, error: "read_failed" }, 500);
    return json({ ok: true, items: data || [] });
  }

  if (action === "groups") {
    try { return json({ ok: true, ...(await publicGroupState(db)) }); }
    catch { return json({ ok: false, error: "read_failed" }, 500); }
  }

  if (!(await requirePin(body, db))) return json({ ok: false, error: "forbidden" }, 403);
  if (action === "verify") return json({ ok: true });

  if (action === "add_event") {
    const cls = clean(body.cls, 20);
    const groupNo = Number(body.group_no);
    const reasonKey = clean(body.reason_key, 60);
    if (!validGroup(cls, groupNo)) return json({ ok: false, error: "invalid_group" }, 400);

    let eventKind: "star" | "cup" | "loss";
    let reasonLabel: string;
    let points: 1 | -1;
    if (POSITIVE_REASONS[reasonKey]) {
      eventKind = POSITIVE_REASONS[reasonKey].kind;
      reasonLabel = POSITIVE_REASONS[reasonKey].label;
      points = 1;
    } else if (LOSS_REASONS[reasonKey]) {
      eventKind = "loss";
      reasonLabel = LOSS_REASONS[reasonKey];
      points = -1;
    } else {
      return json({ ok: false, error: "invalid_reason" }, 400);
    }

    const selected = selectedNames(cls, body.selected_students);
    const { data: groupMembers, error: memberError } = await db.from("class_stars_group_members")
      .select("student_name").eq("cls", cls).eq("group_no", groupNo);
    if (memberError) return json({ ok: false, error: "read_failed" }, 500);
    const memberNames = new Set((groupMembers || []).map((row: any) => row.student_name));
    if (selected.some((name) => !memberNames.has(name))) {
      return json({ ok: false, error: "student_not_in_group" }, 400);
    }
    if (memberNames.size > 0 && (eventKind === "loss" || reasonKey === "group_star") && selected.length === 0) {
      return json({ ok: false, error: "students_required" }, 400);
    }

    const { data, error } = await db.from("class_stars_group_events").insert({
      cls,
      group_no: groupNo,
      event_kind: eventKind,
      reason_key: reasonKey,
      reason_label: reasonLabel,
      points,
      selected_students: selected,
      note: clean(body.note, 500),
    }).select("id").single();
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true, id: data.id });
  }

  if (action === "undo_event") {
    const cls = clean(body.cls, 20);
    const groupNo = Number(body.group_no);
    const eventId = Number(body.event_id);
    if (!validGroup(cls, groupNo) || !Number.isInteger(eventId)) {
      return json({ ok: false, error: "invalid_input" }, 400);
    }
    const { error } = await db.from("class_stars_group_events")
      .delete().eq("id", eventId).eq("cls", cls).eq("group_no", groupNo);
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true });
  }

  if (action === "reset_group" || action === "reset_class") {
    const cls = clean(body.cls, 20);
    const groupNo = Number(body.group_no);
    if (!ROSTER[cls] || (action === "reset_group" && !validGroup(cls, groupNo))) {
      return json({ ok: false, error: "invalid_input" }, 400);
    }
    let query = db.from("class_stars_group_events").delete().eq("cls", cls);
    if (action === "reset_group") query = query.eq("group_no", groupNo);
    const { error } = await query;
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true });
  }

  if (action === "rename_group") {
    const cls = clean(body.cls, 20);
    const groupNo = Number(body.group_no);
    const groupName = clean(body.group_name, 60);
    if (!validGroup(cls, groupNo) || !groupName) return json({ ok: false, error: "invalid_input" }, 400);
    const { error } = await db.from("class_stars_groups")
      .update({ group_name: groupName, updated_at: new Date().toISOString() })
      .eq("cls", cls).eq("group_no", groupNo);
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true });
  }

  if (action === "set_members") {
    const cls = clean(body.cls, 20);
    const groupNo = Number(body.group_no);
    if (!validGroup(cls, groupNo)) return json({ ok: false, error: "invalid_group" }, 400);
    const members = selectedNames(cls, body.members);
    const { error: deleteError } = await db.from("class_stars_group_members")
      .delete().eq("cls", cls).eq("group_no", groupNo);
    if (deleteError) return json({ ok: false, error: "save_failed" }, 500);
    if (members.length) {
      const { error: insertError } = await db.from("class_stars_group_members")
        .insert(members.map((student_name) => ({ cls, group_no: groupNo, student_name })));
      if (insertError) return json({ ok: false, error: "save_failed" }, 500);
    }
    return json({ ok: true, count: members.length });
  }

  // Legacy writes retained to protect existing individual data and cached pages.
  if (action === "save") {
    const cls = clean(body.cls, 20), name = clean(body.name, 200);
    if (!ROSTER[cls] || !ROSTER[cls].includes(name)) return json({ ok: false, error: "invalid_input" }, 400);
    const stars = Array.isArray(body.stars) ? body.stars.map((x: unknown) => clean(x, 40)).slice(0, 2000) : [];
    const losses = Array.isArray(body.losses) ? body.losses.map((x: unknown) => clean(x, 40)).slice(0, 2000) : [];
    const { error } = await db.from("class_stars_students").upsert(
      { cls, name, stars, losses, updated_at: new Date().toISOString() },
      { onConflict: "cls,name" },
    );
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true });
  }

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
    const { error } = await db.from("class_stars_students").upsert(items, { onConflict: "cls,name" });
    if (error) return json({ ok: false, error: "save_failed" }, 500);
    return json({ ok: true, imported: items.length });
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
