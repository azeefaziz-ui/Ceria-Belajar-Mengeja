import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { ModuleId } from '../types';
import { useLearning } from '../context/LearningContext';
import { sounds } from '../utils/audio';

interface Step {
  id: ModuleId;
  stepNum: number;
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  borderColor: string;
}

const STEPS: Step[] = [
  { id: 'huruf', stepNum: 1, title: 'Kenal Huruf', subtitle: 'A hingga Z', icon: '🔤', bgColor: 'bg-amber-100 text-amber-900', borderColor: 'border-amber-300' },
  { id: 'bunyi', stepNum: 2, title: 'Kenal Bunyi', subtitle: 'Fonik Sebutan', icon: '🔊', bgColor: 'bg-sky-100 text-sky-900', borderColor: 'border-sky-300' },
  { id: 'suku_asas', stepNum: 3, title: 'Suku Kata', subtitle: 'Pola KV (BA, BI)', icon: '🧩', bgColor: 'bg-emerald-100 text-emerald-900', borderColor: 'border-emerald-300' },
  { id: 'gabung', stepNum: 4, title: 'Gabung Suku Kata', subtitle: 'BA + JU = BAJU', icon: '🪄', bgColor: 'bg-indigo-100 text-indigo-900', borderColor: 'border-indigo-300' },
  { id: 'baca', stepNum: 5, title: 'Baca Perkataan', subtitle: 'Warna Berasingan', icon: '📖', bgColor: 'bg-rose-100 text-rose-900', borderColor: 'border-rose-300' },
  { id: 'eja', stepNum: 6, title: 'Eja Perkataan', subtitle: 'Susun Blok', icon: '✍️', bgColor: 'bg-orange-100 text-orange-900', borderColor: 'border-orange-300' },
  { id: 'permainan', stepNum: 7, title: 'Permainan', subtitle: '3 Permainan Ceria', icon: '🎈', bgColor: 'bg-purple-100 text-purple-900', borderColor: 'border-purple-300' },
  { id: 'penilaian', stepNum: 8, title: 'Penilaian', subtitle: 'Ujian & Sijil', icon: '🏆', bgColor: 'bg-yellow-100 text-yellow-900', borderColor: 'border-yellow-300' },
];

export const ModuleRoadmap: React.FC = () => {
  const { activeModule, setActiveModule, profile } = useLearning();

  const handleStepClick = (stepId: ModuleId) => {
    sounds.playPop();
    setActiveModule(stepId);
  };

  return (
    <div className="w-full bg-white/70 backdrop-blur-xs border-b border-amber-100/80 py-3 px-4 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        {STEPS.map((step, idx) => {
          const isActive = activeModule === step.id;
          const isDone = profile.completedModules[step.id];

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => handleStepClick(step.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl border-2 transition-all select-none text-left ${
                  isActive
                    ? `${step.bgColor} ${step.borderColor} shadow-md scale-102 font-bold ring-2 ring-amber-400/50`
                    : 'bg-white/80 border-slate-200/80 text-slate-700 hover:bg-amber-50/60'
                }`}
              >
                <div className="relative">
                  <span className="text-xl sm:text-2xl">{step.icon}</span>
                  {isDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-white absolute -top-1 -right-1" />
                  )}
                </div>

                <div className="pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                      Langkah {step.stepNum}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-kids font-bold whitespace-nowrap">
                    {step.title}
                  </div>
                </div>
              </button>

              {idx < STEPS.length - 1 && (
                <ChevronRight className="w-4 h-4 text-amber-300 shrink-0 hidden sm:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
