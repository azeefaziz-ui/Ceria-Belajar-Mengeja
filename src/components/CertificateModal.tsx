import React from 'react';
import { X, Award, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { MASCOT_IMAGE } from '../data/learningData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  score,
  total
}) => {
  const { profile } = useLearning();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl border-4 border-amber-400 relative my-8 text-center print:border-none print:shadow-none print:p-0">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-8 border-double border-amber-300 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 relative">
          
          {/* Header Badge */}
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md border-2 border-white">
              <Award className="w-9 h-9 text-amber-950" />
            </div>
          </div>

          <h2 className="text-xs sm:text-sm font-black font-kids uppercase tracking-widest text-amber-800">
            SIJIL PENGHARGAAN & PENGUASAAN
          </h2>

          <h1 className="text-3xl sm:text-4xl font-black font-kids text-amber-600 mt-1 mb-2 tracking-tight">
            CERIA SUKU KATA
          </h1>

          <p className="text-xs text-slate-500 font-medium">
            Dengan sukacitanya diperakui bahawa
          </p>

          {/* Child Name */}
          <div className="my-4 py-2 border-b-2 border-amber-300 max-w-md mx-auto">
            <span className="text-2xl sm:text-3xl font-black font-kids text-slate-900 capitalize tracking-wide">
              {profile.avatar} {profile.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-lg mx-auto leading-relaxed">
            telah berjaya menamatkan <span className="font-bold text-amber-900">Penilaian Penguasaan Suku Kata Bahasa Melayu</span> dengan cemerlang dan menguasai asas membaca dengan penuh keceriaan!
          </p>

          {/* Score & Stars */}
          <div className="my-6 inline-flex items-center gap-3 bg-amber-100/80 px-6 py-2.5 rounded-full border border-amber-300">
            <span className="text-base font-bold font-kids text-amber-950">
              Skor: {score} / {total}
            </span>
            <div className="flex gap-1 text-amber-500">
              {Array.from({ length: score }).map((_, i) => (
                <span key={i} className="text-xl">⭐</span>
              ))}
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-200 mt-6 text-xs text-slate-600">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300 mb-1">
                <img src={MASCOT_IMAGE} alt="Ceri" className="w-full h-full object-cover" />
              </div>
              <span className="font-kids font-bold text-amber-900">Si Ceri</span>
              <span className="text-[10px] text-slate-400">Maskot Pembelajaran</span>
            </div>

            <div className="flex flex-col items-center justify-end">
              <span className="font-kids font-bold text-slate-800">{currentDate}</span>
              <span className="text-[10px] text-slate-400">Tarikh Kejayaan</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Hidden when printing) */}
        <div className="flex items-center justify-center gap-3 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-kids font-bold text-sm shadow-md active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sijil</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-kids font-bold text-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
