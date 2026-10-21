import React, { useState, useMemo } from 'react';
import { ThemeMode, UserPersona, ScreenId, Surah } from '../../types';
import { SURAHS_SAMPLE } from '../../data/quranData';
import { Search, BookOpen, Layers, CheckCircle2, Clock, Sparkles, ChevronLeft } from 'lucide-react';

interface Screen05QuranBrowserProps {
  theme: ThemeMode;
  persona: UserPersona;
  onSelectSurah: (surahNumber: number) => void;
}

export const Screen05QuranBrowser: React.FC<Screen05QuranBrowserProps> = ({
  theme,
  persona,
  onSelectSurah,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const [viewType, setViewType] = useState<'surah' | 'juz'>('surah');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'memorized' | 'in_progress' | 'review_due'>('all');

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  // Filtered surahs
  const filteredSurahs = useMemo(() => {
    return SURAHS_SAMPLE.filter((s) => {
      const matchesSearch =
        s.nameAr.includes(searchQuery) ||
        s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.number.toString() === searchQuery;

      const matchesStatus =
        statusFilter === 'all' || s.masteryStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Search & Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: textColor }}>
            فهرس سور القرآن الكريم
          </h1>
          <p className="text-xs text-slate-400">
            تصفح السور والأجزاء، تتبع مؤشرات الحفظ، وابدأ الترتيل المباشر بالرسم العثماني.
          </p>
        </div>

        {/* View Switcher: Surah vs Juz */}
        <div className="flex p-1 rounded-xl bg-slate-800/30 dark:bg-slate-900/50 border border-white/10 dark:border-white/5 shrink-0">
          <button
            type="button"
            onClick={() => setViewType('surah')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewType === 'surah'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ترتيب السور (١١٤)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewType('juz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewType === 'juz'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ترتيب الأجزاء (٣٠)</span>
          </button>
        </div>
      </div>

      {/* Instant Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث باسم السورة (الملك)، رقمها (67)، أو بالتهجئة الإنجليزية (Mulk)..."
          className="w-full py-3.5 pr-11 pl-4 rounded-2xl border text-sm transition-all shadow-xs"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : isSepia ? 'rgba(24, 20, 17, 0.6)' : '#FFFFFF',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            color: textColor,
          }}
        />
        <Search className="w-5 h-5 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'كافة السور' },
          { id: 'memorized', label: 'المحفوظة بالكامل (١٠٠٪)' },
          { id: 'in_progress', label: 'قيد الحفظ والتثبيت' },
          { id: 'review_due', label: 'مستحقة للمراجعة اليوم' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
              statusFilter === tab.id
                ? 'bg-amber-400/20 text-amber-500 dark:text-amber-300 border-amber-400/40 font-semibold shadow-xs'
                : 'bg-slate-800/30 text-slate-400 hover:text-slate-200 border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredSurahs.map((surah) => {
          const isFull = surah.masteryPercentage === 100;

          return (
            <div
              key={surah.number}
              onClick={() => onSelectSurah(surah.number)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between group smooth-press ${
                isDark
                  ? 'glass-obsidian border-white/5 hover:border-amber-400/40'
                  : isSepia
                  ? 'glass-sepia border-amber-500/20 hover:border-amber-400/40'
                  : 'surface-alabaster border-slate-200 hover:border-amber-500/40 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Surah Number Badge */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/40 font-nums font-bold text-xs text-amber-500 border border-white/5">
                  {surah.number}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-bold text-base group-hover:text-amber-500 transition-colors"
                      style={{ color: textColor }}
                    >
                      سورة {surah.nameAr}
                    </span>
                    <span className="text-xs font-nums text-slate-400">
                      ({surah.nameEn})
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 font-nums">
                    <span>{surah.ayahCount} آية</span>
                    <span aria-hidden="true">·</span>
                    <span>الجزء {surah.juz}</span>
                    <span aria-hidden="true">·</span>
                    <span>{surah.revelationTypeAr}</span>
                  </div>
                </div>
              </div>

              {/* Mastery Indicator */}
              <div className="text-left font-nums">
                {isFull ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>متقنة</span>
                  </span>
                ) : surah.masteryStatus === 'review_due' ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-sky-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>مراجعة</span>
                  </span>
                ) : surah.masteryPercentage > 0 ? (
                  <span className="text-xs font-semibold text-amber-500">
                    {surah.masteryPercentage}٪
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    لم تبدأ
                  </span>
                )}
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {surah.revelationTypeAr}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
