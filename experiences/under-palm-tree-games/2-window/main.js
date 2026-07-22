/* ============================================
   Window of Knowledge - نافذة المعرفة
   CesiumJS 3D Globe + MediaPipe Hand Tracking
   + Free Books (Gutendex) + Free Courses
   Privacy First - No Data Collection
   ============================================ */

// ============================================
// COUNTRY DATA - With free resources
// ============================================
const CountryData = {
    oman: {
        name: "Oman", nameAr: "عمان",
        flag: "🇴🇲", lat: 23.6139, lon: 58.5453,
        description: "Land of frankincense, ancient maritime power, and the Renaissance.",
        descriptionAr: "أرض اللبان، القوة البحرية القديمة، والنهضة.",
        books: [
            { title: "History of Oman", author: "Various", url: "https://www.gutenberg.org/ebooks/search/?query=oman" },
            { title: "Arabian Nights", author: "Anonymous", url: "https://www.gutenberg.org/ebooks/34324" }
        ],
        courses: [
            { title: "Arabic Language", provider: "Khan Academy", url: "https://www.khanacademy.org/" },
            { title: "Middle East History", provider: "Coursera", url: "https://www.coursera.org/" }
        ],
        history: [
            { date: "106,000 BC", event: "First humans in Oman", eventAr: "الإنسان الأول في عمان" },
            { date: "3,000 BC", event: "Magan civilization", eventAr: "حضارة مجان" },
            { date: "628 AD", event: "Islam arrives", eventAr: "وصول الإسلام" },
            { date: "1507 AD", event: "Portuguese arrive", eventAr: "وصول البرتغاليين" },
            { date: "1650 AD", event: "Expel Portuguese", eventAr: "طرد البرتغاليين" },
            { date: "1744 AD", event: "Al Bu Said dynasty", eventAr: "دولة آل بو سعيد" },
            { date: "1970 AD", event: "Sultan Qaboos - Renaissance", eventAr: "السلطان قابوس - النهضة" },
            { date: "2020 AD", event: "Sultan Haitham", eventAr: "السلطان هيثم" }
        ]
    },
    usa: {
        name: "United States", nameAr: "الولايات المتحدة",
        flag: "🇺🇸", lat: 37.0902, lon: -95.7129,
        description: "Land of liberty, innovation, and diverse cultures.",
        descriptionAr: "أرض الحرية، الابتكار، والثقافات المتنوعة.",
        books: [
            { title: "The Federalist Papers", author: "Hamilton, Madison, Jay", url: "https://www.gutenberg.org/ebooks/1401" },
            { title: "Democracy in America", author: "Tocqueville", url: "https://www.gutenberg.org/ebooks/815" }
        ],
        courses: [
            { title: "US History", provider: "Khan Academy", url: "https://www.khanacademy.org/" },
            { title: "Constitutional Law", provider: "Coursera", url: "https://www.coursera.org/" }
        ],
        history: [
            { date: "1776 AD", event: "Declaration of Independence", eventAr: "إعلان الاستقلال" },
            { date: "1861-1865", event: "Civil War", eventAr: "الحرب الأهلية" },
            { date: "1969 AD", event: "Moon Landing", eventAr: "الهبوط على القمر" }
        ]
    },
    uk: {
        name: "United Kingdom", nameAr: "المملكة المتحدة",
        flag: "🇬🇧", lat: 55.3781, lon: -3.4360,
        description: "Ancient monarchy, literary heritage, and global influence.",
        descriptionAr: "ملكية قديمة، إرث أدبي، وتأثير عالمي.",
        books: [
            { title: "Pride and Prejudice", author: "Jane Austen", url: "https://www.gutenberg.org/ebooks/1342" },
            { title: "Hamlet", author: "Shakespeare", url: "https://www.gutenberg.org/ebooks/1524" }
        ],
        courses: [
            { title: "British Literature", provider: "edX", url: "https://www.edx.org/" },
            { title: "English History", provider: "Khan Academy", url: "https://www.khanacademy.org/" }
        ],
        history: [
            { date: "1066 AD", event: "Norman Conquest", eventAr: "الغزو النورماني" },
            { date: "1215 AD", event: "Magna Carta", eventAr: "ماغنا كارتا" },
            { date: "1688 AD", event: "Glorious Revolution", eventAr: "الثورة المجيدة" }
        ]
    },
    egypt: {
        name: "Egypt", nameAr: "مصر",
        flag: "🇪🇬", lat: 26.8206, lon: 30.8025,
        description: "Cradle of civilization, pharaohs, and the Nile.",
        descriptionAr: "مهد الحضارة، الفراعنة، والنيل.",
        books: [
            { title: "The Egyptian Book of the Dead", author: "Various", url: "https://www.gutenberg.org/ebooks/search/?query=egyptian+book+dead" },
            { title: "History of Ancient Egypt", author: "Various", url: "https://www.gutenberg.org/ebooks/search/?query=ancient+egypt" }
        ],
        courses: [
            { title: "Ancient Egypt", provider: "Khan Academy", url: "https://www.khanacademy.org/" },
            { title: "Egyptian Arabic", provider: "Coursera", url: "https://www.coursera.org/" }
        ],
        history: [
            { date: "3100 BC", event: "Unification of Egypt", eventAr: "توحيد مصر" },
            { date: "2560 BC", event: "Great Pyramid", eventAr: "الهرم الأكبر" },
            { date: "196 BC", event: "Rosetta Stone", eventAr: "حجر رشيد" }
        ]
    },
    india: {
        name: "India", nameAr: "الهند",
        flag: "🇮🇳", lat: 20.5937, lon: 78.9629,
        description: "Ancient civilization, spirituality, and vibrant diversity.",
        descriptionAr: "حضارة قديمة، روحانية، وتنوع نابض.",
        books: [
            { title: "Bhagavad Gita", author: "Vyasa", url: "https://www.gutenberg.org/ebooks/2388" },
            { title: "The Jungle Book", author: "Rudyard Kipling", url: "https://www.gutenberg.org/ebooks/236" }
        ],
        courses: [
            { title: "Indian History", provider: "Khan Academy", url: "https://www.khanacademy.org/" },
            { title: "Yoga", provider: "Coursera", url: "https://www.coursera.org/" }
        ],
        history: [
            { date: "2600 BC", event: "Indus Valley Civilization", eventAr: "حضارة وادي السند" },
            { date: "563 BC", event: "Birth of Buddha", eventAr: "ميلاد بوذا" },
            { date: "1947 AD", event: "Independence", eventAr: "الاستقلال" }
        ]
    },
    china: {
        name: "China", nameAr: "الصين",
        flag: "🇨🇳", lat: 35.8617, lon: 104.1954,
        description: "Ancient civilization, Great Wall, and rapid modernization.",
        descriptionAr: "حضارة قديمة، سور الصين العظيم، وتحديث سريع.",
        books: [
            { title: "The Art of War", author: "Sun Tzu", url: "https://www.gutenberg.org/ebooks/132" },
            { title: "Dream of the Red Chamber", author: "Cao Xueqin", url: "https://www.gutenberg.org/ebooks/25024" }
        ],
        courses: [
            { title: "Chinese Language", provider: "Khan Academy", url: "https://www.khanacademy.org/" },
            { title: "Chinese History", provider: "Coursera", url: "https://www.coursera.org/" }
        ],
        history: [
            { date: "221 BC", event: "Qin Dynasty unification", eventAr: "توحيد سلالة تشين" },
            { date: "220 AD", event: "Three Kingdoms", eventAr: "الممالك الثلاث" },
            { date: "1949 AD", event: "People's Republic", eventAr: "جمهورية الصين الشعبية" }
        ]
    }
};

// ============================================
// FREE COURSES DATA
// ============================================
const FreeCourses = [
    { title: "Computer Science", provider: "Harvard (CS50)", url: "https://cs50.harvard.edu/", icon: "💻" },
    { title: "Mathematics", provider: "Khan Academy", url: "https://www.khanacademy.org/math", icon: "📐" },
    { title: "Physics", provider: "Khan Academy", url: "https://www.khanacademy.org/science/physics", icon: "⚛️" },
    { title: "History", provider: "Khan Academy", url: "https://www.khanacademy.org/humanities", icon: "🏛️" },
    { title: "Art History", provider: "Khan Academy", url: "https://www.khanacademy.org/humanities/art-history", icon: "🎨" },
    { title: "Economics", provider: "Khan Academy", url: "https://www.khanacademy.org/economics-finance-domain", icon: "💰" },
    { title: "Web Development", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/", icon: "🌐" },
    { title: "Data Science", provider: "Coursera", url: "https://www.coursera.org/browse/data-science", icon: "📊" },
    { title: "Machine Learning", provider: "Stanford", url: "https://www.coursera.org/learn/machine-learning", icon: "🤖" },
    { title: "Psychology", provider: "Yale", url: "https://www.coursera.org/learn/introduction-psychology", icon: "🧠" },
    { title: "Philosophy", provider: "Yale", url: "https://www.coursera.org/learn/philosophy-critical-thinking", icon: "🤔" },
    { title: "Music Theory", provider: "Berklee", url: "https://www.coursera.org/learn/music-theory", icon: "🎵" }
];

// ============================================
// GAME STATE
// ============================================
const GameState = {
    LOADING: 'loading', CAMERA_PERMISSION: 'camera_permission',
    MENU: 'menu', GLOBE: 'globe', BOOKS: 'books', COURSES: 'courses',
    HISTORY: 'history', SETTINGS: 'settings'
};

const GestureType = { NONE: 'none', HOVER: 'hover', PINCH: 'pinch', WAVE: 'wave' };

class WindowOfKnowledge {
    constructor() {
        this.state = GameState.LOADING;
        this.language = 'en';
        this.useHandTracking = true;
        this.useMouse = false;

        // Cesium
        this.viewer = null;
        this.selectedEntity = null;

        // Hand tracking
        this.hands = null;
        this.camera = null;
        this.handResults = null;
        this.lastGesture = GestureType.NONE;
        this.handPosition = { x: 0.5, y: 0.5 };
        this.isHandVisible = false;
        this.gestureStartTime = 0;

        // Settings
        this.settings = {
            trackingSensitivity: 5,
            showSkeleton: true,
            showTerrain: true,
            showLabels: true
        };

        this.ui = {};
        this.init();
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        this.initUI();
        this.startLoadingSequence();
    }

    initUI() {
        const ids = ['loading-screen','loading-bar-fill','loading-text','main-menu',
            'camera-permission','globe-area','books-panel','courses-panel','history-panel',
            'settings-screen','country-panel','country-flag','country-name','country-name-ar','country-info',
            'country-resources','resource-content','books-grid','courses-grid','timeline-container',
            'coordinates','gesture-feedback','gesture-icon','gesture-text',
            'hand-status','status-dot','status-text','hand-canvas','input-video'];

        ids.forEach(id => {
            this.ui[id.replace(/-/g, '_')] = document.getElementById(id);
        });
        // The hand-skeleton overlay draws into this context; it was never created,
        // so drawHandSkeleton()/clearHandCanvas() silently no-op'd every frame.
        if (this.ui.hand_canvas) this.ui.hand_ctx = this.ui.hand_canvas.getContext('2d');

        // Buttons
        document.getElementById('btn-enable-camera')?.addEventListener('click', () => this.enableCamera());
        document.getElementById('btn-mouse-mode')?.addEventListener('click', () => this.enableMouseMode());
        document.getElementById('btn-explore-globe')?.addEventListener('click', () => this.startGlobe());
        document.getElementById('btn-free-books')?.addEventListener('click', () => this.showBooks());
        document.getElementById('btn-free-courses')?.addEventListener('click', () => this.showCourses());
        document.getElementById('btn-oman-history')?.addEventListener('click', () => this.showHistory());
        document.getElementById('btn-settings')?.addEventListener('click', () => this.showSettings());
        document.getElementById('btn-reset-view')?.addEventListener('click', () => this.resetGlobeView());
        document.getElementById('btn-back-menu-globe')?.addEventListener('click', () => this.backToMenu());
        document.getElementById('btn-close-country')?.addEventListener('click', () => this.closeCountryPanel());
        document.getElementById('btn-search-books')?.addEventListener('click', () => this.searchBooks());

        // Resource tabs
        document.querySelectorAll('.resource-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchResourceTab(e.target.dataset.tab));
        });

        // Language
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setLanguage(e.target.dataset.lang));
        });

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.backToMenu());
        });

        // Settings
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
        bindSetting('show-terrain', 'showTerrain');
        bindSetting('show-labels', 'showLabels');
    }

    // ============================================
    // LOADING
    // ============================================
    startLoadingSequence() {
        const steps = [
            { progress: 15, text: 'Initializing Cesium...', textAr: 'تهيئة Cesium...' },
            { progress: 35, text: 'Loading the world...', textAr: 'تحميل العالم...' },
            { progress: 55, text: 'Preparing hand tracking...', textAr: 'تحضير تتبع اليد...' },
            { progress: 75, text: 'Connecting to free libraries...', textAr: 'الاتصال بالمكتبات المجانية...' },
            { progress: 100, text: 'Ready to explore!', textAr: 'جاهز للاستكشاف!' }
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
    // CESIUM GLOBE
    // ============================================
    async initCesium() {
        // Cesium Ion token (free tier - no personal data)
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE3YjdhMy0yNTViLTQ0MTktOGVhMS0zZDEyYTRlYzZlMzAiLCJpZCI6NTYwODUsImlhdCI6MTY5NTA0MDA1NH0.MmK0RXva9E8Z7aW3F9X7v3z3z3z3z3z3z3z3z3z3z3z';

        this.viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: this.settings.showTerrain ? Cesium.createWorldTerrain() : undefined,
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
            infoBox: false,
            selectionIndicator: false,
            skyBox: new Cesium.SkyBox({
                sources: {
                    positiveX: 'stars_px.jpg',
                    negativeX: 'stars_nx.jpg',
                    positiveY: 'stars_py.jpg',
                    negativeY: 'stars_ny.jpg',
                    positiveZ: 'stars_pz.jpg',
                    negativeZ: 'stars_nz.jpg'
                }
            })
        });

        // Dark theme
        this.viewer.scene.globe.enableLighting = true;
        this.viewer.scene.globe.depthTestAgainstTerrain = true;

        // Add countries
        this.addCountryEntities();

        // Click handler
        this.viewer.screenSpaceEventHandler.setInputAction((click) => {
            const picked = this.viewer.scene.pick(click.position);
            if (picked && picked.id && picked.id.countryId) {
                this.selectCountry(picked.id.countryId);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // Mouse move handler
        this.viewer.screenSpaceEventHandler.setInputAction((move) => {
            const picked = this.viewer.scene.pick(move.endPosition);
            if (picked && picked.id && picked.id.countryId) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // Fly to Oman
        this.flyToCountry('oman');
    }

    addCountryEntities() {
        Object.entries(CountryData).forEach(([id, country]) => {
            // Main point
            this.viewer.entities.add({
                countryId: id,
                position: Cesium.Cartesian3.fromDegrees(country.lon, country.lat),
                point: {
                    pixelSize: 15,
                    color: Cesium.Color.fromCssColorString('#4a0e1f'),
                    outlineColor: Cesium.Color.fromCssColorString('#d4c5a9'),
                    outlineWidth: 2
                },
                label: {
                    text: this.language === 'ar' ? country.nameAr : country.name,
                    font: '14px Cinzel',
                    fillColor: Cesium.Color.fromCssColorString('#d4c5a9'),
                    outlineColor: Cesium.Color.fromCssColorString('#1a0a0f'),
                    outlineWidth: 3,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -20),
                    show: this.settings.showLabels
                }
            });

            // Glow ring
            this.viewer.entities.add({
                countryId: id + '_glow',
                position: Cesium.Cartesian3.fromDegrees(country.lon, country.lat),
                ellipse: {
                    semiMinorAxis: 50000,
                    semiMajorAxis: 50000,
                    material: Cesium.Color.fromCssColorString('#4a0e1f').withAlpha(0.3),
                    outline: true,
                    outlineColor: Cesium.Color.fromCssColorString('#d4c5a9').withAlpha(0.5),
                    outlineWidth: 1
                }
            });
        });
    }

    flyToCountry(countryId) {
        const country = CountryData[countryId];
        if (!country || !this.viewer) return;

        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(country.lon, country.lat, 2000000),
            duration: 3,
            easingFunction: Cesium.EasingFunction.QUAD_OUT
        });
    }

    resetGlobeView() {
        this.flyToCountry('oman');
    }

    // ============================================
    // HAND TRACKING - MediaPipe
    // ============================================
    async enableCamera() {
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.loading_screen?.classList.remove('hidden');

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
    }

    async initHandTracking() {
        if (!this.ui.input_video || !this.ui.hand_canvas) return;

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

        this.camera = new Camera(this.ui.input_video, {
            onFrame: async () => {
                await this.hands.send({ image: this.ui.input_video });
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
        const indexTip = landmarks[8];
        const thumbTip = landmarks[4];
        const wrist = landmarks[0];

        // Pinch distance
        const dx = indexTip.x - thumbTip.x;
        const dy = indexTip.y - thumbTip.y;
        const pinchDist = Math.sqrt(dx*dx + dy*dy);

        // Hand position
        this.handPosition = { x: 1 - indexTip.x, y: indexTip.y }; // Mirror

        // Detect gestures. Thresholds scale with Settings > Tracking Sensitivity
        // (1-10, default 5); previously that slider was wired up in the UI but
        // never actually read here, so it had no effect. At the default value
        // of 5 these equal the original hardcoded 0.08 / 0.15.
        const sensitivity = this.settings.trackingSensitivity || 5;
        const pinchThreshold = 0.05 + (sensitivity / 10) * 0.06;
        const waveThreshold = 0.20 - (sensitivity / 10) * 0.10;
        if (pinchDist < pinchThreshold) {
            this.setGesture(GestureType.PINCH);
        } else if (Math.abs(landmarks[12].x - wrist.x) > waveThreshold) {
            this.setGesture(GestureType.WAVE);
        } else {
            this.setGesture(GestureType.HOVER);
        }

        // Control globe
        this.controlGlobeWithHand();
    }

    setGesture(gesture) {
        if (this.lastGesture !== gesture) {
            this.lastGesture = gesture;
            this.onGestureChange(gesture);
        }
    }

    onGestureChange(gesture) {
        const messages = {
            [GestureType.HOVER]: { icon: '✋', text: 'Move hand to rotate globe', textAr: 'حرك يدك لتدوير الجلوب' },
            [GestureType.PINCH]: { icon: '👌', text: 'Pinch to select country', textAr: 'قرص لاختيار البلد' },
            [GestureType.WAVE]: { icon: '👋', text: 'Wave to zoom', textAr: 'لوح للتكبير' },
            [GestureType.NONE]: { icon: '✋', text: 'Show your hand', textAr: 'أظهر يدك' }
        };

        const msg = messages[gesture];
        this.updateGestureFeedback(msg.icon, this.language === 'ar' ? msg.textAr : msg.text);
    }

    controlGlobeWithHand() {
        if (!this.viewer || this.state !== GameState.GLOBE) return;

        const sensitivity = this.settings.trackingSensitivity * 0.0005;

        // Rotate globe based on hand position
        const deltaX = (this.handPosition.x - 0.5) * sensitivity;
        const deltaY = (this.handPosition.y - 0.5) * sensitivity;

        this.viewer.camera.rotateLeft(deltaX);
        this.viewer.camera.rotateUp(deltaY);

        // Update coordinates display
        const cartographic = this.viewer.camera.positionCartographic;
        if (cartographic && this.ui.coordinates) {
            const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
            const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
            this.ui.coordinates.textContent = `Lat: ${lat}° | Lon: ${lon}°`;
        }

        // Pinch to select
        if (this.lastGesture === GestureType.PINCH) {
            // Simulate click at center
            const center = new Cesium.Cartesian2(
                this.viewer.canvas.clientWidth / 2,
                this.viewer.canvas.clientHeight / 2
            );
            const picked = this.viewer.scene.pick(center);
            if (picked && picked.id && picked.id.countryId) {
                this.selectCountry(picked.id.countryId);
            }
        }
    }

    drawHandSkeleton(landmarks) {
        if (!this.ui.hand_ctx || !this.settings.showSkeleton) return;
        const ctx = this.ui.hand_ctx;
        const w = this.ui.hand_canvas.width;
        const h = this.ui.hand_canvas.height;

        ctx.clearRect(0, 0, w, h);

        const connections = [
            [0,1],[1,2],[2,3],[3,4],
            [0,5],[5,6],[6,7],[7,8],
            [0,9],[9,10],[10,11],[11,12],
            [0,13],[13,14],[14,15],[15,16],
            [0,17],[17,18],[18,19],[19,20]
        ];

        ctx.strokeStyle = 'rgba(212, 197, 169, 0.4)';
        ctx.lineWidth = 1;

        connections.forEach(([start, end]) => {
            const p1 = landmarks[start];
            const p2 = landmarks[end];
            ctx.beginPath();
            ctx.moveTo((1 - p1.x) * w, p1.y * h);
            ctx.lineTo((1 - p2.x) * w, p2.y * h);
            ctx.stroke();
        });

        landmarks.forEach((lm, i) => {
            ctx.beginPath();
            ctx.arc((1 - lm.x) * w, lm.y * h, i === 8 ? 5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = i === 8 ? 'rgba(212, 197, 169, 0.9)' : 'rgba(74, 14, 31, 0.7)';
            ctx.fill();
        });
    }

    clearHandCanvas() {
        if (this.ui.hand_ctx) {
            this.ui.hand_ctx.clearRect(0, 0, this.ui.hand_canvas.width, this.ui.hand_canvas.height);
        }
    }

    // ============================================
    // COUNTRY SELECTION
    // ============================================
    selectCountry(countryId) {
        const country = CountryData[countryId];
        if (!country) return;

        this.selectedEntity = countryId;

        // Update panel
        if (this.ui.country_flag) this.ui.country_flag.textContent = country.flag;
        if (this.ui.country_name) this.ui.country_name.textContent = this.language === 'ar' ? country.nameAr : country.name;
        if (this.ui.country_name_ar) this.ui.country_name_ar.textContent = country.nameAr;
        if (this.ui.country_info) {
            this.ui.country_info.innerHTML = `<p>${this.language === 'ar' ? country.descriptionAr : country.description}</p>`;
        }

        // Show resources
        this.switchResourceTab('books');

        // Show panel
        this.ui.country_panel?.classList.remove('hidden');

        // Fly to country
        this.flyToCountry(countryId);
    }

    closeCountryPanel() {
        this.ui.country_panel?.classList.add('hidden');
        this.selectedEntity = null;
    }

    switchResourceTab(tab) {
        const country = CountryData[this.selectedEntity];
        if (!country) return;

        // Update tabs
        document.querySelectorAll('.resource-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });

        // Update content
        let content = '';
        if (tab === 'books') {
            content = country.books.map(book => `
                <div class="resource-item">
                    <div class="resource-title">📖 ${book.title}</div>
                    <div class="resource-author">${book.author}</div>
                    <a href="${book.url}" target="_blank" class="resource-link">Read Free</a>
                </div>
            `).join('');
        } else if (tab === 'courses') {
            content = country.courses.map(course => `
                <div class="resource-item">
                    <div class="resource-title">🎓 ${course.title}</div>
                    <div class="resource-provider">${course.provider}</div>
                    <a href="${course.url}" target="_blank" class="resource-link">Start Learning</a>
                </div>
            `).join('');
        } else if (tab === 'history') {
            content = country.history.map(h => `
                <div class="resource-item">
                    <div class="resource-date">📅 ${h.date}</div>
                    <div class="resource-event">${this.language === 'ar' ? h.eventAr : h.event}</div>
                </div>
            `).join('');
        }

        if (this.ui.resource_content) this.ui.resource_content.innerHTML = content;
    }

    // ============================================
    // BOOKS API - Gutendex (No API Key!)
    // ============================================
    async searchBooks() {
        const query = document.getElementById('book-search')?.value || 'history';
        const grid = this.ui.books_grid;
        if (!grid) return;

        grid.innerHTML = '<div class="loading">Searching...</div>';

        try {
            const response = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
            const data = await response.json();

            grid.innerHTML = data.results.slice(0, 12).map(book => `
                <div class="book-card">
                    <div class="book-cover">📚</div>
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.authors[0]?.name || 'Unknown'}</div>
                    <a href="${book.formats['text/plain'] || book.formats['text/html'] || '#'}" 
                       target="_blank" class="book-link">Read Free</a>
                </div>
            `).join('');
        } catch (err) {
            grid.innerHTML = '<div class="error">Failed to load books. Please try again.</div>';
        }
    }

    // ============================================
    // COURSES
    // ============================================
    showCourses() {
        this.hideAllScreens();
        this.ui.courses_panel?.classList.remove('hidden');
        this.state = GameState.COURSES;

        const grid = this.ui.courses_grid;
        if (!grid) return;

        grid.innerHTML = FreeCourses.map(course => `
            <div class="course-card">
                <div class="course-icon">${course.icon}</div>
                <div class="course-title">${course.title}</div>
                <div class="course-provider">${course.provider}</div>
                <a href="${course.url}" target="_blank" class="course-link">Start Free</a>
            </div>
        `).join('');
    }

    // ============================================
    // HISTORY
    // ============================================
    showHistory() {
        this.hideAllScreens();
        this.ui.history_panel?.classList.remove('hidden');
        this.state = GameState.HISTORY;

        const container = this.ui.timeline_container;
        if (!container) return;

        const oman = CountryData.oman;
        container.innerHTML = oman.history.map(h => `
            <div class="timeline-item">
                <div class="timeline-date">${h.date}</div>
                <div class="timeline-event">${this.language === 'ar' ? h.eventAr : h.event}</div>
            </div>
        `).join('');
    }

    // ============================================
    // UI MANAGEMENT
    // ============================================
    showMenu() {
        this.hideAllScreens();
        this.ui.main_menu?.classList.remove('hidden');
        this.state = GameState.MENU;
    }

    async startGlobe() {
        this.hideAllScreens();
        this.ui.globe_area?.classList.remove('hidden');
        this.state = GameState.GLOBE;

        // Initialize Cesium
        await this.initCesium();
    }

    showBooks() {
        this.hideAllScreens();
        this.ui.books_panel?.classList.remove('hidden');
        this.state = GameState.BOOKS;
        this.searchBooks();
    }

    showSettings() {
        this.hideAllScreens();
        this.ui.settings_screen?.classList.remove('hidden');
        this.state = GameState.SETTINGS;
    }

    backToMenu() {
        this.hideAllScreens();
        this.ui.main_menu?.classList.remove('hidden');
        this.state = GameState.MENU;
    }

    hideAllScreens() {
        this.ui.loading_screen?.classList.add('hidden');
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.main_menu?.classList.add('hidden');
        this.ui.globe_area?.classList.add('hidden');
        this.ui.books_panel?.classList.add('hidden');
        this.ui.courses_panel?.classList.add('hidden');
        this.ui.history_panel?.classList.add('hidden');
        this.ui.settings_screen?.classList.add('hidden');
        this.ui.country_panel?.classList.add('hidden');
    }

    // ============================================
    // LANGUAGE
    // ============================================
    setLanguage(lang) {
        this.language = lang;
        document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.body.setAttribute('lang', lang);

        document.querySelectorAll('[data-en][data-ar]').forEach(el => {
            el.textContent = lang === 'ar' ? el.dataset.ar : el.dataset.en;
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update placeholders
        const searchInput = document.getElementById('book-search');
        if (searchInput) {
            searchInput.placeholder = lang === 'ar' ? 'ابحث في الكتب...' : 'Search books...';
        }
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
// START
// ============================================
const app = new WindowOfKnowledge();

export default app;
