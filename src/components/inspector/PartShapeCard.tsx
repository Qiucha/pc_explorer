import React from 'react';
import type { ComponentPart } from '../../types';

interface PartShapeCardProps {
  part: ComponentPart;
}

export const PartShapeCard: React.FC<PartShapeCardProps> = ({ part }) => {
  const renderShapeGraphic = () => {
    switch (part.id) {
      case 'cpu':
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-xl">
            {/* Outer PCB package */}
            <rect x="25" y="25" width="150" height="150" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            {/* Alignment Notches */}
            <rect x="23" y="90" width="5" height="20" rx="2" fill="#0f172a" />
            <rect x="172" y="90" width="5" height="20" rx="2" fill="#0f172a" />
            {/* Golden Triangle Corner Indicator */}
            <polygon points="30,30 45,30 30,45" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="34" cy="34" r="2" fill="#0f172a" />
            {/* Integrated Heat Spreader (IHS) */}
            <rect x="42" y="42" width="116" height="116" rx="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
            <rect x="48" y="48" width="104" height="104" rx="6" fill="#475569" />
            {/* Laser Engraved Branding */}
            <text x="100" y="85" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              INTEL / AMD
            </text>
            <text x="100" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="monospace">
              3.8 - 5.7 GHz
            </text>
            <text x="100" y="125" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              LGA1700 / AM5
            </text>
          </svg>
        );

      case 'ram':
        return (
          <svg viewBox="0 0 260 120" className="w-64 h-32 drop-shadow-xl">
            {/* Heat Spreader PCB */}
            <path
              d="M 15 30 L 245 30 L 245 80 L 15 80 Z"
              fill="#10b981"
              stroke="#059669"
              strokeWidth="2"
            />
            {/* Top Heat Fins / RGB light bar */}
            <rect x="20" y="22" width="220" height="8" rx="2" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
            {/* End Locking Notches */}
            <rect x="10" y="38" width="5" height="16" rx="2" fill="#0f172a" />
            <rect x="245" y="38" width="5" height="16" rx="2" fill="#0f172a" />
            {/* Bottom Gold Fingers */}
            <rect x="20" y="80" width="220" height="12" fill="#ca8a04" />
            {/* Asymmetrical Key Notch (Offset from center) */}
            <rect x="120" y="78" width="10" height="16" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="125" y="112" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle">
              Offset Notch (pin 144)
            </text>
            {/* DDR5 Branding */}
            <text x="75" y="60" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
              DDR5 32GB 6000MT/s
            </text>
          </svg>
        );

      case 'ssd':
        return (
          <svg viewBox="0 0 240 100" className="w-60 h-28 drop-shadow-xl">
            {/* M.2 2280 PCB Stick */}
            <rect x="20" y="25" width="200" height="50" rx="3" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
            {/* M-Key Edge Connector */}
            <rect x="18" y="32" width="10" height="36" fill="#ca8a04" />
            {/* M-Key Notch */}
            <rect x="16" y="44" width="8" height="6" fill="#0f172a" />
            {/* Semicircular Screw Standoff Notch on rear */}
            <circle cx="220" cy="50" r="7" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
            {/* Flash NAND Chips */}
            <rect x="50" y="33" width="35" height="34" rx="2" fill="#090d16" stroke="#475569" strokeWidth="1" />
            <rect x="95" y="33" width="35" height="34" rx="2" fill="#090d16" stroke="#475569" strokeWidth="1" />
            {/* Controller Chip */}
            <rect x="145" y="36" width="28" height="28" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
            <text x="115" y="88" fill="#eab308" fontSize="9" fontWeight="bold" textAnchor="middle">
              M.2 2280 NVMe SSD (PCIe 4.0/5.0)
            </text>
          </svg>
        );

      case 'gpu':
        return (
          <svg viewBox="0 0 260 140" className="w-64 h-36 drop-shadow-xl">
            {/* Card Shroud */}
            <rect x="20" y="20" width="220" height="90" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="2" />
            {/* 3 Cooling Fans */}
            <circle cx="65" cy="65" r="24" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="130" cy="65" r="24" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="195" cy="65" r="24" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
            {/* Rear Metal Bracket (Left) */}
            <rect x="12" y="10" width="8" height="110" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
            {/* Bottom PCIe x16 Connector */}
            <rect x="40" y="110" width="130" height="12" fill="#ca8a04" />
            <rect x="75" y="110" width="6" height="12" fill="#18181b" />
            <rect x="172" y="112" width="10" height="10" rx="2" fill="#a855f7" />
            <text x="130" y="132" fill="#c084fc" fontSize="8" fontWeight="bold" textAnchor="middle">
              PCIe x16 Gold Fingers & Rear Latch Notch
            </text>
            {/* Top Power Socket */}
            <rect x="180" y="16" width="30" height="8" rx="2" fill="#facc15" />
          </svg>
        );

      case 'cooler':
        return (
          <svg viewBox="0 0 200 180" className="w-48 h-44 drop-shadow-xl">
            {/* Heatsink fin stack */}
            <rect x="40" y="20" width="120" height="100" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            {/* Copper heatpipes */}
            <line x1="60" y1="20" x2="60" y2="140" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <line x1="85" y1="20" x2="85" y2="140" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <line x1="115" y1="20" x2="115" y2="140" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <line x1="140" y1="20" x2="140" y2="140" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            {/* Baseplate */}
            <rect x="50" y="140" width="100" height="18" rx="2" fill="#ca8a04" stroke="#eab308" strokeWidth="2" />
            {/* PEEL ME STICKER WARNING */}
            <rect x="60" y="144" width="80" height="10" rx="1" fill="#ef4444" />
            <text x="100" y="152" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
              PEEL FILM BEFORE USE!
            </text>
            {/* 4-Pin Fan Wire */}
            <path d="M 160,70 Q 180,100 170,160" stroke="#38bdf8" strokeWidth="3" fill="none" />
          </svg>
        );

      case 'psu':
        return (
          <svg viewBox="0 0 220 160" className="w-56 h-40 drop-shadow-xl">
            {/* Steel chassis */}
            <rect x="20" y="20" width="180" height="120" rx="6" fill="#0f172a" stroke="#facc15" strokeWidth="2" />
            {/* 120mm Intake Fan Grill */}
            <circle cx="90" cy="80" r="42" fill="#090d16" stroke="#334155" strokeWidth="2" />
            <circle cx="90" cy="80" r="14" fill="#1e293b" />
            {/* Modular Sockets on Right */}
            <rect x="155" y="35" width="35" height="18" rx="2" fill="#1e293b" stroke="#facc15" strokeWidth="1" />
            <rect x="155" y="60" width="35" height="18" rx="2" fill="#1e293b" stroke="#f97316" strokeWidth="1" />
            <rect x="155" y="85" width="35" height="18" rx="2" fill="#1e293b" stroke="#a855f7" strokeWidth="1" />
            <rect x="155" y="110" width="35" height="18" rx="2" fill="#1e293b" stroke="#06b6d4" strokeWidth="1" />
            {/* 80 Plus Badge */}
            <rect x="30" y="110" width="32" height="18" rx="2" fill="#eab308" />
            <text x="46" y="122" fill="#000000" fontSize="7" fontWeight="bold" textAnchor="middle">
              80+ GOLD
            </text>
          </svg>
        );

      case 'motherboard':
        return (
          <svg viewBox="0 0 180 200" className="w-44 h-48 drop-shadow-xl">
            <rect x="20" y="20" width="140" height="160" rx="6" fill="#090d16" stroke="#06b6d4" strokeWidth="2" />
            <rect x="50" y="45" width="45" height="45" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <line x1="105" y1="40" x2="105" y2="90" stroke="#10b981" strokeWidth="4" />
            <line x1="115" y1="40" x2="115" y2="90" stroke="#10b981" strokeWidth="4" />
            <rect x="40" y="110" width="85" height="12" rx="2" fill="#a855f7" />
            <circle cx="115" cy="140" r="16" fill="#334155" />
            <text x="90" y="170" fill="#06b6d4" fontSize="9" fontWeight="bold" textAnchor="middle">
              ATX MOTHERBOARD
            </text>
          </svg>
        );

      case 'case_fans':
      default:
        return (
          <svg viewBox="0 0 180 180" className="w-44 h-44 drop-shadow-xl">
            <rect x="20" y="20" width="140" height="140" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
            <circle cx="90" cy="90" r="55" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
            <circle cx="90" cy="90" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            {/* Airflow Arrow Indicator */}
            <path d="M 145 70 L 155 70 L 150 60 Z" fill="#38bdf8" />
            <text x="90" y="150" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">
              120mm PWM Fan (Airflow &rarr;)
            </text>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-4 shadow-inner">
      {renderShapeGraphic()}
      <p className="text-xs text-slate-400 mt-2 text-center font-mono leading-tight">
        {part.dimensionsStandard}
      </p>
    </div>
  );
};
