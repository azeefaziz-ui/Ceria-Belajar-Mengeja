import React, { useState, useEffect } from 'react';
import { Gamepad2, Volume2, RotateCcw, Sparkles, ChevronRight, CheckCircle2, Play } from 'lucide-react';
import { speakMalay, sounds } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';

type GameType = 'memory' | 'balloon' | 'train';

export const Modul7Permainan: React.FC = () => {
  const { profile, addStars, markModuleComplete, setActiveModule } = useLearning();
  const [selectedGame, setSelectedGame] = useState<GameType>('balloon');

  /* ----------------- GAME 1: TANGKAP BELON SUKU KATA ----------------- */
  const balloonSyllables = ['BA', 'BU', 'MA', 'KU', 'LA', 'RO', 'SU', 'TA'];
  const [targetBalloon, setTargetBalloon] = useState('BU');
  const [balloons, setBalloons] = useState<{ id: string; syllable: string; color: string; popped: boolean }[]>([]);
  const [balloonScore, setBalloonScore] = useState(0);

  const initBalloonRound = () => {
    const target = balloonSyllables[Math.floor(Math.random() * balloonSyllables.length)];
    setTargetBalloon(target);

    // Pick 3 distractors
    const others = balloonSyllables.filter(s => s !== target).sort(() => 0.5 - Math.random()).slice(0, 3);
    const roundList = [target, ...others].sort(() => 0.5 - Math.random());
    const colors = ['bg-rose-400', 'bg-sky-400', 'bg-amber-400', 'bg-emerald-400'];

    setBalloons(
      roundList.map((syl, i) => ({
        id: `${syl}-${i}-${Date.now()}`,
        syllable: syl,
        color: colors[i % colors.length],
        popped: false
      }))
    );

    speakMalay(`Pecahkan belon ${target}! Cari belon bertulis ${target}.`, { speed: profile.speechSpeed });
  };

  useEffect(() => {
    if (selectedGame === 'balloon') {
      initBalloonRound();
    }
  }, [selectedGame]);

  const handlePopBalloon = (id: string, syl: string) => {
    if (syl === targetBalloon) {
      sounds.playBalloonPop();
      addStars(1);
      setBalloonScore(prev => prev + 1);
      setBalloons(prev => prev.map(b => (b.id === id ? { ...b, popped: true } : b)));
      speakMalay(`Papp! Betul, belon ${syl}! Hebat!`, {
        speed: profile.speechSpeed,
        onEnd: () => {
          setTimeout(initBalloonRound, 1000);
        }
      });
    } else {
      sounds.playPop();
      speakMalay(`Itu belon ${syl}. Cari belon ${targetBalloon}!`, { speed: 'slow' });
    }
  };

  /* ----------------- GAME 2: MEMORY MATCH ----------------- */
  const memoryPairs = ['BA', 'KU', 'MA', 'RO'];
  const [memoryCards, setMemoryCards] = useState<{ id: number; syllable: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMatches, setMemoryMatches] = useState(0);

  const initMemoryGame = () => {
    const deck = [...memoryPairs, ...memoryPairs]
      .sort(() => 0.5 - Math.random())
      .map((syllable, index) => ({
        id: index,
        syllable,
        isFlipped: false,
        isMatched: false
      }));
    setMemoryCards(deck);
    setFlippedCards([]);
    setMemoryMatches(0);
    speakMalay('Cari kad suku kata yang serupa!', { speed: profile.speechSpeed });
  };

  useEffect(() => {
    if (selectedGame === 'memory') {
      initMemoryGame();
    }
  }, [selectedGame]);

  const handleCardClick = (index: number) => {
    const card = memoryCards[index];
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    sounds.playPop();
    speakMalay(card.syllable, { speed: profile.speechSpeed });

    const newDeck = [...memoryCards];
    newDeck[index].isFlipped = true;
    setMemoryCards(newDeck);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = memoryCards[newFlipped[0]];
      const second = memoryCards[newFlipped[1]];

      if (first.syllable === second.syllable) {
        sounds.playSuccess();
        addStars(2);
        setMemoryMatches(prev => prev + 1);
        setTimeout(() => {
          setMemoryCards(prev =>
            prev.map(c =>
              c.syllable === first.syllable ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setFlippedCards([]);
        }, 600);
      } else {
        setTimeout(() => {
          setMemoryCards(prev =>
            prev.map((c, i) => (newFlipped.includes(i) ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1100);
      }
    }
  };

  /* ----------------- GAME 3: KERETA API SUKU KATA ----------------- */
  const trainWordList = [
    { word: 'BOLA', s1: 'BO', s2: 'LA', emoji: '⚽' },
    { word: 'SUSU', s1: 'SU', s2: 'SU', emoji: '🥛' },
    { word: 'MEJA', s1: 'ME', s2: 'JA', emoji: '🪑' },
    { word: 'GIGI', s1: 'GI', s2: 'GI', emoji: '🦷' }
  ];
  const [trainIdx, setTrainIdx] = useState(0);
  const currentTrainWord = trainWordList[trainIdx];
  const [wagon1, setWagon1] = useState<string | null>(null);
  const [wagon2, setWagon2] = useState<string | null>(null);
  const [trainSuccess, setTrainSuccess] = useState(false);

  const trainChoices = [currentTrainWord.s1, currentTrainWord.s2, 'KA', 'PA'].sort(() => 0.5 - Math.random());

  const handleLoadWagon = (syl: string) => {
    sounds.playPop();
    speakMalay(syl, { speed: profile.speechSpeed });
    if (!wagon1) {
      setWagon1(syl);
    } else if (!wagon2) {
      setWagon2(syl);
      // check
      if (wagon1 === currentTrainWord.s1 && syl === currentTrainWord.s2) {
        sounds.playSuccess();
        addStars(2);
        setTrainSuccess(true);
        speakMalay(`Hon hon hon! Kereta api ${currentTrainWord.word} sudah bergerak!`, {
          speed: profile.speechSpeed
        });
      } else {
        sounds.playPop();
        speakMalay('Susunan gerabak terbalik atau kurang tepat. Mari cuba lagi!', { speed: 'slow' });
      }
    }
  };

  const handleResetTrain = () => {
    sounds.playPop();
    setWagon1(null);
    setWagon2(null);
    setTrainSuccess(false);
  };

  const handleNextTrain = () => {
    sounds.playPop();
    setWagon1(null);
    setWagon2(null);
    setTrainSuccess(false);
    setTrainIdx((trainIdx + 1) % trainWordList.length);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Mascot Message */}
      <MascotMessage
        message="Mari bermain permainan suku kata bersama Ceri!"
        subMessage="Pilih permainan kegemaran anda di bawah. Kumpul banyak bintang ceria!"
        audioText="Modul 7: Permainan Ceria! Anda boleh bermain Tangkap Belon, Pasangan Kad, atau Kereta Api Suku Kata!"
        highlightWord="Permainan Ceria"
      />

      {/* Game Selector Tabs */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-purple-100 rounded-3xl max-w-xl mx-auto border border-purple-200">
        <button
          onClick={() => { sounds.playPop(); setSelectedGame('balloon'); }}
          className={`flex-1 py-3 px-4 rounded-2xl font-kids font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            selectedGame === 'balloon' ? 'bg-white text-purple-900 shadow-md scale-102' : 'text-purple-700 hover:bg-purple-50'
          }`}
        >
          <span>🎈</span>
          <span>Tangkap Belon</span>
        </button>

        <button
          onClick={() => { sounds.playPop(); setSelectedGame('memory'); }}
          className={`flex-1 py-3 px-4 rounded-2xl font-kids font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            selectedGame === 'memory' ? 'bg-white text-purple-900 shadow-md scale-102' : 'text-purple-700 hover:bg-purple-50'
          }`}
        >
          <span>🎴</span>
          <span>Cari Pasangan</span>
        </button>

        <button
          onClick={() => { sounds.playPop(); setSelectedGame('train'); }}
          className={`flex-1 py-3 px-4 rounded-2xl font-kids font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            selectedGame === 'train' ? 'bg-white text-purple-900 shadow-md scale-102' : 'text-purple-700 hover:bg-purple-50'
          }`}
        >
          <span>🚂</span>
          <span>Kereta Api</span>
        </button>
      </div>

      {/* GAME 1: TANGKAP BELON */}
      {selectedGame === 'balloon' && (
        <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50 rounded-3xl p-6 sm:p-10 border-3 border-sky-300 shadow-xl text-center relative overflow-hidden min-h-[460px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold font-kids uppercase tracking-wider text-sky-800 bg-sky-200/80 px-3 py-1 rounded-full">
                Misi: Pecahkan Belon
              </span>
              <span className="text-xs font-bold text-slate-700 font-kids">
                Skor Belon: {balloonScore} 🎈
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-800">
              Pecahkan belon bertulis suku kata:
            </h3>
            <div className="text-6xl font-black font-kids text-rose-600 my-2 animate-bounce">
              {targetBalloon}
            </div>

            <button
              onClick={() => speakMalay(`Pecahkan belon ${targetBalloon}!`, { speed: profile.speechSpeed })}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-sky-800 rounded-xl text-xs font-bold shadow-xs border border-sky-200"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengar Arahan Lagi</span>
            </button>
          </div>

          {/* Floating Balloons Canvas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 my-6 max-w-2xl mx-auto w-full">
            {balloons.map((b) => (
              <div key={b.id} className="flex justify-center">
                {b.popped ? (
                  <div className="w-28 h-36 flex flex-col items-center justify-center text-4xl animate-ping opacity-60">
                    💥
                  </div>
                ) : (
                  <button
                    onClick={() => handlePopBalloon(b.id, b.syllable)}
                    className={`w-28 h-36 ${b.color} rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-lg text-white font-black font-kids text-3xl sm:text-4xl flex flex-col items-center justify-center transform hover:scale-105 active:scale-95 transition-all relative border-2 border-white/50 animate-float`}
                  >
                    <span>{b.syllable}</span>
                    {/* Balloon knot and string */}
                    <div className="w-3 h-2 bg-black/20 rounded-full absolute -bottom-1" />
                    <div className="w-0.5 h-6 bg-slate-400 absolute -bottom-7" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Setiap belon yang betul memberikan +1 Bintang ke dalam beg bintang adik!
          </div>
        </div>
      )}

      {/* GAME 2: CARI PASANGAN */}
      {selectedGame === 'memory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-purple-200 shadow-xl text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold font-kids uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
              Padankan Kad Suku Kata
            </span>
            <button
              onClick={initMemoryGame}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kocok Kad Baru</span>
            </button>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-kids text-slate-800 mb-6">
            Buka kad dan cari pasangan suku kata yang sepadan!
          </h3>

          <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto mb-6">
            {memoryCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`h-24 sm:h-28 rounded-2xl border-3 font-black font-kids text-2xl sm:text-3xl transition-all transform flex items-center justify-center ${
                  card.isFlipped || card.isMatched
                    ? 'bg-purple-500 border-purple-600 text-white shadow-md'
                    : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-800 active:scale-95'
                }`}
              >
                {card.isFlipped || card.isMatched ? card.syllable : '⭐'}
              </button>
            ))}
          </div>

          {memoryMatches === memoryPairs.length && (
            <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl max-w-md mx-auto text-emerald-900 font-kids font-bold text-base animate-bounce">
              🎉 Tahniah! Anda berjaya mencari semua pasangan suku kata!
            </div>
          )}
        </div>
      )}

      {/* GAME 3: KERETA API SUKU KATA */}
      {selectedGame === 'train' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-emerald-200 shadow-xl text-center">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold font-kids uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Susun Gerabak Kereta Api
            </span>
            <span className="text-xs font-bold text-slate-500 font-kids">
              Perkataan: {currentTrainWord.word} {currentTrainWord.emoji}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-kids text-slate-800 mb-6">
            Muatkan gerabak dengan suku kata bagi: <span className="text-emerald-600">{currentTrainWord.word}</span>
          </h3>

          {/* Train display */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-6 bg-slate-50 rounded-3xl border-2 border-slate-200 mb-6 overflow-x-auto">
            {/* Locomotive */}
            <div className="w-24 h-24 bg-red-500 text-white rounded-2xl flex flex-col items-center justify-center shadow-md shrink-0">
              <span className="text-3xl">🚂</span>
              <span className="text-[10px] font-kids font-bold uppercase mt-1">Kepala Api</span>
            </div>

            {/* Wagon 1 */}
            <div
              className={`w-24 h-24 rounded-2xl border-3 border-dashed flex flex-col items-center justify-center text-white font-black font-kids text-3xl shadow-xs shrink-0 transition-all ${
                wagon1 ? 'bg-blue-500 border-blue-600' : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {wagon1 || '1'}
            </div>

            {/* Wagon 2 */}
            <div
              className={`w-24 h-24 rounded-2xl border-3 border-dashed flex flex-col items-center justify-center text-white font-black font-kids text-3xl shadow-xs shrink-0 transition-all ${
                wagon2 ? 'bg-amber-500 border-amber-600' : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {wagon2 || '2'}
            </div>
          </div>

          {trainSuccess && (
            <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 font-kids font-bold mb-6 animate-bounce">
              🎊 Chugga chugga choo choo! Kereta api {currentTrainWord.word} berjaya meluncur laju!
            </div>
          )}

          {/* Choices to load */}
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Tekan Suku Kata untuk Dimuatkan:
            </div>
            <div className="flex items-center justify-center gap-3">
              {trainChoices.map((s, idx) => (
                <button
                  key={`${s}-${idx}`}
                  onClick={() => handleLoadWagon(s)}
                  className="btn-tactile btn-tactile-coral text-white w-18 h-18 sm:w-20 sm:h-20 rounded-2xl font-black font-kids text-2xl shadow-md active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={handleResetTrain}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
            >
              Muat Semula Gerabak
            </button>
            {trainSuccess && (
              <button
                onClick={handleNextTrain}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold font-kids rounded-xl text-xs shadow-xs"
              >
                Perkataan Kereta Api Seterusnya &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Progress Footer Action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-200">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveModule('eja');
          }}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          &larr; Balik ke Modul 6
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            markModuleComplete('permainan');
            setActiveModule('penilaian');
          }}
          className="btn-tactile btn-tactile-coral text-white font-kids font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>Ke Modul 8 (Penilaian & Sijil)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
