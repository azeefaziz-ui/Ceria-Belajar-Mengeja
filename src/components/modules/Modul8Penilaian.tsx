import React, { useState } from 'react';
import { Volume2, Award, Sparkles, CheckCircle2, RotateCcw, ChevronRight, FileText } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../data/learningData';
import { speakMalay, sounds } from '../../utils/audio';
import { useLearning } from '../../context/LearningContext';
import { MascotMessage } from '../MascotMessage';
import { CertificateModal } from '../CertificateModal';

export const Modul8Penilaian: React.FC = () => {
  const { profile, addStars, recordQuizScore, markModuleComplete } = useLearning();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handlePlayPrompt = () => {
    sounds.playPop();
    speakMalay(question.audioPrompt, { speed: profile.speechSpeed });
  };

  const handleSelectOption = (optionId: string) => {
    sounds.playPop();
    setSelectedAnswers(prev => ({ ...prev, [question.id]: optionId }));

    const isCorrect = optionId === question.correctOptionId;
    if (isCorrect) {
      sounds.playSuccess();
      setFeedback(`Betul! ${question.explanation}`);
      speakMalay(question.explanation, { speed: profile.speechSpeed });
    } else {
      sounds.playPop();
      setFeedback('Kurang tepat. Cuba lagi ya!');
      speakMalay('Cuba lagi ya adik!', { speed: 'slow' });
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setFeedback(null);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      speakMalay(QUIZ_QUESTIONS[nextIdx].audioPrompt, { speed: profile.speechSpeed });
    } else {
      // Calculate final score
      let calculatedScore = 0;
      QUIZ_QUESTIONS.forEach(q => {
        if (selectedAnswers[q.id] === q.correctOptionId) {
          calculatedScore += 1;
        }
      });
      recordQuizScore(calculatedScore, QUIZ_QUESTIONS.length);
      markModuleComplete('penilaian');
      sounds.playFanfare();
      setShowResult(true);
      speakMalay(`Tahniah adik! Anda mendapat ${calculatedScore} bintang daripada 5!`, {
        speed: profile.speechSpeed
      });
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowResult(false);
    setFeedback(null);
  };

  const totalScore = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctOptionId ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Mascot Message */}
      <MascotMessage
        message="Mari uji kehebatan membaca adik dalam Ujian Penilaian Bintang!"
        subMessage="Tekan butang dengar untuk mendengar soalan dan pilih jawapan yang betul."
        audioText="Modul 8: Penilaian Penguasaan Suku Kata. Jawab 5 soalan mudah untuk menangi Sijil Bintang!"
        highlightWord="Ujian Penguasaan"
      />

      {!showResult ? (
        /* Active Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-yellow-300 shadow-xl text-center relative overflow-hidden">
          
          {/* Question Stepper Indicator */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-black font-kids uppercase tracking-wider text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full">
              Soalan {currentIdx + 1} daripada {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex gap-1 text-amber-400">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIdx
                      ? 'bg-amber-500 scale-125'
                      : i < currentIdx
                      ? 'bg-emerald-400'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Prompt */}
          <h3 className="text-2xl sm:text-3xl font-black font-kids text-slate-900 leading-snug mb-3">
            {question.promptText}
          </h3>

          <button
            onClick={handlePlayPrompt}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-2xl text-xs sm:text-sm font-bold font-kids border border-amber-300 shadow-xs mb-8 transition-transform active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>🔊 Dengar Soalan Ceri</span>
          </button>

          {/* Option Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-6">
            {question.options.map((opt: any) => {
              const isSelected = selectedAnswers[question.id] === opt.id;
              const isCorrect = opt.id === question.correctOptionId;
              const hasAnswered = !!selectedAnswers[question.id];

              let buttonStyle = 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300';
              if (isSelected) {
                buttonStyle = isCorrect
                  ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102 ring-4 ring-emerald-300'
                  : 'bg-rose-500 border-rose-600 text-white shadow-md';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-6 rounded-3xl border-3 font-black font-kids text-2xl sm:text-3xl transition-all transform active:scale-95 flex flex-col items-center justify-center gap-2 ${buttonStyle}`}
                >
                  {opt.emoji && <span className="text-4xl mb-1">{opt.emoji}</span>}
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-sm font-bold text-amber-900 max-w-md mx-auto mb-6">
              {feedback}
            </div>
          )}

          {/* Next Button */}
          {selectedAnswers[question.id] && (
            <div className="pt-4 border-t border-slate-100 animate-fade-in">
              <button
                onClick={handleNext}
                className="btn-tactile btn-tactile-coral text-white font-kids font-black text-lg px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 mx-auto"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Soalan Seterusnya' : 'Lihat Keputusan Penilaian!'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-4 border-amber-300 shadow-2xl text-center relative overflow-hidden space-y-6">
          <div className="w-24 h-24 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center mx-auto text-5xl shadow-md">
            🏆
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-black text-amber-800 bg-amber-200/80 px-4 py-1 rounded-full">
              Keputusan Penilaian
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-kids text-slate-900 mt-3">
              Tahniah, {profile.name}!
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Adik telah berjaya menjawab soalan penilaian membaca suku kata.
            </p>
          </div>

          {/* Star Score Box */}
          <div className="p-6 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200 rounded-3xl max-w-sm mx-auto">
            <div className="text-4xl font-black font-kids text-amber-600 mb-2">
              {totalScore} / {QUIZ_QUESTIONS.length}
            </div>
            <div className="flex justify-center gap-1.5 text-3xl">
              {Array.from({ length: QUIZ_QUESTIONS.length }).map((_, i) => (
                <span key={i}>{i < totalScore ? '⭐' : '☆'}</span>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-900 mt-2">
              {totalScore >= 4 ? 'Cemerlang! Adik Bintang Suku Kata!' : 'Bagus! Teruskan latihan bersama Ceri!'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setShowCertificate(true)}
              className="btn-tactile btn-tactile-coral text-white font-kids font-black text-lg px-8 py-3.5 rounded-2xl shadow-xl flex items-center gap-2"
            >
              <Award className="w-6 h-6" />
              <span>Buka & Cetak Sijil Kejayaan</span>
            </button>

            <button
              onClick={handleRestart}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-kids font-bold text-sm border border-slate-300 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulang Penilaian</span>
            </button>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        score={totalScore}
        total={QUIZ_QUESTIONS.length}
      />
    </div>
  );
};
