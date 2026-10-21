import React, { useState } from 'react';
import { ThemeMode, UserPersona, ScreenId } from '../../types';
import { BarChart3, TrendingUp, Clock, CheckCircle2, Mic, Calendar, Info } from 'lucide-react';

interface Screen13AnalyticsProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen13Analytics: React.FC<Screen13AnalyticsProps> = ({
  theme,
  persona,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const [selectedCellSurah, setSelectedCellSurah] = useState<number | null>(67);

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  // Generate 114 Surah heatmap cells
  const heatmapData = Array.from({ length: 114 }, (_, i) => {
    const surahNum = i + 1;
    let mastery = 0;
    if (surahNum <= 7 || surahNum >= 105) mastery = 100;
    else if (surahNum === 67) mastery = 78;
    else if (surahNum === 78) mastery = 92;
    else if (surahNum === 18) mastery = 42;
    else if (surahNum === 36) mastery = 64;
    else if (surahNum % 3 === 0) mastery = 25;
    else if (surahNum % 5 === 0) mastery = 55;
    return { surahNum, mastery };
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Analytics Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-500 font-nums uppercase tracking-wider block mb-1">
            • مصفوفة الإتقان وبيانات الاسترجاع
          </span>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            تحليلات الرسوخ الحفظي
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            خريطة حرارية تفصيلية تغطي سور القرآن الكريم الـ ١١٤ ومعدلات الاستذكار الأسبوعية.
          </p>
        </div>

        {/* Tabular Numerics Quick Stats */}
        <div
          className={`flex items-center gap-3 p-3 rounded-2xl border font-nums text-xs ${
            isDark
              ? 'bg-slate-900/50 border-white/5'
              : isSepia
              ? 'bg-[#1D1713]/80 border-[#E2B86E]/20 text-[#E2B86E]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <span className="text-[10px] text-slate-400 block">إجمالي وقت الترتيل</span>
            <span className="text-sm font-bold" style={{ color: textColor }}>
              ٢٤ ساعة و٤٥ دقيقة
            </span>
          </div>
          <span className="text-slate-400">|</span>
          <div>
            <span className="text-[10px] text-slate-400 block">متوسط الدقة التجويدية</span>
            <span className="text-sm font-bold text-emerald-500">٩٤.٢٪</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid of 114 Surahs */}
      <div
        className={`p-6 rounded-3xl border ${
          isDark
            ? 'glass-obsidian border-white/5'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base" style={{ color: textColor }}>
              خريطة رسوخ المصحف (١١٤ سورة)
            </h3>
            <span className="text-xs text-slate-400 font-nums">
              (انقر على أي خلية لعرض تفاصيل السورة)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-nums">
            <span className="text-slate-400">المفتاح:</span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-slate-700/50 inline-block" />
              <span className="text-slate-400">لم تبدأ</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-amber-500/40 inline-block" />
              <span className="text-slate-400">قيد الحفظ</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" />
              <span className="text-emerald-500 font-semibold">متقنة (١٠٠٪)</span>
            </span>
          </div>
        </div>

        {/* 114 Cells Grid */}
        <div className="grid grid-cols-12 sm:grid-cols-19 gap-1.5 pt-2">
          {heatmapData.map((cell) => {
            const isSelected = selectedCellSurah === cell.surahNum;
            let bgClass = 'bg-slate-800/40 text-slate-500 hover:border-slate-500';
            if (cell.mastery === 100) {
              bgClass = 'bg-emerald-500 text-slate-950 font-bold';
            } else if (cell.mastery >= 70) {
              bgClass = 'bg-amber-400/80 text-slate-950 font-bold';
            } else if (cell.mastery >= 40) {
              bgClass = 'bg-amber-500/40 text-amber-200';
            } else if (cell.mastery > 0) {
              bgClass = 'bg-sky-500/30 text-sky-200';
            }

            return (
              <button
                key={cell.surahNum}
                type="button"
                onClick={() => setSelectedCellSurah(cell.surahNum)}
                className={`h-8 rounded-lg flex items-center justify-center font-nums text-xs transition-all cursor-pointer ${bgClass} ${
                  isSelected ? 'ring-2 ring-amber-400 scale-110 z-10 shadow-md' : 'opacity-90 hover:opacity-100'
                }`}
                title={`سورة رقم ${cell.surahNum} — الإتقان: ${cell.mastery}٪`}
              >
                {cell.surahNum}
              </button>
            );
          })}
        </div>

        {/* Selected Surah Quick Drilldown */}
        {selectedCellSurah && (
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400 block">السورة المحددة:</span>
              <span className="text-lg font-bold" style={{ color: textColor }}>
                سورة رقم {selectedCellSurah}
                {selectedCellSurah === 67 ? ' (الملك)' : selectedCellSurah === 78 ? ' (النبأ)' : ''}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigateScreen(6)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer hover:opacity-95"
              style={{
                backgroundColor: goldPrimary,
                color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
              }}
            >
              الانتقال لقراءة ومراجعة هذه السورة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
