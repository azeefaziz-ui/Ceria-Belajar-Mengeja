import React, { useState } from 'react';
import { Lock, X, Check } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ParentalGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentalGateModal: React.FC<ParentalGateModalProps> = ({ isOpen, onClose, onSuccess }) => {
  // Generate random simple math question: e.g. 4 + 7
  const [num1] = useState(() => Math.floor(Math.random() * 6) + 4);
  const [num2] = useState(() => Math.floor(Math.random() * 5) + 3);
  const [inputAnswer, setInputAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  if (!isOpen) return null;

  const expectedAnswer = num1 + num2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(inputAnswer.trim(), 10) === expectedAnswer || inputAnswer.trim() === '1234') {
      sounds.playSuccess();
      setErrorMsg(false);
      onSuccess();
    } else {
      sounds.playPop();
      setErrorMsg(true);
      setInputAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-4 border-amber-300 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold font-kids text-slate-800 mb-1">
          Kawasan Ibu Bapa & Guru
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Sila jawab soalan matematik mudah di bawah atau masukkan PIN <span className="font-mono font-semibold">1234</span> untuk pengesahan dewasa:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <span className="text-2xl font-black font-kids text-amber-900 tracking-wider">
              {num1} + {num2} = ?
            </span>
          </div>

          <input
            type="number"
            autoFocus
            value={inputAnswer}
            onChange={(e) => {
              setInputAnswer(e.target.value);
              setErrorMsg(false);
            }}
            placeholder="Jawapan anda"
            className="w-full text-center text-2xl font-bold py-3 px-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-hidden font-kids bg-slate-50"
          />

          {errorMsg && (
            <p className="text-xs text-rose-600 font-medium">
              Jawapan kurang tepat. Sila cuba lagi atau gunakan PIN 1234.
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
