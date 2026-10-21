import React, { ReactNode, useState } from 'react';
import { ViewportMode, ThemeMode, ScreenId } from '../../types';
import {
  Smartphone,
  Monitor,
  Columns,
  Wifi,
  Battery,
  Signal,
  Home,
  BookOpen,
  Mic,
  Sparkles,
  Clock,
  Code2,
  Maximize2,
  Minimize2,
  CheckCircle2,
} from 'lucide-react';

interface DeviceFrameProps {
  mode: ViewportMode;
  onModeChange: (mode: ViewportMode) => void;
  theme: ThemeMode;
  children: ReactNode;
  specDrawerContent?: ReactNode;
  activeScreen?: ScreenId;
  onScreenChange?: (id: ScreenId) => void;
  showKidsStudio?: boolean;
  onToggleKidsStudio?: () => void;
  onOpenCodeModal?: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  mode,
  onModeChange,
  theme,
  children,
  specDrawerContent,
  activeScreen = 3,
  onScreenChange,
  showKidsStudio = false,
  onToggleKidsStudio,
  onOpenCodeModal,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const [mobileFitMode, setMobileFitMode] = useState<'framed' | 'fluid'>('framed');

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const tabBg = isDark
    ? 'bg-[#0B0F17]/95 border-t border-white/10'
    : isSepia
    ? 'bg-[#181411]/95 border-t border-[#E2B86E]/20'
    : 'bg-white/95 border-t border-slate-200';

  // Mobile Bottom Navigation Tabs definition
  const mobileTabs = [
    {
      id: 'home',
      label: 'الرئيسية',
      icon: Home,
      screenId: 4 as ScreenId,
      isActive: !showKidsStudio && (activeScreen === 4 || activeScreen === 3 || activeScreen === 1),
    },
    {
      id: 'quran',
      label: 'المصحف',
      icon: BookOpen,
      screenId: 6 as ScreenId,
      isActive: !showKidsStudio && (activeScreen === 5 || activeScreen === 6 || activeScreen === 7),
    },
    {
      id: 'recite',
      label: 'التسميع',
      icon: Mic,
      screenId: 8 as ScreenId,
      isActive: !showKidsStudio && (activeScreen === 8 || activeScreen === 9),
    },
    {
      id: 'kids',
      label: 'البراعم',
      icon: Sparkles,
      screenId: 10 as ScreenId,
      isKids: true,
      isActive: showKidsStudio,
    },
    {
      id: 'planner',
      label: 'المراجعة',
      icon: Clock,
      screenId: 12 as ScreenId,
      isActive: !showKidsStudio && (activeScreen === 11 || activeScreen === 12 || activeScreen === 13),
    },
  ];

  const handleMobileTabClick = (tab: (typeof mobileTabs)[0]) => {
    if (tab.isKids) {
      if (onToggleKidsStudio) {
        if (!showKidsStudio) onToggleKidsStudio();
      }
    } else {
      if (showKidsStudio && onToggleKidsStudio) {
        onToggleKidsStudio();
      }
      if (onScreenChange) {
        onScreenChange(tab.screenId);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* =========================================================================
          MOBILE VIEWPORT (Dedicated Mobile Experience)
          ========================================================================= */}
      {mode === 'mobile' && (
        <div className="w-full flex flex-col items-center py-2 px-2">
          {/* Mobile Toolbar & Switchers */}
          <div className="w-full max-w-lg mb-3 px-3 py-2 rounded-2xl bg-slate-900/40 dark:bg-slate-900/60 border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-ar">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-slate-200">واجهة تطبيق الجوال</span>
              <span className="text-[10px] text-slate-400 font-nums hidden sm:inline">
                (iOS / Android Native UI)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Toggle Phone Frame vs Fluid */}
              <button
                type="button"
                onClick={() => setMobileFitMode(mobileFitMode === 'framed' ? 'fluid' : 'framed')}
                className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                title={mobileFitMode === 'framed' ? 'تبديل للعرض المرن' : 'تبديل لإطار الهاتف'}
              >
                {mobileFitMode === 'framed' ? (
                  <>
                    <Maximize2 className="w-3 h-3 text-sky-400" />
                    <span>عرض كامل</span>
                  </>
                ) : (
                  <>
                    <Minimize2 className="w-3 h-3 text-amber-400" />
                    <span>إطار هاتف</span>
                  </>
                )}
              </button>

              {/* Code Exporter for Mobile */}
              {onOpenCodeModal && (
                <button
                  type="button"
                  onClick={onOpenCodeModal}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-all flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <Code2 className="w-3 h-3" />
                  <span>كود الجوال</span>
                </button>
              )}

              {/* Switch to Desktop Web */}
              <button
                type="button"
                onClick={() => onModeChange('web')}
                className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold shadow-xs hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>سطح المكتب</span>
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile Display Container: Either iPhone 16 Frame OR Responsive Mobile View */}
          <div className="relative my-1 w-full flex justify-center">
            <div
              className={`relative transition-all duration-300 ${
                mobileFitMode === 'framed'
                  ? `w-[385px] sm:w-[412px] min-h-[850px] max-h-[890px] rounded-[52px] p-3 shadow-2xl border-[3px] ${
                      isDark
                        ? 'border-slate-700/80 bg-slate-950/90 shadow-black/80'
                        : isSepia
                        ? 'border-[#4A3C2F] bg-[#14100D] shadow-[#100D0A]/80'
                        : 'border-slate-300 bg-slate-100 shadow-slate-400/30'
                    }`
                  : `w-full max-w-md min-h-[750px] rounded-3xl p-1 shadow-xl border ${
                      isDark
                        ? 'border-slate-800 bg-[#0B0F17]'
                        : isSepia
                        ? 'border-[#E2B86E]/20 bg-[#181411]'
                        : 'border-slate-200 bg-[#F8F7F2]'
                    }`
              }`}
            >
              {/* Mobile Phone Screen Body */}
              <div
                className={`w-full h-full overflow-hidden flex flex-col relative ${
                  mobileFitMode === 'framed' ? 'rounded-[42px]' : 'rounded-2xl'
                } ${
                  isDark
                    ? 'bg-[#0B0F17]'
                    : isSepia
                    ? 'bg-[#181411]'
                    : 'bg-[#F8F7F2]'
                }`}
              >
                {/* Dynamic Island & Native Phone Status Bar Header */}
                <div
                  className={`w-full pt-3 px-6 pb-2 flex items-center justify-between select-none z-30 shrink-0 ${
                    isDark
                      ? 'text-slate-300'
                      : isSepia
                      ? 'text-[#E2B86E]'
                      : 'text-slate-700'
                  }`}
                >
                  <span className="text-xs font-nums font-semibold tracking-tight">9:41</span>

                  {/* Dynamic Island Pill */}
                  <div className="w-24 h-6 rounded-full bg-black flex items-center justify-between px-2.5 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[9px] text-amber-300 font-ar font-bold">تَرتيل</span>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-90">
                    <Signal className="w-3.5 h-3.5" />
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-4 h-4" />
                  </div>
                </div>

                {/* Mobile Viewport Main Scrollable Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
                  {children}
                </div>

                {/* =================================================================
                    NATIVE MOBILE BOTTOM NAVIGATION BAR (Anchored to bottom of phone)
                    ================================================================= */}
                <div
                  className={`absolute bottom-0 inset-x-0 backdrop-blur-xl z-40 px-3 py-2 flex items-center justify-around select-none transition-all ${tabBg}`}
                  dir="rtl"
                >
                  {mobileTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleMobileTabClick(tab)}
                        className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[54px] smooth-press ${
                          tab.isActive
                            ? 'text-amber-500 dark:text-amber-300 font-bold scale-105'
                            : isDark || isSepia
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <div className="relative">
                          <Icon className={`w-5 h-5 mb-0.5 ${tab.isActive ? 'stroke-[2.5]' : 'opacity-80'}`} />
                          {tab.isActive && (
                            <span
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: goldPrimary }}
                            />
                          )}
                        </div>
                        <span className="text-[10px] tracking-tight">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* iPhone Home Indicator */}
                {mobileFitMode === 'framed' && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-slate-400/40 pointer-events-none z-50" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SPLIT MODE (Side-by-side Specs & Live App)
          ========================================================================= */}
      {mode === 'split' && (
        <div className="w-full max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden transition-all duration-300">
            {children}
          </div>
          <div className="lg:col-span-5 h-[800px] overflow-y-auto rounded-2xl border border-white/10 dark:border-slate-800 p-4">
            {specDrawerContent}
          </div>
        </div>
      )}

      {/* =========================================================================
          DESKTOP WEB VIEW (Full-width Widescreen Layout 1440px)
          ========================================================================= */}
      {mode === 'web' && (
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 transition-all duration-300">
          {/* Quick Sub-Toolbar on Web for Ease of Switching */}
          <div className="mb-4 px-4 py-2.5 rounded-2xl bg-slate-900/30 dark:bg-slate-900/50 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-ar">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="font-bold text-slate-200">واجهة الويب لسطح المكتب (Desktop Web View)</span>
              <span className="text-[11px] text-slate-400 font-nums hidden sm:inline">
                • مصممة للشاشات الكبيرة والعريضة
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Direct button to open mobile view */}
              <button
                type="button"
                onClick={() => {
                  onModeChange('mobile');
                  if (activeScreen === 3 && onScreenChange) {
                    onScreenChange(4); // Switch to mobile home
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>معاينة واجهة الجوال</span>
              </button>

              {/* Direct button to open Code Exporter */}
              {onOpenCodeModal && (
                <button
                  type="button"
                  onClick={onOpenCodeModal}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>مُستكشف ونسخ الأكواد</span>
                </button>
              )}
            </div>
          </div>

          {/* Full Desktop Web Children */}
          <div className="w-full rounded-2xl overflow-hidden">{children}</div>
        </div>
      )}
    </div>
  );
};
