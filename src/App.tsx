/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DualColumnReader } from './components/DualColumnReader';
import { ExerciseHub } from './components/ExerciseHub';
import { VocabularyNotebook } from './components/VocabularyNotebook';
import { CustomTextImporter } from './components/CustomTextImporter';
import { ProgressDashboard } from './components/ProgressDashboard';
import { BILINGUAL_TEXTS } from './data/texts';
import { BilingualText, HoverWordInfo, SavedWord, UserProgress, SrsRating, WordEntry } from './types';
import { cleanWord } from './data/dictionary';
import {
  loadUserProgress,
  saveUserProgress,
  getTodayKey,
  getDefaultProgress,
} from './utils/progressStorage';
import { calculateNextSrsState, getDueWords } from './utils/srsAlgorithm';

// Default starter words in notebook with spaced repetition data
const INITIAL_SAVED_WORDS: SavedWord[] = [
  {
    en: 'journey',
    fr: 'voyage / trajet',
    ar: 'رِحْلَة',
    phonetic: '/ˈdʒɜːr.ni/',
    type: 'nom',
    savedAt: Date.now() - 3600000,
    mastered: false,
    reviewCount: 1,
    srsStage: 1,
    intervalDays: 1,
    easeFactor: 2.5,
    nextReviewAt: Date.now() - 1000, // Due for review now!
    lastReviewedAt: Date.now() - 86400000,
  },
  {
    en: 'knowledge',
    fr: 'connaissance / savoir',
    ar: 'مَعْرِفَة / عِلْم',
    phonetic: '/ˈnɒl.ɪdʒ/',
    type: 'nom',
    savedAt: Date.now() - 7200000,
    mastered: true,
    reviewCount: 4,
    srsStage: 5,
    intervalDays: 30,
    easeFactor: 2.6,
    nextReviewAt: Date.now() + 14 * 86400000, // Due in 14 days
    lastReviewedAt: Date.now() - 86400000 * 2,
  },
  {
    en: 'sustainable',
    fr: 'durable',
    ar: 'مُسْتَدَام',
    phonetic: '/səˈsteɪ.nə.bəl/',
    type: 'adjectif',
    savedAt: Date.now() - 10800000,
    mastered: false,
    reviewCount: 2,
    srsStage: 2,
    intervalDays: 3,
    easeFactor: 2.4,
    nextReviewAt: Date.now() - 2000, // Due for review now!
    lastReviewedAt: Date.now() - 86400000 * 3,
  },
  {
    en: 'lighthouse',
    fr: 'phare maritime',
    ar: 'مَنَارَة',
    phonetic: '/ˈlaɪt.haʊs/',
    type: 'nom',
    savedAt: Date.now() - 14400000,
    mastered: false,
    reviewCount: 0,
    srsStage: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    nextReviewAt: Date.now() - 5000, // New word due immediately
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('reader');
  const [allTexts, setAllTexts] = useState<BilingualText[]>(() => {
    try {
      const stored = localStorage.getItem('linguaduo_custom_texts');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...BILINGUAL_TEXTS, ...parsed];
      }
    } catch {}
    return BILINGUAL_TEXTS;
  });

  const [currentText, setCurrentText] = useState<BilingualText>(BILINGUAL_TEXTS[0]);

  const [savedWords, setSavedWords] = useState<SavedWord[]>(() => {
    try {
      const stored = localStorage.getItem('linguaduo_saved_words');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return INITIAL_SAVED_WORDS;
  });

  const [isArabicTooltipEnabled, setIsArabicTooltipEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('linguaduo_arabic_tooltip_enabled');
      if (stored !== null) {
        return stored === 'true';
      }
    } catch {}
    return true; // Active by default
  });

  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress);

  // Persist user progress
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  // Active learning timer: runs every 5 seconds when tab is visible
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        setUserProgress((prev) => {
          const today = getTodayKey();
          const prevToday = prev.dailyHistory[today] || {
            date: today,
            minutes: 0,
            textsRead: 0,
            wordsPracticed: 0,
            exercisesCompleted: 0,
          };
          const newTotalSecs = prev.totalLearningSeconds + 5;
          const newTodayMins = Math.floor(
            ((prevToday.minutes * 60) + 5) / 60
          );
          return {
            ...prev,
            totalLearningSeconds: newTotalSecs,
            lastActiveDate: today,
            dailyHistory: {
              ...prev.dailyHistory,
              [today]: {
                ...prevToday,
                minutes: newTodayMins,
              },
            },
          };
        });
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Toggle text read status
  const handleToggleTextRead = (textId: string) => {
    setUserProgress((prev) => {
      const isAlreadyRead = prev.readTextIds.includes(textId);
      const today = getTodayKey();
      const prevToday = prev.dailyHistory[today] || {
        date: today,
        minutes: 0,
        textsRead: 0,
        wordsPracticed: 0,
        exercisesCompleted: 0,
      };

      const updatedIds = isAlreadyRead
        ? prev.readTextIds.filter((id) => id !== textId)
        : [...prev.readTextIds, textId];

      const updatedTodayTexts = isAlreadyRead
        ? Math.max(0, prevToday.textsRead - 1)
        : prevToday.textsRead + 1;

      return {
        ...prev,
        readTextIds: updatedIds,
        dailyHistory: {
          ...prev.dailyHistory,
          [today]: {
            ...prevToday,
            textsRead: updatedTodayTexts,
          },
        },
      };
    });
  };

  // Add study minutes manually (quick test or log)
  const handleAddMinutes = (minutes: number) => {
    setUserProgress((prev) => {
      const today = getTodayKey();
      const prevToday = prev.dailyHistory[today] || {
        date: today,
        minutes: 0,
        textsRead: 0,
        wordsPracticed: 0,
        exercisesCompleted: 0,
      };
      return {
        ...prev,
        totalLearningSeconds: prev.totalLearningSeconds + minutes * 60,
        dailyHistory: {
          ...prev.dailyHistory,
          [today]: {
            ...prevToday,
            minutes: prevToday.minutes + minutes,
          },
        },
      };
    });
  };

  // Reset progress stats to fresh starting state
  const handleResetProgress = () => {
    const today = getTodayKey();
    const fresh: UserProgress = {
      readTextIds: [],
      totalLearningSeconds: 0,
      dailyHistory: {
        [today]: {
          date: today,
          minutes: 0,
          textsRead: 0,
          wordsPracticed: 0,
          exercisesCompleted: 0,
        },
      },
      streakDays: 1,
      lastActiveDate: today,
    };
    setUserProgress(fresh);
    saveUserProgress(fresh);
  };

  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Persist Arabic tooltip state
  useEffect(() => {
    try {
      localStorage.setItem('linguaduo_arabic_tooltip_enabled', String(isArabicTooltipEnabled));
    } catch {}
  }, [isArabicTooltipEnabled]);

  // Persist saved words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('linguaduo_saved_words', JSON.stringify(savedWords));
    } catch {}
  }, [savedWords]);

  // Handle saving word from hover or vocabulary cards
  const handleSaveWord = (wordInfo: HoverWordInfo) => {
    const clean = cleanWord(wordInfo.en);
    setSavedWords((prev) => {
      const exists = prev.some((w) => cleanWord(w.en) === clean);
      if (exists) {
        // Toggle remove if already saved
        return prev.filter((w) => cleanWord(w.en) !== clean);
      }
      const newEntry: SavedWord = {
        en: wordInfo.en,
        fr: wordInfo.fr,
        ar: wordInfo.ar,
        phonetic: wordInfo.phonetic,
        type: wordInfo.type,
        savedAt: Date.now(),
        mastered: false,
        reviewCount: 0,
        srsStage: 0,
        intervalDays: 0,
        easeFactor: 2.5,
        nextReviewAt: Date.now(),
      };
      return [newEntry, ...prev];
    });
  };

  // Update spaced repetition state
  const handleUpdateWordSrs = (enWord: string, rating: SrsRating) => {
    const clean = cleanWord(enWord);
    setSavedWords((prev) =>
      prev.map((w) => {
        if (cleanWord(w.en) === clean) {
          return calculateNextSrsState(w, rating);
        }
        return w;
      })
    );
  };

  const handleToggleMastered = (enWord: string) => {
    const clean = cleanWord(enWord);
    setSavedWords((prev) =>
      prev.map((w) =>
        cleanWord(w.en) === clean ? { ...w, mastered: !w.mastered } : w
      )
    );
  };

  const handleRemoveWord = (enWord: string) => {
    const clean = cleanWord(enWord);
    setSavedWords((prev) => prev.filter((w) => cleanWord(w.en) !== clean));
  };

  const handleAddWord = (word: WordEntry) => {
    const clean = cleanWord(word.en);
    setSavedWords((prev) => {
      const exists = prev.some((w) => cleanWord(w.en) === clean);
      if (exists) return prev;
      const newEntry: SavedWord = {
        en: word.en,
        fr: word.fr,
        ar: word.ar,
        phonetic: word.phonetic,
        type: word.type,
        savedAt: Date.now(),
        mastered: false,
        reviewCount: 0,
        srsStage: 0,
        intervalDays: 0,
        easeFactor: 2.5,
        nextReviewAt: Date.now(),
      };
      return [newEntry, ...prev];
    });
  };

  const handleImportText = (newText: BilingualText) => {
    setAllTexts((prev) => [newText, ...prev]);
    setCurrentText(newText);
    setActiveTab('reader');
    try {
      const customOnes = [newText, ...allTexts.filter((t) => t.id.startsWith('imported-'))];
      localStorage.setItem('linguaduo_custom_texts', JSON.stringify(customOnes));
    } catch {}
  };

  const dueWordsCount = getDueWords(savedWords).length;
  const isReaderFocusActive = isFocusMode && activeTab === 'reader';

  return (
    <div className={`min-h-screen flex flex-col ${isReaderFocusActive ? 'bg-slate-900 text-slate-100' : 'bg-slate-50/70 text-slate-800'}`}>
      {/* Top Header - hidden in Reader Focus Mode */}
      {!isReaderFocusActive && (
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          savedWordsCount={savedWords.length}
          dueWordsCount={dueWordsCount}
          isArabicTooltipEnabled={isArabicTooltipEnabled}
          onToggleArabicTooltip={setIsArabicTooltipEnabled}
        />
      )}

      {/* Main Views Container */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'reader' && (
          <DualColumnReader
            currentText={currentText}
            allTexts={allTexts}
            onSelectText={setCurrentText}
            onSaveWord={handleSaveWord}
            savedWords={savedWords}
            onStartExercises={() => setActiveTab('exercises')}
            isArabicTooltipEnabled={isArabicTooltipEnabled}
            onToggleArabicTooltip={setIsArabicTooltipEnabled}
            isTextRead={userProgress.readTextIds.includes(currentText.id)}
            onToggleTextRead={handleToggleTextRead}
            isFocusMode={isFocusMode}
            onToggleFocusMode={setIsFocusMode}
          />
        )}

        {activeTab === 'exercises' && (
          <ExerciseHub
            currentText={currentText}
            allTexts={allTexts}
            onSelectText={setCurrentText}
            onBackToReader={() => setActiveTab('reader')}
            isArabicTooltipEnabled={isArabicTooltipEnabled}
            onToggleArabicTooltip={setIsArabicTooltipEnabled}
          />
        )}

        {activeTab === 'notebook' && (
          <VocabularyNotebook
            savedWords={savedWords}
            onToggleMastered={handleToggleMastered}
            onRemoveWord={handleRemoveWord}
            onUpdateWordSrs={handleUpdateWordSrs}
            onAddWord={handleAddWord}
            onBackToReader={() => setActiveTab('reader')}
          />
        )}

        {activeTab === 'dashboard' && (
          <ProgressDashboard
            progress={userProgress}
            allTexts={allTexts}
            savedWords={savedWords}
            onSelectText={setCurrentText}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onToggleTextRead={handleToggleTextRead}
            onAddMinutes={handleAddMinutes}
            onResetProgress={handleResetProgress}
          />
        )}

        {activeTab === 'importer' && (
          <CustomTextImporter
            onImportText={handleImportText}
            onBackToReader={() => setActiveTab('reader')}
          />
        )}
      </main>

      {/* Footer - hidden in Reader Focus Mode */}
      {!isReaderFocusActive && (
        <footer className="border-t border-slate-200/80 bg-white/70 py-4 px-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">LinguaDuo</span>
              <span aria-hidden="true">·</span>
              <span>Apprentissage bilingue de l'anglais & traduction arabe au curseur</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Synchronisation visuelle</span>
              <span aria-hidden="true">·</span>
              <span>Synthèse vocale Web Speech</span>
              <span aria-hidden="true">·</span>
              <span>2026</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
