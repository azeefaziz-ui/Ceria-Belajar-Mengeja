import React from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { ModuleRoadmap } from './components/ModuleRoadmap';
import { ParentalGateModal } from './components/ParentalGateModal';
import { Modul1KenalHuruf } from './components/modules/Modul1KenalHuruf';
import { Modul2BunyiHuruf } from './components/modules/Modul2BunyiHuruf';
import { Modul3SukuKataAsas } from './components/modules/Modul3SukuKataAsas';
import { Modul4GabungSukuKata } from './components/modules/Modul4GabungSukuKata';
import { Modul5BacaPerkataan } from './components/modules/Modul5BacaPerkataan';
import { Modul6EjaPerkataan } from './components/modules/Modul6EjaPerkataan';
import { Modul7Permainan } from './components/modules/Modul7Permainan';
import { Modul8Penilaian } from './components/modules/Modul8Penilaian';
import { ParentDashboard } from './components/parent/ParentDashboard';

const MainContent: React.FC = () => {
  const { activeModule, showParentGate, setShowParentGate, onParentGateSuccess } = useLearning();

  const renderModule = () => {
    switch (activeModule) {
      case 'huruf':
        return <Modul1KenalHuruf />;
      case 'bunyi':
        return <Modul2BunyiHuruf />;
      case 'suku_asas':
        return <Modul3SukuKataAsas />;
      case 'gabung':
        return <Modul4GabungSukuKata />;
      case 'baca':
        return <Modul5BacaPerkataan />;
      case 'eja':
        return <Modul6EjaPerkataan />;
      case 'permainan':
        return <Modul7Permainan />;
      case 'penilaian':
        return <Modul8Penilaian />;
      case 'ibu_bapa':
        return <ParentDashboard />;
      default:
        return <Modul1KenalHuruf />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      <Navbar />
      {activeModule !== 'ibu_bapa' && <ModuleRoadmap />}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {renderModule()}
      </main>

      {/* Parental Gate Modal */}
      <ParentalGateModal
        isOpen={showParentGate}
        onClose={() => setShowParentGate(false)}
        onSuccess={onParentGateSuccess}
      />

      {/* Quiet Footer */}
      <footer className="border-t border-amber-200/60 bg-white/80 py-6 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} CERIA SUKU KATA · Aplikasi Pembelajaran Awal Suku Kata Bahasa Melayu
          </p>
          <p className="text-amber-800/80 font-kids">
            Membaca 10 minit setiap hari merangsang kecerdasan minda si cilik! 🌟
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LearningProvider>
      <MainContent />
    </LearningProvider>
  );
}
