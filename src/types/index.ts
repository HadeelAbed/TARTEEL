export type ThemeMode = 'dark' | 'light' | 'sepia';
export type UserPersona = 'adult' | 'child';
export type TextDirection = 'rtl' | 'ltr';
export type ViewportMode = 'web' | 'mobile' | 'split';
export type QuranFontSize = 'normal' | 'large' | 'xlarge';

export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export interface ScreenMetadata {
  id: ScreenId;
  titleAr: string;
  titleEn: string;
  category: 'Onboarding & Auth' | 'Core Experience' | 'Audio & AI' | 'Growth & Gamification' | 'System & Offline';
  descriptionAr: string;
  descriptionEn: string;
  platformFocus: 'Cross-Platform' | 'Web Primary' | 'Mobile Primary';
}

export interface Ayah {
  numberInSurah: number;
  arabicNumeral: string;
  textUthmanic: string;
  transliteration: string;
  translationEn: string;
  translationAr: string;
  juz: number;
  rubElHizb: number;
  tajweedNotes?: string[];
  words: {
    word: string;
    translit: string;
    hasDiff?: boolean;
    diffNote?: string;
    suggestedReview?: string;
  }[];
}

export interface Surah {
  number: number;
  nameAr: string;
  nameEn: string;
  translationEn: string;
  ayahCount: number;
  juz: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationTypeAr: 'مكية' | 'مدنية';
  masteryPercentage: number;
  masteryStatus: 'memorized' | 'in_progress' | 'review_due' | 'untouched';
  lastRecitedAt?: string;
  nextRevisionDue?: string;
}

export interface Reciter {
  id: string;
  nameAr: string;
  nameEn: string;
  styleAr: string;
  styleEn: string;
  avatarInitials: string;
  bitrate: string;
}

export interface SpacedRepetitionItem {
  id: string;
  surahNumber: number;
  surahNameAr: string;
  ayahRange: string;
  intervalDays: number;
  repetitionCount: number;
  lastRetentionScore: number;
  dueDate: string;
  dueTimeAr: string;
  urgency: 'high' | 'normal' | 'ready';
}

export interface Achievement {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  category: 'retention' | 'consistency' | 'tajweed' | 'mastery';
  xpReward: number;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  tier: 'brass' | 'silver' | 'gold' | 'celestial';
  wireframeShape: 'octagon' | 'decagon' | 'hexagram';
}

export interface XpLedgerEntry {
  id: string;
  eventName: string;
  eventNameAr: string;
  xpDelta: number;
  timestamp: string;
  serverHash: string;
  verified: boolean;
}

export interface DailyChallenge {
  id: string;
  titleAr: string;
  titleEn: string;
  current: number;
  target: number;
  unitAr: string;
  xp: number;
  completed: boolean;
}

export interface LaravelApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  auth: 'Sanctum Bearer' | 'Public' | 'Parental PIN';
  descriptionAr: string;
  descriptionEn: string;
  requestPayload?: Record<string, any>;
  responsePayload: Record<string, any>;
}
