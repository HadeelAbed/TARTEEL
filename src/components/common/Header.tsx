import React, { useState } from 'react';
import { ThemeMode, UserPersona, TextDirection, ScreenId, ViewportMode } from '../../types';
import {
  Sun,
  Moon,
  Sparkles,
  User,
  BookOpen,
  LayoutDashboard,
  Mic,
  Clock,
  Compass,
  Menu,
  X,
  Monitor,
  Smartphone,
  Code2,
} from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  onThemeCycle: () => void;
  persona: UserPersona;
  onPersonaToggle: () => void;
  direction: TextDirection;
  onDirectionToggle: () => void;
  activeScreen: ScreenId;
  onScreenChange: (id: ScreenId) => void;
  onOpenScreensModal: () => void;
  showKidsStudio: boolean;
  onToggleKidsStudio: () => void;
  viewportMode?: ViewportMode;
  onViewportModeChange?: (mode: ViewportMode) => void;
  onOpenCodeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onThemeCycle,
  persona,
  onPersonaToggle,
  direction,
  onDirectionToggle,
  activeScreen,
  onScreenChange,
  onOpenScreensModal,
  showKidsStudio,
  onToggleKidsStudio,
  viewportMode = 'web',
  onViewportModeChange,
  onOpenCodeModal,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Background and borders based on eye comfort theme
  const headerBg = isDark
    ? 'rgba(11, 15, 23, 0.94)'
    : isSepia
    ? 'rgba(24, 20, 17, 0.95)'
    : 'rgba(255, 255, 255, 0.96)';

  const headerBorder = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : isSepia
    ? 'rgba(226, 184, 110, 0.15)'
    : 'rgba(0, 0, 0, 0.08)';

  const brandGold = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';

  const navLinks = [
    {
      id: 'dashboard',
      label: 'الرئيسية',
      icon: LayoutDashboard,
      active: !showKidsStudio && (activeScreen === 3 || activeScreen === 4),
      action: () => {
        if (showKidsStudio) onToggleKidsStudio();
        onScreenChange(viewportMode === 'mobile' ? 4 : 3);
        setMobileMenuOpen(false);
      },
    },
    {
      id: 'quran',
      label: 'المصحف الشريف',
      icon: BookOpen,
      active: !showKidsStudio && (activeScreen === 5 || activeScreen === 6 || activeScreen === 7),
      action: () => {
        if (showKidsStudio) onToggleKidsStudio();
        onScreenChange(6);
        setMobileMenuOpen(false);
      },
    },
    {
      id: 'recite',
      label: 'المقرأة والتسميع',
      icon: Mic,
      active: !showKidsStudio && (activeScreen === 8 || activeScreen === 9),
      action: () => {
        if (showKidsStudio) onToggleKidsStudio();
        onScreenChange(8);
        setMobileMenuOpen(false);
      },
    },
    {
      id: 'kids',
      label: 'استوديو سِراج (للأطفال)',
      icon: Sparkles,
      active: showKidsStudio,
      isSpecial: true,
      action: () => {
        onToggleKidsStudio();
        setMobileMenuOpen(false);
      },
    },
    {
      id: 'planner',
      label: 'المراجعة والإتقان',
      icon: Clock,
      active: !showKidsStudio && (activeScreen === 11 || activeScreen === 12 || activeScreen === 13),
      action: () => {
        if (showKidsStudio) onToggleKidsStudio();
        onScreenChange(12);
        setMobileMenuOpen(false);
      },
    },
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300"
      style={{
        backgroundColor: headerBg,
        borderColor: headerBorder,
      }}
      dir={direction}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 md:gap-4 font-ar">
        {/* Brand Logo & Medallion */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (showKidsStudio) onToggleKidsStudio();
              onScreenChange(viewportMode === 'mobile' ? 4 : 3);
            }}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 cursor-pointer text-right smooth-press"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-all"
              style={{
                backgroundColor: brandGold,
                color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
              }}
            >
              📖
            </div>
            <div>
              <span
                className="text-lg sm:text-xl font-bold tracking-tight block leading-tight"
                style={{ color: brandGold }}
              >
                تَرتيل
              </span>
              <span className="text-[10px] text-slate-500 font-nums tracking-wider uppercase block">
                TARTEEL QURAN
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Primary Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            if (item.isSpecial) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer smooth-press shadow-xs ${
                    item.active
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-sm'
                      : 'bg-amber-400/15 text-amber-500 dark:text-amber-300 hover:bg-amber-400/25 border border-amber-400/30'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer smooth-press ${
                  item.active
                    ? isDark
                      ? 'bg-[#E5C378]/15 text-[#E5C378] font-bold'
                      : isSepia
                      ? 'bg-[#E2B86E]/20 text-[#E2B86E] font-bold'
                      : 'bg-[#96742E]/10 text-[#96742E] font-bold'
                    : isDark || isSepia
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-80" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Center: Dedicated Mode Switcher (Web vs Mobile vs Code) */}
        {onViewportModeChange && (
          <div className="hidden md:flex items-center p-1 rounded-2xl bg-slate-800/40 dark:bg-slate-900/60 border border-white/5 font-ar text-xs">
            <button
              type="button"
              onClick={() => {
                onViewportModeChange('web');
                if (activeScreen === 4) onScreenChange(3);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                viewportMode === 'web'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="معاينة واجهات سطح المكتب العريضة"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>واجهات الويب</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onViewportModeChange('mobile');
                if (activeScreen === 3) onScreenChange(4);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                viewportMode === 'mobile'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="معاينة واجهات تطبيق الجوال (iOS / Android)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>واجهات الجوال</span>
            </button>

            {onOpenCodeModal && (
              <button
                type="button"
                onClick={onOpenCodeModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold text-purple-300 hover:text-purple-200 hover:bg-purple-500/15"
                title="مستكشف ونسخ أكواد كافة الأقسام"
              >
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                <span>نسخ الأكواد</span>
              </button>
            )}
          </div>
        )}

        {/* Action Controls Cluster */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Persona Switcher */}
          <button
            type="button"
            onClick={onPersonaToggle}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border smooth-press ${
              isChild
                ? 'bg-amber-400/20 text-amber-500 dark:text-amber-300 border-amber-400/40 shadow-xs'
                : isDark || isSepia
                ? 'bg-slate-800/60 text-slate-300 hover:text-white border-white/5'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
            }`}
            title="تبديل نبرة الواجهة بين وضع الكبار ووضع البراعم المحفز"
          >
            {isChild ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">وضع البراعم</span>
                <span className="sm:hidden">براعم</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-[#E5C378]" />
                <span className="hidden sm:inline">وضع الكبار</span>
                <span className="sm:hidden">كبار</span>
              </>
            )}
          </button>

          {/* Theme Cycler (Obsidian -> Sepia -> Alabaster) */}
          <button
            type="button"
            onClick={onThemeCycle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer border smooth-press"
            style={{
              backgroundColor: isDark
                ? 'rgba(20, 28, 44, 0.7)'
                : isSepia
                ? 'rgba(45, 36, 28, 0.8)'
                : 'rgba(241, 245, 249, 0.9)',
              borderColor: isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : isSepia
                ? 'rgba(226, 184, 110, 0.3)'
                : 'rgba(0, 0, 0, 0.1)',
              color: brandGold,
            }}
            title={
              isDark
                ? 'الوضع الليلي (أوبسيديان). انقر للتحويل إلى: سيبيا المسائي'
                : isSepia
                ? 'الوضع المسائي (سيبيا دافئ). انقر للتحويل إلى: نهاري ألباستر'
                : 'الوضع النهاري (ألباستر نقي). انقر للتحويل إلى: أوبسيديان ليلي'
            }
          >
            {isDark && (
              <>
                <Moon className="w-3.5 h-3.5 text-[#E5C378]" />
                <span className="hidden md:inline font-nums font-semibold">ليلي</span>
              </>
            )}
            {isSepia && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2B86E] inline-block shadow-sm" />
                <span className="hidden md:inline font-nums font-semibold">سيبيا</span>
              </>
            )}
            {!isDark && !isSepia && (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden md:inline font-nums font-semibold">نهاري</span>
              </>
            )}
          </button>

          {/* Direction Toggle */}
          <button
            type="button"
            onClick={onDirectionToggle}
            className={`px-2 py-1.5 rounded-xl text-[11px] font-nums font-semibold transition-all cursor-pointer border ${
              isDark
                ? 'bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 border-white/10'
                : isSepia
                ? 'bg-[#241E18]/60 text-[#E2B86E] border-[#E2B86E]/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="تبديل اتجاه الواجهة (RTL / LTR)"
          >
            {direction.toUpperCase()}
          </button>

          {/* Discreet Screen Showcase Explorer Trigger */}
          <button
            type="button"
            onClick={onOpenScreensModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer smooth-press border"
            style={{
              backgroundColor: isDark
                ? 'rgba(30, 41, 59, 0.6)'
                : isSepia
                ? 'rgba(42, 34, 27, 0.7)'
                : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark
                ? 'rgba(255, 255, 255, 0.12)'
                : isSepia
                ? 'rgba(226, 184, 110, 0.25)'
                : 'rgba(0, 0, 0, 0.12)',
              color: brandGold,
            }}
            title="استعراض كافة الشاشات الـ ١٥ للمعاينة والتقييم"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">الشاشات</span>
            <span className="font-nums text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15">
              15
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
            title="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div
          className={`xl:hidden px-4 pt-2 pb-4 border-t space-y-2 backdrop-blur-2xl ${
            isDark
              ? 'bg-[#0B0F17]/95 border-white/10 text-slate-200'
              : isSepia
              ? 'bg-[#181411]/95 border-[#E2B86E]/20 text-[#F3EBDD]'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          {/* Viewport switch in mobile dropdown */}
          {onViewportModeChange && (
            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-white/5">
              <button
                type="button"
                onClick={() => {
                  onViewportModeChange('web');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold flex items-center justify-center gap-1 ${
                  viewportMode === 'web'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800/40 text-slate-300'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>الويب</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onViewportModeChange('mobile');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold flex items-center justify-center gap-1 ${
                  viewportMode === 'mobile'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800/40 text-slate-300'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>الجوال</span>
              </button>
              {onOpenCodeModal && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenCodeModal();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-1 text-center rounded-xl text-xs font-semibold bg-purple-500/20 text-purple-300 flex items-center justify-center gap-1"
                >
                  <Code2 className="w-3 h-3" />
                  <span>الأكواد</span>
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-right transition-all ${
                    item.active
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : isDark || isSepia
                      ? 'hover:bg-slate-800/60 text-slate-300'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
