import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Mic, ChevronRight, ChevronLeft, Sparkles, Wand2 } from 'lucide-react';
import { SUKU_KATA_FAMILIES } from '../../data/learningData';
import { speakMalay, sounds, startVoiceRecognition, isSpeechRecognitionSupported, MALAY_PHONETIC_LETTER_MAP } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';

export const Modul3SukuKataAsas: React.FC = () => {
  const { profile, addStars, markModuleComplete, setActiveModule } = useLearning();

  const [selectedFamilyIdx, setSelectedFamilyIdx] = useState(0); // 'B'
  const [selectedVowelIdx, setSelectedVowelIdx] = useState(0); // 'A' -> 'BA'
  const [isBlending, setIsBlending] = useState(false);
  const [isBlended, setIsBlended] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [micFeedback, setMicFeedback] = useState<string | null>(null);

  const currentFamily = SUKU_KATA_FAMILIES[selectedFamilyIdx];
  const currentItem = currentFamily.items[selectedVowelIdx];

  // Auto-play when changing item using Malaysian Phonics (Kaedah Gabung Bunyi)
  const playSyllableAudio = (audioPrompt: string) => {
    sounds.playBlend();
    speakMalay(audioPrompt, {
      speed: profile.speechSpeed
    });
  };

  const handleSelectVowel = (idx: number) => {
    sounds.playPop();
    setSelectedVowelIdx(idx);
    setMicFeedback(null);
    triggerBlendAnimation(idx);
  };

  const triggerBlendAnimation = (vIdx: number) => {
    setIsBlending(true);
    setIsBlended(false);
    setTimeout(() => {
      sounds.playBlend();
      setIsBlending(false);
      setIsBlended(true);
      const target = currentFamily.items[vIdx];
      playSyllableAudio(target.audioText);
    }, 600);
  };

  const handleNext = () => {
    sounds.playPop();
    setMicFeedback(null);
    if (selectedVowelIdx < currentFamily.items.length - 1) {
      handleSelectVowel(selectedVowelIdx + 1);
    } else if (selectedFamilyIdx < SUKU_KATA_FAMILIES.length - 1) {
      setSelectedFamilyIdx(selectedFamilyIdx + 1);
      setSelectedVowelIdx(0);
      triggerBlendAnimation(0);
    } else {
      sounds.playSuccess();
      addStars(5);
      markModuleComplete('suku_asas');
      setMicFeedback('Hebat! Anda telah menguasai suku kata asas KV! ⭐⭐⭐');
    }
  };

  const handlePrev = () => {
    sounds.playPop();
    setMicFeedback(null);
    if (selectedVowelIdx > 0) {
      handleSelectVowel(selectedVowelIdx - 1);
    } else if (selectedFamilyIdx > 0) {
      setSelectedFamilyIdx(selectedFamilyIdx - 1);
      setSelectedVowelIdx(currentFamily.items.length - 1);
      triggerBlendAnimation(currentFamily.items.length - 1);
    }
  };

  const handleMicTest = () => {
    if (!isSpeechRecognitionSupported()) {
      sounds.playPop();
      speakMalay(`Sebut bersama-sama: ${currentItem.syllable}!`, {
        speed: profile.speechSpeed,
        onEnd: () => {
          sounds.playSuccess();
          addStars(1);
          setMicFeedback(`Bagus sekali! Adik sebut ${currentItem.syllable}! ⭐`);
        }
      });
      return;
    }

    setMicFeedback('Mendengar... Cuba sebut: ' + currentItem.syllable);
    startVoiceRecognition(
      currentItem.syllable,
      (heard, isMatch) => {
        if (isMatch) {
          sounds.playSuccess();
          addStars(1);
          setMicFeedback(`Tahniah! Sebutan tepat: "${heard.toUpperCase()}"! ⭐`);
        } else {
          sounds.playPop();
          setMicFeedback(`Adik sebut "${heard}". Cuba sebut "${currentItem.syllable}" sekali lagi.`);
        }
      },
      () => setMicFeedback('Tidak dapat mendengar suara. Cuba tekan sekali lagi.'),
      setIsListening
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Mascot Intro */}
      <MascotMessage
        message="Mari gabungkan konsonan dan vokal menjadi suku kata!"
        subMessage="Lihat bagaimana huruf bergabung perlahan-lahan. Sebut bersama Ceri!"
        audioText={`Modul 3: Suku Kata Asas. Mari gabungkan huruf ${currentFamily.consonant} dengan vokal ${currentItem.vowel} menjadi ${currentItem.syllable}.`}
        highlightWord={`Suku Kata ${currentItem.syllable}`}
      />

      {/* Consonant Family Picker Tabs */}
      <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold font-kids uppercase tracking-wider text-slate-500">
            Pilih Huruf Konsonan:
          </span>
          <span className="text-xs text-amber-700 font-bold">
            {currentFamily.name}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SUKU_KATA_FAMILIES.map((fam, idx) => {
            const isSel = selectedFamilyIdx === idx;
            const sound = MALAY_PHONETIC_LETTER_MAP[fam.consonant] || fam.consonant.toLowerCase();
            return (
              <button
                key={fam.consonant}
                onClick={() => {
                  sounds.playPop();
                  setSelectedFamilyIdx(idx);
                  setSelectedVowelIdx(0);
                  triggerBlendAnimation(0);
                }}
                className={`w-14 h-14 shrink-0 rounded-2xl font-black font-kids transition-all flex flex-col items-center justify-center ${
                  isSel
                    ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                <span className="text-xl leading-none">{fam.consonant}</span>
                <span className="text-[10px] font-bold opacity-80 mt-0.5">/{sound}/</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Syllable Blending Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-amber-300 shadow-xl relative overflow-hidden text-center">
        
        {/* Blending Equation Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full font-kids font-bold text-sm mb-6 shadow-xs">
          <Wand2 className="w-4 h-4 text-amber-600" />
          <span>Kaedah Gabung Fonik Malaysia: /{MALAY_PHONETIC_LETTER_MAP[currentFamily.consonant] || 'be'}/ + /{MALAY_PHONETIC_LETTER_MAP[currentItem.vowel] || 'aa'}/ = {currentItem.syllable}</span>
        </div>

        {/* Dynamic Animated Fusion Box */}
        <div className="min-h-[180px] sm:min-h-[220px] flex items-center justify-center gap-4 sm:gap-6 my-2">
          {/* Consonant Card */}
          <div
            className={`w-28 h-32 sm:w-36 sm:h-40 rounded-3xl bg-blue-500 border-4 border-blue-600 shadow-lg flex flex-col items-center justify-center text-white transition-all duration-500 ${
              isBlending ? 'translate-x-8 scale-95' : 'translate-x-0'
            }`}
          >
            <span className="text-6xl sm:text-7xl font-black font-kids">
              {currentFamily.consonant}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-700/80 px-2 py-0.5 rounded-md mt-1">
              Bunyi: /{MALAY_PHONETIC_LETTER_MAP[currentFamily.consonant] || 'be'}/
            </span>
          </div>

          {/* Plus sign */}
          <span className={`text-4xl sm:text-5xl font-black font-kids text-amber-500 transition-opacity ${isBlending ? 'opacity-30' : 'opacity-100'}`}>
            +
          </span>

          {/* Vowel Card */}
          <div
            className={`w-28 h-32 sm:w-36 sm:h-40 rounded-3xl bg-rose-500 border-4 border-rose-600 shadow-lg flex flex-col items-center justify-center text-white transition-all duration-500 ${
              isBlending ? '-translate-x-8 scale-95' : 'translate-x-0'
            }`}
          >
            <span className="text-6xl sm:text-7xl font-black font-kids">
              {currentItem.vowel}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-700/80 px-2 py-0.5 rounded-md mt-1">
              Bunyi: /{MALAY_PHONETIC_LETTER_MAP[currentItem.vowel] || 'aa'}/
            </span>
          </div>

          {/* Equals sign */}
          <span className="text-4xl sm:text-5xl font-black font-kids text-amber-500">
            =
          </span>

          {/* Resulting Blended Syllable Card */}
          <div
            className={`w-32 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-1.5 shadow-xl flex items-center justify-center transition-all duration-500 ${
              isBlended ? 'scale-105 ring-4 ring-amber-300' : 'opacity-40 scale-95'
            }`}
          >
            <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center">
              <span className="text-6xl sm:text-7xl font-black font-kids bg-gradient-to-r from-blue-600 to-rose-600 bg-clip-text text-transparent tracking-tight">
                {currentItem.syllable}
              </span>
              <span className="text-xs font-bold text-amber-700 mt-1">
                Contoh: {currentItem.example}
              </span>
            </div>
          </div>
        </div>

        {/* Syllable Audio Text Announcement */}
        <p className="text-xl sm:text-2xl font-black font-kids text-slate-800 mt-4">
          Mari sebut <span className="text-rose-600 text-3xl">{currentItem.syllable}</span>!
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={selectedFamilyIdx === 0 && selectedVowelIdx === 0}
            className="p-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => playSyllableAudio(currentItem.audioText)}
            className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-base sm:text-lg px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-md"
          >
            <Volume2 className="w-6 h-6" />
            <span>Dengar Fonik ({currentItem.syllable})</span>
          </button>

          <button
            onClick={handleMicTest}
            disabled={isListening}
            className={`btn-tactile text-white font-kids font-bold text-base sm:text-lg px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-md ${
              isListening ? 'bg-rose-500 animate-pulse' : 'btn-tactile-emerald'
            }`}
          >
            <Mic className="w-6 h-6" />
            <span>{isListening ? 'Mendengar...' : 'Cuba Sebut'}</span>
          </button>

          <button
            onClick={handleNext}
            className="btn-tactile btn-tactile-blue text-white font-kids font-bold text-base sm:text-lg px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-md"
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {micFeedback && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-sm font-bold text-emerald-800 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{micFeedback}</span>
          </div>
        )}

        {/* 5 Vowel Quick Buttons for current consonant */}
        <div className="pt-8 border-t border-slate-100 mt-8">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Pilih Vokal untuk Huruf {currentFamily.consonant}:
          </div>
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            {currentFamily.items.map((item: any, idx: number) => {
              const isSelected = selectedVowelIdx === idx;
              return (
                <button
                  key={item.syllable}
                  onClick={() => handleSelectVowel(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 font-kids font-black text-2xl sm:text-3xl transition-all transform active:scale-95 flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-amber-400 border-amber-600 text-amber-950 shadow-md scale-105 ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  <span>{item.syllable}</span>
                  <span className="text-[10px] font-bold opacity-70">
                    +{item.vowel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Footer Action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-200">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveModule('bunyi');
          }}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          &larr; Balik ke Modul 2
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            markModuleComplete('suku_asas');
            setActiveModule('gabung');
          }}
          className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>Ke Modul 4 (Gabung Suku Kata)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
