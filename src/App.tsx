import React, { useState } from 'react';
import type { PartId, MetaphorType, AppMode, Language } from './types';
import { Navbar } from './components/header/Navbar';
import { MotherboardCanvas } from './components/board/MotherboardCanvas';
import { PartInspector } from './components/inspector/PartInspector';
import { PartTray } from './components/common/PartTray';
import { WiringLab } from './components/wiring/WiringLab';
import { AssemblySimulator } from './components/assembly/AssemblySimulator';

export const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('anatomy');
  const [selectedPartId, setSelectedPartId] = useState<PartId>('cpu');
  const [metaphor, setMetaphor] = useState<MetaphorType>('kitchen');
  const [lang, setLang] = useState<Language>('en');
  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [isPopulated, setIsPopulated] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        mode={mode}
        setMode={setMode}
        metaphor={metaphor}
        setMetaphor={setMetaphor}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {mode === 'anatomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Interactive Vector Motherboard & Component Tray */}
            <div className="lg:col-span-7 space-y-4">
              <MotherboardCanvas
                selectedPartId={selectedPartId}
                onSelectPart={setSelectedPartId}
                activeLayer={activeLayer}
                setActiveLayer={setActiveLayer}
                isPopulated={isPopulated}
                setIsPopulated={setIsPopulated}
              />
              <PartTray
                selectedPartId={selectedPartId}
                onSelectPart={setSelectedPartId}
              />
            </div>

            {/* Part Inspector & Analogy Drawer */}
            <div className="lg:col-span-5 h-[620px] lg:h-[830px]">
              <PartInspector
                partId={selectedPartId}
                metaphor={metaphor}
                lang={lang}
              />
            </div>
          </div>
        )}

        {mode === 'wiring' && (
          <WiringLab lang={lang} />
        )}

        {mode === 'assembly' && (
          <AssemblySimulator lang={lang} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PC Explorer &bull; Interactive Hardware Architecture &amp; Blueprint</span>
          <span className="font-mono text-slate-600 text-[11px]">
            Engineered with React 19 &bull; High-Precision 2.5D SVG Canvas &bull; Zero 3D Bloat
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
