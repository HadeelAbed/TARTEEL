import React, { useState } from 'react';
import { ThemeMode, UserPersona, ScreenId, Achievement } from '../../types';
import { ACHIEVEMENTS_DATA, XP_LEDGER_SAMPLE } from '../../data/quranData';
import { OctagonBadge } from '../common/OctagonBadge';
import { Award, ShieldCheck, Sparkles, ChevronLeft, Lock, History } from 'lucide-react';

interface Screen11AchievementsProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen11Achievements: React.FC<Screen11AchievementsProps> = ({
  theme,
  persona,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement>(ACHIEVEMENTS_DATA[0]);

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Top Header & Level Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-amber-500 font-nums uppercase tracking-wider block mb-1">
            • خارطة الرتب والأوسمة
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: textColor }}>
            {isChild ? 'خزانة أوسمة أبطال القرآن' : 'سجل الإتقان والأوسمة القرآنية'}
          </h1>
          <p className="text-xs text-slate-400">
            أوسمة إسلامية هندسية ثمانية الأضلاع تمنح تقديراً للاستمرارية وضبط مخارج الحروف.
          </p>
        </div>

        {/* Current Level Card */}
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-800/30 dark:bg-slate-900/50 border border-white/5">
          <OctagonBadge size={68} theme={theme} level={14} tier="gold" title="المستوى ١٤" />
          <div>
            <div className="text-xs text-slate-400 font-nums">المستوى الحالي</div>
            <div className="text-lg font-bold" style={{ color: textColor }}>
              {isChild ? 'الحافظ الصاعد (مستوى ١٤)' : 'رتبة المتقن — المستوى ١٤'}
            </div>
            <div className="text-xs font-nums text-amber-500 font-semibold mt-0.5">
              ٨,٤٢٠ / ١٠,٠٠٠ XP
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ACHIEVEMENTS_DATA.map((ach) => {
          const isSelected = selectedAchievement.id === ach.id;
          return (
            <div
              key={ach.id}
              onClick={() => setSelectedAchievement(ach)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                isSelected
                  ? 'border-amber-400 bg-amber-400/10 shadow-xs'
                  : isDark
                  ? 'glass-obsidian border-white/5 hover:border-white/20'
                  : isSepia
                  ? 'glass-sepia border-amber-500/20'
                  : 'surface-alabaster border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <OctagonBadge
                size={54}
                theme={theme}
                level={ach.tier === 'gold' ? 3 : ach.tier === 'silver' ? 2 : 1}
                tier={ach.tier}
                title={ach.titleAr}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold" style={{ color: textColor }}>
                    {ach.titleAr}
                  </h4>
                  {ach.isUnlocked ? (
                    <span className="text-[10px] font-bold text-emerald-500">مكتمل</span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ach.descAr}
                </p>
                <div className="mt-2 text-[11px] font-nums font-semibold text-amber-500">
                  +{ach.xpReward} XP
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity & Points History */}
      <div
        className={`p-6 rounded-3xl transition-all border ${
          isDark
            ? 'glass-obsidian border-white/10'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-sky-500" />
            <h2 className="text-sm font-bold" style={{ color: textColor }}>
              سجل النشاط ومكافآت الإتقان الأخيرة
            </h2>
          </div>
        </div>

        <div className="divide-y divide-white/5 dark:divide-slate-800 mt-2">
          {XP_LEDGER_SAMPLE.map((entry) => (
            <div key={entry.id} className="py-3 flex items-center justify-between gap-4 text-xs font-nums">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800/40 text-amber-500 font-bold">
                  XP
                </div>
                <div>
                  <div className="font-semibold font-ar" style={{ color: textColor }}>
                    {entry.eventNameAr}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span>{entry.timestamp}</span>
                  </div>
                </div>
              </div>

              <span className="font-bold text-emerald-500">
                +{entry.xpDelta} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
