import { SavedWord, SrsRating } from '../types';

/**
 * Spaced Repetition System (SRS) using an adapted SuperMemo SM-2 algorithm.
 * Stages:
 * 0: New word (0 days, due immediately)
 * 1: Stage 1 (~1 day)
 * 2: Stage 2 (~3 days)
 * 3: Stage 3 (~7 days)
 * 4: Stage 4 (~14 days)
 * 5: Stage 5 (~30 days)
 * 6: Stage 6+ (~60+ days / Long-term memory)
 */

export const SRS_STAGES_INFO = [
  { stage: 0, label: 'Nouveau', interval: 'Immédiat', color: 'slate', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
  { stage: 1, label: 'Éveil', interval: '1 jour', color: 'amber', badge: 'bg-amber-50 text-amber-800 border-amber-200' },
  { stage: 2, label: 'Familiarisation', interval: '3 jours', color: 'orange', badge: 'bg-orange-50 text-orange-800 border-orange-200' },
  { stage: 3, label: 'Renforcement', interval: '7 jours', color: 'blue', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
  { stage: 4, label: 'Consolidation', interval: '14 jours', color: 'indigo', badge: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { stage: 5, label: 'Maîtrise', interval: '30 jours', color: 'emerald', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { stage: 6, label: 'Mémoire Longue', interval: '60+ jours', color: 'teal', badge: 'bg-teal-50 text-teal-800 border-teal-200' },
];

export function isWordDue(word: SavedWord): boolean {
  if (!word.nextReviewAt) return true;
  return word.nextReviewAt <= Date.now();
}

export function getDueWords(words: SavedWord[]): SavedWord[] {
  return words.filter(isWordDue);
}

export function getNextDueTimeLabel(nextReviewAt?: number): string {
  if (!nextReviewAt) return 'À réviser maintenant';
  const diffMs = nextReviewAt - Date.now();
  if (diffMs <= 0) return 'À réviser maintenant';

  const diffHours = Math.round(diffMs / (3600 * 1000));
  if (diffHours < 24) {
    return `Dans ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  }
  const diffDays = Math.round(diffMs / (86400 * 1000));
  if (diffDays === 1) return 'Demain';
  if (diffDays < 7) return `Dans ${diffDays} jours`;
  if (diffDays < 30) return `Dans ${Math.round(diffDays / 7)} sem.`;
  return `Dans ${Math.round(diffDays / 30)} mois`;
}

export function formatIntervalDays(days: number): string {
  if (days <= 0) return 'Immédiat';
  if (days === 1) return '1 jour';
  if (days < 7) return `${days} jours`;
  if (days === 7) return '1 semaine';
  if (days < 30) return `${Math.round(days / 7)} semaines`;
  if (days === 30) return '1 mois';
  return `${Math.round(days / 30)} mois`;
}

/**
 * Calculates next interval, stage and ease factor based on user rating.
 */
export function calculateNextSrsState(word: SavedWord, rating: SrsRating): SavedWord {
  const currentStage = word.srsStage || 0;
  const currentInterval = word.intervalDays || 0;
  const currentEase = word.easeFactor || 2.5;
  const now = Date.now();

  let nextStage = currentStage;
  let nextInterval = currentInterval;
  let nextEase = currentEase;

  switch (rating) {
    case 'again': // Failed recall
      nextStage = 1; // Reset to stage 1
      nextInterval = 1; // Due next day
      nextEase = Math.max(1.3, currentEase - 0.2);
      break;

    case 'hard': // Recalled with difficulty
      nextStage = Math.max(1, currentStage);
      nextInterval = Math.max(1, Math.round((currentInterval || 1) * 1.2));
      nextEase = Math.max(1.3, currentEase - 0.15);
      break;

    case 'good': // Recalled correctly
      nextStage = currentStage + 1;
      if (nextStage === 1) {
        nextInterval = 1;
      } else if (nextStage === 2) {
        nextInterval = 3;
      } else if (nextStage === 3) {
        nextInterval = 7;
      } else if (nextStage === 4) {
        nextInterval = 14;
      } else {
        nextInterval = Math.round((currentInterval || 14) * nextEase);
      }
      break;

    case 'easy': // Perfect instant recall
      nextStage = currentStage + 2;
      nextEase = Math.min(3.2, currentEase + 0.15);
      if (nextStage <= 2) {
        nextInterval = 4;
      } else if (nextStage === 3) {
        nextInterval = 10;
      } else {
        nextInterval = Math.round(((currentInterval || 7) * nextEase) * 1.3);
      }
      break;
  }

  // Next review timestamp
  const nextReviewAt = now + nextInterval * 24 * 60 * 60 * 1000;
  // Mark as mastered if stage reaches 5 or more
  const isMastered = nextStage >= 5;

  return {
    ...word,
    srsStage: nextStage,
    intervalDays: nextInterval,
    easeFactor: Number(nextEase.toFixed(2)),
    nextReviewAt,
    lastReviewedAt: now,
    reviewCount: (word.reviewCount || 0) + 1,
    mastered: isMastered,
  };
}
