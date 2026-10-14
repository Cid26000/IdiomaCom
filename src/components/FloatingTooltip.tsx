import React, { useEffect, useRef } from 'react';
import { Volume2, Bookmark, Check, X } from 'lucide-react';
import { HoverWordInfo, SavedWord } from '../types';
import { speakText } from '../utils/audio';

interface FloatingTooltipProps {
  info: HoverWordInfo | null;
  onClose: () => void;
  onSaveWord: (wordInfo: HoverWordInfo) => void;
  isSaved: boolean;
  isLocked?: boolean;
}

export const FloatingTooltip: React.FC<FloatingTooltipProps> = ({
  info,
  onClose,
  onSaveWord,
  isSaved,
  isLocked = false,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);

  // Auto-reposition to avoid viewport overflow
  const [coords, setCoords] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (!info) return;

    const width = 290;
    const height = 180;
    const padding = 16;

    let targetX = info.x + 12;
    let targetY = info.y + 16;

    // Viewport boundaries
    const maxX = window.innerWidth - width - padding;
    const maxY = window.innerHeight - height - padding;

    if (targetX > maxX) {
      targetX = Math.max(padding, info.x - width - 12);
    }

    if (targetY > maxY) {
      targetY = Math.max(padding, info.y - height - 12);
    }

    setCoords({
      left: Math.max(padding, targetX),
      top: Math.max(padding, targetY),
    });
  }, [info]);

  if (!info) return null;

  const handlePlayAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    await speakText(info.en, 'en-US');
    setIsPlayingAudio(false);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveWord(info);
  };

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        zIndex: 9999,
      }}
      className="w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200/90 text-slate-800 p-3.5 transition-all duration-150 animate-in fade-in zoom-in-95 pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top row: Word source, phonetics, and close/actions */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-900 text-base tracking-tight truncate">
              {info.word}
            </span>
            {info.type && (
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                {info.type}
              </span>
            )}
          </div>
          {info.phonetic && (
            <span className="text-xs text-slate-500 font-mono tracking-wide">
              {info.phonetic}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handlePlayAudio}
            title="Écouter la prononciation anglaise"
            className={`p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors ${
              isPlayingAudio ? 'text-blue-600 bg-blue-50 animate-pulse' : ''
            }`}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleSave}
            title={isSaved ? 'Déjà dans votre carnet' : 'Ajouter au carnet de vocabulaire'}
            className={`p-1.5 rounded-lg transition-colors ${
              isSaved
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {isLocked && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Arabic Translation Display */}
      <div className="py-2.5 px-3 my-2 bg-gradient-to-r from-amber-50/70 to-orange-50/50 rounded-lg border border-amber-200/60">
        <div className="text-[10px] uppercase font-semibold tracking-wider text-amber-800/80 mb-0.5">
          Traduction en arabe
        </div>
        <div
          dir="rtl"
          className="font-arabic text-2xl font-bold text-amber-950 text-right leading-relaxed select-text"
        >
          {info.ar}
        </div>
      </div>

      {/* Counterpart in French/English */}
      <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
        <span className="text-slate-600 font-medium truncate max-w-[170px]" title={info.sourceLang === 'en' ? info.fr : info.en}>
          {info.sourceLang === 'en' ? `FR: ${info.fr}` : `EN: ${info.en}`}
        </span>
        <span className="text-[11px] text-slate-400">
          {isSaved ? 'Enregistré' : 'Survol actif'}
        </span>
      </div>
    </div>
  );
};
