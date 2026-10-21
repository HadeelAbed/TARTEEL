import React, { useState } from 'react';
import { ThemeMode, Ayah } from '../../types';
import { VerseMarker } from './VerseMarker';
import { Info, Volume2, CheckCircle2 } from 'lucide-react';

interface SoftDiffViewProps {
  ayah: Ayah;
  theme?: ThemeMode;
  onPlayWord?: (word: string) => void;
  className?: string;
}

export const SoftDiffView: React.FC<SoftDiffViewProps> = ({
  ayah,
  theme = 'dark',
  onPlayWord,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const [activeTooltipIdx, setActiveTooltipIdx] = useState<number | null>(null);

  // Eye comfort calibrated colors
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';
  const goldColor = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';

  return (
    <div className={`relative ${className}`}>
      {/* Quran Verse Display with Soft Diff Highlights */}
      <div
        className="font-quran text-2xl md:text-3xl leading-[2.6] text-center select-text transition-colors duration-200"
        style={{ color: textColor }}
        dir="rtl"
      >
        {ayah.words.map((item, idx) => {
          const isHighlighted = item.hasDiff;
          const isTooltipOpen = activeTooltipIdx === idx;

          return (
            <span key={idx} className="relative inline-block mx-1.5 group">
              <button
                type="button"
                onClick={() => setActiveTooltipIdx(isTooltipOpen ? null : idx)}
                className={`relative px-1 py-0.5 rounded transition-all duration-200 cursor-pointer focus:outline-none ${
                  isHighlighted
                    ? 'soft-diff-uncertain hover:bg-sky-500/10'
                    : 'hover:text-amber-300/90'
                }`}
                style={{
                  textDecorationColor: isHighlighted ? skyColor : undefined,
                }}
                aria-expanded={isTooltipOpen}
                aria-label={item.word}
              >
                {item.word}
              </button>

              {/* Non-judgmental Soft Diff Tooltip */}
              {isHighlighted && isTooltipOpen && (
                <div
                  className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 md:w-72 p-3.5 rounded-xl shadow-2xl transition-all font-ar text-right animate-in fade-in zoom-in-95"
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(20, 28, 44, 0.95)'
                      : isSepia
                      ? 'rgba(36, 30, 24, 0.96)'
                      : '#FFFFFF',
                    border: `1px solid ${
                      isDark
                        ? 'rgba(56, 189, 248, 0.35)'
                        : isSepia
                        ? 'rgba(226, 184, 110, 0.35)'
                        : 'rgba(2, 132, 199, 0.25)'
                    }`,
                    boxShadow: isDark || isSepia
                      ? '0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(56, 189, 248, 0.15)'
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  }}
                  dir="rtl"
                >
                  {/* Gentle Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: skyColor }}>
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>تلميح إتقان وتثبيت</span>
                    </div>
                    <span className="text-[11px] font-nums text-slate-400">
                      الكلمة {idx + 1}
                    </span>
                  </div>

                  {/* Constructive Tajweed Note */}
                  <p className="text-xs leading-relaxed text-slate-300 dark:text-slate-200 mb-2">
                    {item.diffNote || 'يُستحسن ضبط مخرج الحرف بدقة والتمهل في المد.'}
                  </p>

                  {item.suggestedReview && (
                    <div
                      className="p-2 rounded-lg text-[11px] leading-relaxed mb-2.5 font-medium"
                      style={{
                        backgroundColor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)',
                        color: isDark ? '#E2E8F0' : '#1E293B',
                        borderRight: `2px solid ${skyColor}`,
                      }}
                    >
                      {item.suggestedReview}
                    </div>
                  )}

                  {/* Actions: Listen to word & Dismiss */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    <button
                      type="button"
                      onClick={() => onPlayWord?.(item.word)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer"
                      style={{
                        backgroundColor: isDark ? 'rgba(229, 195, 120, 0.15)' : 'rgba(150, 116, 46, 0.12)',
                        color: goldColor,
                      }}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>استمع للكلمة</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTooltipIdx(null)}
                      className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 cursor-pointer"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              )}
            </span>
          );
        })}

        {/* Verse End Marker */}
        <VerseMarker numeral={ayah.arabicNumeral} theme={theme} size="md" />
      </div>

      {/* Non-judgmental Soft diff legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs font-ar text-slate-400 select-none">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80" />
          <span>ترتيل متقن</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-4 h-0.5 border-b-2 border-dotted inline-block"
            style={{ borderColor: skyColor }}
          />
          <span style={{ color: skyColor }}>موضع مقترح للتثبيت (انقر للتلميح)</span>
        </span>
      </div>
    </div>
  );
};
