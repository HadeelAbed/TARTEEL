import React from 'react';
import { ThemeMode, UserPersona, ScreenId } from '../../types';
import { SURAHS_SAMPLE, SPACED_REPETITION_QUEUE } from '../../data/quranData';
import { Mic, Flame, Clock, Play, BookOpen, Sparkles, ChevronLeft, ShieldCheck } from 'lucide-react';

interface Screen04MobileHomeProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
  onOpenKidsStudio?: () => void;
}

export const Screen04MobileHome: React.FC<Screen04MobileHomeProps> = ({
  theme,
  persona,
  onNavigateScreen,
  onOpenKidsStudio,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';
  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 font-ar space-y-4" dir="rtl">
      {/* Top Profile & Streak Header */}
      <div className="flex items-center justify-between py-1">
        <div>
          <span className="text-[11px] text-slate-400 font-medium block">
            {isChild ? 'وردك اليومي يا بطل' : 'الورد اليومي والمراجعة'}
          </span>
          <h2 className="text-lg font-bold" style={{ color: textColor }}>
            {isChild ? 'عبد الرحمن الصالح' : 'زياد المنصوري'}
          </h2>
        </div>

        {/* Streak Flame Container */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 min-h-[44px]">
          <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold font-nums text-amber-500">
            ٢١ يوماً
          </span>
        </div>
      </div>

      {/* Child Interactive Companion Card */}
      {isChild && (
        <div
          onClick={onOpenKidsStudio || (() => onNavigateScreen(6))}
          className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-sky-500/15 to-amber-500/20 border border-amber-400/40 flex items-center justify-between gap-3 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              ⭐
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-500 font-nums uppercase tracking-wide block">
                • رفيق الحفظ التفاعلي (سِراج)
              </span>
              <h4 className="text-sm font-bold" style={{ color: textColor }}>
                ألعاب التثبيت وترتيل جزء عم مع النجوم
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                رتّل واجمع نجوم الإتقان ورتب كلمات الآية
              </p>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 text-amber-500 shrink-0" />
        </div>
      )}

      {/* Hero "Resume Recitation" Instant Widget */}
      <div
        onClick={() => onNavigateScreen(6)}
        className={`p-5 rounded-3xl relative overflow-hidden cursor-pointer transition-all active:scale-[0.98] border ${
          isDark
            ? 'glass-obsidian border-amber-400/30 shadow-lg'
            : isSepia
            ? 'glass-sepia border-amber-500/30'
            : 'surface-alabaster border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-sky-500 uppercase font-nums block mb-1">
              • آخر موضع وقفت عنده
            </span>
            <h3 className="text-xl font-bold" style={{ color: textColor }}>
              سورة الملك — الآية ٣
            </h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-nums">
              <span>الجزء ٢٩</span>
              <span aria-hidden="true">·</span>
              <span>الحزب ٥٧</span>
              <span aria-hidden="true">·</span>
              <span style={{ color: goldPrimary }}>إتقان ٧٨٪</span>
            </p>
          </div>

          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-105"
            style={{
              backgroundColor: goldPrimary,
              color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
            }}
          >
            <Play className="w-5 h-5 fill-current mr-0.5" />
          </div>
        </div>

        {/* Minimalist Progress Strip */}
        <div className="w-full bg-slate-800/40 rounded-full h-1.5 overflow-hidden mt-3">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: '78%', backgroundColor: goldPrimary }}
          />
        </div>
      </div>

      {/* Thumb-Zone Primary CTA (Bottom 30%) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onNavigateScreen(6)}
          className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98 smooth-press"
          style={{
            backgroundColor: goldPrimary,
            color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
          }}
        >
          <Mic className="w-5 h-5" />
          <span>ابدأ جلسة ترتيل سريعة الآن</span>
        </button>
      </div>

      {/* Spaced Repetition Due Today Queue */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold flex items-center gap-1.5" style={{ color: textColor }}>
            <Clock className="w-3.5 h-3.5 text-sky-500" />
            <span>مراجعات التثبيت المستحقة</span>
          </h4>
          <span className="text-[11px] font-nums font-semibold text-sky-500">
            ٣ سور
          </span>
        </div>

        {SPACED_REPETITION_QUEUE.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateScreen(6)}
            className="p-3.5 rounded-2xl bg-slate-800/30 dark:bg-slate-900/40 border border-white/5 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
          >
            <div>
              <span className="text-xs font-bold block" style={{ color: textColor }}>
                {item.surahNameAr}
              </span>
              <span className="text-[11px] text-slate-400 font-nums">
                {item.ayahRange} · دقة {item.lastRetentionScore}٪
              </span>
            </div>

            <div className="text-left font-nums text-[11px] text-sky-500 font-medium">
              {item.dueTimeAr}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
