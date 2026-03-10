export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | any;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Bookmark {
  id: string; // surah:number or ayah:surahNumber:ayahNumberInSurah
  type: 'surah' | 'ayah';
  surahNumber: number;
  surahName: string;
  ayahNumber?: number;
  text?: string;
  translation?: string;
  timestamp: number;
}

export type AppView = 'home' | 'quran' | 'assistant' | 'quiz' | 'hadith' | 'dua' | 'qibla' | 'hidayat' | 'tasbeeh' | 'settings' | 'prayer_alarm' | 'privacy';
