# 內容維護與管理指南 (Content Management Guide)

歡迎！此目錄收錄了 PC Explorer 應用程式的所有文字與教學內容，完全與底層 SVG 座標、畫布運算及介面排版解耦。

您可以直接在此處編輯、修正錯字、重新撰寫心智模型比喻，或新增硬體避坑技巧，支援 **英文 (`en/`)** 與 **繁體中文 (`zh/`)**。

---

## 📂 目錄結構 (Directory Structure)

```text
src/content/
├── en/                         # 英文內容庫 (English Content)
│   ├── parts.ts                # 8大硬體部件詳解、尺寸、外觀特徵、三大心智模型比喻、接頭與新手避坑點
│   ├── assembly.ts             # 7步組裝實操指南、自檢清單、裝配音效反饋、致命失誤與疑難排查案例
│   ├── wiring.ts               # 供電線束規範、防呆機制、安全警示、前面板JFP1 9針跳線針腳解析
│   ├── board.ts                # 主機板15大插槽/供電/晶片組區域標籤與子標籤
│   └── ui.ts                   # 介面按鈕、導覽列、圖層篩選、頁尾、分類名稱
├── zh/                         # 繁體中文內容庫 (Traditional Chinese Content)
│   ├── parts.ts                # 8大硬體部件繁體中文解析（處理器、散熱器、記憶體、SSD、顯示卡、主機板、電源供應器、機殼風扇）
│   ├── assembly.ts             # 7步組裝繁體中文指南與5大典型組裝故障實戰診斷
│   ├── wiring.ts               # 供電走線與前面板跳線排針繁體中文釋義
│   ├── board.ts                # 主機板插槽與核心晶片區域繁體中文標註
│   └── ui.ts                   # 互動介面、圖層、提示訊息繁體中文文字
├── types.ts                    # 純內容介面型別定義 (TypeScript Type Definitions)
└── index.ts                    # 統一載入與聚合器 (Unified Content Provider)
```

---

## ✍️ 如何修改內容 (How to Edit Content)

### 1. 修改硬體介紹或心智比喻 (Editing a Hardware Part / Analogy)
開啟 `src/content/zh/parts.ts`（或 `src/content/en/parts.ts`）。根據部件 ID (`cpu`, `cooler`, `ram`, `ssd`, `gpu`, `motherboard`, `psu`, `case_fans`) 尋找對應項目：
- `shapeDescription`: 外觀特徵描述
- `physicalLandmarks`: 核心物理特徵與防呆標示（如金色三角、金手指防呆偏置缺口等）
- `analogies`: 三大心智模型比喻（`kitchen` 廚房比喻、`office` 偵探辦公室比喻、`factory` 自動化工廠比喻）
- `connections`: 物理介面與插拔手感／注意事項
- `gotchas`: 超高頻新手雷區與避坑警示

### 2. 修改組裝流程與故障診斷 (Editing Assembly Steps & Diagnostics)
開啟 `src/content/zh/assembly.ts`（或 `src/content/en/assembly.ts`）：
- `zhAssemblySteps`: 包含 7 個組裝步驟的指導說明、4 項安全自檢清單、常見致命誤區
- `zhDiagnosticCases`: 包含常見故障（如開機黑屏、溫度瞬間破百、記憶體插錯插槽導致頻寬減半等）的現象、根本原因及排查方案

### 3. 修改電源線材與前面板跳線 (Editing Cable Wiring & Front Panel Pins)
開啟 `src/content/zh/wiring.ts`（或 `src/content/en/wiring.ts`）：
- `zhCables`: 各線材電壓、針腳數、防呆特徵及安全提示（如 12VHPWR 必須零縫隙插緊）
- `zhFrontPanelPins`: JFP1 9針定義（開機鍵、重開機鍵、硬碟燈、電源燈及正負極性說明）

### 4. 修改主機板熱點標籤 (Editing Motherboard Hotspots)
開啟 `src/content/zh/board.ts`：
- 直接修改插槽或散熱片的 `name`, `label`, `sublabel`，完全無須碰觸底層 SVG 座標。

---

## ⚡ 即時生效與語法檢查 (Hot Reloading & Verification)

1. Vite 開發伺服器支援即時熱更新，存檔後瀏覽器會自動刷新內容，無須重新啟動。
2. 執行語法與型別檢查：
   ```bash
   npm run lint
   ```
