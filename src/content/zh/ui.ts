import type { UITextContent } from '../types';

export const zhUI: UITextContent = {
  appTitle: 'PC 硬體架構探索家',
  appSubtitle: '互動式電腦硬體架構與主機板裝配藍圖',
  footerTitle: 'PC 硬體架構探索家 • 互動式電腦硬體架構與主機板裝配藍圖',
  footerSubtitle: '基於 React 19 打造 • 高精度 2.5D 原生 SVG 向量畫布 • 無 3D 冗餘負擔',
  categories: {
    processing: '運算處理 / CPU',
    cooling: '散熱與溫控系統',
    memory: '高速記憶體 / RAM',
    storage: '儲存裝置 / 固態硬碟',
    expansion: '顯示卡 / PCIe 擴充',
    backbone: '主機板系統基底',
    power: '電源供應與配送',
    airflow: '機殼風道與氣流'
  },
  modes: {
    anatomy: '1. 硬體構造解剖',
    wiring: '2. 走線與針腳跳線工坊',
    assembly: '3. 7 步實戰裝機模擬器'
  },
  metaphors: {
    label: '心智比喻模型',
    kitchen: '🍳 料理廚房模型',
    office: '📋 白板辦公室模型',
    factory: '🏭 自動化組裝廠模型'
  },
  boardControls: {
    zoomIn: '放大檢視',
    zoomOut: '縮小檢視',
    reset: '重設視角',
    layers: '電路圖層篩選',
    allLayers: '全部圖層',
    powerLayer: '⚡ 供電迴路',
    dataLayer: '🔗 資料/PCIe',
    coolingLayer: '❄️ 散熱風道',
    ioLayer: '🔌 I/O 介面',
    xrayArmored: '散熱裝甲外觀 (透視模式)',
    xrayBare: '裸板 PCB 走線模式',
    xrayTitle: '切換檢視純裸板 PCB 或完整零組件覆蓋狀態',
    legend: '點擊任何發光的插槽或主機板元件，深入探索外型規格、機械咬合與心智模型。',
    hoverPrompt: '移動游標滑過或點擊任何插槽、記憶體通道、PCIe 擴充槽或供電插針進行檢視。',
    hoverPrefix: '目前懸停：',
    specsBadge: '標準 ATX 規格 305x244mm • 全面支援 PCIe 5.0'
  },
  inspector: {
    selectedPart: '目前選取零組件',
    clickPrompt: '請點擊畫布中的零組件或主機板插槽以查看詳細技術規格',
    tabs: {
      anatomy: '外觀與防呆',
      analogy: '心智模型',
      connections: '介面與手感',
      gotchas: '組裝避坑重點'
    },
    landmarksTitle: '核心物理特徵與防呆對齊標記',
    dimensionsTitle: '標準外觀規格與物理尺寸',
    motherboardLocationTitle: '主機板安裝位置與朝向',
    socketSpecTitle: '插槽規格 / 匯流排介面標準',
    howItConnectsTitle: '物理插接介面與機械鎖定動態',
    tactileFeedback: '機械觸感與聲音反饋',
    gotchasNotice: '新手極易踩坑的關鍵雷區與避坑指南',
    physicalAnatomyTitle: '外觀結構與幾何造型',
    roleLabel: '核心職責：',
    dataFlowTitle: '資料流向與動態協同',
    mechanismLabel: '連接機制：',
    tactileLabel: '機械觸感：',
    noteLabel: '特別注意事項：'
  },
  wiring: {
    title: '互動式供電走線與訊號針腳實驗室',
    subtitle: '即時追蹤直流穩壓供電軌、PCIe 高速通道與機殼前面板跳線陣列。',
    selectCable: '選擇供電線材 / 訊號線束',
    from: '來源端 (輸出)',
    to: '目標端 (接收)',
    voltage: '工作電壓 / 電氣規範',
    pinCount: '針腳數與端子規格',
    keyingMechanism: '防呆機制（為何絕對不可能插反）',
    frontPanelGuide: '前面板 (JFP1) 9-Pin 跳線排針全解析',
    frontPanelHint: '懸停或點擊個別針腳，即可解析開機跳線原理與 LED 正負極性。',
    harnessProfile: '電源線束詳細規格',
    criticalTrap: '線材接駁極高危雷區',
    modularWarningTitle: '嚴禁混用不同電源供應器的模組線！',
    modularWarningDesc: '電源供應器本體端的插座定義並無國際標準！將海盜船線材插在 EVGA 或海韻電源上，會導致 12V 與接地極性相反，瞬間燒毀主機板與所有硬碟。'
  },
  assembly: {
    title: '7 步互動式 PC 自組電腦組裝挑戰',
    subtitle: '從開箱裸主機板開始，按順序完成各項零組件安裝直至成功點亮開機。',
    stepOf: '第 {current} 步 / 共 {total} 步',
    installButton: '將零組件對齊並壓入插槽安裝',
    installedSuccess: '已成功就位並確實卡緊鎖定！',
    nextStep: '進入下一步',
    previousStep: '返回上一步',
    resetBuild: '重新開始組裝',
    checklistHeader: '通電開機前安全檢查核對清單',
    dangerMistake: '新手常見毀滅性失誤',
    completedTitle: '電腦組裝圓滿完成！',
    completedMessage: '所有零組件皆已按正確扭矩安裝、防呆缺口完美對齊，且供電線路已穩固連接。',
    diagnosticsTitle: '虛擬硬體故障排查診斷室',
    diagnosticsSubtitle: '透過真實組裝翻車案例，測試並提升你的電腦硬體排障實戰功力。',
    symptomLabel: '故障現象',
    causeLabel: '根本原因',
    solutionLabel: '排查與修復方案',
    audioCueLabel: '物理手感／聲音反饋：',
    seatingInProgress: '零組件安裝與卡榫咬合中...'
  }
};
