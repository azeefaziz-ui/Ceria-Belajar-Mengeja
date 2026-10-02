export type ModuleId =
  | 'huruf'
  | 'bunyi'
  | 'suku_asas'
  | 'gabung'
  | 'baca'
  | 'eja'
  | 'permainan'
  | 'penilaian'
  | 'ibu_bapa';

export interface LetterItem {
  letter: string;
  letterLower: string;
  phoneticSpelling: string; // e.g. 'be' (bukan 'bi'), 'ce', 'de', 'aa'
  word: string;
  meaning: string;
  phonicsIntro: string;
  emoji: string;
  category: 'vokal' | 'konsonan';
  color: string;
}

export interface PhonicsSoundItem {
  id: string;
  letter: string;
  phoneticSpelling: string; // e.g. 'be'
  soundDescription: string;
  soundSample: string;
  tip: string;
  exampleWord: string;
  audioPrompt: string;
}

export interface SyllableWord {
  id: string;
  word: string;
  syllables: [string, string];
  syllableColors: [string, string];
  meaning: string;
  sentence: string;
  image?: string;
  emoji: string;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  stars: number;
  completedModules: Record<string, boolean>;
  masteredWords: string[];
  practiceWords: string[];
  quizScores: {
    date: string;
    score: number;
    total: number;
  }[];
  totalMinutesPlayed: number;
  speechSpeed: 'slow' | 'normal';
}
