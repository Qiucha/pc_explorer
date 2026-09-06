import React from 'react';
import type { AppMode, MetaphorType, Language } from '../../types';
import { getUI } from '../../content';
import { Cpu, Zap, Hammer, Layers, Globe, ChefHat, FileText, Factory } from 'lucide-react';

interface NavbarProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  metaphor: MetaphorType;
  setMetaphor: (m: MetaphorType) => void;
  lang: Language;
  setLang: (l: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  metaphor,
  setMetaphor,
  lang,
  setLang
}) => {
  const t = getUI(lang);

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight leading-none m-0">
                {t.appTitle}
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                Interactive v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Mode Navigation Tabs (Martini-Glass Structure) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setMode('anatomy')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
              mode === 'anatomy'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.modes.anatomy}</span>
          </button>

          <button
            onClick={() => setMode('wiring')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
              mode === 'wiring'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{t.modes.wiring}</span>
          </button>

          <button
            onClick={() => setMode('assembly')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
              mode === 'assembly'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Hammer className="w-4 h-4" />
            <span>{t.modes.assembly}</span>
          </button>
        </div>

        {/* Metaphor Switcher & Language Controls */}
        <div className="flex items-center gap-3">
          {/* Metaphor Switcher */}
          <div className="flex items-center bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-500 mr-2 hidden sm:inline">{t.metaphors.label}:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setMetaphor('kitchen')}
                className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                  metaphor === 'kitchen'
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Commercial Kitchen Metaphor"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.metaphors.kitchen}</span>
              </button>

              <button
                onClick={() => setMetaphor('office')}
                className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                  metaphor === 'office'
                    ? 'bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Detective Office & Whiteboard Metaphor"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.metaphors.office}</span>
              </button>

              <button
                onClick={() => setMetaphor('factory')}
                className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                  metaphor === 'factory'
                    ? 'bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Automated Factory Metaphor"
              >
                <Factory className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.metaphors.factory}</span>
              </button>
            </div>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="Toggle Language / 切換語言"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? '繁體中文' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
