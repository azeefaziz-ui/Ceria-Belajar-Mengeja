import React, { useState } from 'react';
import { Volume2, RotateCcw, ChevronRight, Sparkles, Check, Delete } from 'lucide-react';
import { CORE_WORDS } from '../../data/learningData';
import { speakMalay, sounds } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';

export const Modul6EjaPerkataan: React.FC = () => {
  const { profile, addStars, markWordMastered, markModuleComplete, setActiveModule } = useLearning();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = CORE_WORDS[currentIndex];

  // Selected syllables currently placed in slots
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect?: boolean; message?: string } | null>(null);

  // Scrambled choices: target syllables + 1 distractor syllable
  const getShuffledChoices = (wordObj: typeof CORE_WORDS[0]) => {
    const distractors = ['MA', 'RO', 'TI', 'LA', 'KA', 'SA', 'PA'].filter(
      (s) => !wordObj.syllables.includes(s)
    );
    const randomDistractor = distractors[Math.floor(Math.random() * distractors.length)];
    const raw = [...wordObj.syllables, randomDistractor];
    return raw.sort(() => 0.5 - Math.random());
  };

  const [availableChoices, setAvailableChoices] = useState<string[]>(() =>
    getShuffledChoices(currentWord)
  );

  const handlePickSyllable = (syllable: string) => {
    if (selectedSlots.length >= 2) return;
    sounds.playPop();
    speakMalay(syllable, { speed: profile.speechSpeed });

    const newSlots = [...selectedSlots, syllable];
    setSelectedSlots(newSlots);

    // If both slots filled, check answer
    if (newSlots.length === 2) {
      const isCorrect =
        newSlots[0] === currentWord.syllables[0] &&
        newSlots[1] === currentWord.syllables[1];

      if (isCorrect) {
        sounds.playSuccess();
        addStars(2);
        markWordMastered(currentWord.word);
        setFeedback({
          isCorrect: true,
          message: `Tahniah! Ejaan ${currentWord.word} betul! ⭐`
        });
        speakMalay(`Bagus! ${newSlots[0]} tambah ${newSlots[1]} menjadi ${currentWord.word}!`, {
          speed: profile.speechSpeed
        });
      } else {
        sounds.playPop();
        setFeedback({
          isCorrect: false,
          message: `Belum tepat. Cuba lagi untuk ${currentWord.word}!`
        });
        speakMalay(`Cuba lagi ya! Perkataan ini ialah ${currentWord.word}.`, { speed: 'slow' });
      }
    }
  };

  const handleResetCurrent = () => {
    sounds.playPop();
    setSelectedSlots([]);
    setFeedback(null);
  };

  const handleSelectWord = (idx: number) => {
    sounds.playPop();
    setCurrentIndex(idx);
    setSelectedSlots([]);
    setFeedback(null);
    const nextWord = CORE_WORDS[idx];
    setAvailableChoices(getShuffledChoices(nextWord));
    speakMalay(`Mari kita eja ${nextWord.word}!`, { speed: profile.speechSpeed });
  };

  const handleNextWord = () => {
    sounds.playPop();
    if (currentIndex < CORE_WORDS.length - 1) {
      handleSelectWord(currentIndex + 1);
    } else {
      sounds.playFanfare();
      addStars(5);
      markModuleComplete('eja');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Mascot Message */}
      <MascotMessage
        message="Mari kita eja perkataan dengan menyusun blok suku kata!"
        subMessage="Lihat gambar di bawah, kemudian tekan blok suku kata mengikut urutan yang betul."
        audioText={`Modul 6: Eja Perkataan. Susun blok suku kata untuk mengeja ${currentWord.word}.`}
        highlightWord={`Eja: ${currentWord.word}`}
      />

      {/* Main Interactive Spelling Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-orange-200 shadow-xl text-center relative overflow-hidden">
        
        {/* Visual Target Picture Prompt */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-lg bg-amber-50 flex items-center justify-center mb-3">
            {currentWord.image ? (
              <img
                src={currentWord.image}
                alt={currentWord.word}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-7xl">{currentWord.emoji}</span>
            )}
          </div>

          <h3 className="text-2xl font-black font-kids text-slate-800">
            Eja Perkataan: <span className="text-orange-600 tracking-wider">{currentWord.word}</span>
          </h3>
          <p className="text-xs text-slate-500">{currentWord.meaning}</p>
        </div>

        {/* Syllable Drop Slots */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 my-6">
          {/* Slot 1 */}
          <div
            className={`w-28 h-32 sm:w-36 sm:h-40 rounded-3xl border-3 flex flex-col items-center justify-center transition-all ${
              selectedSlots[0]
                ? 'bg-blue-500 border-blue-600 text-white shadow-md'
                : 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
            }`}
          >
            {selectedSlots[0] ? (
              <span className="text-5xl sm:text-6xl font-black font-kids">
                {selectedSlots[0]}
              </span>
            ) : (
              <span className="text-sm font-bold font-kids">Suku Kata 1</span>
            )}
          </div>

          <span className="text-3xl font-black font-kids text-slate-300">+</span>

          {/* Slot 2 */}
          <div
            className={`w-28 h-32 sm:w-36 sm:h-40 rounded-3xl border-3 flex flex-col items-center justify-center transition-all ${
              selectedSlots[1]
                ? 'bg-rose-500 border-rose-600 text-white shadow-md'
                : 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
            }`}
          >
            {selectedSlots[1] ? (
              <span className="text-5xl sm:text-6xl font-black font-kids">
                {selectedSlots[1]}
              </span>
            ) : (
              <span className="text-sm font-bold font-kids">Suku Kata 2</span>
            )}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-3 max-w-md mx-auto rounded-2xl text-sm font-bold flex items-center justify-center gap-2 mb-4 ${
              feedback.isCorrect
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 animate-bounce'
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}
          >
            {feedback.isCorrect ? <Sparkles className="w-5 h-5 text-emerald-600" /> : null}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Action Controls for Slots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={handleResetCurrent}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Padam & Susun Semula</span>
          </button>

          <button
            onClick={() => speakMalay(`Eja perkataan ${currentWord.word}. Pilih suku kata yang betul.`, { speed: profile.speechSpeed })}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl border border-amber-300 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Bantuan Suara</span>
          </button>
        </div>

        {/* Syllable Blocks Palette (Tap to spell) */}
        <div className="pt-6 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Tekan Blok Suku Kata untuk Mengeja:
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {availableChoices.map((syl, idx) => (
              <button
                key={`${syl}-${idx}`}
                onClick={() => handlePickSyllable(syl)}
                className="btn-tactile btn-tactile-coral text-white w-20 h-20 sm:w-24 sm:h-24 rounded-3xl font-black font-kids text-3xl sm:text-4xl shadow-md flex items-center justify-center active:scale-95"
              >
                {syl}
              </button>
            ))}
          </div>
        </div>

        {/* Next word button */}
        {feedback?.isCorrect && (
          <div className="mt-8 animate-fade-in">
            <button
              onClick={handleNextWord}
              className="btn-tactile btn-tactile-emerald text-white font-kids font-black text-lg px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 mx-auto"
            >
              <span>Eja Perkataan Seterusnya (+2 Bintang)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Quick Word Palette */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm">
        <h3 className="text-sm font-bold font-kids text-slate-800 mb-2">
          Pilih Perkataan Lain untuk Dieja
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {CORE_WORDS.map((w, idx) => (
            <button
              key={w.id}
              onClick={() => handleSelectWord(idx)}
              className={`p-2.5 rounded-xl border-2 text-xs font-kids font-bold transition-all ${
                currentIndex === idx
                  ? 'bg-orange-500 text-white border-orange-600'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
              }`}
            >
              <div className="text-base">{w.emoji}</div>
              <div>{w.word}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Footer Action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-200">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveModule('baca');
          }}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          &larr; Balik ke Modul 5
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            markModuleComplete('eja');
            setActiveModule('permainan');
          }}
          className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>Ke Modul 7 (Permainan Ceria)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
