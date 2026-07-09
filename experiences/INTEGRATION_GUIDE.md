# 🌴 Under Palm Tree - تجارب تفاعلية متقدمة

## 📁 محتويات المجلد

| الملف | الوصف | الرابط |
|-------|-------|--------|
| `map.html` | 🗺️ خريطة عمان التعليمية | `/experiences/map.html` |
| `vr.html` | 🥽 جولة افتراضية في القرية | `/experiences/vr.html` |
| `ar.html` | 📱 شخصيات الرواية في عالمك | `/experiences/ar.html` |

---

## 🚀 كيف تربطها بموقعك

### 1. رفع الملفات
```
موقعك/
├── index.html (الموقع الرئيسي)
├── play/ (لعبة القرية)
│   └── index.html
└── experiences/ (التجارب الجديدة)
    ├── map.html
    ├── vr.html
    └── ar.html
```

### 2. إضافة روابط في الموقع الرئيسي

في `index.html` أضف:

```html
<!-- قسم التجارب التفاعلية -->
<section id="experiences">
    <h2>🎮 تجارب تفاعلية</h2>
    <div class="experience-cards">
        <a href="experiences/map.html" class="card">
            <span class="icon">🗺️</span>
            <h3>خريطة عمان التعليمية</h3>
            <p>تعلم أسماء المحافظات بالإنجليزي</p>
        </a>
        <a href="experiences/vr.html" class="card">
            <span class="icon">🥽</span>
            <h3>جولة VR في القرية</h3>
            <p>تجربة واقع افتراضي للقرية</p>
        </a>
        <a href="experiences/ar.html" class="card">
            <span class="icon">📱</span>
            <h3>شخصيات الرواية في عالمك</h3>
            <p>AR - وجه الكاميرا وشاهد الأبطال</p>
        </a>
    </div>
</section>
```

### 3. CSS للبطاقات

```css
.experience-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}
.card {
    background: linear-gradient(135deg, #1a0f0a, #2d1f14);
    border: 1px solid rgba(196, 168, 130, 0.3);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    color: #f5e6d3;
    text-decoration: none;
    transition: all 0.3s;
}
.card:hover {
    transform: translateY(-5px);
    border-color: #ffd700;
    box-shadow: 0 8px 30px rgba(255, 215, 0, 0.2);
}
.card .icon { font-size: 40px; display: block; margin-bottom: 12px; }
.card h3 { color: #ffd700; margin-bottom: 8px; }
.card p { color: #c4a882; font-size: 14px; }
```

---

## 🎯 كيف يربط كل تجربة بموقعك

### 🗺️ خريطة عمان (map.html)
**الهدف**: تعلم الجغرافيا العمانية + الإنجليزية
**الربط**:
- بعد اكتمال الاختبار → عرض رسالة "أحسنت! تعلمت 5 كلمات جديدة"
- زر "العودة للموقع" يعود للصفحة الرئيسية
- حفظ التقدم في localStorage (نفس نظام اللعبة)

### 🥽 جولة VR (vr.html)
**الهدف**: جولة افتراضية في عالم الرواية
**الربط**:
- يمكن تضمينها في iframe في صفحة "عالم الرواية"
- أو رابط منفصل "جولة افتراضية"
- يدعم Google Cardboard للجوال

### 📱 تجربة AR (ar.html)
**الهدف**: شخصيات الرواية في العالم الحقيقي
**الربط**:
- مثالية للجوال! أضف QR Code يفتحها
- زر "شارك صورتك مع جون" يلتقط صورة
- يمكن استخدامها في فعاليات أو معارض

---

## 📱 QR Code للوصول السريع

يمكن إنشاء QR Code لكل تجربة:
- `https://under-palmtree.com/experiences/ar.html`
- المستخدم يمسح → يفتح الكاميرا فوراً

---

## 🔗 ربط التقدم بين كل التجارب

كل التجارب تستخدم نفس `localStorage` key:
```javascript
// في كل ملف
const progress = JSON.parse(localStorage.getItem('upt_progress') || '{}');
progress.mapScore = 50;
progress.vrVisited = true;
progress.arWords = ['Adventure', 'Nurse'];
localStorage.setItem('upt_progress', JSON.stringify(progress));
```

هذا يعني:
- اللاعب يجمع نقاط في اللعبة → تظهر في الخريطة
- يتعلم كلمات في الخريطة → تظهر في AR
- كل شيء مترابط!

---

## 🚀 رفع على الإنترنت

### GitHub Pages:
1. رفع المجلد `experiences/` مع الموقع
2. الرابط: `https://yourname.github.io/under-palm-tree/experiences/`

### Netlify:
1. رفع المجلد كاملاً
2. الرابط جاهز فوراً

---

## 💡 أفكار إضافية

| الفكرة | التنفيذ |
|--------|---------|
| **شهادة** | بعد إكمال الخريطة + VR + AR → شهادة PDF |
| **متصدرين** | جدول أفضل اللاعبين في كل تجربة |
| **تحدي** | "من يجمع 20 كلمة في أقل وقت؟" |
| **مشاركة** | زر "شارك إنجازي" على Twitter/X |

---

**صنع بـ ❤️ لـ Under Palm Tree**
