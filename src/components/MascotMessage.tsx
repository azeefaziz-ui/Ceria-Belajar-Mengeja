import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { MASCOT_IMAGE } from '../data/learningData';
import { speakMalay, sounds } from '../utils/audio';
import { useLearning } from '../context/LearningContext';

interface MascotMessageProps {
  message: string;
  subMessage?: string;
  audioText?: string;
  highlightWord?: string;
}

export const MascotMessage: React.FC<MascotMessageProps> = ({
  message,
  subMessage,
  audioText,
  highlightWord
}) => {
  const { profile } = useLearning();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    sounds.playPop();
    setIsSpeaking(true);
    speakMalay(audioText || message, {
      speed: profile.speechSpeed,
      onEnd: () => setIsSpeaking(false)
    });
  };

  return (
    <div className="bg-gradient-to-r from-amber-100/90 via-orange-50/90 to-amber-100/90 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
      {/* Mascot Avatar */}
      <div className="relative shrink-0">
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-sm bg-white">
          <img
            src={MASCOT_IMAGE}
            alt="Si Ceri - Maskot Kucing Ceria"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback to cute graphic
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <span className="text-xs font-black font-kids uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
            Ceri berkata:
          </span>
          {highlightWord && (
            <span className="text-xs font-bold text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-200">
              {highlightWord}
            </span>
          )}
        </div>
        <h2 className="text-base sm:text-lg font-bold font-kids text-slate-800 leading-snug">
          {message}
        </h2>
        {subMessage && (
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
            {subMessage}
          </p>
        )}
      </div>

      {/* Audio Button */}
      <div className="shrink-0">
        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-kids font-bold text-sm shadow-md transition-all active:scale-95 ${
            isSpeaking
              ? 'bg-amber-400 text-amber-900 animate-pulse'
              : 'bg-amber-500 hover:bg-amber-600 text-white hover:shadow-lg'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-5 h-5 animate-bounce" />
              <span>Mendengar...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              <span>Dengar Ceri</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
