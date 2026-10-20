# Algoryxz Agency & Co. — Spatial Design & Brand Experiences

> Contemporary creative agency specializing in event strategy, experiential marketing, corporate experiences, product launches, global summits, brand activations, and full-scale spatial production.

---

## ✦ Brand Overview & Positioning

**Algoryxz Agency & Co.** is an internationally minded creative experience collective translating ambitious brand briefs into visceral environments that audiences feel, remember, and amplify.

- **Visual Art Direction:** Architectural minimalism, volumetric lighting, spatial geometry, and editorial precision inspired by contemporary European and international design centers.
- **Palette:** Deep Midnight Ink (`#090a0d`), Warm Paper (`#f8f7f4`), Electric Acid Chartreuse (`#d4ff32`), and Restrained Cobalt (`#2b59ff`).
- **Typography:** Barlow Condensed, Syne, Plus Jakarta Sans, and Space Grotesk.

---

## ⚡ Key Experience Architecture & Motion System

1. **Continuous Route Transitions:** Coordinated page exit and entry animations powered by `motion/react` and `<AnimatePresence mode="wait">`. View transitions execute without layout shifts or white flashes, paired with smart scroll restoration.
2. **Kinetic 3D WebGL Canvas (`Three.js`):** Dual-polyhedral wireframe with an orbital geodesic halo and a volumetric luminous particle field. Features mouse parallax damping, viewport `IntersectionObserver` pause/resume to preserve device resources, and tab visibility detection.
3. **Curated Project Showcase & Lightbox:** Asymmetrical portfolio cards with animated tag filtering, hover zoom transitions, dynamic case studies (`/work/:slug`), and full-screen image inspection.
4. **Interactive Methodology Accordion:** 6-stage algorithmic production workflow with dynamic stage tracking indicators and smooth expand/collapse transitions.
5. **Interactive Experience Reel:** Fullscreen cinema modal previewing architectural and experiential assets with timeline indicators and keyboard accessibility.
6. **Proposal Architecture Form:** Multi-parameter brief intake featuring real-time client validation, honeypot bot protection, celebratory confetti feedback, and transparent prototype notices.
7. **Designed Error & Supporting Routes:** Dedicated custom experiences for Coordinate Not Found (`/404`), Restricted Zone (`/403`), and Data Protocols (`/privacy`).
8. **Accessibility & Motion Preferences:** Strict adherence to `prefers-reduced-motion`, visible focus styling (`:focus-visible`), and semantic HTML5 hierarchy.

---

## 🛠 Technology Stack

- **Framework:** [React 19](https://react.dev/)
- **Bundler:** [Vite 8](https://vite.dev/) (with Rolldown engine & optimized vendor manual chunking)
- **Motion & Transitions:** [Motion](https://motion.dev/) (`motion/react`)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visual Micro-effects:** Canvas Confetti
- **Linting & Code Quality:** [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/Lurkaee/Agency-website-demo.git

# Navigate into project directory
cd Agency-website-demo

# Install dependencies
npm install
```

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

Compile and bundle optimized static assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Code Quality & Linting

Run Oxlint across all source files:

```bash
npm run lint
```

---

## 📂 Project Structure

```
├── public/                 # Static assets & favicons
├── src/
│   ├── assets/             # Brand logos & icons
│   ├── components/
│   │   ├── AboutTeam.jsx       # Studio collective & core tenets
│   │   ├── AgencyIntro.jsx     # Strategic pillars & metrics
│   │   ├── CinemaModal.jsx     # Fullscreen interactive reel
│   │   ├── Footer.jsx          # Brand manifesto & navigation
│   │   ├── Header.jsx          # Sticky header & mobile drawer
│   │   ├── Hero.jsx            # Hero typography & CTAs
│   │   ├── HeroCanvas.jsx      # Three.js kinetic 3D scene
│   │   ├── ProposalSection.jsx # Collaboration intake form
│   │   ├── SelectedWork.jsx    # Filterable project portfolio
│   │   ├── ServicesProcess.jsx # 6-stage algorithmic methodology
│   │   └── Testimonials.jsx    # Industry critique & slider
│   ├── data/
│   │   └── agencyData.js       # Rebranded project models & copy
│   ├── pages/
│   │   ├── ForbiddenPage.jsx   # 403 backstage route
│   │   ├── NotFoundPage.jsx    # 404 coordinate error route
│   │   ├── PrivacyPage.jsx     # Data protocols policy
│   │   └── ProjectDetail.jsx   # Case study detail view
│   ├── App.jsx             # SPA routing & continuous transitions
│   ├── index.css           # Vanilla CSS design tokens & utilities
│   └── main.jsx            # Application entrypoint
├── index.html              # HTML5 template, fonts, & metadata
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite & chunking configuration
```

---

## ⚖️ Disclosures & Brand Integrity

Algoryxz Agency & Co. operates as a contemporary creative concept. Projects and imagery shown on this platform represent spatial prototypes, creative direction studies, and illustrative portfolio concepts to demonstrate production capability.

---

© 2026 Algoryxz Agency & Co. All rights reserved.
