import { UserProgress, DailyLearningActivity } from '../types';

const STORAGE_KEY = 'linguaduo_progress';

// Helper to format date as 'YYYY-MM-DD'
export function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate the past N days date keys
export function getPastDaysKeys(numDays = 7): string[] {
  const keys: string[] = [];
  const now = new Date();
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    keys.push(`${year}-${month}-${day}`);
  }
  return keys;
}

// Day name in French
export function formatDayLabelFr(dateKey: string): string {
  try {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '');
  } catch {
    return dateKey;
  }
}

// Default initial progress if none saved
export function getDefaultProgress(): UserProgress {
  const days = getPastDaysKeys(7);
  const initialHistory: Record<string, DailyLearningActivity> = {};

  // Realistic sample history for the week
  const sampleMinutes = [22, 18, 35, 15, 28, 40, 25];
  const sampleTexts = [1, 1, 2, 0, 1, 2, 1];
  const sampleWords = [3, 2, 5, 1, 4, 6, 3];
  const sampleExercises = [5, 4, 8, 2, 6, 10, 5];

  let totalSecs = 0;
  days.forEach((dayKey, idx) => {
    const mins = sampleMinutes[idx % sampleMinutes.length];
    totalSecs += mins * 60;
    initialHistory[dayKey] = {
      date: dayKey,
      minutes: mins,
      textsRead: sampleTexts[idx % sampleTexts.length],
      wordsPracticed: sampleWords[idx % sampleWords.length],
      exercisesCompleted: sampleExercises[idx % sampleExercises.length],
    };
  });

  return {
    readTextIds: ['intro-1', 'intro-2', 'a1-dial-1', 'a1-art-1', 'b1-dial-1'],
    totalLearningSeconds: totalSecs + 180, // ~3 hours
    dailyHistory: initialHistory,
    streakDays: 7,
    lastActiveDate: getTodayKey(),
  };
}

export function loadUserProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure dailyHistory has today's entry
      const today = getTodayKey();
      if (!parsed.dailyHistory) parsed.dailyHistory = {};
      if (!parsed.dailyHistory[today]) {
        parsed.dailyHistory[today] = {
          date: today,
          minutes: 0,
          textsRead: 0,
          wordsPracticed: 0,
          exercisesCompleted: 0,
        };
      }
      return parsed;
    }
  } catch {}
  return getDefaultProgress();
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

export function formatDuration(seconds: number): { hours: number; minutes: number; text: string } {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return { hours, minutes, text: `${hours}h ${minutes.toString().padStart(2, '0')}m` };
  }
  return { hours: 0, minutes, text: `${minutes} min` };
}
