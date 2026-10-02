import React, { useState } from 'react';
import { Volume2, RotateCcw, Mic, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { ALPHABET_DATA } from '../../data/learningData';
import { speakMalay, sounds, startVoiceRecognition, isSpeechRecognitionSupported } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';

export const Modul1KenalHuruf: React.FC = () => {
  const { profile, addStars, markModuleComplete, setActiveModule } = useLearning();
  const [selectedIndex, setSelectedIndex] = useState(1); // Default B b as requested in example
  const [filter, setFilter] = useState<'semua' | 'vokal' | 'konsonan'>('semua');
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);

  const current = ALPHABET_DATA[selectedIndex];

  const filteredLetters = ALPHABET_DATA.filter((item) => {
    if (filter === 'vokal') return item.category === 'vokal';
    if (filter === 'konsonan') return item.category === 'konsonan';
    return true;
  });

  const handleSelectLetter = (index: number) => {
    sounds.playPop();
    setSelectedIndex(index);
    setSpeechFeedback(null);
    const item = ALPHABET_DATA[index];
    speakMalay(item.phonicsIntro, { speed: profile.speechSpeed });
  };

  const handlePlayAudio = () => {
    sounds.playPop();
    speakMalay(current.phonicsIntro, { speed: profile.speechSpeed });
  };

  const handleRepeatAudio = () => {
    sounds.playPop();
    speakMalay(`Ini huruf ${current.phoneticSpelling}. Bunyi ${current.phoneticSpelling}... ${current.word}.`, { speed: 'slow' });
  };

  const handleNextLetter = () => {
    sounds.playPop();
    if (selectedIndex < ALPHABET_DATA.length - 1) {
      const nextIdx = selectedIndex + 1;
      setSelectedIndex(nextIdx);
      setSpeechFeedback(null);
      speakMalay(ALPHABET_DATA[nextIdx].phonicsIntro, { speed: profile.speechSpeed });
    } else {
      sounds.playSuccess();
      addStars(3);
      markModuleComplete('huruf');
      setSpeechFeedback('Tahniah! Anda telah selesai semua huruf A hingga Z! ⭐');
    }
  };

  const handlePrevLetter = () => {
    sounds.playPop();
    if (selectedIndex > 0) {
      const prevIdx = selectedIndex - 1;
      setSelectedIndex(prevIdx);
      setSpeechFeedback(null);
      speakMalay(ALPHABET_DATA[prevIdx].phonicsIntro, { speed: profile.speechSpeed });
    }
  };

  const handleMicPractice = () => {
    if (!isSpeechRecognitionSupported()) {
      // Fallback encouraging prompt
      sounds.playPop();
      speakMalay(`Sebutkan bunyi huruf ${current.phoneticSpelling}! Bunyinya: ${current.phoneticSpelling}!`, {
        speed: profile.speechSpeed,
        onEnd: () => {
          sounds.playSuccess();
          addStars(1);
          setSpeechFeedback(`Bagus sekali! Adik menyebut bunyi ${current.phoneticSpelling}! 🌟`);
        }
      });
      return;
    }

    setSpeechFeedback(`Sedang mendengar... Sebutkan bunyi "${current.phoneticSpelling}" sekarang!`);
    startVoiceRecognition(
      current.phoneticSpelling,
      (heard, isMatch) => {
        if (isMatch) {
          sounds.playSuccess();
          addStars(1);
          setSpeechFeedback(`Hebat sekali! Anda sebut "${heard}"! Tepat! ⭐`);
        } else {
          sounds.playPop();
          setSpeechFeedback(`Ceri mendengar "${heard}". Cuba sebut bunyi "${current.phoneticSpelling}" lagi!`);
        }
      },
      (err) => {
        setSpeechFeedback('Tidak dapat mendengar suara. Cuba tekan sekali lagi.');
      },
      setIsListening
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Ceri Mascot Intro */}
      <MascotMessage
        message="Mari kenal huruf dan sebutan fonik Bahasa Melayu!"
        subMessage="Tekan mana-mana huruf untuk dengar sebutan fonetik yang betul mengikut sebutan Melayu (seperti 'be', bukan 'bi')."
        audioText="Selamat datang ke Modul 1! Mari kita belajar kenal huruf dan sebutan fonik Melayu. Tekan huruf untuk mendengar sebutan!"
        highlightWord={`Huruf ${current.letter} (/${current.phoneticSpelling}/)`}
      />

      {/* Main Focus Interactive Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-200 shadow-lg relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Big Letter Card */}
          <div className="md:col-span-6 flex flex-col items-center justify-center text-center">
            <div className="relative group">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-1.5 shadow-xl flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center p-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl sm:text-8xl font-black font-kids text-amber-600 tracking-tight">
                      {current.letter}
                    </span>
                    <span className="text-5xl sm:text-6xl font-black font-kids text-rose-500">
                      {current.letterLower}
                    </span>
                  </div>

                  <div className="mt-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-kids font-bold text-sm">
                    Bunyi Fonik: <span className="text-rose-600 font-black">/{current.phoneticSpelling}/</span>
                  </div>

                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-2">
                    {current.category === 'vokal' ? 'Huruf Vokal' : 'Huruf Konsonan'}
                  </span>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 font-black font-kids text-xs px-3 py-1 rounded-full shadow-md">
                {selectedIndex + 1} / 26
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handlePrevLetter}
                disabled={selectedIndex === 0}
                className="p-3 rounded-2xl border-2 border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Huruf Sebelum"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handlePlayAudio}
                className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-lg px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md"
              >
                <Volume2 className="w-6 h-6" />
                <span>Dengar</span>
              </button>

              <button
                onClick={handleRepeatAudio}
                className="btn-tactile bg-sky-500 hover:bg-sky-600 text-white font-kids font-bold text-lg px-4 py-3 rounded-2xl flex items-center gap-2 shadow-md"
                title="Dengar lagi"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="hidden sm:inline">Ulang</span>
              </button>

              <button
                onClick={handleNextLetter}
                className="p-3 rounded-2xl border-2 border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors"
                aria-label="Huruf Seterusnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Associated Word & Visual Example */}
          <div className="md:col-span-6 flex flex-col justify-center space-y-5 bg-amber-50/60 p-6 rounded-3xl border border-amber-200">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Contoh Perkataan
              </span>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-amber-200 flex items-center justify-center text-5xl shadow-sm">
                  {current.emoji}
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black font-kids text-slate-900">
                    <span className="text-rose-600 underline decoration-amber-400 decoration-4">
                      {current.word.charAt(0)}
                    </span>
                    {current.word.slice(1)}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    {current.meaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Phonics Narration Quote */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
              <p className="text-base sm:text-lg font-kids font-semibold text-amber-950">
                &ldquo;{current.phonicsIntro}&rdquo;
              </p>
            </div>

            {/* Microphone Practice Area */}
            <div className="pt-2">
              <button
                onClick={handleMicPractice}
                disabled={isListening}
                className={`w-full py-3.5 px-4 rounded-2xl font-kids font-bold text-base flex items-center justify-center gap-2.5 shadow-sm transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white active:scale-98'
                }`}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
                <span>{isListening ? 'Sedang mendengar sebutan adik...' : `Cuba Sebut "${current.letter}"!`}</span>
              </button>

              {speechFeedback && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{speechFeedback}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 26-Letter Grid Selector */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold font-kids text-slate-900">
              Papan Huruf Abjad (A - Z)
            </h3>
            <p className="text-xs text-slate-500">
              Pilih huruf untuk mula belajar
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => { sounds.playPop(); setFilter('semua'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filter === 'semua' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua (26)
            </button>
            <button
              onClick={() => { sounds.playPop(); setFilter('vokal'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filter === 'vokal' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vokal (5)
            </button>
            <button
              onClick={() => { sounds.playPop(); setFilter('konsonan'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filter === 'konsonan' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Konsonan (21)
            </button>
          </div>
        </div>

        {/* Letter tiles grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-2.5">
          {ALPHABET_DATA.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            const isVowel = item.category === 'vokal';
            const isVisible =
              filter === 'semua' ||
              (filter === 'vokal' && isVowel) ||
              (filter === 'konsonan' && !isVowel);

            if (!isVisible) return null;

            return (
              <button
                key={item.letter}
                onClick={() => handleSelectLetter(idx)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all transform active:scale-90 ${
                  isSelected
                    ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-105'
                    : isVowel
                    ? 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black font-kids">{item.letter}</span>
                  <span className="text-sm font-semibold opacity-80">{item.letterLower}</span>
                </div>
                <span className={`text-[10px] font-bold px-1 rounded-sm mt-0.5 ${
                  isSelected ? 'bg-amber-600 text-white' : 'bg-amber-100/90 text-amber-900'
                }`}>
                  /{item.phoneticSpelling}/
                </span>
                <span className="text-base mt-0.5">{item.emoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Footer Action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-200">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Modul 1 Selesai: {profile.completedModules['huruf'] ? 'Ya ✅' : 'Sedang Belajar'}</span>
          <span>·</span>
          <span>Ganjaran: +5 Bintang ⭐</span>
        </div>
        <button
          onClick={() => {
            sounds.playPop();
            markModuleComplete('huruf');
            setActiveModule('bunyi');
          }}
          className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>Ke Modul 2 (Bunyi Huruf)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
