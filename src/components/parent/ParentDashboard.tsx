import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  Sparkles,
  Volume2,
  User,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  Printer
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { CORE_WORDS } from '../../data/learningData';
import { sounds } from '../../utils/audio';

export const ParentDashboard: React.FC = () => {
  const {
    profile,
    updateProfileName,
    updateAvatar,
    setSpeechSpeed,
    resetProgress,
    setActiveModule
  } = useLearning();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const moduleList = [
    { id: 'huruf', label: 'Modul 1: Kenali Huruf (A-Z)' },
    { id: 'bunyi', label: 'Modul 2: Bunyi Fonik' },
    { id: 'suku_asas', label: 'Modul 3: Suku Kata Asas (KV)' },
    { id: 'gabung', label: 'Modul 4: Gabung Suku Kata' },
    { id: 'baca', label: 'Modul 5: Baca Perkataan' },
    { id: 'eja', label: 'Modul 6: Eja Perkataan' },
    { id: 'permainan', label: 'Modul 7: Latihan Permainan' },
    { id: 'penilaian', label: 'Modul 8: Ujian Penilaian' },
  ];

  const completedCount = moduleList.filter(m => profile.completedModules[m.id]).length;
  const progressPercent = Math.round((completedCount / moduleList.length) * 100);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileName(tempName);
    setIsEditingName(false);
    sounds.playSuccess();
  };

  const avatars = ['🐱', '🐰', '🐯', '🐼', '🦁', '🐻'];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Banner with back button */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => {
              sounds.playPop();
              setActiveModule('huruf');
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Mod Pembelajaran Kanak-Kanak</span>
          </button>

          <h1 className="text-2xl sm:text-3xl font-black font-kids text-slate-900">
            Portal Pemantauan Ibu Bapa & Guru
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau perkembangan membaca, penguasaan suku kata, dan skor latihan anak murid anda secara masa nyata.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-300 print:hidden self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Laporan</span>
        </button>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-18 h-18 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {profile.avatar}
          </div>

          <div className="flex-1">
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-3 py-1.5 border-2 border-amber-400 rounded-xl font-kids font-bold text-lg text-slate-800 w-44"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold"
                >
                  Simpan
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-kids text-slate-900">
                  {profile.name}
                </h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-amber-700 hover:underline font-bold"
                >
                  Tukar Nama
                </button>
              </div>
            )}
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Kanak-kanak Prasekolah (5–6 Tahun)
            </p>

            {/* Avatar picker */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 font-medium">Avatar:</span>
              {avatars.map((av) => (
                <button
                  key={av}
                  onClick={() => { sounds.playPop(); updateAvatar(av); }}
                  className={`w-7 h-7 rounded-lg text-base flex items-center justify-center transition-all ${
                    profile.avatar === av ? 'bg-amber-200 scale-110' : 'hover:bg-slate-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audio Speech Speed Setting for Parents */}
        <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2">
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Kelajuan Sebutan Suara Fonik:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playPop(); setSpeechSpeed('slow'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                profile.speechSpeed === 'slow'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Perlahan (Disyorkan 5 Tahun)
            </button>
            <button
              onClick={() => { sounds.playPop(); setSpeechSpeed('normal'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                profile.speechSpeed === 'normal'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Biasa (6 Tahun)
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress % */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Kemajuan Modul</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black font-kids text-slate-900 tabular-nums">
            {progressPercent}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {completedCount} daripada {moduleList.length} modul selesai
          </p>
        </div>

        {/* Mastered Words */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Perkataan Dikuasai</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black font-kids text-emerald-600 tabular-nums">
            {profile.masteredWords.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Perkataan suku kata lancar dibaca & dieja
          </p>
        </div>

        {/* Total Stars */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Bintang Terkumpul</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black font-kids text-amber-500 tabular-nums">
            {profile.stars} ⭐
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Ganjaran usaha & maklum balas positif
          </p>
        </div>

        {/* Learning Duration */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tempoh Masa Belajar</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-3xl font-black font-kids text-sky-600 tabular-nums">
            {profile.totalMinutesPlayed} <span className="text-base font-normal text-slate-500">Minit</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Masa aktif pembelajaran berpandu
          </p>
        </div>
      </div>

      {/* Detailed Analysis: Words Mastered vs Words That Need Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mastered Words Section */}
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold font-kids text-slate-900">
              Perkataan Telah Dikuasai ({profile.masteredWords.length})
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Murid telah berjaya membaca dan mengeja perkataan ini dengan betul.
          </p>

          {profile.masteredWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.masteredWords.map((word) => (
                <div
                  key={word}
                  className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-kids font-bold text-sm flex items-center gap-1.5"
                >
                  <span>✓</span>
                  <span>{word}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Belum ada perkataan dikuasai. Galakkan anak membuka Modul 4 & 5.
            </p>
          )}
        </div>

        {/* Needs Practice Section */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold font-kids text-slate-900">
              Perkataan Perlu Latihan Tambahan ({profile.practiceWords.length})
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Perkataan yang mungkin memerlukan bimbingan ibu bapa atau guru untuk diperkukuhkan sebutannya.
          </p>

          {profile.practiceWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.practiceWords.map((word) => (
                <div
                  key={word}
                  className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-kids font-bold text-sm flex items-center gap-1.5"
                >
                  <span>⏳</span>
                  <span>{word}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-medium">
              Semua perkataan yang diuji berjalan dengan lancar! Tiada kelemahan ketara dikesan.
            </p>
          )}
        </div>
      </div>

      {/* Modules Completion Checklist */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold font-kids text-slate-900 mb-1">
          Status Modul Pembelajaran
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Hierarki pembelajaran berperingkat daripada Kenal Huruf sehingga Penilaian
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {moduleList.map((m) => {
            const isDone = profile.completedModules[m.id];
            return (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
                  isDone
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div>
                  <div className="text-xs font-bold font-kids">{m.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isDone ? 'Selesai' : 'Belum selesai'}
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {isDone ? '✓' : '—'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assessment Quiz History */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold font-kids text-slate-900 mb-1">
          Rekod Skor Ujian Penilaian
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Sejarah markah kuiz penilaian membaca bagi anak murid
        </p>

        {profile.quizScores.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {profile.quizScores.map((scoreItem, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-500" />
                  <div>
                    <span className="font-kids font-bold text-slate-800">
                      Ujian Penguasaan Suku Kata
                    </span>
                    <span className="text-xs text-slate-400 ml-2">({scoreItem.date})</span>
                  </div>
                </div>
                <div className="font-kids font-black text-amber-600 text-base">
                  {scoreItem.score} / {scoreItem.total} Bintang
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            Belum ada rekod ujian. Murid boleh mengambil ujian di Modul 8.
          </p>
        )}
      </div>

      {/* Reset Progress Danger Zone */}
      <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-rose-900 font-kids">
            Set Semula Kemajuan Pembelajaran
          </h4>
          <p className="text-xs text-rose-700">
            Gunakan fungsi ini jika anda ingin memulakan akaun kosong untuk anak murid yang lain.
          </p>
        </div>

        {showConfirmReset ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetProgress();
                setShowConfirmReset(false);
                sounds.playSuccess();
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Pasti, Padam Semua
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              className="px-3 py-2 bg-white text-slate-700 rounded-xl text-xs font-bold border border-slate-200"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 rounded-xl text-xs font-bold transition-colors"
          >
            Reset Kemajuan Anak
          </button>
        )}
      </div>
    </div>
  );
};
