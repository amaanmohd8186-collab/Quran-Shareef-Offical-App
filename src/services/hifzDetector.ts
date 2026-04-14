// src/services/hifzDetector.ts

export interface HifzMistake {
  word: string;
  expectedWord: string;
  type: 'missing' | 'incorrect' | 'extra';
  position: number;
}

export interface HifzProgress {
  accuracy: number;
  totalMistakes: number;
  mistakes: HifzMistake[];
}

export class HifzDetectorService {
  private recognition: any = null;
  private expectedText: string = "";

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'ar-SA';
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
    }
  }

  async fetchExpectedText(surahId: number, ayah: number): Promise<string> {
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surahId}:${ayah}/editions/quran-uthmani`);
    const data = await response.json();
    return data.data.text;
  }

  private isRunning: boolean = false;

  async startListening(surahId: number, ayah: number, onResult: (text: string) => void) {
    if (this.isRunning) return;
    this.expectedText = await this.fetchExpectedText(surahId, ayah);
    
    if (!this.recognition) throw new Error("Speech Recognition not supported");

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onResult(transcript);
    };

    this.recognition.onend = () => {
      this.isRunning = false;
    };

    this.recognition.start();
    this.isRunning = true;
  }

  async stopListening(recognizedText: string): Promise<HifzProgress> {
    this.recognition?.stop();
    this.isRunning = false;
    
    // Simple matching logic
    const safeExpectedText = this.expectedText || "";
    const safeRecognizedText = recognizedText || "";
    
    const expectedWords = safeExpectedText.split(' ');
    const recognizedWords = safeRecognizedText.split(' ');
    const mistakes: HifzMistake[] = [];
    
    recognizedWords.forEach((word, index) => {
      if (expectedWords[index] !== word) {
        mistakes.push({ word, expectedWord: expectedWords[index] || '', type: 'incorrect', position: index });
      }
    });

    const accuracy = expectedWords.length > 0 
      ? Math.max(0, 100 - (mistakes.length / expectedWords.length) * 100)
      : 0;
    
    return { accuracy, totalMistakes: mistakes.length, mistakes };
  }
}

export const hifzDetector = new HifzDetectorService();
