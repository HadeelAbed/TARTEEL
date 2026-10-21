import React, { useState } from 'react';
import { ThemeMode, UserPersona } from '../../types';
import { OctagonBadge } from '../common/OctagonBadge';
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, Mic2, ShieldCheck } from 'lucide-react';

interface Screen01WelcomeProps {
  theme: ThemeMode;
  persona: UserPersona;
  onPersonaChange: (p: UserPersona) => void;
  onNavigateNext: () => void;
}

export const Screen01Welcome: React.FC<Screen01WelcomeProps> = ({
  theme,
  persona,
  onPersonaChange,
  onNavigateNext,
}) => {
  const isDark = theme === 'dark';
  const isChild = persona === 'child';
  const [selectedGoal, setSelectedGoal] = useState<'gentle' | 'balanced' | 'hafiz'>('balanced');

  const goldPrimary = isDark ? '#E5C378' : '#96742E';

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 md:px-8 font-ar" dir="rtl">
      {/* Visual Identity Header */}
      <div className="text-center mb-8 relative">
        {/* Subtle atmospheric gold/sky glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-4">
          <OctagonBadge size={76} theme={theme} level={1} tier="gold" title="ترتيل" />
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
        >
          {isChild ? 'مرحباً بك يا بطل القرآن في ترتيل!' : 'رتّلِ القرآنَ ترتيلاً — بهدوءٍ وسكينة'}
        </h1>

        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          {isChild
            ? 'رحلتك الممتعة لحفظ وتلاوة كتاب الله بصوتك الجميل، خطوة بخطوة مع نجوم الإتقان وأوسمة الفوز.'
            : 'منظومة تفاعلية راقية لضبط الحفظ وتثبيت التلاوة بالرسم العثماني وخوارزميات التكرار المتباعد الذكية.'}
        </p>
      </div>

      {/* Persona Selection Segmented Control */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-400 mb-2.5 text-center">
          اختر النمط المناسب لتخصيص نبرة التجربة وتوزيع الأهداف:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {/* Adult Card */}
          <button
            type="button"
            onClick={() => onPersonaChange('adult')}
            className={`p-5 rounded-2xl text-right transition-all cursor-pointer relative ${
              !isChild
                ? isDark
                  ? 'glass-obsidian border-[#E5C378]/60 glow-gold-subtle'
                  : 'surface-alabaster border-[#96742E]/60 ring-2 ring-[#96742E]/20'
                : isDark
                ? 'glass-obsidian-subtle opacity-70 hover:opacity-100'
                : 'surface-alabaster-subtle opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-base" style={{ color: !isChild ? goldPrimary : undefined }}>
                نمط الكبار (الوقار والتثبيت)
              </span>
              <BookOpen className="w-5 h-5 text-[#E5C378]" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              واجهة هادئة، تركيز كامل على دقة مخارج الحروف، خطط مراجعة علمية، وتحليلات احتفاظ متقدمة.
            </p>
          </button>

          {/* Child Card */}
          <button
            type="button"
            onClick={() => onPersonaChange('child')}
            className={`p-5 rounded-2xl text-right transition-all cursor-pointer relative ${
              isChild
                ? isDark
                  ? 'glass-obsidian border-amber-400/70 glow-gold-subtle'
                  : 'surface-alabaster border-amber-600 ring-2 ring-amber-400/20'
                : isDark
                ? 'glass-obsidian-subtle opacity-70 hover:opacity-100'
                : 'surface-alabaster-subtle opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-base" style={{ color: isChild ? '#F59E0B' : undefined }}>
                نمط البراعم (الأطفال والناشئة)
              </span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              تحفيز لطيف، أوسمة هندسية مرحة، دخول برمز PIN سريع، وحماية أبوية خالية من الإعلانات.
            </p>
          </button>
        </div>
      </div>

      {/* Daily Goal Calibration */}
      <div
        className={`p-6 rounded-2xl mb-8 max-w-2xl mx-auto transition-all ${
          isDark ? 'glass-obsidian' : 'surface-alabaster'
        }`}
      >
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: goldPrimary }}>
          <Mic2 className="w-4 h-4 text-[#38BDF8]" />
          <span>تحديد معدل الترتيل اليومي المقترح</span>
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'gentle', title: 'هادئ ومستمر', desc: '٥ دقائق يومياً', ayat: '٣-٥ آيات' },
            { id: 'balanced', title: 'متوازن ومثبت', desc: '١٥ دقيقة يومياً', ayat: 'نصف حزب' },
            { id: 'hafiz', title: 'همة الحفاظ', desc: '٣٠ دقيقة يومياً', ayat: 'حزب كامل' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedGoal(item.id as any)}
              className={`p-3 rounded-xl text-center transition-all cursor-pointer border ${
                selectedGoal === item.id
                  ? isDark
                    ? 'border-[#E5C378] bg-[#E5C378]/10 text-white'
                    : 'border-[#96742E] bg-[#96742E]/10 text-slate-900'
                  : isDark
                  ? 'border-white/5 bg-slate-900/30 text-slate-400 hover:text-slate-200'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              <div className="font-semibold text-xs mb-1">{item.title}</div>
              <div className="text-[11px] font-nums opacity-80">{item.desc}</div>
              <div className="text-[10px] text-amber-400/90 mt-1">{item.ayat}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Trust & Privacy Marker */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8 max-w-md mx-auto text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-400/80 shrink-0" />
        <span>بيانات صوتية مشفرة بالكامل، خالية من أي تتبع تجاري أو إعلانات.</span>
      </div>

      {/* Primary Action Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.99] cursor-pointer shadow-lg"
          style={{
            backgroundColor: isDark ? '#E5C378' : '#96742E',
            color: isDark ? '#0B0F17' : '#FFFFFF',
          }}
        >
          <span>المتابعة إلى إنشاء الحساب والدخول</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
