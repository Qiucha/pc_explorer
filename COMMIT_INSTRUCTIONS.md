# Git Commit & Push Instructions

This guide provides step-by-step instructions to verify, stage, sign, commit, and push the recent features to the remote repository (`origin/main`).

---

## 1. Summary of Changes in This Release

| Category | Key Files | Purpose & Description |
| :--- | :--- | :--- |
| **Fluid Widescreen Engine** | `src/hooks/useWindowDimensions.ts`, `src/components/board/MotherboardCanvas.tsx`, `src/App.tsx`, `src/components/header/Navbar.tsx` | Dynamically adapts layout and canvas aspect ratio ($16:10$, $7:5$, $5:4$, $1:1$, $4:5$) to window dimensions with minimal side padding (96–98% screen fill). |
| **Wiring & Signal Flow Lab** | `src/components/wiring/WiringLab.tsx`, `src/data/wiringData.ts`, `src/content/*/boardFlows.ts`, `src/content/*/wiring.ts` | Separated Power, External Data, and On-Board PCB Data flows. Added physical PSU routing, on-board 2.5GbE Network Controller IC from DMI, Wi-Fi 6E/7 & Bluetooth hybrid bus, and RP-SMA desktop antenna. |
| **Zero-Backend Standalone** | `standalone/index.html`, `standalone/build.js`, `standalone/README.md`, `package.json` | 100% self-contained single-file edition (479 KB) that runs directly in any browser via double-click (`file:///`), with zero server requirements. |
| **Documentation & Guides** | `README.md`, `COMMIT_INSTRUCTIONS.md` | Documented environment prerequisites, Vite server management, kill stuck port 5173, background daemon, and standalone usage. |

---

## 2. Pre-Commit Verification (Run First)

Before staging, confirm that TypeScript, Vite build, and the linter pass with zero errors:

```bash
# 1. Run linter (oxlint)
npm run lint

# 2. Run TypeScript check & standalone bundle compilation
npm run build:standalone
```

Expected output:
- `Found 0 warnings and 0 errors.`
- `[Success] Standalone bundle created at: .../standalone/index.html`

---

## 3. SSH Commit Signing Notice

Your repository has commit signing enabled:
- `commit.gpgsign = true`
- `user.signingkey = /home/q/.ssh/id_ed25519_signing.pub`

When running `git commit`, Git will automatically sign your commits using your configured SSH key. If prompted for your SSH key passphrase, enter it to complete the commit.

---

## 4. Choose Your Commit Strategy

### Option A: Modular Multi-Commit (Recommended for Clean Git History)

This breaks your changes into 4 logical, atomic commits conforming to Conventional Commits:

#### Step A1: Commit the Fluid Widescreen Engine & Dynamic Layout
```bash
git add src/hooks/useWindowDimensions.ts src/components/board/MotherboardCanvas.tsx src/App.tsx src/components/header/Navbar.tsx

git commit -m "feat(layout): implement fluid widescreen engine and dynamic aspect ratio scaling

- Create useWindowDimensions hook with debounced window observation
- Dynamically adapt canvas aspect ratio (16:10, 7:5, 5:4, 1:1, 4:5) to viewport
- Minimize side margins to achieve 96-98% screen real estate utilization
- Auto-fit motherboard diagram using ResizeObserver zoom recalculation"
```

#### Step A2: Commit the Wiring Lab Upgrades, Network Chip & Wi-Fi Routing
```bash
git add src/components/wiring/WiringLab.tsx src/data/wiringData.ts src/types/index.ts src/content/en/boardFlows.ts src/content/zh/boardFlows.ts src/content/en/wiring.ts src/content/zh/wiring.ts src/content/en/ui.ts src/content/zh/ui.ts src/content/types.ts src/content/index.ts

git commit -m "feat(wiring): separate power/data panels, add on-board PCB flows, network chip, and Wi-Fi/BT routing

- Cleanly separate Power Delivery, External Data, and On-Board PCB Data into three dedicated panels
- Physically connect PSU modular jacks to 24-Pin ATX, 8-Pin EPS, PCIe/12VHPWR, and SATA power
- Add on-board PCB trace layer with animated high-tech current pulses
- Implement 2.5GbE Network Controller IC connected via PCIe x1 from Chipset (DMI) to rear RJ-45
- Implement Wi-Fi 6E/7 & Bluetooth M.2 Key-E module with hybrid bus (PCIe x1 for Wi-Fi + USB 2.0 for BT)
- Add physical connection to rear I/O RP-SMA coaxial ports and desktop dual-band antenna
- Expand interactive Demystifiers for PSU Rails, JFP1 pinout, and CPU Direct vs Chipset Multiplexing"
```

#### Step A3: Commit the Zero-Backend Standalone Single-File Distribution
```bash
git add standalone/ package.json

git commit -m "feat(standalone): add zero-backend single-file distribution and inlining bundler

- Create standalone/ directory with fully self-contained index.html (479 KB)
- Add standalone/build.js script to inline production CSS, JS bundle, and SVG assets
- Enable direct file:/// execution without local web servers or CORS restrictions
- Add build:standalone npm script to package.json
- Add standalone/README.md with offline architecture guide and Preact comparison"
```

#### Step A4: Commit the Documentation & Environment Setup
```bash
git add README.md COMMIT_INSTRUCTIONS.md

git commit -m "docs: update README with server relaunch guide, environment setup, and standalone usage

- Document system prerequisites (Node.js >=18, npm >=9, Git, OS)
- Document local dev server relaunch, port conflicts (fuser/lsof), and background daemon commands
- Document zero-backend standalone browser distribution and build:standalone workflow
- Update Key Features with Wiring Lab upgrades and fluid widescreen engine"
```
---

### Option B: Single Consolidated Commit (Fast & Comprehensive)

If you prefer to capture the entire milestone in a single clean commit:

```bash
git add .

git commit -m "feat: add fluid aspect ratio engine, PCB data flows, network & Wi-Fi routing, and standalone browser bundle

- Fluid Widescreen Engine: Dynamic aspect ratio scaling (16:10 to 4:5) with minimal gutters
- Wiring Lab Separation: Split Power, External Data, and On-Board PCB Data flows into clean panels
- Network Controller: Add 2.5GbE LAN IC connected via PCIe x1 from Chipset (DMI) to rear RJ-45
- Wi-Fi & Bluetooth: Model hybrid M.2 Key-E bus (PCIe + USB) and physical RP-SMA desktop antenna routing
- Zero-Backend Standalone: Add standalone/index.html single-file bundle for direct browser execution
- Server & Docs: Add comprehensive environment setup, server relaunch guide, and build:standalone script"
```

---

## 5. Verify the Signed Commits

To verify that your commit(s) were successfully signed with your SSH key:

```bash
# View the latest commit with signature verification details:
git log -1 --show-signature
```

Expected output:
```text
Good "git" signature for 56359864+Qiucha@users.noreply.github.com with ED25519 key SHA256:...
```

---

## 6. Push Changes to the Remote Branch

Push your signed commit(s) to the `main` branch on GitHub:

```bash
git push origin main
```

Verify that the working directory is clean and up to date:

```bash
git status
```

Expected output:
```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

## 7. Handling This Instruction File

`COMMIT_INSTRUCTIONS.md` was created in your root directory for your convenience. You can either:
- **Keep it in the repository as project documentation**: Included in Step A4 / Option B.
- **Or remove it after you finish pushing**:
  ```bash
  rm COMMIT_INSTRUCTIONS.md
  ```
