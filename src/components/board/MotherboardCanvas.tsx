import React, { useState, useRef } from 'react';
import type { PartId, SocketZone } from '../../types';
import { MOTHERBOARD_WIDTH, MOTHERBOARD_HEIGHT, motherboardZones } from '../../data/motherboardData';
import { partsData } from '../../data/partsData';
import { ZoomIn, ZoomOut, RotateCcw, Eye, Layers } from 'lucide-react';

interface MotherboardCanvasProps {
  selectedPartId: PartId;
  onSelectPart: (partId: PartId) => void;
  activeLayer: string;
  setActiveLayer: (layer: string) => void;
  isPopulated: boolean;
  setIsPopulated: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const MotherboardCanvas: React.FC<MotherboardCanvasProps> = ({
  selectedPartId,
  onSelectPart,
  activeLayer,
  setActiveLayer,
  isPopulated,
  setIsPopulated
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredZone, setHoveredZone] = useState<SocketZone | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if left click on canvas background
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Filter socket zones based on active layer
  const filteredZones = motherboardZones.filter(zone => {
    if (activeLayer === 'all') return true;
    if (activeLayer === 'power' && zone.layer === 'power') return true;
    if (activeLayer === 'data' && (zone.layer === 'processing' || zone.layer === 'memory' || zone.layer === 'expansion' || zone.layer === 'storage')) return true;
    if (activeLayer === 'cooling' && zone.layer === 'cooling') return true;
    if (activeLayer === 'io' && zone.layer === 'io') return true;
    return false;
  });

  return (
    <div className="relative w-full h-[620px] lg:h-[750px] bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden select-none shadow-2xl flex flex-col">
      {/* Canvas Header Controls */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Layer Filters */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/70 shadow-lg pointer-events-auto">
          <Layers className="w-4 h-4 text-cyan-400 ml-1.5 mr-1" />
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              activeLayer === 'all'
                ? 'bg-cyan-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveLayer('power')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              activeLayer === 'power'
                ? 'bg-amber-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Power
          </button>
          <button
            onClick={() => setActiveLayer('data')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              activeLayer === 'data'
                ? 'bg-emerald-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔗 Data/PCIe
          </button>
          <button
            onClick={() => setActiveLayer('cooling')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              activeLayer === 'cooling'
                ? 'bg-sky-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ❄️ Cooling
          </button>
          <button
            onClick={() => setActiveLayer('io')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              activeLayer === 'io'
                ? 'bg-purple-600 text-white font-medium shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔌 I/O
          </button>
        </div>

        {/* View Controls & X-Ray Toggle */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsPopulated(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-lg transition-all ${
              isPopulated
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-500/20'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Toggle between bare motherboard and fully populated components"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPopulated ? 'Armored (X-Ray On)' : 'Bare PCB'}</span>
          </button>

          <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 shadow-lg text-slate-300">
            <button
              onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-slate-400">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1 border-l border-slate-800"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex-1 w-full h-full flex items-center justify-center cursor-${
          isDragging ? 'grabbing' : 'grab'
        } overflow-hidden`}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="relative transition-transform"
        >
          <svg
            width={MOTHERBOARD_WIDTH}
            height={MOTHERBOARD_HEIGHT}
            viewBox={`0 0 ${MOTHERBOARD_WIDTH} ${MOTHERBOARD_HEIGHT}`}
            className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <defs>
              {/* Motherboard PCB Pattern */}
              <pattern id="circuitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <circle cx="20" cy="20" r="1" fill="#334155" opacity="0.6" />
              </pattern>

              {/* VRM Fin Texture */}
              <pattern id="vrmFins" width="8" height="8" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="8" y2="0" stroke="#334155" strokeWidth="2" />
                <line x1="0" y1="4" x2="8" y2="4" stroke="#0f172a" strokeWidth="2" />
              </pattern>

              {/* Socket Pin Grid */}
              <pattern id="pinGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.75" fill="#eab308" opacity="0.7" />
              </pattern>

              {/* Glowing gradients */}
              <linearGradient id="pcbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#090d16" />
                <stop offset="50%" stopColor="#0d131f" />
                <stop offset="100%" stopColor="#080c14" />
              </linearGradient>

              <linearGradient id="metalShield" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="ramGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>

            {/* 1. ATX MOTHERBOARD BASE PCB */}
            <rect
              x="20"
              y="20"
              width={MOTHERBOARD_WIDTH - 40}
              height={MOTHERBOARD_HEIGHT - 40}
              rx="16"
              fill="url(#pcbGradient)"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <rect
              x="20"
              y="20"
              width={MOTHERBOARD_WIDTH - 40}
              height={MOTHERBOARD_HEIGHT - 40}
              rx="16"
              fill="url(#circuitGrid)"
            />

            {/* ATX Mounting Standoff Screw Holes (Standard 9 points) */}
            {[
              { x: 45, y: 45 },
              { x: 350, y: 45 },
              { x: 655, y: 45 },
              { x: 45, y: 430 },
              { x: 350, y: 430 },
              { x: 655, y: 430 },
              { x: 45, y: 815 },
              { x: 350, y: 815 },
              { x: 655, y: 815 }
            ].map((screw, idx) => (
              <g key={`screw-${idx}`}>
                <circle cx={screw.x} cy={screw.y} r="8" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" />
                <circle cx={screw.x} cy={screw.y} r="4" fill="#090d16" />
                <line x1={screw.x - 3} y1={screw.x - 3} x2={screw.x + 3} y2={screw.x + 3} stroke="#64748b" strokeWidth="1" />
              </g>
            ))}

            {/* Copper Bus Traces radiating between CPU, RAM and PCIe */}
            <g opacity="0.35" stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeDasharray="4 2">
              <path d="M 380,200 L 430,200" />
              <path d="M 380,220 L 430,220" />
              <path d="M 380,240 L 430,240" />
              <path d="M 380,260 L 430,260" />
              <path d="M 305,310 L 305,345" />
              <path d="M 305,400 L 305,430" />
              <path d="M 270,310 L 270,430" />
              <path d="M 340,310 L 340,430" />
            </g>

            {/* 2. REAR I/O BLOCK */}
            <rect x="35" y="70" width="70" height="340" rx="4" fill="url(#metalShield)" stroke="#64748b" strokeWidth="2" />
            <text x="70" y="240" fill="#cbd5e1" fontSize="11" fontFamily="monospace" transform="rotate(-90 70 240)" textAnchor="middle">
              REAR I/O SHIELD (USB / 2.5G LAN / AUDIO / DP)
            </text>

            {/* 3. VRM POWER DELIVERY HEATSINKS */}
            {/* Top VRM */}
            <rect x="210" y="70" width="200" height="60" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <rect x="215" y="75" width="190" height="50" rx="2" fill="url(#vrmFins)" />
            {/* Left VRM */}
            <rect x="120" y="90" width="90" height="235" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <rect x="125" y="95" width="80" height="225" rx="2" fill="url(#vrmFins)" />
            {/* Chokes & Capacitors */}
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <g key={`choke-${i}`}>
                <rect x="110" y={115 + i * 28} width="14" height="14" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <circle cx="100" cy={122 + i * 28} r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
              </g>
            ))}

            {/* 4. EPS 8-PIN CPU POWER */}
            <rect x="125" y="35" width="75" height="40" rx="3" fill="#090d16" stroke="#f97316" strokeWidth="1.5" />
            <text x="162" y="60" fill="#f97316" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              CPU 8-PIN
            </text>

            {/* 5. CPU SOCKET (LGA1700 / AM5) */}
            <rect x="220" y="140" width="170" height="180" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <rect x="235" y="155" width="140" height="150" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <rect x="245" y="165" width="120" height="130" fill="url(#pinGrid)" />
            {/* Golden Triangle Corner Indicator */}
            <polygon points="236,156 250,156 236,170" fill="#facc15" />
            {/* Socket Lever Arm */}
            <line x1="395" y1="145" x2="395" y2="310" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="395" cy="145" r="5" fill="#cbd5e1" />

            {/* 6. RAM SLOTS (DIMM A1, A2, B1, B2) */}
            {[
              { id: 'ram_slot_1', name: 'A1', x: 430, rec: false },
              { id: 'ram_slot_2', name: 'A2 ★', x: 465, rec: true },
              { id: 'ram_slot_3', name: 'B1', x: 500, rec: false },
              { id: 'ram_slot_4', name: 'B2 ★', x: 535, rec: true }
            ].map(slot => (
              <g key={slot.id}>
                {/* Slot body */}
                <rect
                  x={slot.x}
                  y="110"
                  width="22"
                  height="240"
                  rx="3"
                  fill="#090d16"
                  stroke={slot.rec ? '#10b981' : '#334155'}
                  strokeWidth={slot.rec ? '2' : '1'}
                />
                {/* Gold connector channel */}
                <line x1={slot.x + 11} y1="130" x2={slot.x + 11} y2="330" stroke="url(#ramGold)" strokeWidth="3" />
                {/* Offset Key Notch */}
                <rect x={slot.x + 8} y="225" width="6" height="12" fill="#090d16" stroke="#64748b" strokeWidth="1" />
                {/* End Latches */}
                <rect x={slot.x + 4} y="112" width="14" height="14" rx="2" fill="#475569" />
                <rect x={slot.x + 4} y="334" width="14" height="14" rx="2" fill="#475569" />
                <text x={slot.x + 11} y="365" fill={slot.rec ? '#10b981' : '#94a3b8'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  {slot.name}
                </text>
              </g>
            ))}

            {/* 7. PRIMARY M.2 NVMe SLOT 1 */}
            <rect x="200" y="340" width="210" height="60" rx="4" fill="url(#metalShield)" stroke="#64748b" strokeWidth="1.5" />
            <text x="305" y="375" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
              PRIMARY M.2 NVMe (PCIe 5.0 x4)
            </text>
            <circle cx="395" cy="370" r="5" fill="#334155" stroke="#facc15" strokeWidth="1.5" />

            {/* 8. PRIMARY PCIe 5.0 x16 SLOT (GPU) */}
            <g>
              <rect x="160" y="425" width="340" height="55" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
              {/* Metal Shielded Armor */}
              <rect x="170" y="435" width="300" height="35" rx="2" fill="#334155" stroke="#64748b" strokeWidth="1" />
              <line x1="180" y1="452" x2="460" y2="452" stroke="url(#ramGold)" strokeWidth="3" />
              {/* PCIe Retention Latch */}
              <rect x="475" y="432" width="18" height="40" rx="3" fill="#a855f7" stroke="#e9d5ff" strokeWidth="1.5" />
              <text x="320" y="456" fill="#f3e8ff" fontSize="11" fontWeight="bold" textAnchor="middle">
                PCIe 5.0 x16 (DIRECT CPU BUS)
              </text>
            </g>

            {/* 9. SECONDARY M.2 NVMe SLOT 2 */}
            <rect x="200" y="505" width="210" height="60" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <text x="305" y="540" fill="#94a3b8" fontSize="10" textAnchor="middle">
              SECONDARY M.2 (CHIPSET PCIe 4.0)
            </text>

            {/* 10. SECONDARY PCIe x16 (x4 Mode) */}
            <rect x="160" y="585" width="340" height="45" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <text x="330" y="612" fill="#64748b" fontSize="10" textAnchor="middle">
              PCIe x16 Slot (x4 Electrical Mode)
            </text>

            {/* 11. PCH CHIPSET HEATSINK */}
            <rect x="430" y="515" width="145" height="155" rx="8" fill="url(#metalShield)" stroke="#475569" strokeWidth="2" />
            <rect x="440" y="525" width="125" height="135" rx="4" fill="#1e293b" />
            <text x="502" y="595" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
              CHIPSET (PCH)
            </text>
            <text x="502" y="615" fill="#64748b" fontSize="9" textAnchor="middle">
              B650 / Z790 HUB
            </text>

            {/* 12. 24-PIN ATX MAIN POWER */}
            <g>
              <rect x="595" y="215" width="65" height="170" rx="4" fill="#090d16" stroke="#facc15" strokeWidth="2" />
              {/* 24 individual pin cutouts */}
              {Array.from({ length: 12 }).map((_, r) => (
                <g key={`pin-row-${r}`}>
                  <rect x="607" y={225 + r * 13} width="8" height="8" rx={r % 2 === 0 ? 0 : 3} fill="#facc15" />
                  <rect x="635" y={225 + r * 13} width="8" height="8" rx={r % 2 === 1 ? 0 : 3} fill="#facc15" />
                </g>
              ))}
              {/* Latch tooth */}
              <rect x="660" y="280" width="8" height="40" rx="2" fill="#eab308" />
            </g>

            {/* 13. SATA 6Gb/s PORTS */}
            <g>
              <rect x="595" y="465" width="65" height="110" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              <rect x="605" y="475" width="45" height="40" rx="2" fill="#1e293b" stroke="#eab308" strokeWidth="1" />
              <rect x="605" y="525" width="45" height="40" rx="2" fill="#1e293b" stroke="#eab308" strokeWidth="1" />
              <text x="627" y="588" fill="#94a3b8" fontSize="8" textAnchor="middle">SATA 6G</text>
            </g>

            {/* 14. FRONT PANEL HEADER (JFP1) */}
            <g>
              <rect x="540" y="770" width="115" height="50" rx="3" fill="#090d16" stroke="#06b6d4" strokeWidth="2" />
              {/* 9 pins in 2 rows */}
              {[0, 1, 2, 3, 4].map(col => (
                <circle key={`fp-top-${col}`} cx={555 + col * 20} cy={785} r="3" fill={col === 4 ? '#334155' : '#06b6d4'} />
              ))}
              {[0, 1, 2, 3].map(col => (
                <circle key={`fp-bot-${col}`} cx={555 + col * 20} cy={805} r="3" fill="#06b6d4" />
              ))}
              <text x="597" y="835" fill="#06b6d4" fontSize="9" fontWeight="bold" textAnchor="middle">
                FRONT PANEL (JFP1)
              </text>
            </g>

            {/* 15. AUDIO CODEC SECTION */}
            <rect x="45" y="640" width="80" height="130" rx="4" fill="#090d16" stroke="#334155" strokeWidth="1" />
            {[0, 1, 2, 3].map(i => (
              <circle key={`audio-cap-${i}`} cx="85" cy={665 + i * 25} r="9" fill="#eab308" stroke="#713f12" strokeWidth="1.5" />
            ))}
            <text x="85" y="785" fill="#64748b" fontSize="8" textAnchor="middle">HD AUDIO</text>

            {/* POPULATED / X-RAY COMPONENT OVERLAYS (When isPopulated = true) */}
            {isPopulated && (
              <g className="transition-opacity duration-300">
                {/* Seated CPU with IHS */}
                <rect x="230" y="150" width="150" height="160" rx="4" fill="url(#metalShield)" stroke="#94a3b8" strokeWidth="2" opacity="0.95" />
                <text x="305" y="235" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                  CORE i7 / RYZEN 7
                </text>
                <text x="305" y="255" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  LGA1700 / AM5 IHS
                </text>

                {/* Seated RAM Sticks in Slots 2 & 4 */}
                <rect x="463" y="115" width="26" height="230" rx="3" fill="#10b981" stroke="#34d399" strokeWidth="2" opacity="0.9" />
                <rect x="473" y="125" width="6" height="210" fill="#ecfdf5" />
                <rect x="533" y="115" width="26" height="230" rx="3" fill="#10b981" stroke="#34d399" strokeWidth="2" opacity="0.9" />
                <rect x="543" y="125" width="6" height="210" fill="#ecfdf5" />

                {/* Seated M.2 SSD */}
                <rect x="205" y="345" width="200" height="50" rx="3" fill="#1e293b" stroke="#eab308" strokeWidth="2" opacity="0.9" />
                <text x="305" y="375" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle">
                  2TB NVMe PCIe 5.0 SSD
                </text>

                {/* Massive Seated GPU Card */}
                <g opacity="0.92">
                  <rect x="140" y="415" width="420" height="150" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="3" />
                  {/* Triple Fan Cutouts */}
                  <circle cx="210" cy="490" r="35" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <circle cx="310" cy="490" r="35" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <circle cx="410" cy="490" r="35" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <text x="310" y="495" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                    GEFORCE RTX / RADEON RX
                  </text>
                  <text x="310" y="515" fill="#a1a1aa" fontSize="9" textAnchor="middle">
                    Triple-Fan 320W Graphics Card
                  </text>
                </g>
              </g>
            )}

            {/* REACTIVE HOTSPOT ZONES */}
            {filteredZones.map(zone => {
              const isSelected = zone.partId === selectedPartId;
              const isHovered = hoveredZone?.id === zone.id;
              const partColor = partsData[zone.partId]?.color || '#38bdf8';

              return (
                <g
                  key={zone.id}
                  onClick={() => onSelectPart(zone.partId)}
                  onMouseEnter={() => setHoveredZone(zone)}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Interactive glowing bounding rectangle */}
                  <rect
                    x={zone.x - 4}
                    y={zone.y - 4}
                    width={zone.width + 8}
                    height={zone.height + 8}
                    rx="8"
                    fill={isSelected ? `${partColor}25` : isHovered ? `${partColor}15` : 'transparent'}
                    stroke={isSelected ? partColor : isHovered ? partColor : 'transparent'}
                    strokeWidth={isSelected ? '3' : isHovered ? '2' : '0'}
                    strokeDasharray={isSelected ? 'none' : isHovered ? '6 3' : 'none'}
                    className={isSelected ? 'animate-pulse' : ''}
                  />

                  {/* Highlight Pin/Badge when selected */}
                  {isSelected && (
                    <g>
                      <circle cx={zone.x + zone.width / 2} cy={zone.y + zone.height / 2} r="18" fill={partColor} opacity="0.25" className="animate-ping" />
                      <circle cx={zone.x + zone.width / 2} cy={zone.y + zone.height / 2} r="6" fill={partColor} />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Canvas Footer Status Ticker */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {hoveredZone ? (
            <span className="text-slate-200 font-mono">
              Hovering: <strong className="text-cyan-400">{hoveredZone.name}</strong> ({hoveredZone.sublabel})
            </span>
          ) : (
            <span className="truncate">
              Click any socket, RAM channel, PCIe slot, or power header to inspect.
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500 font-mono">
          <span>Standard ATX 305x244mm</span>
          <span>•</span>
          <span>PCIe 5.0 Ready</span>
        </div>
      </div>
    </div>
  );
};
