import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ModuleId, StudentProfile } from '../types';
import { sounds } from '../utils/audio';

interface LearningContextType {
  activeModule: ModuleId;
  setActiveModule: (mod: ModuleId) => void;
  profile: StudentProfile;
  updateProfileName: (name: string) => void;
  updateAvatar: (avatar: string) => void;
  setSpeechSpeed: (speed: 'slow' | 'normal') => void;
  addStars: (count: number) => void;
  markModuleComplete: (moduleId: string) => void;
  markWordMastered: (word: string) => void;
  markWordNeedsPractice: (word: string) => void;
  recordQuizScore: (score: number, total: number) => void;
  resetProgress: () => void;
  triggerConfetti: () => void;
  showParentGate: boolean;
  setShowParentGate: (show: boolean) => void;
  onParentGateSuccess: () => void;
}

const STORAGE_KEY = 'ceria_suku_kata_v1';

const defaultProfile: StudentProfile = {
  name: 'Adik Ceria',
  avatar: '🐱',
  stars: 12,
  completedModules: {
    huruf: true,
  },
  masteredWords: ['BUKU', 'BOLA', 'MATA'],
  practiceWords: ['ROTI'],
  quizScores: [
    { date: 'Hari ini', score: 5, total: 5 }
  ],
  totalMinutesPlayed: 15,
  speechSpeed: 'normal'
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<ModuleId>('huruf');
  const [showParentGate, setShowParentGate] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return defaultProfile;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Track session learning time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setProfile(prev => ({
        ...prev,
        totalMinutesPlayed: prev.totalMinutesPlayed + 1
      }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f97316', '#3b82f6', '#10b981', '#fbbf24', '#ec4899']
      });
    } catch {
      // ignore
    }
  };

  const addStars = (count: number) => {
    sounds.playStarEarned();
    setProfile(prev => ({
      ...prev,
      stars: prev.stars + count
    }));
    triggerConfetti();
  };

  const markModuleComplete = (moduleId: string) => {
    sounds.playFanfare();
    setProfile(prev => ({
      ...prev,
      stars: prev.stars + 5,
      completedModules: {
        ...prev.completedModules,
        [moduleId]: true
      }
    }));
    triggerConfetti();
  };

  const markWordMastered = (word: string) => {
    setProfile(prev => {
      const upper = word.toUpperCase();
      const mastered = Array.from(new Set([...prev.masteredWords, upper]));
      const practice = prev.practiceWords.filter(w => w !== upper);
      return {
        ...prev,
        masteredWords: mastered,
        practiceWords: practice
      };
    });
  };

  const markWordNeedsPractice = (word: string) => {
    setProfile(prev => {
      const upper = word.toUpperCase();
      if (prev.masteredWords.includes(upper)) return prev;
      const practice = Array.from(new Set([...prev.practiceWords, upper]));
      return {
        ...prev,
        practiceWords: practice
      };
    });
  };

  const recordQuizScore = (score: number, total: number) => {
    setProfile(prev => ({
      ...prev,
      stars: prev.stars + score * 2,
      quizScores: [
        {
          date: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' }),
          score,
          total
        },
        ...prev.quizScores.slice(0, 9)
      ]
    }));
  };

  const updateProfileName = (name: string) => {
    setProfile(prev => ({ ...prev, name: name.trim() || 'Adik Ceria' }));
  };

  const updateAvatar = (avatar: string) => {
    setProfile(prev => ({ ...prev, avatar }));
  };

  const setSpeechSpeed = (speechSpeed: 'slow' | 'normal') => {
    setProfile(prev => ({ ...prev, speechSpeed }));
  };

  const resetProgress = () => {
    setProfile({
      ...defaultProfile,
      stars: 0,
      completedModules: {},
      masteredWords: [],
      practiceWords: [],
      quizScores: [],
      totalMinutesPlayed: 0
    });
  };

  const onParentGateSuccess = () => {
    setShowParentGate(false);
    setActiveModule('ibu_bapa');
  };

  return (
    <LearningContext.Provider
      value={{
        activeModule,
        setActiveModule,
        profile,
        updateProfileName,
        updateAvatar,
        setSpeechSpeed,
        addStars,
        markModuleComplete,
        markWordMastered,
        markWordNeedsPractice,
        recordQuizScore,
        resetProgress,
        triggerConfetti,
        showParentGate,
        setShowParentGate,
        onParentGateSuccess
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error('useLearning must be used within LearningProvider');
  return ctx;
};
