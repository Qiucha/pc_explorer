# Standalone Single-File Edition (Zero Backend Required)

This directory contains a **100% self-contained, single-file distribution** of the **PC Part Explorer & Architecture Blueprint**.

---

## ⚡ Can it run directly in the browser without a backend?

**Yes, 100%!**

In fact, **this application does NOT have a backend at all**:
- There is no Node/Express server, no Python/Flask API, and no database.
- Everything—the 2.5D interactive motherboard canvas, the 3-panel wiring and signal flow lab, the 7-step assembly simulator, the audio cue synthesis, the metaphors, and the English/Traditional Chinese translations—runs **entirely within the user's browser**.
- The `npm run dev` command used previously was only Vite's local development server for hot-reloading code while editing.

---

## 🚀 How to Run `standalone/index.html`

### Option 1: Direct Double-Click (`file:///` Protocol)
You can literally **double-click** `standalone/index.html` in your file manager, or run:
```bash
# Linux
google-chrome standalone/index.html
# or: xdg-open standalone/index.html

# macOS
open standalone/index.html

# Windows
start standalone\index.html
```
- **No Node.js needed.**
- **No terminal command needed.**
- **No internet access required (runs 100% offline).**
- Works on USB drives, air-gapped computers, presentations, and inside webviews/iframes.

### Option 2: Deploy to Any Static Web Host
Drop `index.html` directly into:
- GitHub Pages
- Cloudflare Pages
- Vercel / Netlify
- AWS S3 / CloudFront
- Apache / Nginx / Caddy static web root

### Option 3: Optional Quick Local HTTP Server
If you prefer running a local static HTTP server:
```bash
# Python 3 (built into almost every Linux/macOS system)
python3 -m http.server 8080 --directory standalone

# Or Node npx serve
npx serve standalone
```

---

## 📦 What Makes This Standalone Edition Special?

A standard Vite build generates an `index.html` with `<script type="module" src="/assets/index.js">`. When opened directly from the filesystem (`file:///`), browsers trigger strict CORS security policies that block external ES modules.

This standalone edition solves that:
1. **Inlined CSS**: All Tailwind utilities, custom animations, and layout styles are bundled directly into `<style>`.
2. **Inlined JavaScript**: The complete application logic is compiled into a single standard `<script>` block that executes cleanly in the browser's global scope without triggering module CORS blocks.
3. **Embedded SVG Favicon**: The favicon is embedded as an inline data URI (`data:image/svg+xml,...`).
4. **Total Size**: Only **~467 KB** for the complete application—including all 3 modules, animated SVGs, audio synthesis, and bilingual data!

---

## 🧠 Framework Footprint & Lightweight Alternatives

| Framework | Runtime Size (gzipped) | Architecture | Status in This Project |
| :--- | :--- | :--- | :--- |
| **React 19 + ReactDOM** | ~140 KB (~440 KB raw) | Component VDOM | Current foundation (bundled into 467 KB single file) |
| **Preact + compat** | **~4 KB (~10 KB raw)** | Ultra-lightweight drop-in React replacement | Drop-in compatible with all current components & hooks |
| **Vanilla Web Components** | **0 KB (Native Browser API)** | Custom Elements & Shadow DOM | Requires manual DOM reconciliation |

> [!TIP]
> If you ever wish to shrink the bundle even further down to ~30 KB, the existing React components can be aliased to **Preact** (`preact/compat`) with zero code changes, saving ~130 KB of framework overhead!

---

## 🛠️ How to Rebuild After Modifying Source Code

Whenever you update components or content in `src/`, run:
```bash
npm run build:standalone
```
This automatically compiles the TypeScript source with Vite and re-packages everything into `standalone/index.html`.
