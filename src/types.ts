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
  question: {
    en: string;
    hi: string;
    ur: string;
  };
  options: {
    en: string[];
    hi: string[];
    ur: string[];
  };
  correctAnswer: number;
  explanation: {
    en: string;
    hi: string;
    ur: string;
  };
  imageUrl?: string;
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

export type AppView = 'home' | 'quran' | 'assistant' | 'quiz' | 'hadith' | 'dua' | 'hidayat' | 'tasbeeh' | 'settings' | 'prayer_alarm' | 'privacy' | 'asma_ul_husna' | 'calendar' | 'zakat_calculator' | 'islamic_history' | 'live_ziyarat' | 'islamic_quotes';
