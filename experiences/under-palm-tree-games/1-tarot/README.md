# 🌙 Al-Qarawashiya Tarot - Hand Gesture Control

## Hand Gesture Controlled Tarot Experience

---

## 📖 Overview

A mystical tarot reading experience controlled entirely by your hand gestures using your webcam. Built with MediaPipe Hands for real-time hand tracking and HTML5 Canvas for rendering.

**Colors:** Beige + Deep Burgundy + Dark Brown ONLY. No gold.

---

## 🚀 How to Run

### Requirements
- Node.js (v16+)
- Modern browser with camera access
- Good lighting for hand tracking

### Steps

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:5173
```

---

## 🎮 Controls

### Hand Gesture Controls (Camera)
| Gesture | Action |
|---------|--------|
| ✋ **Show Hand** | Hover over cards |
| 👌 **Pinch** (thumb + index) | Select a card |
| 👋 **Wave** | Shuffle cards |

### Mouse Controls (Fallback)
| Action | Control |
|--------|---------|
| **Hover** | Move mouse over cards |
| **Select** | Click on a card |

---

## 🃏 Tarot Spreads

1. **Single Card Draw** - One card for daily guidance
2. **Three Card Spread** - Past, Present, Future
3. **Celtic Cross** - 10-card comprehensive reading

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Beige | `#d4c5a9` | Primary text, accents |
| Deep Burgundy | `#4a0e1f` | Background panels, glow |
| Dark Brown | `#3d2817` | Card backs, shadows |

**NO GOLD is used anywhere in the design.**

---

## 🛠️ Technologies

- **MediaPipe Hands** - Real-time hand tracking
- **HTML5 Canvas** - 2D rendering
- **Vite** - Build tool
- **Google Fonts** - Cinzel, Cormorant Garamond, Amiri

---

## 📁 Project Structure

```
omani-tarot-hand/
├── index.html          # Main HTML with all screens
├── style.css           # Styling (Beige/Burgundy/Brown only)
├── main.js             # Game engine + hand tracking
├── package.json        # Node dependencies
├── manifest.json       # PWA manifest
├── README.md           # This file
├── assets/
│   ├── cards/          # Card images (add via NanoBanana)
│   ├── sounds/         # Sound effects (add via NanoBanana)
│   └── effects/        # Visual effects
└── src/
    ├── hand-tracking/  # MediaPipe integration
    ├── tarot/          # Card system
    ├── ui/             # Interface components
    └── i18n/           # Translations
```

---

## 🌴 Features

- ✅ Hand gesture control (no mouse needed)
- ✅ Real-time hand skeleton visualization
- ✅ 22 Major Arcana cards
- ✅ 3 spread types (Single, Three, Celtic Cross)
- ✅ Bilingual (English / Arabic)
- ✅ Particle effects
- ✅ Card flip animations
- ✅ Responsive design
- ✅ PWA support
- ✅ Mouse fallback mode

---

## 📝 Adding Assets with NanoBanana

### Images
Place card images in `assets/cards/` named:
- `0_fool.jpg`, `1_magician.jpg`, ... `21_world.jpg`

### Sounds
Place audio in `assets/sounds/`:
- `shuffle.mp3` - Card shuffle sound
- `flip.mp3` - Card flip sound
- `ambient.mp3` - Background ambient
- `select.mp3` - Card selection sound

---

## 📜 License

MIT License

---

*Under Palm Tree © 2026 | Oman 🇴🇲*
*Desert Mysticism*
