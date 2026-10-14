import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Headphones,
  PenTool,
  CheckCircle2,
  XCircle,
  Volume2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Award,
  HelpCircle,
  ArrowRight,
  VolumeX,
} from 'lucide-react';
import { BilingualText, HoverWordInfo, ReadingExercise, ListeningExercise, WritingExercise } from '../types';
import { speakText, stopSpeech } from '../utils/audio';
import { lookupWord, cleanWord } from '../data/dictionary';
import { FloatingTooltip } from './FloatingTooltip';

interface ExerciseHubProps {
  currentText: BilingualText;
  allTexts: BilingualText[];
  onSelectText: (text: BilingualText) => void;
  onBackToReader: () => void;
  isArabicTooltipEnabled: boolean;
  onToggleArabicTooltip: (enabled: boolean) => void;
}

type PillarSection = 'reading' | 'listening' | 'writing';

export const ExerciseHub: React.FC<ExerciseHubProps> = ({
  currentText,
  allTexts,
  onSelectText,
  onBackToReader,
  isArabicTooltipEnabled,
  onToggleArabicTooltip,
}) => {
  const [activeSection, setActiveSection] = useState<PillarSection>('reading');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'ALL' | 'A1' | 'B1' | 'C1' | 'DIALOGUE' | 'ARTICLE'>('ALL');

  // Exercise Indices (at least 5 per section)
  const [readingIdx, setReadingIdx] = useState(0);
  const [listeningIdx, setListeningIdx] = useState(0);
  const [writingIdx, setWritingIdx] = useState(0);

  // Submission & Answers
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Writing Interactive Word Ordering State (for scramble writing)
  const [shuffledWordBank, setShuffledWordBank] = useState<string[]>([]);
  const [constructedWords, setConstructedWords] = useState<string[]>([]);

  // Scores
  const [scores, setScores] = useState({
    reading: 0,
    listening: 0,
    writing: 0,
  });

  // Audio playing state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Floating Arabic Tooltip on Hover state
  const [hoveredWordInfo, setHoveredWordInfo] = useState<HoverWordInfo | null>(null);

  // Exercise datasets (guaranteed minimum 5 per section)
  const readingExercises = currentText.exercises.reading || [];
  const listeningExercises = currentText.exercises.listening || [];
  const writingExercises = currentText.exercises.writing || [];

  // Reset states on text or section change
  useEffect(() => {
    setSelectedOptionIdx(null);
    setIsAnswerSubmitted(false);
    stopSpeech();
    setIsPlayingAudio(false);
  }, [activeSection, readingIdx, listeningIdx, writingIdx, currentText.id]);

  // Set up writing scramble when entering a scramble question
  useEffect(() => {
    const currentWrit = writingExercises[writingIdx];
    if (currentWrit?.type === 'scramble' && currentWrit.shuffledWords) {
      setShuffledWordBank([...currentWrit.shuffledWords]);
      setConstructedWords([]);
    }
  }, [writingIdx, currentText.id, activeSection]);

  // Handle word hover for Arabic tooltip
  const handleWordHover = (e: React.MouseEvent, rawWord: string, lang: 'en' | 'fr' = 'en') => {
    if (!isArabicTooltipEnabled) return; // Feature disabled by toggle/checkbox
    const cleaned = cleanWord(rawWord);
    if (!cleaned) return;

    const entry = lookupWord(rawWord, lang);
    if (!entry) return;

    setHoveredWordInfo({
      word: rawWord.replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'«»’]+|[.,/#!$%^&*;:{}=\-_`~()?"'«»’]+$/g, ''),
      sourceLang: lang,
      en: entry.en,
      fr: entry.fr,
      ar: entry.ar,
      phonetic: entry.phonetic,
      type: entry.type,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Helper to render interactive words with hover translation
  const renderInteractiveText = (textString: string, lang: 'en' | 'fr' = 'en') => {
    const tokens = textString.split(/(\s+|[.,!?;:«»"'()]+)/);
    return tokens.map((token, idx) => {
      const isWord = /[a-zA-ZÀ-ÿ0-9]/.test(token);
      if (!isWord) {
        return <span key={idx}>{token}</span>;
      }
      return (
        <span
          key={idx}
          onMouseEnter={(e) => handleWordHover(e, token, lang)}
          className="interactive-word hover:bg-amber-100 hover:text-amber-900 transition-colors"
        >
          {token}
        </span>
      );
    });
  };

  // Play audio snippet
  const handlePlayAudio = async (textToSpeak: string) => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    await speakText(textToSpeak, 'en-US', 0.9);
    setIsPlayingAudio(false);
  };

  // Current items
  const currentReading = readingExercises[readingIdx];
  const currentListening = listeningExercises[listeningIdx];
  const currentWriting = writingExercises[writingIdx];

  // Submit Answer Handlers
  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIdx(idx);
    setIsAnswerSubmitted(true);

    if (activeSection === 'reading') {
      if (idx === currentReading?.correctIndex) {
        setScores((prev) => ({ ...prev, reading: prev.reading + 1 }));
      }
    } else if (activeSection === 'listening') {
      if (idx === currentListening?.correctIndex) {
        setScores((prev) => ({ ...prev, listening: prev.listening + 1 }));
      }
    } else if (activeSection === 'writing') {
      if (idx === 0) {
        setScores((prev) => ({ ...prev, writing: prev.writing + 1 }));
      }
    }
  };

  // Scramble word interaction
  const handleAddScrambleWord = (word: string, index: number) => {
    if (isAnswerSubmitted) return;
    setConstructedWords((prev) => [...prev, word]);
    setShuffledWordBank((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveScrambleWord = (word: string, index: number) => {
    if (isAnswerSubmitted) return;
    setConstructedWords((prev) => prev.filter((_, i) => i !== index));
    setShuffledWordBank((prev) => [...prev, word]);
  };

  const handleVerifyScramble = () => {
    if (isAnswerSubmitted || !currentWriting) return;
    const userString = constructedWords.join(' ').toLowerCase().replace(/[.,!?;:]/g, '').trim();
    const targetString = currentWriting.targetAnswer.toLowerCase().replace(/[.,!?;:]/g, '').trim();

    const isCorrect = userString === targetString;
    setIsAnswerSubmitted(true);
    setSelectedOptionIdx(isCorrect ? 0 : 1);

    if (isCorrect) {
      setScores((prev) => ({ ...prev, writing: prev.writing + 1 }));
      speakText(currentWriting.targetAnswer, 'en-US');
    }
  };

  return (
    <div
      className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col flex-1"
      onMouseLeave={() => setHoveredWordInfo(null)}
    >
      {/* Floating Arabic Tooltip on Cursor Hover */}
      <FloatingTooltip
        info={hoveredWordInfo}
        onClose={() => setHoveredWordInfo(null)}
        onSaveWord={() => {}}
        isSaved={false}
      />

      {/* Top Banner Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-blue-600">{currentText.level}</span>
              <span aria-hidden="true">·</span>
              <span>Curriculum 3 Piliers (5+ exercices chacun)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Exercices : {currentText.titleEn}</span>
            </h1>

            {/* Level & Genre Filter Pills in ExerciseHub */}
            <div className="flex items-center gap-1.5 flex-wrap mt-2 text-[11px]">
              <span className="text-slate-400 font-medium">Niveau :</span>
              <button
                onClick={() => setSelectedLevelFilter('ALL')}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'ALL'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tous ({allTexts.length})
              </button>
              <button
                onClick={() => {
                  setSelectedLevelFilter('A1');
                  const target = allTexts.find((t) => t.level.startsWith('A1'));
                  if (target && !currentText.level.startsWith('A1')) {
                    onSelectText(target);
                    setReadingIdx(0);
                    setListeningIdx(0);
                    setWritingIdx(0);
                  }
                }}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'A1'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                A1-A2 ({allTexts.filter((t) => t.level.startsWith('A1')).length})
              </button>
              <button
                onClick={() => {
                  setSelectedLevelFilter('B1');
                  const target = allTexts.find((t) => t.level.startsWith('B1'));
                  if (target && !currentText.level.startsWith('B1')) {
                    onSelectText(target);
                    setReadingIdx(0);
                    setListeningIdx(0);
                    setWritingIdx(0);
                  }
                }}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'B1'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                B1-B2 ({allTexts.filter((t) => t.level.startsWith('B1')).length})
              </button>
              <button
                onClick={() => {
                  setSelectedLevelFilter('C1');
                  const target = allTexts.find((t) => t.level.startsWith('C1'));
                  if (target && !currentText.level.startsWith('C1')) {
                    onSelectText(target);
                    setReadingIdx(0);
                    setListeningIdx(0);
                    setWritingIdx(0);
                  }
                }}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'C1'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                C1 Avancé ({allTexts.filter((t) => t.level.startsWith('C1')).length})
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => {
                  setSelectedLevelFilter('DIALOGUE');
                  const target = allTexts.find((t) => t.titleEn.toLowerCase().startsWith('dialogue'));
                  if (target && !currentText.titleEn.toLowerCase().startsWith('dialogue')) {
                    onSelectText(target);
                    setReadingIdx(0);
                    setListeningIdx(0);
                    setWritingIdx(0);
                  }
                }}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'DIALOGUE'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                💬 Dialogues 50% ({allTexts.filter((t) => t.titleEn.toLowerCase().startsWith('dialogue')).length})
              </button>
              <button
                onClick={() => {
                  setSelectedLevelFilter('ARTICLE');
                  const target = allTexts.find((t) => !t.titleEn.toLowerCase().startsWith('dialogue'));
                  if (target && currentText.titleEn.toLowerCase().startsWith('dialogue')) {
                    onSelectText(target);
                    setReadingIdx(0);
                    setListeningIdx(0);
                    setWritingIdx(0);
                  }
                }}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'ARTICLE'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                }`}
              >
                📰 Actualités 50% ({allTexts.filter((t) => !t.titleEn.toLowerCase().startsWith('dialogue')).length})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={currentText.id}
              onChange={(e) => {
                const found = allTexts.find((t) => t.id === e.target.value);
                if (found) {
                  onSelectText(found);
                  setReadingIdx(0);
                  setListeningIdx(0);
                  setWritingIdx(0);
                }
              }}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-3 py-2 cursor-pointer max-w-[260px] sm:max-w-[320px] truncate"
            >
              {selectedLevelFilter === 'ALL' ? (
                <>
                  <optgroup label={`🌟 A1-A2 Débutant (${allTexts.filter((t) => t.level.startsWith('A1')).length} textes · 50% Dialogues)`}>
                    {allTexts
                      .filter((t) => t.level.startsWith('A1'))
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.titleEn.toLowerCase().startsWith('dialogue') ? '💬 ' : '📰 '} {t.titleEn}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={`🚀 B1-B2 Intermédiaire (${allTexts.filter((t) => t.level.startsWith('B1')).length} textes · 50% Dialogues)`}>
                    {allTexts
                      .filter((t) => t.level.startsWith('B1'))
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.titleEn.toLowerCase().startsWith('dialogue') ? '💬 ' : '📰 '} {t.titleEn}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={`💎 C1 Avancé (${allTexts.filter((t) => t.level.startsWith('C1')).length} textes · 50% Dialogues)`}>
                    {allTexts
                      .filter((t) => t.level.startsWith('C1'))
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.titleEn.toLowerCase().startsWith('dialogue') ? '💬 ' : '📰 '} {t.titleEn}
                        </option>
                      ))}
                  </optgroup>
                </>
              ) : (
                allTexts
                  .filter((t) => {
                    if (selectedLevelFilter === 'A1') return t.level.startsWith('A1');
                    if (selectedLevelFilter === 'B1') return t.level.startsWith('B1');
                    if (selectedLevelFilter === 'C1') return t.level.startsWith('C1');
                    if (selectedLevelFilter === 'DIALOGUE') return t.titleEn.toLowerCase().startsWith('dialogue');
                    if (selectedLevelFilter === 'ARTICLE') return !t.titleEn.toLowerCase().startsWith('dialogue');
                    return true;
                  })
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      [{t.level.split(' ')[0]}] {t.titleEn.toLowerCase().startsWith('dialogue') ? '💬 ' : '📰 '} {t.titleEn}
                    </option>
                  ))
              )}
            </select>

            <button
              onClick={onBackToReader}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Retour Lecture</span>
            </button>
          </div>
        </div>

        {/* 3 MANDATORY CURRICULUM SECTIONS TABS (Reading, Listening, Writing) */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 mt-4 pt-4">
          {/* Section 1: Reading */}
          <button
            onClick={() => setActiveSection('reading')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              activeSection === 'reading'
                ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-300 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs font-bold">1. Reading (Lecture)</div>
                <div className="text-[11px] text-slate-500 font-normal">
                  {readingExercises.length} exercices
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700">
              {scores.reading}/{readingExercises.length}
            </span>
          </button>

          {/* Section 2: Listening */}
          <button
            onClick={() => setActiveSection('listening')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              activeSection === 'listening'
                ? 'bg-purple-50 border-purple-400 text-purple-900 ring-2 ring-purple-300 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-xs font-bold">2. Listening (Écoute)</div>
                <div className="text-[11px] text-slate-500 font-normal">
                  {listeningExercises.length} exercices
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-purple-700">
              {scores.listening}/{listeningExercises.length}
            </span>
          </button>

          {/* Section 3: Writing */}
          <button
            onClick={() => setActiveSection('writing')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              activeSection === 'writing'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-xs font-bold">3. Writing (Écriture)</div>
                <div className="text-[11px] text-slate-500 font-normal">
                  {writingExercises.length} exercices
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">
              {scores.writing}/{writingExercises.length}
            </span>
          </button>
        </div>

        {/* Tip on Hover & Toggle Checkbox */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isArabicTooltipEnabled ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
            <span>
              {isArabicTooltipEnabled ? (
                <>
                  <strong>Curseur flottant actif :</strong> Survolez n'importe quel mot dans les consignes ou les options pour voir sa traduction en arabe.
                </>
              ) : (
                <>
                  <span className="text-slate-400">Curseur arabe désactivé. Cochez la case pour afficher les traductions au survol.</span>
                </>
              )}
            </span>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors shrink-0">
            <input
              type="checkbox"
              checked={isArabicTooltipEnabled}
              onChange={(e) => onToggleArabicTooltip(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
            />
            <span>Curseur arabe</span>
            <span
              className={`text-[10px] font-bold px-1 rounded ${
                isArabicTooltipEnabled ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {isArabicTooltipEnabled ? 'ON' : 'OFF'}
            </span>
          </label>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1 : READING (5+ EXERCISES)                             */}
      {/* ============================================================== */}
      {activeSection === 'reading' && currentReading && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col">
          {/* Header & Sub-step Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded">
                {currentReading.typeLabel}
              </span>
              <span className="font-semibold text-slate-800">
                Exercice de lecture {readingIdx + 1} sur {readingExercises.length}
              </span>
            </div>

            {/* Pagination dots for 5 exercises */}
            <div className="flex items-center gap-1.5">
              {readingExercises.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReadingIdx(i)}
                  className={`w-6 h-6 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    readingIdx === i
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Passage Snippet Box */}
          {currentReading.passageSnippet && (
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 mb-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Extrait de lecture de référence
              </div>
              <p className="font-reading text-sm sm:text-base text-slate-800 leading-relaxed">
                {renderInteractiveText(currentReading.passageSnippet, 'en')}
              </p>
            </div>
          )}

          {/* Question Prompt */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-5">
            {renderInteractiveText(currentReading.question, 'fr')}
          </h2>

          {/* Options List */}
          <div className="space-y-3 mb-6">
            {currentReading.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              const isCorrect = idx === currentReading.correctIndex;

              let cardStyle =
                'bg-slate-50 border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrect) {
                  cardStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                } else {
                  cardStyle = 'bg-slate-50 opacity-40 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                >
                  <span className="text-sm font-medium">
                    {renderInteractiveText(opt, 'fr')}
                  </span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* DETAILED CORRECTION & PEDAGOGICAL EXPLANATION */}
          {isAnswerSubmitted && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-1">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Correction & Explication détaillée :</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
                {currentReading.explanationFr}
              </p>

              <div className="mt-3 pt-2.5 border-t border-blue-200/70 flex items-center justify-between text-xs text-blue-900">
                <span className="font-semibold">Vocabulaire clé en arabe :</span>
                <span dir="rtl" className="font-arabic font-bold text-base text-amber-900">
                  {currentReading.keywordAr}
                </span>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  if (readingIdx < readingExercises.length - 1) {
                    setReadingIdx(readingIdx + 1);
                  } else {
                    setActiveSection('listening');
                  }
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>
                  {readingIdx < readingExercises.length - 1
                    ? 'Exercice suivant'
                    : 'Passer à la Section Écoute (Listening) →'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2 : LISTENING (5+ EXERCISES WITH AUDIO SPEECH)         */}
      {/* ============================================================== */}
      {activeSection === 'listening' && currentListening && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col">
          {/* Header & Sub-step Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2 py-0.5 rounded">
                {currentListening.typeLabel}
              </span>
              <span className="font-semibold text-slate-800">
                Exercice d'écoute {listeningIdx + 1} sur {listeningExercises.length}
              </span>
            </div>

            {/* Pagination dots for 5 exercises */}
            <div className="flex items-center gap-1.5">
              {listeningExercises.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setListeningIdx(i)}
                  className={`w-6 h-6 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    listeningIdx === i
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Prominent Audio Listening Player */}
          <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-6 text-center mb-6">
            <div className="text-xs uppercase tracking-wider font-bold text-purple-800/80 mb-3">
              Lecteur Audio Web Speech
            </div>

            <button
              onClick={() => handlePlayAudio(currentListening.audioText)}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer ${
                isPlayingAudio
                  ? 'bg-purple-700 text-white ring-4 ring-purple-300 animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>{isPlayingAudio ? 'Lecture en cours (Arrêter)' : 'Écouter l\'enregistrement audio'}</span>
            </button>

            <p className="text-xs text-purple-900/70 mt-3">
              Cliquez pour écouter la voix native autant de fois que nécessaire avant de répondre.
            </p>
          </div>

          {/* Question Prompt */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-5">
            {renderInteractiveText(currentListening.question, 'fr')}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentListening.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              const isCorrect = idx === currentListening.correctIndex;

              let cardStyle =
                'bg-slate-50 border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrect) {
                  cardStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                } else {
                  cardStyle = 'bg-slate-50 opacity-40 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                >
                  <span className="text-sm font-medium">
                    {renderInteractiveText(opt, 'en')}
                  </span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* DETAILED CORRECTION */}
          {isAnswerSubmitted && (
            <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 mb-1">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <span>Correction de l'exercice d'écoute :</span>
              </div>
              <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
                {currentListening.explanationFr}
              </p>

              <div className="mt-3 pt-2.5 border-t border-purple-200/70 flex items-center justify-between text-xs text-purple-900">
                <span className="font-semibold">Traduction arabe :</span>
                <span dir="rtl" className="font-arabic font-bold text-base text-amber-900">
                  {currentListening.keywordAr}
                </span>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  if (listeningIdx < listeningExercises.length - 1) {
                    setListeningIdx(listeningIdx + 1);
                  } else {
                    setActiveSection('writing');
                  }
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>
                  {listeningIdx < listeningExercises.length - 1
                    ? 'Exercice audio suivant'
                    : 'Passer à la Section Écriture (Writing) →'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 3 : WRITING (5+ EXERCISES: SYNTAX & RECONSTRUCTION)   */}
      {/* ============================================================== */}
      {activeSection === 'writing' && currentWriting && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col">
          {/* Header & Sub-step Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">
                {currentWriting.typeLabel}
              </span>
              <span className="font-semibold text-slate-800">
                Exercice d'écriture {writingIdx + 1} sur {writingExercises.length}
              </span>
            </div>

            {/* Pagination dots for 5 exercises */}
            <div className="flex items-center gap-1.5">
              {writingExercises.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setWritingIdx(i)}
                  className={`w-6 h-6 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    writingIdx === i
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Instruction */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Consigne d'écriture
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {currentWriting.instructionFr}
            </p>
            <div className="mt-2 text-xs text-slate-600">
              {currentWriting.promptText}
            </div>
          </div>

          {/* If Scramble mode: Word Chips Builder */}
          {currentWriting.type === 'scramble' ? (
            <div className="space-y-4 mb-6">
              {/* Construction Target Area */}
              <div className="min-h-[70px] bg-emerald-50/30 border-2 border-dashed border-emerald-300 rounded-xl p-3.5 flex flex-wrap items-center gap-2">
                {constructedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">
                    Cliquez sur les mots ci-dessous dans l'ordre pour composer la phrase anglaise...
                  </span>
                ) : (
                  constructedWords.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemoveScrambleWord(word, idx)}
                      className="bg-white border border-emerald-400 text-emerald-950 font-bold px-3 py-1.5 rounded-lg text-sm shadow-xs hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 cursor-pointer"
                      title="Cliquez pour retirer ce mot"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              {/* Word Bank */}
              <div className="flex flex-wrap items-center gap-2">
                {shuffledWordBank.map((word, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleAddScrambleWord(word, idx)}
                    className="bg-slate-100 hover:bg-emerald-600 hover:text-white border border-slate-200 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    {word}
                  </button>
                ))}
              </div>

              {!isAnswerSubmitted && (
                <button
                  disabled={constructedWords.length === 0}
                  onClick={handleVerifyScramble}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Valider ma phrase
                </button>
              )}
            </div>
          ) : (
            /* Choice-based Writing Exercise */
            <div className="space-y-3 mb-6">
              {currentWriting.options?.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const isCorrect = opt.trim().toLowerCase() === currentWriting.targetAnswer.trim().toLowerCase();

                let cardStyle =
                  'bg-slate-50 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                  } else {
                    cardStyle = 'bg-slate-50 opacity-40 border-slate-200 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                  >
                    <span className="text-sm font-medium">
                      {renderInteractiveText(opt, 'en')}
                    </span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* DETAILED CORRECTION */}
          {isAnswerSubmitted && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Correction & Règle grammaticale :</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {currentWriting.explanationFr}
              </p>

              <div className="mt-3 pt-2.5 border-t border-emerald-200/70 flex items-center justify-between text-xs text-emerald-900">
                <span className="font-semibold">Indice arabe :</span>
                <span dir="rtl" className="font-arabic font-bold text-base text-amber-900">
                  {currentWriting.hintAr}
                </span>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  if (writingIdx < writingExercises.length - 1) {
                    setWritingIdx(writingIdx + 1);
                  } else {
                    setWritingIdx(0);
                    setActiveSection('reading');
                  }
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>
                  {writingIdx < writingExercises.length - 1
                    ? 'Exercice d\'écriture suivant'
                    : 'Recommencer le cycle de cours'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
