import React, { useState } from 'react';
import { ThemeMode, UserPersona, ScreenId, Ayah } from '../../types';
import { SURAH_AL_MULK_AYAHS } from '../../data/quranData';
import { SoftDiffView } from '../common/SoftDiffView';
import { OctagonBadge } from '../common/OctagonBadge';
import { CheckCircle2, Sparkles, Volume2, ArrowLeft, RotateCcw, Share2, BookOpen } from 'lucide-react';

interface Screen09RecitationDiffProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
  onRetryRecording?: () => void;
}

export const Screen09RecitationDiff: React.FC<Screen09RecitationDiffProps> = ({
  theme,
  persona,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';
  const ayah: Ayah = SURAH_AL_MULK_AYAHS[1]; // Ayah 2 of Al-Mulk

  const [playedWord, setPlayedWord] = useState<string | null>(null);

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  const handlePlayWord = (word: string) => {
    setPlayedWord(word);
    setTimeout(() => setPlayedWord(null), 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-800/30 dark:bg-slate-900/50 border border-white/5 text-xs text-slate-400 font-nums">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold font-ar" style={{ color: textColor }}>
            اكتملت مراجعة الآية ومطابقتها بالرسم العثماني
          </span>
          <span aria-hidden="true">·</span>
          <span>سورة الملك (الآية ٢)</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-amber-500 font-ar font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+٥٠ نقطة إتقان مضافة لسجلك</span>
        </div>
      </div>

      {/* Recitation Score & Constructive Feedback Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl relative overflow-hidden transition-all border ${
          isDark
            ? 'glass-obsidian border-white/10'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>ترتيل خاشع ومتقن بنسبة ٩٦٪</span>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: textColor }}>
              {isChild ? 'أحسنت يا بطل! تلاوة رائعة وفوز بنجوم التثبيت' : 'تقييم الترتيل والتحليل الصوتي اللطيف'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تم فحص مخارج الحروف وأزمنة المدود وفق رواية حفص عن عاصم.
            </p>
          </div>

          {/* Reward XP Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/40 border border-white/5 shrink-0">
            <OctagonBadge size={52} theme={theme} level={96} tier="gold" title="درجة الإتقان" />
            <div className="text-right">
              <div className="text-[11px] text-slate-400">نقاط الخبرة</div>
              <div className="text-sm font-bold font-nums text-amber-500">
                +٥٠ XP إتقان
              </div>
            </div>
          </div>
        </div>

        {/* Soft Diff Interactive Area */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">
              التحليل التجويدي اللطيف للآية (Soft Diff):
            </span>
            <span className="text-[11px] text-sky-500 font-nums flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>انقر فوق أي كلمة للاستماع لنطق الشيخ المصحح</span>
            </span>
          </div>

          <SoftDiffView
            ayah={ayah}
            theme={theme}
            onPlayWord={handlePlayWord}
          />
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-white/10 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateScreen(8)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-white/5 cursor-pointer smooth-press"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التسميع مرة أخرى</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateScreen(6)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-white/5 cursor-pointer smooth-press"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>العودة لقراءة المصحف</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigateScreen(6)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer hover:opacity-95 smooth-press"
            style={{
              backgroundColor: goldPrimary,
              color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
            }}
          >
            <span>متابعة ترتيل الآية التالية (٣)</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
