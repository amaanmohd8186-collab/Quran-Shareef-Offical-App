import { QuizQuestion } from './types';

export const ISLAMIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: "How many Surahs are there in the Holy Quran?",
    options: ["110", "114", "120", "118"],
    correctAnswer: 1,
    explanation: "The Holy Quran consists of 114 Surahs (chapters)."
  },
  {
    id: '2',
    question: "Which Surah is known as the 'Heart of the Quran'?",
    options: ["Surah Al-Baqarah", "Surah Al-Fatiha", "Surah Yaseen", "Surah Al-Ikhlas"],
    correctAnswer: 2,
    explanation: "Surah Yaseen is often referred to as the Heart of the Quran."
  },
  {
    id: '3',
    question: "Who was the first person to embrace Islam?",
    options: ["Abu Bakr (RA)", "Ali (RA)", "Khadija (RA)", "Umar (RA)"],
    correctAnswer: 2,
    explanation: "Khadija bint Khuwaylid (RA), the wife of Prophet Muhammad (PBUH), was the first to embrace Islam."
  },
  {
    id: '4',
    question: "In which month was the Quran first revealed?",
    options: ["Rajab", "Sha'ban", "Ramadan", "Muharram"],
    correctAnswer: 2,
    explanation: "The Quran was first revealed to Prophet Muhammad (PBUH) during the month of Ramadan."
  },
  {
    id: '5',
    question: "What is the longest Surah in the Quran?",
    options: ["Surah Al-Imran", "Surah Al-Baqarah", "Surah An-Nisa", "Surah Al-Ma'idah"],
    correctAnswer: 1,
    explanation: "Surah Al-Baqarah is the longest Surah in the Quran with 286 verses."
  }
];

export const JUZ_LIST = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: `Juz ${i + 1}`
}));
