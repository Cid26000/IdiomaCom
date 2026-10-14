import React from 'react';
import { BookOpen, Sparkles, BookmarkCheck, FileUp, BarChart3 } from 'lucide-react';

export type ActiveTab = 'reader' | 'exercises' | 'notebook' | 'dashboard' | 'importer';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  savedWordsCount: number;
  dueWordsCount?: number;
  isArabicTooltipEnabled: boolean;
  onToggleArabicTooltip: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  savedWordsCount,
  dueWordsCount = 0,
  isArabicTooltipEnabled,
  onToggleArabicTooltip,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('reader')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <div className="text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-lg inline-flex items-center justify-center text-xs font-black shadow-sm shadow-blue-500/20">
              LD
            </span>
            <span>LinguaDuo</span>
            <span className="hidden sm:inline text-xs font-medium text-slate-400 font-mono tracking-tight ml-1">
              EN · FR · العربية
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="flex items-center gap-1.5 sm:gap-4 md:gap-5 text-sm font-medium text-slate-600 overflow-x-auto py-1">
          <button
            onClick={() => onSelectTab('reader')}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'reader'
                ? 'text-blue-600 bg-blue-50/80 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lecture Bilingue</span>
          </button>

          <button
            onClick={() => onSelectTab('exercises')}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'exercises'
                ? 'text-blue-600 bg-blue-50/80 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Exercices</span>
          </button>

          <button
            onClick={() => onSelectTab('notebook')}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer relative ${
              activeTab === 'notebook'
                ? 'text-blue-600 bg-blue-50/80 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Mon Carnet</span>
            {dueWordsCount > 0 ? (
              <span
                title={`${dueWordsCount} mot(s) à réviser aujourd'hui (Répétition espacée)`}
                className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[18px] text-center animate-pulse"
              >
                {dueWordsCount} SRS
              </span>
            ) : savedWordsCount > 0 ? (
              <span className="bg-slate-200 text-slate-700 text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {savedWordsCount}
              </span>
            ) : null}
          </button>

          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-blue-600 bg-blue-50/80 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Progression</span>
          </button>

          <button
            onClick={() => onSelectTab('importer')}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'importer'
                ? 'text-blue-600 bg-blue-50/80 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileUp className="w-4 h-4" />
            <span className="hidden lg:inline">Importer un Texte</span>
            <span className="lg:hidden">Importer</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Arabic Tooltip Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <label
            title="Activer ou désactiver l'infobulle de traduction arabe au survol du curseur"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer select-none transition-all ${
              isArabicTooltipEnabled
                ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <input
              type="checkbox"
              checked={isArabicTooltipEnabled}
              onChange={(e) => onToggleArabicTooltip(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
            />
            <span className="hidden sm:inline">Curseur Arabe</span>
            <span className="sm:hidden">Arabe</span>
            <span
              className={`text-[10px] font-bold px-1 py-0.2 rounded ${
                isArabicTooltipEnabled ? 'bg-amber-200 text-amber-950' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {isArabicTooltipEnabled ? 'ON' : 'OFF'}
            </span>
          </label>

          <button
            onClick={() => onSelectTab(activeTab === 'exercises' ? 'reader' : 'exercises')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            {activeTab === 'exercises' ? 'Retour Lecture' : 'Faire les Exercices'}
          </button>
        </div>
      </div>
    </header>
  );
};
