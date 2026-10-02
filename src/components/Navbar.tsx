import React from 'react';
import { Sparkles, ShieldAlert, BookOpen, Volume2, Gamepad2, Award } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { sounds } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { profile, activeModule, setActiveModule, setShowParentGate } = useLearning();

  const handleNavClick = (mod: any) => {
    sounds.playPop();
    setActiveModule(mod);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('huruf')}
            className="text-left group flex items-center gap-2.5 focus:outline-hidden"
          >
            <span className="text-3xl filter drop-shadow-xs group-hover:scale-110 transition-transform">🐱</span>
            <div>
              <span className="text-2xl font-black font-kids tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                CERIA SUKU KATA
              </span>
              <p className="text-[11px] font-medium text-amber-700/80 -mt-1 hidden sm:block">
                Belajar Suku Kata, Membaca Dengan Ceria!
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-amber-50/80 p-1.5 rounded-2xl border border-amber-200/60">
          <button
            onClick={() => handleNavClick('huruf')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'huruf' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>1. Huruf</span>
          </button>

          <button
            onClick={() => handleNavClick('bunyi')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'bunyi' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
            <span>2. Bunyi</span>
          </button>

          <button
            onClick={() => handleNavClick('suku_asas')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'suku_asas' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <span>3. Suku Kata</span>
          </button>

          <button
            onClick={() => handleNavClick('gabung')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'gabung' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <span>4. Gabung</span>
          </button>

          <button
            onClick={() => handleNavClick('baca')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'baca' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <span>5. Baca</span>
          </button>

          <button
            onClick={() => handleNavClick('eja')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'eja' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <span>6. Eja</span>
          </button>

          <button
            onClick={() => handleNavClick('permainan')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'permainan' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-purple-500" />
            <span>7. Main</span>
          </button>

          <button
            onClick={() => handleNavClick('penilaian')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeModule === 'penilaian' ? 'bg-white text-amber-900 shadow-xs scale-102' : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span>8. Ujian</span>
          </button>
        </nav>

        {/* Zone 3: Actions - Stars badge & Parent Gateway */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Child star wallet */}
          <div className="flex items-center gap-1.5 bg-amber-100/80 px-3 py-1.5 rounded-full border border-amber-300 text-amber-900 font-kids shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin-slow" />
            <span className="text-base font-black tabular-nums">{profile.stars}</span>
            <span className="text-xs font-semibold text-amber-800 hidden sm:inline">Bintang</span>
          </div>

          {/* Parental Gate button */}
          <button
            onClick={() => {
              sounds.playPop();
              setShowParentGate(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors shadow-xs active:scale-95"
            title="Portal Pemantauan Ibu Bapa & Guru"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Ibu Bapa & Guru</span>
            <span className="sm:hidden">Ibu Bapa</span>
          </button>
        </div>
      </div>
    </header>
  );
};
