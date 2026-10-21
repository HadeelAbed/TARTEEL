import React, { useState } from 'react';
import { ThemeMode, UserPersona, ScreenId, SpacedRepetitionItem } from '../../types';
import { SPACED_REPETITION_QUEUE } from '../../data/quranData';
import { Calendar, Clock, Sparkles, BookOpen, ChevronLeft, AlertCircle, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';

interface Screen12PlannerProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen12Planner: React.FC<Screen12PlannerProps> = ({
  theme,
  persona,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';
  const [selectedPlanTab, setSelectedPlanTab] = useState<'today' | 'upcoming' | 'matrix'>('today');

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-sky-500 font-nums uppercase tracking-wider block mb-1">
            • خوارزمية التكرار المتباعد FSRS / SM-2
          </span>
          <h1 className="text-2xl font-bold mb-1" style={{ color: textColor }}>
            مخطط الحفظ والمراجعة الذكية
          </h1>
          <p className="text-xs text-slate-400">
            يحدد النظام مواعيد استرجاع الآيات عند عتبة النسيان الحرجة لترسيخها في الذاكرة طويلة الأمد.
          </p>
        </div>

        {/* Algorithm Interval Badges */}
        <div
          className={`flex items-center gap-1.5 p-2 rounded-2xl border font-nums text-xs ${
            isDark
              ? 'bg-slate-900/50 border-white/5'
              : isSepia
              ? 'bg-[#1D1713]/80 border-[#E2B86E]/20 text-[#E2B86E]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <span className="text-slate-400 ml-1">فترات التثبيت:</span>
          {['1d', '3d', '7d', '14d', '30d'].map((interval, i) => (
            <span
              key={interval}
              className={`px-2 py-0.5 rounded-md font-semibold ${
                i === 1
                  ? 'bg-sky-500/20 text-sky-500 border border-sky-500/30'
                  : 'text-slate-400'
              }`}
            >
              {interval}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div
        className={`flex p-1 rounded-xl border max-w-md ${
          isDark
            ? 'bg-slate-900/60 border-white/5'
            : isSepia
            ? 'bg-[#1C1612] border-[#E2B86E]/20'
            : 'bg-slate-100 border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => setSelectedPlanTab('today')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            selectedPlanTab === 'today'
              ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
              : isDark || isSepia
              ? 'text-slate-400 hover:text-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          مراجعات اليوم (٢ مستحقة)
        </button>
        <button
          type="button"
          onClick={() => setSelectedPlanTab('upcoming')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            selectedPlanTab === 'upcoming'
              ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
              : isDark || isSepia
              ? 'text-slate-400 hover:text-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          الأسبوع القادم
        </button>
      </div>

      {/* Queue Cards */}
      <div className="space-y-3">
        {SPACED_REPETITION_QUEUE.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDark
                ? 'glass-obsidian border-white/5'
                : isSepia
                ? 'glass-sepia border-amber-500/20'
                : 'surface-alabaster border-slate-200 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-base" style={{ color: textColor }}>
                  {item.surahNameAr}
                </span>
                <span className="text-xs text-slate-400 font-nums">
                  ({item.ayahRange})
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500">
                  تكرار #{item.repetitionCount}
                </span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2 font-nums">
                <span>الاستحقاق: {item.dueTimeAr}</span>
                <span aria-hidden="true">·</span>
                <span>آخر تقييم دقة: {item.lastRetentionScore}٪</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateScreen(6)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer hover:opacity-95 smooth-press"
              style={{
                backgroundColor: goldPrimary,
                color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
              }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>بدء المراجعة والتسميع الآن</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
