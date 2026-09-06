export const zh = {
  appTitle: '电脑硬件交互图鉴 (PC Explorer)',
  appSubtitle: '互动式电脑硬件架构、引脚与心智模型蓝图',
  modes: {
    anatomy: '1. 结构与心智图鉴',
    wiring: '2. 供电走线与引脚实验室',
    assembly: '3. 7步装机模拟挑战'
  },
  metaphors: {
    label: '心智比喻模型',
    kitchen: '🍳 顶级厨房',
    office: '📋 探长办公室/白板',
    factory: '🏭 自动化工厂'
  },
  boardControls: {
    zoomIn: '放大画布',
    zoomOut: '缩小画布',
    reset: '重置视角',
    layers: '线路图层筛选',
    allLayers: '全部插槽与元件',
    powerLayer: '⚡ 供电与VRM回路',
    dataLayer: '🔗 高速PCIe与内存通道',
    coolingLayer: '❄️ 散热与风道净空区',
    ioLayer: '🔌 接口与前面板跳线',
    xrayToggle: '装配透视 (X-Ray)',
    legend: '点击主板上发光的插槽或底部硬件卡片，查看外观结构、安装位与心智比喻。'
  },
  inspector: {
    selectedPart: '当前选中硬件',
    clickPrompt: '点击任意插槽或元件以开始分析',
    tabs: {
      anatomy: '外观与结构',
      analogy: '心智比喻',
      connections: '物理连接',
      gotchas: '新手易错雷区'
    },
    landmarksTitle: '核心物理特征与防呆防误标识',
    dimensionsTitle: '标准尺寸与外形规格',
    motherboardLocationTitle: '主板安装位置与朝向',
    socketSpecTitle: '插座/总线协议规格',
    howItConnectsTitle: '物理插接与卡扣力学',
    tactileFeedback: '触感与声音反馈',
    gotchasNotice: '极高频踩坑点与避坑指南'
  },
  wiring: {
    title: '走线与信号引脚交互实验室',
    subtitle: '直观追踪直流供电回路、高速PCIe数据通道与前面板9针跳线。',
    selectCable: '选择线缆类型',
    from: '起点',
    to: '终点',
    voltage: '电压与电流规格',
    pinCount: '针脚数与规格',
    keyingMechanism: '防呆机制（为什么绝不可能插反）',
    frontPanelGuide: '前面板 (JFP1) 9针跳线终极图解',
    frontPanelHint: '悬停或点击具体针脚，查看开机跳线原理与LED正负极区分。'
  },
  assembly: {
    title: '7步装机模拟挑战',
    subtitle: '遵循真实装机次序，从裸板到顺利点亮开机。',
    stepOf: '第 {current} 步 / 共 {total} 步',
    installButton: '将元件推入插槽并卡紧',
    installedSuccess: '安装就位并已锁紧！',
    nextStep: '下一步',
    previousStep: '上一步',
    resetBuild: '重新开始装机',
    checklistHeader: '装前安全自检清单',
    dangerMistake: '致命失误警示',
    completedTitle: '主机装配完毕，顺利点亮！',
    completedMessage: '所有核心部件均已正确对齐防呆缺口、受力锁紧并完成供电接驳。',
    diagnosticsTitle: '硬件疑难故障诊断排查',
    diagnosticsSubtitle: '实战检测你对常见装机点不亮、过热与性能减半故障的排查能力。',
    symptomLabel: '故障现象',
    causeLabel: '根本原因',
    solutionLabel: '排查与修复方案'
  }
};
