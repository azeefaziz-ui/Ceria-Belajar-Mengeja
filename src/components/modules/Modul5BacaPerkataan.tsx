import React, { useState } from 'react';
import { Volume2, RotateCcw, ChevronRight, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { CORE_WORDS } from '../../data/learningData';
import { speakMalay, sounds } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';

export const Modul5BacaPerkataan: React.FC = () => {
  const { profile, addStars, markWordMastered, markWordNeedsPractice, markModuleComplete, setActiveModule } = useLearning();

  const [wordIndex, setWordIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'segmented' | 'whole'>('segmented');
  const [isReadingAudio, setIsReadingAudio] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const current = CORE_WORDS[wordIndex];

  // Generate 3 choices for comprehension (1 correct, 2 distractors)
  const getOptions = () => {
    const distractors = CORE_WORDS.filter((w) => w.id !== current.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    return [current, ...distractors].sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState(() => getOptions());

  const handleReadOutLoud = () => {
    sounds.playPop();
    setIsReadingAudio(true);
    setViewMode('segmented');

    // Phonics reading sequence
    speakMalay(`${current.syllables[0]}.... ${current.syllables[1]}.... ${current.word}!`, {
      speed: profile.speechSpeed,
      onEnd: () => {
        setIsReadingAudio(false);
        setViewMode('whole');
      }
    });
  };

  const handleSelectWord = (idx: number) => {
    sounds.playPop();
    setWordIndex(idx);
    setViewMode('segmented');
    setShowQuiz(false);
    setQuizFeedback(null);
    const target = CORE_WORDS[idx];
    setOptions(
      [target, ...CORE_WORDS.filter((w) => w.id !== target.id).sort(() => 0.5 - Math.random()).slice(0, 2)].sort(
        () => 0.5 - Math.random()
      )
    );
    speakMalay(`${target.syllables[0]}... ${target.syllables[1]}... ${target.word}`, {
      speed: profile.speechSpeed
    });
  };

  const handleQuizSelection = (selectedWordId: string) => {
    if (selectedWordId === current.id) {
      sounds.playSuccess();
      addStars(2);
      markWordMastered(current.word);
      setQuizFeedback(`Tepat sekali! Ini gambar ${current.word}! ⭐`);
      speakMalay(`Hebat sekali! Ini ialah ${current.word}. ${current.sentence}`, {
        speed: profile.speechSpeed
      });
    } else {
      sounds.playPop();
      markWordNeedsPractice(current.word);
      setQuizFeedback(`Kurang tepat, cuba lagi! Dengar perkataan: ${current.word}`);
      speakMalay(`Cuba lagi ya! Perkataan ini ialah ${current.word}.`, { speed: 'slow' });
    }
  };

  const handleNextWord = () => {
    sounds.playPop();
    if (wordIndex < CORE_WORDS.length - 1) {
      handleSelectWord(wordIndex + 1);
    } else {
      sounds.playFanfare();
      addStars(5);
      markModuleComplete('baca');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Mascot Message */}
      <MascotMessage
        message="Mari baca perkataan mengikut warna suku kata!"
        subMessage="Perhatikan warna suku kata yang berbeza, sebut satu per satu, kemudian gabung menjadi perkataan lengkap."
        audioText={`Modul 5: Baca Perkataan. Lihat suku kata ${current.syllables[0]} dan ${current.syllables[1]}. Mari kita baca ${current.word}!`}
        highlightWord={`Membaca: ${current.word}`}
      />

      {/* Main Reading Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-rose-200 shadow-xl text-center relative overflow-hidden">
        
        {/* Toggle between segmented and whole word */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => { sounds.playPop(); setViewMode('segmented'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-kids transition-all ${
              viewMode === 'segmented' ? 'bg-rose-500 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Suku Kata Berasingan ({current.syllables[0]} | {current.syllables[1]})
          </button>
          <button
            onClick={() => { sounds.playPop(); setViewMode('whole'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-kids transition-all ${
              viewMode === 'whole' ? 'bg-rose-500 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Perkataan Penuh ({current.word})
          </button>
        </div>

        {/* Syllable Reading Display */}
        <div className="py-8 bg-amber-50/50 rounded-3xl border-2 border-amber-200/80 mb-6 flex flex-col items-center justify-center">
          {viewMode === 'segmented' ? (
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {/* Syllable 1 */}
              <div
                className="px-6 sm:px-8 py-4 sm:py-6 rounded-3xl shadow-md text-white font-black font-kids text-6xl sm:text-7xl transform transition-transform hover:scale-105"
                style={{ backgroundColor: current.syllableColors[0] }}
              >
                {current.syllables[0]}
              </div>

              {/* Syllable Separator Bar */}
              <div className="w-1.5 h-16 bg-slate-300 rounded-full" />

              {/* Syllable 2 */}
              <div
                className="px-6 sm:px-8 py-4 sm:py-6 rounded-3xl shadow-md text-white font-black font-kids text-6xl sm:text-7xl transform transition-transform hover:scale-105"
                style={{ backgroundColor: current.syllableColors[1] }}
              >
                {current.syllables[1]}
              </div>
            </div>
          ) : (
            <div className="text-7xl sm:text-8xl font-black font-kids tracking-wider flex items-center justify-center">
              <span style={{ color: current.syllableColors[0] }}>{current.syllables[0]}</span>
              <span style={{ color: current.syllableColors[1] }}>{current.syllables[1]}</span>
            </div>
          )}

          <p className="text-sm font-semibold text-slate-500 mt-4">
            {current.meaning}
          </p>
        </div>

        {/* Audio Reading Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleReadOutLoud}
            disabled={isReadingAudio}
            className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-lg px-8 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-md active:scale-95"
          >
            <Volume2 className="w-6 h-6" />
            <span>{isReadingAudio ? 'Membaca...' : 'Dengar Sebutan (BU... KU... BUKU)'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setShowQuiz(!showQuiz);
              if (!showQuiz) {
                speakMalay(`Apakah perkataan ini? Pilih gambar yang betul bagi ${current.word}!`, {
                  speed: profile.speechSpeed
                });
              }
            }}
            className="btn-tactile btn-tactile-emerald text-white font-kids font-bold text-lg px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-md"
          >
            <HelpCircle className="w-6 h-6" />
            <span>{showQuiz ? 'Sembunyi Kuiz' : 'Uji Pemahaman Gambar'}</span>
          </button>
        </div>

        {/* Interactive Comprehension Quiz Section */}
        {showQuiz && (
          <div className="mt-8 p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl animate-fade-in">
            <h4 className="text-xl font-black font-kids text-slate-800 mb-2">
              Apakah perkataan ini? Pilih gambar bagi perkataan:
            </h4>
            <div className="text-4xl font-black font-kids text-rose-600 mb-6">
              {current.word}
            </div>

            {quizFeedback && (
              <div className="p-3 mb-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-sm font-bold text-emerald-900 inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{quizFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleQuizSelection(opt.id)}
                  className="p-5 bg-white hover:bg-amber-50 border-3 border-slate-200 hover:border-amber-400 rounded-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-sm"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-2 flex items-center justify-center bg-slate-100">
                    {opt.image ? (
                      <img
                        src={opt.image}
                        alt={opt.word}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-5xl">{opt.emoji}</span>
                    )}
                  </div>
                  <span className="text-lg font-black font-kids text-slate-800">
                    {opt.word}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stepper Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={() => handleSelectWord(Math.max(0, wordIndex - 1))}
            disabled={wordIndex === 0}
            className="px-4 py-2 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-40"
          >
            Sebelumnya
          </button>

          <span className="text-xs font-bold text-slate-500 font-kids">
            Perkataan {wordIndex + 1} daripada {CORE_WORDS.length}
          </span>

          <button
            onClick={handleNextWord}
            className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold font-kids shadow-xs flex items-center gap-1.5"
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Word Quick Selector Gallery */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm">
        <h3 className="text-base font-bold font-kids text-slate-800 mb-3">
          Senarai Perkataan Bacaan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {CORE_WORDS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectWord(idx)}
              className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                wordIndex === idx
                  ? 'bg-rose-500 text-white border-rose-600 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
              }`}
            >
              <div className="text-xl">{item.emoji}</div>
              <div className="text-xs font-kids font-bold mt-1">{item.word}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Footer Action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-200">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveModule('gabung');
          }}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          &larr; Balik ke Modul 4
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            markModuleComplete('baca');
            setActiveModule('eja');
          }}
          className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>Ke Modul 6 (Eja Perkataan)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
