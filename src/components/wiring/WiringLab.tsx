import React, { useState } from 'react';
import type { FrontPanelPin, Language } from '../../types';
import { getCableRoutes, getFrontPanelPins, getMotherboardFlows, getUI } from '../../content';
import {
  Zap,
  CheckCircle,
  AlertTriangle,
  Layers,
  ShieldAlert,
  ArrowRightLeft,
  Sparkles,
  Info,
  Cpu,
  Eye,
  EyeOff,
  Network
} from 'lucide-react';

interface WiringLabProps {
  lang: Language;
}

interface CableEndpoint {
  source: { x: number; y: number; label: string };
  target: { x: number; y: number; label: string };
}

const cableEndpoints: Record<string, CableEndpoint> = {
  cable_atx24: {
    source: { x: 340, y: 388, label: 'PSU 24P' },
    target: { x: 575, y: 160, label: 'ATX 24P' }
  },
  cable_eps8: {
    source: { x: 340, y: 404, label: 'PSU CPU' },
    target: { x: 162, y: 90, label: 'CPU 8P' }
  },
  cable_pcie8: {
    source: { x: 340, y: 419, label: 'PSU PCIe' },
    target: { x: 487, y: 181, label: 'GPU 8P' }
  },
  cable_12vhpwr: {
    source: { x: 340, y: 419, label: 'PSU 12V-2x6' },
    target: { x: 487, y: 181, label: 'GPU 16P' }
  },
  cable_sata_pwr: {
    source: { x: 340, y: 433, label: 'PSU SATA' },
    target: { x: 406, y: 410, label: '15P PWR' }
  },
  cable_sata_data: {
    source: { x: 560, y: 252, label: 'SATA 6G' },
    target: { x: 406, y: 393, label: '7P DATA' }
  },
  cable_front_panel: {
    source: { x: 620, y: 90, label: 'PWR SW' },
    target: { x: 550, y: 317, label: 'JFP1' }
  },
  cable_usb3: {
    source: { x: 620, y: 130, label: 'USB 3.0' },
    target: { x: 560, y: 290, label: 'F_USB3' }
  },
  cable_hd_audio: {
    source: { x: 620, y: 150, label: 'HD AUDIO' },
    target: { x: 160, y: 325, label: 'AAFP' }
  },
  cable_wifi_antenna: {
    source: { x: 148, y: 139, label: 'Wi-Fi/BT M.2' },
    target: { x: 75, y: 64, label: 'Dual Antenna' }
  }
};

interface FlowEndpoint {
  source: { x: number; y: number; label: string };
  target: { x: number; y: number; label: string };
}

const flowEndpoints: Record<string, FlowEndpoint> = {
  flow_cpu_ram: {
    source: { x: 315, y: 90, label: 'CPU IMC' },
    target: { x: 345, y: 90, label: 'DDR5' }
  },
  flow_cpu_gpu: {
    source: { x: 275, y: 115, label: 'CPU PCIe' },
    target: { x: 275, y: 175, label: 'PCIe x16' }
  },
  flow_cpu_m2: {
    source: { x: 265, y: 115, label: 'CPU NVMe' },
    target: { x: 265, y: 125, label: 'M.2_1' }
  },
  flow_cpu_chipset: {
    source: { x: 305, y: 115, label: 'CPU DMI' },
    target: { x: 460, y: 235, label: 'PCH DMI' }
  },
  flow_chipset_lan: {
    source: { x: 445, y: 260, label: 'PCH (DMI)' },
    target: { x: 158, y: 260, label: '2.5G LAN IC' }
  },
  flow_chipset_wifi_bt: {
    source: { x: 460, y: 235, label: 'PCH (PCIe+USB)' },
    target: { x: 150, y: 138, label: 'Wi-Fi/BT M.2' }
  },
  flow_chipset_sata: {
    source: { x: 515, y: 252, label: 'PCH' },
    target: { x: 560, y: 252, label: 'SATA 6G' }
  },
  flow_chipset_io: {
    source: { x: 480, y: 283, label: 'PCH' },
    target: { x: 156, y: 324, label: 'USB / Audio' }
  }
};

interface PsuRailInfo {
  id: string;
  name: string;
  nominalVoltage: string;
  colorName: string;
  hexColor: string;
  role: string;
  details: string;
}

const getPsuRails = (lang: Language): PsuRailInfo[] => {
  if (lang === 'zh') {
    return [
      {
        id: 'rail_12v',
        name: '+12V 供電軌',
        nominalVoltage: '+12.0V DC',
        colorName: '黃色 (Yellow)',
        hexColor: '#facc15',
        role: '全機主力重負載（佔 85%~90% 總功耗）',
        details: '供應 CPU 核心電壓迴路 (VRM)、顯示卡 GPU 與顯存、機殼風扇與一體式水冷幫浦。高階電競主機對此軌電流需求極大。'
      },
      {
        id: 'rail_5v',
        name: '+5V 供電軌',
        nominalVoltage: '+5.0V DC',
        colorName: '紅色 (Red)',
        hexColor: '#ef4444',
        role: '周邊配件與硬碟邏輯板',
        details: '供應 2.5 吋 SATA SSD、3.5 吋 HDD 控制晶片、USB 連接埠 5V 供電，以及 5V 3-Pin ARGB 幻彩燈光控制器。'
      },
      {
        id: 'rail_3v3',
        name: '+3.3V 供電軌',
        nominalVoltage: '+3.3V DC',
        colorName: '橘色 (Orange)',
        hexColor: '#f97316',
        role: '高速板載晶片與低壓匯流排',
        details: '直接供應 M.2 NVMe 高速 SSD、主機板晶片組 (PCH)、PCIe 插槽低壓輔助通道與記憶體終端邏輯電路。'
      },
      {
        id: 'rail_gnd',
        name: 'GND (接地迴路)',
        nominalVoltage: '0.0V Ground',
        colorName: '黑色 (Black)',
        hexColor: '#94a3b8',
        role: '電氣基準與大電流迴流通路',
        details: '直流電路必須閉合方能通電。所有正電壓供電軌 (+12V, +5V, +3.3V) 流入零組件的電流，都必須經由 GND 線材迴流至電源供應器。'
      },
      {
        id: 'rail_5vsb',
        name: '+5VSB 待機供電',
        nominalVoltage: '+5.0V Standby',
        colorName: '紫色 (Purple)',
        hexColor: '#a855f7',
        role: '關機常時微電流（待命狀態）',
        details: '只要電源總開關開啟，此軌持續供電。負責驅動開機鍵偵測晶片、網路喚醒 (Wake-on-LAN) 及關機狀態下的 USB 充電功能。'
      },
      {
        id: 'rail_pson',
        name: 'PS_ON# 開機訊號',
        nominalVoltage: 'TTL 邏輯訊號',
        colorName: '綠色 (Green)',
        hexColor: '#10b981',
        role: '軟開機低電位啟動控制線 (Pin 16)',
        details: '平時維持高電位。當你按下機殼開機鍵時，主機板會將此針腳短路拉低至 GND (0V)，電源供應器隨即啟動並輸出主要 DC 電壓軌。'
      }
    ];
  }

  return [
    {
      id: 'rail_12v',
      name: '+12V Rail',
      nominalVoltage: '+12.0V DC',
      colorName: 'Yellow Wire',
      hexColor: '#facc15',
      role: 'System Heavy Lifter (~90% Total Power)',
      details: 'Feeds CPU VRMs, GPU core & VRAM, case fans, and AIO water pumps. High-performance gaming PCs pull almost all their current from this rail.'
    },
    {
      id: 'rail_5v',
      name: '+5V Rail',
      nominalVoltage: '+5.0V DC',
      colorName: 'Red Wire',
      hexColor: '#ef4444',
      role: 'Peripherals & Storage Logic',
      details: 'Powers 2.5" SATA SSDs, 3.5" HDD logic boards, USB port VBUS power (keyboards/mice/charging), and 5V 3-pin addressable RGB lighting.'
    },
    {
      id: 'rail_3v3',
      name: '+3.3V Rail',
      nominalVoltage: '+3.3V DC',
      colorName: 'Orange Wire',
      hexColor: '#f97316',
      role: 'M.2 NVMe & Chipset Digital Logic',
      details: 'Directly powers M.2 NVMe PCIe SSDs, motherboard southbridge/PCH, PCIe auxiliary slot pins, and memory bus termination logic.'
    },
    {
      id: 'rail_gnd',
      name: 'GND (Ground)',
      nominalVoltage: '0.0V Ground',
      colorName: 'Black Wire',
      hexColor: '#94a3b8',
      role: '0V Circuit Return Path',
      details: 'Electrical current requires a closed loop. Every electron delivered by +12V, +5V, or +3.3V must return back to the PSU via the black ground leads.'
    },
    {
      id: 'rail_5vsb',
      name: '+5VSB (Standby)',
      nominalVoltage: '+5.0V Standby',
      colorName: 'Purple Wire',
      hexColor: '#a855f7',
      role: 'Always-On Trickle Power',
      details: 'Energized whenever the PSU rocker switch is ON. Keeps the power button sensing circuit, Wake-on-LAN, and USB standby charging active.'
    },
    {
      id: 'rail_pson',
      name: 'PS_ON# Signal',
      nominalVoltage: 'Logic Low Trigger',
      colorName: 'Green Wire (Pin 16)',
      hexColor: '#10b981',
      role: 'Soft Power Ignition Control',
      details: 'Normally held high. When you press the chassis power button, the motherboard pulls PS_ON# to GND, commanding the PSU to ignite all voltage rails.'
    }
  ];
};

export const WiringLab: React.FC<WiringLabProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<'power' | 'data' | 'board_data'>('power');
  const [selectedCableId, setSelectedCableId] = useState<string>('cable_atx24');
  const [selectedFlowId, setSelectedFlowId] = useState<string>('flow_cpu_gpu');
  const [showBoardTracesOverlay, setShowBoardTracesOverlay] = useState<boolean>(false);
  const [demystifierMode, setDemystifierMode] = useState<'auto' | 'power' | 'data' | 'board_data'>('auto');

  const [hoveredPin, setHoveredPin] = useState<FrontPanelPin | null>(null);
  const [selectedPin, setSelectedPin] = useState<FrontPanelPin | null>(null);

  const [hoveredRail, setHoveredRail] = useState<PsuRailInfo | null>(null);
  const [selectedRail, setSelectedRail] = useState<PsuRailInfo | null>(null);

  const t = getUI(lang);
  const cableRoutes = getCableRoutes(lang);
  const boardFlows = getMotherboardFlows(lang);
  const frontPanelPins = getFrontPanelPins(lang);
  const psuRails = getPsuRails(lang);

  // Filter cables by active category (when in power or external data mode)
  const cablesInCategory = cableRoutes.filter(c => c.category === activeCategory);
  const activeCable = cableRoutes.find(c => c.id === selectedCableId) || cablesInCategory[0] || cableRoutes[0];
  const activeEndpoint = cableEndpoints[activeCable.id] || cableEndpoints.cable_atx24;

  // Motherboard internal flow
  const activeFlow = boardFlows.find(f => f.id === selectedFlowId) || boardFlows[0];
  const activeFlowEndpoint = flowEndpoints[activeFlow.id] || flowEndpoints.flow_cpu_gpu;

  // Demystifier display follows active category if 'auto', otherwise uses manual selection
  const currentDemystifier = demystifierMode === 'auto' ? activeCategory : demystifierMode;

  const handleCategorySwitch = (category: 'power' | 'data' | 'board_data') => {
    setActiveCategory(category);
    if (category === 'power' || category === 'data') {
      const firstInCat = cableRoutes.find(c => c.category === category);
      if (firstInCat) {
        setSelectedCableId(firstInCat.id);
      }
    } else if (category === 'board_data') {
      if (!selectedFlowId) {
        setSelectedFlowId(boardFlows[0].id);
      }
    }
  };

  // Whether motherboard PCB traces should be visible in SVG
  const isTracesVisible = activeCategory === 'board_data' || showBoardTracesOverlay;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Interactive Cable Routing Diagram & Dynamic Demystifier */}
      <div className="lg:col-span-8 space-y-6">
        {/* Animated Cable Routing Canvas */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 m-0">
                {activeCategory === 'power' && <Zap className="w-5 h-5 text-amber-400" />}
                {activeCategory === 'data' && <ArrowRightLeft className="w-5 h-5 text-cyan-400" />}
                {activeCategory === 'board_data' && <Cpu className="w-5 h-5 text-sky-400" />}
                {t.wiring.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeCategory === 'power' && t.wiring.powerSubtitle}
                {activeCategory === 'data' && t.wiring.dataSubtitle}
                {activeCategory === 'board_data' && t.wiring.boardDataSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
              {/* Overlay PCB Traces Quick Toggle Button (for power & external data modes) */}
              {activeCategory !== 'board_data' && (
                <button
                  onClick={() => setShowBoardTracesOverlay(!showBoardTracesOverlay)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-all ${
                    showBoardTracesOverlay
                      ? 'bg-sky-950/70 text-sky-300 border-sky-600/80 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title="Toggle internal motherboard PCB bus lines overlay"
                >
                  {showBoardTracesOverlay ? <Eye className="w-3 h-3 text-sky-400" /> : <EyeOff className="w-3 h-3 text-slate-500" />}
                  <span>{showBoardTracesOverlay ? 'PCB Traces: ON' : 'PCB Traces: OFF'}</span>
                </button>
              )}

              {/* Mode indicator badge */}
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                  activeCategory === 'power'
                    ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                    : activeCategory === 'data'
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/80'
                    : 'bg-sky-950/60 text-sky-300 border-sky-800/80'
                }`}
              >
                {activeCategory === 'power' && '⚡ Power Mode'}
                {activeCategory === 'data' && '🔀 External Data'}
                {activeCategory === 'board_data' && '🧠 PCB Data Highways'}
              </span>

              {/* Technical Spec Pill */}
              <span
                className="text-xs font-mono font-bold px-3 py-1 rounded-lg"
                style={{
                  backgroundColor: `${activeCategory === 'board_data' ? activeFlow.color : activeCable.color}20`,
                  color: activeCategory === 'board_data' ? activeFlow.color : activeCable.color,
                  border: `1px solid ${activeCategory === 'board_data' ? activeFlow.color : activeCable.color}40`
                }}
              >
                {activeCategory === 'board_data' ? `${activeFlow.bandwidth}` : activeCable.voltage}
              </span>
            </div>
          </div>

          {/* SVG Schematic Canvas */}
          <div
            className="relative w-full bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-center p-4 transition-all duration-200"
            style={{
              aspectRatio: '700 / 480',
              minHeight: '360px',
              maxHeight: 'min(calc(100vh - 260px), 580px)'
            }}
          >
            <svg viewBox="0 0 700 480" className="w-full h-full max-h-full">
              <defs>
                <linearGradient id="psuBoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="cpuDieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>

                <filter id="glowEffect">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Chassis outline */}
              <rect x="30" y="20" width="640" height="440" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="2" />

              {/* Cable Routing Grommets (Chassis Cable Pass-throughs) */}
              <rect x="68" y="80" width="14" height="26" rx="5" fill="#050811" stroke="#334155" strokeWidth="1" />
              <rect x="596" y="140" width="12" height="42" rx="6" fill="#050811" stroke="#334155" strokeWidth="1" />
              <rect x="460" y="348" width="50" height="12" rx="5" fill="#050811" stroke="#334155" strokeWidth="1" />

              {/* Motherboard Tray (ATX) */}
              <rect x="120" y="40" width="480" height="300" rx="8" fill="#0d1424" stroke="#334155" strokeWidth="1.5" />
              <text x="360" y="56" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                ATX MOTHERBOARD PCB (HIGH-SPEED LAYER TRACES)
              </text>

              {/* PCB Ground Plane subtle circuit grid lines */}
              <g opacity="0.10" stroke="#38bdf8" strokeWidth="0.75">
                <line x1="130" y1="90" x2="230" y2="90" />
                <line x1="130" y1="130" x2="220" y2="130" />
                <line x1="395" y1="90" x2="550" y2="90" />
                <line x1="395" y1="110" x2="550" y2="110" />
                <line x1="430" y1="200" x2="430" y2="290" />
              </g>

              {/* Motherboard Components & Sockets */}

              {/* 1. CPU Power Header (Top-Left) */}
              <g id="header-cpu8">
                <rect x="140" y="75" width="45" height="30" rx="3" fill="#0f172a" stroke="#f97316" strokeWidth={activeCable.id === 'cable_eps8' && activeCategory === 'power' ? 2.5 : 1.5} />
                <rect x="156" y="71" width="13" height="4" rx="1" fill="#f97316" />
                <text x="162" y="94" fill="#f97316" fontSize="8" fontWeight="bold" textAnchor="middle">CPU 8P</text>
              </g>

              {/* 2. CPU Socket (LGA / AM5) with Integrated Memory Controller & PCIe Root Complex */}
              <g id="component-cpu-socket">
                <rect
                  x="240"
                  y="65"
                  width="75"
                  height="50"
                  rx="4"
                  fill="#0b1324"
                  stroke={activeCategory === 'board_data' && activeFlow.directCpu ? '#38bdf8' : '#475569'}
                  strokeWidth={activeCategory === 'board_data' && activeFlow.directCpu ? 2 : 1.5}
                />
                <rect x="246" y="70" width="63" height="40" rx="2" fill="url(#cpuDieGradient)" stroke="#64748b" strokeWidth="1" />
                <text x="277" y="86" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle">CPU SILICON</text>
                <text x="277" y="98" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">IMC & PCIe ROOT</text>
              </g>

              {/* 3. DDR5 RAM DIMM Slots (Slots 1, 2, 3, 4) */}
              <g id="component-ram-slots">
                <rect
                  x="345"
                  y="62"
                  width="45"
                  height="56"
                  rx="3"
                  fill="#070c18"
                  stroke={activeCategory === 'board_data' && activeFlow.id === 'flow_cpu_ram' ? '#38bdf8' : '#334155'}
                  strokeWidth={activeCategory === 'board_data' && activeFlow.id === 'flow_cpu_ram' ? 2 : 1}
                />
                {/* 4 Vertical Slots */}
                <rect x="349" y="66" width="4" height="48" rx="1" fill="#1e293b" />
                <rect x="358" y="66" width="5" height="48" rx="1" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.5">
                  <title>Slot 2 (A2) - Recommended Primary Dual-Channel Slot</title>
                </rect>
                <rect x="368" y="66" width="4" height="48" rx="1" fill="#1e293b" />
                <rect x="378" y="66" width="5" height="48" rx="1" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.5">
                  <title>Slot 4 (B2) - Recommended Primary Dual-Channel Slot</title>
                </rect>
                <text x="367" y="125" fill="#38bdf8" fontSize="6.5" fontWeight="bold" textAnchor="middle">DDR5 (2 & 4)</text>
              </g>

              {/* 4. Primary M.2_1 NVMe SSD Slot (Direct CPU PCIe x4) */}
              <g id="component-m2-1">
                <rect
                  x="230"
                  y="125"
                  width="120"
                  height="24"
                  rx="3"
                  fill="#111827"
                  stroke={activeCategory === 'board_data' && activeFlow.id === 'flow_cpu_m2' ? '#facc15' : '#eab308'}
                  strokeWidth={activeCategory === 'board_data' && activeFlow.id === 'flow_cpu_m2' ? 2 : 1.5}
                />
                <text x="290" y="140" fill="#facc15" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  M.2_1 NVMe (CPU DIRECT PCIe x4)
                </text>
              </g>

              {/* 5. 24-Pin ATX Power Header (Right Edge) */}
              <g id="header-atx24">
                <rect x="560" y="110" width="30" height="100" rx="3" fill="#0f172a" stroke="#facc15" strokeWidth={activeCable.id === 'cable_atx24' && activeCategory === 'power' ? 2.5 : 1.5} />
                <rect x="589" y="148" width="4" height="24" rx="1" fill="#facc15" />
                <text x="575" y="165" fill="#facc15" fontSize="9" fontWeight="bold" transform="rotate(-90 575 165)" textAnchor="middle">
                  24-PIN ATX
                </text>
              </g>

              {/* 6. GPU in Primary PCIe x16 Slot (Direct CPU PCIe x16) */}
              <g id="gpu-component">
                <rect x="180" y="175" width="340" height="55" rx="6" fill="#18181b" stroke={activeCategory === 'board_data' && activeFlow.id === 'flow_cpu_gpu' ? '#c084fc' : '#a855f7'} strokeWidth={activeCategory === 'board_data' && activeFlow.id === 'flow_cpu_gpu' ? 2.5 : 1.5} />
                <text x="340" y="208" fill="#c084fc" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  GRAPHICS CARD (CPU PCIe 5.0/4.0 x16)
                </text>
                <rect x="470" y="170" width="35" height="14" rx="2" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <rect x="483" y="166" width="9" height="4" rx="1" fill="#a855f7" />
                <text x="487" y="181" fill="#facc15" fontSize="7" fontWeight="bold" textAnchor="middle">12V PWR</text>
              </g>

              {/* 7. Motherboard Chipset (PCH / Southbridge) */}
              <g id="component-chipset">
                <rect
                  x="445"
                  y="235"
                  width="70"
                  height="48"
                  rx="4"
                  fill="#06121e"
                  stroke={activeCategory === 'board_data' && (activeFlow.id === 'flow_cpu_chipset' || !activeFlow.directCpu) ? '#10b981' : '#059669'}
                  strokeWidth={activeCategory === 'board_data' && (activeFlow.id === 'flow_cpu_chipset' || !activeFlow.directCpu) ? 2 : 1.5}
                />
                <text x="480" y="255" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">CHIPSET (PCH)</text>
                <text x="480" y="268" fill="#94a3b8" fontSize="6.5" textAnchor="middle">DMI 4.0 MULTIPLEXER</text>
              </g>

              {/* 8. Motherboard SATA 6Gbps Data Ports */}
              <g id="header-sata-ports">
                <rect x="560" y="235" width="30" height="35" rx="3" fill="#0f172a" stroke="#06b6d4" strokeWidth={activeCable.id === 'cable_sata_data' && activeCategory === 'data' ? 2.5 : 1.5} />
                <text x="575" y="255" fill="#06b6d4" fontSize="8" fontWeight="bold" transform="rotate(-90 575 255)" textAnchor="middle">
                  SATA 6G
                </text>
              </g>

              {/* 9. Motherboard Front USB 3.0 19-Pin Header */}
              <g id="header-usb3">
                <rect x="548" y="278" width="24" height="24" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth={activeCable.id === 'cable_usb3' && activeCategory === 'data' ? 2.5 : 1.5} />
                <rect x="546" y="287" width="3" height="6" fill="#10b981" />
                <text x="560" y="293" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">USB3</text>
              </g>

              {/* 10. Front Panel JFP1 Header (Bottom Right) */}
              <g id="header-jfp1">
                <rect x="520" y="305" width="60" height="25" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth={activeCable.id === 'cable_front_panel' && activeCategory === 'data' ? 2.5 : 1.5} />
                <text x="550" y="321" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">JFP1</text>
              </g>

              {/* 11. Front Panel HD Audio Codec & AAFP Header (Bottom Left) */}
              <g id="header-aafp">
                <rect x="135" y="308" width="42" height="26" rx="2" fill="#0f172a" stroke="#ec4899" strokeWidth={activeCable.id === 'cable_hd_audio' && activeCategory === 'data' ? 2.5 : 1.5} />
                <text x="156" y="324" fill="#ec4899" fontSize="7" fontWeight="bold" textAnchor="middle">HD AUDIO</text>
              </g>

              {/* 12. Rear I/O Bracket & External Ports (Left Edge) */}
              <g id="rear-io-bracket">
                <rect x="114" y="85" width="8" height="235" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                {/* Gold RP-SMA Wi-Fi/BT Antenna Connectors */}
                <g id="io-antenna-ports">
                  <circle
                    cx="120"
                    cy="135"
                    r={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? 4 : 3}
                    fill="#ca8a04"
                    stroke={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#38bdf8' : '#facc15'}
                    strokeWidth={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? 2 : 1}
                  />
                  <circle cx="120" cy="135" r="1" fill="#0f172a" />
                  <circle
                    cx="120"
                    cy="143"
                    r={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? 4 : 3}
                    fill="#ca8a04"
                    stroke={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#38bdf8' : '#facc15'}
                    strokeWidth={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? 2 : 1}
                  />
                  <circle cx="120" cy="143" r="1" fill="#0f172a" />
                  <title>Dual RP-SMA Wi-Fi 6E/7 & Bluetooth Antenna Connectors</title>
                </g>
                {/* RJ-45 2.5G LAN Port */}
                <g id="io-rj45-port">
                  <rect x="112" y="248" width="10" height="24" rx="2" fill="#090d16" stroke={activeFlow.id === 'flow_chipset_lan' && activeCategory === 'board_data' ? '#10b981' : '#64748b'} strokeWidth="1.5" />
                  <rect x="114" y="254" width="6" height="12" rx="1" fill="#1e293b" />
                  {/* Status LEDs */}
                  <circle cx="119" cy="251" r="1" fill="#10b981" />
                  <circle cx="119" cy="269" r="1" fill="#f59e0b" />
                  <title>2.5G / Gigabit RJ-45 LAN Ethernet Port</title>
                </g>
              </g>

              {/* 13. Wi-Fi 6E/7 & Bluetooth M.2 Key-E Module */}
              <g
                id="component-wifi-bt"
                className="cursor-pointer"
                onClick={() => {
                  if (activeCategory === 'board_data') {
                    setSelectedFlowId('flow_chipset_wifi_bt');
                  } else {
                    setSelectedCableId('cable_wifi_antenna');
                  }
                }}
              >
                <title>Motherboard Wi-Fi 6E/7 & Bluetooth M.2 Key-E Module (Hybrid PCIe + USB)</title>
                <rect
                  x="130"
                  y="124"
                  width="36"
                  height="30"
                  rx="3"
                  fill="#0c1524"
                  stroke={activeCategory === 'board_data' && activeFlow.id === 'flow_chipset_wifi_bt' ? '#06b6d4' : (activeCategory === 'data' && activeCable.id === 'cable_wifi_antenna' ? '#38bdf8' : '#334155')}
                  strokeWidth={activeCategory === 'board_data' && activeFlow.id === 'flow_chipset_wifi_bt' || (activeCategory === 'data' && activeCable.id === 'cable_wifi_antenna') ? 2.5 : 1}
                />
                <rect x="133" y="127" width="30" height="24" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                <text x="148" y="138" fill="#38bdf8" fontSize="6.5" fontWeight="bold" textAnchor="middle">Wi-Fi/BT</text>
                <text x="148" y="147" fill="#94a3b8" fontSize="5" textAnchor="middle">KEY-E</text>
                {/* Coaxial pigtail feed lines extending to rear I/O RP-SMA ports */}
                <line x1="148" y1="135" x2="120" y2="135" stroke={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#38bdf8' : '#ca8a04'} strokeWidth={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? 1.5 : 1} strokeDasharray={activeCable.id === 'cable_wifi_antenna' ? undefined : '2 1'} />
                <line x1="148" y1="143" x2="120" y2="143" stroke={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#38bdf8' : '#ca8a04'} strokeWidth={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? 1.5 : 1} strokeDasharray={activeCable.id === 'cable_wifi_antenna' ? undefined : '2 1'} />
              </g>

              {/* 14. 2.5GbE LAN Controller IC (PHY/MAC Chip) */}
              <g
                id="component-lan-chip"
                className="cursor-pointer"
                onClick={() => {
                  if (activeCategory !== 'board_data') setActiveCategory('board_data');
                  setSelectedFlowId('flow_chipset_lan');
                }}
              >
                <title>2.5GbE LAN Controller IC (PCIe x1 via DMI)</title>
                <rect
                  x="144"
                  y="248"
                  width="28"
                  height="24"
                  rx="2"
                  fill="#09121d"
                  stroke={activeCategory === 'board_data' && activeFlow.id === 'flow_chipset_lan' ? '#10b981' : '#047857'}
                  strokeWidth={activeCategory === 'board_data' && activeFlow.id === 'flow_chipset_lan' ? 2 : 1}
                />
                {/* Silver IC Pins */}
                <line x1="148" y1="246" x2="148" y2="248" stroke="#94a3b8" strokeWidth="1" />
                <line x1="154" y1="246" x2="154" y2="248" stroke="#94a3b8" strokeWidth="1" />
                <line x1="160" y1="246" x2="160" y2="248" stroke="#94a3b8" strokeWidth="1" />
                <line x1="166" y1="246" x2="166" y2="248" stroke="#94a3b8" strokeWidth="1" />
                <line x1="148" y1="272" x2="148" y2="274" stroke="#94a3b8" strokeWidth="1" />
                <line x1="154" y1="272" x2="154" y2="274" stroke="#94a3b8" strokeWidth="1" />
                <line x1="160" y1="272" x2="160" y2="274" stroke="#94a3b8" strokeWidth="1" />
                <line x1="166" y1="272" x2="166" y2="274" stroke="#94a3b8" strokeWidth="1" />
                <text x="158" y="260" fill="#10b981" fontSize="6.5" fontWeight="bold" textAnchor="middle">2.5G LAN</text>
                <text x="158" y="268" fill="#64748b" fontSize="5" textAnchor="middle">PHY/MAC</text>
                {/* Short PCB trace from LAN IC to RJ-45 port */}
                <line x1="144" y1="260" x2="122" y2="260" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
              </g>

              {/* ======================================================== */}
              {/* MOTHERBOARD ON-BOARD DATA FLOW LAYER (INTERNAL BUS TRACES) */}
              {/* ======================================================== */}
              {isTracesVisible && (
                <g id="motherboard-data-flow-layer">
                  {/* Render Inactive PCB Flows */}
                  {boardFlows.map(flow => {
                    if (activeCategory === 'board_data' && flow.id === activeFlow.id) return null;
                    return (
                      <path
                        key={`pcb-${flow.id}`}
                        d={flow.svgPath}
                        fill="none"
                        stroke={flow.color}
                        strokeWidth="2.5"
                        strokeOpacity={activeCategory === 'board_data' ? 0.35 : 0.25}
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  {/* Render Active PCB Flow with High-Tech Pulse */}
                  {activeCategory === 'board_data' && (
                    <g id="active-pcb-flow">
                      <path
                        d={activeFlow.svgPath}
                        fill="none"
                        stroke={activeFlow.color}
                        strokeWidth="6"
                        strokeLinecap="round"
                        filter="url(#glowEffect)"
                        opacity="0.95"
                      />
                      <path
                        d={activeFlow.svgPath}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeDasharray="8 12"
                        className="animate-flow-glow"
                      />

                      {/* Source connection ring */}
                      <circle cx={activeFlowEndpoint.source.x} cy={activeFlowEndpoint.source.y} r="6" fill={activeFlow.color} fillOpacity="0.3" stroke={activeFlow.color} strokeWidth="1.5" />
                      <circle cx={activeFlowEndpoint.source.x} cy={activeFlowEndpoint.source.y} r="3" fill="#ffffff" />

                      {/* Target connection ring */}
                      <circle cx={activeFlowEndpoint.target.x} cy={activeFlowEndpoint.target.y} r="6" fill={activeFlow.color} fillOpacity="0.3" stroke={activeFlow.color} strokeWidth="1.5" />
                      <circle cx={activeFlowEndpoint.target.x} cy={activeFlowEndpoint.target.y} r="3" fill="#ffffff" />
                    </g>
                  )}
                </g>
              )}

              {/* ======================================================== */}
              {/* EXTERNAL POWER & DATA CABLES                             */}
              {/* ======================================================== */}

              {/* Power Supply Unit (Basement Shroud) */}
              <g id="psu-unit">
                <rect x="120" y="370" width="220" height="75" rx="6" fill="url(#psuBoxGradient)" stroke="#facc15" strokeWidth={activeCategory === 'power' ? 2 : 1} opacity={activeCategory === 'board_data' ? 0.6 : 1} />
                <text x="220" y="405" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">
                  POWER SUPPLY UNIT (PSU)
                </text>
                <text x="220" y="425" fill="#94a3b8" fontSize="9" textAnchor="middle">
                  750W - 1000W 80 PLUS GOLD
                </text>

                {/* PSU Modular Cable Sockets Panel on Right Face */}
                <rect x="330" y="376" width="10" height="63" rx="2" fill="#070d19" stroke="#334155" strokeWidth="1" />
                <rect x="332" y="382" width="8" height="12" rx="1" fill={activeCable.id === 'cable_atx24' && activeCategory === 'power' ? '#facc15' : '#1e293b'} stroke="#facc15" strokeWidth="1">
                  <title>24-Pin ATX Main Power Port</title>
                </rect>
                <rect x="332" y="398" width="8" height="11" rx="1" fill={activeCable.id === 'cable_eps8' && activeCategory === 'power' ? '#f97316' : '#1e293b'} stroke="#f97316" strokeWidth="1">
                  <title>EPS / CPU 8-Pin Power Port</title>
                </rect>
                <rect x="332" y="413" width="8" height="11" rx="1" fill={(activeCable.id === 'cable_pcie8' || activeCable.id === 'cable_12vhpwr') && activeCategory === 'power' ? '#c084fc' : '#1e293b'} stroke="#c084fc" strokeWidth="1">
                  <title>PCIe / 12VHPWR GPU Power Port</title>
                </rect>
                <rect x="332" y="427" width="8" height="11" rx="1" fill={activeCable.id === 'cable_sata_pwr' && activeCategory === 'power' ? '#f59e0b' : '#1e293b'} stroke="#f59e0b" strokeWidth="1">
                  <title>SATA Drive Power Port</title>
                </rect>
                <text x="325" y="386" fill="#64748b" fontSize="6" fontFamily="monospace" textAnchor="end">
                  MODULAR JACKS
                </text>
              </g>

              {/* 2.5" SATA Storage Drive Bay in Basement */}
              <g id="sata-ssd-unit" opacity={activeCategory === 'board_data' ? 0.6 : 1}>
                <rect x="410" y="378" width="120" height="58" rx="4" fill="#0c1322" stroke="#eab308" strokeWidth="1.5" />
                <rect x="406" y="403" width="5" height="14" rx="1" fill={activeCable.id === 'cable_sata_pwr' && activeCategory === 'power' ? '#f59e0b' : '#ca8a04'}>
                  <title>15-Pin SATA Power Socket (From PSU)</title>
                </rect>
                <rect x="406" y="388" width="5" height="10" rx="1" fill={activeCable.id === 'cable_sata_data' && activeCategory === 'data' ? '#06b6d4' : '#0891b2'}>
                  <title>7-Pin SATA Data Socket (To Motherboard)</title>
                </rect>
                <text x="470" y="403" fill="#eab308" fontSize="9" fontWeight="bold" textAnchor="middle">
                  2.5" SATA SSD
                </text>
                <text x="470" y="419" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
                  15P POWER + 7P DATA
                </text>
              </g>

              {/* Chassis Front Panel I/O (Right edge of chassis) */}
              <g id="front-panel-io" opacity={activeCategory === 'board_data' ? 0.6 : 1}>
                <rect x="620" y="60" width="35" height="120" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                {/* 1. Power Switch Button at y=90 */}
                <circle cx="637" cy="90" r="9" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <rect x="613" y="84" width="7" height="12" rx="1" fill={activeCable.id === 'cable_front_panel' && activeCategory === 'data' ? '#38bdf8' : '#0f172a'} stroke="#38bdf8" strokeWidth="1">
                  <title>Power Switch Terminals</title>
                </rect>
                <text x="637" y="106" fill="#38bdf8" fontSize="6.5" fontWeight="bold" textAnchor="middle">PWR</text>

                {/* 2. Front USB 3.0 Port at y=130 */}
                <rect x="629" y="123" width="16" height="14" rx="2" fill="#0284c7" stroke="#10b981" strokeWidth="1" />
                <rect x="613" y="124" width="7" height="12" rx="1" fill={activeCable.id === 'cable_usb3' && activeCategory === 'data' ? '#10b981' : '#0f172a'} stroke="#10b981" strokeWidth="1">
                  <title>USB 3.0 Cable Harness Connection</title>
                </rect>
                <text x="637" y="145" fill="#10b981" fontSize="6" fontWeight="bold" textAnchor="middle">USB 3.0</text>

                {/* 3. Front HD Audio 3.5mm Jack at y=160 */}
                <circle cx="637" cy="160" r="6" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
                <rect x="613" y="154" width="7" height="12" rx="1" fill={activeCable.id === 'cable_hd_audio' && activeCategory === 'data' ? '#ec4899' : '#0f172a'} stroke="#ec4899" strokeWidth="1">
                  <title>HD Audio Cable Connection</title>
                </rect>
                <text x="637" y="176" fill="#ec4899" fontSize="6" fontWeight="bold" textAnchor="middle">AUDIO</text>
              </g>

              {/* Desktop Wi-Fi & Bluetooth Dual-Band Magnetic Antenna (Desk/Chassis Top) */}
              <g
                id="desktop-wifi-antenna"
                opacity={activeCategory === 'board_data' && activeFlow.id !== 'flow_chipset_wifi_bt' ? 0.45 : 1}
                className="cursor-pointer transition-opacity"
                onClick={() => {
                  if (activeCategory !== 'data') setActiveCategory('data');
                  setSelectedCableId('cable_wifi_antenna');
                }}
              >
                <title>Wi-Fi 6E/7 & Bluetooth High-Gain Desktop Antenna (RP-SMA Coaxial)</title>
                <rect
                  x="58"
                  y="58"
                  width="34"
                  height="12"
                  rx="3"
                  fill="#1e293b"
                  stroke={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#0ea5e9' : '#475569'}
                  strokeWidth={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? 2 : 1}
                />
                <rect x="68" y="54" width="14" height="4" rx="1" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" />
                {/* Dual Antenna Poles */}
                <line
                  x1="68"
                  y1="54"
                  x2="56"
                  y2="24"
                  stroke={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#38bdf8' : '#64748b'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="82"
                  y1="54"
                  x2="94"
                  y2="24"
                  stroke={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#38bdf8' : '#64748b'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="56" cy="24" r="2.5" fill="#38bdf8" />
                <circle cx="94" cy="24" r="2.5" fill="#38bdf8" />
                {/* Antenna Base Coaxial Jack at x=75, y=60 */}
                <circle cx="75" cy="64" r="3.5" fill={activeCable.id === 'cable_wifi_antenna' && activeCategory === 'data' ? '#0ea5e9' : '#334155'} />
                <text x="75" y="80" fill="#38bdf8" fontSize="6" fontWeight="bold" textAnchor="middle">WI-FI/BT ANT</text>
              </g>

              {/* Inactive Cables Rendering */}
              {cableRoutes.map(cable => {
                if (activeCategory !== 'board_data' && cable.id === activeCable.id) return null;
                const isSameCategory = cable.category === activeCategory;
                return (
                  <path
                    key={`bg-${cable.id}`}
                    d={cable.svgPath}
                    fill="none"
                    stroke={isSameCategory ? '#334155' : '#1e293b'}
                    strokeWidth={isSameCategory ? '3' : '1.5'}
                    strokeOpacity={activeCategory === 'board_data' ? 0.1 : isSameCategory ? 0.45 : 0.15}
                    strokeDasharray={isSameCategory ? undefined : '4 4'}
                  />
                );
              })}

              {/* Companion Cable Helper for SATA SSD (When in cable modes) */}
              {activeCategory === 'power' && activeCable.id === 'cable_sata_pwr' && (
                <g id="sata-data-companion">
                  <path d="M 560,252 C 510,252 406,330 406,393" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.65" />
                  <text x="490" y="285" fill="#06b6d4" fontSize="7" fontWeight="bold" textAnchor="middle">
                    Companion: 7-Pin SATA Data to Motherboard
                  </text>
                </g>
              )}

              {activeCategory === 'data' && activeCable.id === 'cable_sata_data' && (
                <g id="sata-pwr-companion">
                  <path d="M 340,433 C 365,433 385,410 406,410" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.65" />
                  <text x="375" y="448" fill="#f59e0b" fontSize="7" fontWeight="bold" textAnchor="middle">
                    Companion: 15-Pin SATA Power from PSU
                  </text>
                </g>
              )}

              {/* Active Selected Cable with Animated Current Pulse (Only in power/data cable modes) */}
              {activeCategory !== 'board_data' && (
                <g id="active-cable-harness">
                  <path
                    d={activeCable.svgPath}
                    fill="none"
                    stroke={activeCable.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#glowEffect)"
                    opacity="0.95"
                  />
                  <path
                    d={activeCable.svgPath}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeDasharray="10 15"
                    className="animate-flow-glow"
                  />

                  {/* Terminal Connection Indicators */}
                  <g id="cable-source-connection">
                    <circle cx={activeEndpoint.source.x} cy={activeEndpoint.source.y} r="7" fill={activeCable.color} fillOpacity="0.35" stroke={activeCable.color} strokeWidth="1.5" />
                    <circle cx={activeEndpoint.source.x} cy={activeEndpoint.source.y} r="4" fill={activeCable.color} />
                    <rect x={activeEndpoint.source.x - 3} y={activeEndpoint.source.y - 4} width="6" height="8" rx="1.5" fill="#ffffff" fillOpacity="0.9" />
                  </g>
                  <g id="cable-target-connection">
                    <circle cx={activeEndpoint.target.x} cy={activeEndpoint.target.y} r="7" fill={activeCable.color} fillOpacity="0.35" stroke={activeCable.color} strokeWidth="1.5" />
                    <circle cx={activeEndpoint.target.x} cy={activeEndpoint.target.y} r="4" fill={activeCable.color} />
                    <rect x={activeEndpoint.target.x - 4} y={activeEndpoint.target.y - 4} width="8" height="8" rx="1.5" fill="#ffffff" fillOpacity="0.9" />
                  </g>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Dynamic Demystifier Section: PSU Rails (Power), JFP1 (Data), or CPU vs Chipset (Board Data) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl">
          {/* Demystifier Header with Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              {currentDemystifier === 'power' && <Zap className="w-5 h-5 text-amber-400" />}
              {currentDemystifier === 'data' && <Layers className="w-5 h-5 text-cyan-400" />}
              {currentDemystifier === 'board_data' && <Cpu className="w-5 h-5 text-sky-400" />}
              <div>
                <h3 className="text-sm font-bold text-white m-0">
                  {currentDemystifier === 'power' && t.wiring.psuRailsGuide}
                  {currentDemystifier === 'data' && t.wiring.frontPanelGuide}
                  {currentDemystifier === 'board_data' && t.wiring.directVsChipsetTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentDemystifier === 'power' && t.wiring.psuRailsHint}
                  {currentDemystifier === 'data' && t.wiring.frontPanelHint}
                  {currentDemystifier === 'board_data' && t.wiring.directVsChipsetHint}
                </p>
              </div>
            </div>

            {/* Quick Switch Buttons for Demystifier */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-center">
              <button
                onClick={() => setDemystifierMode('power')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  currentDemystifier === 'power'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                PSU Rails
              </button>
              <button
                onClick={() => setDemystifierMode('data')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  currentDemystifier === 'data'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                JFP1 Pins
              </button>
              <button
                onClick={() => setDemystifierMode('board_data')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  currentDemystifier === 'board_data'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                CPU vs Chipset
              </button>
            </div>
          </div>

          {/* VIEW A: PSU Voltage Rails Guide (Power Mode) */}
          {currentDemystifier === 'power' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {psuRails.map(rail => {
                  const isSelected = selectedRail?.id === rail.id;
                  return (
                    <button
                      key={rail.id}
                      onClick={() => setSelectedRail(rail)}
                      onMouseEnter={() => setHoveredRail(rail)}
                      onMouseLeave={() => setHoveredRail(null)}
                      className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: rail.hexColor }} />
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{rail.nominalVoltage}</span>
                      </div>
                      <div className="text-xs font-bold text-white leading-tight">{rail.name}</div>
                      <div className="text-[9px] text-slate-400 mt-1 truncate">{rail.colorName}</div>
                    </button>
                  );
                })}
              </div>

              {/* PSU Rail Details Card */}
              <div className="w-full p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                {hoveredRail || selectedRail ? (
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: (hoveredRail || selectedRail)?.hexColor }} />
                        <strong className="text-sm font-bold text-amber-300">{(hoveredRail || selectedRail)?.name}</strong>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {(hoveredRail || selectedRail)?.nominalVoltage}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">
                        Wire Color Standard: <span className="text-slate-200 font-semibold">{(hoveredRail || selectedRail)?.colorName}</span>
                      </span>
                    </div>
                    <div className="pt-1">
                      <div className="text-[11px] font-semibold text-cyan-400 mb-1">
                        Primary System Role: {(hoveredRail || selectedRail)?.role}
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed m-0">{(hoveredRail || selectedRail)?.details}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 py-1">
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      {lang === 'zh'
                        ? '點擊或懸停上方電壓軌按鈕，解析各電壓在主機板、CPU、GPU 及硬碟上的供電職責與國際色標標準。'
                        : 'Click or hover any voltage rail button above to inspect how DC current flows to CPU, GPU, and drives.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW B: Front Panel JFP1 9-Pin Guide (Data Mode) */}
          {currentDemystifier === 'data' && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
              <div className="grid grid-cols-5 gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                {frontPanelPins.filter(p => p.row === 'top').map(pin => {
                  const isSelected = selectedPin?.pinNumber === pin.pinNumber;
                  return (
                    <button
                      key={pin.pinNumber}
                      onClick={() => setSelectedPin(pin)}
                      onMouseEnter={() => setHoveredPin(pin)}
                      onMouseLeave={() => setHoveredPin(null)}
                      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all border ${
                        pin.type === 'empty'
                          ? 'bg-slate-950/50 border-dashed border-slate-800 text-slate-600'
                          : isSelected
                          ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/40 scale-105'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-cyan-500 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold">{pin.name}</span>
                      <span className="text-[9px] text-slate-400">P{pin.pinNumber}</span>
                    </button>
                  );
                })}
                {frontPanelPins.filter(p => p.row === 'bottom').map(pin => {
                  const isSelected = selectedPin?.pinNumber === pin.pinNumber;
                  return (
                    <button
                      key={pin.pinNumber}
                      onClick={() => setSelectedPin(pin)}
                      onMouseEnter={() => setHoveredPin(pin)}
                      onMouseLeave={() => setHoveredPin(null)}
                      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all border ${
                        pin.type === 'empty'
                          ? 'bg-slate-950/50 border-dashed border-slate-800 text-slate-600'
                          : isSelected
                          ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/40 scale-105'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-cyan-500 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold">{pin.name}</span>
                      <span className="text-[9px] text-slate-400">P{pin.pinNumber}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pin Description Box */}
              <div className="w-full mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                {(hoveredPin || selectedPin) ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-cyan-300">
                        Pin {(hoveredPin || selectedPin)?.pinNumber}: {(hoveredPin || selectedPin)?.name}
                      </strong>{' '}
                      — {(hoveredPin || selectedPin)?.description}
                    </div>
                    {(hoveredPin || selectedPin)?.polarity && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        Polarity: {(hoveredPin || selectedPin)?.polarity}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-slate-500 italic">{t.wiring.frontPanelHint}</div>
                )}
              </div>
            </div>
          )}

          {/* VIEW C: Direct CPU Lanes vs Chipset Multiplexing (Board Data Mode) */}
          {currentDemystifier === 'board_data' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Direct CPU Column */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-sky-800/60 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-sky-400" />
                      {t.wiring.directCpuBadge}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      Latency: &lt; 1 µs (~70ns RAM)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed m-0">
                    {lang === 'zh'
                      ? '直接自 CPU 內部矽晶圓引出的專屬物理線路，中間毫無中繼晶片阻隔。提供極致傳輸吞吐量與超低延遲，專供運算極端敏感的零組件使用。'
                      : 'Physical copper traces etched straight from CPU socket pins with zero intermediate chips. Delivers maximum bandwidth and microscopic latency for compute-critical tasks.'}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-300">
                      DDR5 RAM (IMC)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300">
                      Primary GPU (PCIe x16)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                      Top M.2_1 (PCIe x4)
                    </span>
                  </div>
                </div>

                {/* Chipset Multiplexed Column */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-800/60 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <Network className="w-4 h-4 text-emerald-400" />
                      {t.wiring.chipsetRoutedBadge}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                      DMI 4.0 Trunk Highway
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed m-0">
                    {lang === 'zh'
                      ? '周邊設備先連至主機板晶片組 (PCH)，再經由一條高吞吐量 DMI 骨幹匯流排轉發給 CPU。完美解決 CPU 針腳數量有限的問題，容納數十個擴充設備。'
                      : 'Peripherals connect to the Motherboard Chipset (PCH), which funnel-packs data over an 8-lane DMI highway to the CPU. Solves CPU pin limitations while providing massive peripheral I/O.'}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-orange-300">
                      SATA Drives
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-pink-300">
                      USB & Audio
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                      2.5GbE LAN (PCIe x1)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                      Wi-Fi & BT (M.2 Key-E)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      Secondary M.2 Slots
                    </span>
                  </div>
                </div>
              </div>

              {/* Engineering Rule Card */}
              <div className="p-3 bg-sky-950/30 rounded-xl border border-sky-800/40 text-xs text-sky-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <p className="m-0 leading-relaxed">
                  <strong>{t.wiring.whyItMatters}:</strong>{' '}
                  {lang === 'zh'
                    ? '這就是為什麼組裝說明書極力強調「顯示卡請務必安裝在最頂部第一槽 PCIe、SSD 開機碟請裝在第一槽 M.2」！因為只有頂部插槽是 CPU 直連，下方插槽、2.5G 網卡與 Wi-Fi/藍牙模組皆經由晶片組由 DMI 總線調度。'
                    : 'This is why PC manuals strictly mandate installing your GPU in the TOP PCIe slot and your OS SSD in the TOP M.2 slot! Only top slots possess direct CPU lanes; lower slots, 2.5G LAN, and Wi-Fi/Bluetooth route through the chipset over the DMI bus.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Clean Three-Panel Switcher (Power vs External Data vs On-Board PCB Data) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Top Category Switcher Tabs */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 shadow-2xl">
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleCategorySwitch('power')}
              className={`p-2.5 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all border ${
                activeCategory === 'power'
                  ? 'bg-gradient-to-b from-amber-500/20 to-amber-600/10 border-amber-500/80 text-amber-300 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">{t.wiring.powerTab}</span>
              </div>
              <span className="text-[9px] font-mono text-amber-400/80">
                {cableRoutes.filter(c => c.category === 'power').length} Cables
              </span>
            </button>

            <button
              onClick={() => handleCategorySwitch('data')}
              className={`p-2.5 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all border ${
                activeCategory === 'data'
                  ? 'bg-gradient-to-b from-cyan-500/20 to-cyan-600/10 border-cyan-500/80 text-cyan-300 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-1">
                <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">{t.wiring.dataTab}</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400/80">
                {cableRoutes.filter(c => c.category === 'data').length} Cables
              </span>
            </button>

            <button
              onClick={() => handleCategorySwitch('board_data')}
              className={`p-2.5 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all border ${
                activeCategory === 'board_data'
                  ? 'bg-gradient-to-b from-sky-500/25 to-sky-600/10 border-sky-400 text-sky-200 shadow-lg shadow-sky-500/25'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span className="truncate">{t.wiring.boardDataTab}</span>
              </div>
              <span className="text-[9px] font-mono text-sky-400/90">
                {boardFlows.length} PCB Routes
              </span>
            </button>
          </div>
        </div>

        {/* Category Educational Architecture Banner */}
        <div
          className={`p-3.5 rounded-2xl border text-xs ${
            activeCategory === 'power'
              ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              : activeCategory === 'data'
              ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200'
              : 'bg-sky-950/20 border-sky-500/30 text-sky-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>
              {activeCategory === 'power' && 'Power Delivery Architecture'}
              {activeCategory === 'data' && 'External Data Cable Architecture'}
              {activeCategory === 'board_data' && 'Motherboard Internal PCB Data Flow'}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed m-0">
            {activeCategory === 'power' && t.wiring.powerRule}
            {activeCategory === 'data' && t.wiring.dataRule}
            {activeCategory === 'board_data' && t.wiring.boardDataRule}
          </p>
        </div>

        {/* LIST PICKER: CABLES OR ON-BOARD HIGHWAYS */}

        {/* Mode A & B: Cable List Picker */}
        {activeCategory !== 'board_data' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                {activeCategory === 'power' ? <Zap className="w-3.5 h-3.5 text-amber-400" /> : <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />}
                {t.wiring.selectCable}
              </span>
              <span className="text-[10px] font-mono text-slate-500">{cablesInCategory.length} Available</span>
            </h3>

            <div className="space-y-2">
              {cablesInCategory.map(cable => {
                const isSelected = cable.id === activeCable.id;
                return (
                  <button
                    key={cable.id}
                    onClick={() => setSelectedCableId(cable.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-center justify-between ${
                      isSelected
                        ? activeCategory === 'power'
                          ? 'bg-slate-800 border-amber-500 shadow-md shadow-amber-500/10'
                          : 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="pr-2">
                      <div className="text-xs font-bold text-white">{cable.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                        <span>{cable.pinCount}</span>
                        <span>•</span>
                        <span className="text-slate-300">{cable.voltage}</span>
                      </div>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: cable.color }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mode C: Motherboard On-Board Data Highway Picker */}
        {activeCategory === 'board_data' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                {t.wiring.selectFlow}
              </span>
              <span className="text-[10px] font-mono text-slate-500">{boardFlows.length} Routes</span>
            </h3>

            <div className="space-y-2">
              {boardFlows.map(flow => {
                const isSelected = flow.id === activeFlow.id;
                return (
                  <button
                    key={flow.id}
                    onClick={() => setSelectedFlowId(flow.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-800 border-sky-400 shadow-md shadow-sky-500/20 scale-[1.01]'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="pr-2">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{flow.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${flow.directCpu ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800' : 'text-cyan-300 bg-cyan-950/60 border-cyan-800'}`}>
                          {flow.directCpu ? 'DIRECT CPU' : 'CHIPSET'}
                        </span>
                        <span>•</span>
                        <span className="text-slate-300">{flow.bandwidth}</span>
                      </div>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: flow.color }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DETAILED INSPECTOR BREAKDOWN */}

        {/* Breakdown A & B: Cable Harness Breakdown */}
        {activeCategory !== 'board_data' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3.5 text-xs">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span
                  className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded border ${
                    activeCable.category === 'power'
                      ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                      : 'bg-cyan-950/60 text-cyan-300 border-cyan-800'
                  }`}
                >
                  {activeCable.category === 'power' ? '⚡ POWER HARNESS' : '🔀 EXTERNAL DATA CABLE'}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">{activeCable.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{t.wiring.from}</span>
                <p className="font-semibold text-slate-200 mt-0.5">{activeCable.fromName}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{t.wiring.to}</span>
                <p className={`font-semibold mt-0.5 ${activeCable.category === 'power' ? 'text-amber-300' : 'text-cyan-300'}`}>
                  {activeCable.toName}
                </p>
              </div>
            </div>

            {/* Keying Explanation Card */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <h4 className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {t.wiring.keyingMechanism}
              </h4>
              <p className="text-slate-300 leading-relaxed m-0">{activeCable.keyingRule}</p>
            </div>

            {/* Critical Gotcha Alert */}
            <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl text-rose-200">
              <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-rose-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                {t.wiring.criticalTrap}
              </h4>
              <p className="text-slate-300 leading-relaxed m-0">{activeCable.gotcha}</p>
            </div>

            {/* Contextual Advisory Card based on Category */}
            {activeCategory === 'power' ? (
              <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl text-amber-200">
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t.wiring.modularWarningTitle}
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px] m-0">{t.wiring.modularWarningDesc}</p>
              </div>
            ) : (
              <div className="bg-cyan-950/40 border border-cyan-800/60 p-3 rounded-xl text-cyan-200">
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-cyan-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {t.wiring.dataIntegrityTitle}
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px] m-0">{t.wiring.dataIntegrityDesc}</p>
              </div>
            )}
          </div>
        )}

        {/* Breakdown C: Motherboard On-Board Data Highway Profile */}
        {activeCategory === 'board_data' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3.5 text-xs">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span
                  className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded border ${
                    activeFlow.directCpu
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                      : 'bg-cyan-950/60 text-cyan-300 border-cyan-800'
                  }`}
                >
                  {activeFlow.directCpu ? `⚡ ${t.wiring.directCpuBadge}` : `🔀 ${t.wiring.chipsetRoutedBadge}`}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">{activeFlow.name}</h3>
              </div>
            </div>

            {/* Source & Destination */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{t.wiring.from}</span>
                <p className="font-semibold text-slate-200 mt-0.5">{activeFlow.fromName}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{t.wiring.to}</span>
                <p className="font-semibold text-sky-300 mt-0.5">{activeFlow.toName}</p>
              </div>
            </div>

            {/* Technical Protocol Specs Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">{t.wiring.bandwidthLabel}</span>
                <p className="font-bold text-emerald-400 mt-0.5 font-mono">{activeFlow.bandwidth}</p>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">{t.wiring.latencyLabel}</span>
                <p className="font-bold text-sky-400 mt-0.5 font-mono">{activeFlow.latency}</p>
              </div>
            </div>

            {/* Bus Protocol Spec */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase">{t.wiring.busProtocol}</span>
              <p className="font-semibold text-slate-200 mt-0.5 font-mono">{activeFlow.busType}</p>
            </div>

            {/* Why It Matters (Beginner Engineering Insight) */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <h4 className="text-[11px] font-mono text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {t.wiring.whyItMatters}
              </h4>
              <p className="text-slate-300 leading-relaxed m-0">{activeFlow.whyItMatters}</p>
            </div>

            {/* Common Trap Alert */}
            <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl text-rose-200">
              <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-rose-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                {t.wiring.criticalTrap}
              </h4>
              <p className="text-slate-300 leading-relaxed m-0">{activeFlow.commonTrap}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
