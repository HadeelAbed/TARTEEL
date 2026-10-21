import React, { useState } from 'react';
import { ThemeMode, UserPersona, ScreenId } from '../../types';
import { Settings, Moon, Sun, Sliders, ShieldCheck, Lock, Bell, Mic, UserCheck, Sparkles } from 'lucide-react';

interface Screen14SettingsProps {
  theme: ThemeMode;
  onThemeToggle: () => void;
  persona: UserPersona;
  onPersonaChange: (p: UserPersona) => void;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen14Settings: React.FC<Screen14SettingsProps> = ({
  theme,
  onThemeToggle,
  persona,
  onPersonaChange,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';

  const [tajweedStrictness, setTajweedStrictness] = useState<number>(2);
  const [parentalLockEnabled, setParentalLockEnabled] = useState(true);
  const [micDevice, setMicDevice] = useState('Default Built-in Studio Mic');

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  const strictnessLabels = [
    { level: 1, label: 'ميسر ومرن (تشجيع الأطفال)', desc: 'يقبل النطق الصحيح دون تدقيق صارم بأزمنة الغنن الصغرى.' },
    { level: 2, label: 'متوازن ومعتمد (الوضع القياسي)', desc: 'يركز على مطابقة الحركات ومخارج الحروف والمدود الطبيعية.' },
    { level: 3, label: 'دقيق ومجاز (رواية حفص عن عاصم)', desc: 'تدقيق إتقاني صارم في مراتب التفخيم وأزمنة القلقلة والغنة.' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Settings Title */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: textColor }}>
          إعدادات الحساب وتفضيلات الترتيل
        </h1>
        <p className="text-xs text-slate-400">
          تخصيص هوية العرض، حساسية محرك الذكاء الاصطناعي الصوتي، وضوابط الرقابة الأبوية.
        </p>
      </div>

      {/* Visual Identity & Eye Comfort Theme Switch */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isDark
            ? 'glass-obsidian border-white/10'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/40 text-amber-500">
              {isDark ? <Moon className="w-5 h-5" /> : isSepia ? <Sparkles className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: textColor }}>
                نمط الإضاءة وراحة العين
              </div>
              <div className="text-xs text-slate-400">
                {isDark ? 'أوبسيديان الليلي المهدئ' : isSepia ? 'سيبيا المسائي الدافئ' : 'ألباستر النهاري الورقي'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onThemeToggle}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-white/5 cursor-pointer smooth-press"
          >
            تبديل النمط
          </button>
        </div>
      </div>

      {/* Tajweed Engine Sensitivity Slider */}
      <div
        className={`p-6 rounded-3xl border transition-all space-y-4 ${
          isDark
            ? 'glass-obsidian border-white/10'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 pb-2 border-b border-white/10 dark:border-slate-800">
          <Sliders className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-bold" style={{ color: textColor }}>
            حساسية التقييم الصوتي والتجويد (Soft Diff Threshold)
          </h2>
        </div>

        <div className="space-y-3">
          {strictnessLabels.map((item) => (
            <div
              key={item.level}
              onClick={() => setTajweedStrictness(item.level)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                tajweedStrictness === item.level
                  ? 'border-amber-400 bg-amber-400/10 shadow-xs'
                  : 'border-white/5 bg-slate-800/20 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs" style={{ color: textColor }}>
                  {item.label}
                </span>
                {tajweedStrictness === item.level && (
                  <span className="text-[10px] font-bold text-amber-500">محدد</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Parental Lock & Persona Toggle */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isDark
            ? 'glass-obsidian border-white/10'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/40 text-amber-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: textColor }}>
                قفل الرقابة الأبوية للأطفال
              </div>
              <div className="text-xs text-slate-400">
                حماية إعدادات الحساب وتثبيت تجربة الأطفال على بيئة آمنة
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setParentalLockEnabled(!parentalLockEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              parentalLockEnabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                parentalLockEnabled ? 'right-1' : 'right-6'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
