# PC Explorer (Interactive Hardware Learning Platform)

An interactive, visual learning platform designed to demystify computer hardware, motherboard anatomy, cabling schematics, and PC assembly through responsive 2.5D graphics and multi-metaphor pedagogical models.

---

## Environment Setup & Prerequisites

### 1. System Requirements

Before running the project, ensure your environment meets the following requirements:

| Tool / Environment | Required Version | Recommended | Notes |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>= 18.0.0` | `20.x LTS` or `24.x` | Runtime environment for Vite, React, and build tooling. |
| **npm** | `>= 9.0.0` | `10.x` or `11.x` | Default package manager (compatible with `pnpm` / `yarn` / `bun`). |
| **Git** | `>= 2.30.0` | Latest | For repository management and version control. |
| **OS** | Linux / macOS / Windows | Linux (Ubuntu/Debian) or macOS | For Windows, WSL2 (Windows Subsystem for Linux) is recommended. |

---

### 2. Step-by-Step Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/Qiucha/pc_explorer.git
cd pc_part_exp
```

#### Step 2: Verify Node.js & npm Installation
Check your installed Node.js and npm versions:
```bash
node -v   # Should output v18.0.0 or higher (e.g., v24.18.1)
npm -v    # Should output 9.0.0 or higher (e.g., 11.16.0)
```

> **Tip (Using NVM):** If you use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm), install and select the latest LTS version:
> ```bash
> nvm install --lts
> nvm use --lts
> ```

#### Step 3: Install Dependencies
Install all required project dependencies:
```bash
npm install
```
*(Or use `npm ci` for an exact clean installation from `package-lock.json`).*

**Key Dependencies Installed:**
- **UI & Framework:** React 19 (`react`, `react-dom`), Lucide Icons (`lucide-react`), Canvas Confetti (`canvas-confetti`).
- **Styling:** Tailwind CSS 3 (`tailwindcss`), PostCSS (`postcss`), Autoprefixer (`autoprefixer`).
- **Tooling & Build:** Vite 8 (`vite`), TypeScript 6 (`typescript`), Oxlint (`oxlint`), React Vite Plugin (`@vitejs/plugin-react`).

#### Step 4: Verify the Setup
Ensure TypeScript compilation and linting pass without errors:
```bash
# Run typecheck and bundle build
npm run build

# Run high-speed static code analysis
npm run lint
```

---

### 3. Network & Port Configuration

The Vite server configuration in [`vite.config.ts`](file:///home/q/Projects/pc_part_exp/vite.config.ts) is pre-configured for seamless local and LAN development:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // Binds to 0.0.0.0 (enables LAN / mobile testing)
    allowedHosts: true, // Allows access via tunnel or local domain names
  },
})
```

- **Default Dev Port:** `5173`
- **Default Preview Port:** `4173`
- **Firewall / LAN Access:** If accessing from a tablet, phone, or another device on the same Wi-Fi/LAN, ensure port `5173` is not blocked by local firewall rules (`ufw allow 5173/tcp` on Ubuntu/Debian).

---

### 4. Recommended IDE Setup

For the best developer experience, use VS Code, Cursor, or Antigravity IDE with these recommended extensions:
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — autocomplete for utility classes.
- **Oxlint / ESLint** — real-time linting in the editor.
- **TypeScript and JavaScript Language Features** (Built-in) — type safety and symbol navigation.

---

## Server Management Guide

### 1. Launch the Development Server
To launch the development server with Hot Module Replacement (HMR):

```bash
# Navigate to project directory
cd /home/q/Projects/pc_part_exp

# Start the Vite development server
npm run dev
```

Once started, the server outputs local and network access URLs:
- **Local:** `http://localhost:5173/`
- **Network / LAN:** Accessible via your local IP addresses shown in the terminal.

---

### 2. How to Relaunch / Restart the Server

#### Standard Restart (Interactive Terminal)
1. Press `Ctrl + C` in the terminal where Vite is running to stop the process.
2. Run:
   ```bash
   npm run dev
   ```

#### If Port 5173 is Already in Use or Process is Stuck in the Background
If the server is still running in the background or port `5173` is occupied:

```bash
# Option A: Kill any running Vite process
pkill -f vite

# Option B: Kill process listening on port 5173 directly
fuser -k 5173/tcp
# or
kill -9 $(lsof -t -i:5173) 2>/dev/null || true

# Then relaunch:
npm run dev
```

#### Launching on a Custom Port
If port `5173` is reserved by another service:
```bash
npx vite --port 3000 --host
```

#### Running as a Persistent Background Process
To keep the server running even after closing your terminal window:
```bash
# Start Vite in background and redirect output to vite.log
nohup npm run dev > vite.log 2>&1 &

# View live output logs:
tail -f vite.log

# To stop the background server:
pkill -f vite
```

---

### 3. Production Build & Preview Server

To test the optimized production build locally:

```bash
# 1. Typecheck and compile production bundle into dist/
npm run build

# 2. Launch the Vite preview server (defaults to port 4173)
npm run preview
```

The preview server will be accessible at `http://localhost:4173/`.

### 4. Zero-Backend Standalone Version (Run Directly in Browser)

**Does this website need a backend? No!** The entire PC Explorer application is 100% client-side. There are no backend servers, databases, or API microservices required. The `npm run dev` command is simply Vite's local development server for hot-reloading.

For completely standalone, offline, or zero-install usage:
- A dedicated **single-file standalone distribution** is compiled into both [`standalone/index.html`](file:///home/q/Projects/pc_part_exp/standalone/index.html) and [`docs/index.html`](file:///home/q/Projects/pc_part_exp/docs/index.html).
- **Direct Double-Click:** You can double-click `standalone/index.html` directly in your file browser (opening via `file:///` protocol) without running Node.js, Vite, or any terminal command.
- All styles, SVGs, sound synthesizers, and scripts are bundled into that single HTML file with zero CORS restrictions and zero external network calls.

#### Deploying to GitHub Pages

You can host PC Explorer on GitHub Pages in any of three seamless ways:

1. **Option 1: Automated GitHub Actions (Recommended)**
   - Go to your repository on GitHub: **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - The included [`.github/workflows/deploy.yml`](file:///home/q/Projects/pc_part_exp/.github/workflows/deploy.yml) will automatically compile and deploy the standalone bundle on every push to `main`.
2. **Option 2: Deploy from Branch via `/docs`**
   - Go to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Select Branch: `main`, Folder: **`/docs`**, then click **Save**.
   - GitHub Pages directly serves the standalone bundle at `https://<username>.github.io/pc_explorer/`.
3. **Option 3: Deploy from Branch via Root (`/`)**
   - If deploying from Branch: `main`, Folder: `/ (root)`, the root [`index.html`](file:///home/q/Projects/pc_part_exp/index.html) includes a smart static routing bridge that seamlessly routes web traffic to the standalone bundle while keeping local `npm run dev` and `npm run build` completely intact.

To recompile the standalone distribution after modifying code:
```bash
npm run build:standalone
```
See [`standalone/README.md`](file:///home/q/Projects/pc_part_exp/standalone/README.md) and [`docs/README.md`](file:///home/q/Projects/pc_part_exp/docs/README.md) for full architectural details.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local Vite dev server with instant HMR and LAN binding. |
| `npm run build` | Runs TypeScript compilation (`tsc -b`) and standard Vite production bundle. |
| `npm run build:standalone` | Compiles and packs the entire app into a self-contained single file (`standalone/index.html`). |
| `npm run preview` | Runs a local static web server to preview the standard `dist/` directory. |
| `npm run lint` | Runs `oxlint` for high-speed static code quality and React hook verification. |

---

## Key Features

1. **Exploratory Motherboard Anatomy**
   - High-precision vector motherboard schematic with interactive socket zones and tooltips.
   - Circuit layer isolation (All, Power, Data, Cooling, Rear I/O).
   - Armored vs. Bare X-Ray inspection modes.
   - Mousewheel and touch zoom with smooth pan-and-drag.

2. **Dynamic Aspect Ratio & Fluid Widescreen Engine**
   - Automatically adapts layout container, canvas height, and aspect ratio to window shape:
     - **Ultrawide ($AR \ge 2.05$):** `16:10` expansive command-center layout.
     - **Widescreen ($1.6 \le AR < 2.05$):** `7:5` balanced landscape ratio.
     - **Standard / Laptop ($1.25 \le AR < 1.6$):** `5:4` compact ratio.
     - **Square / Tiled ($0.95 \le AR < 1.25$):** `1:1` square view.
     - **Portrait / Mobile ($AR < 0.95$):** `700:860` (~`4:5`) native motherboard aspect ratio.
   - Minimal side gutters allowing 96–98% screen utilization.
   - Auto-fitting `ResizeObserver` ensures the board is always perfectly framed without clipping.

3. **Wiring & Signal Tracing Lab**
   - **Power Distribution Cable Harness:** Real physical routing connecting the modular PSU to the 24-Pin ATX, 8-Pin EPS CPU, 12V-2x6 / PCIe GPU, and SATA power connectors with voltage specs and wire gauging.
    - **External Data & Signal Cables:** Clearly separated panel illustrating SATA 6Gbps, Front-Panel USB 3.0, HD Audio, JFP1 switches/LEDs, and **Wi-Fi 6E/7 & Bluetooth High-Gain Desktop Antenna (RP-SMA Coaxial)**.
   - **Motherboard On-Board PCB Copper Traces:** Visualizes ultra-high-speed internal buses with animated signal pulses:
     - Direct CPU-to-RAM DDR5 memory channels (6400+ MT/s).
     - Direct CPU-to-GPU PCIe 5.0 x16 lanes (64 GB/s).
     - Direct CPU-to-Primary M.2 NVMe PCIe 5.0 x4 bus.
     - DMI 4.0 x8 Chipset Uplink (15.75 GB/s) and peripheral fan-out.
     - **Chipset ↔ 2.5GbE Network Controller IC (PCIe x1 via DMI):** Dedicated hardware LAN PHY/MAC packet offloader to rear RJ-45.
     - **Chipset ↔ Wi-Fi 6E/7 & Bluetooth M.2 Key-E Module:** Hybrid dual-bus architecture (PCIe x1 for multi-gigabit Wi-Fi + internal USB 2.0 for low-latency Bluetooth).
     - Chipset ↔ SATA drives and Front USB / HD Audio codec.
   - Front-Panel Header (JFP1) pinout demystifier with polarity guides and wire pairings.

4. **Gamified 7-Step Assembly Simulator**
   - Step-by-step physical PC build workflow (CPU, Cooler, RAM, M.2, Case/Board, PSU, GPU).
   - Tactile seat action triggers, installation checklists, common disaster traps, and audio cue guides.
   - Virtual Hardware Diagnostic Lab with solutions for POST failures and boot loops.

5. **Multi-Metaphor Learning Engine**
   - Toggle between 3 distinct mental models:
     - 🍳 **High-End Kitchen:** Chef, Prep Counter, Freezer, Plating Artists.
     - 📋 **Detective Office:** Lead Investigator, Whiteboard, Basement Archive, Sketch Artists.
     - 🏭 **Automated Factory:** Plant Director, Conveyor Buffer, Central Warehouse, Robotic Arms.

6. **Bilingual Support (i18n)**
   - English (`en`) and Chinese (`zh`) with decoupled content dictionaries.
