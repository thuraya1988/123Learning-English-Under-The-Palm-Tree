<style>

*, *::before, *::after { 
margin: 0; 
padding: 0; 
box-sizing: border-box; 
}

html, body {
width: 100%;
min-height: 100%;
font-family: 'Cormorant Garamond', serif;
background: url('cover.jpeg') center center / cover no-repeat fixed;
}

/* طبقة جمالية خفيفة فوق الخلفية */
body::before{
content:"";
position:fixed;
inset:0;
background:rgba(0,0,0,0.15);
z-index:0;
}

.scene{
position:relative;
z-index:1;
width:100%;
min-height:100vh;
display:flex;
align-items:flex-start;
justify-content:center;
padding:28px 20px 36px;
}

.panel{
width:min(1280px, 96vw);
background:rgba(255,255,255,0.08);
border-radius:36px;
padding:28px 24px 30px;
backdrop-filter: blur(3px);
box-shadow:0 12px 40px rgba(0,0,0,0.08);
text-align:center;
}

/* الصور بدون تشويه */

.flip-front img{
width:100%;
height:100%;
object-fit:contain;
object-position:center;
display:block;
}

/* خلفية الكارد */

.flip-back{
transform:rotateY(180deg);
background:rgba(26,18,8,0.95);
padding:20px 18px;
text-align:left;
overflow-y:auto;
color:#f5efe0;
}

/* تحسين النخلة */

.flip-trigger{
margin-top:12px;
display:inline-flex;
align-items:center;
gap:8px;
cursor:pointer;
user-select:none;
color:#fff;
text-shadow:0 1px 6px rgba(0,0,0,0.5);
font-family:'Cinzel', serif;
font-size:.84rem;
letter-spacing:.03em;
transition:0.3s;
}

.flip-trigger:hover{
transform:scale(1.05);
opacity:0.9;
}

.flip-trigger .palm{
font-size:1.45rem;
}

</style>
