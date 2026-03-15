# Portfolio — Setup Guide

## Quick Start

Simply open `index.html` in any modern browser. No build step required.

```
Portfolio Web/
├── index.html          ← entire site (edit this)
├── images/
│   ├── avatar.jpg      ← your profile photo (optional)
│   ├── cs101/          ← activity screenshots per course
│   ├── cs201/
│   ├── web301/
│   ├── db401/
│   ├── ml501/
│   └── os601/
# Portfolio

A fully static single-page portfolio. No database, no backend, no API calls.
All content lives in `src/data/portfolio.js`. All images are local files in `public/images/`.

## Quick Start

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → /dist
npm run preview  # preview the /dist build locally
```

## Folder Structure

```
portfolio/
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── avatar.jpg                   ← your profile photo
│       ├── placeholder.svg              ← auto-used for missing images
│       └── projects/
│           ├── cs101_intro-to-programming/
│           │   ├── act1_hello-world/    ← 1.jpg, 2.jpg, …
│           │   └── act2_variables/
│           ├── cs102_data-structures/
│           │   ├── act1_linked-list/
│           │   └── act2_binary-search-tree/
│           └── cs103_web-dev/
│               ├── act1_landing-page/
│               └── act2_interactive-form/
│
├── src/
│   ├── data/
│   │   └── portfolio.js          ← ALL content lives here
│   ├── styles/
│   │   ├── main.css              ← imports all partials
│   │   ├── base.css
│   │   ├── animations.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   └── sections/
│   │       ├── hero.css
│   │       ├── about.css
│   │       └── projects.css
│   ├── scripts/
│   │   ├── main.js               ← entry point
│   │   ├── components/
│   │   │   ├── loader.js
│   │   │   ├── cursor.js
│   │   │   ├── navbar.js
│   │   │   ├── modal.js
│   │   │   └── gallery.js
│   │   ├── sections/
│   │   │   ├── hero.js
│   │   │   ├── about.js
│   │   │   └── projects.js
│   │   └── animations/
│   │       ├── scrollAnimations.js
│   │       └── pageTransitions.js
│   └── index.html
│
├── dist/                         ← production output (git-ignored)
├── vite.config.js
├── package.json
├── netlify.toml
└── vercel.json
```

## Image Naming Convention

| What            | Format                           | Example                           |
| --------------- | -------------------------------- | --------------------------------- |
| Course folder   | `{courseCode}_{course-slug}/`    | `cs101_intro-to-programming/`     |
| Activity folder | `{actId}_{activity-slug}/`       | `act1_hello-world/`               |
| Image files     | Sequential numbers               | `1.jpg`, `2.jpg`, `3.jpg`         |
| Accepted exts   | `.jpg` `.jpeg` `.png` `.webp`    |                                   |

**All paths in `portfolio.js` start with `/images/...`** (absolute from site root).
Vite serves `public/` at `/`, so `/images/…` works in both dev and production.

## Customizing Content

**Everything is in `src/data/portfolio.js`. That is the only file you need to edit for content.**

### Add a new course
1. Add an object to the `projects` array in `portfolio.js`
2. Create: `public/images/projects/{courseCode}_{slug}/`

### Add a new activity
1. Add an object to the `activities` array in `portfolio.js`
2. Create: `public/images/projects/{course-folder}/{actId}_{slug}/`
3. Drop numbered images (`1.jpg`, `2.jpg`, …) into that folder
4. Add paths + captions to the `images[]` array in `portfolio.js`
5. Run `npm run build`

**No other files need to be touched. Ever.**

### Activities with no images yet
```js
images: []   // empty array → shows a "no preview" state, no broken gallery
```

## Deploy

### Netlify / Vercel
Push to GitHub and connect the repo. Config files are already included.

### Manual / GitHub Pages
Run `npm run build`, deploy the `/dist` folder.
The output is fully self-contained — every image is copied by Vite as-is.

## Tech Stack
- **Vite 5** — build tool
- **GSAP 3 + ScrollTrigger** — scroll animations
- **Three.js** — particle network background
- **Google Fonts CDN** — JetBrains Mono + Inter
- **Devicons CDN** — skill icons
