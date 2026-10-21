import React from 'react';
import { ThemeMode, UserPersona, ScreenId } from '../../types';
import { SURAHS_SAMPLE, SPACED_REPETITION_QUEUE } from '../../data/quranData';
import { OctagonBadge } from '../common/OctagonBadge';
import { Mic, BookOpen, Flame, Clock, Sparkles, ChevronLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface Screen03WebDashboardProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
  onOpenKidsStudio?: () => void;
}

export const Screen03WebDashboard: React.FC<Screen03WebDashboardProps> = ({
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
    <div className="w-full max-w-7xl mx-auto py-4 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Special Kid's Studio Banner on Dashboard */}
      {onOpenKidsStudio && (
        <div
          onClick={onOpenKidsStudio}
          className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/15 via-sky-500/15 to-amber-500/15 border border-amber-400/40 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-2xl shadow-md">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-500 dark:text-amber-300">
                  استوديو البراعم التفاعلي (سِراج)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                  جديد للأطفال 🎮
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تلاوة مسلية، ألعاب ترتيب الكلمات ومطابقة البطاقات القرآنية، وشجرة الإتقان الذهبية.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-sm hover:opacity-95"
          >
            <span>دخول الاستوديو التفاعلي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Welcome & KPI Summary Split Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Greeting & Daily Goal Progress Ring */}
        <div
          className={`lg:col-span-8 p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden transition-all ${
            isDark ? 'glass-obsidian' : isSepia ? 'glass-sepia' : 'surface-alabaster'
          }`}
        >
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: textColor }}
                >
                  {isChild ? 'السلام عليكم يا بطل ترتيل!' : 'أهلاً بك، أتمَّ الله عليك بركة القرآن'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  وردك المجدول اليوم: سورة الملك (الآيات ١ - ١٢) ومراجعة تثبيت سورة النبأ.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 p-2 rounded-2xl bg-slate-800/30 dark:bg-slate-900/40 border border-white/5">
                <OctagonBadge size={50} theme={theme} level={21} tier="gold" title="سلسلة ٢١ يوماً" />
                <div className="text-right pl-2">
                  <div className="text-[11px] text-slate-400">الاستمرارية</div>
                  <div className="text-sm font-bold font-nums" style={{ color: goldPrimary }}>
                    ٢١ يوماً متواصلاً
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Goal Visual Ring & Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke={goldPrimary}
                      strokeWidth="3"
                      strokeDasharray="94.2"
                      strokeDashoffset="23.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="absolute font-nums text-xs font-bold"
                    style={{ color: textColor }}
                  >
                    75%
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-400">الهدف اليومي</div>
                  <div
                    className="text-sm font-semibold font-nums"
                    style={{ color: textColor }}
                  >
                    ١٥ من ٢٠ دقيقة
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">الآيات المرتلة اليوم</div>
                  <div
                    className="text-sm font-semibold font-nums"
                    style={{ color: textColor }}
                  >
                    ١٨ آية متقنة
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-500/10 text-[#E5C378] border border-amber-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">نقاط الإتقان XP</div>
                  <div
                    className="text-sm font-semibold font-nums"
                    style={{ color: textColor }}
                  >
                    +٣٢٥ اليوم
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigateScreen(6)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md cursor-pointer hover:opacity-95 smooth-press"
              style={{
                backgroundColor: goldPrimary,
                color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
              }}
            >
              <Mic className="w-4 h-4" />
              <span>متابعة ترتيل سورة الملك (الآية ٣)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateScreen(12)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800/40 hover:bg-slate-700/50 text-slate-300 dark:text-slate-200 border border-white/5 cursor-pointer smooth-press"
            >
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>استعراض جدول التكرار المتباعد</span>
            </button>
          </div>
        </div>

        {/* Right Column: Spaced Repetition Priority Queue Card */}
        <div
          className={`lg:col-span-4 p-6 rounded-3xl flex flex-col justify-between transition-all ${
            isDark ? 'glass-obsidian' : isSepia ? 'glass-sepia' : 'surface-alabaster'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-base font-bold flex items-center gap-2"
                style={{ color: textColor }}
              >
                <Clock className="w-4 h-4 text-sky-400" />
                <span>مراجعات التكرار المتباعد</span>
              </h2>
              <span className="text-xs font-nums text-sky-400 font-bold">FSRS v4</span>
            </div>

            <div className="space-y-3">
              {SPACED_REPETITION_QUEUE.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateScreen(6)}
                  className="p-3.5 rounded-2xl bg-slate-800/30 dark:bg-slate-900/40 hover:bg-slate-800/50 border border-white/5 cursor-pointer transition-all flex items-center justify-between group smooth-press"
                >
                  <div>
                    <div
                      className="text-xs font-semibold group-hover:text-amber-500 transition-colors"
                      style={{ color: textColor }}
                    >
                      {item.surahNameAr}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 font-nums">
                      <span>{item.ayahRange}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-500 font-bold">دقة {item.lastRetentionScore}٪</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-[11px] font-semibold text-sky-400 block font-nums">
                      {item.dueTimeAr}
                    </span>
                    <span className="text-[10px] text-slate-500 font-nums">
                      تكرار #{item.repetitionCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateScreen(12)}
            className="w-full mt-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800/70 border border-white/5 flex items-center justify-center gap-1 cursor-pointer smooth-press"
          >
            <span>استعراض كافة السور المستحقة</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Surah Progress Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold flex items-center gap-2"
            style={{ color: textColor }}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>السور قيد التثبيت والمتابعة الحديثة</span>
          </h2>

          <button
            type="button"
            onClick={() => onNavigateScreen(5)}
            className="text-xs font-medium text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer"
          >
            <span>تصفح فهرس القرآن كاملاً (١١٤ سورة)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SURAHS_SAMPLE.slice(0, 4).map((surah) => {
            const isCompleted = surah.masteryPercentage === 100;
            return (
              <div
                key={surah.number}
                onClick={() => onNavigateScreen(6)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 group relative border smooth-press ${
                  isDark
                    ? 'glass-obsidian border-white/5 hover:border-amber-400/40'
                    : isSepia
                    ? 'glass-sepia border-amber-500/20 hover:border-amber-400/40'
                    : 'surface-alabaster border-slate-200 hover:border-amber-500/40 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800/40 font-nums font-bold text-xs text-amber-500 border border-white/5">
                    {surah.number}
                  </div>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>محفوظة</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-nums font-medium text-slate-400">
                      {surah.ayahCount} آية
                    </span>
                  )}
                </div>

                <div
                  className="font-bold text-base group-hover:text-amber-500 transition-colors mb-1"
                  style={{ color: textColor }}
                >
                  سورة {surah.nameAr}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-3 font-nums">
                  <span>الجزء {surah.juz}</span>
                  <span aria-hidden="true">·</span>
                  <span>{surah.revelationTypeAr}</span>
                </div>

                {/* Minimalist Progress Line */}
                <div className="w-full bg-slate-800/40 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${surah.masteryPercentage}%`,
                      backgroundColor: isCompleted ? '#10B981' : goldPrimary,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-nums">
                  <span>نسبة الإتقان: {surah.masteryPercentage}٪</span>
                  <span>{surah.nextRevisionDue || 'مجدولة'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
