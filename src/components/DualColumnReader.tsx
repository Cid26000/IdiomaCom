import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  Play,
  Square,
  Sparkles,
  Bookmark,
  Check,
  RotateCcw,
  Sliders,
  Maximize2,
  Minimize2,
  HelpCircle,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { BilingualText, HoverWordInfo, SavedWord, SentencePair } from '../types';
import { lookupWord, cleanWord } from '../data/dictionary';
import { speakText, stopSpeech } from '../utils/audio';
import { FloatingTooltip } from './FloatingTooltip';

interface DualColumnReaderProps {
  currentText: BilingualText;
  allTexts: BilingualText[];
  onSelectText: (text: BilingualText) => void;
  onSaveWord: (wordInfo: HoverWordInfo) => void;
  savedWords: SavedWord[];
  onStartExercises: () => void;
  isArabicTooltipEnabled: boolean;
  onToggleArabicTooltip: (enabled: boolean) => void;
  isTextRead?: boolean;
  onToggleTextRead?: (textId: string) => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: (active: boolean) => void;
}

export const DualColumnReader: React.FC<DualColumnReaderProps> = ({
  currentText,
  allTexts,
  onSelectText,
  onSaveWord,
  savedWords,
  onStartExercises,
  isArabicTooltipEnabled,
  onToggleArabicTooltip,
  isTextRead = false,
  onToggleTextRead,
  isFocusMode = false,
  onToggleFocusMode,
}) => {
  // State for active hovering / tooltip
  const [hoveredWordInfo, setHoveredWordInfo] = useState<HoverWordInfo | null>(null);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [isTooltipPinned, setIsTooltipPinned] = useState(false);

  // Focus mode preferences
  const [focusColumnMode, setFocusColumnMode] = useState<'english_only' | 'bilingual_minimal'>('english_only');
  const [revealedFrSentences, setRevealedFrSentences] = useState<Record<string, boolean>>({});

  // Audio playback state
  const [isPlayingFullText, setIsPlayingFullText] = useState(false);
  const [activeSpeakingSentenceId, setActiveSpeakingSentenceId] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.95);
  const [voiceAccent, setVoiceAccent] = useState<'en-US' | 'en-GB'>('en-US');

  // View preferences
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [syncScroll, setSyncScroll] = useState<boolean>(true);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'ALL' | 'A1' | 'B1' | 'C1' | 'DIALOGUE' | 'ARTICLE'>('ALL');

  // Keyboard shortcut listener for Focus mode (F to toggle, Escape to exit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape' && isFocusMode) {
        onToggleFocusMode?.(false);
      } else if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) {
        onToggleFocusMode?.(!isFocusMode);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, onToggleFocusMode]);

  // Column refs for synchronized scrolling
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef<boolean>(false);

  const savedWordsKeys = new Set(savedWords.map((w) => cleanWord(w.en)));

  // Clean up audio on unmount or text change
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [currentText.id]);

  // Synchronized scrolling logic
  const handleScroll = (source: 'left' | 'right') => {
    if (!syncScroll || isScrollingRef.current) return;
    isScrollingRef.current = true;

    const sourceElem = source === 'left' ? leftColRef.current : rightColRef.current;
    const targetElem = source === 'left' ? rightColRef.current : leftColRef.current;

    if (sourceElem && targetElem) {
      const scrollRatio = sourceElem.scrollTop / (sourceElem.scrollHeight - sourceElem.clientHeight || 1);
      targetElem.scrollTop = scrollRatio * (targetElem.scrollHeight - targetElem.clientHeight);
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 40);
  };

  // Word hover handler
  const handleWordHover = (
    e: React.MouseEvent,
    rawWord: string,
    lang: 'en' | 'fr',
    sentenceId: string
  ) => {
    if (!isArabicTooltipEnabled) return; // Feature disabled by toggle/checkbox
    if (isTooltipPinned) return; // Keep pinned if locked

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
      sentenceId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleWordClick = (
    e: React.MouseEvent,
    rawWord: string,
    lang: 'en' | 'fr',
    sentenceId: string
  ) => {
    if (!isArabicTooltipEnabled) return; // Feature disabled by toggle/checkbox
    e.stopPropagation();
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
      sentenceId,
      x: e.clientX,
      y: e.clientY,
    });
    setIsTooltipPinned(true);
  };

  const handleMouseLeaveContainer = () => {
    if (!isTooltipPinned) {
      setHoveredWordInfo(null);
    }
  };

  // Sentence speech audio (with toggle stop/play)
  const handlePlaySentenceAudio = async (sentence: SentencePair) => {
    if (activeSpeakingSentenceId === sentence.id) {
      stopSpeech();
      setActiveSpeakingSentenceId(null);
      return;
    }
    stopSpeech();
    setActiveSpeakingSentenceId(sentence.id);
    await speakText(sentence.en, voiceAccent, audioSpeed);
    setActiveSpeakingSentenceId(null);
  };

  // Full text audio playback
  const handlePlayFullText = async () => {
    if (isPlayingFullText) {
      stopSpeech();
      setIsPlayingFullText(false);
      setActiveSpeakingSentenceId(null);
      return;
    }

    setIsPlayingFullText(true);
    for (const pair of currentText.sentencePairs) {
      setActiveSpeakingSentenceId(pair.id);
      await speakText(pair.en, voiceAccent, audioSpeed);
    }
    setActiveSpeakingSentenceId(null);
    setIsPlayingFullText(false);
  };

  // Helper to tokenize sentences into words while preserving punctuation and spacing
  const renderInteractiveText = (
    textString: string,
    lang: 'en' | 'fr',
    sentenceId: string
  ) => {
    // Split by words while keeping delimiters
    const tokens = textString.split(/(\s+|[.,!?;:«»"'()]+)/);

    return tokens.map((token, idx) => {
      const isWord = /[a-zA-ZÀ-ÿ0-9]/.test(token);
      if (!isWord) {
        return <span key={idx} className="select-text">{token}</span>;
      }

      const cleaned = cleanWord(token);
      const isMatching =
        hoveredWordInfo &&
        (cleanWord(hoveredWordInfo.en) === cleaned ||
          cleanWord(hoveredWordInfo.fr) === cleaned ||
          cleanWord(hoveredWordInfo.word) === cleaned);

      return (
        <span
          key={idx}
          onMouseEnter={(e) => handleWordHover(e, token, lang, sentenceId)}
          onClick={(e) => handleWordClick(e, token, lang, sentenceId)}
          className={`interactive-word select-text ${
            isMatching ? 'bg-amber-100 text-amber-900 font-medium ring-1 ring-amber-300' : ''
          }`}
        >
          {token}
        </span>
      );
    });
  };

  // Font size mapping
  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  }[fontSize];

  // ==============================================================
  // DEDICATED ZEN FOCUS MODE (Hides header, adjacent columns, borders)
  // ==============================================================
  if (isFocusMode) {
    return (
      <div
        className="relative flex flex-col flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 animate-in fade-in select-text"
        onClick={() => setIsTooltipPinned(false)}
      >
        {/* Floating Tooltip for Arabic & French on hover */}
        <FloatingTooltip
          info={hoveredWordInfo}
          onClose={() => {
            setIsTooltipPinned(false);
            setHoveredWordInfo(null);
          }}
          onSaveWord={(info) => onSaveWord(info)}
          isSaved={hoveredWordInfo ? savedWordsKeys.has(cleanWord(hoveredWordInfo.en)) : false}
          isLocked={isTooltipPinned}
        />

        {/* Minimal Floating Zen HUD Bar */}
        <header className="sticky top-2 z-40 bg-slate-900/95 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/80 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Focus Actif
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              {currentText.titleEn}
            </span>
            <span className="text-xs text-slate-400 hidden md:inline">
              ({currentText.titleFr})
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* View switcher: English only (masquage colonne adjacente) vs Bilingue minimal */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs text-slate-300">
              <button
                onClick={() => setFocusColumnMode('english_only')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  focusColumnMode === 'english_only'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:text-white'
                }`}
                title="Masquer la colonne adjacente pour concentration maximale sur le texte anglais"
              >
                Anglais Seul
              </button>
              <button
                onClick={() => setFocusColumnMode('bilingual_minimal')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  focusColumnMode === 'bilingual_minimal'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:text-white'
                }`}
                title="Afficher les colonnes bilingues en mode épuré"
              >
                Bilingue
              </button>
            </div>

            {/* Audio full text play */}
            <button
              onClick={handlePlayFullText}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isPlayingFullText
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Écouter la lecture audio en continu"
            >
              {isPlayingFullText ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px]">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Écouter</span>
                </>
              )}
            </button>

            {/* Audio speed */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-[11px]">
              {([0.8, 1.0, 1.2] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setAudioSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded font-mono ${
                    audioSpeed === spd ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Font size adjuster */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs text-slate-300">
              {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    fontSize === size
                      ? 'bg-white text-slate-900 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  {size === 'sm' ? 'A-' : size === 'base' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>

            {/* Exit Focus Mode Button */}
            <button
              onClick={() => onToggleFocusMode?.(false)}
              className="flex items-center gap-1.5 px-3 py-1 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Quitter le mode Focus (Touche Échap)"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Quitter (Esc)</span>
            </button>
          </div>
        </header>

        {/* Focus Mode Content */}
        {focusColumnMode === 'english_only' ? (
          /* SINGLE ENGLISH COLUMN (ADJACENT COLUMNS HIDDEN FOR MAXIMUM IMMERSION) */
          <div className="max-w-3xl mx-auto w-full bg-slate-800/90 text-slate-100 rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-10 mb-8">
            <div className="border-b border-slate-700/60 pb-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-400 font-mono uppercase tracking-wider">
                  {currentText.level} · {currentText.topic}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {currentText.titleEn}
                </h1>
              </div>
              <span className="text-xs text-slate-400 bg-slate-700/60 px-2.5 py-1 rounded-full font-mono">
                {currentText.readTime}
              </span>
            </div>

            {/* Sentence by sentence English text */}
            <div className={`space-y-6 ${fontSizeClasses}`}>
              {currentText.sentencePairs.map((pair) => {
                const isActive = activeSentenceId === pair.id;
                const isSpeaking = activeSpeakingSentenceId === pair.id;
                const isFrRevealed = revealedFrSentences[pair.id];

                return (
                  <div
                    key={pair.id}
                    onMouseEnter={() => setActiveSentenceId(pair.id)}
                    className={`group/focus relative p-3 sm:p-4 rounded-2xl transition-all ${
                      isSpeaking
                        ? 'bg-blue-900/40 border border-blue-500/50 shadow-md ring-1 ring-blue-400/30'
                        : isActive
                        ? 'bg-slate-700/40'
                        : 'hover:bg-slate-700/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-reading text-slate-100 flex-1 leading-relaxed">
                        {renderInteractiveText(pair.en, 'en', pair.id)}
                      </p>

                      <div className="flex items-center gap-1 opacity-0 group-hover/focus:opacity-100 transition-opacity shrink-0">
                        {/* Play sentence audio */}
                        <button
                          onClick={() => handlePlaySentenceAudio(pair)}
                          className="p-1.5 rounded-lg bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Écouter cette phrase"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Toggle inline French translation peek */}
                        <button
                          onClick={() =>
                            setRevealedFrSentences((prev) => ({
                              ...prev,
                              [pair.id]: !prev[pair.id],
                            }))
                          }
                          className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                          title={isFrRevealed ? 'Masquer la traduction' : 'Afficher la traduction française'}
                        >
                          {isFrRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Inline French peek if requested by reader */}
                    {isFrRevealed && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-700/50 text-xs text-blue-300 italic font-reading animate-in fade-in">
                        {pair.fr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* BILINGUAL MINIMAL VIEW (DUAL COLUMNS IN CLEAN ZEN MODE) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 flex-1 items-stretch">
            {/* English Column */}
            <div className="bg-slate-800/90 text-slate-100 rounded-2xl border border-slate-700/80 p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
              <div className="border-b border-slate-700/60 pb-3 mb-4 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-blue-400">English</span>
                <span>{currentText.titleEn}</span>
              </div>
              <div className={`space-y-4 ${fontSizeClasses}`}>
                {currentText.sentencePairs.map((pair) => (
                  <div
                    key={pair.id}
                    onMouseEnter={() => setActiveSentenceId(pair.id)}
                    className={`p-2 rounded-xl transition-all ${
                      activeSentenceId === pair.id ? 'bg-slate-700/40 text-white' : ''
                    }`}
                  >
                    {renderInteractiveText(pair.en, 'en', pair.id)}
                  </div>
                ))}
              </div>
            </div>

            {/* French Column */}
            <div className="bg-slate-800/90 text-slate-300 rounded-2xl border border-slate-700/80 p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
              <div className="border-b border-slate-700/60 pb-3 mb-4 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-indigo-400">Français</span>
                <span>{currentText.titleFr}</span>
              </div>
              <div className={`space-y-4 ${fontSizeClasses}`}>
                {currentText.sentencePairs.map((pair) => (
                  <div
                    key={pair.id}
                    onMouseEnter={() => setActiveSentenceId(pair.id)}
                    className={`p-2 rounded-xl transition-all ${
                      activeSentenceId === pair.id ? 'bg-slate-700/40 text-white' : ''
                    }`}
                  >
                    {renderInteractiveText(pair.fr, 'fr', pair.id)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6"
      onClick={() => setIsTooltipPinned(false)}
    >
      {/* Floating Tooltip displaying Arabic translation upon hovering */}
      <FloatingTooltip
        info={hoveredWordInfo}
        onClose={() => {
          setIsTooltipPinned(false);
          setHoveredWordInfo(null);
        }}
        onSaveWord={(info) => onSaveWord(info)}
        isSaved={hoveredWordInfo ? savedWordsKeys.has(cleanWord(hoveredWordInfo.en)) : false}
        isLocked={isTooltipPinned}
      />

      {/* Top Banner / Controls Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Text Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 flex-wrap">
              <span className="font-semibold text-blue-600">{currentText.level}</span>
              <span aria-hidden="true">·</span>
              <span>{currentText.topic}</span>
              <span aria-hidden="true">·</span>
              <span>{currentText.readTime}</span>
              {onToggleTextRead && (
                <>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => onToggleTextRead(currentText.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      isTextRead
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200'
                    }`}
                    title={isTextRead ? 'Texte marqué comme lu (cliquer pour annuler)' : 'Marquer ce texte comme lu'}
                  >
                    {isTextRead ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{isTextRead ? 'Texte Lu ✓' : 'Marquer comme lu'}</span>
                  </button>
                </>
              )}
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentText.titleEn}
              </h1>
              <span className="text-sm font-medium text-slate-500">
                ({currentText.titleFr})
              </span>
              <span
                dir="rtl"
                className="font-arabic text-base font-bold text-amber-700 ml-auto lg:ml-0"
              >
                {currentText.titleAr}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              {currentText.summaryFr}
            </p>

            {/* Level & Genre Quick Filters */}
            <div className="flex items-center gap-1.5 flex-wrap mt-2.5 text-[11px]">
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
                  if (target && !currentText.level.startsWith('A1')) onSelectText(target);
                }}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'A1'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                A1-A2 Débutant ({allTexts.filter((t) => t.level.startsWith('A1')).length})
              </button>
              <button
                onClick={() => {
                  setSelectedLevelFilter('B1');
                  const target = allTexts.find((t) => t.level.startsWith('B1'));
                  if (target && !currentText.level.startsWith('B1')) onSelectText(target);
                }}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedLevelFilter === 'B1'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                B1-B2 Intermédiaire ({allTexts.filter((t) => t.level.startsWith('B1')).length})
              </button>
              <button
                onClick={() => {
                  setSelectedLevelFilter('C1');
                  const target = allTexts.find((t) => t.level.startsWith('C1'));
                  if (target && !currentText.level.startsWith('C1')) onSelectText(target);
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
                  if (target && !currentText.titleEn.toLowerCase().startsWith('dialogue')) onSelectText(target);
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
                  if (target && currentText.titleEn.toLowerCase().startsWith('dialogue')) onSelectText(target);
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

          {/* Controls: Audio, Font Size & Text Selector */}
          <div className="flex items-center flex-wrap gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            {/* Story selector with optgroups */}
            <select
              value={currentText.id}
              onChange={(e) => {
                const found = allTexts.find((t) => t.id === e.target.value);
                if (found) onSelectText(found);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-3 py-2 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-[260px] sm:max-w-[320px] truncate"
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

            {/* Audio full text play */}
            <button
              onClick={handlePlayFullText}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isPlayingFullText
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Écouter la lecture complète en anglais"
            >
              {isPlayingFullText ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Arrêter</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Écouter texte</span>
                </>
              )}
            </button>

            {/* Audio Speed */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600">
              <span className="px-1.5 text-[11px] font-medium text-slate-400">Vitesse</span>
              {[0.8, 1.0, 1.2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setAudioSpeed(speed)}
                  className={`px-1.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    audioSpeed === speed
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Accent Selector */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600">
              <button
                onClick={() => setVoiceAccent('en-US')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  voiceAccent === 'en-US'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
                title="Voix anglaise américaine"
              >
                🇺🇸 US
              </button>
              <button
                onClick={() => setVoiceAccent('en-GB')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  voiceAccent === 'en-GB'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
                title="Voix anglaise britannique"
              >
                🇬🇧 UK
              </button>
            </div>

            {/* Font size adjuster */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600">
              {(['sm', 'base', 'lg'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    fontSize === size
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {size === 'sm' ? 'A-' : size === 'base' ? 'A' : 'A+'}
                </button>
              ))}
            </div>

            {/* Mode Focus Button */}
            <button
              onClick={() => onToggleFocusMode?.(!isFocusMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer bg-slate-900 hover:bg-slate-800 text-white ml-auto"
              title="Activer le mode Focus pour masquer le header et les colonnes adjacentes (Raccourci: F)"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Mode Focus (F)</span>
            </button>

            {/* Practice Button */}
            <button
              onClick={onStartExercises}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>S'entraîner</span>
            </button>
          </div>
        </div>

        {/* Floating helper instruction & toggles */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isArabicTooltipEnabled ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
            <span>
              {isArabicTooltipEnabled ? (
                <>
                  <strong>Curseur arabe actif :</strong> Survolez n'importe quel mot en anglais ou en français pour afficher la traduction en arabe.
                </>
              ) : (
                <>
                  <span className="text-slate-400">Curseur arabe désactivé. Cochez la case pour réactiver l'affichage au survol.</span>
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Arabic Tooltip Checkbox */}
            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={isArabicTooltipEnabled}
                onChange={(e) => onToggleArabicTooltip(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>Traduction arabe au curseur</span>
              <span
                className={`text-[10px] font-bold px-1 rounded ${
                  isArabicTooltipEnabled ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isArabicTooltipEnabled ? 'OUI' : 'NON'}
              </span>
            </label>

            {/* Sync Scroll Checkbox */}
            <label className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={syncScroll}
                onChange={(e) => setSyncScroll(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>Défilement synchronisé</span>
            </label>
          </div>
        </div>
      </div>

      {/* DUAL PARALLEL COLUMNS CONTAINER */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 flex-1 items-stretch"
        onMouseLeave={handleMouseLeaveContainer}
      >
        {/* COLUMN 1: ENGLISH (Target language) */}
        <div
          ref={leftColRef}
          onScroll={() => handleScroll('left')}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar flex flex-col"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-md">
                EN
              </span>
              <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                English (Texte Anglais)
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Langue cible · Audio disponible
            </span>
          </div>

          {/* Content: Sentence by sentence alignment */}
          <div className={`font-reading ${fontSizeClasses} space-y-4 text-slate-800`}>
            {currentText.sentencePairs.map((pair, idx) => {
              const isHovered = activeSentenceId === pair.id;
              const isSpeaking = activeSpeakingSentenceId === pair.id;

              return (
                <div
                  key={pair.id}
                  id={`sentence-en-${pair.id}`}
                  onMouseEnter={() => setActiveSentenceId(pair.id)}
                  onMouseLeave={() => setActiveSentenceId(null)}
                  className={`group relative rounded-xl p-2.5 -mx-2.5 transition-all duration-150 ${
                    isHovered
                      ? 'bg-blue-50/70 shadow-xs'
                      : isSpeaking
                      ? 'bg-amber-50 ring-1 ring-amber-300'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-xs font-mono font-medium text-slate-400 select-none mt-1 shrink-0 w-5">
                        {(idx + 1).toString().padStart(2, '0')}.
                      </span>

                      <div className="flex-1">
                        {renderInteractiveText(pair.en, 'en', pair.id)}
                      </div>
                    </div>

                    {/* Sentence Audio Play Button with clear 'Écouter' label on hover */}
                    <div className="shrink-0 pt-0.5">
                      <button
                        onClick={() => handlePlaySentenceAudio(pair)}
                        title={isSpeaking ? "Arrêter la lecture" : "Écouter cette phrase à voix haute (Web Speech)"}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer shadow-xs ${
                          isSpeaking
                            ? 'bg-blue-600 text-white ring-2 ring-blue-300 shadow-sm'
                            : isHovered
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                            : 'opacity-0 group-hover:opacity-100 bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
                        }`}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                        <span>{isSpeaking ? 'Arrêter' : 'Écouter'}</span>
                      </button>
                    </div>
                  </div>

                  {pair.notes && isHovered && (
                    <div className="text-[11px] text-blue-700 bg-blue-100/50 px-2 py-1 rounded-md mt-1.5 ml-7 font-sans">
                      💡 {pair.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: FRENCH (Mirror / Reference language) */}
        <div
          ref={rightColRef}
          onScroll={() => handleScroll('right')}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar flex flex-col"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-md">
                FR
              </span>
              <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                Français (Texte Miroir)
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Langue de référence
            </span>
          </div>

          {/* Content: Mirrored French sentences */}
          <div className={`font-reading ${fontSizeClasses} space-y-4 text-slate-800`}>
            {currentText.sentencePairs.map((pair, idx) => {
              const isHovered = activeSentenceId === pair.id;
              const isSpeaking = activeSpeakingSentenceId === pair.id;

              return (
                <div
                  key={pair.id}
                  id={`sentence-fr-${pair.id}`}
                  onMouseEnter={() => setActiveSentenceId(pair.id)}
                  onMouseLeave={() => setActiveSentenceId(null)}
                  className={`group relative rounded-xl p-2.5 -mx-2.5 transition-all duration-150 ${
                    isHovered
                      ? 'bg-emerald-50/70 shadow-xs'
                      : isSpeaking
                      ? 'bg-amber-50 ring-1 ring-amber-300'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-xs font-mono font-medium text-slate-400 select-none mt-1 shrink-0 w-5">
                        {(idx + 1).toString().padStart(2, '0')}.
                      </span>

                      <div className="flex-1">
                        {renderInteractiveText(pair.fr, 'fr', pair.id)}
                      </div>
                    </div>

                    {/* Sentence Audio Play Button from French column (plays English sentence) */}
                    <div className="shrink-0 pt-0.5">
                      <button
                        onClick={() => handlePlaySentenceAudio(pair)}
                        title={isSpeaking ? "Arrêter la lecture" : "Écouter la version anglaise à voix haute"}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer shadow-xs ${
                          isSpeaking
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-sm'
                            : isHovered
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                            : 'opacity-0 group-hover:opacity-100 bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                        <span>{isSpeaking ? 'Arrêter' : 'Écouter (EN)'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Key Vocabulary Preview Strip */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Vocabulaire clé de ce texte (EN · FR · AR)
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {currentText.keyVocabulary.length} termes essentiels
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {currentText.keyVocabulary.map((item, idx) => {
            const isSaved = savedWordsKeys.has(cleanWord(item.en));

            return (
              <div
                key={idx}
                onClick={() =>
                  onSaveWord({
                    word: item.en,
                    sourceLang: 'en',
                    en: item.en,
                    fr: item.fr,
                    ar: item.ar,
                    phonetic: item.phonetic,
                    type: item.type,
                    x: 0,
                    y: 0,
                  })
                }
                className="group relative bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 rounded-lg p-2.5 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 truncate">
                    {item.en}
                  </span>
                  <button
                    type="button"
                    title={isSaved ? 'Enregistré' : 'Enregistrer'}
                    className="text-slate-400 group-hover:text-amber-500"
                  >
                    {isSaved ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Bookmark className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {item.fr}
                </div>

                <div
                  dir="rtl"
                  className="font-arabic text-sm font-bold text-amber-800 mt-1 text-right"
                >
                  {item.ar}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
