import React, { useState } from 'react';
import type { PartId, MetaphorType, Language } from '../../types';
import { partsData } from '../../data/partsData';
import { getTranslation } from '../../i18n';
import { PartShapeCard } from './PartShapeCard';
import {
  Sparkles,
  AlertTriangle,
  Link,
  Info,
  MapPin,
  Maximize2,
  CheckCircle2,
  XCircle,
  Volume2
} from 'lucide-react';

interface PartInspectorProps {
  partId: PartId;
  metaphor: MetaphorType;
  lang: Language;
}

export const PartInspector: React.FC<PartInspectorProps> = ({ partId, metaphor, lang }) => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'analogy' | 'connections' | 'gotchas'>('anatomy');
  const t = getTranslation(lang);
  const part = partsData[partId] || partsData.cpu;
  const currentAnalogy = part.analogies[metaphor];

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col h-full overflow-y-auto">
      {/* Component Title & Subtitle */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: part.color }}
            />
            <h2 className="text-lg font-bold text-white tracking-tight m-0">
              {part.name}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{part.subtitle}</p>
        </div>

        <span
          className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: `${part.color}20`,
            color: part.color,
            border: `1px solid ${part.color}40`
          }}
        >
          {part.category}
        </span>
      </div>

      {/* 2.5D Part Shape Graphic */}
      <PartShapeCard part={part} />

      {/* Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4 text-xs">
        <button
          onClick={() => setActiveTab('anatomy')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
            activeTab === 'anatomy'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.inspector.tabs.anatomy}
        </button>
        <button
          onClick={() => setActiveTab('analogy')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
            activeTab === 'analogy'
              ? 'bg-amber-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.inspector.tabs.analogy}
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
            activeTab === 'connections'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.inspector.tabs.connections}
        </button>
        <button
          onClick={() => setActiveTab('gotchas')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
            activeTab === 'gotchas'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.inspector.tabs.gotchas}
        </button>
      </div>

      {/* Tab 1: Shape Anatomy & Fit */}
      {activeTab === 'anatomy' && (
        <div className="space-y-4 text-xs text-slate-300">
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              Physical Anatomy
            </h3>
            <p className="leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-slate-300">
              {part.shapeDescription}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {t.inspector.landmarksTitle}
            </h3>
            <ul className="space-y-1.5">
              {part.physicalLandmarks.map((landmark, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{landmark}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {t.inspector.motherboardLocationTitle}
            </h3>
            <p className="leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-slate-300">
              {part.motherboardPosition}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
              {t.inspector.socketSpecTitle}
            </h3>
            <p className="font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-cyan-300">
              {part.socketType}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: The "Make-Sense" Analogy */}
      {activeTab === 'analogy' && (
        <div className="space-y-4 text-xs">
          <div className="bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">
                {metaphor === 'kitchen' ? '🍳' : metaphor === 'office' ? '📋' : '🏭'}
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-400">
                  {metaphor.toUpperCase()} MODEL
                </span>
                <h3 className="text-sm font-bold text-white m-0">
                  {currentAnalogy.title}
                </h3>
              </div>
            </div>

            <div className="mt-2 py-1.5 px-2.5 rounded bg-amber-950/40 border border-amber-800/40 text-amber-200 text-xs font-medium">
              Role: {currentAnalogy.role}
            </div>

            <p className="text-slate-300 leading-relaxed mt-3 text-xs">
              {currentAnalogy.story}
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h4 className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5" />
              Data & Functional Flow
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {currentAnalogy.dataMovement}
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Connections & Latch Dynamics */}
      {activeTab === 'connections' && (
        <div className="space-y-3 text-xs">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
            <Link className="w-3.5 h-3.5 text-emerald-400" />
            {t.inspector.howItConnectsTitle}
          </h3>

          {part.connections.map((conn, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span>&rarr; {conn.target}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-700">
                  {conn.interfaceType}
                </span>
              </div>

              <div className="text-slate-400 text-[11px]">
                <strong className="text-slate-300">Mechanism:</strong> {conn.cableOrSlot}
              </div>

              <div className="flex items-start gap-1.5 bg-slate-900/80 p-2 rounded-lg text-emerald-300 border border-slate-800">
                <Volume2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  <strong className="text-white">Tactile:</strong> {conn.tactileFeedback}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Note: {conn.note}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Traps & Gotchas */}
      {activeTab === 'gotchas' && (
        <div className="space-y-3 text-xs">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            {t.inspector.gotchasNotice}
          </h3>

          {part.gotchas.map((gotcha, idx) => {
            const isCritical = gotcha.severity === 'critical';
            const isWarning = gotcha.severity === 'warning';

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  isCritical
                    ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                    : isWarning
                    ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
                    : 'bg-blue-950/30 border-blue-800/60 text-blue-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isCritical ? (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>{gotcha.title}</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">
                  {gotcha.explanation}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
