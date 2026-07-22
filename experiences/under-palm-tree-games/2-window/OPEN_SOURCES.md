# 🌍 مصادر مفتوحة المصدر - Globe + Books + Courses
# Open Source Resources for Interactive Globe + Digital Library + Free Courses

---

## ⚠️ تنبيه أمني مهم | Important Privacy Notice

**لا نشارك أي معلومات خاصة:**
- ❌ لا API Keys
- ❌ لا Tokens
- ❌ لا أرقام هواتف
- ❌ لا بيانات شخصية
- ❌ لا مواقع دقيقة

**كل المصادر هنا:**
- ✅ 100% مجانية
- ✅ مفتوحة المصدر
- ✅ لا تحتاج تسجيل
- ✅ لا تحتاج API Key
- ✅ تعمل في المتصفح فقط

---

# 🌍 الجلوب التفاعلي - Interactive 3D Globe

## 1. CesiumJS (الأفضل)
🔗 https://cesium.com/platform/cesiumjs/
📦 GitHub: https://github.com/CesiumGS/cesium
📜 License: Apache 2.0 (مجاني تجاري وشخصي)

### المميزات:
- ✅ 3D Globe حقيقي بجودة عالية
- ✅ يدعم WebGL بدون إضافات
- ✅ يعمل على الجوال والكمبيوتر
- ✅ يدعم 3D Tiles, KML, GeoJSON
- ✅ تضاريس حقيقية (Terrain)
- ✅ صور أقمار صناعية (Imagery)
- ✅ تحكم بالكاميرا (سحب، تدوير، تكبير)
- ✅ يدعم React, Vue, Angular
- ✅ مجتمع نشط

### التثبيت:
```bash
npm install cesium
```

### مثال بسيط:
```javascript
import { Viewer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

const viewer = new Viewer("cesiumContainer");

// إضافة نقطة على عمان
viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(58.5453, 23.6139),
    point: { pixelSize: 10, color: Cesium.Color.BEIGE }
});

// التحريك للموقع
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(58.5453, 23.6139, 1000000),
    duration: 3
});
```

### مصادر البيانات المجانية (بدون API Key):
| المصدر | الرابط | الاستخدام |
|--------|--------|-----------|
| Natural Earth | https://www.naturalearthdata.com/ | حدود الدول |
| OpenStreetMap | https://www.openstreetmap.org/ | خرائط |
| NASA Blue Marble | https://visibleearth.nasa.gov/ | صور الأرض |
| USGS Terrain | https://earthexplorer.usgs.gov/ | تضاريس |

---

## 2. Globe.GL (أسهل)
🔗 https://globe.gl/
📦 GitHub: https://github.com/vasturiano/globe.gl
📜 License: MIT

### المميزات:
- ✅ أسهل من CesiumJS
- ✅ يعمل مع Three.js
- ✅ نقاط بيانات (Arcs, Points, Labels)
- ✅ تفاعل بالماوس
- ✅ حجم صغير

### التثبيت:
```bash
npm install globe.gl
```

### مثال:
```javascript
import Globe from 'globe.gl';

const myGlobe = Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    (document.getElementById('globe'));

// إضافة نقاط
myGlobe.pointsData([
    { lat: 23.6139, lng: 58.5453, size: 0.5, color: '#d4c5a9' } // عمان
]);
```

---

## 3. WebGL Earth (أقدم)
🔗 http://www.webglearth.com/
📜 License: BSD

### المميزات:
- ✅ API مشابه لـ Leaflet
- ✅ خفيف جداً
- ✅ يدعم OpenStreetMap, Bing, MapBox

---

## 4. Three.js + Custom Globe (الأكثر تحكم)
```javascript
import * as THREE from 'three';

// إنشاء كرة أرضية
const geometry = new THREE.SphereGeometry(5, 64, 64);
const texture = new THREE.TextureLoader().load('earth.jpg');
const material = new THREE.MeshPhongMaterial({ map: texture });
const earth = new THREE.Mesh(geometry, material);

// إضافة ضوء
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 3, 5);

// دوران
function animate() {
    earth.rotation.y += 0.001;
    requestAnimationFrame(animate);
}
animate();
```

---

# 📚 الكتب الرقمية المجانية - Free Digital Books

## 1. Project Gutenberg (الأكبر)
🔗 https://www.gutenberg.org/
📊 77,687+ كتاب مجاني
📜 License: Public Domain

### API مجاني (Gutendex):
🔗 https://gutendex.com/
📦 GitHub: https://github.com/garethbjohnson/gutendex

### لا يحتاج API Key!
```javascript
// البحث عن كتاب
fetch('https://gutendex.com/books?search=shakespeare')
    .then(res => res.json())
    .then(data => console.log(data.results));

// جلب كتاب محدد
fetch('https://gutendex.com/books/1342') // Pride and Prejudice
    .then(res => res.json())
    .then(data => {
        console.log(data.title);
        console.log(data.formats['text/plain']); // رابط النص المجاني
    });
```

### صيغ متاحة:
- EPUB (للقراءة)
- Kindle (للكيندل)
- Plain Text (للتطبيقات)
- HTML (للمواقع)

---

## 2. Open Library (الأوسع)
🔗 https://openlibrary.org/
📊 30 مليون+ عنوان
📜 License: Open Source (Internet Archive)

### API مجاني:
🔗 https://openlibrary.org/developers/api

### لا يحتاج API Key!
```javascript
// البحث
fetch('https://openlibrary.org/search.json?q=shakespeare')
    .then(res => res.json())
    .then(data => console.log(data.docs));

// صورة الغلاف
// https://covers.openlibrary.org/b/isbn/9780141439600-M.jpg
```

---

## 3. Internet Archive (الأشمل)
🔗 https://archive.org/
📊 41 مليون+ كتاب
📜 License: Various (Public Domain + Creative Commons)

### API:
```javascript
fetch('https://archive.org/advancedsearch.php?q=title:(oman)+AND+mediatype:(texts)&output=json')
    .then(res => res.json())
    .then(data => console.log(data.response.docs));
```

---

## 4. Standard Ebooks (الأجمل)
🔗 https://standardebooks.org/
📜 License: Public Domain

### مميزات:
- ✅ تنسيق EPUB احترافي
- ✅ تصحيح لغوي دقيق
- ✅ تصميم جميل

---

## 5. ManyBooks (تنوع)
🔗 https://manybooks.net/
📜 License: Public Domain + Creative Commons

---

# 🎓 الكورسات المجانية - Free Online Courses

## 1. Open edX (الأقوى)
🔗 https://openedx.org/
📦 GitHub: https://github.com/openedx
📜 License: AGPL (Open Source)

### مميزات:
- ✅ منصة تعليمية كاملة
- ✅ يستخدمها Harvard و MIT
- ✅ يدعم الملايين من الطلاب
- ✅ فيديو + اختبارات + شهادات
- ✅ مجتمع عالمي

### التثبيت:
```bash
git clone https://github.com/openedx/edx-platform.git
```

---

## 2. Moodle (الأشهر)
🔗 https://moodle.org/
📦 GitHub: https://github.com/moodle/moodle
📜 License: GPL

### مميزات:
- ✅ 400 مليون+ مستخدم
- ✅ 100+ لغة
- ✅ plugins كثيرة
- ✅ mobile app

---

## 3. Khan Academy (الأشهر للطلاب)
🔗 https://www.khanacademy.org/
📜 License: Creative Commons

### مميزات:
- ✅ فيديوهات تعليمية مجانية
- ✅ تمارين تفاعلية
- ✅ تتبع التقدم
- ✅ جميع المواد

---

## 4. Coursera / edX (مجاني + مدفوع)
🔗 https://www.coursera.org/
🔗 https://www.edx.org/

### المجاني:
- ✅ Audit Mode (مشاهدة فقط)
- ✅ Financial Aid (مساعدة مالية)

---

## 5. YouTube Education (الأكثر)
🔗 https://www.youtube.com/education

### قنوات مميزة:
| القناة | الرابط | المحتوى |
|--------|--------|---------|
| CrashCourse | youtube.com/crashcourse | علوم، تاريخ |
| Khan Academy | youtube.com/khanacademy | رياضيات، علوم |
| MIT OpenCourseWare | youtube.com/mit | هندسة، علوم |
| Stanford Online | youtube.com/stanford | تقنية، أعمال |
| Harvard | youtube.com/harvard | قانون، طب |

---

## 6. FreeCodeCamp (للبرمجة)
🔗 https://www.freecodecamp.org/
📜 License: Open Source

---

## 7. The Odin Project (للبرمجة)
🔗 https://www.theodinproject.com/
📜 License: Open Source

---

# 🎮 كيف تدمج هذا في لعبتك

## فكرة: "نافذة المعرفة" - Window of Knowledge

```
اللاعب يقف أمام الجلوب 3D
    ↓
يحرك يده ← يدور الجلوب
    ↓
يختار بلد (مثل: عمان)
    ↓
يظهر:
    - تاريخ البلد (من ملف TIMELINE_HISTORY.md)
    - كتب مجانية عن البلد (من Project Gutenberg)
    - كورسات مجانية (من Open edX / Khan Academy)
    - صور (من Internet Archive)
    ↓
اللاعب يقرص (Pinch) ← يفتح الكتاب/الكورس
```

## التقنيات المستخدمة:
| المكون | التقنية | المصدر |
|--------|--------|--------|
| الجلوب 3D | CesiumJS | cesium.com |
| تتبع اليد | MediaPipe Hands | Google |
| الكتب | Gutendex API | Project Gutenberg |
| الكورسات | Open edX | Harvard/MIT |
| الصور | Internet Archive | archive.org |
| الترجمة | i18n | Built-in |

---

# 🔒 خصوصية المستخدم - User Privacy

## ما نجمعه:
- ❌ لا شيء!

## ما نستخدمه:
- ✅ الكاميرا (لتتبع اليد فقط)
- ✅ المتصفح (لتشغيل اللعبة)

## ما نرسله للخوادم:
- ✅ لا شيء!
- ✅ كل المعالجة في المتصفح (Client-side)

## التنبيهات:
```
"هذه اللعبة تعالج كل البيانات في جهازك. 
لا نرسل صورك أو بياناتك لأي خادم خارجي."

"This game processes all data on your device.
We do not send your images or data to any external server."
```

---

# 📋 قائمة المصادر المجمعة

## 🌍 Globe (3D Earth)
| # | المصدر | الرابط | License | API Key |
|---|--------|--------|---------|---------|
| 1 | CesiumJS | cesium.com | Apache 2.0 | ❌ لا |
| 2 | Globe.GL | globe.gl | MIT | ❌ لا |
| 3 | WebGL Earth | webglearth.com | BSD | ❌ لا |
| 4 | Three.js | threejs.org | MIT | ❌ لا |

## 📚 Books (Free Digital)
| # | المصدر | الرابط | Books | API Key |
|---|--------|--------|-------|---------|
| 1 | Project Gutenberg | gutenberg.org | 77,687+ | ❌ لا |
| 2 | Open Library | openlibrary.org | 30M+ | ❌ لا |
| 3 | Internet Archive | archive.org | 41M+ | ❌ لا |
| 4 | Standard Ebooks | standardebooks.org | 1000+ | ❌ لا |
| 5 | ManyBooks | manybooks.net | 50,000+ | ❌ لا |

## 🎓 Courses (Free Online)
| # | المصدر | الرابط | Type | API Key |
|---|--------|--------|------|---------|
| 1 | Open edX | openedx.org | Open Source | ❌ لا |
| 2 | Moodle | moodle.org | Open Source | ❌ لا |
| 3 | Khan Academy | khanacademy.org | Free | ❌ لا |
| 4 | Coursera | coursera.org | Free Audit | ✅ حساب |
| 5 | edX | edx.org | Free Audit | ✅ حساب |
| 6 | FreeCodeCamp | freecodecamp.org | Open Source | ❌ لا |
| 7 | YouTube Edu | youtube.com/education | Free | ❌ لا |

## 🎨 Images (Free)
| # | المصدر | الرابط | License | API Key |
|---|--------|--------|---------|---------|
| 1 | Unsplash | unsplash.com | Unsplash License | ❌ لا |
| 2 | Pexels | pexels.com | Pexels License | ❌ لا |
| 3 | Pixabay | pixabay.com | Pixabay License | ❌ لا |
| 4 | Wikimedia Commons | commons.wikimedia.org | Various | ❌ لا |

## 🔊 Audio (Free)
| # | المصدر | الرابط | License | API Key |
|---|--------|--------|---------|---------|
| 1 | Freesound | freesound.org | CC0 | ❌ لا |
| 2 | Free Music Archive | freemusicarchive.org | CC0 | ❌ لا |
| 3 | OpenGameArt | opengameart.org | CC0 | ❌ لا |
| 4 | LibriVox | librivox.org | Public Domain | ❌ لا |

---

# 🚀 خطوات التنفيذ

## 1. تثبيت المكتبات:
```bash
npm install cesium three globe.gl
```

## 2. إنشاء الجلوب:
```javascript
import { Viewer } from "cesium";

const viewer = new Viewer("globeContainer");

// إضافة نقطة على عمان
viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(58.5453, 23.6139),
    point: { pixelSize: 15, color: Cesium.Color.fromCssColorString('#d4c5a9') }
});

// عند النقر على النقطة
viewer.selectedEntityChanged.addEventListener((entity) => {
    if (entity) {
        // جلب كتب عن عمان
        fetch('https://gutendex.com/books?search=oman')
            .then(res => res.json())
            .then(data => showBooks(data.results));
    }
});
```

## 3. إضافة تتبع اليد:
```javascript
import { Hands } from '@mediapipe/hands';

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.onResults((results) => {
    if (results.multiHandLandmarks) {
        const hand = results.multiHandLandmarks[0];
        const x = hand[8].x; // Index finger tip
        const y = hand[8].y;

        // تحريك الجلوب بناءً على حركة اليد
        viewer.camera.rotateLeft(x * 0.01);
        viewer.camera.rotateUp(y * 0.01);
    }
});
```

## 4. عرض الكتب:
```javascript
function showBooks(books) {
    const container = document.getElementById('books-panel');
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p>${book.authors[0]?.name}</p>
            <a href="${book.formats['text/plain']}" target="_blank">Read</a>
        </div>
    `).join('');
}
```

---

*تم إعداد هذا الملف بناءً على أبحاث مكثفة من مصادر موثوقة*
*Under Palm Tree © 2026 | Oman 🇴🇲*
*Privacy First - No Data Collection*
