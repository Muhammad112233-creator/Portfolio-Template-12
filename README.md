<div align="center">

# 🎬 Netflix-Style Developer Portfolio

**A cinematic, Netflix-inspired personal portfolio template.**
Sticky 3D skill rails · a poster stack that unfolds into a 3 × 3 hub · custom red cursor · GSAP + Framer Motion throughout.

Built with **React 19 · Vite · Tailwind CSS v4 · GSAP · Framer Motion**

[Setup](#-quick-start) · [Preview](#-how-do-i-see-the-preview) · [Customise](#-make-it-yours) · [Troubleshooting](#-troubleshooting)

</div>

---

## ✨ What's inside

| Section                    | What happens                                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Loader**                 | A red ping dot and the brand name blur in, punch out, curtain fades.                                                             |
| **Hero**                   | Red marquee rail, pointer-reactive 3D portrait card, custom cursor trio (dot + ring + 700px ambient glow).                       |
| **Episode 01 — About**     | Three bento panels that rise on scroll, each with a pointer-tracked red spotlight.                                               |
| **Episode 02 — Expertise** | Four sticky "director's cut" cards that stack; the ones underneath shrink, lift and blur.                                        |
| **Skills**                 | Desktop: the section pins for **500% of scroll** and deals six cards around an 1800px 3D arc. Mobile: swipeable snap rail.       |
| **ORIGINALS — Projects**   | Eight covers fly in as a shuffled deck, then unfold into a 3 × 3 streaming hub above a floating console bar. Mobile: swipe rail. |
| **Episode 04 — Contact**   | A giant outlined `CONTACT` word drifts on scroll, glass form sheet slides up from the bottom edge.                               |
| **Footer**                 | Series metadata, socials, season line.                                                                                           |

### Tech stack

- **React 19** + **Vite 5** — dev server and bundler
- **Tailwind CSS v4** (`@tailwindcss/vite`) — all styling is utility classes, no config file needed
- **GSAP 3** (+ ScrollTrigger, `matchMedia`, `quickTo`) — scroll pinning, the 3D fan, the poster deck
- **Framer Motion** — contact section scroll transforms and reveal animations

### Project structure

```
netflix-portfolio-template/
├── public/
│   ├── favicon.svg          # browser tab icon
│   └── .nojekyll            # stops GitHub Pages from ignoring _-prefixed files
├── src/
│   ├── assets/
│   │   └── picture.png      # ⬅ REPLACE THIS with your own portrait (640×780)
│   ├── components/
│   │   ├── Loader.jsx       # intro curtain
│   │   ├── Cursor.jsx       # custom cursor + ambient glow
│   │   ├── Hero.jsx         # header + opening title card
│   │   ├── About.jsx        # Episode 01
│   │   ├── Expertise.jsx    # Episode 02
│   │   ├── Skills.jsx       # pinned 3D skill fan
│   │   ├── Projects.jsx     # ORIGINALS poster deck
│   │   ├── Contact.jsx      # Episode 04
│   │   └── Footer.jsx
│   ├── data/
│   │   └── content.js       # ⬅ ALL text, links, skills and projects live here
│   ├── index.css            # Tailwind import + marquee/dropBounce keyframes
│   ├── App.jsx
│   └── main.jsx
├── site/                    # ✅ pre-built static site — drag this to GitHub Pages
├── .github/workflows/deploy.yml
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
├── vercel.json
└── LICENSE
```

---

## 🚀 Quick start

You need **Node.js 18 or newer** ([download](https://nodejs.org)).

```bash
cd netflix-portfolio-template
npm install       # only once
npm run dev       # opens http://localhost:5173
```

Other commands:

```bash
npm run build     # rebuilds the static site into ./site
npm run preview   # serves the built ./site at http://localhost:4173
```

---

## 👀 How do I see the preview?

There are **four** ways — use whichever suits you.

### 1. Live preview in this chat (fastest)

If you are reading this inside the Arena workspace, the preview panel already shows the running site.
Press the **Portfolio preview** tab. Nothing to install.

### 2. Local dev server (live reload — best for editing)

```bash
cd netflix-portfolio-template
npm install
npm run dev
```

Open the printed address, normally **http://localhost:5173**.
Every save hot-reloads the page instantly.

### 3. Preview the production build

```bash
npm run build     # writes ./site
npm run preview   # serves it at http://localhost:4173
```

Always do this before publishing — it is the same file set GitHub Pages will serve.

> ⚠️ Opening `site/index.html` by double-clicking it (a `file://` URL) will **not** work — browsers block ES modules loaded from the local disk. Serve it instead:
>
> ```bash
> cd site && npx serve .
> ```

---

## 🎨 Make it yours

Almost everything lives in **one file**: `src/data/content.js`.

```js
export const profile = {
  brand: "HAMZA", // navbar + loader + footer wordmark
  fullName: "Hamza Raza",
  email: "hamza.raza.dev@gmail.com",
  location: "LAHORE, PK",
  headlineTop: "HAMZA", // hero line 1 (solid white)
  headlineAccent: "DEV.ENGINE", // hero line 2 (red gradient)
  tagline: "TOP 1%",
  role: "Software Engineer & Systems Architect",
  stats: ["99.9% Uptime", "TypeScript • Node.js", "PostgreSQL & AWS"],
  rails: [
    /* the big red marquee lines */
  ],
  nav: [
    /* header + footer navigation */
  ],
  socials: [
    /* GitHub / LinkedIn / LeetCode links */
  ],
};
```

Then `about`, `expertise`, `skills`, `projects`, `contact` and `footer` — same idea, plain arrays.

### Swap the portrait

1. Prepare your photo at roughly **640 × 780 px** (4:5, portrait).
2. Save it as `src/assets/picture.png`.
3. Rebuild: `npm run build`.

The card crops with `object-cover`, so any 4:5-ish photo works.

### Change the accent colour

The template uses Netflix red `#E50914`. Find and replace it in:

- `src/index.css` → `::selection` background
- `src/components/Cursor.jsx` → the two RGBA glows and the dot shadow
- `src/components/Hero.jsx` → the hero glow gradient
- `src/components/About.jsx`, `Expertise.jsx`, `Skills.jsx`, `Projects.jsx` → the spotlight `radial-gradient(...)` values
- Any `bg-red-600` / `text-red-500` utility class you want to shift

### Change the browser-tab icon

Edit `public/favicon.svg` (plain SVG), or drop in your own `.svg`/`.png` with the same filename.

### Wire up the contact form

`src/components/Contact.jsx` currently logs to the console and shows an alert. To send real email, create a free form endpoint (for example [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)) and replace `handleSubmit`:

```js
const handleSubmit = async (event) => {
  event.preventDefault();
  if (!form.permission)
    return alert("Please accept the contact permission checkbox.");
  await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  setForm(emptyForm);
};
```

### Useful knobs

| What                             | Where                                                        |
| -------------------------------- | ------------------------------------------------------------ |
| Skill arc width / spacing        | `Skills.jsx` → `const radius = 1800`, `angle = offset * 18`  |
| Pin length of the skills section | `Skills.jsx` → `end: '+=500%'`                               |
| Poster grid gaps                 | `Projects.jsx` → the `+ 40` in the `x` / `y` tweens          |
| Card reveal timing               | `About.jsx` / `Projects.jsx` → `duration`, `stagger`, `ease` |
| Marquee speed                    | `index.css` → `animation: marquee 35s linear infinite`       |

---

## 🛠 Troubleshooting

| Symptom                                   | Fix                                                                                                                                                         |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blank page on GitHub Pages                | Make sure `index.html` and the `assets/` folder sit at the **published root**. Using Option B, the Pages folder must be `/site`, not `/ (root)`.            |
| **404** on `…github.io/repo-name/`        | Wait 1–2 minutes for the first deploy, then hard-refresh (**Ctrl ⇧ R** / **⌘ ⇧ R**).                                                                        |
| `npm run build` fails after editing       | Check for a missing comma or bracket in `src/data/content.js` — it is the file people edit most.                                                            |
| Portrait looks stretched or cropped oddly | Supply a ~**640 × 780** (4:5) image.                                                                                                                        |
| Animations feel sluggish                  | Close other heavy tabs; the pinned sections do real work. On low-end phones the layout automatically falls back to simple rails.                            |
| `file://` preview is blank                | Expected — ES modules need a server. Use `npm run preview` or `npx serve site`.                                                                             |
| Fonts look "off"                          | The template uses the system UI font stack (plus Impact/Bebas for the giant `CONTACT` word). Add a `@font-face` in `src/index.css` if you prefer a webfont. |

---

## 📄 License

MIT — free for personal and commercial use. Attribution is welcome but not required.
See [LICENSE](./LICENSE).

<div align="center">

**If this template helped you, a ⭐ on the repo goes a long way.**

`STREAMING WORLDWIDE • BUILT WITH REACT & GSAP`

</div>

<div align="center">
⭐ If this template is useful, leave a star! ⭐
</div>
