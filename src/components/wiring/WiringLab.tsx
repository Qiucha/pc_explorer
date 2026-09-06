import React, { useState } from 'react';
import { cableRoutes, frontPanelPins } from '../../data/wiringData';
import type { FrontPanelPin } from '../../data/wiringData';
import type { Language } from '../../types';
import { getTranslation } from '../../i18n';
import {
  Zap,
  CheckCircle,
  AlertTriangle,
  Layers,
  ShieldAlert
} from 'lucide-react';

interface WiringLabProps {
  lang: Language;
}

export const WiringLab: React.FC<WiringLabProps> = ({ lang }) => {
  const [selectedCableId, setSelectedCableId] = useState<string>('cable_atx24');
  const [hoveredPin, setHoveredPin] = useState<FrontPanelPin | null>(null);
  const [selectedPin, setSelectedPin] = useState<FrontPanelPin | null>(null);

  const t = getTranslation(lang);
  const activeCable = cableRoutes.find(c => c.id === selectedCableId) || cableRoutes[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Interactive Cable Routing Diagram & Front Panel Demystifier */}
      <div className="lg:col-span-8 space-y-6">
        {/* Animated Cable Routing Canvas */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 m-0">
                <Zap className="w-5 h-5 text-amber-400" />
                {t.wiring.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.wiring.subtitle}
              </p>
            </div>
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-lg"
              style={{
                backgroundColor: `${activeCable.color}20`,
                color: activeCable.color,
                border: `1px solid ${activeCable.color}40`
              }}
            >
              {activeCable.voltage}
            </span>
          </div>

          {/* SVG Schematic Canvas for Cabling */}
          <div className="relative w-full h-[400px] bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-center p-4">
            <svg viewBox="0 0 700 480" className="w-full h-full">
              <defs>
                <linearGradient id="psuBoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
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

              {/* Motherboard Tray */}
              <rect x="120" y="40" width="480" height="300" rx="8" fill="#0d1424" stroke="#334155" strokeWidth="1.5" />
              <text x="360" y="65" fill="#475569" fontSize="12" fontWeight="bold" textAnchor="middle">
                ATX MOTHERBOARD TRAY
              </text>

              {/* Target Headers on Motherboard */}
              {/* CPU Power Header (Top-Left) */}
              <rect x="140" y="75" width="45" height="30" rx="3" fill="#0f172a" stroke="#f97316" strokeWidth="2" />
              <text x="162" y="94" fill="#f97316" fontSize="8" fontWeight="bold" textAnchor="middle">CPU 8P</text>

              {/* 24-Pin ATX Power Header (Right Edge) */}
              <rect x="560" y="110" width="30" height="100" rx="3" fill="#0f172a" stroke="#facc15" strokeWidth="2" />
              <text x="575" y="165" fill="#facc15" fontSize="9" fontWeight="bold" transform="rotate(-90 575 165)" textAnchor="middle">
                24-PIN ATX
              </text>

              {/* GPU in PCIe slot */}
              <rect x="180" y="180" width="340" height="60" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="2" />
              <text x="350" y="215" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                GRAPHICS CARD (PCIe x16)
              </text>
              <rect x="470" y="175" width="35" height="12" rx="2" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
              <text x="487" y="184" fill="#facc15" fontSize="7" fontWeight="bold" textAnchor="middle">12V PWR</text>

              {/* M.2 SSD */}
              <rect x="230" y="125" width="120" height="25" rx="2" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
              <text x="290" y="141" fill="#facc15" fontSize="8" textAnchor="middle">M.2 NVMe SSD</text>

              {/* Front Panel Header (Bottom Right) */}
              <rect x="520" y="305" width="60" height="25" rx="2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="550" y="321" fill="#06b6d4" fontSize="8" fontWeight="bold" textAnchor="middle">JFP1</text>

              {/* Power Supply Unit (Basement Shroud) */}
              <rect x="120" y="370" width="220" height="75" rx="6" fill="url(#psuBoxGradient)" stroke="#facc15" strokeWidth="2" />
              <text x="230" y="405" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">
                POWER SUPPLY UNIT (PSU)
              </text>
              <text x="230" y="425" fill="#94a3b8" fontSize="9" textAnchor="middle">
                750W - 1000W 80 PLUS GOLD
              </text>

              {/* Front Panel Button (Right edge of chassis) */}
              <rect x="620" y="60" width="35" height="100" rx="4" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
              <circle cx="637" cy="90" r="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
              <text x="637" y="140" fill="#06b6d4" fontSize="7" fontWeight="bold" transform="rotate(-90 637 140)" textAnchor="middle">
                POWER BUTTON
              </text>

              {/* Render Inactive Cables in subtle gray */}
              {cableRoutes.map(cable => {
                if (cable.id === activeCable.id) return null;
                return (
                  <path
                    key={`bg-${cable.id}`}
                    d={cable.svgPath}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="3"
                    strokeOpacity="0.4"
                  />
                );
              })}

              {/* Render Active Selected Cable with Animated Current Pulse */}
              <path
                d={activeCable.svgPath}
                fill="none"
                stroke={activeCable.color}
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#glowEffect)"
                opacity="0.9"
              />
              <path
                d={activeCable.svgPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="10 15"
                className="animate-flow-glow"
              />
            </svg>
          </div>
        </div>

        {/* Front Panel Header (JFP1) 9-Pin Interactive Demystifier */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 m-0">
              <Layers className="w-4 h-4 text-cyan-400" />
              {t.wiring.frontPanelGuide}
            </h3>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
              Standard Intel/AMD JFP1
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            {t.wiring.frontPanelHint}
          </p>

          {/* 9-Pin Interactive Grid */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="grid grid-cols-5 gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
              {/* Top Row (Pins 1, 3, 5, 7, 9) */}
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

              {/* Bottom Row (Pins 2, 4, 6, 8, 10) */}
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
                <div className="text-slate-500 italic">
                  Hover or click any front panel pin to decode its signal and polarity.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Cable Inspector & Keying Explanation */}
      <div className="lg:col-span-4 space-y-4">
        {/* Cable List Picker */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {t.wiring.selectCable}
          </h3>

          <div className="space-y-2">
            {cableRoutes.map(cable => {
              const isSelected = cable.id === activeCable.id;
              return (
                <button
                  key={cable.id}
                  onClick={() => setSelectedCableId(cable.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500 shadow-md'
                      : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{cable.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {cable.pinCount}
                    </div>
                  </div>
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: cable.color }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Cable Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase font-mono text-cyan-400">HARNESS PROFILE</span>
            <h3 className="text-sm font-bold text-white mt-0.5">{activeCable.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 uppercase">{t.wiring.from}</span>
              <p className="font-semibold text-slate-200 mt-0.5">{activeCable.fromName}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase">{t.wiring.to}</span>
              <p className="font-semibold text-cyan-300 mt-0.5">{activeCable.toName}</p>
            </div>
          </div>

          {/* Keying Explanation Card */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <h4 className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              {t.wiring.keyingMechanism}
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {activeCable.keyingRule}
            </p>
          </div>

          {/* Critical Gotcha Alert */}
          <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl text-rose-200">
            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              Critical Wiring Trap
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {activeCable.gotcha}
            </p>
          </div>

          {/* Modular Cable Warning Alert */}
          <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl text-amber-200">
            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              Never Mix Modular PSU Cables!
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              PSU-side socket shapes are NOT standardized. Corsair cables on an EVGA or Seasonic PSU will invert 12V and ground, destroying motherboards and SSDs within milliseconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
