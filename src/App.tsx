import React, { useState } from 'react';
import type { PartId, MetaphorType, AppMode, Language } from './types';
import { getUI } from './content';
import { Navbar } from './components/header/Navbar';
import { MotherboardCanvas } from './components/board/MotherboardCanvas';
import { PartInspector } from './components/inspector/PartInspector';
import { PartTray } from './components/common/PartTray';
import { WiringLab } from './components/wiring/WiringLab';
import { AssemblySimulator } from './components/assembly/AssemblySimulator';
import { useWindowDimensions } from './hooks/useWindowDimensions';

export const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('anatomy');
  const [selectedPartId, setSelectedPartId] = useState<PartId>('cpu');
  const [metaphor, setMetaphor] = useState<MetaphorType>('kitchen');
  const [lang, setLang] = useState<Language>('en');
  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [isPopulated, setIsPopulated] = useState<boolean>(false);

  const {
    canvasHeight,
    dynamicRatioStr,
    ratioLabel,
    inspectorHeight,
    isPortrait,
    isUltraWide
  } = useWindowDimensions();

  const t = getUI(lang);

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
      <main className="flex-1 w-full max-w-[1920px] 2xl:max-w-[2400px] mx-auto px-3 sm:px-5 lg:px-6 py-3.5 md:py-4 space-y-4 md:space-y-5">
        {mode === 'anatomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
            {/* Interactive Vector Motherboard & Component Tray */}
            <div className={`${isUltraWide ? 'lg:col-span-7 xl:col-span-7 2xl:col-span-8' : 'lg:col-span-7'} flex flex-col gap-3.5`}>
              <MotherboardCanvas
                selectedPartId={selectedPartId}
                onSelectPart={setSelectedPartId}
                activeLayer={activeLayer}
                setActiveLayer={setActiveLayer}
                isPopulated={isPopulated}
                setIsPopulated={setIsPopulated}
                lang={lang}
                canvasHeight={canvasHeight}
                canvasAspectRatio={dynamicRatioStr}
                ratioLabel={ratioLabel}
              />
              <PartTray
                selectedPartId={selectedPartId}
                onSelectPart={setSelectedPartId}
                lang={lang}
              />
            </div>

            {/* Part Inspector & Analogy Drawer */}
            <div
              className={`${isUltraWide ? 'lg:col-span-5 xl:col-span-5 2xl:col-span-4' : 'lg:col-span-5'} flex flex-col`}
              style={{
                minHeight: isPortrait ? '520px' : undefined,
                height: isPortrait ? undefined : `${inspectorHeight}px`
              }}
            >
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
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-3 px-3 sm:px-5 lg:px-6 text-center text-xs text-slate-500">
        <div className="w-full max-w-[1920px] 2xl:max-w-[2400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t.footerTitle}</span>
          <span className="font-mono text-slate-600 text-[11px]">
            {t.footerSubtitle}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
