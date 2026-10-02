import React, { useState } from 'react';
import { Volume2, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Check, Heart } from 'lucide-react';
import { CORE_WORDS } from '../../data/learningData';
import { speakMalay, sounds } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';

export const Modul4GabungSukuKata: React.FC = () => {
  const { profile, addStars, markWordMastered, markModuleComplete, setActiveModule } = useLearning();

  const [currentIndex, setCurrentIndex] = useState(0); // 0 = BUKU
  const [isFused, setIsFused] = useState(false);
  const [fusingStep, setFusingStep] = useState(0); // 0: initial separated, 1: anim fusing, 2: fused

  const current = CORE_WORDS[currentIndex];

  const handleSyllableTap = (syllable: string) => {
    sounds.playPop();
    speakMalay(syllable, { speed: profile.speechSpeed });
  };

  const handleFuseAction = () => {
    sounds.playBlend();
    setFusingStep(1);

    setTimeout(() => {
      setFusingStep(2);
      setIsFused(true);
      sounds.playSuccess();
      addStars(1);
      markWordMastered(current.word);

      // Play phonics progression: "BU... KU... BUKU!"
      speakMalay(`${current.syllables[0]}.... ${current.syllables[1]}.... ${current.word}! ${current.sentence}`, {
        speed: profile.speechSpeed
      });
    }, 700);
  };

  const handleSelectWord = (idx: number) => {
    sounds.playPop();
    setCurrentIndex(idx);
    setIsFused(false);
    setFusingStep(0);
    const target = CORE_WORDS[idx];
    speakMalay(`Mari gabung suku kata: ${target.syllables[0]} tambah ${target.syllables[1]}... menjadi ${target.word}!`, {
      speed: profile.speechSpeed
    });
  };

  const handleNextWord = () => {
    sounds.playPop();
    if (currentIndex < CORE_WORDS.length - 1) {
      handleSelectWord(currentIndex + 1);
    } else {
      sounds.playFanfare();
      addStars(5);
      markModuleComplete('gabung');
    }
  };

  const handlePrevWord = () => {
    sounds.playPop();
    if (currentIndex > 0) {
      handleSelectWord(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Mascot Intro */}
      <MascotMessage
        message="Mari cantumkan dua suku kata untuk membentuk perkataan!"
        subMessage="Tekan setiap suku kata untuk dengar bunyinya, kemudian tekan 'Gabungkan Kad'!"
        audioText={`Modul 4: Gabung Suku Kata. ${current.syllables[0]} tambah ${current.syllables[1]} menjadi ${current.word}.`}
        highlightWord={`${current.syllables[0]} + ${current.syllables[1]} = ${current.word}`}
      />

      {/* Main Interactive Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-indigo-200 shadow-xl relative overflow-hidden">
        
        {/* Top word metadata */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Perkataan {currentIndex + 1} daripada {CORE_WORDS.length}
          </span>
          {profile.masteredWords.includes(current.word) && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
              <Check className="w-3.5 h-3.5" /> Telah Dikuasai
            </span>
          )}
        </div>

        {/* Syllable Fusion Area */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            
            {/* First Syllable Block */}
            <button
              onClick={() => handleSyllableTap(current.syllables[0])}
              className={`w-32 h-36 sm:w-44 sm:h-44 rounded-3xl p-1 shadow-lg text-white font-black font-kids transition-all duration-500 transform ${
                fusingStep === 1 ? 'translate-x-6 scale-95' : 'translate-x-0'
              }`}
              style={{ backgroundColor: current.syllableColors[0] }}
            >
              <div className="w-full h-full border-3 border-white/40 rounded-[20px] flex flex-col items-center justify-center">
                <span className="text-5xl sm:text-6xl">{current.syllables[0]}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 mt-1">
                  Suku Kata 1
                </span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full mt-2">
                  🔊 Tekan
                </span>
              </div>
            </button>

            {/* Plus Indicator */}
            <div className={`text-4xl sm:text-5xl font-black font-kids text-indigo-400 transition-opacity ${fusingStep === 1 ? 'opacity-20' : 'opacity-100'}`}>
              +
            </div>

            {/* Second Syllable Block */}
            <button
              onClick={() => handleSyllableTap(current.syllables[1])}
              className={`w-32 h-36 sm:w-44 sm:h-44 rounded-3xl p-1 shadow-lg text-white font-black font-kids transition-all duration-500 transform ${
                fusingStep === 1 ? '-translate-x-6 scale-95' : 'translate-x-0'
              }`}
              style={{ backgroundColor: current.syllableColors[1] }}
            >
              <div className="w-full h-full border-3 border-white/40 rounded-[20px] flex flex-col items-center justify-center">
                <span className="text-5xl sm:text-6xl">{current.syllables[1]}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 mt-1">
                  Suku Kata 2
                </span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full mt-2">
                  🔊 Tekan
                </span>
              </div>
            </button>
          </div>

          {/* Fused Result Showcase */}
          {isFused && (
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 via-amber-50 to-rose-50 border-3 border-indigo-300 rounded-3xl w-full max-w-lg shadow-md animate-fade-in flex flex-col items-center text-center">
              
              {/* Illustration / Picture */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white mb-4 flex items-center justify-center">
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.word}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-7xl">{current.emoji}</span>
                )}
              </div>

              {/* Word Display with color-coded syllables */}
              <div className="flex items-center gap-1 font-black font-kids text-5xl sm:text-6xl tracking-wide">
                <span style={{ color: current.syllableColors[0] }}>{current.syllables[0]}</span>
                <span style={{ color: current.syllableColors[1] }}>{current.syllables[1]}</span>
              </div>

              <p className="text-base sm:text-lg font-bold font-kids text-slate-800 mt-2">
                &ldquo;{current.sentence}&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {current.meaning}
              </p>

              <button
                onClick={() => speakMalay(`${current.syllables[0]}... ${current.syllables[1]}... ${current.word}!`, { speed: profile.speechSpeed })}
                className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-kids font-bold text-sm shadow-sm active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ulang Sebutan Perkataan</span>
              </button>
            </div>
          )}

          {/* Fusion Button */}
          {!isFused && (
            <button
              onClick={handleFuseAction}
              className="mt-8 btn-tactile btn-tactile-coral text-white font-kids font-black text-xl px-10 py-4 rounded-3xl shadow-xl flex items-center gap-3 active:scale-95"
            >
              <Sparkles className="w-6 h-6 animate-spin-slow" />
              <span>Gabungkan Kad! ({current.syllables[0]} + {current.syllables[1]})</span>
            </button>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePrevWord}
              disabled={currentIndex === 0}
              className="p-3 rounded-2xl border-2 border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                speakMalay(`${current.syllables[0]} tambah ${current.syllables[1]} menjadi ${current.word}`, {
                  speed: profile.speechSpeed
                });
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-kids font-bold text-sm border border-slate-300 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengar Arahan</span>
            </button>

            <button
              onClick={handleNextWord}
              className="btn-tactile btn-tactile-blue text-white font-kids font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2"
            >
              <span>Perkataan Seterusnya</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Words Gallery Selector */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm">
        <h3 className="text-lg font-bold font-kids text-slate-900 mb-1">
          Koleksi Perkataan Suku Kata (KV + KV)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Pilih mana-mana kad untuk cantumkan suku kata
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {CORE_WORDS.map((item, idx) => {
            const isSelected = currentIndex === idx;
            const isMastered = profile.masteredWords.includes(item.word);
            return (
              <button
                key={item.id}
                onClick={() => handleSelectWord(idx)}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center transform active:scale-95 relative ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300 shadow-md scale-105'
                    : 'bg-slate-50 hover:bg-amber-50 border-slate-200'
                }`}
              >
                {isMastered && (
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                )}
                <span className="text-3xl mb-1">{item.emoji}</span>
                <span className="text-base font-black font-kids text-slate-900">
                  {item.word}
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  {item.syllables[0]}+{item.syllables[1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Footer Action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-200">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveModule('suku_asas');
          }}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          &larr; Balik ke Modul 3
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            markModuleComplete('gabung');
            setActiveModule('baca');
          }}
          className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>Ke Modul 5 (Baca Perkataan)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
