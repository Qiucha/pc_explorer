# GitHub Pages Distribution (`/docs`)

This directory contains the production-ready standalone distribution of **PC Part Explorer** configured specifically for **GitHub Pages**.

## 🌐 How to Enable GitHub Pages (Option A: Deploy from Branch)

1. Open your repository on GitHub: [`https://github.com/Qiucha/pc_explorer`](https://github.com/Qiucha/pc_explorer).
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/docs` (click **Save**).
4. Within 1–2 minutes, your site will be live at:
   `https://qiucha.github.io/pc_explorer/`

---

## ⚡ How to Enable GitHub Pages (Option B: Automated GitHub Actions)

Alternatively, you can use the included `.github/workflows/deploy.yml`:
1. In **Settings** > **Pages**:
   - **Source**: `GitHub Actions`
2. Every time you push to `main`, GitHub Actions will automatically compile and deploy the standalone bundle!

---

## 🔄 Updating the Bundle

Whenever you update source code in `src/`, run:
```bash
npm run build:standalone
```
This automatically updates both `standalone/index.html` and `docs/index.html`.
