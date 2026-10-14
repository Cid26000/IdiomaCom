export type Level = 'A1-A2 Débutant' | 'B1-B2 Intermédiaire' | 'C1 Avancé';

export interface SentencePair {
  id: string;
  en: string;
  fr: string;
  notes?: string;
}

export interface WordEntry {
  en: string;
  fr: string;
  ar: string;
  phonetic?: string;
  type?: string; // 'nom' | 'verbe' | 'adjectif' | 'adverbe' | 'expression'
  exampleEn?: string;
  exampleAr?: string;
}

export interface ReadingExercise {
  id: string;
  type: 'comprehension' | 'true_false' | 'vocabulary' | 'inference' | 'main_idea';
  typeLabel: string;
  question: string;
  passageSnippet?: string;
  options: string[];
  correctIndex: number;
  explanationFr: string;
  keywordAr: string;
}

export interface ListeningExercise {
  id: string;
  type: 'dictation' | 'audio_mcq' | 'audio_true_false' | 'discrimination' | 'audio_fill';
  typeLabel: string;
  audioText: string;
  question: string;
  options: string[];
  correctIndex: number;
  expectedText?: string;
  explanationFr: string;
  keywordAr: string;
}

export interface WritingExercise {
  id: string;
  type: 'scramble' | 'error_correction' | 'typing_cloze' | 'translation' | 'transformation';
  typeLabel: string;
  instructionFr: string;
  promptText: string;
  targetAnswer: string;
  acceptableAnswers?: string[];
  shuffledWords?: string[];
  options?: string[];
  hintAr: string;
  explanationFr: string;
}

// Legacy format aliases for backward-compatibility
export interface ClozeExercise {
  id: string;
  sentenceEn: string;
  targetWord: string;
  sentenceFr: string;
  hintAr: string;
  options: string[];
}

export interface ComprehensionQuestion {
  id: string;
  questionFr: string;
  optionsFr: string[];
  correctIndex: number;
  explanationFr: string;
  keywordAr?: string;
}

export interface MatchingPair {
  id: string;
  en: string;
  fr: string;
  ar: string;
}

export interface SentenceScramble {
  id: string;
  fr: string;
  enFull: string;
  wordsShuffled: string[];
  hintAr?: string;
}

export interface BilingualText {
  id: string;
  titleEn: string;
  titleFr: string;
  titleAr: string;
  level: Level;
  topic: string;
  readTime: string;
  summaryFr: string;
  sentencePairs: SentencePair[];
  keyVocabulary: WordEntry[];
  exercises: {
    reading: ReadingExercise[]; // Minimum 5 exercices
    listening: ListeningExercise[]; // Minimum 5 exercices
    writing: WritingExercise[]; // Minimum 5 exercices
    // Optional legacy fields
    cloze?: ClozeExercise[];
    comprehension?: ComprehensionQuestion[];
    pairs?: MatchingPair[];
    scramble?: SentenceScramble[];
  };
}

export interface HoverWordInfo {
  word: string;
  sourceLang: 'en' | 'fr';
  en: string;
  fr: string;
  ar: string;
  phonetic?: string;
  type?: string;
  sentenceId?: string;
  x: number;
  y: number;
}

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface SavedWord extends WordEntry {
  savedAt: number;
  mastered: boolean;
  reviewCount: number;
  // Spaced Repetition (SRS)
  srsStage?: number; // 0 to 6
  intervalDays?: number; // days until next review
  easeFactor?: number; // default 2.5
  nextReviewAt?: number; // timestamp in ms
  lastReviewedAt?: number; // timestamp in ms
}

export interface DailyLearningActivity {
  date: string; // 'YYYY-MM-DD'
  minutes: number;
  textsRead: number;
  wordsPracticed: number;
  exercisesCompleted: number;
}

export interface UserProgress {
  readTextIds: string[];
  totalLearningSeconds: number;
  dailyHistory: Record<string, DailyLearningActivity>;
  streakDays: number;
  lastActiveDate: string;
}
