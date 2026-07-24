/* ============================================
   Al-Qarawashiya Tarot - Hand Gesture Control
   MediaPipe Hands + Three.js + Canvas 2D
   Colors: BEIGE + DEEP BURGUNDY + DARK BROWN
   NO GOLD
   ============================================ */

// ============================================
// TAROT CARD DATA - Major Arcana (22 cards)
// ============================================
const TarotCards = {
    0: { id: 0, name: "The Castle of Knowledge", nameAr: "حصن المعرفة", emoji: "🏰", num: "I",
         meaning: "New beginnings, innocence, spontaneity. A leap of faith into the unknown.",
         meaningAr: "بدايات جديدة، براءة، تلقائية. قفزة إيمان في المجهول.",
         isReady: true,
         category: "place",
         secretWord: "JABRIN CASTLE",
         loreText: "Built in 1670 in the region of Al Dakhiliyah, this stronghold was never meant for war. Instead, scholars gathered within its high walls to study the stars, medicine, and law. Hidden staircases connect rooms painted with verses from the Quran — a place where knowledge, not conquest, was king. Even today, visitors climb narrow stairs to reach the room where a great Imam is said to be buried.",
         vocabTargets: ["stronghold", "scholars", "staircases", "conquest"],
         grammarTargets: ["was never meant", "is said to be"],
         image: "assets/jabrin-castle.jpg",
         questions: [
           { q: 'What was this stronghold built for?', opts: ['War and conquest', 'Knowledge, medicine, and law', 'Trade and markets'], correct: 1 },
           { q: 'What connects the rooms inside?', opts: ['Long tunnels', 'Hidden staircases', 'Glass bridges'], correct: 1 },
           { q: 'What is painted on the walls?', opts: ['Verses from the Quran', 'Modern paintings', 'Old maps'], correct: 0 },
           { q: 'In which region is it located?', opts: ['Al Dakhiliyah', 'Muscat', 'Salalah'], correct: 0 },
           { q: 'Who is said to be buried in a room reached by narrow stairs?', opts: ['A famous trader', 'A great Imam', 'A foreign king'], correct: 1 }
         ]
       },
    1: { id: 1, name: "The Magician", nameAr: "الساحر", emoji: "🎩", num: "I",
         meaning: "Manifestation, resourcefulness, power. You have all the tools you need.",
         meaningAr: "تجسيد، موارد، قوة. عندك كل الأدوات اللي تحتاجها." },
    2: { id: 2, name: "The High Priestess", nameAr: "الكاهنة العليا", emoji: "🌙", num: "II",
         meaning: "Intuition, mystery, subconscious. Trust your inner voice.",
         meaningAr: "حدس، غموض، اللاوعي. صدق صوتك الداخلي." },
    3: { id: 3, name: "The Empress", nameAr: "الإمبراطورة", emoji: "👑", num: "III",
         meaning: "Femininity, beauty, nature. Abundance and nurturing energy.",
         meaningAr: "أنوثة، جمال، طبيعة. وفرة وطاقة حانية." },
    4: { id: 4, name: "The Emperor", nameAr: "الإمبراطور", emoji: "⚔️", num: "IV",
         meaning: "Authority, structure, control. Establish order and discipline.",
         meaningAr: "سلطة، هيكل، تحكم. أنشئ النظام والانضباط." },
    5: { id: 5, name: "The Hierophant", nameAr: "الكاهن", emoji: "📿", num: "V",
         meaning: "Tradition, spirituality, conformity. Seek wisdom from elders.",
         meaningAr: "تقليد، روحانية، تقاليد. ابحث عن الحكمة من الكبار." },
    6: { id: 6, name: "The Lovers", nameAr: "العشاق", emoji: "💕", num: "VI",
         meaning: "Love, harmony, relationships. A choice that aligns with your values.",
         meaningAr: "حب، تناغم، علاقات. اختيار يتوافق مع قيمك." },
    7: { id: 7, name: "The Chariot", nameAr: "المركبة", emoji: "🛡️", num: "VII",
         meaning: "Determination, willpower, victory. Overcome obstacles through focus.",
         meaningAr: "عزيمة، إرادة، نصر. تغلب على العقبات بالتركيز." },
    8: { id: 8, name: "Strength", nameAr: "القوة", emoji: "🦁", num: "VIII",
         meaning: "Courage, patience, inner strength. Gentle power over brute force.",
         meaningAr: "شجاعة، صبر، قوة داخلية. القوة اللطيفة تغلب القوة الغاشمة." },
    9: { id: 9, name: "The Hermit", nameAr: "الناسك", emoji: "🏔️", num: "IX",
         meaning: "Soul-searching, introspection, solitude. Withdraw to find answers.",
         meaningAr: "تأمل، تفكر، عزلة. انسحب لتجد الإجابات." },
    10: { id: 10, name: "Wheel of Fortune", nameAr: "عجلة الحظ", emoji: "☸️", num: "X",
          meaning: "Cycles, change, destiny. What goes down must come up.",
          meaningAr: "دورات، تغيير، قدر. اللي ينزل لازم يطلع." },
    11: { id: 11, name: "Justice", nameAr: "العدل", emoji: "⚖️", num: "XI",
          meaning: "Fairness, truth, cause and effect. Balance will be restored.",
          meaningAr: "إنصاف، حقيقة، سبب ونتيجة. التوازن راح يرجع." },
    12: { id: 12, name: "The Hanged Man", nameAr: "المشنوق", emoji: "🙃", num: "XII",
          meaning: "Pause, surrender, new perspective. Let go to gain clarity.",
          meaningAr: "توقف، استسلام، منظور جديد. خلّص عشان توضح الرؤية." },
    13: { id: 13, name: "Death", nameAr: "الموت", emoji: "💀", num: "XIII",
          meaning: "Transformation, endings, rebirth. Something must end for something new to begin.",
          meaningAr: "تحول، نهايات، ولادة جديدة. شي لازم ينتهي عشان شي جديد يبدأ." },
    14: { id: 14, name: "Temperance", nameAr: "الاعتدال", emoji: "🏺", num: "XIV",
          meaning: "Balance, moderation, patience. Find the middle path.",
          meaningAr: "توازن، اعتدال، صبر. لقِ الطريق الوسط." },
    15: { id: 15, name: "The Devil", nameAr: "الشيطان", emoji: "😈", num: "XV",
          meaning: "Shadow self, attachment, restriction. Break free from chains.",
          meaningAr: "الظل، تعلق، قيد. تحرر من القيود." },
    16: { id: 16, name: "The Tower", nameAr: "البرج", emoji: "🌩️", num: "XVI",
          meaning: "Sudden change, upheaval, revelation. Destruction precedes creation.",
          meaningAr: "تغيير مفاجئ، اضطراب، كشف. الهدم يسبق البناء." },
    17: { id: 17, name: "The Star", nameAr: "النجمة", emoji: "⭐", num: "XVII",
          meaning: "Hope, faith, purpose. The darkness is behind you.",
          meaningAr: "أمل، إيمان، هدف. الظلام وراك." },
    18: { id: 18, name: "The Moon", nameAr: "القمر", emoji: "🌙", num: "XVIII",
          meaning: "Illusion, fear, anxiety. Things are not what they seem.",
          meaningAr: "وهم، خوف، قلق. الأشياء مو زي ما تبدو." },
    19: { id: 19, name: "The Sun", nameAr: "الشمس", emoji: "☀️", num: "XIX",
          meaning: "Positivity, fun, warmth. Success and joy are yours.",
          meaningAr: "إيجابية، مرح، دفء. النجاح والفرح لك." },
    20: { id: 20, name: "Judgement", nameAr: "الحساب", emoji: "📯", num: "XX",
          meaning: "Rebirth, inner calling, absolution. Rise to a higher level.",
          meaningAr: "ولادة جديدة، نداء داخلي، غفران. ارتفع لمستوى أعلى." },
    21: { id: 21, name: "The World", nameAr: "العالم", emoji: "🌍", num: "XXI",
          meaning: "Completion, integration, accomplishment. The journey ends and begins anew.",
          meaningAr: "إكمال، اندماج، إنجاز. الرحلة تنتهي وتبدأ من جديد." }
};

// ============================================
// GAME STATE
// ============================================
const GameState = {
    LOADING: 'loading', CAMERA_PERMISSION: 'camera_permission',
    MENU: 'menu', PLAYING: 'playing', READING: 'reading',
    SETTINGS: 'settings', LEARN: 'learn'
};

const SpreadType = {
    SINGLE: 'single', THREE: 'three', CELTIC: 'celtic'
};

const GestureType = {
    NONE: 'none', HOVER: 'hover', PINCH: 'pinch', WAVE: 'wave', SELECT: 'select'
};

class TarotGame {
    constructor() {
        this.state = GameState.LOADING;
        this.spreadType = SpreadType.SINGLE;
        this.currentCards = [];
        this.selectedCards = [];
        this.language = 'en';
        this.useHandTracking = true;
        this.useMouse = false;

        // Hand tracking
        this.hands = null;
        this.camera = null;
        this.handCanvas = null;
        this.handCtx = null;
        this.videoElement = null;
        this.handResults = null;
        this.lastGesture = GestureType.NONE;
        this.gestureConfidence = 0;
        this.pinchDistance = 0;
        this.handPosition = { x: 0.5, y: 0.5 };
        this.isHandVisible = false;

        // Canvas
        this.canvas = null;
        this.ctx = null;
        this.cards = [];
        this.hoveredCard = null;
        this.selectedCard = null;

        // Animation
        this.animationId = null;
        this.time = 0;
        this.particles = [];

        // Settings
        this.settings = {
            trackingSensitivity: 5,
            showSkeleton: true,
            mirrorCamera: true,
            ambientVolume: 50,
            sfxVolume: 70,
            particlesEnabled: true,
            cardGlow: true
        };

        this.ui = {};
        this.init();
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        this.initUI();
        this.initCanvas();
        this.initParticles();
        this.startLoadingSequence();
    }

    initUI() {
        const ids = ['loading-screen','loading-bar-fill','loading-text','main-menu',
            'camera-permission','game-area','settings-screen','learn-screen',
            'reading-panel','reading-text','reading-card-display','gesture-feedback',
            'gesture-icon','gesture-text','hand-status','status-dot','status-text',
            'spread-name','cards-grid','card-modal','modal-card','btn-close-modal',
            'hand-canvas','input-video','tarot-canvas'];

        ids.push('btn-continue-journey');
        ids.forEach(id => {
            this.ui[id.replace(/-/g, '_')] = document.getElementById(id);
        });

        // Buttons
        document.getElementById('btn-enable-camera')?.addEventListener('click', () => this.enableCamera());
        document.getElementById('btn-mouse-mode')?.addEventListener('click', () => this.enableMouseMode());
        document.getElementById('btn-single-draw')?.addEventListener('click', () => this.startSpread(SpreadType.SINGLE));
        document.getElementById('btn-three-spread')?.addEventListener('click', () => this.startSpread(SpreadType.THREE));
        document.getElementById('btn-celtic-cross')?.addEventListener('click', () => this.startSpread(SpreadType.CELTIC));
        document.getElementById('btn-learn')?.addEventListener('click', () => this.showLearnScreen());
        document.getElementById('btn-settings')?.addEventListener('click', () => this.showSettings());
        document.getElementById('btn-restart-spread')?.addEventListener('click', () => this.restartSpread());
        document.getElementById('btn-back-menu')?.addEventListener('click', () => this.backToMenu());
        document.getElementById('btn-close-reading')?.addEventListener('click', () => this.closeReading());
        document.getElementById('btn-close-modal')?.addEventListener('click', () => this.closeModal());

        // Settings
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setLanguage(e.target.dataset.lang));
        });

        const bindSetting = (id, key) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', (e) => {
                this.settings[key] = e.target.type === 'checkbox' ? e.target.checked : parseInt(e.target.value);
                const valEl = document.getElementById(id + '-val');
                if (valEl) valEl.textContent = this.settings[key] + (id.includes('volume') ? '%' : '');
            });
        };
        bindSetting('tracking-sensitivity', 'trackingSensitivity');
        bindSetting('show-skeleton', 'showSkeleton');
        bindSetting('mirror-camera', 'mirrorCamera');
        bindSetting('ambient-volume', 'ambientVolume');
        bindSetting('sfx-volume', 'sfxVolume');
        bindSetting('particles-enabled', 'particlesEnabled');
        bindSetting('card-glow', 'cardGlow');

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.backToMenu());
        });
    }

    initCanvas() {
        this.canvas = document.getElementById('tarot-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.handCanvas = document.getElementById('hand-canvas');
        if (this.handCanvas) this.handCtx = this.handCanvas.getContext('2d');

        this.videoElement = document.getElementById('input-video');

        // Mouse fallback listeners — attached unconditionally (onMouseMove/onMouseClick
        // already guard on this.useMouse themselves) since this used to be gated on
        // `this.useMouse` here in initUI(), which runs before the user has ever had a
        // chance to enable mouse mode, so the listeners were never actually attached.
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.onMouseClick(e));
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // ============================================
    // LOADING
    // ============================================
    startLoadingSequence() {
        const steps = [
            { progress: 15, text: 'Awakening the cards...', textAr: 'استيقاظ البطاقات...' },
            { progress: 35, text: 'Connecting to the desert spirits...', textAr: 'التواصل مع أرواح الصحراء...' },
            { progress: 55, text: 'Preparing hand tracking...', textAr: 'تحضير تتبع اليد...' },
            { progress: 75, text: 'Channeling ancient wisdom...', textAr: 'استقبال الحكمة القديمة...' },
            { progress: 100, text: 'The cards are ready...', textAr: 'البطاقات جاهزة...' },
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < steps.length) {
                const s = steps[step];
                if (this.ui.loading_bar_fill) this.ui.loading_bar_fill.style.width = s.progress + '%';
                if (this.ui.loading_text) this.ui.loading_text.textContent = this.language === 'ar' ? s.textAr : s.text;
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => this.showCameraPermission(), 500);
            }
        }, 700);
    }

    showCameraPermission() {
        this.ui.loading_screen?.classList.add('hidden');
        this.ui.camera_permission?.classList.remove('hidden');
        this.state = GameState.CAMERA_PERMISSION;
    }

    // ============================================
    // HAND TRACKING - MediaPipe
    // ============================================
    async enableCamera() {
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.loading_screen?.classList.remove('hidden');
        if (this.ui.loading_text) this.ui.loading_text.textContent = this.t('Initializing camera...');

        try {
            await this.initHandTracking();
            this.useHandTracking = true;
            this.useMouse = false;
            this.ui.loading_screen?.classList.add('hidden');
            this.showMenu();
        } catch (err) {
            console.error('Camera error:', err);
            this.enableMouseMode();
        }
    }

    enableMouseMode() {
        this.useHandTracking = false;
        this.useMouse = true;
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.loading_screen?.classList.add('hidden');
        this.showMenu();
        this.updateGestureFeedback('🖱️', 'Use your mouse to interact with the cards');
    }

    async initHandTracking() {
        if (!this.videoElement || !this.handCanvas) return;

        this.hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.hands.onResults((results) => this.onHandResults(results));

        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({ image: this.videoElement });
            },
            width: 320,
            height: 240
        });

        await this.camera.start();
        this.updateHandStatus(true, 'tracking');
    }

    onHandResults(results) {
        this.handResults = results;

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            this.isHandVisible = true;
            const landmarks = results.multiHandLandmarks[0];
            this.processHandGesture(landmarks);
            this.drawHandSkeleton(landmarks);
            this.updateHandStatus(true, 'active');
        } else {
            this.isHandVisible = false;
            this.lastGesture = GestureType.NONE;
            this.clearHandCanvas();
            this.updateHandStatus(true, 'waiting');
        }
    }

    processHandGesture(landmarks) {
        // Index finger tip (8) and thumb tip (4)
        const indexTip = landmarks[8];
        const thumbTip = landmarks[4];
        const middleTip = landmarks[12];
        const wrist = landmarks[0];

        // Calculate pinch distance
        const dx = indexTip.x - thumbTip.x;
        const dy = indexTip.y - thumbTip.y;
        const dz = indexTip.z - thumbTip.z;
        this.pinchDistance = Math.sqrt(dx*dx + dy*dy + dz*dz);

        // Hand position (use index finger as cursor)
        let x = indexTip.x;
        if (this.settings.mirrorCamera) x = 1 - x;
        this.handPosition = { x, y: indexTip.y };

        // Detect gestures. Thresholds scale with the Settings > Tracking Sensitivity
        // slider (1-10, default 5) — previously this slider was wired up in the UI
        // but never actually read anywhere, so it did nothing. At the default value
        // of 5 these equal the original hardcoded 0.08 / 0.15, so existing behavior
        // is unchanged unless the user actually moves the slider.
        const sensitivity = this.settings.trackingSensitivity || 5;
        const pinchThreshold = 0.05 + (sensitivity / 10) * 0.06;
        const waveThreshold = 0.20 - (sensitivity / 10) * 0.10;

        if (this.pinchDistance < pinchThreshold) {
            this.setGesture(GestureType.PINCH);
        } else if (Math.abs(middleTip.x - wrist.x) > waveThreshold) {
            this.setGesture(GestureType.WAVE);
        } else {
            this.setGesture(GestureType.HOVER);
        }

        // Update cursor position for card interaction
        this.updateCursorFromHand();
    }

    setGesture(gesture) {
        if (this.lastGesture !== gesture) {
            this.lastGesture = gesture;
            this.gestureConfidence = 0;
            this.onGestureChange(gesture);
        } else {
            this.gestureConfidence = Math.min(this.gestureConfidence + 0.1, 1);
        }
    }

    onGestureChange(gesture) {
        const messages = {
            [GestureType.HOVER]: { icon: '✋', text: 'Hover over a card', textAr: 'حوّم فوق البطاقة' },
            [GestureType.PINCH]: { icon: '👌', text: 'Pinch to select', textAr: 'قرص للاختيار' },
            [GestureType.WAVE]: { icon: '👋', text: 'Wave to shuffle', textAr: 'لوح للخلط' },
            [GestureType.NONE]: { icon: '✋', text: 'Show your hand', textAr: 'أظهر يدك' }
        };

        const msg = messages[gesture];
        this.updateGestureFeedback(msg.icon, this.language === 'ar' ? msg.textAr : msg.text);
    }

    updateCursorFromHand() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const x = this.handPosition.x * rect.width;
        const y = this.handPosition.y * rect.height;

        // Check card hover
        this.checkCardHover(x, y);

        // Check pinch select
        if (this.lastGesture === GestureType.PINCH && this.gestureConfidence > 0.5) {
            this.selectHoveredCard();
        }
    }

    drawHandSkeleton(landmarks) {
        if (!this.handCtx || !this.settings.showSkeleton) return;
        const ctx = this.handCtx;
        const w = this.handCanvas.width;
        const h = this.handCanvas.height;

        ctx.clearRect(0, 0, w, h);

        // Draw connections
        const connections = [
            [0,1],[1,2],[2,3],[3,4], // Thumb
            [0,5],[5,6],[6,7],[7,8], // Index
            [0,9],[9,10],[10,11],[11,12], // Middle
            [0,13],[13,14],[14,15],[15,16], // Ring
            [0,17],[17,18],[18,19],[19,20] // Pinky
        ];

        ctx.strokeStyle = 'rgba(212, 197, 169, 0.4)';
        ctx.lineWidth = 1;

        connections.forEach(([start, end]) => {
            const p1 = landmarks[start];
            const p2 = landmarks[end];
            let x1 = p1.x * w, x2 = p2.x * w;
            if (this.settings.mirrorCamera) { x1 = w - x1; x2 = w - x2; }
            ctx.beginPath();
            ctx.moveTo(x1, p1.y * h);
            ctx.lineTo(x2, p2.y * h);
            ctx.stroke();
        });

        // Draw landmarks
        landmarks.forEach((lm, i) => {
            let x = lm.x * w;
            if (this.settings.mirrorCamera) x = w - x;
            const y = lm.y * h;

            ctx.beginPath();
            ctx.arc(x, y, i === 8 ? 5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = i === 8 ? 'rgba(212, 197, 169, 0.9)' : 'rgba(74, 14, 31, 0.7)';
            ctx.fill();
        });
    }

    clearHandCanvas() {
        if (this.handCtx) {
            this.handCtx.clearRect(0, 0, this.handCanvas.width, this.handCanvas.height);
        }
    }

    // ============================================
    // MOUSE FALLBACK
    // ============================================
    onMouseMove(e) {
        if (!this.useMouse) return;
        const rect = this.canvas.getBoundingClientRect();
        this.handPosition = {
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        };
        this.checkCardHover(e.clientX - rect.left, e.clientY - rect.top);
    }

    onMouseClick(e) {
        if (!this.useMouse) return;
        this.selectHoveredCard();
    }

    // ============================================
    // CARD SYSTEM
    // ============================================
    createCards() {
        this.cards = [];
        const cardIds = Object.keys(TarotCards).map(Number);

        // Shuffle
        for (let i = cardIds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardIds[i], cardIds[j]] = [cardIds[j], cardIds[i]];
        }

        const spread = this.spreadType;
        const count = spread === SpreadType.SINGLE ? 1 : spread === SpreadType.THREE ? 3 : 10;

        for (let i = 0; i < count; i++) {
            const cardData = TarotCards[cardIds[i]];
            this.cards.push({
                data: cardData,
                x: 0, y: 0, width: 140, height: 230,
                targetX: 0, targetY: 0,
                rotation: 0, targetRotation: 0,
                scale: 1, targetScale: 1,
                flipped: false, revealed: false,
                hover: false, selected: false,
                opacity: 1, glow: 0
            });
        }

        this.layoutCards();
    }

    layoutCards() {
        const w = this.canvas?.width || window.innerWidth;
        const h = this.canvas?.height || window.innerHeight;
        const spread = this.spreadType;

        if (spread === SpreadType.SINGLE) {
            this.cards[0].targetX = w / 2 - 70;
            this.cards[0].targetY = h / 2 - 115;
        } else if (spread === SpreadType.THREE) {
            const positions = [
                { x: w/2 - 220, y: h/2 - 115 }, // Past
                { x: w/2 - 70, y: h/2 - 115 },  // Present
                { x: w/2 + 80, y: h/2 - 115 }   // Future
            ];
            this.cards.forEach((card, i) => {
                card.targetX = positions[i].x;
                card.targetY = positions[i].y;
            });
        } else if (spread === SpreadType.CELTIC) {
            // Celtic cross layout
            const cx = w / 2, cy = h / 2;
            const positions = [
                { x: cx - 70, y: cy - 115 },      // 1. Present
                { x: cx - 70, y: cy - 115, r: 90 }, // 2. Challenge (cross)
                { x: cx - 70, y: cy - 315 },      // 3. Above
                { x: cx - 70, y: cy + 85 },       // 4. Below
                { x: cx - 270, y: cy - 115 },     // 5. Past
                { x: cx + 130, y: cy - 115 },     // 6. Future
                { x: cx + 280, y: cy - 315 },     // 7. Self
                { x: cx + 280, y: cy - 165 },     // 8. Environment
                { x: cx + 280, y: cy - 15 },      // 9. Hopes
                { x: cx + 280, y: cy + 135 }      // 10. Outcome
            ];
            this.cards.forEach((card, i) => {
                card.targetX = positions[i].x;
                card.targetY = positions[i].y;
                if (positions[i].r) card.targetRotation = positions[i].r;
            });
        }

        // Initial position (off-screen or stacked)
        this.cards.forEach((card, i) => {
            card.x = w / 2 - 70 + (i * 2);
            card.y = h + 50;
            card.rotation = (Math.random() - 0.5) * 10;
        });
    }

    checkCardHover(x, y) {
        let hovered = null;
        for (let i = this.cards.length - 1; i >= 0; i--) {
            const card = this.cards[i];
            if (x >= card.x && x <= card.x + card.width &&
                y >= card.y && y <= card.y + card.height) {
                hovered = card;
                break;
            }
        }

        this.cards.forEach(c => {
            c.hover = (c === hovered);
            c.targetScale = c.hover ? 1.08 : 1;
            c.targetRotation = c.hover ? (c === hovered ? 0 : c.rotation) : c.rotation;
        });

        this.hoveredCard = hovered;
    }

    selectHoveredCard() {
        if (!this.hoveredCard || this.hoveredCard.revealed) return;

        this.hoveredCard.selected = true;
        this.hoveredCard.revealed = true;
        this.hoveredCard.targetRotation = 0;

        // Flip animation
        this.animateCardFlip(this.hoveredCard);

        // Show reading
        setTimeout(() => this.showReading(this.hoveredCard), 600);
    }

    animateCardFlip(card) {
        let progress = 0;
        const animate = () => {
            progress += 0.05;
            if (progress <= 0.5) {
                card.scaleX = 1 - progress * 2;
            } else {
                card.scaleX = (progress - 0.5) * 2;
                card.flipped = true;
            }
            if (progress < 1) requestAnimationFrame(animate);
            else card.scaleX = 1;
        };
        animate();
    }

    // ============================================
    // RENDERING
    // ============================================
    initParticles() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3 - 0.1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.5 ? '212, 197, 169' : '74, 14, 31'
            });
        }
    }

    render() {
        if (!this.ctx || this.state !== GameState.PLAYING) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // Clear
        ctx.fillStyle = '#1a0a0f';
        ctx.fillRect(0, 0, w, h);

        // Background gradient
        const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
        gradient.addColorStop(0, 'rgba(74, 14, 31, 0.2)');
        gradient.addColorStop(1, 'rgba(26, 10, 15, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // Particles
        if (this.settings.particlesEnabled) {
            this.renderParticles(ctx);
        }

        // Cards
        this.renderCards(ctx);

        // Hand cursor
        if (this.useHandTracking && this.isHandVisible) {
            this.renderHandCursor(ctx);
        }

        // Continue animation
        this.animationId = requestAnimationFrame(() => this.render());
    }

    renderParticles(ctx) {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.y < 0) { p.y = ctx.canvas.height; p.x = Math.random() * ctx.canvas.width; }
            if (p.x < 0) p.x = ctx.canvas.width;
            if (p.x > ctx.canvas.width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.fill();
        });
    }

    renderCards(ctx) {
        this.cards.forEach(card => {
            // Smooth animation
            card.x += (card.targetX - card.x) * 0.05;
            card.y += (card.targetY - card.y) * 0.05;
            card.rotation += (card.targetRotation - card.rotation) * 0.05;
            card.scale += (card.targetScale - card.scale) * 0.1;

            ctx.save();
            ctx.translate(card.x + card.width/2, card.y + card.height/2);
            ctx.rotate(card.rotation * Math.PI / 180);
            ctx.scale(card.scale, card.scale);

            // Glow effect
            if (card.hover && this.settings.cardGlow) {
                ctx.shadowColor = 'rgba(212, 197, 169, 0.3)';
                ctx.shadowBlur = 20;
            }

            // Card background
            const cardW = card.width;
            const cardH = card.height;

            if (!card.flipped) {
                // Card back
                ctx.fillStyle = '#2a080f';
                ctx.fillRect(-cardW/2, -cardH/2, cardW, cardH);

                // Border
                ctx.strokeStyle = 'rgba(212, 197, 169, 0.3)';
                ctx.lineWidth = 2;
                ctx.strokeRect(-cardW/2 + 4, -cardH/2 + 4, cardW - 8, cardH - 8);

                // Pattern
                ctx.fillStyle = 'rgba(212, 197, 169, 0.1)';
                ctx.font = '30px serif';
                ctx.textAlign = 'center';
                ctx.fillText('🌙', 0, 5);

                // Decorative corners
                ctx.strokeStyle = 'rgba(212, 197, 169, 0.2)';
                ctx.lineWidth = 1;
                const cornerSize = 15;
                // Top-left
                ctx.beginPath(); ctx.moveTo(-cardW/2 + 10, -cardH/2 + 25); ctx.lineTo(-cardW/2 + 10, -cardH/2 + 10); ctx.lineTo(-cardW/2 + 25, -cardH/2 + 10); ctx.stroke();
                // Top-right
                ctx.beginPath(); ctx.moveTo(cardW/2 - 10, -cardH/2 + 25); ctx.lineTo(cardW/2 - 10, -cardH/2 + 10); ctx.lineTo(cardW/2 - 25, -cardH/2 + 10); ctx.stroke();
                // Bottom-left
                ctx.beginPath(); ctx.moveTo(-cardW/2 + 10, cardH/2 - 25); ctx.lineTo(-cardW/2 + 10, cardH/2 - 10); ctx.lineTo(-cardW/2 + 25, cardH/2 - 10); ctx.stroke();
                // Bottom-right
                ctx.beginPath(); ctx.moveTo(cardW/2 - 10, cardH/2 - 25); ctx.lineTo(cardW/2 - 10, cardH/2 - 10); ctx.lineTo(cardW/2 - 25, cardH/2 - 10); ctx.stroke();

            } else {
                // Card front
                ctx.fillStyle = '#3d2817';
                ctx.fillRect(-cardW/2, -cardH/2, cardW, cardH);

                // Inner border
                ctx.strokeStyle = 'rgba(212, 197, 169, 0.4)';
                ctx.lineWidth = 1;
                ctx.strokeRect(-cardW/2 + 8, -cardH/2 + 8, cardW - 16, cardH - 16);

                // Card number
                ctx.fillStyle = 'rgba(212, 197, 169, 0.6)';
                ctx.font = '10px Cinzel';
                ctx.textAlign = 'center';
                ctx.fillText(card.data.num, 0, -cardH/2 + 22);

                // Emoji
                ctx.font = '50px serif';
                ctx.fillText(card.data.emoji, 0, -10);

                // Name
                ctx.fillStyle = '#d4c5a9';
                ctx.font = 'bold 11px Cinzel';
                const name = this.language === 'ar' ? card.data.nameAr : card.data.name;
                ctx.fillText(name, 0, 30);

                // Bottom decoration
                ctx.fillStyle = 'rgba(212, 197, 169, 0.3)';
                ctx.fillRect(-20, cardH/2 - 25, 40, 1);
            }

            ctx.restore();
        });
    }

    renderHandCursor(ctx) {
        const x = this.handPosition.x * ctx.canvas.width;
        const y = this.handPosition.y * ctx.canvas.height;

        // Cursor ring
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 197, 169, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.lastGesture === GestureType.PINCH ? 'rgba(212, 197, 169, 0.9)' : 'rgba(212, 197, 169, 0.4)';
        ctx.fill();

        // Gesture indicator
        if (this.lastGesture === GestureType.PINCH) {
            ctx.beginPath();
            ctx.arc(x, y, 20 + Math.sin(Date.now() * 0.01) * 5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(212, 197, 169, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // ============================================
    // READING
    // ============================================
    showReading(card) {
        this.state = GameState.READING;
        const data = card.data;

        if (this.ui.reading_card_display) {
            this.ui.reading_card_display.innerHTML = `
                <div class="card-visual">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${data.emoji}</div>
                    <div style="font-family: Cinzel; font-size: 1.2rem; color: #d4c5a9; margin-bottom: 0.5rem;">${this.language === 'ar' ? data.nameAr : data.name}</div>
                    <div style="font-family: Cinzel; font-size: 0.8rem; color: #9a8b6b;">${data.num}</div>
                </div>
            `;
        }

        if (this.ui.reading_text) {
            this.ui.reading_text.innerHTML = `
                <h3>${this.language === 'ar' ? data.nameAr : data.name}</h3>
                <p>${this.language === 'ar' ? data.meaningAr : data.meaning}</p>
                ${data.isReady ? `<p style="margin-top:1rem; font-style:italic; direction:ltr; unicode-bidi:isolate;">${data.loreText}</p>
                <p style="margin-top:0.6rem; font-size:0.75rem; color:#9a8b6b;">Read carefully — you'll need this to spell the secret word and answer questions on the falaj ride.</p>` : ''}
            `;
        }

        if (this.ui.btn_continue_journey) {
            if (data.isReady) {
                this.ui.btn_continue_journey.classList.remove('hidden');
                this.ui.btn_continue_journey.onclick = () => this.continueToJourney(data);
            } else {
                this.ui.btn_continue_journey.classList.add('hidden');
            }
        }

        this.ui.reading_panel?.classList.remove('hidden');
    }

    continueToJourney(data) {
        sessionStorage.setItem('palmtree_currentCard', JSON.stringify(data));
        window.location.href = '../../world/bahla-curtain-demo/index.html';
    }

    closeReading() {
        this.ui.reading_panel?.classList.add('hidden');
        this.state = GameState.PLAYING;
    }

    // ============================================
    // UI MANAGEMENT
    // ============================================
    showMenu() {
        this.hideAllScreens();
        this.ui.main_menu?.classList.remove('hidden');
        this.state = GameState.MENU;
    }

    startSpread(type) {
        this.spreadType = type;
        this.hideAllScreens();
        this.ui.game_area?.classList.remove('hidden');
        this.state = GameState.PLAYING;

        const spreadNames = {
            [SpreadType.SINGLE]: { en: 'Single Draw', ar: 'سحب واحد' },
            [SpreadType.THREE]: { en: 'Three Card Spread', ar: 'انتشار ثلاثي' },
            [SpreadType.CELTIC]: { en: 'Celtic Cross', ar: 'الصليب الكلتي' }
        };

        if (this.ui.spread_name) {
            this.ui.spread_name.textContent = this.language === 'ar' ? spreadNames[type].ar : spreadNames[type].en;
        }

        this.createCards();
        this.render();
    }

    restartSpread() {
        this.createCards();
    }

    backToMenu() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.hideAllScreens();
        this.ui.main_menu?.classList.remove('hidden');
        this.state = GameState.MENU;
    }

    showSettings() {
        this.hideAllScreens();
        this.ui.settings_screen?.classList.remove('hidden');
        this.state = GameState.SETTINGS;
    }

    showLearnScreen() {
        this.hideAllScreens();
        this.ui.learn_screen?.classList.remove('hidden');
        this.state = GameState.LEARN;
        this.renderLearnCards();
    }

    renderLearnCards() {
        const grid = this.ui.cards_grid;
        if (!grid) return;

        grid.innerHTML = '';
        Object.values(TarotCards).forEach(card => {
            const div = document.createElement('div');
            div.className = 'card-thumbnail';
            div.innerHTML = `
                <div class="card-num">${card.num}</div>
                <div class="card-emoji">${card.emoji}</div>
                <div class="card-name">${this.language === 'ar' ? card.nameAr : card.name}</div>
            `;
            div.addEventListener('click', () => this.showCardModal(card));
            grid.appendChild(div);
        });
    }

    showCardModal(card) {
        const modal = this.ui.card_modal;
        const content = this.ui.modal_card;
        if (!modal || !content) return;

        content.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${card.emoji}</div>
                <h2 style="font-family: Cinzel; color: #d4c5a9; margin-bottom: 0.5rem;">${this.language === 'ar' ? card.nameAr : card.name}</h2>
                <div style="color: #9a8b6b; font-family: Cinzel; margin-bottom: 1.5rem;">${card.num}</div>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #b8a88a;">${this.language === 'ar' ? card.meaningAr : card.meaning}</p>
            </div>
        `;
        modal.classList.remove('hidden');
    }

    closeModal() {
        this.ui.card_modal?.classList.add('hidden');
    }

    hideAllScreens() {
        this.ui.loading_screen?.classList.add('hidden');
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.main_menu?.classList.add('hidden');
        this.ui.game_area?.classList.add('hidden');
        this.ui.settings_screen?.classList.add('hidden');
        this.ui.learn_screen?.classList.add('hidden');
        this.ui.reading_panel?.classList.add('hidden');
    }

    // ============================================
    // LANGUAGE
    // ============================================
    setLanguage(lang) {
        this.language = lang;
        document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.body.setAttribute('lang', lang);

        // Update all translatable elements
        document.querySelectorAll('[data-en][data-ar]').forEach(el => {
            el.textContent = lang === 'ar' ? el.dataset.ar : el.dataset.en;
        });

        // Update buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update spread name if playing
        if (this.state === GameState.PLAYING && this.ui.spread_name) {
            const spreadNames = {
                [SpreadType.SINGLE]: { en: 'Single Draw', ar: 'سحب واحد' },
                [SpreadType.THREE]: { en: 'Three Card Spread', ar: 'انتشار ثلاثي' },
                [SpreadType.CELTIC]: { en: 'Celtic Cross', ar: 'الصليب الكلتي' }
            };
            this.ui.spread_name.textContent = lang === 'ar' ? spreadNames[this.spreadType].ar : spreadNames[this.spreadType].en;
        }
    }

    t(key) {
        const translations = {
            'Initializing camera...': { ar: 'تهيئة الكاميرا...' },
            'Show your hand to begin': { ar: 'أظهر يدك للبدء' },
            'Hover over a card': { ar: 'حوّم فوق البطاقة' },
            'Pinch to select': { ar: 'قرص للاختيار' },
            'Wave to shuffle': { ar: 'لوح للخلط' },
            'Use your mouse to interact with the cards': { ar: 'استخدم الماوس للتفاعل مع البطاقات' }
        };
        return (translations[key] && translations[key][this.language]) || key;
    }

    // ============================================
    // HELPERS
    // ============================================
    updateGestureFeedback(icon, text) {
        if (this.ui.gesture_icon) this.ui.gesture_icon.textContent = icon;
        if (this.ui.gesture_text) this.ui.gesture_text.textContent = text;
    }

    updateHandStatus(active, state) {
        if (!this.ui.status_dot || !this.ui.status_text) return;

        this.ui.status_dot.className = 'status-dot';
        if (active) {
            if (state === 'tracking') this.ui.status_dot.classList.add('tracking');
            else if (state === 'active') this.ui.status_dot.classList.add('active');
        }

        const texts = {
            'off': { en: 'Camera Off', ar: 'الكاميرا مغلقة' },
            'waiting': { en: 'Show Hand', ar: 'أظهر يدك' },
            'tracking': { en: 'Tracking...', ar: 'يتتبع...' },
            'active': { en: 'Hand Detected', ar: 'تم اكتشاف اليد' }
        };
        this.ui.status_text.textContent = this.language === 'ar' ? texts[state].ar : texts[state].en;
    }
}

// ============================================
// START GAME
// ============================================
const game = new TarotGame();

export default game;
