import React from 'react';
import type { PartId } from '../../types';
import { partsData } from '../../data/partsData';
import {
  Cpu,
  Fan,
  Layers,
  HardDrive,
  Tv,
  Server,
  Zap,
  Wind
} from 'lucide-react';

interface PartTrayProps {
  selectedPartId: PartId;
  onSelectPart: (id: PartId) => void;
}

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu,
  cooler: Fan,
  ram: Layers,
  ssd: HardDrive,
  gpu: Tv,
  motherboard: Server,
  psu: Zap,
  case_fans: Wind
};

export const PartTray: React.FC<PartTrayProps> = ({ selectedPartId, onSelectPart }) => {
  const partsList = Object.values(partsData);

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-2.5 shadow-xl">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {partsList.map(part => {
          const isSelected = part.id === selectedPartId;
          const Icon = iconMap[part.id] || Cpu;

          return (
            <button
              key={part.id}
              onClick={() => onSelectPart(part.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all shrink-0 border ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-slate-800/80'
              }`}
              style={{
                borderColor: isSelected ? part.color : undefined
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${part.color}20`,
                  color: part.color
                }}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="text-left">
                <div className="text-xs font-semibold leading-tight text-white">
                  {part.name.split(' (')[0]}
                </div>
                <div className="text-[10px] text-slate-400 font-mono capitalize">
                  {part.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
