"""
gen_listening_h5p.py
Generates 7 H5P Listening Activity files for "Under The Palm Tree"
Stage 1 – Who's Speaking?        (QuestionSet + MultiChoice + audio)
Stage 2 – Hear the Definition    (QuestionSet + MultiChoice + audio)
Stage 3 – Dictation              (H5P.Dictation  + audio)
Stage 4 – Story Comprehension    (QuestionSet + MultiChoice + audio)
Stage 5 – True or False          (QuestionSet + TrueFalse   + audio)
Stage 6 – Complete the Sentence  (QuestionSet + MultiChoice + audio)
Stage 7 – Final Quiz             (QuestionSet + mixed       + audio)  → also SCORM zip
"""

import subprocess, zipfile, json, io, os, base64, shutil, uuid, sys

BASE   = r"C:\Users\someo\Downloads\project_stuff"
PIPER  = os.path.join(BASE, "piper", "piper.exe")
VOICES = {
    "ryan"  : os.path.join(BASE, "piper", "en_US-ryan-medium.onnx"),
    "alan"  : os.path.join(BASE, "piper", "en_GB-alan-low.onnx"),
    "amy"   : os.path.join(BASE, "piper", "en_US-amy-medium.onnx"),
    "lessac": os.path.join(BASE, "piper", "en_US-lessac-medium (1).onnx"),
    "danny" : os.path.join(BASE, "piper", "en_US-danny-low.onnx"),
}
TMP = os.path.join(BASE, "listen_tmp")
OUT = os.path.join(BASE, "H5P_LISTENING")
os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

# ── helpers ──────────────────────────────────────────────────────────────────
def log(msg):
    sys.stdout.buffer.write((msg + "\n").encode("utf-8"))

def tts(text, wav_path, voice="ryan"):
    model = VOICES.get(voice, VOICES["ryan"])
    try:
        r = subprocess.run(
            [PIPER, "--model", model, "--output_file", wav_path],
            input=text, capture_output=True, text=True, timeout=30
        )
        return os.path.exists(wav_path) and os.path.getsize(wav_path) > 0
    except Exception as e:
        log(f"  TTS error ({voice}): {e}")
        return False

def wav_bytes(wav_path):
    with open(wav_path, "rb") as f:
        return f.read()

def new_id():
    return str(uuid.uuid4())

def audio_source(rel_path):
    """H5P audio source object for a relative content/audios/ path."""
    return {"path": rel_path, "mime": "audio/wav",
            "copyright": {"license": "U", "author": "", "year": "", "source": "", "title": ""},
            "width": 0, "height": 0}

def audio_media(rel_path):
    """H5P.Audio 1.5 media block for embedding in MultiChoice questions."""
    return {
        "type": {
            "library": "H5P.Audio 1.5",
            "params": {
                "sources": [audio_source(rel_path)],
                "controls": True,
                "autoplay": True,
                "fitToWrapper": False,
                "playerMode": "minimalistic",
                "audioNotSupported": "Your browser does not support this audio."
            },
            "subContentId": new_id(),
            "metadata": {"contentType": "Audio", "license": "U", "title": ""}
        },
        "disableImageZooming": False
    }

def mc_question(qtext, answers, audio_rel=None, qid=None):
    """Build an H5P.MultiChoice 1.16 question block."""
    params = {
        "question": f"<p>{qtext}</p>",
        "answers": [
            {"correct": a.get("correct", False),
             "text": a["text"],
             "tipsAndFeedback": {"tip": "", "chosenFeedback": a.get("fb",""), "notChosenFeedback": ""}}
            for a in answers
        ],
        "behaviour": {"enableRetry": True, "enableSolutionsButton": True,
                      "singlePoint": False, "randomAnswers": True},
        "UI": {"checkAnswerButton": "Check", "submitAnswerButton": "Submit",
               "showSolutionButton": "Show solution", "tryAgainButton": "Try again"},
        "overallFeedback": [{"from": 0, "to": 100, "feedback": ""}]
    }
    if audio_rel:
        params["media"] = audio_media(audio_rel)
    return {"library": "H5P.MultiChoice 1.16", "params": params,
            "subContentId": qid or new_id(),
            "metadata": {"contentType": "Multiple Choice", "license": "U", "title": "Q"}}

def tf_question(qtext, correct_bool, fb_correct="", fb_wrong="", audio_rel=None, qid=None):
    """Build an H5P.TrueFalse 1.8 question block."""
    params = {
        "question": f"<p>{qtext}</p>",
        "correct": "true" if correct_bool else "false",
        "behaviour": {"enableRetry": True, "enableSolutionsButton": True},
        "l10n": {"trueText": "True", "falseText": "False",
                 "score": "You got @score of @total points",
                 "checkAnswer": "Check", "showSolutionButton": "Show solution",
                 "tryAgain": "Try again"},
        "feedbackOnCorrect": fb_correct or "Correct!",
        "feedbackOnWrong": fb_wrong or "Not quite!"
    }
    if audio_rel:
        params["media"] = audio_media(audio_rel)
    return {"library": "H5P.TrueFalse 1.8", "params": params,
            "subContentId": qid or new_id(),
            "metadata": {"contentType": "True/False Question", "license": "U", "title": "Q"}}

def qs_content(title, intro, questions, pass_pct=70):
    """Build full H5P.QuestionSet content JSON."""
    return {
        "introPage": {
            "showIntroPage": True,
            "startButtonText": "Start Listening",
            "introduction": f"<p>{intro}</p>"
        },
        "progressType": "dots",
        "passPercentage": pass_pct,
        "questions": questions,
        "endGame": {
            "showResultPage": True,
            "noResultMessage": "Finished!",
            "message": "Your listening score:",
            "scoreBarLabel": "You got @finals of @totals points",
            "overallFeedback": [
                {"from": 0,  "to": 49,  "feedback": "Keep listening! \u0627\u0633\u062a\u0645\u0639 \u0645\u062c\u062f\u062f\u0627\u064b \u0648\u062d\u0627\u0648\u0644 \u062b\u0627\u0646\u064a\u0629."},
                {"from": 50, "to": 79,  "feedback": "Good listening! Keep practising. \U0001f334"},
                {"from": 80, "to": 100, "feedback": "Excellent listener! You are a Palm Tree Master! \u2b50"}
            ],
            "showAnimations": False,
            "skippable": False,
            "skipButtonText": "Skip video"
        },
        "override": {"checkButton": True},
        "texts": {
            "prevButton": "Previous", "nextButton": "Next",
            "finishButton": "Finish", "submitButton": "Submit",
            "textualProgress": "Question @current of @total",
            "jumpToQuestion": "Question %d of @total",
            "questionLabel": "Question", "readSpeakerProgress": "Question @current of @total",
            "unansweredText": "Unanswered", "answeredText": "Answered",
            "currentQuestionText": "Current question"
        }
    }

def dict_content(title, sentences_data):
    """Build H5P.Dictation content JSON. sentences_data = list of (text, audio_rel or None)"""
    items = []
    for text, audio_rel in sentences_data:
        item = {"solution": text, "tip": ""}
        if audio_rel:
            item["sample"] = [audio_source(audio_rel)]
        else:
            item["sample"] = []
        items.append(item)
    return {
        "taskDescription": f"<p>\U0001f3a7 {title} — Listen carefully and type what you hear.</p>",
        "sentences": items,
        "behaviour": {
            "tries": 3, "triesAudio": 3,
            "ignorePunctuation": True, "zeroMistakeMode": False,
            "enableSolutionsButton": True, "enableRetry": True
        },
        "l10n": {
            "check": "Check", "tryAgain": "Retry",
            "showSolution": "Show solution",
            "score": "You got @score of @total points",
            "solutions": "Solutions", "sentence": "Sentence",
            "item": "Item", "correct": "Correct!",
            "wrong": "Wrong", "missing": "Missing",
            "added": "Added", "typo": "Small mistake",
            "typoLong": "Typo", "goldenEgg": "Perfect!",
            "textField": "Text field", "enterText": "Enter text",
            "wrongWords": "Wrong words", "correctText": "Correct text",
            "regularText": "Regular", "whitespaceBefore": "Space before",
            "whitespaceAfter": "Space after", "shouldBe": "Should be",
            "or": "or", "colorLegend": "Color legend",
            "currentText": "Your text", "expectedText": "Expected text",
            "specChar": "Special character", "resetSentences": "Reset"
        },
        "overallFeedback": [
            {"from": 0,  "to": 49, "feedback": "Listen again carefully!"},
            {"from": 50, "to": 79, "feedback": "Good effort! Keep practising. \U0001f334"},
            {"from": 80, "to": 100,"feedback": "Excellent listening! \u2b50"}
        ]
    }

H5P_DEPS = {
    "H5P.QuestionSet": [
        {"machineName": "H5P.QuestionSet", "majorVersion": "1", "minorVersion": "17"},
        {"machineName": "H5P.MultiChoice", "majorVersion": "1", "minorVersion": "16"},
        {"machineName": "H5P.TrueFalse",   "majorVersion": "1", "minorVersion": "8"},
        {"machineName": "H5P.Audio",        "majorVersion": "1", "minorVersion": "5"},
    ],
    "H5P.Dictation": [
        {"machineName": "H5P.Dictation", "majorVersion": "1", "minorVersion": "9"},
    ],
}

def save_h5p(name, lib, content_json, media_files={}):
    """
    Save an H5P zip file.
    media_files: dict of {relative_path_in_content: bytes}
    e.g. {"audios/q1.wav": b"..."}
    """
    meta = {
        "title": name, "language": "en", "mainLibrary": lib,
        "embedTypes": ["div"], "license": "U", "authors": [], "changes": [],
        "extraTitle": name,
        "preloadedDependencies": H5P_DEPS.get(lib, [{"machineName": lib, "majorVersion": "1", "minorVersion": "0"}])
    }
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("h5p.json", json.dumps(meta, ensure_ascii=False))
        z.writestr("content/content.json", json.dumps(content_json, ensure_ascii=False, indent=2))
        for rel, data in media_files.items():
            z.writestr(f"content/{rel}", data)
    path = os.path.join(OUT, name + ".h5p")
    with open(path, "wb") as f:
        f.write(buf.getvalue())
    sz = os.path.getsize(path)
    log(f"  Saved: {name}.h5p  ({sz//1024} KB)")
    return path

# ═════════════════════════════════════════════════════════════════════════════
# CONTENT DEFINITIONS
# ═════════════════════════════════════════════════════════════════════════════

# ── Stage 1: Who's Speaking? ─────────────────────────────────────────────────
S1_CLIPS = [
    ("ryan",   "The village of Al-Qurawashiyah sat quietly at the foot of the mountains.",
     "Narrator", ["John", "Thuraya", "A child"]),
    ("alan",   "I had never seen a falaj before. It was beautiful.",
     "John", ["Narrator", "Thuraya", "Sophia"]),
    ("lessac", "You are welcome here, in our village.",
     "Thuraya", ["John", "Narrator", "A child"]),
    ("danny",  "Teacher! Teacher! Look at the water in the falaj!",
     "A child", ["John", "Thuraya", "Narrator"]),
    ("amy",    "Good morning everyone. My name is Sophia, and I am your English teacher.",
     "Sophia", ["John", "Thuraya", "Narrator"]),
]

# ── Stage 2: Hear the Definition, Choose the Word ────────────────────────────
S2_CLIPS = [
    ("ryan", "Something very old, from long ago. Which word means this?",
     "ancient", ["curious", "brave", "patient"]),
    ("ryan", "A channel that carries water from the mountains to the gardens. What is it called?",
     "falaj", ["market", "shade", "harvest"]),
    ("ryan", "The cool, protected area under trees, away from the sun. Which word?",
     "shade", ["trust", "wisdom", "journey"]),
    ("ryan", "To find something new for the first time. What is the word?",
     "discover", ["respect", "arrive", "trust"]),
    ("ryan", "A person whose job is to teach students in school. What are they called?",
     "teacher", ["elder", "farmer", "trader"]),
    ("ryan", "Not afraid to face something difficult or scary. Which word?",
     "brave", ["quiet", "patient", "curious"]),
    ("ryan", "Deep knowledge and good judgment that comes from experience. What word?",
     "wisdom", ["tradition", "kindness", "harvest"]),
    ("ryan", "Being warm, friendly, and generous to other people. Which word means this?",
     "kindness", ["respect", "trust", "patience"]),
]

# ── Stage 3: Dictation ───────────────────────────────────────────────────────
S3_SENTS = [
    ("ryan", "John arrived in the village of Al-Qurawashiyah."),
    ("ryan", "The falaj is an ancient water channel."),
    ("ryan", "Sophia taught English to the children every morning."),
    ("ryan", "Uncle Nasser drove them to the market in his truck."),
    ("ryan", "The children were curious about the English language."),
    ("ryan", "Palm trees give shade and sweet dates."),
    ("ryan", "Khamees was quiet but surprised everyone at the end."),
]

# ── Stage 4: Story Comprehension ─────────────────────────────────────────────
S4_CLIPS = [
    ("ryan", "Where did John arrive at the beginning of the story?",
     "The village of Al-Qurawashiyah",
     ["The city of Muscat", "A school in London", "The market in Samail"]),
    ("ryan", "What is the falaj?",
     "An ancient water channel",
     ["A type of market", "A large palm tree", "A village elder"]),
    ("ryan", "Who was the English teacher in the village school?",
     "Sophia",
     ["John", "Thuraya", "Uncle Nasser"]),
    ("ryan", "Who drove the children to the market?",
     "Uncle Nasser",
     ["John", "Marhoon", "The village elder"]),
    ("ryan", "How did the children feel about learning English?",
     "They were curious",
     ["They were afraid", "They were bored", "They were angry"]),
    ("ryan", "What did the palm tree give to the people of the village?",
     "Shade and sweet dates",
     ["Water and flowers", "Fruit and firewood", "Shade and cool water"]),
]

# ── Stage 5: True or False ───────────────────────────────────────────────────
S5_ITEMS = [
    ("ryan", "John had visited Oman many times before arriving in Al-Qurawashiyah.",
     False, "No — this was John's first visit to Oman."),
    ("ryan", "The falaj is used to carry water to the village gardens.",
     True,  "Yes! The falaj brings water from the mountains."),
    ("ryan", "Sophia was the village elder.",
     False, "No — Sophia was the English teacher."),
    ("ryan", "The children were not interested in learning English.",
     False, "No — the children were very curious about English."),
    ("ryan", "Khamees was always the first to speak in class.",
     False, "No — Khamees was very quiet in class."),
    ("ryan", "Uncle Nasser had a big truck.",
     True,  "Yes! Uncle Nasser drove a big truck."),
    ("ryan", "Al-Qurawashiyah is a small village in Oman.",
     True,  "Yes! It is a small village in the mountains of Oman."),
    ("ryan", "The palm tree gave both shade and sweet dates.",
     True,  "Yes! The palm tree gives shade and sweet dates to the village."),
]

# ── Stage 6: Complete the Sentence ───────────────────────────────────────────
S6_CLIPS = [
    ("ryan", "John arrived in the...",
     "village", ["market", "school", "city"]),
    ("ryan", "The falaj is an ancient water...",
     "channel", ["road", "bridge", "river"]),
    ("ryan", "Sophia was their English...",
     "teacher", ["friend", "helper", "student"]),
    ("ryan", "Uncle Nasser drove them in his big...",
     "truck", ["car", "boat", "bus"]),
    ("ryan", "The children sat in the shade of the palm...",
     "tree", ["house", "roof", "wall"]),
    ("ryan", "Khamees was very quiet in...",
     "class", ["the market", "the falaj", "his home"]),
]

# ── Stage 7: Final Quiz (mixed) ───────────────────────────────────────────────
# 10 questions: 4 MC comprehension, 3 T/F, 3 vocabulary MC
S7_MC = [
    ("ryan", "How did John travel to Oman at the beginning of the story?",
     "By aeroplane", ["By ship", "By truck", "On foot"]),
    ("ryan", "What language did Sophia teach the children?",
     "English", ["Arabic", "French", "Omani"]),
    ("ryan", "What does the word 'curious' mean?",
     "Wanting to know more", ["Feeling afraid", "Being very tired", "Moving quickly"]),
    ("ryan", "Who built the falaj many years ago?",
     "Ancient Omani people", ["British engineers", "The village children", "Uncle Nasser"]),
]
S7_TF = [
    ("ryan", "The story of Under the Palm Tree is set in the 1970s in Oman.",
     True,  "Yes — the story is set in the village of Al-Qurawashiyah in the 1970s."),
    ("ryan", "Thuraya was a child who spoke first and welcomed John.",
     True,  "Yes — Thuraya was brave and spoke first to welcome John."),
    ("ryan", "The word 'harvest' means to plant new seeds in the ground.",
     False, "No — harvest means collecting the crops that have grown."),
]
S7_VOCAB = [
    ("ryan", "Which word means 'a long trip from one place to another'?",
     "journey", ["harvest", "village", "tradition"]),
    ("ryan", "What does 'patient' mean?",
     "Able to wait calmly", ["Feeling excited", "Moving fast", "Feeling sad"]),
    ("ryan", "Which word means 'to treat someone with honour and care'?",
     "respect", ["harvest", "discover", "trust"]),
]

# ═════════════════════════════════════════════════════════════════════════════
# GENERATE ALL STAGES
# ═════════════════════════════════════════════════════════════════════════════

def generate_qs_with_audio(stage_num, name, title, intro, clip_list, pass_pct=70):
    """
    Generic builder for QuestionSet stages with MultiChoice + audio.
    clip_list: list of (voice, spoken_text, correct_answer, [wrong_answers])
    """
    log(f"\n[{stage_num}] Generating {name}...")
    questions = []
    media = {}
    for i, (voice, spoken, correct, wrongs) in enumerate(clip_list):
        wav_name = f"s{stage_num}_q{i}.wav"
        wav_path = os.path.join(TMP, wav_name)
        rel      = f"audios/{wav_name}"
        ok = tts(spoken, wav_path, voice)
        if ok:
            media[rel] = wav_bytes(wav_path)
            log(f"  ok  Q{i+1}: {spoken[:50]}")
        else:
            log(f"  WARN Q{i+1}: no audio")
            rel = None
        answers = [{"text": correct, "correct": True}] + \
                  [{"text": w, "correct": False} for w in wrongs]
        questions.append(mc_question(
            f"\U0001f3a7 Listen and choose the correct answer.",
            answers, audio_rel=rel, qid=f"s{stage_num}q{i}"
        ))
    save_h5p(name, "H5P.QuestionSet",
             qs_content(title, intro, questions, pass_pct), media)

def generate_tf_with_audio(stage_num, name, title, intro, items, pass_pct=70):
    """
    Builder for T/F stages with audio.
    items: list of (voice, statement, correct_bool, feedback)
    """
    log(f"\n[{stage_num}] Generating {name}...")
    questions = []
    media = {}
    for i, (voice, stmt, correct, fb) in enumerate(items):
        wav_name = f"s{stage_num}_q{i}.wav"
        wav_path = os.path.join(TMP, wav_name)
        rel      = f"audios/{wav_name}"
        ok = tts(stmt, wav_path, voice)
        if ok:
            media[rel] = wav_bytes(wav_path)
            log(f"  ok  Q{i+1}: {stmt[:50]}")
        else:
            log(f"  WARN Q{i+1}: no audio")
            rel = None
        questions.append(tf_question(
            "\U0001f3a7 Listen and decide: True or False?",
            correct,
            fb_correct=f"Correct! {fb}",
            fb_wrong=f"Not quite. {fb}",
            audio_rel=rel, qid=f"s{stage_num}q{i}"
        ))
    save_h5p(name, "H5P.QuestionSet",
             qs_content(title, intro, questions, pass_pct), media)

# ── Stage 1 ──────────────────────────────────────────────────────────────────
generate_qs_with_audio(
    1, "L01_Who_Is_Speaking",
    "Stage 1 – Who's Speaking?",
    "\U0001f3a7 Listen to each audio clip. Which character is speaking? Choose the correct name.",
    S1_CLIPS
)

# ── Stage 2 ──────────────────────────────────────────────────────────────────
generate_qs_with_audio(
    2, "L02_Hear_the_Definition",
    "Stage 2 – Hear the Definition",
    "\U0001f3a7 Listen to each definition. Choose the correct vocabulary word.",
    S2_CLIPS
)

# ── Stage 3: Dictation ───────────────────────────────────────────────────────
log("\n[3] Generating L03_Dictation...")
s3_media = {}
s3_sents = []
for i, (voice, text) in enumerate(S3_SENTS):
    wav_name = f"s3_q{i}.wav"
    wav_path = os.path.join(TMP, wav_name)
    rel      = f"audios/{wav_name}"
    ok = tts(text, wav_path, voice)
    if ok:
        s3_media[rel] = wav_bytes(wav_path)
        s3_sents.append((text, rel))
        log(f"  ok  {i+1}: {text[:50]}")
    else:
        s3_sents.append((text, None))
        log(f"  WARN {i+1}: no audio")

save_h5p("L03_Dictation", "H5P.Dictation",
         dict_content("Stage 3 – Dictation", s3_sents), s3_media)

# ── Stage 4 ──────────────────────────────────────────────────────────────────
generate_qs_with_audio(
    4, "L04_Story_Comprehension",
    "Stage 4 – Story Comprehension",
    "\U0001f3a7 Listen to each question about the story. Choose the correct answer.",
    S4_CLIPS
)

# ── Stage 5 ──────────────────────────────────────────────────────────────────
generate_tf_with_audio(
    5, "L05_True_or_False",
    "Stage 5 – True or False",
    "\U0001f3a7 Listen to each statement about the story. Is it True or False?",
    S5_ITEMS
)

# ── Stage 6 ──────────────────────────────────────────────────────────────────
generate_qs_with_audio(
    6, "L06_Complete_the_Sentence",
    "Stage 6 – Complete the Sentence",
    "\U0001f3a7 Listen to each sentence. Which word correctly completes it?",
    S6_CLIPS
)

# ── Stage 7: Final Quiz (mixed) ───────────────────────────────────────────────
log("\n[7] Generating L07_Final_Quiz...")
s7_questions = []
s7_media     = {}

def add_mc_batch(clips, prefix):
    for i, (voice, spoken, correct, wrongs) in enumerate(clips):
        wav_name = f"{prefix}_{i}.wav"
        wav_path = os.path.join(TMP, wav_name)
        rel      = f"audios/{wav_name}"
        ok = tts(spoken, wav_path, voice)
        if ok:
            s7_media[rel] = wav_bytes(wav_path)
            log(f"  ok  {prefix} Q{i+1}")
        else:
            rel = None
            log(f"  WARN {prefix} Q{i+1}: no audio")
        answers = [{"text": correct, "correct": True}] + \
                  [{"text": w, "correct": False} for w in wrongs]
        s7_questions.append(mc_question(
            "\U0001f3a7 Listen and choose the correct answer.",
            answers, audio_rel=rel, qid=f"s7_{prefix}_{i}"
        ))

def add_tf_batch(items, prefix):
    for i, (voice, stmt, correct, fb) in enumerate(items):
        wav_name = f"{prefix}_{i}.wav"
        wav_path = os.path.join(TMP, wav_name)
        rel      = f"audios/{wav_name}"
        ok = tts(stmt, wav_path, voice)
        if ok:
            s7_media[rel] = wav_bytes(wav_path)
            log(f"  ok  {prefix} TF{i+1}")
        else:
            rel = None
            log(f"  WARN {prefix} TF{i+1}: no audio")
        s7_questions.append(tf_question(
            "\U0001f3a7 Listen. Is this True or False?",
            correct,
            fb_correct=f"Correct! {fb}",
            fb_wrong=f"Not quite. {fb}",
            audio_rel=rel, qid=f"s7_{prefix}_{i}"
        ))

add_mc_batch(S7_MC,    "s7mc")
add_tf_batch(S7_TF,    "s7tf")
add_mc_batch(S7_VOCAB, "s7vc")

save_h5p("L07_Final_Quiz", "H5P.QuestionSet",
         qs_content(
             "Stage 7 – Final Listening Quiz",
             "\U0001f3a7 Final Listening Quiz — 10 questions testing all your listening skills. Good luck!",
             s7_questions, pass_pct=70
         ), s7_media)

# ═════════════════════════════════════════════════════════════════════════════
# SCORM 1.2 PACKAGE FOR STAGE 7
# ═════════════════════════════════════════════════════════════════════════════
log("\n[SCORM] Building SCORM 1.2 package for Final Quiz...")

# Collect all Stage 7 audio as base64 for embedding
audio_b64 = {}
for rel, data in s7_media.items():
    wav_name = os.path.basename(rel)
    audio_b64[wav_name] = base64.b64encode(data).decode()

# Build question data for the SCORM HTML
scorm_questions = []

def scorm_mc(voice, spoken, correct, wrongs, wav_name):
    all_opts = [{"text": correct, "correct": True}] + [{"text": w, "correct": False} for w in wrongs]
    import random; random.shuffle(all_opts)
    return {"type": "mc", "audio": wav_name, "question": "Listen and choose the correct answer.",
            "options": all_opts}

def scorm_tf(voice, stmt, correct, fb, wav_name):
    return {"type": "tf", "audio": wav_name,
            "question": "Listen. Is this True or False?",
            "correct": "true" if correct else "false",
            "feedback": fb}

scorm_q_list = []
for i, (voice, spoken, correct, wrongs) in enumerate(S7_MC):
    wn = f"s7mc_{i}.wav"
    scorm_q_list.append(scorm_mc(voice, spoken, correct, wrongs, wn))
for i, (voice, stmt, correct, fb) in enumerate(S7_TF):
    wn = f"s7tf_{i}.wav"
    scorm_q_list.append(scorm_tf(voice, stmt, correct, fb, wn))
for i, (voice, spoken, correct, wrongs) in enumerate(S7_VOCAB):
    wn = f"s7vc_{i}.wav"
    scorm_q_list.append(scorm_mc(voice, spoken, correct, wrongs, wn))

questions_json = json.dumps(scorm_q_list, ensure_ascii=False)
audio_json     = json.dumps(audio_b64, ensure_ascii=False)

SCORM_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Under The Palm Tree — Final Listening Quiz</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{font-family:'Segoe UI',Tahoma,sans-serif;background:#f5f0e8;color:#3d1a0a;min-height:100vh;display:flex;align-items:center;justify-content:center}}
.shell{{width:100%;max-width:680px;padding:24px}}
.card{{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(61,26,10,.13);padding:32px;margin-bottom:20px}}
h1{{font-size:1.5rem;color:#5a3010;margin-bottom:6px}}
.subtitle{{color:#a07850;font-size:.95rem;margin-bottom:24px}}
.progress-bar{{height:8px;background:#c8b89a;border-radius:4px;overflow:hidden;margin-bottom:20px}}
.progress-fill{{height:100%;background:#5a3010;border-radius:4px;transition:width .4s}}
.q-num{{font-size:.85rem;color:#a07850;margin-bottom:8px}}
.q-text{{font-size:1.1rem;font-weight:600;margin-bottom:18px;line-height:1.5}}
.audio-btn{{display:flex;align-items:center;gap:10px;background:#5a3010;color:#fff;border:none;border-radius:10px;padding:10px 20px;font-size:1rem;cursor:pointer;margin-bottom:20px;transition:background .2s}}
.audio-btn:hover{{background:#3d1a0a}}
.audio-btn svg{{width:22px;height:22px;fill:#fff}}
.options{{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}}
.opt{{display:flex;align-items:center;gap:12px;background:#f5f0e8;border:2px solid #c8b89a;border-radius:10px;padding:12px 16px;cursor:pointer;font-size:1rem;transition:all .2s}}
.opt:hover{{border-color:#5a3010;background:#ede8dc}}
.opt.selected{{border-color:#5a3010;background:#e8dcc8}}
.opt.correct{{border-color:#2d7a2d;background:#d4f0d4 !important}}
.opt.wrong{{border-color:#c0392b;background:#f5d5d0 !important}}
.tf-row{{display:flex;gap:14px;margin-bottom:20px}}
.tf-btn{{flex:1;padding:14px;border:2px solid #c8b89a;border-radius:10px;background:#f5f0e8;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all .2s}}
.tf-btn:hover{{border-color:#5a3010}}
.tf-btn.selected{{border-color:#5a3010;background:#e8dcc8}}
.tf-btn.correct{{border-color:#2d7a2d;background:#d4f0d4 !important;color:#1a5c1a}}
.tf-btn.wrong{{border-color:#c0392b;background:#f5d5d0 !important;color:#7a1a1a}}
.feedback{{border-radius:10px;padding:12px 16px;font-size:.95rem;margin-bottom:16px;display:none}}
.feedback.show{{display:block}}
.feedback.ok{{background:#d4f0d4;color:#1a5c1a;border:1px solid #2d7a2d}}
.feedback.bad{{background:#f5d5d0;color:#7a1a1a;border:1px solid #c0392b}}
.nav-row{{display:flex;justify-content:flex-end;gap:10px}}
.btn{{padding:11px 28px;border:none;border-radius:10px;font-size:1rem;font-weight:600;cursor:pointer;transition:background .2s}}
.btn-check{{background:#5a3010;color:#fff}}
.btn-check:hover{{background:#3d1a0a}}
.btn-next{{background:#a07850;color:#fff}}
.btn-next:hover{{background:#7a5830}}
.btn-next:disabled{{background:#c8b89a;cursor:default}}
/* Results */
.result-card{{text-align:center;padding:40px 32px}}
.score-circle{{width:140px;height:140px;border-radius:50%;background:#5a3010;color:#f5f0e8;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 24px;font-size:2.5rem;font-weight:700;line-height:1}}
.score-circle small{{font-size:1rem;font-weight:400;opacity:.8}}
.result-msg{{font-size:1.25rem;font-weight:600;margin-bottom:8px}}
.result-sub{{color:#a07850;margin-bottom:30px}}
.score-table{{width:100%;border-collapse:collapse;margin-bottom:24px;text-align:left}}
.score-table th,.score-table td{{padding:10px 14px;border-bottom:1px solid #c8b89a;font-size:.95rem}}
.score-table th{{background:#f5f0e8;color:#5a3010;font-weight:700}}
.score-table td.good{{color:#2d7a2d;font-weight:600}}
.score-table td.bad{{color:#c0392b;font-weight:600}}
.badge{{display:inline-block;padding:4px 12px;border-radius:20px;font-size:.8rem;font-weight:700}}
.badge-pass{{background:#d4f0d4;color:#1a5c1a}}
.badge-fail{{background:#f5d5d0;color:#7a1a1a}}
.retry-btn{{background:#5a3010;color:#fff;border:none;border-radius:10px;padding:13px 36px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:10px}}
.retry-btn:hover{{background:#3d1a0a}}
</style>
</head>
<body>
<div class="shell">
  <div class="card" id="quiz-card">
    <h1>&#127795; Under The Palm Tree</h1>
    <p class="subtitle">Stage 7 — Final Listening Quiz &nbsp;|&nbsp; 10 Questions</p>
    <div class="progress-bar"><div class="progress-fill" id="prog" style="width:0%"></div></div>
    <div id="q-area"></div>
  </div>
  <div class="card result-card" id="result-card" style="display:none">
    <h1 style="margin-bottom:20px">&#127795; Quiz Complete!</h1>
    <div class="score-circle" id="sc-circle"><span id="sc-num">0</span><small>/ 10</small></div>
    <div class="result-msg" id="res-msg"></div>
    <div class="result-sub" id="res-sub"></div>
    <table class="score-table" id="res-table">
      <thead><tr><th>#</th><th>Question</th><th>Your Answer</th><th>Result</th></tr></thead>
      <tbody id="res-tbody"></tbody>
    </table>
    <button class="retry-btn" onclick="restart()">&#8635; Try Again</button>
  </div>
</div>
<script>
/* ── SCORM 1.2 API ── */
var API=null;
function findAPI(w){{for(var i=0;i<7;i++){{if(w.API)return w.API;if(!w.parent||w.parent===w)break;w=w.parent;}}return null;}}
function initSCORM(){{API=findAPI(window);if(API){{API.LMSInitialize("");API.LMSSetValue("cmi.core.lesson_status","incomplete");API.LMSCommit("");}}}}
function finishSCORM(raw,pct){{if(!API)return;API.LMSSetValue("cmi.core.score.raw",String(raw));API.LMSSetValue("cmi.core.score.min","0");API.LMSSetValue("cmi.core.score.max","10");API.LMSSetValue("cmi.core.lesson_status",pct>=70?"passed":"failed");API.LMSCommit("");API.LMSFinish("");}}
window.addEventListener("load",initSCORM);

/* ── Audio ── */
var AUDIO_DATA={json_audio};
function makeAudio(name){{
  if(!AUDIO_DATA[name])return null;
  var au=new Audio("data:audio/wav;base64,"+AUDIO_DATA[name]);
  return au;
}}

/* ── Quiz Data ── */
var QS={json_questions};
var cur=0,score=0,answered=[];
var curAudio=null;

function restart(){{
  cur=0;score=0;answered=[];
  document.getElementById("quiz-card").style.display="";
  document.getElementById("result-card").style.display="none";
  renderQ();
}}

function setProgress(){{
  document.getElementById("prog").style.width=((cur/QS.length)*100)+"%";
}}

function playAudio(name){{
  if(curAudio){{curAudio.pause();curAudio.currentTime=0;}}
  curAudio=makeAudio(name);
  if(curAudio)curAudio.play();
}}

function renderQ(){{
  setProgress();
  var q=QS[cur];
  var html='<div class="q-num">Question '+(cur+1)+' of '+QS.length+'</div>';
  html+='<div class="q-text">'+q.question+'</div>';
  if(q.audio){{
    html+='<button class="audio-btn" onclick="playAudio(\''+q.audio+'\')"><svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg> Play Audio</button>';
  }}
  if(q.type==="mc"){{
    html+='<div class="options" id="opts">';
    q.options.forEach(function(o,i){{
      html+='<div class="opt" id="opt'+i+'" onclick="selectOpt('+i+')">'+o.text+'</div>';
    }});
    html+='</div>';
  }} else {{
    html+='<div class="tf-row"><button class="tf-btn" id="tf-true" onclick="selectTF(\'true\')">&#10003; True</button><button class="tf-btn" id="tf-false" onclick="selectTF(\'false\')">&#10007; False</button></div>';
  }}
  html+='<div class="feedback" id="fb"></div>';
  html+='<div class="nav-row"><button class="btn btn-check" id="btn-check" onclick="checkAns()">Check</button><button class="btn btn-next" id="btn-next" onclick="nextQ()" disabled>Next &rarr;</button></div>';
  document.getElementById("q-area").innerHTML=html;
  if(q.audio)setTimeout(function(){{playAudio(q.audio);}},400);
}}

var sel=null;
function selectOpt(i){{
  sel=i;
  document.querySelectorAll(".opt").forEach(function(e,j){{e.classList.toggle("selected",j===i);}});
}}
function selectTF(v){{
  sel=v;
  document.getElementById("tf-true").classList.toggle("selected",v==="true");
  document.getElementById("tf-false").classList.toggle("selected",v==="false");
}}

function checkAns(){{
  if(sel===null)return;
  var q=QS[cur];
  var correct=false;
  var fbEl=document.getElementById("fb");
  if(q.type==="mc"){{
    correct=q.options[sel].correct;
    document.querySelectorAll(".opt").forEach(function(e,i){{
      if(q.options[i].correct)e.classList.add("correct");
      else if(i===sel&&!correct)e.classList.add("wrong");
    }});
    fbEl.textContent=correct?"Correct! Well done!":"Not quite. The correct answer is: "+q.options.find(function(o){{return o.correct;}}).text;
  }} else {{
    correct=(sel===q.correct);
    document.getElementById("tf-true").classList.add(q.correct==="true"?"correct":"");
    document.getElementById("tf-false").classList.add(q.correct==="false"?"correct":"");
    if(!correct)document.getElementById("tf-"+sel).classList.add("wrong");
    fbEl.textContent=correct?"Correct! "+q.feedback:"Not quite. "+q.feedback;
  }}
  fbEl.className="feedback show "+(correct?"ok":"bad");
  if(correct)score++;
  answered.push({{q:q,sel:sel,correct:correct}});
  document.getElementById("btn-check").disabled=true;
  document.getElementById("btn-next").disabled=false;
  document.querySelectorAll(".opt,.tf-btn").forEach(function(e){{e.style.pointerEvents="none";}});
}}

function nextQ(){{
  cur++;
  sel=null;
  if(cur>=QS.length){{showResult();return;}}
  renderQ();
}}

function showResult(){{
  finishSCORM(score,(score/QS.length)*100);
  document.getElementById("quiz-card").style.display="none";
  var rc=document.getElementById("result-card");
  rc.style.display="";
  document.getElementById("sc-num").textContent=score;
  var pct=Math.round((score/QS.length)*100);
  var msg,sub;
  if(pct>=80){{msg="Excellent Listener! \u2b50";sub="You are a true Palm Tree Master!"}}
  else if(pct>=70){{msg="Good job! \U0001f334";sub="You passed! Keep practising your listening skills."}}
  else {{msg="Keep Practising!";sub="Listen to the stories again and try once more. \u0627\u0633\u062a\u0645\u0639 \u0645\u062c\u062f\u062f\u0627\u064b!"}}
  document.getElementById("res-msg").textContent=msg;
  document.getElementById("res-sub").textContent=sub;
  var tbody=document.getElementById("res-tbody");
  answered.forEach(function(a,i){{
    var tr=document.createElement("tr");
    var ans="";
    if(a.q.type==="mc")ans=a.q.options[a.sel].text;
    else ans=a.sel==="true"?"True":"False";
    tr.innerHTML='<td>'+(i+1)+'</td><td style="font-size:.85rem">'+a.q.question+'</td><td class="'+(a.correct?"good":"bad")+'">'+ans+'</td><td><span class="badge '+(a.correct?"badge-pass":"badge-fail")+'">'+(a.correct?"CORRECT":"WRONG")+'</span></td>';
    tbody.appendChild(tr);
  }});
  document.getElementById("prog").style.width="100%";
}}

renderQ();
</script>
</body>
</html>"""

# Replace placeholders
SCORM_HTML = SCORM_HTML.replace("{json_audio}", audio_json)
SCORM_HTML = SCORM_HTML.replace("{json_questions}", questions_json)

# imsmanifest.xml
MANIFEST = """<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="palm-listening-quiz" version="1"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2
    imscp_rootv1p1p2.xsd
    http://www.adlnet.org/xsd/adlcp_rootv1p2
    adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="palm_org">
    <organization identifier="palm_org">
      <title>Under The Palm Tree – Final Listening Quiz</title>
      <item identifier="item_1" identifierref="res_1">
        <title>Final Listening Quiz</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res_1" type="webcontent"
      adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>"""

scorm_path = os.path.join(OUT, "L07_Final_Quiz_SCORM.zip")
with zipfile.ZipFile(scorm_path, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("imsmanifest.xml", MANIFEST)
    z.writestr("index.html", SCORM_HTML)

sz = os.path.getsize(scorm_path)
log(f"  Saved: L07_Final_Quiz_SCORM.zip  ({sz//1024} KB)")

# ── Cleanup ──
shutil.rmtree(TMP, ignore_errors=True)

# ── Summary ──
log("\n" + "="*55)
log("ALL DONE — H5P_LISTENING folder:")
files = sorted(os.listdir(OUT))
for fn in files:
    sz = os.path.getsize(os.path.join(OUT, fn))
    log(f"   {fn:<40} {sz//1024} KB")
