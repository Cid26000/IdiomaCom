import React, { useState } from 'react';
import {
  Bookmark,
  Volume2,
  Trash2,
  CheckCircle2,
  RotateCw,
  Search,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle,
  XCircle,
  ChevronRight,
  Flame,
  Check,
  RotateCcw,
  Clock,
  Brain,
  Layers,
  Calendar,
  AlertCircle,
  ArrowRight,
  Zap,
  Plus,
  X,
  Languages,
} from 'lucide-react';
import { SavedWord, WordEntry, SrsRating } from '../types';
import { speakText } from '../utils/audio';
import { TRILINGUAL_DICTIONARY, searchTrilingualDictionary, cleanWord } from '../data/dictionary';
import {
  calculateNextSrsState,
  getDueWords,
  isWordDue,
  getNextDueTimeLabel,
  formatIntervalDays,
  SRS_STAGES_INFO,
} from '../utils/srsAlgorithm';

interface VocabularyNotebookProps {
  savedWords: SavedWord[];
  onToggleMastered: (enWord: string) => void;
  onRemoveWord: (enWord: string) => void;
  onUpdateWordSrs?: (enWord: string, rating: SrsRating) => void;
  onAddWord?: (word: WordEntry) => void;
  onBackToReader: () => void;
}

type ViewMode = 'list' | 'flashcards' | 'srs' | 'quiz';

interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  isArabic?: boolean;
  isCorrect: boolean;
}

interface QuizQuestion {
  targetWord: SavedWord;
  direction: 'en_to_ar' | 'ar_to_en';
  questionTitle: string;
  promptText: string;
  promptSubtext?: string;
  promptAudio?: string;
  isArabicPrompt?: boolean;
  options: QuizOption[];
}

export const VocabularyNotebook: React.FC<VocabularyNotebookProps> = ({
  savedWords,
  onToggleMastered,
  onRemoveWord,
  onUpdateWordSrs,
  onAddWord,
  onBackToReader,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'due' | 'learning' | 'mastered'>('all');

  // Manual Trilingual Dictionary Search State
  const [dictQuery, setDictQuery] = useState('');
  const [dictFeedback, setDictFeedback] = useState<{ word: string; message: string } | null>(null);

  const dictResults = dictQuery.trim() ? searchTrilingualDictionary(dictQuery.trim(), 12) : [];

  // Flashcard Mode State
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // SRS Dedicated Review Session State
  const [srsIndex, setSrsIndex] = useState(0);
  const [isSrsCardFlipped, setIsSrsCardFlipped] = useState(false);
  const [isSrsFinished, setIsSrsFinished] = useState(false);
  const [srsSessionLogs, setSrsSessionLogs] = useState<{ en: string; rating: SrsRating; nextDays: number }[]>([]);

  // Quiz Mode State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [mistakes, setMistakes] = useState<SavedWord[]>([]);

  // Calculate Due Words for Spaced Repetition
  const dueWords = getDueWords(savedWords);

  // Filtered words for List / Flashcards
  const filteredWords = savedWords.filter((w) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      w.en.toLowerCase().includes(term) ||
      w.fr.toLowerCase().includes(term) ||
      w.ar.includes(term);

    if (!matchesSearch) return false;
    if (filterMode === 'due') return isWordDue(w);
    if (filterMode === 'learning') return !w.mastered;
    if (filterMode === 'mastered') return w.mastered;
    return true;
  });

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];
  const currentSrsWord = dueWords[srsIndex] || dueWords[0];

  const handleNextFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((idx) => (idx + 1) % (filteredWords.length || 1));
  };

  const handlePrevFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex((idx) => (idx - 1 + filteredWords.length) % (filteredWords.length || 1));
  };

  // Start dedicated SRS review session
  const handleStartSrsSession = () => {
    setSrsIndex(0);
    setIsSrsCardFlipped(false);
    setIsSrsFinished(false);
    setSrsSessionLogs([]);
    setViewMode('srs');
  };

  // Handle rating a word in SRS or Flashcard mode
  const handleGradeWord = (word: SavedWord, rating: SrsRating, fromSrsMode = false) => {
    if (onUpdateWordSrs) {
      onUpdateWordSrs(word.en, rating);
    }
    const nextState = calculateNextSrsState(word, rating);

    if (fromSrsMode) {
      setSrsSessionLogs((prev) => [
        ...prev,
        { en: word.en, rating, nextDays: nextState.intervalDays || 1 },
      ]);

      if (srsIndex < dueWords.length - 1) {
        setSrsIndex((idx) => idx + 1);
        setIsSrsCardFlipped(false);
      } else {
        setIsSrsFinished(true);
      }
    } else {
      // In flashcards mode, advance to next card
      handleNextFlashcard();
    }
  };

  // Helper to build quiz questions from a list of words
  const buildQuizFromWords = (wordsToTest: SavedWord[]) => {
    if (wordsToTest.length === 0) {
      setQuizQuestions([]);
      return;
    }

    const dictEntries = Object.values(TRILINGUAL_DICTIONARY);

    const questions: QuizQuestion[] = wordsToTest.map((word, idx) => {
      // Alternate between EN -> AR and AR -> EN
      const direction: 'en_to_ar' | 'ar_to_en' = idx % 2 === 0 ? 'en_to_ar' : 'ar_to_en';

      let correctOption: QuizOption;
      const distractorPool: (SavedWord | WordEntry)[] = wordsToTest.filter((w) => w.en !== word.en);

      // Pad with dictionary entries if notebook has few words
      if (distractorPool.length < 3) {
        for (const entry of dictEntries) {
          if (entry.en.toLowerCase() !== word.en.toLowerCase() && !distractorPool.some((d) => d.en === entry.en)) {
            distractorPool.push(entry);
            if (distractorPool.length >= 6) break;
          }
        }
      }

      // Shuffle and pick 3 distractors
      const shuffledDistractors = distractorPool.sort(() => 0.5 - Math.random()).slice(0, 3);

      if (direction === 'en_to_ar') {
        correctOption = {
          id: `opt-correct-${word.en}`,
          label: word.ar,
          sublabel: `FR: ${word.fr}`,
          isArabic: true,
          isCorrect: true,
        };

        const distractorOptions: QuizOption[] = shuffledDistractors.map((d, dIdx) => ({
          id: `opt-distractor-${d.en}-${dIdx}`,
          label: d.ar,
          sublabel: `FR: ${d.fr}`,
          isArabic: true,
          isCorrect: false,
        }));

        const allOptions = [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random());

        return {
          targetWord: word,
          direction,
          questionTitle: 'Quelle est la traduction en arabe ?',
          promptText: word.en,
          promptSubtext: `Sens français : ${word.fr}`,
          promptAudio: word.en,
          isArabicPrompt: false,
          options: allOptions,
        };
      } else {
        correctOption = {
          id: `opt-correct-${word.en}`,
          label: word.en,
          sublabel: word.phonetic || `FR: ${word.fr}`,
          isArabic: false,
          isCorrect: true,
        };

        const distractorOptions: QuizOption[] = shuffledDistractors.map((d, dIdx) => ({
          id: `opt-distractor-${d.en}-${dIdx}`,
          label: d.en,
          sublabel: d.phonetic || `FR: ${d.fr}`,
          isArabic: false,
          isCorrect: false,
        }));

        const allOptions = [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random());

        return {
          targetWord: word,
          direction,
          questionTitle: 'Quel mot anglais correspond à ce terme ?',
          promptText: word.ar,
          promptSubtext: `Sens français : « ${word.fr} »`,
          promptAudio: word.en,
          isArabicPrompt: true,
          options: allOptions,
        };
      }
    });

    // Shuffle questions
    const finalShuffled = questions.sort(() => 0.5 - Math.random());
    setQuizQuestions(finalShuffled);
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setStreak(0);
    setMistakes([]);
    setIsQuizFinished(false);
  };

  const handleStartQuiz = (words: SavedWord[] = savedWords) => {
    buildQuizFromWords(words);
    setViewMode('quiz');
  };

  // Submit option in Quiz (also informs SRS)
  const handleSelectQuizOption = (option: QuizOption) => {
    if (isAnswerSubmitted) return;

    setSelectedOptionId(option.id);
    setIsAnswerSubmitted(true);

    const currentQ = quizQuestions[currentQuestionIdx];

    if (option.isCorrect) {
      setQuizScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      if (currentQ?.promptAudio) {
        speakText(currentQ.promptAudio, 'en-US');
      }
      // Inform SRS of correct recall
      if (onUpdateWordSrs && currentQ) {
        onUpdateWordSrs(currentQ.targetWord.en, streak >= 2 ? 'easy' : 'good');
      }
    } else {
      setStreak(0);
      if (currentQ) {
        setMistakes((prev) => [...prev, currentQ.targetWord]);
        // Inform SRS of failed recall
        if (onUpdateWordSrs) {
          onUpdateWordSrs(currentQ.targetWord.en, 'again');
        }
      }
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const currentQuizQ = quizQuestions[currentQuestionIdx];

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col flex-1">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-blue-600 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" />
                Algorithme SRS (SuperMemo SM-2)
              </span>
              <span aria-hidden="true">·</span>
              <span>{savedWords.length} mots enregistrés</span>
              {dueWords.length > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    🔥 {dueWords.length} à réviser aujourd'hui
                  </span>
                </>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-600" />
              <span>Mon Carnet & Répétition Espacée</span>
            </h1>
          </div>

          {/* Mode Switchers */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>Liste</span>
            </button>

            {/* Dedicated SRS Review Mode Button */}
            <button
              onClick={handleStartSrsSession}
              disabled={dueWords.length === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                viewMode === 'srs'
                  ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-300'
                  : dueWords.length > 0
                  ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-300 text-purple-900 hover:bg-purple-100 shadow-2xs'
                  : 'bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
              }`}
              title="Réviser les mots dont l'intervalle est atteint"
            >
              <Brain className="w-3.5 h-3.5 text-purple-600" />
              <span>Révision SRS</span>
              {dueWords.length > 0 && (
                <span className="bg-purple-600 text-white text-[10px] font-black px-1.5 rounded-full">
                  {dueWords.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setViewMode('flashcards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'flashcards'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => handleStartQuiz(savedWords)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === 'quiz'
                  ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Quiz QCM</span>
            </button>

            <button
              onClick={onBackToReader}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lire</span>
            </button>
          </div>
        </div>

        {/* SRS Callout Banner if words are due and user is in list mode */}
        {viewMode === 'list' && dueWords.length > 0 && (
          <div className="mt-4 p-3.5 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-purple-950">
                  Répétition espacée : {dueWords.length} mot{dueWords.length > 1 ? 's' : ''} à réviser
                </h4>
                <p className="text-[11px] text-purple-800/80">
                  Le moment idéal calculé par l'algorithme est arrivé pour ancrer ces termes dans votre mémoire à long terme.
                </p>
              </div>
            </div>
            <button
              onClick={handleStartSrsSession}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Lancer la révision ({dueWords.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter & Search Bar (Only shown in List mode) */}
        {viewMode === 'list' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 mt-4 pt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrer dans mes mots enregistrés..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-xs overflow-x-auto">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tous ({savedWords.length})
              </button>
              <button
                onClick={() => setFilterMode('due')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === 'due'
                    ? 'bg-purple-600 text-white shadow-xs font-bold'
                    : 'text-purple-700 hover:text-purple-900 font-semibold'
                }`}
              >
                🔥 À réviser ({dueWords.length})
              </button>
              <button
                onClick={() => setFilterMode('learning')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === 'learning'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                À apprendre ({savedWords.filter((w) => !w.mastered).length})
              </button>
              <button
                onClick={() => setFilterMode('mastered')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === 'mastered'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Maîtrisés ({savedWords.filter((w) => w.mastered).length})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* DICTIONNAIRE & RECHERCHE MANUELLE TRILINGUE (EN / FR / AR)     */}
      {/* ============================================================== */}
      {viewMode === 'list' && (
        <div className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 rounded-2xl border border-blue-200/80 p-5 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    Dictionnaire & Recherche Rapide
                  </h2>
                  <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200 hidden sm:inline">
                    Anglais 🇬🇧 ⇄ Français 🇫🇷 ⇄ Arabe 🇸🇦
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Cherchez manuellement un mot pour obtenir sa traduction instantanée en arabe et français, sa prononciation audio et l'ajouter à vos révisions.
                </p>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dictQuery}
                onChange={(e) => setDictQuery(e.target.value)}
                placeholder="Entrez un mot à chercher (ex: peace, voyage, سلام, future, santé, hope, liberté)..."
                className="w-full bg-white border border-slate-300 hover:border-slate-400 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs transition-all"
              />
              {dictQuery && (
                <button
                  onClick={() => setDictQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer transition-colors"
                  title="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {dictQuery && (
              <button
                onClick={() => setDictQuery('')}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl cursor-pointer transition-colors shrink-0"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Quick suggestion chips */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap text-xs text-slate-500">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Suggestions :</span>
            {['peace', 'voyage', 'سلام', 'knowledge', 'santé', 'future', 'sustainable', 'liberté', 'nature'].map((sample) => (
              <button
                key={sample}
                onClick={() => setDictQuery(sample)}
                className="px-2.5 py-0.5 rounded-lg bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200/80 text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Results Grid when search query is typed */}
          {dictQuery.trim() && (
            <div className="mt-4 pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  {dictResults.length} traduction{dictResults.length > 1 ? 's' : ''} trouvée{dictResults.length > 1 ? 's' : ''} pour « <span className="text-blue-600 font-bold">{dictQuery}</span> »
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Cliquez sur « + Ajouter » pour programmer la répétition espacée (SRS)
                </span>
              </div>

              {dictResults.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-slate-500 text-xs">
                  Aucun résultat direct trouvé pour « {dictQuery} ». Essayez avec un mot en anglais, français ou arabe sans ponctuation.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {dictResults.map((entry) => {
                    const isAlreadySaved = savedWords.some((w) => cleanWord(w.en) === cleanWord(entry.en));
                    const savedEntry = isAlreadySaved ? savedWords.find((w) => cleanWord(w.en) === cleanWord(entry.en)) : null;
                    const stageInfo = savedEntry ? SRS_STAGES_INFO[Math.min(savedEntry.srsStage || 0, 6)] : null;
                    const isJustAdded = dictFeedback?.word === entry.en;

                    return (
                      <div
                        key={entry.en}
                        className="bg-white rounded-xl border border-slate-200/90 hover:border-blue-300 p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        {/* Word Header */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="text-base font-bold text-slate-900">
                                {entry.en}
                              </span>
                              {entry.phonetic && (
                                <span className="text-xs text-slate-400 font-mono ml-2">
                                  {entry.phonetic}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {entry.type && (
                                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {entry.type}
                                </span>
                              )}
                              <button
                                onClick={() => speakText(entry.en, 'en-US')}
                                className="p-1.5 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Écouter la prononciation"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* French Translation */}
                          <div className="text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 mb-2.5 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-blue-600 uppercase shrink-0">FR</span>
                            <span className="font-medium text-slate-800">{entry.fr}</span>
                          </div>

                          {/* Arabic Translation */}
                          <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-lg p-2.5 mb-3 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase shrink-0">AR</span>
                            <span
                              dir="rtl"
                              className="font-arabic text-xl font-bold text-emerald-950 text-right leading-tight"
                            >
                              {entry.ar}
                            </span>
                          </div>
                        </div>

                        {/* Action Footer */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          {isAlreadySaved ? (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 w-full justify-between">
                              <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Dans le carnet</span>
                              </span>
                              {stageInfo && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stageInfo.badge}`}>
                                  {stageInfo.label}
                                </span>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                if (onAddWord) {
                                  onAddWord(entry);
                                  setDictFeedback({ word: entry.en, message: 'Ajouté !' });
                                  setTimeout(() => setDictFeedback(null), 2500);
                                }
                              }}
                              className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isJustAdded
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-sm'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Ajouté au carnet !</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Ajouter au carnet de révision</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. DEDICATED SRS SPACED REPETITION REVIEW MODE                 */}
      {/* ============================================================== */}
      {viewMode === 'srs' && (
        dueWords.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 max-w-xl mx-auto w-full">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Toutes vos révisions sont à jour !
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Aucun mot n'est en attente pour le moment. L'algorithme vous préviendra dès que le prochain palier sera atteint.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setViewMode('list')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Voir la liste complète
              </button>
              <button
                onClick={() => setViewMode('flashcards')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Réviser en mode libre
              </button>
            </div>
          </div>
        ) : isSrsFinished ? (
          /* SRS Summary Screen */
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 text-center max-w-xl mx-auto w-full animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
              Session SRS Validée !
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Vous avez revu {srsSessionLogs.length} mot(s). Leurs intervalles de révision ont été prolongés pour renforcer votre mémoire.
            </p>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl mb-6 text-left max-h-60 overflow-y-auto">
              {srsSessionLogs.map((log) => (
                <div key={log.en} className="p-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{log.en}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        log.rating === 'easy'
                          ? 'bg-blue-100 text-blue-800'
                          : log.rating === 'good'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.rating === 'hard'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {log.rating === 'easy'
                        ? 'Facile'
                        : log.rating === 'good'
                        ? 'Bien'
                        : log.rating === 'hard'
                        ? 'Difficile'
                        : 'À revoir'}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      Prochaine : {formatIntervalDays(log.nextDays)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setViewMode('list')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Retour au carnet
              </button>
              <button
                onClick={() => handleStartQuiz(savedWords)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tester en Quiz QCM</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active SRS Flashcard with 4 Rating Buttons */
          <div className="flex flex-col items-center max-w-lg mx-auto w-full">
            {/* Progress Header */}
            <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>
                Carte {srsIndex + 1} sur {dueWords.length}
              </span>
              <span className="text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                SRS Stage {currentSrsWord.srsStage || 0} ({formatIntervalDays(currentSrsWord.intervalDays || 0)})
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((srsIndex + 1) / dueWords.length) * 100}%` }}
              />
            </div>

            {/* Flip Card */}
            <div
              onClick={() => setIsSrsCardFlipped(!isSrsCardFlipped)}
              className="w-full min-h-[300px] bg-white rounded-2xl border border-slate-200 shadow-md p-7 flex flex-col justify-between cursor-pointer transition-all hover:border-purple-300 relative select-none"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-purple-600">
                  {isSrsCardFlipped ? 'Verso (Sens)' : 'Recto (Rappel actif)'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isSrsCardFlipped ? 'Évaluez votre rappel ci-dessous' : 'Cliquez pour révéler'}
                </span>
              </div>

              {/* Card Center */}
              <div className="my-auto text-center py-6">
                {!isSrsCardFlipped ? (
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {currentSrsWord.en}
                    </h2>
                    {currentSrsWord.phonetic && (
                      <div className="text-sm font-mono text-slate-500 mt-2">
                        {currentSrsWord.phonetic}
                      </div>
                    )}
                    {currentSrsWord.type && (
                      <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-md mt-3 font-medium">
                        {currentSrsWord.type}
                      </span>
                    )}
                    <p className="text-xs text-slate-400 mt-6">
                      (Cliquez pour afficher la traduction et évaluer votre mémorisation)
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                      Traduction en français
                    </div>
                    <div className="text-xl font-bold text-slate-800 mb-4">
                      {currentSrsWord.fr}
                    </div>

                    <div className="text-xs uppercase tracking-wider text-amber-700/80 font-bold mb-1">
                      Traduction en arabe
                    </div>
                    <div
                      dir="rtl"
                      className="font-arabic text-3xl font-bold text-amber-900"
                    >
                      {currentSrsWord.ar}
                    </div>
                  </div>
                )}
              </div>

              {/* Audio button at card bottom */}
              <div
                className="flex items-center justify-between border-t border-slate-100 pt-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => speakText(currentSrsWord.en, 'en-US')}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Prononciation</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  Révisions totales : {currentSrsWord.reviewCount || 0}
                </span>
              </div>
            </div>

            {/* 4 SuperMemo Rating Buttons (Only shown when card is flipped) */}
            {isSrsCardFlipped ? (
              <div className="w-full mt-4">
                <div className="text-center text-xs font-semibold text-slate-500 mb-2">
                  Comment avez-vous mémorisé ce mot ?
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {/* Again (1j) */}
                  <button
                    onClick={() => handleGradeWord(currentSrsWord, 'again', true)}
                    className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/80 hover:bg-rose-100 text-rose-900 flex flex-col items-center transition-all cursor-pointer shadow-2xs"
                  >
                    <span className="text-xs font-bold">À revoir</span>
                    <span className="text-[10px] text-rose-600 font-mono mt-0.5">
                      {formatIntervalDays(calculateNextSrsState(currentSrsWord, 'again').intervalDays || 1)}
                    </span>
                  </button>

                  {/* Hard */}
                  <button
                    onClick={() => handleGradeWord(currentSrsWord, 'hard', true)}
                    className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/80 hover:bg-amber-100 text-amber-900 flex flex-col items-center transition-all cursor-pointer shadow-2xs"
                  >
                    <span className="text-xs font-bold">Difficile</span>
                    <span className="text-[10px] text-amber-600 font-mono mt-0.5">
                      {formatIntervalDays(calculateNextSrsState(currentSrsWord, 'hard').intervalDays || 1)}
                    </span>
                  </button>

                  {/* Good */}
                  <button
                    onClick={() => handleGradeWord(currentSrsWord, 'good', true)}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 flex flex-col items-center transition-all cursor-pointer shadow-2xs"
                  >
                    <span className="text-xs font-bold">Bien</span>
                    <span className="text-[10px] text-emerald-600 font-mono mt-0.5">
                      {formatIntervalDays(calculateNextSrsState(currentSrsWord, 'good').intervalDays || 3)}
                    </span>
                  </button>

                  {/* Easy */}
                  <button
                    onClick={() => handleGradeWord(currentSrsWord, 'easy', true)}
                    className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-900 flex flex-col items-center transition-all cursor-pointer shadow-2xs"
                  >
                    <span className="text-xs font-bold">Facile</span>
                    <span className="text-[10px] text-blue-600 font-mono mt-0.5">
                      {formatIntervalDays(calculateNextSrsState(currentSrsWord, 'easy').intervalDays || 7)}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full mt-4 text-center">
                <button
                  onClick={() => setIsSrsCardFlipped(true)}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  Afficher la réponse
                </button>
              </div>
            )}
          </div>
        )
      )}

      {/* ============================================================== */}
      {/* 2. QUIZ QCM MODE (ACTIVE MEMORIZATION)                         */}
      {/* ============================================================== */}
      {viewMode === 'quiz' && (
        <div className="flex flex-col flex-1">
          {savedWords.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Votre carnet est vide
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Survolez des mots dans les textes bilingues et cliquez sur le marque-page pour constituer votre carnet avant de lancer un quiz.
              </p>
              <button
                onClick={onBackToReader}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Retourner à la lecture
              </button>
            </div>
          ) : isQuizFinished ? (
            /* Quiz Victory / Summary Screen */
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 text-center max-w-xl mx-auto w-full animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
                <Award className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                Quiz de Vocabulaire Terminé !
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Félicitations pour cette session de mémorisation active sur vos mots enregistrés.
              </p>

              {/* Big Score Stats */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6 text-center">
                <div>
                  <div className="text-2xl font-extrabold text-blue-600 font-mono">
                    {quizScore} / {quizQuestions.length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Score ({Math.round((quizScore / (quizQuestions.length || 1)) * 100)}%)
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-amber-600 font-mono">
                    {streak} max
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Série sans faute
                  </div>
                </div>
              </div>

              {/* Mistakes to review */}
              {mistakes.length > 0 && (
                <div className="text-left mb-6">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Mots à revoir en priorité ({mistakes.length}) :</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-rose-50/50 rounded-xl border border-rose-100 p-2">
                    {mistakes.map((w) => (
                      <div key={w.en} className="py-1.5 px-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{w.en}</span>
                        <span className="text-slate-600">{w.fr}</span>
                        <span dir="rtl" className="font-arabic font-bold text-amber-900">
                          {w.ar}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => buildQuizFromWords(savedWords)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Recommencer le quiz
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Retour au carnet
                </button>
              </div>
            </div>
          ) : currentQuizQ ? (
            /* Active Quiz Question Card */
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-xl mx-auto w-full">
              {/* Question Header & Progress */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <span className="font-semibold text-blue-600">
                  Question {currentQuestionIdx + 1} / {quizQuestions.length}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    {streak}
                  </span>
                  <span>Score: {quizScore}</span>
                </div>
              </div>

              {/* Prompt Box */}
              <div className="text-center py-6 px-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">
                  {currentQuizQ.questionTitle}
                </span>

                <div className="flex items-center justify-center gap-3">
                  <span
                    dir={currentQuizQ.isArabicPrompt ? 'rtl' : 'ltr'}
                    className={`font-bold text-slate-900 ${
                      currentQuizQ.isArabicPrompt
                        ? 'font-arabic text-3xl sm:text-4xl text-amber-950'
                        : 'text-2xl sm:text-3xl'
                    }`}
                  >
                    {currentQuizQ.promptText}
                  </span>

                  {currentQuizQ.promptAudio && (
                    <button
                      onClick={() => speakText(currentQuizQ.promptAudio!, 'en-US')}
                      className="p-2 rounded-full bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 transition-colors shadow-xs cursor-pointer"
                      title="Écouter la prononciation anglaise"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {currentQuizQ.promptSubtext && (
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    {currentQuizQ.promptSubtext}
                  </p>
                )}
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentQuizQ.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let cardStyle =
                    'bg-slate-50 hover:bg-blue-50/60 border-slate-200 hover:border-blue-400 text-slate-800';

                  if (isAnswerSubmitted) {
                    if (opt.isCorrect) {
                      cardStyle =
                        'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300 font-semibold shadow-xs';
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle =
                        'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300 shadow-xs';
                    } else {
                      cardStyle = 'bg-slate-50 opacity-40 border-slate-200 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectQuizOption(opt)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[78px] cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          dir={opt.isArabic ? 'rtl' : 'ltr'}
                          className={`font-bold ${
                            opt.isArabic ? 'font-arabic text-xl text-amber-950' : 'text-base'
                          }`}
                        >
                          {opt.label}
                        </span>

                        {isAnswerSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </div>

                      {opt.sublabel && (
                        <span className="text-[11px] text-slate-500 mt-1 truncate">
                          {opt.sublabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Actions after answer */}
              {isAnswerSubmitted && (
                <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedOptionId &&
                    currentQuizQ.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Exact ! Mémorisation validée.</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-rose-700 font-semibold text-xs">
                        <XCircle className="w-4 h-4 shrink-0" />
                        <span>
                          Bonne réponse : <strong>{currentQuizQ.targetWord.en}</strong> ={' '}
                          <strong dir="rtl" className="font-arabic font-bold text-sm">
                            {currentQuizQ.targetWord.ar}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleMastered(currentQuizQ.targetWord.en)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        currentQuizQ.targetWord.mastered
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                      title="Marquer comme su dans votre carnet"
                    >
                      {currentQuizQ.targetWord.mastered ? '✓ Maîtrisé' : 'Marquer comme su'}
                    </button>

                    <button
                      onClick={handleNextQuizQuestion}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <span>
                        {currentQuestionIdx < quizQuestions.length - 1 ? 'Suivant' : 'Résultats'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. FLASHCARD MODE (FREE STUDY WITH SRS RATING OPTION)           */}
      {/* ============================================================== */}
      {viewMode === 'flashcards' && (
        filteredWords.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            Aucun mot à réviser selon vos critères de recherche.
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Flashcard container */}
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="w-full max-w-lg min-h-[300px] bg-white rounded-2xl border border-slate-200/90 shadow-lg p-8 flex flex-col justify-between cursor-pointer transition-all hover:border-blue-300 relative select-none"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Carte {flashcardIndex + 1} sur {filteredWords.length}</span>
                <span className="font-semibold text-blue-600">
                  {isCardFlipped ? 'Verso (Traductions)' : 'Recto (Anglais)'}
                </span>
              </div>

              {/* Card Center Content */}
              <div className="my-auto text-center py-6">
                {!isCardFlipped ? (
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {currentFlashcard.en}
                    </h2>
                    {currentFlashcard.phonetic && (
                      <div className="text-sm font-mono text-slate-500 mt-2">
                        {currentFlashcard.phonetic}
                      </div>
                    )}
                    {currentFlashcard.type && (
                      <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded mt-3">
                        {currentFlashcard.type}
                      </span>
                    )}
                    <p className="text-xs text-slate-400 mt-6">
                      (Cliquez sur la carte pour retourner)
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                      Traduction en français
                    </div>
                    <div className="text-xl font-bold text-slate-800 mb-5">
                      {currentFlashcard.fr}
                    </div>

                    <div className="text-xs uppercase tracking-wider text-amber-700/80 font-bold mb-1">
                      Traduction en arabe
                    </div>
                    <div
                      dir="rtl"
                      className="font-arabic text-3xl font-bold text-amber-900"
                    >
                      {currentFlashcard.ar}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions on Card */}
              <div
                className="flex items-center justify-between border-t border-slate-100 pt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => speakText(currentFlashcard.en, 'en-US')}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Prononciation</span>
                </button>

                <button
                  onClick={() => onToggleMastered(currentFlashcard.en)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    currentFlashcard.mastered
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentFlashcard.mastered ? 'Maîtrisé' : 'Marquer comme su'}</span>
                </button>
              </div>
            </div>

            {/* SRS Quick Grade Buttons if flipped */}
            {isCardFlipped && (
              <div className="w-full max-w-lg mt-4">
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleGradeWord(currentFlashcard, 'again')}
                    className="p-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-semibold text-center cursor-pointer"
                  >
                    À revoir (1j)
                  </button>
                  <button
                    onClick={() => handleGradeWord(currentFlashcard, 'hard')}
                    className="p-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold text-center cursor-pointer"
                  >
                    Difficile (~2j)
                  </button>
                  <button
                    onClick={() => handleGradeWord(currentFlashcard, 'good')}
                    className="p-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold text-center cursor-pointer"
                  >
                    Bien (~1 sem.)
                  </button>
                  <button
                    onClick={() => handleGradeWord(currentFlashcard, 'easy')}
                    className="p-2 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold text-center cursor-pointer"
                  >
                    Facile (~2-4 sem.)
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handlePrevFlashcard}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                ← Précédent
              </button>
              <button
                onClick={handleNextFlashcard}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                Suivant →
              </button>
            </div>
          </div>
        )
      )}

      {/* ============================================================== */}
      {/* 4. LIST / TABLE MODE WITH SRS INDICATORS                       */}
      {/* ============================================================== */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          {filteredWords.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Aucun mot enregistré pour le moment dans cette catégorie.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredWords.map((item) => {
                const isDue = isWordDue(item);
                const stageInfo = SRS_STAGES_INFO[Math.min(item.srsStage || 0, 6)];

                return (
                  <div
                    key={item.en}
                    className={`p-4 transition-colors flex items-center justify-between gap-4 ${
                      isDue ? 'bg-purple-50/30 hover:bg-purple-50/60' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => onToggleMastered(item.en)}
                        className={`shrink-0 p-1 rounded-full transition-colors cursor-pointer ${
                          item.mastered
                            ? 'text-emerald-600 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-slate-400'
                        }`}
                        title={item.mastered ? 'Mot maîtrisé' : 'Marquer comme su'}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">
                            {item.en}
                          </span>
                          {item.phonetic && (
                            <span className="text-xs text-slate-400 font-mono">
                              {item.phonetic}
                            </span>
                          )}
                          {item.type && (
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-1 rounded">
                              {item.type}
                            </span>
                          )}

                          {/* SRS Stage Badge */}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stageInfo.badge}`}
                            title={`Palier SRS : ${stageInfo.label} (Intervalle actuel : ${formatIntervalDays(item.intervalDays || 0)})`}
                          >
                            Palier {item.srsStage || 0} · {stageInfo.label}
                          </span>

                          {/* Next Review Status Badge */}
                          {isDue ? (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-rose-600 fill-rose-600" />
                              À réviser aujourd'hui
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {getNextDueTimeLabel(item.nextReviewAt)}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 mt-0.5">
                          {item.fr}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Arabic Translation */}
                      <div
                        dir="rtl"
                        className="font-arabic text-lg font-bold text-amber-900 min-w-[100px] text-right"
                      >
                        {item.ar}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakText(item.en, 'en-US')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Écouter la prononciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onRemoveWord(item.en)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Supprimer du carnet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
