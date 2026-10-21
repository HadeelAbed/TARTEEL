import React from 'react';
import { ScreenId, ThemeMode, ViewportMode, UserPersona } from '../../types';
import { SCREENS_LIST } from '../../data/quranData';
import { X, Smartphone, Monitor, Columns, Compass, Sparkles, CheckCircle2, ChevronLeft } from 'lucide-react';

interface ScreensExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: ScreenId;
  onSelectScreen: (id: ScreenId) => void;
  viewportMode: ViewportMode;
  onViewportModeChange: (mode: ViewportMode) => void;
  theme: ThemeMode;
  persona: UserPersona;
  onOpenKidsStudio: () => void;
}

export const ScreensExplorerModal: React.FC<ScreensExplorerModalProps> = ({
  isOpen,
  onClose,
  activeScreen,
  onSelectScreen,
  viewportMode,
  onViewportModeChange,
  theme,
  persona,
  onOpenKidsStudio,
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const modalBg = isDark
    ? 'bg-[#0B0F17]/95 border-white/10 text-slate-100'
    : isSepia
    ? 'bg-[#181411]/95 border-[#E2B86E]/20 text-[#F3EBDD]'
    : 'bg-white/95 border-slate-200 text-slate-900';

  const brandGold = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';

  // Group screens into intuitive flows
  const categories = [
    {
      title: 'التأسيس والمصادقة',
      screens: SCREENS_LIST.filter((s) => s.id === 1 || s.id === 2),
    },
    {
      title: 'الواجهات الرئيسية والمصحف',
      screens: SCREENS_LIST.filter((s) => s.id >= 3 && s.id <= 6),
    },
    {
      title: 'المقرأة والتسميع الصوتي والذكاء الاصطناعي',
      screens: SCREENS_LIST.filter((s) => s.id >= 7 && s.id <= 9),
    },
    {
      title: 'التحفيز والمراجعة والتكرار المتباعد (FSRS)',
      screens: SCREENS_LIST.filter((s) => s.id >= 10 && s.id <= 13),
    },
    {
      title: 'النظام والإعدادات والحالات الاستثنائية',
      screens: SCREENS_LIST.filter((s) => s.id === 14 || s.id === 15),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 font-ar" dir="rtl">
      <div
        className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${modalBg}`}
      >
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-white/10 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-sm"
              style={{
                backgroundColor: brandGold,
                color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
              }}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">فهرس شاشات المنظومة (١ - ١٥)</h3>
              <p className="text-xs text-slate-400">
                انقر على أي شاشة للانتقال الفوري وتجربة كافة الوظائف والتفاعلات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport Mode Switcher */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-800/40 border border-white/5 text-xs">
              <button
                type="button"
                onClick={() => onViewportModeChange('web')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  viewportMode === 'web'
                    ? 'bg-[#E5C378] text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>سطح المكتب</span>
              </button>
              <button
                type="button"
                onClick={() => onViewportModeChange('mobile')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-[#E5C378] text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>محاكاة الجوال</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Special Kids Companion Studio Hero Card in Explorer */}
        <div className="px-6 pt-4 shrink-0">
          <div
            onClick={() => {
              onOpenKidsStudio();
              onClose();
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-amber-500/20 border border-amber-400/40 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md">
                ⭐
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-500 dark:text-amber-300">
                    استوديو البراعم التفاعلي (سِراج)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                    ميزة تفاعلية خاصة للأطفال 🎮
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  تلاوة صوتية مع رفيق الحفظ، ألعاب ترتيب الكلمات ومطابقة البطاقات القرآنية، وشجرة الإتقان.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <span>دخول الاستوديو</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categorized Screens Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {categories.map((category, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{category.title}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {category.screens.map((screen) => {
                  const isActive = screen.id === activeScreen;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => {
                        onSelectScreen(screen.id);
                        onClose();
                      }}
                      className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between smooth-press ${
                        isActive
                          ? 'border-amber-400 bg-amber-400/10 shadow-sm ring-1 ring-amber-400/40'
                          : isDark
                          ? 'bg-slate-900/60 border-white/5 hover:border-white/20 hover:bg-slate-800/60'
                          : isSepia
                          ? 'bg-[#241E18]/60 border-[#E2B86E]/15 hover:border-[#E2B86E]/40'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-nums font-bold text-xs ${
                            isActive
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-800/80 text-slate-300'
                          }`}
                        >
                          {screen.id}
                        </span>
                        {isActive && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 dark:text-amber-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>الحالية</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <h5 className="text-sm font-bold block mb-0.5">
                          {screen.titleAr}
                        </h5>
                        <span className="text-[10px] text-slate-400 block font-nums">
                          {screen.titleEn}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {screen.descriptionAr}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
