import React, { useState } from 'react';
import { ThemeMode, UserPersona, ScreenId, DailyChallenge } from '../../types';
import { DAILY_CHALLENGES_SAMPLE } from '../../data/quranData';
import { OctagonBadge } from '../common/OctagonBadge';
import { Target, Flame, CheckCircle2, ShieldCheck, Trophy, Sparkles, ChevronLeft } from 'lucide-react';

interface Screen10ChallengesProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen10Challenges: React.FC<Screen10ChallengesProps> = ({
  theme,
  persona,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isChild = persona === 'child';
  const [challenges, setChallenges] = useState<DailyChallenge[]>(DAILY_CHALLENGES_SAMPLE);
  const [streakFreezeUsed, setStreakFreezeUsed] = useState(false);

  const goldPrimary = isDark ? '#E5C378' : '#96742E';

  const toggleTask = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, completed: !c.completed, current: !c.completed ? c.target : Math.max(0, c.target - 1) } : c
      )
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">
            {isChild ? 'تحديات الأبطال اليومية' : 'تحديات الترتيل والاستقامة'}
          </h1>
          <p className="text-xs text-slate-400">
            أهداف مرحلية تعينك على دوام صلتك بكتاب الله دون ضغط أو إرهاق ذهني.
          </p>
        </div>

        {/* Streak & Grace Token Display */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/50 border border-white/5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold font-nums">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>سلسلة ٢١ يوماً</span>
          </div>

          <div className="text-[11px] text-slate-400 font-nums flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>رصيد الحماية: ١ تذكرة</span>
          </div>
        </div>
      </div>

      {/* Non-pressuring Streak Grace Period Card */}
      <div
        className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark
            ? 'glass-obsidian border-[#E5C378]/25'
            : 'surface-alabaster border-[#96742E]/25'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-0.5">
              نظام الاستدراك اللطيف (Grace Period)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              إن حالت المشاغل دون ترتيل وردك بالأمس، يمنحك ترتيل مهلة ٢٤ ساعة لاستدراكه وإبقاء سلسلتك دون انقطاع.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStreakFreezeUsed(true)}
          disabled={streakFreezeUsed}
          className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-white/10 disabled:opacity-50"
        >
          {streakFreezeUsed ? 'تم تفعيل التجميد ليوم الأمس' : 'تفعيل مهلة الاستدراك'}
        </button>
      </div>

      {/* Daily Challenges Checklist */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <Target className="w-4 h-4 text-[#E5C378]" />
          <span>مهام اليوم الموصى بها</span>
        </h2>

        {challenges.map((c) => {
          const progressPercent = Math.min(100, Math.round((c.current / c.target) * 100));

          return (
            <div
              key={c.id}
              onClick={() => toggleTask(c.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                c.completed
                  ? 'bg-slate-900/30 border-white/5 opacity-80'
                  : isDark
                  ? 'glass-obsidian hover:border-white/20'
                  : 'surface-alabaster hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    c.completed
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'border border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {c.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div>
                  <div className={`text-sm font-semibold transition-colors ${c.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {c.titleAr}
                  </div>
                  <div className="text-[11px] text-slate-400 font-nums mt-0.5">
                    التقدم: {c.current} من {c.target} {c.unitAr}
                  </div>
                </div>
              </div>

              {/* Progress bar & XP Reward */}
              <div className="flex items-center gap-4 sm:w-64">
                <div className="flex-1 bg-slate-800/80 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: c.completed ? '#10B981' : goldPrimary,
                    }}
                  />
                </div>

                <span className="text-xs font-bold font-nums text-amber-400 shrink-0">
                  +{c.xp} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Milestone Goal Strip */}
      <div
        className={`p-6 rounded-3xl transition-all ${
          isDark ? 'glass-obsidian' : 'surface-alabaster'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#E5C378]" />
            <span className="text-sm font-bold text-slate-100">
              المستهدف الأسبوعي: حفظ سورة الملك كاملة
            </span>
          </div>
          <span className="text-xs font-nums text-[#E5C378]">٨٠٪ مكتمل</span>
        </div>

        <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: '80%', backgroundColor: goldPrimary }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] font-nums text-slate-400 mt-2">
          <span>تم إتقان ٢٤ من ٣٠ آية</span>
          <span>متبقي ٦ آيات فقط لختم السورة ونيل وسام الحفظ</span>
        </div>
      </div>
    </div>
  );
};
