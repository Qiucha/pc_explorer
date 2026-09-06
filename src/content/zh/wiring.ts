import type { CableTextContent, FrontPanelPinTextContent } from '../types';

export const zhCables: Record<string, CableTextContent> = {
  cable_atx24: {
    id: 'cable_atx24',
    name: '24-Pin ATX 主機板主供電線束',
    fromName: '電源供應器 (PSU)',
    toName: '主機板 24-Pin 供電插座',
    voltage: '+12V、+5V、+3.3V、+5VSB (待機供電)、接地 (GND)',
    pinCount: '24 針 (雙排 2x12 針腳)',
    keyingRule: '採用方形與倒角梯形交錯排列的物理防呆結構，從機械外觀上徹底杜絕反插或倒插的可能。',
    gotcha: '插入時需要施加相當大的垂直下壓力，直到側邊塑膠防脫卡榫完全扣入主機板插座上的固定凸齒，並發出清脆的「喀嗒」鎖定聲；若未完全插緊極易造成接觸不良發熱或無法通電開機。'
  },
  cable_eps8: {
    id: 'cable_eps8',
    name: '8-Pin (4+4) EPS CPU 處理器供電線',
    fromName: '電源供應器 (PSU)',
    toName: 'CPU VRM 供電插座 (位於主機板左上方散熱片旁)',
    voltage: '+12V DC 大電流供電',
    pinCount: '8 針 (可拆分拆組為 4+4 針)',
    keyingRule: '可拆分為兩組獨立的 4 針接頭，具有獨特的方角與圓角防呆幾何排列；接頭外殼通常明確印有「CPU」識別字樣。',
    gotcha: '【致命警告・切勿與顯示卡 PCIe 8-Pin 混淆】絕對嚴禁將顯示卡的 8-Pin (6+2) PCIe 線材插進此插座！雖然兩者同為 8 針，但電氣定義完全顛倒（EPS 上排為接地、下排為 +12V；PCIe 則正好相反），一旦強行插錯通電，將直接引發短路保護甚至燒毀主機板與電源！'
  },
  cable_pcie8: {
    id: 'cable_pcie8',
    name: '8-Pin (6+2) PCIe 顯示卡供電線',
    fromName: '電源供應器 (PSU)',
    toName: '顯示卡獨立供電插座 (位於顯示卡頂部側緣)',
    voltage: '+12V DC 高功率供電 (單一 8-Pin 最高承載 150W)',
    pinCount: '8 針 (由 6 針主體 + 2 針副插頭組合而成)',
    keyingRule: '由 6-Pin 本體與可滑動卡扣的 2-Pin 組合而成，能向下相容舊款 6-Pin 顯示卡；接頭塑料外殼上刻有「PCIe」或「PCI-E」字樣。',
    gotcha: '【獨立走線與防燒建議】對於功耗超過 220W 的中高階顯示卡，強烈避免使用同一條線材上的分接頭 (Daisy-chain / 豬尾巴線 一分二) 連接多個 8-Pin 插座！強烈建議從電源供應器拉出獨立的原生線材分別插入各個插座，以避免單一線徑負載過熱甚至熔毀線材。'
  },
  cable_12vhpwr: {
    id: 'cable_12vhpwr',
    name: '12VHPWR / PCIe 5.0 (16-Pin) 新世代顯示卡供電線',
    fromName: 'ATX 3.0 / 3.1 規範電源供應器 (原生 12V-2x6 / 12VHPWR 埠)',
    toName: 'RTX 40 / RTX 50 系列高階顯示卡供電插座',
    voltage: '+12V (最高支援 600W 供電) + 4 針微型邊帶感測訊號 (Sense Pins)',
    pinCount: '16 針 (12 根大電流供電針腳 + 4 根微型邊帶偵測訊號線)',
    keyingRule: '高密度微型接頭設計，頂部配有 4 根微型邊帶訊號針腳 (Sense 0-3)，用於向顯示卡晶片握手確認供電功率上限 (150W/300W/450W/600W)。',
    gotcha: '【極度危險・燒熔風險】插頭必須「完全插緊推到底」，確保公母頭接縫處達到 100% 水平貼合、肉眼確認「零間隙」，並確認中央鎖扣已牢牢咬合！在距離接頭 35mm 範圍內嚴禁強力急劇彎折，否則端子細微歪斜將導致接觸電阻劇增，通電滿載時極易產生高溫而燒熔毀壞！'
  },
  cable_front_panel: {
    id: 'cable_front_panel',
    name: '前面板開關與指示燈跳線排束 (JFP1 9針)',
    fromName: '機殼前面板按鍵與狀態指示燈線組',
    toName: '主機板 JFP1 前面板控制排針座 (通常位於主機板右下角)',
    voltage: '3.3V 邏輯電位 / 接地 (GND)',
    pinCount: '9 針陣列 (由單針與雙針杜邦母頭組成)',
    keyingRule: '由獨立標記 POWER SW、RESET SW、HDD LED、POWER LED 的微型 2-Pin 杜邦接頭組成，排針在第 9 針位置採用防呆空缺。',
    gotcha: '【正負極性須知】LED 發光二極體指示燈 (HDD LED 硬碟燈、POWER LED 電源燈) 具有方向極性，正極 (+) 必須對準正極針腳，接反則指示燈無法點亮；而觸發開關 (POWER SW 開機鍵、RESET SW 重啟鍵) 僅為瞬間微動短路導通，無正負極性區分，反接依然能正常開機重啟。'
  },
  cable_sata: {
    id: 'cable_sata',
    name: 'SATA 資料傳輸與電源線組 (L型防呆介面)',
    fromName: '主機板 SATA 埠與電源供應器 SATA 供電端',
    toName: '2.5 吋 SATA 固態硬碟 (SSD) / 3.5 吋傳統機械硬碟 (HDD)',
    voltage: '+12V、+5V、+3.3V (供電) / 6Gbps 高速差分訊號 (資料傳輸)',
    pinCount: '7 針資料線 + 15 針扁平電源線',
    keyingRule: 'SATA 資料線與電源線接頭內部均具備顯著的「L 型」幾何防呆凹槽，防止反向或歪斜插入。',
    gotcha: 'SATA 儲存裝置必須同時接妥「兩條」線材方能正常運作：一條由電源供應器拉出的 15-Pin 扁平電源線供電，另一條由主機板引出的 7-Pin 扁平資料線傳輸（拔出資料線時切記按壓金屬彈片以防扯壞插座）。'
  }
};

export const zhFrontPanelPins: FrontPanelPinTextContent[] = [
  {
    pinNumber: 1,
    label: '+',
    name: 'HDLED+',
    type: 'led',
    polarity: '+',
    row: 'top',
    description: '硬碟活動指示燈正極 (+，連接彩色/標記正極引線，LED 極性必須嚴格對應)'
  },
  {
    pinNumber: 3,
    label: '-',
    name: 'HDLED-',
    type: 'led',
    polarity: '-',
    row: 'top',
    description: '硬碟活動指示燈負極 (-，連接白色或黑色接地線，接反則讀寫閃爍燈不亮)'
  },
  {
    pinNumber: 5,
    label: '-',
    name: 'GND',
    type: 'switch',
    row: 'top',
    description: '重開機按鈕接地端 (GND，與 RESET 訊號端瞬間導通以實現硬體重置)'
  },
  {
    pinNumber: 7,
    label: '+',
    name: 'RESET',
    type: 'switch',
    row: 'top',
    description: '重開機開關訊號觸發跳線 (瞬間拉低電位重啟電腦，無正負極性限制)'
  },
  {
    pinNumber: 9,
    label: 'x',
    name: 'NC',
    type: 'empty',
    row: 'top',
    description: '空置引腳 / 防呆缺針 (無電氣針腳，作為防呆物理定位參考)'
  },
  {
    pinNumber: 2,
    label: '+',
    name: 'PLED+',
    type: 'led',
    polarity: '+',
    row: 'bottom',
    description: '電源指示燈正極 (+，提供主機通電常亮訊號，極性必須對應)'
  },
  {
    pinNumber: 4,
    label: '-',
    name: 'PLED-',
    type: 'led',
    polarity: '-',
    row: 'bottom',
    description: '電源指示燈負極 (-，接地迴路，接反則開機燈不亮)'
  },
  {
    pinNumber: 6,
    label: '+',
    name: 'PWR_SW',
    type: 'switch',
    row: 'bottom',
    description: '開機按鈕訊號觸發跳線 (短接瞬間即可點亮電腦！送出開機脈衝，無極性要求)'
  },
  {
    pinNumber: 8,
    label: '-',
    name: 'GND',
    type: 'switch',
    row: 'bottom',
    description: '開機按鈕接地端 (GND，與 PWR_SW 搭配組成瞬時閉合迴路)'
  },
  {
    pinNumber: 10,
    label: 'x',
    name: 'DUMMY',
    type: 'empty',
    row: 'bottom',
    description: '防呆無針腳位 / 保留未定義針腳 (無電氣連接)'
  }
];
