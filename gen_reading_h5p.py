"""
gen_reading_h5p.py
7 Reading Comprehension stages + Stage 8 Combined SCORM
Under The Palm Tree — 123 Let's Learn English

Stage 1 : Read & Fill the Blanks    (QuestionSet + H5P.Blanks)
Stage 2 : Read & Sequence Events    (QuestionSet + MCQ)
Stage 3 : Comprehension — Who/What  (QuestionSet + MCQ)
Stage 4 : Vocabulary in Context     (QuestionSet + MCQ)
Stage 5 : Read & True/False         (QuestionSet + TrueFalse)
Stage 6 : Read Aloud — Pronunciation (SpeakTheWordsSet + custom HTML trainer)
Stage 7 : Deep Reading — Inference  (QuestionSet + MCQ higher-order)
Stage 8 : Final Combined Test       (Custom HTML SCORM 1.2 — Reading+Listening+Pronunciation)
"""

import subprocess, zipfile, json, io, os, base64, shutil, uuid, sys, random

BASE   = r"C:\Users\someo\Downloads\project_stuff"
PIPER  = os.path.join(BASE, "piper", "piper.exe")
VOICES = {
    "ryan"  : os.path.join(BASE, "piper", "en_US-ryan-medium.onnx"),
    "alan"  : os.path.join(BASE, "piper", "en_GB-alan-low.onnx"),
    "amy"   : os.path.join(BASE, "piper", "en_US-amy-medium.onnx"),
    "lessac": os.path.join(BASE, "piper", "en_US-lessac-medium (1).onnx"),
    "danny" : os.path.join(BASE, "piper", "en_US-danny-low.onnx"),
}
TMP = os.path.join(BASE, "read_tmp")
OUT = os.path.join(BASE, "H5P_READING")
os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

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

def wav_b64(wav_path):
    return base64.b64encode(wav_bytes(wav_path)).decode()

def new_id():
    return str(uuid.uuid4())

def audio_source(rel_path):
    return {"path": rel_path, "mime": "audio/wav",
            "copyright": {"license": "U", "author": "", "year": "", "source": "", "title": ""},
            "width": 0, "height": 0}

H5P_DEPS = {
    "H5P.QuestionSet": [
        {"machineName": "H5P.QuestionSet", "majorVersion": "1", "minorVersion": "17"},
        {"machineName": "H5P.MultiChoice", "majorVersion": "1", "minorVersion": "16"},
        {"machineName": "H5P.TrueFalse",   "majorVersion": "1", "minorVersion": "8"},
        {"machineName": "H5P.Blanks",      "majorVersion": "1", "minorVersion": "14"},
        {"machineName": "H5P.Audio",       "majorVersion": "1", "minorVersion": "5"},
    ],
    "H5P.SpeakTheWordsSet": [
        {"machineName": "H5P.SpeakTheWordsSet", "majorVersion": "1", "minorVersion": "3"},
    ],
}

def save_h5p(name, lib, content_json, media_files={}):
    meta = {
        "title": name, "language": "en", "mainLibrary": lib,
        "embedTypes": ["div"], "license": "U", "authors": [], "changes": [],
        "extraTitle": name,
        "preloadedDependencies": H5P_DEPS.get(lib,
            [{"machineName": lib, "majorVersion": "1", "minorVersion": "0"}])
    }
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("h5p.json", json.dumps(meta, ensure_ascii=False))
        z.writestr("content/content.json",
                   json.dumps(content_json, ensure_ascii=False, indent=2))
        for rel, data in media_files.items():
            z.writestr(f"content/{rel}", data)
    path = os.path.join(OUT, name + ".h5p")
    with open(path, "wb") as f:
        f.write(buf.getvalue())
    sz = os.path.getsize(path)
    log(f"  Saved: {name}.h5p  ({sz//1024} KB)")
    return path

# ── shared question builders ──────────────────────────────────────────────────
def mc_q(passage_html, question, correct, wrongs, qid=None):
    answers = [{"text": correct, "correct": True,
                "tipsAndFeedback": {"tip": "", "chosenFeedback": "Correct!", "notChosenFeedback": ""}}]
    for w in wrongs:
        answers.append({"text": w, "correct": False,
                        "tipsAndFeedback": {"tip": "", "chosenFeedback": "Not quite.", "notChosenFeedback": ""}})
    return {
        "library": "H5P.MultiChoice 1.16",
        "params": {
            "question": passage_html + f"<p><strong>{question}</strong></p>",
            "answers": answers,
            "behaviour": {"enableRetry": True, "enableSolutionsButton": True,
                          "singlePoint": False, "randomAnswers": True},
            "UI": {"checkAnswerButton": "Check", "submitAnswerButton": "Submit",
                   "showSolutionButton": "Show solution", "tryAgainButton": "Try again"},
            "overallFeedback": [{"from": 0, "to": 100, "feedback": ""}]
        },
        "subContentId": qid or new_id(),
        "metadata": {"contentType": "Multiple Choice", "license": "U", "title": "Q"}
    }

def tf_q(passage_html, question, correct_bool, fb, qid=None):
    return {
        "library": "H5P.TrueFalse 1.8",
        "params": {
            "question": passage_html + f"<p><strong>{question}</strong></p>",
            "correct": "true" if correct_bool else "false",
            "behaviour": {"enableRetry": True, "enableSolutionsButton": True},
            "l10n": {"trueText": "True", "falseText": "False",
                     "score": "You got @score of @total points",
                     "checkAnswer": "Check", "showSolutionButton": "Show solution",
                     "tryAgain": "Try again"},
            "feedbackOnCorrect": f"Correct! {fb}",
            "feedbackOnWrong": f"Not quite. {fb}"
        },
        "subContentId": qid or new_id(),
        "metadata": {"contentType": "True/False Question", "license": "U", "title": "Q"}
    }

def blanks_q(passage_with_stars, qid=None):
    """H5P.Blanks embedded in QuestionSet. Stars = *missing_word*"""
    return {
        "library": "H5P.Blanks 1.14",
        "params": {
            "text": passage_with_stars,
            "behaviour": {
                "enableRetry": True, "enableSolutionsButton": True,
                "showSolutions": False, "caseSensitive": False,
                "showScorePoints": True, "autoCheck": False
            },
            "overallFeedback": [{"from": 0, "to": 100,
                                 "feedback": "Well done! Keep reading the story."}],
            "showSolutions": "Show solution",
            "tryAgain": "Try again",
            "checkAnswer": "Check",
            "notFilledOut": "Please fill in all blanks",
            "answerIsCorrect": "':ans' is correct",
            "answerIsWrong": "':ans' is wrong",
            "answeredCorrectly": "Answered correctly",
            "answeredIncorrectly": "Answered incorrectly",
            "solutionLabel": "Correct answer:",
            "inputLabel": "Blank @num of @total",
            "inputHasTipLabel": "Blank @num of @total, Tip available",
            "tipLabel": "Tip"
        },
        "subContentId": qid or new_id(),
        "metadata": {"contentType": "Fill in the Blanks", "license": "U", "title": "Fill"}
    }

def qs_wrap(title, intro, questions, pass_pct=70):
    return {
        "introPage": {
            "showIntroPage": True,
            "startButtonText": "Start Reading",
            "introduction": f"<p>{intro}</p>"
        },
        "progressType": "dots",
        "passPercentage": pass_pct,
        "questions": questions,
        "endGame": {
            "showResultPage": True,
            "noResultMessage": "Finished!",
            "message": "Your reading score:",
            "scoreBarLabel": "You got @finals of @totals points",
            "overallFeedback": [
                {"from": 0,  "to": 49,
                 "feedback": "Read the passages again carefully and try once more."},
                {"from": 50, "to": 79,
                 "feedback": "Good reading! Keep practising. \U0001f334"},
                {"from": 80, "to": 100,
                 "feedback": "Excellent reader! You are a Palm Tree Master! \u2b50"}
            ],
            "showAnimations": False, "skippable": False, "skipButtonText": "Skip"
        },
        "override": {"checkButton": True},
        "texts": {
            "prevButton": "Previous", "nextButton": "Next",
            "finishButton": "Finish", "submitButton": "Submit",
            "textualProgress": "Question @current of @total",
            "jumpToQuestion": "Question %d of @total",
            "questionLabel": "Question",
            "readSpeakerProgress": "Question @current of @total",
            "unansweredText": "Unanswered", "answeredText": "Answered",
            "currentQuestionText": "Current question"
        }
    }

# ═════════════════════════════════════════════════════════════════════════════
# STORY PASSAGES — used across stages
# ═════════════════════════════════════════════════════════════════════════════
PA = ("<div style='background:#fdf8f0;border-left:4px solid #a07850;"
      "padding:14px 18px;margin-bottom:18px;border-radius:0 8px 8px 0;"
      "font-style:italic;font-size:.97rem;line-height:1.7'>"
      "<strong>\U0001f4d6 Passage A — The Arrival</strong><br>"
      "John arrived in Al-Qurawashiyah in the autumn of 1973. "
      "The village was quiet and green. He saw long stone walls covered with "
      "bougainvillea. The air was warm and dry. He had never visited an Omani "
      "village before. A young girl named Thuraya came forward and welcomed him. "
      "She was brave. The other children watched from a distance.</div>")

PB = ("<div style='background:#fdf8f0;border-left:4px solid #a07850;"
      "padding:14px 18px;margin-bottom:18px;border-radius:0 8px 8px 0;"
      "font-style:italic;font-size:.97rem;line-height:1.7'>"
      "<strong>\U0001f4d6 Passage B — The Falaj</strong><br>"
      "The falaj is an ancient water channel. It carries water from the mountains "
      "to the village gardens. The falaj has been used for thousands of years. "
      "It is an important Omani tradition. Without the falaj, the date palms "
      "could not grow and the village could not survive. John was curious when he "
      "first saw it. The water ran silently through the stone channel.</div>")

PC = ("<div style='background:#fdf8f0;border-left:4px solid #a07850;"
      "padding:14px 18px;margin-bottom:18px;border-radius:0 8px 8px 0;"
      "font-style:italic;font-size:.97rem;line-height:1.7'>"
      "<strong>\U0001f4d6 Passage C — The Classroom</strong><br>"
      "Sophia was patient with her students. She taught English every morning. "
      "The children were curious about the new language. Thuraya was brave and "
      "spoke first. Khamees was the quietest child in the class, but he listened "
      "to every word. Sophia wrote the letters in the dirt with a stick. "
      "The children copied them carefully. Trust grew slowly in the classroom.</div>")

PD = ("<div style='background:#fdf8f0;border-left:4px solid #a07850;"
      "padding:14px 18px;margin-bottom:18px;border-radius:0 8px 8px 0;"
      "font-style:italic;font-size:.97rem;line-height:1.7'>"
      "<strong>\U0001f4d6 Passage D — Village Life</strong><br>"
      "Uncle Nasser drove them to the market in Samail in his big truck. "
      "The market was busy with traders and farmers. The children were excited. "
      "They saw dates, fruit, and things they had never seen before. "
      "It was almost time for the date harvest. The palm trees were heavy "
      "with fruit. The village elder watched everything with wisdom and patience.</div>")

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 1 — Read & Fill the Blanks
# ═════════════════════════════════════════════════════════════════════════════
log("\n[1] Generating R01_Fill_the_Blanks...")

s1_qs = [
    blanks_q(
        PA + "<p>John arrived in Al-Qurawashiyah in the *autumn* of 1973. "
        "The village was *quiet* and green.</p>", "fib1"),
    blanks_q(
        PA + "<p>A young girl named *Thuraya* came forward and *welcomed* him. "
        "She was *brave*.</p>", "fib2"),
    blanks_q(
        PB + "<p>The *falaj* is an ancient water *channel*. "
        "It carries water from the *mountains* to the village gardens.</p>", "fib3"),
    blanks_q(
        PB + "<p>Without the falaj, the date *palms* could not grow "
        "and the village could not *survive*.</p>", "fib4"),
    blanks_q(
        PC + "<p>Sophia was *patient* with her students. "
        "She taught *English* every *morning*.</p>", "fib5"),
    blanks_q(
        PC + "<p>Khamees was the *quietest* child in the class, "
        "but he *listened* to every word.</p>", "fib6"),
    blanks_q(
        PD + "<p>Uncle Nasser drove them to the *market* in Samail "
        "in his big *truck*.</p>", "fib7"),
    blanks_q(
        PD + "<p>It was almost time for the date *harvest*. "
        "The palm trees were heavy with *fruit*.</p>", "fib8"),
]

save_h5p("R01_Fill_the_Blanks", "H5P.QuestionSet",
         qs_wrap("Stage 1 — Read & Fill the Blanks",
                 "Read each passage carefully, then fill in the missing words. "
                 "The passage is there to help you!",
                 s1_qs, 70))

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 2 — Read & Sequence Events
# ═════════════════════════════════════════════════════════════════════════════
log("\n[2] Generating R02_Sequence_Events...")

p_all = (PA + PB + PC + PD)
hint = "<p><em>\U0001f4d6 Read the passages above, then answer.</em></p>"

s2_qs = [
    mc_q(PA + hint,
         "What did John see FIRST when he arrived at the village?",
         "Long stone walls covered with flowers",
         ["The falaj water channel", "The village market", "The classroom"], "s2q1"),
    mc_q(PA + hint,
         "Who was the FIRST to welcome John when he arrived?",
         "Thuraya, a young girl",
         ["The village elder", "Sophia the teacher", "Uncle Nasser"], "s2q2"),
    mc_q(PB + hint,
         "According to the passage, AFTER John arrived, what made him curious?",
         "The falaj water channel",
         ["The date palm harvest", "The market in Samail", "The English classroom"], "s2q3"),
    mc_q(PC + hint,
         "In the classroom, what did Sophia do BEFORE the children copied the letters?",
         "She wrote the letters in the dirt with a stick",
         ["She spoke to the village elder", "She drove to the market", "She read the passage aloud"], "s2q4"),
    mc_q(PD + hint,
         "Which event happened LAST in Passage D?",
         "The village elder watched everything with wisdom",
         ["Uncle Nasser drove to the market", "The children saw dates and fruit", "The harvest began"], "s2q5"),
    mc_q(PD + hint,
         "According to the story, what was about to happen NEXT after visiting the market?",
         "The date harvest",
         ["John left the village", "Sophia started teaching", "Thuraya spoke for the first time"], "s2q6"),
]

save_h5p("R02_Sequence_Events", "H5P.QuestionSet",
         qs_wrap("Stage 2 — Read & Sequence Events",
                 "Read the passages carefully. Then answer questions about the ORDER of events. "
                 "The passages are shown with each question to help you.",
                 s2_qs, 70))

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 3 — Comprehension: Who / What / Where
# ═════════════════════════════════════════════════════════════════════════════
log("\n[3] Generating R03_Comprehension_WWW...")

s3_qs = [
    mc_q(PA, "Where did John arrive at the beginning of the story?",
         "The village of Al-Qurawashiyah",
         ["The city of Muscat", "A school in London", "The market in Samail"], "s3q1"),
    mc_q(PA, "What was the weather like when John arrived?",
         "Warm and dry",
         ["Cold and rainy", "Hot and humid", "Windy and cloudy"], "s3q2"),
    mc_q(PB, "What does the falaj carry?",
         "Water from the mountains to the village gardens",
         ["Dates from the farms to the market", "Children from the village to school",
          "Goods from traders to the village"], "s3q3"),
    mc_q(PB, "Why is the falaj important to the village?",
         "Without it, the date palms and the village could not survive",
         ["It connects the village to the market", "It teaches the children about history",
          "It brings traders to the village"], "s3q4"),
    mc_q(PC, "How did Sophia teach the children to write?",
         "She wrote letters in the dirt with a stick",
         ["She gave them books and pencils", "She wrote on a blackboard",
          "She showed them pictures in a book"], "s3q5"),
    mc_q(PC, "Which child was the quietest in Sophia's class?",
         "Khamees",
         ["Thuraya", "Ahmed", "Mansoor"], "s3q6"),
    mc_q(PD, "Where did Uncle Nasser drive the children?",
         "The market in Samail",
         ["The falaj near the mountains", "A school in the next village",
          "The date palm farm"], "s3q7"),
    mc_q(PD, "Who watched the market with wisdom and patience?",
         "The village elder",
         ["Uncle Nasser", "Sophia", "John"], "s3q8"),
]

save_h5p("R03_Comprehension_WWW", "H5P.QuestionSet",
         qs_wrap("Stage 3 — Who? What? Where?",
                 "Read the story passages and answer the comprehension questions below. "
                 "Each passage is shown to help you.",
                 s3_qs, 70))

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 4 — Vocabulary in Context
# ═════════════════════════════════════════════════════════════════════════════
log("\n[4] Generating R04_Vocabulary_in_Context...")

def ctx(word, sentence, passage=""):
    return (f"{passage}<p>\U0001f50d Read this sentence from the story:</p>"
            f"<blockquote style='border-left:3px solid #a07850;padding:8px 14px;"
            f"background:#fdf8f0;border-radius:0 8px 8px 0'>{sentence}</blockquote>"
            f"<p><strong>What does the word <em>'{word}'</em> mean in this sentence?</strong></p>")

s4_qs = [
    mc_q(ctx("quiet",
             "The village was <u>quiet</u> and green.",
             PA),
         "",
         "Making very little noise; peaceful",
         ["Very cold and empty", "Filled with many people", "Colourful and bright"], "s4q1"),
    mc_q(ctx("brave",
             "She was <u>brave</u>. The other children watched from a distance.",
             PA),
         "",
         "Not afraid; ready to do something difficult",
         ["Very tired after a long journey", "Shy and unwilling to speak", "Happy and laughing"], "s4q2"),
    mc_q(ctx("ancient",
             "The falaj is an <u>ancient</u> water channel.",
             PB),
         "",
         "Very old; from long ago",
         ["Very long and wide", "Built very recently", "Made of metal"], "s4q3"),
    mc_q(ctx("tradition",
             "It is an important Omani <u>tradition</u>.",
             PB),
         "",
         "A custom or way of doing something passed down through generations",
         ["A new invention", "A type of market", "A mountain road"], "s4q4"),
    mc_q(ctx("patient",
             "Sophia was <u>patient</u> with her students.",
             PC),
         "",
         "Able to wait calmly without becoming angry or upset",
         ["Very strict and serious", "Always in a hurry", "Loud and energetic"], "s4q5"),
    mc_q(ctx("trust",
             "Trust grew slowly in the classroom.",
             PC),
         "",
         "A feeling of confidence that someone is honest and reliable",
         ["A feeling of fear", "A type of lesson plan", "A loud argument"], "s4q6"),
    mc_q(ctx("harvest",
             "It was almost time for the date <u>harvest</u>.",
             PD),
         "",
         "The time when crops are collected from the fields",
         ["The planting of new seeds", "The building of a new market",
          "A type of vehicle"], "s4q7"),
    mc_q(ctx("wisdom",
             "The village elder watched everything with <u>wisdom</u> and patience.",
             PD),
         "",
         "Deep knowledge and good judgment from experience",
         ["Great physical strength", "A feeling of anger", "Loud and confident speech"], "s4q8"),
]

save_h5p("R04_Vocabulary_in_Context", "H5P.QuestionSet",
         qs_wrap("Stage 4 — Vocabulary in Context",
                 "Read each sentence from the story. "
                 "Choose the correct meaning of the highlighted word.",
                 s4_qs, 70))

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 5 — Read & True/False
# ═════════════════════════════════════════════════════════════════════════════
log("\n[5] Generating R05_True_or_False...")

s5_qs = [
    tf_q(PA, "John had visited many Omani villages before arriving in Al-Qurawashiyah.",
         False, "The passage says he had NEVER visited an Omani village before.", "s5q1"),
    tf_q(PA, "The village of Al-Qurawashiyah had long stone walls covered with bougainvillea.",
         True, "The passage clearly states this.", "s5q2"),
    tf_q(PA, "Thuraya was shy and stayed far away from John when he arrived.",
         False, "Thuraya was BRAVE and came FORWARD to welcome John.", "s5q3"),
    tf_q(PB, "The falaj brings water from the sea to the village.",
         False, "The falaj brings water from the MOUNTAINS, not the sea.", "s5q4"),
    tf_q(PB, "The falaj is a modern system built in recent years.",
         False, "The falaj is ANCIENT — it has been used for thousands of years.", "s5q5"),
    tf_q(PC, "Sophia taught the children English every morning.",
         True, "The passage confirms this.", "s5q6"),
    tf_q(PC, "Khamees talked a lot and was the loudest child in class.",
         False, "Khamees was the QUIETEST child, but he listened carefully.", "s5q7"),
    tf_q(PD, "The date harvest was already finished when they visited the market.",
         False, "It was ALMOST TIME for the harvest — it had not happened yet.", "s5q8"),
    tf_q(PD, "Uncle Nasser drove the children to the market in a truck.",
         True, "The passage says Uncle Nasser drove them in his big truck.", "s5q9"),
    tf_q(PD, "The village elder showed wisdom as he watched the market.",
         True, "The passage says he watched with wisdom and patience.", "s5q10"),
]

save_h5p("R05_True_or_False", "H5P.QuestionSet",
         qs_wrap("Stage 5 — Read & True/False",
                 "Read each passage carefully. Then decide: is the statement True or False? "
                 "Find your evidence in the text!",
                 s5_qs, 70))

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 6 — Read Aloud: Pronunciation (SpeakTheWordsSet + custom HTML trainer)
# ═════════════════════════════════════════════════════════════════════════════
log("\n[6] Generating R06_Read_Aloud_Pronunciation...")

SPEAK_SENTS = [
    ("ryan",   "John arrived in the village of Al-Qurawashiyah.",    "arrive_s"),
    ("ryan",   "The falaj is an ancient water channel.",             "falaj_s"),
    ("amy",    "Sophia was very patient with her students.",         "patient_s"),
    ("alan",   "I had never seen anything like this before.",        "curious_s"),
    ("ryan",   "Without the falaj, the date palms could not grow.",  "palms_s"),
    ("lessac", "You are welcome here, in our village.",              "welcome_s"),
    ("ryan",   "Trust grew slowly in the classroom.",                "trust_s"),
    ("ryan",   "The village elder watched with wisdom and patience.", "wisdom_s"),
]

s6_media = {}
s6_questions = []

for voice, sent, key in SPEAK_SENTS:
    wav_name = f"speak_{key}.wav"
    wav_path = os.path.join(TMP, wav_name)
    rel      = f"audio/{wav_name}"
    ok = tts(sent, wav_path, voice)
    if ok:
        s6_media[rel] = wav_bytes(wav_path)
        log(f"  ok  {sent[:45]}")
    else:
        log(f"  WARN {sent[:45]}")
        rel = None
    item = {
        "sentence": sent,
        "sampleSolution": sent,
    }
    if rel:
        item["audio"] = {"path": rel, "mime": "audio/wav"}
    s6_questions.append(item)

save_h5p("R06_Read_Aloud_Pronunciation", "H5P.SpeakTheWordsSet", {
    "introductionText": ("<p>\U0001f3a7\U0001f4d6 <strong>Read Aloud — Pronunciation Practice</strong><br>"
                         "Listen to each sentence. Then click <em>Speak</em> and read it aloud. "
                         "The system will check your pronunciation!</p>"),
    "questions": s6_questions,
    "overallFeedback": [
        {"from": 0,  "to": 49,  "feedback": "Keep practising! Listen again and try once more."},
        {"from": 50, "to": 79,  "feedback": "Good pronunciation! \U0001f334 Keep going."},
        {"from": 80, "to": 100, "feedback": "Excellent reading! \u2b50 You sound like a native speaker!"}
    ],
    "l10n": {
        "speakButton": "Speak", "listenButton": "Listen",
        "nextQuestion": "Next",  "prevQuestion": "Previous",
        "retryButton": "Retry",  "score": "Score"
    }
}, s6_media)

# ── Also save custom HTML pronunciation trainer ──────────────────────────────
s6_audio_b64 = {}
for rel, data in s6_media.items():
    s6_audio_b64[os.path.basename(rel)] = base64.b64encode(data).decode()

SPEAK_DATA = json.dumps([
    {"sentence": s, "audio": f"speak_{k}.wav"}
    for (_, s, k) in SPEAK_SENTS
], ensure_ascii=False)

AUDIO_DATA_JS = json.dumps(s6_audio_b64, ensure_ascii=False)

# Build the HTML using string concatenation to avoid f-string brace conflicts
PRONUN_TRAINER = (
"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Under The Palm Tree — Read Aloud Trainer</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f5f0e8;color:#3d1a0a;
     min-height:100vh;display:flex;align-items:center;justify-content:center}
.shell{width:100%;max-width:720px;padding:20px}
.card{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(61,26,10,.13);padding:32px;margin-bottom:20px}
h1{font-size:1.5rem;color:#5a3010;margin-bottom:6px}
.subtitle{color:#a07850;font-size:.95rem;margin-bottom:24px}
.progress-bar{height:8px;background:#c8b89a;border-radius:4px;overflow:hidden;margin-bottom:22px}
.progress-fill{height:100%;background:#5a3010;border-radius:4px;transition:width .4s}
.q-num{font-size:.85rem;color:#a07850;margin-bottom:10px}
.sentence-box{background:#fdf8f0;border:2px solid #c8b89a;border-radius:12px;
              padding:18px 22px;font-size:1.25rem;font-weight:600;
              line-height:1.8;margin-bottom:22px;letter-spacing:.5px;min-height:70px}
.word{display:inline-block;padding:2px 4px;border-radius:4px;transition:background .3s}
.word.correct{background:#c8f0c8;color:#1a5c1a}
.word.wrong{background:#f5d5d0;color:#7a1a1a;text-decoration:underline wavy #c0392b}
.word.missed{background:#ffe8b0;color:#7a4000}
.controls{display:flex;gap:12px;margin-bottom:18px;flex-wrap:wrap}
.btn{display:flex;align-items:center;gap:8px;padding:11px 22px;border:none;
     border-radius:10px;font-size:1rem;font-weight:600;cursor:pointer;transition:all .2s}
.btn-listen{background:#5a3010;color:#fff}
.btn-listen:hover{background:#3d1a0a}
.btn-speak{background:#2d7a2d;color:#fff}
.btn-speak:hover{background:#1a5c1a}
.btn-speak.recording{background:#c0392b;animation:pulse 1s infinite}
.btn-speak:disabled{background:#c8b89a;cursor:not-allowed}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}
.btn-next{background:#a07850;color:#fff}
.btn-next:hover{background:#7a5830}
.result-row{display:flex;align-items:center;justify-content:space-between;
            background:#fdf8f0;border-radius:10px;padding:14px 18px;margin-bottom:14px}
.score-badge{font-size:1.5rem;font-weight:700;color:#5a3010}
.score-label{font-size:.9rem;color:#a07850}
.bar-wrap{height:12px;background:#c8b89a;border-radius:6px;overflow:hidden;margin-top:6px;width:180px}
.bar-fill{height:100%;border-radius:6px;transition:width .6s}
.status{font-size:.95rem;margin-bottom:6px;min-height:26px;color:#5a3010}
.heard-box{margin-top:14px;padding:12px 16px;background:#f5f0e8;border-radius:8px;
           font-size:.9rem;color:#7a5830;display:none}
.heard-box.show{display:block}
/* Results */
.results-card{text-align:center;padding:36px}
.big-score{font-size:3rem;font-weight:700;color:#5a3010}
.big-score span{font-size:1.2rem;color:#a07850;font-weight:400}
.score-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:24px 0;text-align:left}
.score-item{background:#fdf8f0;border-radius:10px;padding:14px}
.score-item .lbl{font-size:.8rem;color:#a07850;margin-bottom:4px}
.score-item .val{font-size:1.3rem;font-weight:700}
.val.great{color:#2d7a2d}
.val.ok{color:#e67e22}
.val.poor{color:#c0392b}
.retry-btn{background:#5a3010;color:#fff;border:none;border-radius:10px;
           padding:13px 36px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:10px}
.retry-btn:hover{background:#3d1a0a}
.not-supported{background:#f5d5d0;border:1px solid #c0392b;border-radius:10px;
               padding:14px;color:#7a1a1a;margin-bottom:18px;display:none}
</style>
</head>
<body>
<div class="shell">
  <div class="card" id="quiz-card">
    <h1>&#128214;&#127895; Read Aloud — Pronunciation Trainer</h1>
    <p class="subtitle">Under The Palm Tree &nbsp;|&nbsp; Stage 6</p>
    <div class="not-supported" id="no-support">
      &#9888; Your browser does not support speech recognition.
      Please use Google Chrome for this activity.
    </div>
    <div class="progress-bar"><div class="progress-fill" id="prog" style="width:0%"></div></div>
    <div id="q-area"></div>
  </div>
  <div class="card results-card" id="res-card" style="display:none">
    <h1 style="margin-bottom:16px">&#127895; Results</h1>
    <div class="big-score" id="big-sc">0<span> / """ + str(len(SPEAK_SENTS)) + """</span></div>
    <div class="score-grid">
      <div class="score-item"><div class="lbl">Pronunciation Score</div>
        <div class="val" id="pron-val">0%</div></div>
      <div class="score-item"><div class="lbl">Sentences Attempted</div>
        <div class="val" id="att-val">0</div></div>
      <div class="score-item"><div class="lbl">Words Correct</div>
        <div class="val" id="wc-val">0</div></div>
      <div class="score-item"><div class="lbl">Best Sentence</div>
        <div class="val" id="best-val" style="font-size:.95rem">—</div></div>
    </div>
    <div id="detail-area"></div>
    <button class="retry-btn" onclick="restart()">&#8635; Try Again</button>
  </div>
</div>
<script>
var SENTENCES = """ + SPEAK_DATA + """;
var AUDIO_B64  = """ + AUDIO_DATA_JS + """;
var cur=0, results=[], totalWords=0, correctWords=0;
var recog=null, recording=false, curAudio=null;

function initRecog(){
  var SRClass=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SRClass){document.getElementById('no-support').style.display='block';return false;}
  recog=new SRClass();
  recog.lang='en-US';
  recog.continuous=false;
  recog.interimResults=false;
  recog.onresult=function(e){
    var spoken=e.results[0][0].transcript;
    var conf=Math.round(e.results[0][0].confidence*100);
    handleResult(spoken,conf);
  };
  recog.onerror=function(e){
    setStatus('Could not hear you. Please try again. ('+e.error+')');
    stopRecording();
  };
  recog.onend=function(){stopRecording();};
  return true;
}

function restart(){
  cur=0;results=[];totalWords=0;correctWords=0;
  document.getElementById('quiz-card').style.display='';
  document.getElementById('res-card').style.display='none';
  renderQ();
}

function setProgress(){
  document.getElementById('prog').style.width=((cur/SENTENCES.length)*100)+'%';
}

function playAudio(name){
  if(curAudio){curAudio.pause();curAudio.currentTime=0;}
  if(!AUDIO_B64[name])return;
  curAudio=new Audio('data:audio/wav;base64,'+AUDIO_B64[name]);
  curAudio.play();
}

function renderQ(){
  setProgress();
  var q=SENTENCES[cur];
  var words=q.sentence.split(' ');
  var wordSpans=words.map(function(w,i){
    return '<span class="word" id="w'+i+'">'+w+'</span>';
  }).join(' ');

  var html='<div class="q-num">Sentence '+(cur+1)+' of '+SENTENCES.length+'</div>';
  html+='<div class="sentence-box" id="sent-box">'+wordSpans+'</div>';
  html+='<div class="controls">';
  html+='<button class="btn btn-listen" onclick="playAudio(\''+q.audio+'\')">&#9654; Listen First</button>';
  html+='<button class="btn btn-speak" id="btn-speak" onclick="toggleSpeak()">&#127897; Speak Now</button>';
  html+='</div>';
  html+='<div class="status" id="status">&#128075; Press <strong>Speak Now</strong> and read the sentence aloud.</div>';
  html+='<div class="heard-box" id="heard-box"></div>';
  html+='<div style="display:flex;justify-content:flex-end;margin-top:18px">';
  html+='<button class="btn btn-next" id="btn-next" onclick="nextQ()">Next &rarr;</button></div>';
  document.getElementById('q-area').innerHTML=html;
  setTimeout(function(){playAudio(q.audio);},400);
}

function toggleSpeak(){
  if(recording){stopRecording();return;}
  if(!recog&&!initRecog())return;
  try{recog.start();}catch(e){
    recog=null;initRecog();
    try{recog.start();}catch(e2){setStatus('Error starting microphone: '+e2.message);}
  }
  recording=true;
  var btn=document.getElementById('btn-speak');
  btn.textContent='&#9632; Stop';
  btn.classList.add('recording');
  setStatus('&#128308; Recording... speak clearly and slowly.');
}

function stopRecording(){
  recording=false;
  var btn=document.getElementById('btn-speak');
  if(btn){btn.textContent='&#127897; Speak Again';btn.classList.remove('recording');}
  if(recog){try{recog.stop();}catch(e){}}
}

function levenshtein(a,b){
  var m=a.length,n=b.length,dp=[];
  for(var i=0;i<=m;i++){dp[i]=[i];for(var j=1;j<=n;j++)dp[i][j]=0;}
  for(var j=0;j<=n;j++)dp[0][j]=j;
  for(var i=1;i<=m;i++)for(var j=1;j<=n;j++){
    if(a[i-1]===b[j-1])dp[i][j]=dp[i-1][j-1];
    else dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  }
  return dp[m][n];
}

function cleanWord(w){return w.toLowerCase().replace(/[^a-z']/g,'');}

function handleResult(spoken,conf){
  var q=SENTENCES[cur];
  var targetWords=q.sentence.replace(/[.,!?;:]/g,'').split(' ').map(cleanWord);
  var spokenWords=spoken.replace(/[.,!?;:]/g,'').split(' ').map(cleanWord);
  var correct=0,wResults=[];
  targetWords.forEach(function(tw,i){
    var sw=spokenWords[i]||'';
    var dist=levenshtein(tw,sw);
    var ok=dist<=1;
    if(ok)correct++;
    wResults.push({target:tw,spoken:sw,ok:ok,missed:!sw});
  });
  var pct=Math.round((correct/targetWords.length)*100);
  totalWords+=targetWords.length;
  correctWords+=correct;
  results.push({sentence:q.sentence,spoken:spoken,pct:pct,wResults:wResults});

  // colour the word spans
  wResults.forEach(function(wr,i){
    var el=document.getElementById('w'+i);
    if(el){
      el.className='word '+(wr.ok?'correct':(wr.missed?'missed':'wrong'));
      if(!wr.ok&&!wr.missed)el.title='You said: '+wr.spoken;
    }
  });

  var hb=document.getElementById('heard-box');
  hb.className='heard-box show';
  hb.innerHTML='&#128172; <em>Heard: "'+spoken+'"</em> &nbsp; Score: <strong>'+pct+'%</strong>';
  setStatus(pct>=80?'&#128994; Excellent! '+pct+'% correct.'
           :pct>=60?'&#128992; Good try! '+pct+'% — listen and try again.'
           :'&#128308; '+pct+'% — keep practising!');
}

function setStatus(msg){var el=document.getElementById('status');if(el)el.innerHTML=msg;}

function nextQ(){
  cur++;
  if(cur>=SENTENCES.length){showResults();return;}
  renderQ();
}

function showResults(){
  document.getElementById('quiz-card').style.display='none';
  var rc=document.getElementById('res-card');
  rc.style.display='';
  var attempted=results.length;
  var avgPct=attempted?Math.round(results.reduce(function(s,r){return s+r.pct;},0)/attempted):0;
  var best=results.reduce(function(b,r){return r.pct>b.pct?r:b;},{pct:0,sentence:'—'});
  document.getElementById('big-sc').innerHTML=attempted+'<span> / '+SENTENCES.length+'</span>';
  document.getElementById('pron-val').textContent=avgPct+'%';
  document.getElementById('pron-val').className='val '+(avgPct>=80?'great':avgPct>=60?'ok':'poor');
  document.getElementById('att-val').textContent=attempted;
  document.getElementById('wc-val').textContent=correctWords+' / '+totalWords;
  document.getElementById('best-val').textContent=best.sentence.substring(0,40)+'...';
  var det='<h3 style="margin-bottom:12px;color:#5a3010">Sentence Breakdown</h3>';
  results.forEach(function(r,i){
    var col=r.pct>=80?'#2d7a2d':r.pct>=60?'#e67e22':'#c0392b';
    det+='<div class="result-row"><div><div style="font-size:.9rem;margin-bottom:4px">'
        +(i+1)+'. '+r.sentence+'</div>'
        +'<div style="font-size:.8rem;color:#a07850">You said: "'+r.spoken+'"</div>'
        +'<div class="bar-wrap"><div class="bar-fill" style="width:'+r.pct+'%;background:'+col+'"></div></div></div>'
        +'<div class="score-badge" style="color:'+col+'">'+r.pct+'%</div></div>';
  });
  document.getElementById('detail-area').innerHTML=det;
  document.getElementById('prog').style.width='100%';
}

initRecog();
renderQ();
</script>
</body>
</html>"""
)

html_path = os.path.join(OUT, "R06_Pronunciation_Trainer.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(PRONUN_TRAINER)
log(f"  Saved: R06_Pronunciation_Trainer.html  ({os.path.getsize(html_path)//1024} KB)")

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 7 — Deep Reading: Inference & Analysis
# ═════════════════════════════════════════════════════════════════════════════
log("\n[7] Generating R07_Deep_Reading...")

s7_qs = [
    mc_q(PA,
         "WHY did the other children watch from a distance when John arrived?",
         "They were shy and unsure about the stranger",
         ["They were playing a game", "They did not like visitors", "They were waiting for Sophia"], "s7q1"),
    mc_q(PA,
         "What does John arriving in AUTUMN tell us about the story?",
         "The school year had just begun — a time of new beginnings",
         ["John preferred cold weather", "The harvest was already finished",
          "The falaj was dry in summer"], "s7q2"),
    mc_q(PB,
         "Why does the writer say 'the water ran SILENTLY through the stone channel'?",
         "To create a calm, peaceful image of the falaj",
         ["To show the falaj was broken and slow", "To compare it with a noisy market",
          "To show that the falaj was very deep"], "s7q3"),
    mc_q(PB,
         "What does the falaj REPRESENT in the story, beyond just water?",
         "The deep roots of Omani tradition and survival",
         ["A modern engineering achievement", "A place where children play",
          "A border between two villages"], "s7q4"),
    mc_q(PC,
         "WHY is it significant that Sophia wrote letters 'in the dirt'?",
         "It shows that learning can happen anywhere, even without a classroom",
         ["It shows Sophia had forgotten her books", "It means the school had no money",
          "It shows the children were learning to draw"], "s7q5"),
    mc_q(PC,
         "Khamees was quiet but 'listened to every word.' What does this suggest about him?",
         "He was thoughtful and deeply engaged in learning",
         ["He was bored and wanted to go home", "He did not understand English",
          "He was afraid of Sophia"], "s7q6"),
    mc_q(PD,
         "Why does the writer mention that the 'palm trees were heavy with fruit'?",
         "To show the richness and abundance of village life at harvest time",
         ["To show the trees were about to fall", "To describe what the market sold",
          "To explain why Uncle Nasser used a truck"], "s7q7"),
    mc_q(PD,
         "What is the most likely THEME of the story based on all four passages?",
         "Two worlds — old and new — learning to understand each other",
         ["A teacher who fails her students", "A market village with no traditions",
          "A man who wants to escape from Oman"], "s7q8"),
]

save_h5p("R07_Deep_Reading", "H5P.QuestionSet",
         qs_wrap("Stage 7 — Deep Reading: Inference & Analysis",
                 "Read the passages carefully. These questions ask you to THINK DEEPLY — "
                 "about WHY characters do things, WHAT words suggest, and the THEMES of the story.",
                 s7_qs, 60))

# ═════════════════════════════════════════════════════════════════════════════
# STAGE 8 — Final Combined SCORM: Reading + Listening + Pronunciation
# ═════════════════════════════════════════════════════════════════════════════
log("\n[8] Generating R08_Final_Combined_SCORM...")

# Generate listening clips for the SCORM combined test
S8_LISTEN = [
    ("ryan",   "The falaj is an ancient water channel in Oman.",
     "The falaj is an ancient water channel in Oman.",
     ["The falaj is a modern road in Oman.", "The market is an ancient building in Oman.",
      "The falaj is a type of date palm tree."]),
    ("alan",   "I had never seen anything so beautiful in my life.",
     "John was amazed by what he saw.",
     ["John had seen it many times before.", "John was not interested in the village.",
      "John wanted to return to London immediately."]),
    ("amy",    "Trust takes time. We must be patient with each other.",
     "Sophia believes trust develops slowly",
     ["Sophia thinks students learn very fast.", "Sophia is not patient with anyone.",
      "Sophia says trust is not important."]),
    ("ryan",   "The village elder had watched over Al-Qurawashiyah for fifty years.",
     "The village elder had protected the village for a long time.",
     ["The elder had just arrived in the village.", "The elder was younger than the students.",
      "The elder watched from outside the village."]),
]

s8_listen_audio = {}
s8_listen_data  = []
for i, (voice, spoken, correct, wrongs) in enumerate(S8_LISTEN):
    wav_name = f"s8l_{i}.wav"
    wav_path = os.path.join(TMP, wav_name)
    ok = tts(spoken, wav_path, voice)
    if ok:
        s8_listen_audio[wav_name] = base64.b64encode(wav_bytes(wav_path)).decode()
        log(f"  ok  Listen Q{i+1}")
    else:
        log(f"  WARN Listen Q{i+1}")
    opts = [{"text": correct, "correct": True}] + \
           [{"text": w, "correct": False} for w in wrongs]
    random.shuffle(opts)
    s8_listen_data.append({
        "type": "listen",
        "audio": wav_name if ok else None,
        "spoken": spoken,
        "question": "What does this sentence tell us?",
        "options": opts
    })

# Pronunciation sentences for Stage 8
S8_SPEAK = [
    ("ryan",  "The falaj is an ancient water channel.", "s8sp_0"),
    ("amy",   "Sophia was patient with her students.",  "s8sp_1"),
]
s8_speak_audio = {}
s8_speak_data  = []
for voice, sent, key in S8_SPEAK:
    wav_name = f"{key}.wav"
    wav_path = os.path.join(TMP, wav_name)
    ok = tts(sent, wav_path, voice)
    if ok:
        s8_speak_audio[wav_name] = base64.b64encode(wav_bytes(wav_path)).decode()
        log(f"  ok  Speak: {sent[:40]}")
    else:
        log(f"  WARN Speak: {sent[:40]}")
    s8_speak_data.append({"sentence": sent, "audio": wav_name if ok else None})

# Reading comprehension questions (no audio — passage shown in HTML)
S8_READ = [
    {"question": "What is the falaj?",
     "correct":  "An ancient water channel that carries water from the mountains",
     "wrongs":   ["A type of date palm tree", "A traditional market in Oman",
                  "A stone wall around the village"]},
    {"question": "What does the word 'patient' mean in the story?",
     "correct":  "Able to wait calmly without becoming angry",
     "wrongs":   ["Always in a hurry", "Very strict and serious", "Loud and energetic"]},
    {"question": "Which character was the BRAVEST in the classroom?",
     "correct":  "Thuraya",
     "wrongs":   ["Khamees", "Uncle Nasser", "The village elder"]},
    {"question": "What does the falaj represent in the story?",
     "correct":  "The deep traditions and survival of Omani village life",
     "wrongs":   ["A modern engineering project", "A place where children play",
                  "A market near the mountains"]},
    {"question": "Why did Sophia write letters in the dirt?",
     "correct":  "To show that learning can happen anywhere",
     "wrongs":   ["She had forgotten her books", "The school had no money",
                  "The children liked drawing in the dirt"]},
]

S8_READ_DATA = []
for i, rq in enumerate(S8_READ):
    opts = [{"text": rq["correct"], "correct": True}] + \
           [{"text": w, "correct": False} for w in rq["wrongs"]]
    random.shuffle(opts)
    S8_READ_DATA.append({"type": "read", "question": rq["question"], "options": opts})

ALL_AUDIO_B64 = {}
ALL_AUDIO_B64.update(s8_listen_audio)
ALL_AUDIO_B64.update(s8_speak_audio)

PASSAGE_HTML = """
<div style='background:#fdf8f0;border-left:4px solid #a07850;padding:16px 20px;
border-radius:0 8px 8px 0;font-style:italic;line-height:1.8;margin-bottom:20px;font-size:.97rem'>
<strong>&#128214; Reading Passages</strong><br><br>
<strong>The Arrival:</strong> John arrived in Al-Qurawashiyah in the autumn of 1973.
The village was quiet and green. He had never visited an Omani village before.
A young girl named Thuraya came forward and welcomed him bravely.<br><br>
<strong>The Falaj:</strong> The falaj is an ancient water channel that carries water from
the mountains to the village gardens. It has been used for thousands of years.
It is an important Omani tradition. Without the falaj, the date palms could not grow.<br><br>
<strong>The Classroom:</strong> Sophia was patient with her students. She taught English
every morning. Thuraya spoke first. Khamees was the quietest child — but he listened
to every word. Sophia wrote letters in the dirt with a stick. Trust grew slowly.
</div>"""

READ_JSON   = json.dumps(S8_READ_DATA,  ensure_ascii=False)
LISTEN_JSON = json.dumps(s8_listen_data, ensure_ascii=False)
SPEAK_JSON  = json.dumps(s8_speak_data,  ensure_ascii=False)
AUDIO_JSON  = json.dumps(ALL_AUDIO_B64,  ensure_ascii=False)

SCORM8_HTML = ("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Under The Palm Tree — Final Combined Test</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f5f0e8;
     color:#3d1a0a;min-height:100vh}
.shell{width:100%;max-width:800px;margin:0 auto;padding:20px}
.card{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(61,26,10,.12);
      padding:28px 32px;margin-bottom:20px}
h1{font-size:1.5rem;color:#5a3010;margin-bottom:6px}
.subtitle{color:#a07850;font-size:.9rem;margin-bottom:18px}
.section-badge{display:inline-block;padding:5px 16px;border-radius:20px;
               font-size:.8rem;font-weight:700;margin-bottom:16px}
.badge-read{background:#d4e8f0;color:#1a4a7a}
.badge-listen{background:#d4f0d4;color:#1a5c1a}
.badge-speak{background:#fde8d0;color:#7a3a00}
.passage-box{background:#fdf8f0;border-left:4px solid #a07850;padding:14px 18px;
             border-radius:0 8px 8px 0;font-style:italic;line-height:1.8;
             margin-bottom:20px;font-size:.95rem}
.progress-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.progress-bar{height:8px;background:#c8b89a;border-radius:4px;overflow:hidden;margin-bottom:24px}
.progress-fill{height:100%;background:#5a3010;border-radius:4px;transition:width .4s}
.q-label{font-size:.82rem;color:#a07850}
.q-text{font-size:1.05rem;font-weight:600;margin-bottom:16px;line-height:1.5}
.opts{display:flex;flex-direction:column;gap:9px;margin-bottom:18px}
.opt{display:flex;align-items:center;gap:12px;background:#f5f0e8;border:2px solid #c8b89a;
     border-radius:10px;padding:11px 15px;cursor:pointer;font-size:.97rem;transition:all .2s}
.opt:hover{border-color:#5a3010;background:#ede8dc}
.opt.selected{border-color:#5a3010;background:#e8dcc8}
.opt.correct{border-color:#2d7a2d;background:#d4f0d4 !important}
.opt.wrong{border-color:#c0392b;background:#f5d5d0 !important}
.tf-row{display:flex;gap:12px;margin-bottom:18px}
.tf-btn{flex:1;padding:13px;border:2px solid #c8b89a;border-radius:10px;
        background:#f5f0e8;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all .2s}
.tf-btn:hover,.tf-btn.selected{border-color:#5a3010;background:#e8dcc8}
.tf-btn.correct{border-color:#2d7a2d;background:#d4f0d4 !important;color:#1a5c1a}
.tf-btn.wrong{border-color:#c0392b;background:#f5d5d0 !important;color:#7a1a1a}
.feedback{border-radius:10px;padding:11px 15px;font-size:.93rem;margin-bottom:14px;display:none}
.feedback.show{display:block}
.feedback.ok{background:#d4f0d4;color:#1a5c1a;border:1px solid #2d7a2d}
.feedback.bad{background:#f5d5d0;color:#7a1a1a;border:1px solid #c0392b}
.audio-btn{display:flex;align-items:center;gap:8px;background:#5a3010;color:#fff;
           border:none;border-radius:10px;padding:10px 20px;font-size:.97rem;
           cursor:pointer;margin-bottom:18px;transition:background .2s}
.audio-btn:hover{background:#3d1a0a}
.speak-box{background:#fdf8f0;border:2px solid #c8b89a;border-radius:12px;
           padding:16px 20px;font-size:1.15rem;font-weight:600;
           line-height:1.8;margin-bottom:16px;letter-spacing:.4px}
.word{display:inline-block;padding:2px 4px;border-radius:4px;transition:background .3s}
.word.correct{background:#c8f0c8;color:#1a5c1a}
.word.wrong{background:#f5d5d0;color:#7a1a1a;text-decoration:underline wavy #c0392b}
.word.missed{background:#ffe8b0;color:#7a4000}
.speak-ctrl{display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap}
.btn{padding:10px 22px;border:none;border-radius:10px;font-size:.95rem;
     font-weight:600;cursor:pointer;transition:all .2s}
.btn-speak{background:#2d7a2d;color:#fff}
.btn-speak:hover{background:#1a5c1a}
.btn-speak.rec{background:#c0392b;animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}
.speak-status{font-size:.9rem;color:#5a3010;min-height:24px;margin-bottom:8px}
.heard-line{font-size:.85rem;color:#a07850;font-style:italic}
.nav-row{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}
.btn-check{background:#5a3010;color:#fff}
.btn-check:hover{background:#3d1a0a}
.btn-check:disabled{background:#c8b89a;cursor:not-allowed}
.btn-next{background:#a07850;color:#fff}
.btn-next:hover{background:#7a5830}
.btn-next:disabled{background:#c8b89a;cursor:not-allowed}
.btn-skip{background:#f5f0e8;color:#a07850;border:2px solid #c8b89a}
/* results */
.res-shell{padding:30px 0}
.skill-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin:20px 0}
.skill-box{background:#fdf8f0;border-radius:12px;padding:16px;text-align:center}
.skill-score{font-size:2rem;font-weight:700}
.skill-lbl{font-size:.8rem;color:#a07850;margin-top:4px}
.great{color:#2d7a2d}.ok{color:#e67e22}.poor{color:#c0392b}
.total-circle{width:130px;height:130px;border-radius:50%;background:#5a3010;
              color:#f5f0e8;display:flex;flex-direction:column;align-items:center;
              justify-content:center;margin:0 auto 20px;font-size:2.2rem;font-weight:700}
.total-circle small{font-size:.85rem;font-weight:400;opacity:.8}
.detail-table{width:100%;border-collapse:collapse;margin-top:16px;font-size:.88rem}
.detail-table th{background:#f5f0e8;padding:8px 12px;text-align:left;color:#5a3010;font-weight:700}
.detail-table td{padding:8px 12px;border-bottom:1px solid #e0d8cc}
.badge-sm{display:inline-block;padding:3px 10px;border-radius:12px;font-size:.78rem;font-weight:700}
.badge-sm.pass{background:#d4f0d4;color:#1a5c1a}
.badge-sm.fail{background:#f5d5d0;color:#7a1a1a}
.retry-btn{background:#5a3010;color:#fff;border:none;border-radius:10px;
           padding:13px 36px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:16px}
.retry-btn:hover{background:#3d1a0a}
.no-support{background:#f5d5d0;border:1px solid #c0392b;border-radius:10px;
            padding:12px;color:#7a1a1a;margin-bottom:14px;display:none}
</style>
</head>
<body>
<div class="shell">
<div class="card" id="main-card">
  <h1>&#127795; Under The Palm Tree</h1>
  <p class="subtitle">Stage 8 — Final Combined Test &nbsp;|&nbsp; Reading + Listening + Pronunciation</p>
  <div class="no-support" id="no-sup">&#9888; Speech recognition not available. Pronunciation section will be skipped. Use Chrome for full experience.</div>
  <div class="progress-row">
    <span class="q-label" id="prog-label">Question 1 of 11</span>
    <span class="q-label" id="score-label">Score: 0</span>
  </div>
  <div class="progress-bar"><div class="progress-fill" id="prog-bar" style="width:0%"></div></div>
  <div id="q-area"></div>
</div>
<div class="card res-shell" id="res-card" style="display:none">
  <h1 style="text-align:center;margin-bottom:20px">&#127795; Final Results</h1>
  <div class="total-circle" id="tot-circle">
    <span id="tot-num">0</span><small id="tot-den">/ 11</small>
  </div>
  <div class="skill-grid" id="skill-grid"></div>
  <div id="feedback-msg" style="text-align:center;font-size:1.1rem;font-weight:600;margin-bottom:8px"></div>
  <div id="feedback-sub" style="text-align:center;color:#a07850;margin-bottom:20px"></div>
  <table class="detail-table">
    <thead><tr><th>#</th><th>Type</th><th>Question</th><th>Your Answer</th><th>Result</th></tr></thead>
    <tbody id="det-body"></tbody>
  </table>
  <div style="text-align:center">
    <button class="retry-btn" onclick="restart()">&#8635; Try Again</button>
  </div>
</div>
</div>
<script>
/* SCORM */
var API=null;
function findAPI(w){for(var i=0;i<7;i++){if(w.API)return w.API;if(!w.parent||w.parent===w)break;w=w.parent;}return null;}
function initSCORM(){API=findAPI(window);if(API){API.LMSInitialize('');API.LMSSetValue('cmi.core.lesson_status','incomplete');API.LMSCommit('');}}
function finishSCORM(raw,tot){
  if(!API)return;
  API.LMSSetValue('cmi.core.score.raw',String(raw));
  API.LMSSetValue('cmi.core.score.min','0');
  API.LMSSetValue('cmi.core.score.max',String(tot));
  var pct=Math.round((raw/tot)*100);
  API.LMSSetValue('cmi.core.lesson_status',pct>=70?'passed':'failed');
  API.LMSCommit('');API.LMSFinish('');
}
window.addEventListener('load',initSCORM);

var READ_QS   = """ + READ_JSON + """;
var LISTEN_QS = """ + LISTEN_JSON + """;
var SPEAK_QS  = """ + SPEAK_JSON + """;
var AUDIO_B64 = """ + AUDIO_JSON + """;

/* Build master question list: read, listen, speak */
var MASTER_QS=[];
READ_QS.forEach(function(q){MASTER_QS.push(q);});
LISTEN_QS.forEach(function(q){MASTER_QS.push(q);});
SPEAK_QS.forEach(function(q){MASTER_QS.push(q);});
var TOTAL=MASTER_QS.length;

var cur=0,score=0,speakScore=0,speakTotal=0,answered=[];
var recog=null,recording=false,curAudio=null,speakDone=false,sel=null;

function initRecog(){
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){document.getElementById('no-sup').style.display='block';return false;}
  recog=new SR();recog.lang='en-US';recog.continuous=false;recog.interimResults=false;
  recog.onresult=function(e){handleSpoken(e.results[0][0].transcript);};
  recog.onerror=function(e){stopRecog();setSpeakStatus('Error: '+e.error+'. Please try again.');};
  recog.onend=function(){stopRecog();};
  return true;
}

function restart(){cur=0;score=0;speakScore=0;speakTotal=0;answered=[];sel=null;speakDone=false;
  document.getElementById('main-card').style.display='';
  document.getElementById('res-card').style.display='none';renderQ();}

function playAudio(name){
  if(curAudio){curAudio.pause();curAudio.currentTime=0;}
  if(!AUDIO_B64[name])return;
  curAudio=new Audio('data:audio/wav;base64,'+AUDIO_B64[name]);curAudio.play();
}

function setProgress(){
  var pct=Math.round((cur/TOTAL)*100);
  document.getElementById('prog-bar').style.width=pct+'%';
  document.getElementById('prog-label').textContent='Question '+(cur+1)+' of '+TOTAL;
  document.getElementById('score-label').textContent='Score: '+score;
}

function levenshtein(a,b){
  var m=a.length,n=b.length,dp=[];
  for(var i=0;i<=m;i++){dp[i]=[i];for(var j=1;j<=n;j++)dp[i][j]=0;}
  for(var j=0;j<=n;j++)dp[0][j]=j;
  for(var i=1;i<=m;i++)for(var j=1;j<=n;j++){
    if(a[i-1]===b[j-1])dp[i][j]=dp[i-1][j-1];
    else dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  }return dp[m][n];
}
function cleanW(w){return w.toLowerCase().replace(/[^a-z']/g,'');}

function renderQ(){
  setProgress();
  var q=MASTER_QS[cur];
  if(q.type==='read') renderRead(q);
  else if(q.type==='listen') renderListen(q);
  else if(q.type==='speak') renderSpeak(q);
}

function sectionBadge(type){
  if(type==='read')return'<span class="section-badge badge-read">&#128218; Reading Comprehension</span>';
  if(type==='listen')return'<span class="section-badge badge-listen">&#127925; Listening Comprehension</span>';
  return'<span class="section-badge badge-speak">&#127897; Read Aloud</span>';
}

function renderRead(q){
  var passage='<div class="passage-box">""" + PASSAGE_HTML.replace("'","&#39;").replace("\n"," ").replace('"','\\"') + """</div>';
  var html=sectionBadge('read')+passage;
  html+='<div class="q-text">'+q.question+'</div>';
  html+='<div class="opts" id="opts">';
  q.options.forEach(function(o,i){html+='<div class="opt" id="opt'+i+'" onclick="selOpt('+i+')">'+o.text+'</div>';});
  html+='</div>';
  html+='<div class="feedback" id="fb"></div>';
  html+='<div class="nav-row"><button class="btn btn-check" id="bc" onclick="checkMC()">Check</button>'
       +'<button class="btn btn-next" id="bn" onclick="nextQ()" disabled>Next &rarr;</button></div>';
  sel=null;document.getElementById('q-area').innerHTML=html;
}

function renderListen(q){
  var html=sectionBadge('listen');
  if(q.audio){
    html+='<button class="audio-btn" onclick="playAudio(\''+q.audio+'\')">&#9654; Play Audio</button>';
  }else{html+='<p style="font-style:italic;color:#a07850;margin-bottom:14px">[Audio not available]</p>';}
  html+='<div class="q-text">'+q.question+'</div>';
  html+='<div class="opts" id="opts">';
  q.options.forEach(function(o,i){html+='<div class="opt" id="opt'+i+'" onclick="selOpt('+i+')">'+o.text+'</div>';});
  html+='</div>';
  html+='<div class="feedback" id="fb"></div>';
  html+='<div class="nav-row"><button class="btn btn-check" id="bc" onclick="checkMC()">Check</button>'
       +'<button class="btn btn-next" id="bn" onclick="nextQ()" disabled>Next &rarr;</button></div>';
  sel=null;document.getElementById('q-area').innerHTML=html;
  if(q.audio)setTimeout(function(){playAudio(q.audio);},400);
}

function renderSpeak(q){
  speakDone=false;
  var words=q.sentence.split(' ');
  var spans=words.map(function(w,i){return'<span class="word" id="sw'+i+'">'+w+'</span>';}).join(' ');
  var html=sectionBadge('speak');
  if(q.audio){html+='<button class="audio-btn" onclick="playAudio(\''+q.audio+'\')">&#9654; Listen to Model</button>';}
  html+='<div class="speak-box" id="sp-box">'+spans+'</div>';
  html+='<div class="speak-ctrl">'
       +'<button class="btn btn-speak" id="bs" onclick="toggleSpeak()">&#127897; Speak</button>'
       +'</div>';
  html+='<div class="speak-status" id="sp-st">Listen to the model, then click Speak and read aloud.</div>';
  html+='<div class="heard-line" id="heard"></div>';
  html+='<div class="nav-row">'
       +'<button class="btn btn-skip" onclick="skipSpeak()">Skip</button>'
       +'<button class="btn btn-next" id="bn" onclick="nextQ()" disabled>Next &rarr;</button></div>';
  sel=null;document.getElementById('q-area').innerHTML=html;
  if(q.audio)setTimeout(function(){playAudio(q.audio);},400);
}

function selOpt(i){
  sel=i;
  document.querySelectorAll('.opt').forEach(function(e,j){e.classList.toggle('selected',j===i);});
}

function checkMC(){
  if(sel===null)return;
  var q=MASTER_QS[cur];
  var correct=q.options[sel].correct;
  document.querySelectorAll('.opt').forEach(function(e,i){
    if(q.options[i].correct)e.classList.add('correct');
    else if(i===sel&&!correct)e.classList.add('wrong');
    e.style.pointerEvents='none';
  });
  var fb=document.getElementById('fb');
  var correctText=q.options.find(function(o){return o.correct;}).text;
  fb.textContent=correct?'Correct! Well done.':'Not quite. The answer is: '+correctText;
  fb.className='feedback show '+(correct?'ok':'bad');
  if(correct)score++;
  answered.push({type:q.type,question:q.question,answer:q.options[sel].text,correct:correct});
  document.getElementById('bc').disabled=true;
  document.getElementById('bn').disabled=false;
}

function toggleSpeak(){
  if(recording){stopRecog();return;}
  if(!recog&&!initRecog()){skipSpeak();return;}
  try{recog.start();}catch(e){recog=null;initRecog();try{recog.start();}catch(e2){skipSpeak();return;}}
  recording=true;
  document.getElementById('bs').textContent='&#9632; Stop';
  document.getElementById('bs').classList.add('rec');
  setSpeakStatus('&#128308; Recording... speak clearly.');
}

function stopRecog(){
  recording=false;
  var bs=document.getElementById('bs');
  if(bs){bs.textContent='&#127897; Try Again';bs.classList.remove('rec');}
  if(recog){try{recog.stop();}catch(e){}}
}

function handleSpoken(spoken){
  stopRecog();
  var q=MASTER_QS[cur];
  var targetWords=q.sentence.replace(/[.,!?;:]/g,'').split(' ').map(cleanW);
  var spokenWords=spoken.replace(/[.,!?;:]/g,'').split(' ').map(cleanW);
  var correct=0;
  targetWords.forEach(function(tw,i){
    var sw=spokenWords[i]||'';var ok=levenshtein(tw,sw)<=1;
    if(ok)correct++;
    var el=document.getElementById('sw'+i);
    if(el)el.className='word '+(ok?'correct':(sw?'wrong':'missed'));
  });
  var pct=Math.round((correct/targetWords.length)*100);
  speakTotal++;speakScore+=pct;
  var pts=pct>=80?1:pct>=60?0.5:0;
  score+=pts;
  document.getElementById('heard').textContent='You said: "'+spoken+'" — '+pct+'% correct';
  setSpeakStatus(pct>=80?'&#128994; Excellent! '+pct+'%':pct>=60?'&#128992; Good! '+pct+'%':'&#128308; '+pct+'% — try again');
  answered.push({type:'speak',question:q.sentence,answer:spoken,correct:pct>=60,pct:pct});
  speakDone=true;
  document.getElementById('bn').disabled=false;
}

function skipSpeak(){
  answered.push({type:'speak',question:MASTER_QS[cur].sentence,answer:'(skipped)',correct:false,pct:0});
  document.getElementById('bn').disabled=false;
}

function setSpeakStatus(msg){var el=document.getElementById('sp-st');if(el)el.innerHTML=msg;}

function nextQ(){
  cur++;sel=null;speakDone=false;
  if(cur>=TOTAL){showResults();return;}
  renderQ();
}

function colorClass(pct){return pct>=80?'great':pct>=60?'ok':'poor';}

function showResults(){
  var readScore=0,readTotal=0,listenScore=0,listenTotal=0;
  answered.forEach(function(a){
    if(a.type==='read'){readTotal++;if(a.correct)readScore++;}
    if(a.type==='listen'){listenTotal++;if(a.correct)listenScore++;}
  });
  var totalPts=Math.round(score);
  var maxPts=readTotal+listenTotal+speakTotal;
  var overallPct=maxPts?Math.round((score/maxPts)*100):0;
  finishSCORM(totalPts, maxPts);
  document.getElementById('main-card').style.display='none';
  document.getElementById('res-card').style.display='';
  document.getElementById('tot-num').textContent=totalPts;
  document.getElementById('tot-den').textContent='/ '+maxPts;
  var rPct=readTotal?Math.round((readScore/readTotal)*100):0;
  var lPct=listenTotal?Math.round((listenScore/listenTotal)*100):0;
  var sPct=speakTotal?Math.round(speakScore/speakTotal):0;
  var sg=document.getElementById('skill-grid');
  sg.innerHTML='<div class="skill-box"><div class="skill-score '+colorClass(rPct)+'">'+rPct+'%</div><div class="skill-lbl">&#128218; Reading</div></div>'
              +'<div class="skill-box"><div class="skill-score '+colorClass(lPct)+'">'+lPct+'%</div><div class="skill-lbl">&#127925; Listening</div></div>'
              +'<div class="skill-box"><div class="skill-score '+colorClass(sPct)+'">'+sPct+'%</div><div class="skill-lbl">&#127897; Pronunciation</div></div>';
  var msg=overallPct>=80?'Excellent! You are a Palm Tree Master! \u2b50'
         :overallPct>=70?'Good work! Keep practising. \U0001f334'
         :'Keep studying — read the story again and try once more!';
  document.getElementById('feedback-msg').textContent=msg;
  document.getElementById('feedback-sub').textContent='Overall: '+overallPct+'% ('+totalPts+' / '+maxPts+' points)';
  var tb=document.getElementById('det-body');
  answered.forEach(function(a,i){
    var tr=document.createElement('tr');
    var typeIcon=a.type==='read'?'&#128218;':a.type==='listen'?'&#127925;':'&#127897;';
    var ans=a.pct!==undefined?a.answer+' ('+a.pct+'%)':a.answer;
    tr.innerHTML='<td>'+(i+1)+'</td><td>'+typeIcon+'</td>'
      +'<td style="font-size:.82rem">'+a.question.substring(0,60)+'</td>'
      +'<td style="font-size:.82rem">'+ans+'</td>'
      +'<td><span class="badge-sm '+(a.correct?'pass':'fail')+'">'+(a.correct?'PASS':'FAIL')+'</span></td>';
    tb.appendChild(tr);
  });
  document.getElementById('prog-bar').style.width='100%';
}

initRecog();renderQ();
</script>
</body>
</html>""")

MANIFEST8 = """<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="palm-reading-final" version="1"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2
    imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="palm_org">
    <organization identifier="palm_org">
      <title>Under The Palm Tree — Final Combined Test</title>
      <item identifier="item_1" identifierref="res_1">
        <title>Stage 8: Reading + Listening + Pronunciation</title>
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

scorm8_path = os.path.join(OUT, "R08_Final_Combined_SCORM.zip")
with zipfile.ZipFile(scorm8_path, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("imsmanifest.xml", MANIFEST8)
    z.writestr("index.html", SCORM8_HTML)

log(f"  Saved: R08_Final_Combined_SCORM.zip  ({os.path.getsize(scorm8_path)//1024} KB)")

# ── Cleanup ───────────────────────────────────────────────────────────────────
shutil.rmtree(TMP, ignore_errors=True)

# ── Summary ───────────────────────────────────────────────────────────────────
log("\n" + "="*60)
log("ALL DONE — H5P_READING folder:")
for fn in sorted(os.listdir(OUT)):
    sz = os.path.getsize(os.path.join(OUT, fn))
    log(f"   {fn:<45} {sz//1024} KB")
