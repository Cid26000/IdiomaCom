import React, { useState } from 'react';
import {
  BookCheck,
  Clock,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Circle,
  TrendingUp,
  BarChart2,
  PieChart,
  Search,
  ArrowRight,
  RotateCcw,
  PlusCircle,
  Volume2,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { BilingualText, SavedWord, UserProgress } from '../types';
import { formatDayLabelFr, formatDuration, getPastDaysKeys, getTodayKey } from '../utils/progressStorage';

interface ProgressDashboardProps {
  progress: UserProgress;
  allTexts: BilingualText[];
  savedWords: SavedWord[];
  onSelectText: (text: BilingualText) => void;
  onNavigateTab: (tab: 'reader' | 'exercises' | 'notebook') => void;
  onToggleTextRead: (textId: string) => void;
  onAddMinutes: (minutes: number) => void;
  onResetProgress: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  allTexts,
  savedWords,
  onSelectText,
  onNavigateTab,
  onToggleTextRead,
  onAddMinutes,
  onResetProgress,
}) => {
  const [timeRangeDays, setTimeRangeDays] = useState<7 | 14>(7);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [textFilter, setTextFilter] = useState<'ALL' | 'READ' | 'UNREAD' | 'A1' | 'B1' | 'C1' | 'DIALOGUE' | 'ARTICLE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // 1. Text Reading Statistics
  const totalTexts = allTexts.length;
  const readTextsCount = progress.readTextIds.length;
  const readPercentage = totalTexts > 0 ? Math.round((readTextsCount / totalTexts) * 100) : 0;

  // Breakdown by Level
  const a1Texts = allTexts.filter((t) => t.level.startsWith('A1'));
  const b1Texts = allTexts.filter((t) => t.level.startsWith('B1'));
  const c1Texts = allTexts.filter((t) => t.level.startsWith('C1'));

  const a1Read = a1Texts.filter((t) => progress.readTextIds.includes(t.id)).length;
  const b1Read = b1Texts.filter((t) => progress.readTextIds.includes(t.id)).length;
  const c1Read = c1Texts.filter((t) => progress.readTextIds.includes(t.id)).length;

  const dialogueTexts = allTexts.filter((t) => t.titleEn.toLowerCase().startsWith('dialogue'));
  const articleTexts = allTexts.filter((t) => !t.titleEn.toLowerCase().startsWith('dialogue'));

  const dialogueRead = dialogueTexts.filter((t) => progress.readTextIds.includes(t.id)).length;
  const articleRead = articleTexts.filter((t) => progress.readTextIds.includes(t.id)).length;

  // 2. Vocabulary Mastery Statistics
  const totalWords = savedWords.length;
  const masteredWords = savedWords.filter((w) => w.mastered);
  const inProgressWords = savedWords.filter((w) => !w.mastered && (w.reviewCount || 0) > 0);
  const newWords = savedWords.filter((w) => !w.mastered && (w.reviewCount || 0) === 0);
  const masteryPercentage = totalWords > 0 ? Math.round((masteredWords.length / totalWords) * 100) : 0;

  // Grammatical types breakdown
  const typesMap: Record<string, { total: number; mastered: number }> = {};
  savedWords.forEach((w) => {
    const rawType = (w.type || 'autre').toLowerCase();
    const cleanType = rawType.includes('nom')
      ? 'Noms'
      : rawType.includes('verb')
      ? 'Verbes'
      : rawType.includes('adj')
      ? 'Adjectifs'
      : 'Autres';

    if (!typesMap[cleanType]) typesMap[cleanType] = { total: 0, mastered: 0 };
    typesMap[cleanType].total += 1;
    if (w.mastered) typesMap[cleanType].mastered += 1;
  });

  // 3. Learning Time Statistics
  const { hours, minutes, text: formattedTotalTime } = formatDuration(progress.totalLearningSeconds);
  const dayKeys = getPastDaysKeys(timeRangeDays);
  const todayKey = getTodayKey();

  const dailyData = dayKeys.map((key) => {
    const item = progress.dailyHistory[key] || {
      date: key,
      minutes: 0,
      textsRead: 0,
      wordsPracticed: 0,
      exercisesCompleted: 0,
    };
    return {
      key,
      label: formatDayLabelFr(key),
      minutes: item.minutes,
      textsRead: item.textsRead,
      wordsPracticed: item.wordsPracticed,
      exercisesCompleted: item.exercisesCompleted,
      isToday: key === todayKey,
    };
  });

  const maxMinutesInChart = Math.max(30, ...dailyData.map((d) => d.minutes));
  const totalMinutesInPeriod = dailyData.reduce((acc, curr) => acc + curr.minutes, 0);
  const averageMinutesPerDay = Math.round(totalMinutesInPeriod / timeRangeDays);

  // Total exercises completed across history
  const totalExercisesDone = Object.values(progress.dailyHistory).reduce(
    (acc, cur) => acc + (cur.exercisesCompleted || 0),
    0
  );

  // Filtered Texts List
  const filteredTexts = allTexts.filter((text) => {
    const isRead = progress.readTextIds.includes(text.id);
    if (textFilter === 'READ' && !isRead) return false;
    if (textFilter === 'UNREAD' && isRead) return false;
    if (textFilter === 'A1' && !text.level.startsWith('A1')) return false;
    if (textFilter === 'B1' && !text.level.startsWith('B1')) return false;
    if (textFilter === 'C1' && !text.level.startsWith('C1')) return false;
    if (textFilter === 'DIALOGUE' && !text.titleEn.toLowerCase().startsWith('dialogue')) return false;
    if (textFilter === 'ARTICLE' && text.titleEn.toLowerCase().startsWith('dialogue')) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = text.titleEn.toLowerCase().includes(q);
      const matchFr = text.titleFr.toLowerCase().includes(q);
      const matchTopic = text.topic.toLowerCase().includes(q);
      return matchEn || matchFr || matchTopic;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <BarChart2 className="w-4 h-4" />
            <span>Tableau de Bord & Analytics</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">Suivi en direct de votre apprentissage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-3">
            <span>Votre Progression</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {progress.streakDays} jours consécutifs
            </span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Visualisez le nombre de textes explorés, la maîtrise de votre vocabulaire et le temps total dédié à la lecture bilingue et aux exercices.
          </p>
        </div>

        {/* Quick action controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onAddMinutes(15)}
            title="Ajouter 15 minutes d'étude active au compteur"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>+15 min d'étude</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            title="Réinitialiser les statistiques d'apprentissage"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Réinitialiser vos statistiques ?</h3>
            <p className="text-sm text-slate-600 mt-2">
              Cette action remettra à zéro l'historique des textes lus et le temps d'apprentissage. Votre carnet de vocabulaire restera conservé.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Confirmer la réinitialisation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3 Main Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* Metric 1: Textes Lus */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative overflow-hidden group hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Textes Lus</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{readTextsCount}</span>
            <span className="text-sm text-slate-400 font-medium">/ {totalTexts} textes</span>
          </div>
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-600 font-medium">{readPercentage}% complété</span>
              <span className="text-slate-400">{totalTexts - readTextsCount} restants</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${readPercentage}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>A1: <strong className="text-slate-700">{a1Read}</strong>/{a1Texts.length}</span>
            <span>B1: <strong className="text-slate-700">{b1Read}</strong>/{b1Texts.length}</span>
            <span>C1: <strong className="text-slate-700">{c1Read}</strong>/{c1Texts.length}</span>
          </div>
        </div>

        {/* Metric 2: Mots Maîtrisés */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Mots Maîtrisés</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700">{masteredWords.length}</span>
            <span className="text-sm text-slate-400 font-medium">/ {totalWords} mots sauvés</span>
          </div>
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-emerald-700 font-medium">{masteryPercentage}% de maîtrise</span>
              <span className="text-slate-400">{inProgressWords.length + newWords.length} en cours</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>En révision: <strong className="text-slate-700">{inProgressWords.length}</strong></span>
            <span>Nouveaux: <strong className="text-slate-700">{newWords.length}</strong></span>
            <button
              onClick={() => onNavigateTab('notebook')}
              className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
            >
              Réviser
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3: Temps d'apprentissage Total */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative overflow-hidden group hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Temps d'apprentissage</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{formattedTotalTime}</span>
            <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 font-semibold px-2 py-0.5 rounded-full">
              Actif
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-600 font-medium">Moyenne 7 jours</span>
              <span className="text-slate-700 font-bold">{averageMinutesPerDay} min / jour</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (averageMinutesPerDay / 30) * 100)}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Aujourd'hui: <strong className="text-slate-700">{progress.dailyHistory[todayKey]?.minutes || 0} min</strong></span>
            <span>Exercices faits: <strong className="text-slate-700">{totalExercisesDone}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Graph 1: Weekly & Daily Learning Time Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Temps d'Apprentissage Quotidien</h3>
                  <p className="text-xs text-slate-500">Minutes actives passées à lire et s'entraîner</p>
                </div>
              </div>

              {/* Range Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setTimeRangeDays(7)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeRangeDays === 7 ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  7 derniers jours
                </button>
                <button
                  onClick={() => setTimeRangeDays(14)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeRangeDays === 14 ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  14 jours
                </button>
              </div>
            </div>

            {/* Target indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 mt-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block" />
                <span>Minutes passées</span>
                <span className="w-2.5 h-0.5 bg-amber-500 inline-block ml-3" />
                <span>Objectif (25 min)</span>
              </div>
              <span className="font-medium text-slate-700">Total période : {totalMinutesInPeriod} min</span>
            </div>

            {/* Interactive SVG Bar Chart */}
            <div className="relative pt-6 pb-2">
              {/* Target Line at 25 min */}
              <div
                className="absolute left-0 right-0 border-t border-dashed border-amber-400 z-10 pointer-events-none flex items-center justify-end"
                style={{
                  bottom: `${Math.min(90, (25 / maxMinutesInChart) * 160 + 35)}px`,
                }}
              >
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50/90 px-1.5 py-0.5 rounded border border-amber-200 mr-1">
                  25 min
                </span>
              </div>

              {/* Bars flex container */}
              <div className="flex items-end justify-between gap-2 h-44 px-2">
                {dailyData.map((d, index) => {
                  const barHeightPercent = Math.max(8, (d.minutes / maxMinutesInChart) * 100);
                  const isHovered = hoveredBarIndex === index;
                  return (
                    <div
                      key={d.key}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                      onMouseEnter={() => setHoveredBarIndex(index)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                    >
                      {/* Floating tooltip */}
                      {isHovered && (
                        <div className="absolute -top-14 z-30 bg-slate-900 text-white text-[11px] py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none flex flex-col items-center">
                          <span className="font-bold text-amber-300">{d.minutes} minutes</span>
                          <span className="text-slate-300 text-[10px]">
                            {d.textsRead} texte(s) · {d.exercisesCompleted} ex.
                          </span>
                          <div className="w-2 h-2 bg-slate-900 rotate-45 -mb-1 mt-0.5" />
                        </div>
                      )}

                      {/* Bar */}
                      <div
                        className={`w-full max-w-[32px] rounded-t-lg transition-all duration-300 ${
                          d.isToday
                            ? 'bg-gradient-to-t from-blue-700 to-indigo-500 shadow-sm shadow-blue-500/20'
                            : d.minutes >= 25
                            ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                            : d.minutes > 0
                            ? 'bg-blue-300 group-hover:bg-blue-500'
                            : 'bg-slate-100 group-hover:bg-slate-200'
                        } ${isHovered ? 'brightness-110 scale-y-105 origin-bottom' : ''}`}
                        style={{ height: `${barHeightPercent}%` }}
                      >
                        {d.minutes > 0 && (
                          <div className="text-[10px] text-white font-bold text-center pt-1 hidden sm:block">
                            {d.minutes >= 15 ? `${d.minutes}m` : ''}
                          </div>
                        )}
                      </div>

                      {/* Day Label */}
                      <span
                        className={`text-[11px] mt-2 font-medium capitalize ${
                          d.isToday ? 'text-blue-600 font-bold' : 'text-slate-500'
                        }`}
                      >
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Session active en temps réel</span>
            </div>
            <span>Objectif quotidien recommandé : 25-30 min</span>
          </div>
        </div>

        {/* Graph 2: Reading Progression by Level & Formats (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <PieChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Textes Lus par Niveau</h3>
                <p className="text-xs text-slate-500">Répartition des 67+ cours bilingues</p>
              </div>
            </div>

            {/* Level Bars */}
            <div className="space-y-4 mt-5">
              {/* A1-A2 Débutant */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    A1-A2 Débutant
                  </span>
                  <span className="text-slate-700">
                    {a1Read} / {a1Texts.length} ({a1Texts.length ? Math.round((a1Read / a1Texts.length) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${a1Texts.length ? (a1Read / a1Texts.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* B1-B2 Intermédiaire */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-blue-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    B1-B2 Intermédiaire
                  </span>
                  <span className="text-slate-700">
                    {b1Read} / {b1Texts.length} ({b1Texts.length ? Math.round((b1Read / b1Texts.length) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${b1Texts.length ? (b1Read / b1Texts.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* C1 Avancé */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-purple-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    C1 Avancé
                  </span>
                  <span className="text-slate-700">
                    {c1Read} / {c1Texts.length} ({c1Texts.length ? Math.round((c1Read / c1Texts.length) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${c1Texts.length ? (c1Read / c1Texts.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Format Distribution: Dialogues vs Articles */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Format des contenus d'actualité
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <span className="text-[11px] font-bold text-amber-900 block">💬 Dialogues (50%)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-extrabold text-amber-950">{dialogueRead}</span>
                    <span className="text-xs text-amber-700">/ {dialogueTexts.length} lus</span>
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/60 border border-indigo-200/80 rounded-xl">
                  <span className="text-[11px] font-bold text-indigo-900 block">📰 Articles (50%)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-extrabold text-indigo-950">{articleRead}</span>
                    <span className="text-xs text-indigo-700">/ {articleTexts.length} lus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('reader')}
              className="w-full py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Continuer la lecture bilingue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Vocabulary Mastery Breakdown Chart & Categories */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Mots Maîtrisés & Carnet de Vocabulaire</h3>
              <p className="text-xs text-slate-500">Suivi de mémorisation active et répartition lexicale</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('notebook')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lancer un Quiz QCM sur mes mots</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-5 items-center">
          {/* Donut Chart Visual */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/60 rounded-xl border border-slate-100">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Circular SVG Donut */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-slate-200"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Mastered Segment (Green) */}
                {totalWords > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    className="stroke-emerald-500 transition-all duration-700"
                    strokeWidth="12"
                    strokeDasharray={`${(masteredWords.length / totalWords) * 238.76} 238.76`}
                    strokeDashoffset="0"
                    fill="none"
                    strokeLinecap="round"
                  />
                )}
                {/* In Review Segment (Blue) */}
                {totalWords > 0 && inProgressWords.length > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    className="stroke-blue-500 transition-all duration-700"
                    strokeWidth="12"
                    strokeDasharray={`${(inProgressWords.length / totalWords) * 238.76} 238.76`}
                    strokeDashoffset={`-${(masteredWords.length / totalWords) * 238.76}`}
                    fill="none"
                    strokeLinecap="round"
                  />
                )}
              </svg>
              {/* Center Counter */}
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-2xl font-black text-slate-900">{masteryPercentage}%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  Maîtrisés
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="flex items-center gap-4 text-xs mt-3 flex-wrap justify-center">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Maîtrisés ({masteredWords.length})
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                En cours ({inProgressWords.length})
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                Nouveaux ({newWords.length})
              </span>
            </div>
          </div>

          {/* Categories / Grammatical Breakdown */}
          <div className="md:col-span-7 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Répartition par catégorie grammaticale
            </h4>
            {Object.keys(typesMap).length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                Sauvegardez des mots au cours de votre lecture pour les voir apparaître ici.
              </p>
            ) : (
              Object.entries(typesMap).map(([typeLabel, stats]) => {
                const ratio = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
                return (
                  <div key={typeLabel} className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800">{typeLabel}</span>
                      <span className="text-slate-600">
                        <strong className="text-emerald-700">{stats.mastered}</strong> / {stats.total} maîtrisés ({ratio}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}

            {/* Recently Mastered Words Tags */}
            {masteredWords.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                  Mots récemment validés :
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {masteredWords.slice(0, 6).map((w) => (
                    <span
                      key={w.en}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{w.en}</span>
                      <span className="text-emerald-700/80 font-amiri text-xs mr-0.5">({w.ar})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Interactive Filterable Texts Explorer with Read/Unread Status */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookCheck className="w-5 h-5 text-blue-600" />
              <span>Suivi Détaille des Textes ({filteredTexts.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Cochez les textes terminés ou lancez une session directement
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Chercher un texte, thème..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap mt-4 text-xs font-medium">
          <button
            onClick={() => setTextFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              textFilter === 'ALL'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tous ({allTexts.length})
          </button>
          <button
            onClick={() => setTextFilter('READ')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              textFilter === 'READ'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Lus ({readTextsCount})
          </button>
          <button
            onClick={() => setTextFilter('UNREAD')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              textFilter === 'UNREAD'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            À lire ({totalTexts - readTextsCount})
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => setTextFilter('A1')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              textFilter === 'A1'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            A1 Débutant ({a1Texts.length})
          </button>
          <button
            onClick={() => setTextFilter('B1')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              textFilter === 'B1'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            B1 Intermédiaire ({b1Texts.length})
          </button>
          <button
            onClick={() => setTextFilter('C1')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              textFilter === 'C1'
                ? 'bg-purple-600 text-white font-semibold'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
            }`}
          >
            C1 Avancé ({c1Texts.length})
          </button>
        </div>

        {/* Text Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4 max-h-[520px] overflow-y-auto pr-1">
          {filteredTexts.length === 0 ? (
            <div className="col-span-full py-8 text-center text-xs text-slate-500">
              Aucun texte ne correspond à ce filtre.
            </div>
          ) : (
            filteredTexts.map((text) => {
              const isRead = progress.readTextIds.includes(text.id);
              const isDialogue = text.titleEn.toLowerCase().startsWith('dialogue');
              const levelColor = text.level.startsWith('A1')
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : text.level.startsWith('B1')
                ? 'text-blue-700 bg-blue-50 border-blue-200'
                : 'text-purple-700 bg-purple-50 border-purple-200';

              return (
                <div
                  key={text.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isRead
                      ? 'bg-white border-blue-200/80 shadow-2xs'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${levelColor}`}>
                        {text.level.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {isDialogue ? '💬 Dialogue' : '📰 Actualité'}
                      </span>
                    </div>

                    {/* Checkbox toggle read */}
                    <button
                      onClick={() => onToggleTextRead(text.id)}
                      title={isRead ? 'Marqué comme lu (cliquer pour annuler)' : 'Marquer comme lu'}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                        isRead
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-600 hover:bg-blue-100 hover:text-blue-700'
                      }`}
                    >
                      {isRead ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Lu</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3 h-3" />
                          <span>Non lu</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                    {text.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {text.titleFr}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-400 font-mono">{text.readTime}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onSelectText(text);
                          onNavigateTab('reader');
                        }}
                        className="px-2 py-0.5 rounded text-blue-600 font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        Lire
                      </button>
                      <button
                        onClick={() => {
                          onSelectText(text);
                          onNavigateTab('exercises');
                        }}
                        className="px-2 py-0.5 rounded text-slate-600 font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Exercices
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
