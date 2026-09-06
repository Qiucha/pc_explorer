import React, { useState } from 'react';
import { assemblySteps, diagnosticCases } from '../../data/assemblyData';
import type { DiagnosticCase } from '../../data/assemblyData';
import { partsData } from '../../data/partsData';
import type { Language } from '../../types';
import { getTranslation } from '../../i18n';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Volume2,
  ShieldCheck,
  Stethoscope,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AssemblySimulatorProps {
  lang: Language;
}

export const AssemblySimulator: React.FC<AssemblySimulatorProps> = ({ lang }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSeating, setIsSeating] = useState(false);
  const [selectedDiag, setSelectedDiag] = useState<DiagnosticCase | null>(null);

  const t = getTranslation(lang);
  const currentStep = assemblySteps[currentStepIndex];
  const part = partsData[currentStep.partId];
  const isCurrentCompleted = completedSteps.includes(currentStep.step);
  const isAllCompleted = completedSteps.length === assemblySteps.length;

  const handleSeatComponent = () => {
    setIsSeating(true);
    setTimeout(() => {
      setIsSeating(false);
      if (!completedSteps.includes(currentStep.step)) {
        const nextCompleted = [...completedSteps, currentStep.step];
        setCompletedSteps(nextCompleted);

        // If last step completed, trigger celebratory confetti!
        if (nextCompleted.length === assemblySteps.length) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
      }
    }, 600);
  };

  const handleNext = () => {
    if (currentStepIndex < assemblySteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCompletedSteps([]);
    setCurrentStepIndex(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: 7-Step Interactive Build Workflow */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          {/* Header & Step Tracker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-base font-bold text-white tracking-tight m-0">
                  {t.assembly.title}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.assembly.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-800">
                {t.assembly.stepOf
                  .replace('{current}', String(currentStepIndex + 1))
                  .replace('{total}', String(assemblySteps.length))}
              </span>

              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title={t.assembly.resetBuild}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Step Progress Pills */}
          <div className="grid grid-cols-7 gap-1.5 mb-6">
            {assemblySteps.map((s, idx) => {
              const isDone = completedSteps.includes(s.step);
              const isCurrent = idx === currentStepIndex;

              return (
                <button
                  key={s.step}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`py-2 px-1 rounded-xl text-center transition-all border ${
                    isCurrent
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30'
                      : isDone
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60'
                      : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold">STEP {s.step}</div>
                  <div className="text-[9px] truncate mt-0.5">
                    {partsData[s.partId]?.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Card */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${part.color}20`,
                    color: part.color,
                    border: `1px solid ${part.color}40`
                  }}
                >
                  {part.name}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">
                  {currentStep.title}
                </h3>
              </div>

              {isCurrentCompleted && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 rounded-xl text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.assembly.installedSuccess}</span>
                </div>
              )}
            </div>

            <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
              {currentStep.instruction}
            </p>

            {/* Checklist */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.assembly.checklistHeader}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentStep.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Disaster Trap */}
            <div className="bg-rose-950/30 border border-rose-800/60 p-3 rounded-xl text-xs text-rose-200">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-rose-400">
                <AlertOctagon className="w-4 h-4 shrink-0" />
                <span>{t.assembly.dangerMistake}: {currentStep.commonMistake.title}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {currentStep.commonMistake.consequence}
              </p>
            </div>

            {/* Interactive Tactile Seat Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Audio Cue: <strong>{currentStep.audioFeedback}</strong></span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSeatComponent}
                  disabled={isSeating || isCurrentCompleted}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isCurrentCompleted
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                      : isSeating
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isCurrentCompleted
                      ? t.assembly.installedSuccess
                      : isSeating
                      ? 'Seating & Latching...'
                      : t.assembly.installButton}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.assembly.previousStep}</span>
            </button>

            {isAllCompleted && (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs animate-bounce">
                <Sparkles className="w-4 h-4" />
                <span>{t.assembly.completedTitle}</span>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={currentStepIndex === assemblySteps.length - 1}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>{t.assembly.nextStep}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Virtual Hardware Diagnostic Lab */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white m-0">
                {t.assembly.diagnosticsTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.assembly.diagnosticsSubtitle}
            </p>
          </div>

          <div className="space-y-2.5">
            {diagnosticCases.map(dCase => {
              const isSelected = selectedDiag?.id === dCase.id;

              return (
                <div
                  key={dCase.id}
                  className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setSelectedDiag(isSelected ? null : dCase)}
                    className="w-full text-left p-3 flex items-start justify-between gap-2 hover:bg-slate-900 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            dCase.severity === 'fatal'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : dCase.severity === 'no-boot'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-blue-950 text-blue-300 border border-blue-800'
                          }`}
                        >
                          {dCase.component}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 mt-1.5 leading-snug">
                        {dCase.symptom}
                      </p>
                    </div>

                    <div className="text-slate-500 mt-1">
                      {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isSelected && (
                    <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                          {t.assembly.causeLabel}:
                        </span>
                        <p className="text-slate-300 mt-0.5">{dCase.cause}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                          {t.assembly.solutionLabel}:
                        </span>
                        <p className="text-emerald-200 mt-0.5">{dCase.solution}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
