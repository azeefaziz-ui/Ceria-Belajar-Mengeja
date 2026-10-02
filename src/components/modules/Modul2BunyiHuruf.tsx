import React, { useState } from 'react';
import { Volume2, RotateCcw, ChevronRight, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { PHONICS_DATA } from '../../data/learningData';
import { speakMalay, sounds } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';

export const Modul2BunyiHuruf: React.FC = () => {
  const { profile, addStars, markModuleComplete, setActiveModule } = useLearning();
  const [selectedPhonic, setSelectedPhonic] = useState(PHONICS_DATA[0]); // default B -> /b/
  const [gameMode, setGameMode] = useState(false);
  const [quizTarget, setQuizTarget] = useState(PHONICS_DATA[0]);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const handlePlaySound = (item: typeof PHONICS_DATA[0]) => {
    sounds.playPop();
    setSelectedPhonic(item);
    speakMalay(item.audioPrompt, { speed: profile.speechSpeed });
  };

  const handleRepeat = () => {
    sounds.playPop();
    speakMalay(`Bunyi konsonan ${selectedPhonic.phoneticSpelling}. ${selectedPhonic.soundSample}. ${selectedPhonic.tip}`, {
      speed: 'slow'
    });
  };

  const startQuiz = () => {
    sounds.playPop();
    setGameMode(true);
    const randomItem = PHONICS_DATA[Math.floor(Math.random() * PHONICS_DATA.length)];
    setQuizTarget(randomItem);
    setQuizFeedback(null);
    speakMalay(`Dengar bunyi fonik ini baik-baik: ${randomItem.soundSample}. Huruf apakah yang berbunyi ${randomItem.phoneticSpelling}?`, {
      speed: profile.speechSpeed
    });
  };

  const handleQuizAnswer = (item: typeof PHONICS_DATA[0]) => {
    if (item.id === quizTarget.id) {
      sounds.playSuccess();
      addStars(2);
      setQuizFeedback(`Betul sekali! Huruf ${item.letter} berbunyi /${item.phoneticSpelling}/! ⭐`);
      setTimeout(() => {
        const remaining = PHONICS_DATA.filter((p) => p.id !== item.id);
        const next = remaining[Math.floor(Math.random() * remaining.length)];
        setQuizTarget(next);
        setQuizFeedback(null);
        speakMalay(`Dengar lagi: ${next.soundSample}. Manakah huruf yang berbunyi ${next.phoneticSpelling}?`, {
          speed: profile.speechSpeed
        });
      }, 1800);
    } else {
      sounds.playPop();
      setQuizFeedback(`Cuba lagi! Dengar bunyi: ${quizTarget.soundSample}`);
      speakMalay(`Cuba lagi ya! Dengar bunyinya: ${quizTarget.soundSample}`, { speed: 'slow' });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Mascot Intro */}
      <MascotMessage
        message="Mari belajar sebut bunyi fonik bagi setiap huruf!"
        subMessage="Setiap huruf mempunyai bunyi tersendiri. Tekan huruf untuk mendengar bunyi dan tip bibir/lidah."
        audioText="Modul 2: Bunyi Huruf. Mari dengar bagaimana setiap huruf berbunyi!"
        highlightWord={`Bunyi /${selectedPhonic.letter.toLowerCase()}/`}
      />

      {/* Mode Switcher */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-amber-200">
        <span className="text-xs font-bold text-amber-900 px-3">
          {gameMode ? 'Mod: Ujian Padanan Bunyi' : 'Mod: Terokai Bunyi Huruf'}
        </span>
        <button
          onClick={() => {
            sounds.playPop();
            if (gameMode) {
              setGameMode(false);
            } else {
              startQuiz();
            }
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-kids transition-all flex items-center gap-1.5 ${
            gameMode
              ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
          }`}
        >
          {gameMode ? 'Kembali ke Papan Bunyi' : '🎯 Main Kuiz Teka Bunyi (+2 Bintang)'}
        </button>
      </div>

      {!gameMode ? (
        /* Explanatory Mode */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Active Sound Focus Card */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-3 border-sky-200 shadow-lg flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full mb-3">
              Hubungan Huruf &rarr; Bunyi
            </span>

            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 p-1 shadow-md mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center">
                <span className="text-6xl font-black font-kids text-sky-600">
                  {selectedPhonic.letter}
                </span>
                <span className="text-2xl font-bold font-kids text-rose-500 mt-1">
                  {selectedPhonic.soundDescription}
                </span>
              </div>
            </div>

            {/* Phonetic Tip Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 w-full mb-6">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                Tip Sebutan Ceri:
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {selectedPhonic.tip}
              </p>
              <div className="text-xs text-slate-500 mt-2">
                Contoh: <span className="font-bold text-slate-800">{selectedPhonic.exampleWord}</span>
              </div>
            </div>

            {/* Audio Action Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => handlePlaySound(selectedPhonic)}
                className="flex-1 btn-tactile btn-tactile-blue text-white font-kids font-bold text-base py-3 px-4 rounded-2xl flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>Dengar</span>
              </button>

              <button
                onClick={handleRepeat}
                className="btn-tactile bg-slate-100 hover:bg-slate-200 text-slate-800 font-kids font-bold text-base py-3 px-4 rounded-2xl flex items-center justify-center gap-2 border border-slate-300"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Dengar Lagi</span>
              </button>
            </div>
          </div>

          {/* Sound Board Selection Grid */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-kids text-slate-900">
                  Papan Pilihan Bunyi Fonik
                </h3>
                <span className="text-xs text-slate-500">
                  Tekan mana-mana huruf
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PHONICS_DATA.map((item) => {
                  const isSelected = selectedPhonic.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePlaySound(item)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all transform active:scale-95 flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-300 shadow-sm'
                          : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black font-kids text-slate-900">
                            {item.letter}
                          </span>
                          <span className="text-xs font-bold text-sky-600">
                            {item.soundDescription}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium truncate max-w-[120px]">
                          {item.exampleWord}
                        </p>
                      </div>
                      <Volume2 className={`w-4 h-4 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Latihan sebutan fonik membantu kanak-kanak membaca suku kata dengan lancar.
              </span>
              <button
                onClick={startQuiz}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-kids font-bold text-xs rounded-xl transition-all shadow-xs"
              >
                Uji Pemahaman
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* Interactive Listening Quiz Challenge */
        <div className="bg-white rounded-3xl p-8 border-3 border-emerald-300 shadow-lg text-center max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cabaran Dengar & Pilih Huruf</span>
          </div>

          <h3 className="text-2xl font-black font-kids text-slate-800">
            Dengar bunyi ini, huruf apakah yang berbunyi demikian?
          </h3>

          <div className="flex justify-center">
            <button
              onClick={() => {
                sounds.playPop();
                speakMalay(`Dengar bunyi: ${quizTarget.soundSample}. Huruf apa ya?`, { speed: 'slow' });
              }}
              className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-xl px-8 py-4 rounded-3xl flex items-center gap-3 shadow-lg"
            >
              <Volume2 className="w-7 h-7" />
              <span>Dengar Bunyi Lagi</span>
            </button>
          </div>

          {quizFeedback && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm font-bold text-emerald-800 animate-bounce">
              {quizFeedback}
            </div>
          )}

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-4">
            {PHONICS_DATA.slice(0, 8).map((item) => (
              <button
                key={item.id}
                onClick={() => handleQuizAnswer(item)}
                className="p-4 bg-slate-50 hover:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 rounded-2xl text-3xl font-black font-kids text-slate-800 transition-all active:scale-95 shadow-xs"
              >
                {item.letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Footer Action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-200">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveModule('huruf');
          }}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          &larr; Balik ke Modul 1
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            markModuleComplete('bunyi');
            setActiveModule('suku_asas');
          }}
          className="btn-tactile btn-tactile-emerald text-white font-kids font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>Ke Modul 3 (Suku Kata Asas)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
