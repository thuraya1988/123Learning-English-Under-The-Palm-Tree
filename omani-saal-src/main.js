/* ============================================
   الصعل العماني - The Omani Saal
   Main Game Engine - Three.js WebGL
   Professional PBR + HDRi + Bloom + Dynamic Lighting
   ============================================ */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const GameState = {
    MENU: 'menu', LOADING: 'loading', PLAYING: 'playing',
    PAUSED: 'paused', DIALOG: 'dialog', STORY: 'story',
    CONTROLS: 'controls', SETTINGS: 'settings', CREDITS: 'credits',
    ACHIEVEMENTS: 'achievements'
};

const QuestState = {
    NONE: 'none',
    POTTERY_INTRO: 'pottery_intro', POTTERY_COLLECT_CLAY: 'pottery_collect_clay',
    POTTERY_SHAPE: 'pottery_shape', POTTERY_DECORATE: 'pottery_decorate',
    POTTERY_FIRE: 'pottery_fire', POTTERY_COMPLETE: 'pottery_complete',
    PALM_INTRO: 'palm_intro', PALM_CLIMB: 'palm_climb',
    PALM_HARVEST: 'palm_harvest', PALM_COMPLETE: 'palm_complete',
    NIGHT_INTRO: 'night_intro', NIGHT_DELIVER: 'night_deliver',
    NIGHT_COMPLETE: 'night_complete'
};

const CameraMode = { THIRD_PERSON: 'third', FIRST_PERSON: 'first' };
const WeatherState = { CLEAR: 'clear', RAIN: 'rain', FOG: 'fog' };

const Achievements = {
    first_step: { id: 'first_step', name: 'أول خطوة', desc: 'ابدأ المغامرة في قرية القرواشية', icon: '👣', unlocked: false },
    pottery_master: { id: 'pottery_master', name: 'سيد الفخار', desc: 'أكمل صناعة 5 قطع فخار', icon: '🏺', unlocked: false },
    palm_climber: { id: 'palm_climber', name: 'متسلق النخيل', desc: 'تسلق 10 نخيل', icon: '🌴', unlocked: false },
    generous: { id: 'generous', name: 'الكريم', desc: 'وزع 20 هدية على الفقراء', icon: '🎁', unlocked: false },
    night_walker: { id: 'night_walker', name: 'سائر الليل', desc: 'أكمل التوزيع ليلاً بدون ما يمسكك الحارس', icon: '🌙', unlocked: false },
    rain_dancer: { id: 'rain_dancer', name: 'راكص المطر', desc: 'شغل المطر السايبربانك 5 مرات', icon: '🌧️', unlocked: false },
    time_traveler: { id: 'time_traveler', name: 'مسافر الوقت', desc: 'استخدم تسريع الوقت 10 مرات', icon: '⏰', unlocked: false },
    omani_hero: { id: 'omani_hero', name: 'بطل عمان', desc: 'أكمل كل المهام في القرية', icon: '🗡️', unlocked: false }
};

class Game {
    constructor() {
        this.state = GameState.LOADING;
        this.questState = QuestState.NONE;
        this.score = 0;
        this.health = 5;
        this.maxHealth = 5;
        this.inventory = [];
        this.maxInventory = 4;
        this.cameraMode = CameraMode.THIRD_PERSON;
        this.weather = WeatherState.CLEAR;
        this.timeOfDay = 6;
        this.timeSpeed = 1;
        this.isTimeAccelerated = false;
        this.rainCount = 0;
        this.timeTravelCount = 0;
        this.potteryCount = 0;
        this.palmClimbCount = 0;
        this.giftsDelivered = 0;
        this.achievements = JSON.parse(JSON.stringify(Achievements));

        this.scene = null; this.camera = null; this.renderer = null;
        this.composer = null;
        this.player = null; this.playerMesh = null;
        this.environment = new Map();
        this.interactables = []; this.npcs = [];
        this.particles = []; this.rainParticles = null;
        this.dustParticles = null;
        this.keys = {}; this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.cameraOffset = new THREE.Vector3(0, 8, 12);
        this.clock = new THREE.Clock();
        this.mixers = []; this.animations = {};
        this.ui = {};
        this.settings = {
            musicVolume: 70, sfxVolume: 80, graphicsQuality: 'medium',
            cyberpunkEffects: true, shadowsEnabled: true, dynamicFog: true,
            mouseSensitivity: 5, invertY: false, language: 'ar'
        };
        this.lights = {};
        this.sunLight = null; this.floodLight = null; this.rimLight = null;
        this.pmremGenerator = null;
        this.scarf = null;
        this.spiderRing1 = null; this.spiderRing2 = null;

        this.init();
    }

    init() {
        this.initUI();
        this.initThreeJS();
        this.initPMREM();
        this.initProfessionalLighting();
        this.initEnvironment();
        this.initPlayer();
        this.initInput();
        this.initPostProcessing();
        this.initDustParticles();
        this.startLoadingSequence();
    }

    initUI() {
        const ids = ['loading-screen','loading-bar-fill','loading-text','main-menu','game-hud',
            'story-screen','controls-screen','settings-screen','credits-screen','achievements-screen',
            'pause-menu','interaction-prompt','dialog-box','dialog-text','dialog-avatar','dialog-name',
            'quest-title','quest-desc','score-text','health-hearts','time-text','time-period',
            'weather-icon','weather-text','minimap'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            this.ui[id.replace(/-/g, '_')] = el;
            this.ui[id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = el;
        });
        this.ui.loadingBar = this.ui.loadingBarFill;
        this.ui.minimapCtx = this.ui.minimap?.getContext('2d');

        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleMenuAction(e));
        });
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleBackAction(e));
        });
        document.getElementById('btn-resume')?.addEventListener('click', () => this.resumeGame());
        document.getElementById('btn-restart')?.addEventListener('click', () => this.restartGame());
        document.getElementById('btn-quit')?.addEventListener('click', () => this.quitToMenu());
        this.initSettingsListeners();
        this.ui.dialogBox?.addEventListener('click', () => this.advanceDialog());
        this.initMenuParticles();
    }

    initSettingsListeners() {
        const bind = (id, key, valId) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', (e) => {
                this.settings[key] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                if (valId) document.getElementById(valId).textContent = e.target.value + (key.includes('Volume') ? '%' : '');
                if (key === 'graphicsQuality') this.updateGraphicsQuality();
                if (key === 'cyberpunkEffects') this.updatePostProcessing();
                if (key === 'shadowsEnabled') this.updateShadows();
                if (key === 'dynamicFog') this.updateFog();
                if (key === 'language') this.updateLanguage();
            });
        };
        bind('music-volume', 'musicVolume', 'music-volume-val');
        bind('sfx-volume', 'sfxVolume', 'sfx-volume-val');
        bind('graphics-quality', 'graphicsQuality');
        bind('cyberpunk-effects', 'cyberpunkEffects');
        bind('shadows-enabled', 'shadowsEnabled');
        bind('dynamic-fog', 'dynamicFog');
        bind('mouse-sensitivity', 'mouseSensitivity', 'mouse-sensitivity-val');
        bind('invert-y', 'invertY');
        bind('language', 'language');
    }

    initThreeJS() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0f);
        this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.008);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 10, 20);

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('game-canvas'),
            antialias: true, alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        window.addEventListener('resize', () => this.onWindowResize());
    }

    initPMREM() {
        this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.pmremGenerator.compileEquirectangularShader();
    }

    initProfessionalLighting() {
        const ambient = new THREE.AmbientLight(0x1a1a3e, 0.2);
        this.scene.add(ambient);
        this.lights.ambient = ambient;

        this.sunLight = new THREE.DirectionalLight(0xffd4a0, 1.5);
        this.sunLight.position.set(50, 80, 50);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.set(4096, 4096);
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 300;
        this.sunLight.shadow.camera.left = -150;
        this.sunLight.shadow.camera.right = 150;
        this.sunLight.shadow.camera.top = 150;
        this.sunLight.shadow.camera.bottom = -150;
        this.sunLight.shadow.bias = -0.0005;
        this.sunLight.shadow.normalBias = 0.02;
        this.scene.add(this.sunLight);
        this.lights.sun = this.sunLight;

        this.floodLight = new THREE.PointLight(0x00d4ff, 0.6, 100);
        this.floodLight.position.set(-30, 15, -30);
        this.scene.add(this.floodLight);
        this.lights.flood = this.floodLight;

        this.rimLight = new THREE.SpotLight(0xffd700, 2, 60, Math.PI / 4, 0.5, 1);
        this.rimLight.position.set(0, 20, -20);
        this.rimLight.target.position.set(0, 0, 0);
        this.scene.add(this.rimLight);
        this.scene.add(this.rimLight.target);
        this.lights.rim = this.rimLight;

        const neonPositions = [
            { pos: [20, 3, 20], color: 0xffd700, intensity: 1.2, distance: 25 },
            { pos: [-20, 3, 15], color: 0xff006e, intensity: 0.8, distance: 20 },
            { pos: [15, 3, -20], color: 0x00d4ff, intensity: 0.8, distance: 20 },
            { pos: [-15, 3, -15], color: 0x9d4edd, intensity: 0.6, distance: 18 },
        ];

        neonPositions.forEach((cfg, i) => {
            const light = new THREE.PointLight(cfg.color, cfg.intensity, cfg.distance);
            light.position.set(...cfg.pos);
            this.scene.add(light);
            this.lights[`neon_${i}`] = light;
        });

        const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.3);
        this.scene.add(hemiLight);
        this.lights.hemi = hemiLight;
    }

    updateTimeOfDay() {
        const t = this.timeOfDay;
        const angle = ((t - 6) / 12) * Math.PI;
        const sunHeight = Math.sin(angle) * 80;
        const sunX = Math.cos(angle) * 100;

        if (this.sunLight) {
            this.sunLight.position.set(sunX, Math.max(sunHeight, 5), 50);
            if (t < 6 || t > 20) {
                this.sunLight.intensity = 0.1;
                this.sunLight.color.setHex(0x4466aa);
                this.scene.fog.color.setHex(0x0a0a1a);
                this.scene.fog.density = 0.012;
            } else if (t < 8 || t > 17) {
                this.sunLight.intensity = 0.8;
                this.sunLight.color.setHex(0xff8844);
                this.scene.fog.color.setHex(0x1a1520);
                this.scene.fog.density = 0.01;
            } else {
                this.sunLight.intensity = 1.5;
                this.sunLight.color.setHex(0xffd4a0);
                this.scene.fog.color.setHex(0x0a0a0f);
                this.scene.fog.density = 0.006;
            }
        }

        const hours = Math.floor(t);
        const minutes = Math.floor((t % 1) * 60);
        const timeStr = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
        if (this.ui.time_text) this.ui.time_text.textContent = timeStr;

        let period = 'صباح';
        if (t >= 12 && t < 15) period = 'ظهر';
        else if (t >= 15 && t < 18) period = 'عصر';
        else if (t >= 18 && t < 20) period = 'مغرب';
        else if (t >= 20 || t < 5) period = 'ليل';
        else if (t >= 5 && t < 6) period = 'فجر';
        if (this.ui.time_period) this.ui.time_period.textContent = period;
    }

    toggleTimeAcceleration() {
        this.isTimeAccelerated = !this.isTimeAccelerated;
        this.timeSpeed = this.isTimeAccelerated ? 100 : 1;
        if (this.isTimeAccelerated) {
            this.timeTravelCount++;
            if (this.timeTravelCount >= 10) this.unlockAchievement('time_traveler');
        }
    }

    // ============================================
    // ENVIRONMENT - Professional PBR Village
    // ============================================
    initEnvironment() {
        this.createTerrain();
        this.createMountains();
        this.createPalmTrees();
        this.createPotteryWorkshop();
        this.createVillageHouses();
        this.createWadi();
        this.createMosque();
        this.createSchool();
        this.createShop();
        this.createFarm();
        this.createKhalwaWorkshop();
        this.createClothingWorkshop();
        this.createSilverWorkshop();
        this.createAnimalFarm();
        this.createCyberpunkBuilding();
        this.createSpiderMonument();
        this.createSkybox();
        this.createNeonGridFloor();
    }

    createTerrain() {
        const groundGeo = new THREE.PlaneGeometry(400, 400, 200, 200);
        const pos = groundGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i), y = pos.getY(i);
            const h = Math.sin(x * 0.03) * Math.cos(y * 0.03) * 3 +
                      Math.sin(x * 0.08 + y * 0.05) * 1.5 +
                      Math.sin(x * 0.15) * 0.5 +
                      (Math.random() - 0.5) * 0.3;
            pos.setZ(i, h);
        }
        groundGeo.computeVertexNormals();

        const groundMat = new THREE.MeshStandardMaterial({
            color: 0xc2b280, roughness: 0.95, metalness: 0.0, envMapIntensity: 0.5,
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
        this.environment.set('ground', ground);
    }

    createMountains() {
        const mountainData = [
            { x: -120, z: -80, scale: 2.5, color: 0x6b5b4f },
            { x: -60, z: -100, scale: 2.0, color: 0x7a6b5a },
            { x: 80, z: -120, scale: 3.0, color: 0x5c4f42 },
            { x: 140, z: -60, scale: 1.3, color: 0x6b5b4f },
            { x: -140, z: 40, scale: 1.8, color: 0x7a6b5a },
            { x: 160, z: 20, scale: 2.0, color: 0x5c4f42 },
        ];

        mountainData.forEach((data, i) => {
            const geo = new THREE.ConeGeometry(20 * data.scale, 50 * data.scale, 8);
            const mat = new THREE.MeshStandardMaterial({
                color: data.color, roughness: 0.98, metalness: 0.0, flatShading: true,
            });
            const mountain = new THREE.Mesh(geo, mat);
            mountain.position.set(data.x, 25 * data.scale - 5, data.z);
            mountain.castShadow = true;
            mountain.receiveShadow = true;
            this.scene.add(mountain);
            this.environment.set(`mountain_${i}`, mountain);
        });
    }

    createPalmTrees() {
        const palmPositions = [
            { x: 15, z: 10 }, { x: 25, z: 15 }, { x: 10, z: 25 },
            { x: 30, z: 5 }, { x: 5, z: 20 }, { x: 20, z: 30 },
            { x: -10, z: 15 }, { x: -5, z: 25 }, { x: 35, z: 20 },
            { x: 12, z: 8 }, { x: 40, z: 30 }, { x: -15, z: 35 },
            { x: 50, z: 15 }, { x: -20, z: 10 }, { x: 45, z: 40 },
        ];

        palmPositions.forEach((pos, i) => {
            const palm = this.createPalmTreeModel();
            palm.position.set(pos.x, 0, pos.z);
            palm.rotation.y = Math.random() * Math.PI * 2;
            const scale = 0.8 + Math.random() * 0.4;
            palm.scale.set(scale, scale, scale);
            this.scene.add(palm);
            this.environment.set(`palm_${i}`, palm);
            palm.userData = { type: 'palm_tree', id: i, interactable: true, name: 'نخلة التمر' };
            this.interactables.push(palm);
        });
    }

    createPalmTreeModel() {
        const group = new THREE.Group();
        const trunkGeo = new THREE.CylinderGeometry(0.25, 0.45, 10, 12);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.85, metalness: 0.05 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 5;
        trunk.castShadow = true;
        group.add(trunk);

        for (let r = 0; r < 8; r++) {
            const ringGeo = new THREE.TorusGeometry(0.35 + Math.random() * 0.05, 0.02, 4, 12);
            const ringMat = new THREE.MeshStandardMaterial({ color: 0x6b4f14, roughness: 0.9 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.y = 1 + r * 1.1;
            ring.rotation.x = Math.PI / 2;
            group.add(ring);
        }

        const frondGeo = new THREE.PlaneGeometry(0.8, 4);
        const frondMat = new THREE.MeshStandardMaterial({
            color: 0x228b22, roughness: 0.6, metalness: 0.1,
            side: THREE.DoubleSide, transparent: true, opacity: 0.9,
        });

        for (let i = 0; i < 12; i++) {
            const frond = new THREE.Mesh(frondGeo, frondMat);
            frond.position.y = 9.5;
            frond.rotation.x = Math.PI / 3 + Math.random() * 0.2;
            frond.rotation.y = (i / 12) * Math.PI * 2;
            frond.rotation.z = Math.random() * 0.3;
            frond.castShadow = true;
            group.add(frond);
        }

        const dateGeo = new THREE.SphereGeometry(0.12, 6, 6);
        const dateMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.5, metalness: 0.1 });
        for (let i = 0; i < 15; i++) {
            const date = new THREE.Mesh(dateGeo, dateMat);
            const angle = (i / 15) * Math.PI * 2;
            const radius = 0.6 + Math.random() * 0.4;
            date.position.set(Math.cos(angle) * radius, 8.5 + Math.random() * 0.8, Math.sin(angle) * radius);
            group.add(date);
        }
        return group;
    }

    createPotteryWorkshop() {
        const group = new THREE.Group();
        const buildingGeo = new THREE.BoxGeometry(10, 6, 8);
        const buildingMat = new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.95, metalness: 0.0 });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = 3;
        building.castShadow = true;
        building.receiveShadow = true;
        group.add(building);

        const roofGeo = new THREE.BoxGeometry(11, 0.5, 9);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.9 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 6.25;
        group.add(roof);

        const doorGeo = new THREE.BoxGeometry(2, 2.5, 0.3);
        const doorMat = new THREE.MeshStandardMaterial({ color: 0x5c3a1e, roughness: 0.8 });
        const door = new THREE.Mesh(doorGeo, doorMat);
        door.position.set(0, 1.25, 4.1);
        group.add(door);

        const wheelGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 16);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.6, metalness: 0.2 });
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.position.set(3, 0.8, 2);
        group.add(wheel);

        const standGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.8, 8);
        const stand = new THREE.Mesh(standGeo, wheelMat);
        stand.position.set(3, 0.4, 2);
        group.add(stand);

        const clayGeo = new THREE.SphereGeometry(1, 8, 6);
        const clayMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.98, metalness: 0.0 });
        const clay = new THREE.Mesh(clayGeo, clayMat);
        clay.position.set(-3, 0.6, 2);
        clay.scale.y = 0.5;
        group.add(clay);

        const furnaceGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
        const furnaceMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.8, metalness: 0.3 });
        const furnace = new THREE.Mesh(furnaceGeo, furnaceMat);
        furnace.position.set(-3.5, 1.25, -2);
        group.add(furnace);

        const furnaceGlow = new THREE.PointLight(0xff6600, 2, 15);
        furnaceGlow.position.set(-3.5, 2.5, -2);
        group.add(furnaceGlow);

        const furnaceEmissive = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshBasicMaterial({ color: 0xff4400 })
        );
        furnaceEmissive.position.set(-3.5, 1.5, -1.25);
        group.add(furnaceEmissive);

        for (let i = 0; i < 5; i++) {
            const potGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.6, 8);
            const potMat = new THREE.MeshStandardMaterial({ color: 0xa0522d, roughness: 0.8, metalness: 0.0 });
            const pot = new THREE.Mesh(potGeo, potMat);
            pot.position.set(2 + i * 0.8, 0.3, -2);
            pot.castShadow = true;
            group.add(pot);
        }

        group.position.set(-25, 0, -15);
        this.scene.add(group);
        this.environment.set('pottery_workshop', group);
        group.userData = { type: 'pottery_workshop', interactable: true, name: 'ورشة الفخار' };
        this.interactables.push(group);
    }

    createVillageHouses() {
        const houses = [
            { x: -40, z: 15, color: 0xe8d4b8, size: [8, 5, 6] },
            { x: -35, z: 30, color: 0xd4c4a8, size: [7, 4.5, 5] },
            { x: -50, z: 25, color: 0xc8b898, size: [9, 5.5, 7] },
            { x: 50, z: -15, color: 0xe0d0b0, size: [8, 5, 6] },
            { x: 55, z: 10, color: 0xd8c8a8, size: [7, 4.5, 5] },
            { x: -30, z: -10, color: 0xe8d4b8, size: [6, 4, 5] },
        ];

        houses.forEach((data, i) => {
            const group = new THREE.Group();
            const houseGeo = new THREE.BoxGeometry(...data.size);
            const houseMat = new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.95, metalness: 0.0 });
            const house = new THREE.Mesh(houseGeo, houseMat);
            house.position.y = data.size[1] / 2;
            house.castShadow = true;
            house.receiveShadow = true;
            group.add(house);

            const roofGeo = new THREE.BoxGeometry(data.size[0] + 0.5, 0.4, data.size[2] + 0.5);
            const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.9 });
            const roof = new THREE.Mesh(roofGeo, roofMat);
            roof.position.y = data.size[1] + 0.2;
            group.add(roof);

            const doorGeo = new THREE.BoxGeometry(1.3, 2.5, 0.2);
            const doorMat = new THREE.MeshStandardMaterial({ color: 0x5c3a1e, roughness: 0.8 });
            const door = new THREE.Mesh(doorGeo, doorMat);
            door.position.set(0, 1.25, data.size[2] / 2 + 0.1);
            group.add(door);

            const winGeo = new THREE.BoxGeometry(1, 1, 0.2);
            const winMat = new THREE.MeshStandardMaterial({
                color: 0xffeebb, roughness: 0.2, metalness: 0.1,
                emissive: 0xffeebb, emissiveIntensity: 0.3,
            });
            const win = new THREE.Mesh(winGeo, winMat);
            win.position.set(1.5, data.size[1] / 2 + 0.5, data.size[2] / 2 + 0.1);
            group.add(win);

            const winLight = new THREE.PointLight(0xffeebb, 0.5, 8);
            winLight.position.set(1.5, data.size[1] / 2 + 0.5, data.size[2] / 2 + 1);
            group.add(winLight);

            group.position.set(data.x, 0, data.z);
            this.scene.add(group);
            this.environment.set(`house_${i}`, group);
            group.userData = { type: 'house', interactable: true, name: 'بيت القرية' };
            this.interactables.push(group);
        });
    }

    createMosque() {
        const group = new THREE.Group();
        const mainGeo = new THREE.BoxGeometry(15, 8, 15);
        const mainMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.9, metalness: 0.0 });
        const main = new THREE.Mesh(mainGeo, mainMat);
        main.position.y = 4;
        main.castShadow = true;
        main.receiveShadow = true;
        group.add(main);

        const domeGeo = new THREE.SphereGeometry(6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMat = new THREE.MeshStandardMaterial({ color: 0xe8d5b7, roughness: 0.7, metalness: 0.1 });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.y = 8;
        group.add(dome);

        const minaretGeo = new THREE.CylinderGeometry(0.8, 1.2, 18, 8);
        const minaretMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.9 });
        const minaret = new THREE.Mesh(minaretGeo, minaretMat);
        minaret.position.set(10, 9, 0);
        minaret.castShadow = true;
        group.add(minaret);

        const minaretTopGeo = new THREE.ConeGeometry(1.5, 3, 8);
        const minaretTop = new THREE.Mesh(minaretTopGeo, domeMat);
        minaretTop.position.set(10, 19.5, 0);
        group.add(minaretTop);

        const minaretLight = new THREE.PointLight(0x00ff00, 1, 20);
        minaretLight.position.set(10, 20, 0);
        group.add(minaretLight);

        group.position.set(-60, 0, -30);
        this.scene.add(group);
        this.environment.set('mosque', group);
        group.userData = { type: 'mosque', interactable: true, name: 'مسجد القرية' };
        this.interactables.push(group);
    }

    createSchool() {
        const group = new THREE.Group();
        const buildingGeo = new THREE.BoxGeometry(18, 6, 10);
        const buildingMat = new THREE.MeshStandardMaterial({ color: 0xf0e68c, roughness: 0.9 });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = 3;
        building.castShadow = true;
        group.add(building);

        for (let i = -2; i <= 2; i++) {
            const winGeo = new THREE.BoxGeometry(1.5, 1.5, 0.2);
            const winMat = new THREE.MeshStandardMaterial({
                color: 0x87ceeb, roughness: 0.2, emissive: 0x87ceeb, emissiveIntensity: 0.2,
            });
            const win = new THREE.Mesh(winGeo, winMat);
            win.position.set(i * 3, 4, 5.1);
            group.add(win);
        }

        group.position.set(-50, 0, 50);
        this.scene.add(group);
        this.environment.set('school', group);
        group.userData = { type: 'school', interactable: true, name: 'مدرسة القرية' };
        this.interactables.push(group);
    }

    createShop() {
        const group = new THREE.Group();
        const buildingGeo = new THREE.BoxGeometry(6, 4, 6);
        const buildingMat = new THREE.MeshStandardMaterial({ color: 0xd2691e, roughness: 0.9 });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = 2;
        building.castShadow = true;
        group.add(building);

        const signGeo = new THREE.BoxGeometry(4, 0.8, 0.2);
        const signMat = new THREE.MeshStandardMaterial({
            color: 0xffd700, roughness: 0.4, metalness: 0.3,
            emissive: 0xffd700, emissiveIntensity: 0.3,
        });
        const sign = new THREE.Mesh(signGeo, signMat);
        sign.position.set(0, 4.5, 3.1);
        group.add(sign);

        group.position.set(30, 0, -25);
        this.scene.add(group);
        this.environment.set('shop', group);
        group.userData = { type: 'shop', interactable: true, name: 'دكان البقالة' };
        this.interactables.push(group);
    }

    createFarm() {
        const group = new THREE.Group();
        for (let x = -2; x <= 2; x++) {
            for (let z = -2; z <= 2; z++) {
                const plotGeo = new THREE.BoxGeometry(3, 0.3, 3);
                const plotMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.95 });
                const plot = new THREE.Mesh(plotGeo, plotMat);
                plot.position.set(x * 3.5, 0.15, z * 3.5);
                group.add(plot);

                if (Math.random() > 0.3) {
                    const plantGeo = new THREE.ConeGeometry(0.3, 0.8, 4);
                    const plantMat = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.7 });
                    const plant = new THREE.Mesh(plantGeo, plantMat);
                    plant.position.set(x * 3.5, 0.7, z * 3.5);
                    group.add(plant);
                }
            }
        }
        group.position.set(60, 0, 30);
        this.scene.add(group);
        this.environment.set('farm', group);
        group.userData = { type: 'farm', interactable: true, name: 'مزرعة القرية' };
        this.interactables.push(group);
    }

    createKhalwaWorkshop() {
        const group = new THREE.Group();
        const buildingGeo = new THREE.BoxGeometry(8, 5, 6);
        const buildingMat = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.9 });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = 2.5;
        building.castShadow = true;
        group.add(building);

        for (let i = 0; i < 4; i++) {
            const barrelGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 8);
            const barrelMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 });
            const barrel = new THREE.Mesh(barrelGeo, barrelMat);
            barrel.position.set(-2 + i * 1.2, 0.6, 2);
            group.add(barrel);
        }

        group.position.set(40, 0, 40);
        this.scene.add(group);
        this.environment.set('khalwa', group);
        group.userData = { type: 'khalwa', interactable: true, name: 'معمل الخلوى والعسل' };
        this.interactables.push(group);
    }

    createClothingWorkshop() {
        const group = new THREE.Group();
        const buildingGeo = new THREE.BoxGeometry(7, 5, 5);
        const buildingMat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.9 });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = 2.5;
        building.castShadow = true;
        group.add(building);
        group.position.set(-20, 0, 45);
        this.scene.add(group);
        this.environment.set('clothing', group);
        group.userData = { type: 'clothing', interactable: true, name: 'معمل الكمة والملابس' };
        this.interactables.push(group);
    }

    createSilverWorkshop() {
        const group = new THREE.Group();
        const buildingGeo = new THREE.BoxGeometry(6, 4, 5);
        const buildingMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.3, metalness: 0.8 });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = 2;
        building.castShadow = true;
        group.add(building);

        const silverLight = new THREE.PointLight(0xffffff, 1, 15);
        silverLight.position.set(0, 3, 0);
        group.add(silverLight);

        group.position.set(20, 0, 50);
        this.scene.add(group);
        this.environment.set('silver', group);
        group.userData = { type: 'silver', interactable: true, name: 'معمل الفضيات والأحجار' };
        this.interactables.push(group);
    }

    createAnimalFarm() {
        const group = new THREE.Group();
        const barnGeo = new THREE.BoxGeometry(12, 6, 8);
        const barnMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.9 });
        const barn = new THREE.Mesh(barnGeo, barnMat);
        barn.position.y = 3;
        barn.castShadow = true;
        group.add(barn);

        for (let i = -3; i <= 3; i++) {
            const postGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 4);
            const postMat = new THREE.MeshStandardMaterial({ color: 0x8b7355 });
            const post = new THREE.Mesh(postGeo, postMat);
            post.position.set(i * 2, 0.75, 6);
            group.add(post);
        }

        for (let i = 0; i < 3; i++) {
            const cowGeo = new THREE.BoxGeometry(1.5, 1, 2);
            const cowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
            const cow = new THREE.Mesh(cowGeo, cowMat);
            cow.position.set(-3 + i * 2.5, 0.5, 8);
            group.add(cow);
        }

        group.position.set(70, 0, -20);
        this.scene.add(group);
        this.environment.set('animal_farm', group);
        group.userData = { type: 'animal_farm', interactable: true, name: 'مزرعة الحيوانات' };
        this.interactables.push(group);
    }

    createCyberpunkBuilding() {
        const group = new THREE.Group();
        const towerGeo = new THREE.BoxGeometry(8, 25, 8);
        const towerMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.2, metalness: 0.8 });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.y = 12.5;
        tower.castShadow = true;
        group.add(tower);

        const windowColors = [0xff006e, 0x00d4ff, 0xffd700, 0x9d4edd];
        for (let floor = 0; floor < 6; floor++) {
            for (let side = 0; side < 4; side++) {
                const winGeo = new THREE.PlaneGeometry(1, 1.5);
                const winMat = new THREE.MeshStandardMaterial({
                    color: windowColors[Math.floor(Math.random() * windowColors.length)],
                    emissive: windowColors[Math.floor(Math.random() * windowColors.length)],
                    emissiveIntensity: 2, roughness: 0.1, metalness: 0.5,
                });
                const win = new THREE.Mesh(winGeo, winMat);
                const angle = (side / 4) * Math.PI * 2;
                win.position.set(Math.sin(angle) * 4.05, 3 + floor * 3.5, Math.cos(angle) * 4.05);
                win.rotation.y = angle + Math.PI;
                group.add(win);
            }
        }

        const stripGeo = new THREE.BoxGeometry(8.2, 0.2, 0.2);
        const stripMat = new THREE.MeshStandardMaterial({
            color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 3,
        });
        for (let i = 0; i < 5; i++) {
            const strip = new THREE.Mesh(stripGeo, stripMat);
            strip.position.set(0, 5 + i * 4, 4.1);
            group.add(strip);
            const strip2 = new THREE.Mesh(stripGeo, stripMat);
            strip2.position.set(0, 5 + i * 4, -4.1);
            group.add(strip2);
        }

        const antennaGeo = new THREE.CylinderGeometry(0.1, 0.3, 8, 6);
        const antennaMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.9, roughness: 0.1 });
        const antenna = new THREE.Mesh(antennaGeo, antennaMat);
        antenna.position.y = 29;
        group.add(antenna);

        const antennaLight = new THREE.PointLight(0xff0000, 2, 20);
        antennaLight.position.y = 33;
        group.add(antennaLight);

        group.position.set(90, 0, -50);
        this.scene.add(group);
        this.environment.set('cyberpunk_tower', group);
    }

    createSpiderMonument() {
        const group = new THREE.Group();

        const sphereGeo = new THREE.IcosahedronGeometry(2, 2);
        const sphereMat = new THREE.MeshPhysicalMaterial({
            color: 0x00d4ff, roughness: 0.0, metalness: 0.1,
            transmission: 0.9, thickness: 1.0,
            emissive: 0x00d4ff, emissiveIntensity: 0.5,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.y = 6;
        group.add(sphere);

        const coreGeo = new THREE.IcosahedronGeometry(0.8, 1);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 2,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.y = 6;
        group.add(core);

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const legGroup = new THREE.Group();

            const upperGeo = new THREE.CylinderGeometry(0.15, 0.1, 4, 6);
            const legMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.2, metalness: 0.9 });
            const upper = new THREE.Mesh(upperGeo, legMat);
            upper.position.y = 2;
            upper.rotation.z = Math.PI / 4;
            legGroup.add(upper);

            const lowerGeo = new THREE.CylinderGeometry(0.1, 0.05, 4, 6);
            const lower = new THREE.Mesh(lowerGeo, legMat);
            lower.position.set(1.5, -0.5, 0);
            lower.rotation.z = -Math.PI / 3;
            legGroup.add(lower);

            const ringGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 16);
            const ringMat = new THREE.MeshStandardMaterial({
                color: 0xff006e, emissive: 0xff006e, emissiveIntensity: 2,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.y = 3;
            ring.rotation.x = Math.PI / 2;
            legGroup.add(ring);

            legGroup.position.set(Math.cos(angle) * 1.5, 4, Math.sin(angle) * 1.5);
            legGroup.rotation.y = angle;
            group.add(legGroup);
        }

        const ring1Geo = new THREE.TorusGeometry(3.5, 0.05, 8, 32);
        const ring1Mat = new THREE.MeshStandardMaterial({
            color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 2,
        });
        this.spiderRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
        this.spiderRing1.position.y = 6;
        group.add(this.spiderRing1);

        const ring2Geo = new THREE.TorusGeometry(4.5, 0.05, 8, 32);
        const ring2Mat = new THREE.MeshStandardMaterial({
            color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 2,
        });
        this.spiderRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
        this.spiderRing2.position.y = 6;
        this.spiderRing2.rotation.x = Math.PI / 2;
        group.add(this.spiderRing2);

        const glowLight = new THREE.PointLight(0x00d4ff, 3, 30);
        glowLight.position.y = 6;
        group.add(glowLight);

        group.position.set(0, 0, -60);
        this.scene.add(group);
        this.environment.set('spider_monument', group);
    }

    createNeonGridFloor() {
        const gridHelper = new THREE.GridHelper(400, 80, 0xffd700, 0x1a1a2e);
        gridHelper.position.y = 0.05;
        gridHelper.material.opacity = 0.15;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        this.environment.set('neon_grid', gridHelper);
    }

    createWadi() {
        const wadiGeo = new THREE.PlaneGeometry(30, 120, 30, 60);
        const wadiMat = new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 1.0, metalness: 0.0 });
        const wadi = new THREE.Mesh(wadiGeo, wadiMat);
        wadi.rotation.x = -Math.PI / 2;
        wadi.position.set(80, -0.8, 0);
        wadi.receiveShadow = true;
        this.scene.add(wadi);
        this.environment.set('wadi', wadi);

        for (let i = 0; i < 20; i++) {
            const rockGeo = new THREE.DodecahedronGeometry(0.5 + Math.random() * 1.5);
            const rockMat = new THREE.MeshStandardMaterial({ color: 0x6b5b4f, roughness: 0.95, metalness: 0.0 });
            const rock = new THREE.Mesh(rockGeo, rockMat);
            rock.position.set(80 + (Math.random() - 0.5) * 20, 0.3, (Math.random() - 0.5) * 100);
            rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            rock.castShadow = true;
            this.scene.add(rock);
        }
    }

    createSkybox() {
        const skyGeo = new THREE.SphereGeometry(500, 32, 32);
        const skyMat = new THREE.MeshBasicMaterial({ color: 0x0a0a1a, side: THREE.BackSide });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        this.scene.add(sky);

        const starsGeo = new THREE.BufferGeometry();
        const starsCount = 3000;
        const positions = new Float32Array(starsCount * 3);
        const colors = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 480;
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            const colorType = Math.random();
            if (colorType < 0.7) { colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; }
            else if (colorType < 0.85) { colors[i * 3] = 1; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.7; }
            else { colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1; }
        }

        starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const starsMat = new THREE.PointsMaterial({
            size: 0.8, transparent: true, opacity: 0.9,
            vertexColors: true, blending: THREE.AdditiveBlending,
        });
        const stars = new THREE.Points(starsGeo, starsMat);
        this.scene.add(stars);
        this.environment.set('stars', stars);
    }

    // ============================================
    // PARTICLE SYSTEMS
    // ============================================
    initDustParticles() {
        const particlesGeo = new THREE.BufferGeometry();
        const count = 2000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = Math.random() * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

            const colorType = Math.random();
            if (colorType < 0.4) { colors[i * 3] = 1; colors[i * 3 + 1] = 0.84; colors[i * 3 + 2] = 0; }
            else if (colorType < 0.7) { colors[i * 3] = 0; colors[i * 3 + 1] = 0.83; colors[i * 3 + 2] = 1; }
            else { colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0.43; }

            sizes[i] = Math.random() * 0.5 + 0.1;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particlesGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particlesMat = new THREE.PointsMaterial({
            size: 0.3, transparent: true, opacity: 0.6,
            vertexColors: true, blending: THREE.AdditiveBlending, sizeAttenuation: true,
        });

        this.dustParticles = new THREE.Points(particlesGeo, particlesMat);
        this.scene.add(this.dustParticles);
    }

    toggleRain() {
        this.weather = this.weather === WeatherState.RAIN ? WeatherState.CLEAR : WeatherState.RAIN;
        if (this.weather === WeatherState.RAIN) {
            this.createRain();
            this.rainCount++;
            if (this.rainCount >= 5) this.unlockAchievement('rain_dancer');
        } else {
            this.removeRain();
        }
        this.updateWeatherUI();
    }

    createRain() {
        if (this.rainParticles) return;
        const rainGeo = new THREE.BufferGeometry();
        const rainCount = 5000;
        const positions = new Float32Array(rainCount * 3);
        for (let i = 0; i < rainCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = Math.random() * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        }
        rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const rainMat = new THREE.PointsMaterial({
            color: 0x00d4ff, size: 0.2, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
        });
        this.rainParticles = new THREE.Points(rainGeo, rainMat);
        this.scene.add(this.rainParticles);
    }

    removeRain() {
        if (this.rainParticles) {
            this.scene.remove(this.rainParticles);
            this.rainParticles.geometry.dispose();
            this.rainParticles.material.dispose();
            this.rainParticles = null;
        }
    }

    updateWeatherUI() {
        const icons = { clear: '☀️', rain: '🌧️', fog: '🌫️' };
        const texts = { clear: 'صافي', rain: 'مطر سايبربانك', fog: 'ضباب' };
        if (this.ui.weather_icon) this.ui.weather_icon.textContent = icons[this.weather];
        if (this.ui.weather_text) this.ui.weather_text.textContent = texts[this.weather];
    }

    // ============================================
    // PLAYER - Realistic Omani Saal (Shirt + Pants + Scarf)
    // ============================================
    initPlayer() {
        this.player = new THREE.Group();

        // Dishdasha (الدشداشة) - single ankle-length white robe, not shirt+pants
        const dishdashaGeo = new THREE.CylinderGeometry(0.42, 0.58, 3.2, 10);
        const dishdashaMat = new THREE.MeshStandardMaterial({ color: 0xf8f6f0, roughness: 0.75, metalness: 0.0 });
        const dishdasha = new THREE.Mesh(dishdashaGeo, dishdashaMat);
        dishdasha.position.y = 1.75;
        dishdasha.castShadow = true;
        this.player.add(dishdasha);

        // Collar tassel (furakha) placeholder at the neckline
        const tasselGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 6);
        const tasselMat = new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 0.6 });
        const tassel = new THREE.Mesh(tasselGeo, tasselMat);
        tassel.position.set(0, 3.05, 0.4);
        this.player.add(tassel);

        // Head
        const headGeo = new THREE.SphereGeometry(0.32, 8, 8);
        const headMat = new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.7 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 3.6;
        head.castShadow = true;
        this.player.add(head);

        // Kummah (الكمّة) - embroidered cap, replaces the old plain "hair" blob
        const kummahGeo = new THREE.CylinderGeometry(0.3, 0.33, 0.28, 10);
        const kummahMat = new THREE.MeshStandardMaterial({ color: 0xf0ead6, roughness: 0.8 });
        const kummah = new THREE.Mesh(kummahGeo, kummahMat);
        kummah.position.y = 3.85;
        this.player.add(kummah);

        // Kummah embroidered band (stand-in for the geometric pattern)
        const kummahBandGeo = new THREE.CylinderGeometry(0.335, 0.335, 0.09, 10);
        const kummahBandMat = new THREE.MeshStandardMaterial({ color: 0x4a6b52, roughness: 0.7 });
        const kummahBand = new THREE.Mesh(kummahBandGeo, kummahBandMat);
        kummahBand.position.y = 3.74;
        this.player.add(kummahBand);

        // Arms
        const armGeo = new THREE.CylinderGeometry(0.1, 0.12, 1.4, 6);
        const armMat = new THREE.MeshStandardMaterial({ color: 0xf8f8f8, roughness: 0.7 });

        const leftArm = new THREE.Mesh(armGeo, armMat);
        leftArm.position.set(-0.55, 2.4, 0);
        leftArm.rotation.z = Math.PI / 12;
        this.player.add(leftArm);

        const rightArm = new THREE.Mesh(armGeo, armMat);
        rightArm.position.set(0.55, 2.4, 0);
        rightArm.rotation.z = -Math.PI / 12;
        this.player.add(rightArm);

        // Hands
        const handGeo = new THREE.SphereGeometry(0.12, 6, 6);
        const handMat = new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.7 });
        const leftHand = new THREE.Mesh(handGeo, handMat);
        leftHand.position.set(-0.6, 1.6, 0);
        this.player.add(leftHand);
        const rightHand = new THREE.Mesh(handGeo, handMat);
        rightHand.position.set(0.6, 1.6, 0);
        this.player.add(rightHand);

        // Khanjar (dagger) on belt
        const khanjarHandleGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 6);
        const khanjarHandleMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.5, metalness: 0.3 });
        const khanjarHandle = new THREE.Mesh(khanjarHandleGeo, khanjarHandleMat);
        khanjarHandle.position.set(0.45, 1.6, 0.3);
        khanjarHandle.rotation.z = -Math.PI / 6;
        this.player.add(khanjarHandle);

        const khanjarBladeGeo = new THREE.BoxGeometry(0.08, 0.5, 0.02);
        const khanjarBladeMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.2, metalness: 0.9 });
        const khanjarBlade = new THREE.Mesh(khanjarBladeGeo, khanjarBladeMat);
        khanjarBlade.position.set(0.55, 1.35, 0.3);
        khanjarBlade.rotation.z = -Math.PI / 6;
        this.player.add(khanjarBlade);

        // Omani flag scarf (شاح علم عمان) - on back, flowing
        const scarfGeo = new THREE.PlaneGeometry(1.2, 1.8, 4, 4);
        const scarfMat = new THREE.MeshStandardMaterial({
            color: 0xc41e3a, roughness: 0.8, side: THREE.DoubleSide,
            transparent: true, opacity: 0.95,
        });
        this.scarf = new THREE.Mesh(scarfGeo, scarfMat);
        this.scarf.position.set(0, 2.8, -0.5);
        this.scarf.rotation.y = Math.PI;
        this.player.add(this.scarf);

        // Scarf white stripe
        const whiteStripeGeo = new THREE.PlaneGeometry(1.2, 0.5, 2, 1);
        const whiteStripeMat = new THREE.MeshStandardMaterial({
            color: 0xf5f5f0, side: THREE.DoubleSide,
        });
        const whiteStripe = new THREE.Mesh(whiteStripeGeo, whiteStripeMat);
        whiteStripe.position.set(0, 2.5, -0.51);
        whiteStripe.rotation.y = Math.PI;
        this.player.add(whiteStripe);

        // Scarf green stripe
        const greenStripeGeo = new THREE.PlaneGeometry(1.2, 0.4, 2, 1);
        const greenStripeMat = new THREE.MeshStandardMaterial({
            color: 0x006400, side: THREE.DoubleSide,
        });
        const greenStripe = new THREE.Mesh(greenStripeGeo, greenStripeMat);
        greenStripe.position.set(0, 2.0, -0.51);
        greenStripe.rotation.y = Math.PI;
        this.player.add(greenStripe);

        // Sandals (نعال)
        const shoeGeo = new THREE.BoxGeometry(0.25, 0.1, 0.4);
        const shoeMat = new THREE.MeshStandardMaterial({ color: 0xa08056, roughness: 0.9 });
        const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
        leftShoe.position.set(-0.15, 0.075, 0.1);
        this.player.add(leftShoe);
        const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
        rightShoe.position.set(0.15, 0.075, 0.1);
        this.player.add(rightShoe);

        this.player.position.set(0, 0, 0);
        this.scene.add(this.player);
        this.playerMesh = this.player;

        this.player.userData = {
            speed: 5, runSpeed: 10, jumpForce: 8,
            velocity: new THREE.Vector3(), isGrounded: true,
            isRunning: false, isJumping: false,
        };
    }

    // ============================================
    // INPUT HANDLING
    // ============================================
    initInput() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', (e) => this.onMouseClick(e));
        document.addEventListener('pointerlockchange', () => this.onPointerLockChange());
    }

    onKeyDown(event) {
        this.keys[event.code] = true;

        if (event.code === 'Escape') {
            if (this.state === GameState.PLAYING) this.pauseGame();
            else if (this.state === GameState.PAUSED) this.resumeGame();
        }
        if (event.code === 'KeyE' && this.state === GameState.PLAYING) this.interact();
        if (event.code === 'KeyC' && this.state === GameState.PLAYING) this.toggleCamera();
        if (event.code === 'KeyT' && this.state === GameState.PLAYING) this.toggleTimeAcceleration();
        if (event.code === 'KeyR' && this.state === GameState.PLAYING) this.toggleRain();
        if (event.code === 'Space' && this.state === GameState.PLAYING) this.playerJump();
        if (event.code === 'Tab' && this.state === GameState.PLAYING) {
            event.preventDefault();
            this.toggleMinimap();
        }
    }

    onKeyUp(event) { this.keys[event.code] = false; }

    onMouseMove(event) {
        if (this.state !== GameState.PLAYING) return;
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        if (document.pointerLockElement) {
            const sensitivity = this.settings.mouseSensitivity * 0.001;
            const deltaX = event.movementX * sensitivity;
            const deltaY = event.movementY * sensitivity * (this.settings.invertY ? -1 : 1);
            this.camera.rotation.y -= deltaX;
            this.camera.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 6, this.camera.rotation.x - deltaY));
        }
    }

    onMouseClick(event) {
        if (this.state === GameState.PLAYING && !document.pointerLockElement) {
            document.body.requestPointerLock();
        }
    }

    onPointerLockChange() {
        if (!document.pointerLockElement && this.state === GameState.PLAYING) this.pauseGame();
    }

    toggleCamera() {
        this.cameraMode = this.cameraMode === CameraMode.THIRD_PERSON 
            ? CameraMode.FIRST_PERSON 
            : CameraMode.THIRD_PERSON;

        if (this.cameraMode === CameraMode.FIRST_PERSON) {
            this.cameraOffset.set(0, 3.5, 0.5);
        } else {
            this.cameraOffset.set(0, 8, 12);
        }
    }

    // ============================================
    // GAME LOGIC
    // ============================================
    updatePlayer(deltaTime) {
        if (!this.player) return;
        const playerData = this.player.userData;
        const speed = (this.keys['ShiftLeft'] || this.keys['ShiftRight']) ? playerData.runSpeed : playerData.speed;

        const direction = new THREE.Vector3();
        if (this.keys['KeyW'] || this.keys['ArrowUp']) direction.z -= 1;
        if (this.keys['KeyS'] || this.keys['ArrowDown']) direction.z += 1;
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) direction.x -= 1;
        if (this.keys['KeyD'] || this.keys['ArrowRight']) direction.x += 1;
        direction.normalize();

        const cameraRotation = this.camera.rotation.y;
        const moveX = direction.x * Math.cos(cameraRotation) - direction.z * Math.sin(cameraRotation);
        const moveZ = direction.x * Math.sin(cameraRotation) + direction.z * Math.cos(cameraRotation);

        playerData.velocity.x = moveX * speed;
        playerData.velocity.z = moveZ * speed;

        if (!playerData.isGrounded) playerData.velocity.y -= 20 * deltaTime;

        this.player.position.x += playerData.velocity.x * deltaTime;
        this.player.position.z += playerData.velocity.z * deltaTime;
        this.player.position.y += playerData.velocity.y * deltaTime;

        if (this.player.position.y <= 0) {
            this.player.position.y = 0;
            playerData.velocity.y = 0;
            playerData.isGrounded = true;
            playerData.isJumping = false;
        }

        if (direction.length() > 0) {
            const targetRotation = Math.atan2(moveX, moveZ);
            this.player.rotation.y = targetRotation;
        }

        // Animate scarf flowing
        if (this.scarf) {
            const time = Date.now() * 0.003;
            const positions = this.scarf.geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                const y = positions.getY(i);
                if (y < 0) {
                    positions.setZ(i, Math.sin(time + i * 0.5) * 0.3 * Math.abs(y));
                }
            }
            positions.needsUpdate = true;
        }

        this.updateCamera();
        this.checkInteractions();
    }

    updateCamera() {
        if (!this.player) return;
        const targetPos = new THREE.Vector3(
            this.player.position.x + this.cameraOffset.x,
            this.player.position.y + this.cameraOffset.y,
            this.player.position.z + this.cameraOffset.z
        );
        this.camera.position.lerp(targetPos, 0.1);
        this.camera.lookAt(this.player.position.x, this.player.position.y + 2, this.player.position.z);
    }

    playerJump() {
        const playerData = this.player.userData;
        if (playerData.isGrounded && !playerData.isJumping) {
            playerData.velocity.y = playerData.jumpForce;
            playerData.isGrounded = false;
            playerData.isJumping = true;
        }
    }

    checkInteractions() {
        if (!this.player) return;
        const playerPos = this.player.position;
        let nearest = null;
        let nearestDist = Infinity;

        this.interactables.forEach(obj => {
            const dist = playerPos.distanceTo(obj.position);
            if (dist < 5 && dist < nearestDist) { nearestDist = dist; nearest = obj; }
        });

        if (nearest) this.showInteractionPrompt(nearest.userData.name);
        else this.hideInteractionPrompt();

        this.nearestInteractable = nearest;
    }

    interact() {
        if (!this.nearestInteractable) return;
        const type = this.nearestInteractable.userData.type;
        switch (type) {
            case 'pottery_workshop': this.startPotteryQuest(); break;
            case 'palm_tree': this.startPalmQuest(this.nearestInteractable.userData.id); break;
            case 'house': this.interactWithHouse(); break;
            case 'mosque': this.showDialog('المؤذن', 'يا هلا بالصعل! حياك الله في مسجد القرية.'); break;
            case 'school': this.showDialog('المعلم', 'العلم نور يا الصعل! تعلم وانجح.'); break;
            case 'shop': this.showDialog('البقال', 'يا هلا! عندي كل شي تحتاجه.'); break;
            case 'farm': this.showDialog('الفلاح', 'الأرض تعطي اللي يحبها يا الصعل.'); break;
            case 'khalwa': this.showDialog('صانع الخلوى', 'العسل والتمر أحلى شي في الدنيا!'); break;
            case 'clothing': this.showDialog('الخياط', 'الكمة والدشداشة فخر العماني.'); break;
            case 'silver': this.showDialog('الصايغ', 'الفضة العمانية أصيلة يا الصعل.'); break;
            case 'animal_farm': this.showDialog('الراعي', 'البقر والدواجن رزق من الله.'); break;
        }
    }

    showInteractionPrompt(text) {
        if (this.ui.interactionPrompt) {
            this.ui.interactionPrompt.classList.remove('hidden');
            document.getElementById('prompt-text').textContent = `اضغط E للتفاعل مع ${text}`;
        }
    }

    hideInteractionPrompt() {
        if (this.ui.interactionPrompt) this.ui.interactionPrompt.classList.add('hidden');
    }

    // ============================================
    // QUEST SYSTEM
    // ============================================
    startPotteryQuest() {
        if (this.questState === QuestState.NONE) {
            this.questState = QuestState.POTTERY_INTRO;
            this.showDialog('الصعل', 'هلا هلا! أنا بحاجة لإنقاذ ورشة الفخار العمانية. تقدر تساعدني؟');
            this.updateQuestUI('إنقاذ عالم الفخار', 'روح الوادي وجمع الطين');
        }
    }

    startPalmQuest(palmId) {
        if (this.questState === QuestState.POTTERY_COMPLETE) {
            this.questState = QuestState.PALM_INTRO;
            this.palmClimbCount++;
            if (this.palmClimbCount >= 10) this.unlockAchievement('palm_climber');
            this.showDialog('الصعل', 'حان وقت خرف النخيل! تذكر: النخلة خاصة بنا، وليس لنا حق الأخذ من غيرنا.');
            this.updateQuestUI('خرف النخلة', 'تسلق النخلة باستخدام الحبل');
        }
    }

    interactWithHouse() {
        if (this.questState === QuestState.PALM_COMPLETE) {
            this.questState = QuestState.NIGHT_INTRO;
            this.giftsDelivered++;
            if (this.giftsDelivered >= 20) this.unlockAchievement('generous');
            this.showDialog('الصعل', 'حان وقت التوزيع! لنروح نضع الهدايا على أبواب الفقراء.');
            this.updateQuestUI('التوزيع ليلاً', 'وزع الهدايا على المنازل الفقيرة');
        }
    }

    updateQuestUI(title, description) {
        if (this.ui.questTitle) this.ui.questTitle.textContent = title;
        if (this.ui.questDesc) this.ui.questDesc.textContent = description;
    }

    // ============================================
    // DIALOG SYSTEM
    // ============================================
    showDialog(characterName, text) {
        this.state = GameState.DIALOG;
        this.currentDialog = { characterName, text, index: 0 };
        if (this.ui.dialogBox) {
            this.ui.dialogBox.classList.remove('hidden');
            this.ui.dialogName.textContent = characterName;
            this.ui.dialogAvatar.textContent = this.getCharacterAvatar(characterName);
            this.typeText(text);
        }
        document.exitPointerLock?.();
    }

    getCharacterAvatar(name) {
        const avatars = {
            'الصعل': '👦', 'الفخاري': '👨‍🎨', 'النخلة': '🌴', 'الفقير': '👴',
            'المؤذن': '🧔', 'المعلم': '👨‍🏫', 'البقال': '👨‍🌾', 'الفلاح': '👨‍🌾',
            'صانع الخلوى': '👨‍🍳', 'الخياط': '👨‍💼', 'الصايغ': '👨‍🔧', 'الراعي': '👨‍🌾',
        };
        return avatars[name] || '👤';
    }

    typeText(text) {
        if (!this.ui.dialogText) return;
        this.ui.dialogText.textContent = '';
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                this.ui.dialogText.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
        this.typeInterval = typeInterval;
    }

    advanceDialog() {
        if (this.typeInterval) {
            clearInterval(this.typeInterval);
            this.ui.dialogText.textContent = this.currentDialog.text;
            this.typeInterval = null;
            return;
        }
        this.ui.dialogBox.classList.add('hidden');
        this.state = GameState.PLAYING;
        document.body.requestPointerLock?.();
    }

    // ============================================
    // ACHIEVEMENTS SYSTEM
    // ============================================
    unlockAchievement(achievementId) {
        if (!this.achievements[achievementId] || this.achievements[achievementId].unlocked) return;
        this.achievements[achievementId].unlocked = true;
        this.score += 100;
        if (this.ui.scoreText) this.ui.scoreText.textContent = this.score;
        this.showAchievementNotification(this.achievements[achievementId]);
        this.updateAchievementsUI();

        // Check for omani_hero
        const allUnlocked = Object.values(this.achievements).every(a => a.unlocked);
        if (allUnlocked) this.unlockAchievement('omani_hero');
    }

    showAchievementNotification(achievement) {
        const notif = document.createElement('div');
        notif.className = 'achievement-notification';
        notif.innerHTML = `
            <div class="achievement-notif-icon">${achievement.icon}</div>
            <div class="achievement-notif-content">
                <div class="achievement-notif-title">إنجاز جديد!</div>
                <div class="achievement-notif-name">${achievement.name}</div>
            </div>
        `;
        notif.style.cssText = `
            position: fixed; top: 100px; right: 20px;
            background: rgba(74, 53, 32, 0.95); border: 2px solid #C9AA80;
            border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 1rem;
            box-shadow: 0 0 30px rgba(201, 170, 128, 0.3); z-index: 1000;
            animation: slideInRight 0.5s ease-out;
        `;
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.style.animation = 'slideInRight 0.5s ease-out reverse';
            setTimeout(() => notif.remove(), 500);
        }, 3000);
    }

    updateAchievementsUI() {
        document.querySelectorAll('.achievement-card').forEach(card => {
            const id = card.dataset.achievement;
            if (this.achievements[id] && this.achievements[id].unlocked) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
                card.querySelector('.achievement-status').textContent = '✅ تم الفتح';
                card.querySelector('.achievement-status').style.color = '#C9AA80';
            }
        });
    }

    // ============================================
    // UI MANAGEMENT
    // ============================================
    handleMenuAction(event) {
        const action = event.currentTarget.dataset.action;
        switch (action) {
            case 'start': this.startGame(); break;
            case 'story': this.showScreen('story'); break;
            case 'controls': this.showScreen('controls'); break;
            case 'achievements': this.showScreen('achievements'); this.updateAchievementsUI(); break;
            case 'settings': this.showScreen('settings'); break;
            case 'credits': this.showScreen('credits'); break;
        }
    }

    handleBackAction(event) {
        const backTo = event.currentTarget.dataset.back;
        if (backTo === 'menu') {
            this.hideAllScreens();
            this.ui.mainMenu.classList.remove('hidden');
        }
    }

    showScreen(screenName) {
        this.hideAllScreens();
        const screenMap = {
            'story': this.ui.storyScreen, 'controls': this.ui.controlsScreen,
            'settings': this.ui.settingsScreen, 'credits': this.ui.creditsScreen,
            'achievements': this.ui.achievementsScreen,
        };
        if (screenMap[screenName]) screenMap[screenName].classList.remove('hidden');
    }

    hideAllScreens() {
        this.ui.mainMenu?.classList.add('hidden');
        this.ui.storyScreen?.classList.add('hidden');
        this.ui.controlsScreen?.classList.add('hidden');
        this.ui.settingsScreen?.classList.add('hidden');
        this.ui.creditsScreen?.classList.add('hidden');
        this.ui.achievementsScreen?.classList.add('hidden');
        this.ui.gameHud?.classList.add('hidden');
        this.ui.pauseMenu?.classList.add('hidden');
    }

    // ============================================
    // GAME STATE MANAGEMENT
    // ============================================
    startLoadingSequence() {
        const loadingSteps = [
            { progress: 10, text: 'جاري تحميل قرية القرواشية...' },
            { progress: 25, text: 'بناء جبال حجر...' },
            { progress: 40, text: 'زراعة النخيل...' },
            { progress: 55, text: 'تجهيز ورشة الفخار...' },
            { progress: 70, text: 'إعداد اللباس العماني...' },
            { progress: 85, text: 'تفعيل تأثيرات السايبربانك...' },
            { progress: 100, text: 'جاهز للمغامرة! يا هلا والله!' },
        ];
        let step = 0;
        const loadInterval = setInterval(() => {
            if (step < loadingSteps.length) {
                const current = loadingSteps[step];
                if (this.ui.loadingBar) this.ui.loadingBar.style.width = current.progress + '%';
                if (this.ui.loadingText) this.ui.loadingText.textContent = current.text;
                step++;
            } else {
                clearInterval(loadInterval);
                this.finishLoading();
            }
        }, 600);
    }

    finishLoading() {
        setTimeout(() => {
            this.ui.loadingScreen.classList.add('hidden');
            this.state = GameState.MENU;
            this.ui.mainMenu.classList.remove('hidden');
        }, 500);
    }

    startGame() {
        this.hideAllScreens();
        this.ui.gameHud.classList.remove('hidden');
        this.state = GameState.PLAYING;
        if (this.player) this.player.position.set(0, 0, 0);
        this.questState = QuestState.NONE;
        this.updateQuestUI('ابدأ المغامرة', 'روح لورشة الفخار يا الصعل');
        document.body.requestPointerLock?.();
        this.unlockAchievement('first_step');
        this.animate();
    }

    pauseGame() {
        this.state = GameState.PAUSED;
        this.ui.pauseMenu.classList.remove('hidden');
        document.exitPointerLock?.();
    }

    resumeGame() {
        this.state = GameState.PLAYING;
        this.ui.pauseMenu.classList.add('hidden');
        document.body.requestPointerLock?.();
    }

    restartGame() {
        this.score = 0;
        this.health = 5;
        this.inventory = [];
        this.questState = QuestState.NONE;
        this.timeOfDay = 6;
        this.weather = WeatherState.CLEAR;
        if (this.ui.scoreText) this.ui.scoreText.textContent = '0';
        this.updateHealthUI();
        this.removeRain();
        this.resumeGame();
    }

    quitToMenu() {
        this.state = GameState.MENU;
        this.hideAllScreens();
        this.ui.mainMenu.classList.remove('hidden');
        document.exitPointerLock?.();
    }

    updateHealthUI() {
        if (this.ui.health_hearts) {
            let heartsHTML = '';
            for (let i = 0; i < this.maxHealth; i++) {
                heartsHTML += i < this.health ? '<span class="heart">❤️</span>' : '<span class="heart empty">🖤</span>';
            }
            this.ui.health_hearts.innerHTML = heartsHTML;
        }
    }

    // ============================================
    // SETTINGS
    // ============================================
    updateGraphicsQuality() {
        const quality = this.settings.graphicsQuality;
        switch (quality) {
            case 'low':
                this.renderer.setPixelRatio(1);
                this.renderer.shadowMap.enabled = false;
                break;
            case 'medium':
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                this.renderer.shadowMap.enabled = true;
                break;
            case 'high':
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                this.renderer.shadowMap.enabled = true;
                break;
            case 'ultra':
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.shadowMap.enabled = true;
                break;
        }
        this.renderer.shadowMap.needsUpdate = true;
    }

    updatePostProcessing() {
        if (this.settings.cyberpunkEffects && !this.composer) {
            this.initPostProcessing();
        } else if (!this.settings.cyberpunkEffects && this.composer) {
            this.composer = null;
        }
    }

    updateShadows() {
        this.renderer.shadowMap.enabled = this.settings.shadowsEnabled;
        this.scene.traverse((obj) => { if (obj.material) obj.material.needsUpdate = true; });
    }

    updateFog() {
        if (this.settings.dynamicFog) {
            this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.008);
        } else {
            this.scene.fog = null;
        }
    }

    updateLanguage() {
        console.log('Language changed to:', this.settings.language);
    }

    // ============================================
    // MINIMAP
    // ============================================
    toggleMinimap() {
        const minimap = document.getElementById('minimap-container');
        if (minimap) minimap.classList.toggle('hidden');
    }

    updateMinimap() {
        if (!this.ui.minimapCtx || !this.player) return;
        const ctx = this.ui.minimapCtx;
        const width = 200, height = 200;

        ctx.fillStyle = '#1f1710';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(201, 170, 128, 0.2)';
        ctx.strokeRect(0, 0, width, height);

        const scale = 2;
        const offsetX = width / 2;
        const offsetY = height / 2;

        // Draw buildings
        this.interactables.forEach(obj => {
            const ix = offsetX + obj.position.x / scale;
            const iy = offsetY + obj.position.z / scale;
            const type = obj.userData.type;
            let color = '#8C6A3F';
            if (type === 'house') color = '#B35A2A';
            if (type === 'mosque') color = '#00ff00';
            if (type === 'shop') color = '#C9AA80';
            ctx.fillStyle = color;
            ctx.fillRect(ix - 3, iy - 3, 6, 6);
        });

        // Draw player
        const px = offsetX + this.player.position.x / scale;
        const py = offsetY + this.player.position.z / scale;
        ctx.fillStyle = '#C9AA80';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        // Player direction
        ctx.strokeStyle = '#C9AA80';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + Math.sin(this.player.rotation.y) * 10, py + Math.cos(this.player.rotation.y) * 10);
        ctx.stroke();
    }

    // ============================================
    // MENU PARTICLES
    // ============================================
    initMenuParticles() {
        const container = document.getElementById('menu-particles');
        if (!container) return;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'menu-particle';
            particle.style.cssText = `
                position: absolute; width: ${2 + Math.random() * 4}px; height: ${2 + Math.random() * 4}px;
                background: rgba(201, 170, 128, ${0.3 + Math.random() * 0.5}); border-radius: 50%;
                left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    }

    // ============================================
    // POST PROCESSING
    // ============================================
    initPostProcessing() {
        if (!this.settings.cyberpunkEffects) return;
        this.composer = new EffectComposer(this.renderer);

        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.6, 0.4, 0.85
        );
        this.composer.addPass(bloomPass);
        this.bloomPass = bloomPass;
    }

    // ============================================
    // ANIMATION LOOP
    // ============================================
    animate() {
        requestAnimationFrame(() => this.animate());
        const deltaTime = this.clock.getDelta();

        // Update time of day
        if (this.state === GameState.PLAYING) {
            this.timeOfDay += deltaTime * 0.01 * this.timeSpeed;
            if (this.timeOfDay >= 24) this.timeOfDay = 0;
            this.updateTimeOfDay();
        }

        // Update animations
        this.mixers.forEach(mixer => mixer.update(deltaTime));

        // Update dust particles
        if (this.dustParticles) {
            const positions = this.dustParticles.geometry.attributes.position;
            for (let i = 1; i < positions.count * 3; i += 3) {
                positions.array[i] += Math.sin(Date.now() * 0.001 + i) * 0.01;
                if (positions.array[i] > 30) positions.array[i] = 0;
            }
            positions.needsUpdate = true;
            this.dustParticles.rotation.y += 0.0002;
        }

        // Update rain
        if (this.rainParticles) {
            const positions = this.rainParticles.geometry.attributes.position;
            for (let i = 1; i < positions.count * 3; i += 3) {
                positions.array[i] -= 0.5;
                if (positions.array[i] < 0) positions.array[i] = 50;
            }
            positions.needsUpdate = true;
        }

        // Update spider monument rings
        if (this.spiderRing1) {
            this.spiderRing1.rotation.x += 0.005;
            this.spiderRing1.rotation.y += 0.003;
        }
        if (this.spiderRing2) {
            this.spiderRing2.rotation.x += 0.003;
            this.spiderRing2.rotation.y += 0.005;
        }

        // Update neon lights pulse
        const time = Date.now() * 0.001;
        Object.keys(this.lights).forEach(key => {
            if (key.startsWith('neon_')) {
                this.lights[key].intensity = 0.5 + Math.sin(time * 2 + parseInt(key.split('_')[1])) * 0.3;
            }
        });

        // Update player
        if (this.state === GameState.PLAYING) {
            this.updatePlayer(deltaTime);
            this.updateMinimap();
        }

        // Render
        if (this.composer && this.settings.cyberpunkEffects) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // ============================================
    // WINDOW RESIZE
    // ============================================
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if (this.composer) this.composer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ============================================
// INITIALIZE GAME
// ============================================
const game = new Game();

// Add CSS for menu particles and achievement notification
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
        75% { transform: translateY(-30px) translateX(5px); opacity: 0.7; }
    }
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .achievement-notification {
        font-family: 'Tajawal', sans-serif;
    }
    .achievement-notif-icon { font-size: 2rem; }
    .achievement-notif-title { color: #C9AA80; font-weight: 700; font-size: 0.9rem; }
    .achievement-notif-name { color: #fff; font-size: 1.1rem; }
    .achievement-card.locked { opacity: 0.5; filter: grayscale(1); }
    .achievement-card.unlocked { opacity: 1; filter: grayscale(0); border-color: #C9AA80; }
    .heart.empty { opacity: 0.3; }
    .weather-indicator {
        position: absolute; top: 80px; right: 20px;
        background: rgba(74, 53, 32, 0.8); padding: 0.5rem 1rem;
        border-radius: 20px; border: 1px solid rgba(201, 170, 128, 0.2);
        display: flex; align-items: center; gap: 0.5rem;
        font-size: 0.9rem; color: #f0e6d3;
    }
`;
document.head.appendChild(style);

export default game;
