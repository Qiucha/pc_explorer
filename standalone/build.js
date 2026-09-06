import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');
const standaloneHtmlPath = path.join(__dirname, 'index.html');
const faviconPath = path.join(rootDir, 'public', 'favicon.svg');

// 1. Check if dist exists
if (!fs.existsSync(distDir) || !fs.existsSync(assetsDir)) {
  console.error('Error: dist/ folder not found. Please run "npm run build" first.');
  process.exit(1);
}

// 2. Locate CSS and JS files in dist/assets
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('Error: could not find CSS or JS bundles in dist/assets.');
  process.exit(1);
}

const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

// Safe escape for </script> tags if any
const safeJsContent = jsContent.replace(/<\/script/gi, '<\\/script');

// 3. Read and encode favicon
let faviconDataUri = '';
if (fs.existsSync(faviconPath)) {
  const faviconSvg = fs.readFileSync(faviconPath, 'utf8');
  faviconDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(faviconSvg.trim())}`;
}

// 4. Construct self-contained standalone HTML
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PC Explorer - Interactive Hardware Architecture & Blueprint (Standalone)</title>
    <meta name="description" content="Interactive 2.5D blueprints, tactile connection mechanics, and signal flow. Standalone single-file edition requiring zero backend server." />
    ${faviconDataUri ? `<link rel="icon" type="image/svg+xml" href="${faviconDataUri}" />` : ''}
    <style>
${cssContent}
    </style>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
    <div id="root"></div>
    <script>
${safeJsContent}
    </script>
  </body>
</html>
`;

fs.writeFileSync(standaloneHtmlPath, html, 'utf8');

// 5. Also sync to docs/ directory for direct GitHub Pages branch deployment (/docs folder)
const docsDir = path.join(rootDir, 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
const docsHtmlPath = path.join(docsDir, 'index.html');
fs.writeFileSync(docsHtmlPath, html, 'utf8');

// 6. Ensure .nojekyll exists in root and docs/ to disable Jekyll processing on GitHub Pages
const rootNoJekyll = path.join(rootDir, '.nojekyll');
if (!fs.existsSync(rootNoJekyll)) {
  fs.writeFileSync(rootNoJekyll, '', 'utf8');
}
const docsNoJekyll = path.join(docsDir, '.nojekyll');
if (!fs.existsSync(docsNoJekyll)) {
  fs.writeFileSync(docsNoJekyll, '', 'utf8');
}

const stats = fs.statSync(standaloneHtmlPath);
console.log(`[Success] Standalone bundle created at: ${standaloneHtmlPath}`);
console.log(`[Success] GitHub Pages docs bundle created at: ${docsHtmlPath}`);
console.log(`Total self-contained single-file size: ${(stats.size / 1024).toFixed(1)} KB`);

