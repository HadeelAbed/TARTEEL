import React, { useState } from 'react';
import { ThemeMode, ViewportMode } from '../../types';
import {
  X,
  Copy,
  Check,
  Code2,
  Monitor,
  Smartphone,
  Sparkles,
  BookOpen,
  Mic,
  Database,
  Layers,
  ChevronDown,
  ChevronUp,
  FileCode,
  Download,
  ExternalLink,
} from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onSwitchViewport?: (mode: ViewportMode) => void;
}

interface CodeSection {
  id: string;
  category: 'web' | 'mobile' | 'engine' | 'data';
  titleAr: string;
  filePath: string;
  descriptionAr: string;
  targetPlatform: string;
  dependencies: string[];
  sampleCode: string;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSwitchViewport,
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'mobile' | 'engine' | 'data'>('all');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('web-dashboard');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showFullCode, setShowFullCode] = useState<boolean>(true);

  const brandGold = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';
  const cardBg = isDark
    ? 'bg-slate-900/80 border-slate-800'
    : isSepia
    ? 'bg-[#1C1612]/90 border-[#E2B86E]/20'
    : 'bg-white border-slate-200';

  const SECTIONS: CodeSection[] = [
    {
      id: 'web-dashboard',
      category: 'web',
      titleAr: 'لوحة تحكم سطح المكتب الشاملة (Web Dashboard)',
      filePath: 'src/components/screens/Screen03WebDashboard.tsx',
      descriptionAr:
        'واجهة الويب الرئيسية لسطح المكتب بمقاس 1440px، تحتوي على شريط الإنجاز اليومي، تتبع الورد القرآني، المقرأة الصوتية السريعة، وأنشطة استوديو البراعم.',
      targetPlatform: 'React + Tailwind CSS (Web / Next.js)',
      dependencies: ['lucide-react', 'quranData.ts', 'OctagonBadge.tsx'],
      sampleCode: `// استيراد واستخدام لوحة تحكم الويب في مشروعك:
import React from 'react';
import { Screen03WebDashboard } from './components/screens/Screen03WebDashboard';

export const MyWebPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Screen03WebDashboard
        theme="dark" // 'dark' | 'sepia' | 'light'
        persona="adult" // 'adult' | 'child'
        onNavigateScreen={(screenId) => console.log('الانتقال للشاشة:', screenId)}
        onOpenKidsStudio={() => console.log('فتح استوديو الأطفال')}
      />
    </div>
  );
};`,
    },
    {
      id: 'web-quran-reader',
      category: 'web',
      titleAr: 'قارئ المصحف الشريف ومشغل الصوتيات المدمج (Web Quran Reader)',
      filePath: 'src/components/screens/Screen06VerseReading.tsx',
      descriptionAr:
        'مصحف إلكتروني متكامل للويب يعرض الآيات بخط عثماني نقي، مع مشغل صوتي مدمج في أسفل الصفحة يتيح اختيار المقرئ، التحكم بالسرعة والتكرار، والتسميع الفوري.',
      targetPlatform: 'React + Web Audio API (Web / Next.js)',
      dependencies: ['lucide-react', 'VerseMarker.tsx', 'quranData.ts'],
      sampleCode: `// تضمين قارئ المصحف الشريف ومشغل الصوت:
import { Screen06VerseReading } from './components/screens/Screen06VerseReading';

<Screen06VerseReading
  theme="light" // يدعم النهاري والليلي والسيبيا بتباين فائق
  persona="adult"
  onNavigateScreen={(id) => navigateTo(id)}
  onOpenVoiceReciter={() => openReciterModal()}
/>`,
    },
    {
      id: 'mobile-home',
      category: 'mobile',
      titleAr: 'شاشة الجوال الرئيسية (Mobile Native Home)',
      filePath: 'src/components/screens/Screen04MobileHome.tsx',
      descriptionAr:
        'واجهة تطبيق الجوال المحسنة لمنطقة الإبهام (Thumb-zone)، تحتوي على زر التسميع السريع العريض، بطاقة استئناف الآية الأخيرة، وشريط الاستمرارية اليومية.',
      targetPlatform: 'React Native / Expo أو React PWA Mobile',
      dependencies: ['lucide-react', 'quranData.ts'],
      sampleCode: `// استخدام واجهة الجوال الرئيسية:
import { Screen04MobileHome } from './components/screens/Screen04MobileHome';

<Screen04MobileHome
  theme="dark"
  persona="adult"
  onNavigateScreen={(screenId) => handleTabChange(screenId)}
  onOpenKidsStudio={() => openKidsMode()}
/>`,
    },
    {
      id: 'mobile-recording',
      category: 'mobile',
      titleAr: 'واجهة تسجيل الصوت والتسميع المباشر (Mobile Voice Recording)',
      filePath: 'src/components/screens/Screen08VoiceRecording.tsx',
      descriptionAr:
        'شاشة تسجيل الصوت الذكي للجوال بمؤشر ميكروفون دائري ضخم، مؤقت زمني، وتغذية بصرية للأمواج الصوتية، مع أزرار سهلة اللمس للإيقاف والتحليل.',
      targetPlatform: 'Mobile / React Native Audio / WebRTC',
      dependencies: ['lucide-react', 'WaveformVisualizer.tsx'],
      sampleCode: `// استدعاء شاشة التسميع وتسجيل الصوت:
import { Screen08VoiceRecording } from './components/screens/Screen08VoiceRecording';

<Screen08VoiceRecording
  theme="dark"
  persona="adult"
  onFinishedRecording={() => showDiffResults()}
  onNavigateScreen={(screenId) => goBack(screenId)}
/>`,
    },
    {
      id: 'mobile-diff',
      category: 'mobile',
      titleAr: 'شاشة نتائج التسميع والـ Soft Diff (Recitation AI Analysis)',
      filePath: 'src/components/screens/Screen09RecitationDiff.tsx',
      descriptionAr:
        'شاشة عرض نتيجة التسميع القرآني بمقارنة فورية بين النص المتلو والمصحف، مع تظليل ناعم بالألوان للأخطاء بدون إحباط، وحساب نسبة الإتقان والطلاقة.',
      targetPlatform: 'Mobile / Web React',
      dependencies: ['SoftDiffView.tsx', 'OctagonBadge.tsx', 'quranData.ts'],
      sampleCode: `// عرض شاشة الفحص والتصحيح اللطيف للآيات:
import { Screen09RecitationDiff } from './components/screens/Screen09RecitationDiff';

<Screen09RecitationDiff
  theme="dark"
  persona="adult"
  onNavigateScreen={(id) => navigate(id)}
  onRetryRecording={() => restartSession()}
/>`,
    },
    {
      id: 'mobile-device-frame',
      category: 'mobile',
      titleAr: 'إطار محاكاة تطبيق الجوال وشريط التنقل السفلي (Device Frame)',
      filePath: 'src/components/common/DeviceFrame.tsx',
      descriptionAr:
        'مكوّن إطار الهاتف الذكي بنمط iPhone 16 Pro مع الجزيرة التفاعلية وشريط الحالة وشريط التنقل السفلي الأصيل (Bottom TabBar) لتبديل الشاشات بلمسة واحدة.',
      targetPlatform: 'React + Tailwind CSS Responsive Frame',
      dependencies: ['lucide-react'],
      sampleCode: `// إطار محاكاة الجوال مع شريط التنقل السفلي:
import { DeviceFrame } from './components/common/DeviceFrame';

<DeviceFrame
  mode="mobile" // 'mobile' | 'web' | 'split'
  onModeChange={(m) => setMode(m)}
  theme="dark"
>
  {/* شاشة الجوال الحالية تظهر هنا داخل الإطار */}
</DeviceFrame>`,
    },
    {
      id: 'kids-studio',
      category: 'mobile',
      titleAr: 'استوديو سِراج التفاعلي للأطفال (Kids Companion Canvas)',
      filePath: 'src/components/kids/KidsCompanionCanvas.tsx',
      descriptionAr:
        'بيئة قرآنية مرحة للأطفال تحتوي على ألعاب ترتيب الكلمات القرآنية، لعبة مطابقة البطاقات، شجرة النجوم الذهبية، وتوليد أصوات التهنئة الصوتية.',
      targetPlatform: 'React + Canvas / Web Audio (Web & Mobile)',
      dependencies: ['lucide-react', 'canvas-confetti'],
      sampleCode: `// تشغيل استوديو البراعم للأطفال:
import { KidsCompanionCanvas } from './components/kids/KidsCompanionCanvas';

<KidsCompanionCanvas
  theme="light" // ألوان مبهجة ومتباينة
  onSwitchToAdult={() => setPersona('adult')}
  onNavigateReading={() => goToQuran()}
/>`,
    },
    {
      id: 'engine-softdiff',
      category: 'engine',
      titleAr: 'محرك مقارنة التلاوة وإبراز التشكيل (SoftDiffView Engine)',
      filePath: 'src/components/common/SoftDiffView.tsx',
      descriptionAr:
        'المحرك البرمجي المسؤول عن مطابقة الكلمات القرآنية كلمة بكلمة، والتمييز بين النطق الصحيح، والخطأ في الحركة الإعرابية، والكلمات المفقودة.',
      targetPlatform: 'Universal TypeScript / React',
      dependencies: ['types.ts'],
      sampleCode: `// استخدام محرك المقارنة الصوتية Soft-Diff:
import { SoftDiffView } from './components/common/SoftDiffView';

<SoftDiffView
  expectedWords={['تَبَارَكَ', 'الَّذِي', 'بِيَدِهِ', 'الْمُلْكُ']}
  spokenWords={['تَبَارَكَ', 'الَّذِي', 'بِيَدِهِ', 'الْمُلْكِ']}
  theme="dark"
  persona="adult"
/>`,
    },
    {
      id: 'engine-waveform',
      category: 'engine',
      titleAr: 'مخطط الموجات الصوتية الحية (Live Audio Waveform)',
      filePath: 'src/components/common/WaveformVisualizer.tsx',
      descriptionAr:
        'مكوّن بصري سلس لرسم ذبذبات الصوت وترددات التلاوة الحية مع أنماط مختلفة (تسجيل، استماع، سكون).',
      targetPlatform: 'Universal Canvas / React',
      dependencies: ['lucide-react'],
      sampleCode: `// تضمين رسم الذبذبات الصوتية:
import { WaveformVisualizer } from './components/common/WaveformVisualizer';

<WaveformVisualizer
  isPlaying={true}
  mode="recording" // 'playback' | 'recording' | 'idle'
  theme="dark"
  height={60}
/>`,
    },
    {
      id: 'engine-badges',
      category: 'engine',
      titleAr: 'نظام الأوسمة الإسلامية الثمانية (Octagon Badges)',
      filePath: 'src/components/common/OctagonBadge.tsx',
      descriptionAr:
        'أوسمة هندسية إسلامية ثمانية الأضلاع مستوحاة من العمارة الإسلامية والمصاحف الشريفة مع درجات (برونزي، فضي، ذهبي، ماسي).',
      targetPlatform: 'Universal SVG / React',
      dependencies: ['types.ts'],
      sampleCode: `// عرض وسام إسلامي ثماني:
import { OctagonBadge } from './components/common/OctagonBadge';

<OctagonBadge
  size={64}
  level={21}
  tier="gold" // 'bronze' | 'silver' | 'gold' | 'diamond'
  title="سلسلة ٢١ يوماً"
  theme="dark"
/>`,
    },
    {
      id: 'quran-database',
      category: 'data',
      titleAr: 'بنك بيانات القرآن والمقرئين (Quran Data & Repetition Queue)',
      filePath: 'src/data/quranData.ts',
      descriptionAr:
        'ملف البيانات المتكامل الذي يحتوي على عينات السور المشكولة، آيات سورة الملك كاملة، قائمة المقرئين مع روابط التلاوات، وطابور التكرار المتباعد FSRS.',
      targetPlatform: 'TypeScript Data Store',
      dependencies: ['types.ts'],
      sampleCode: `// استيراد واستخدام بيانات السور والآيات:
import {
  SURAHS_SAMPLE,
  SURAH_AL_MULK_AYAHS,
  RECITERS_LIST,
  SPACED_REPETITION_QUEUE,
} from './data/quranData';

console.log('المقرئون المتاحون:', RECITERS_LIST);
console.log('آيات سورة الملك:', SURAH_AL_MULK_AYAHS.length);`,
    },
  ];

  const filteredSections =
    activeCategory === 'all'
      ? SECTIONS
      : SECTIONS.filter((s) => s.category === activeCategory);

  const currentSection =
    SECTIONS.find((s) => s.id === selectedSectionId) || SECTIONS[0];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/75 font-ar animate-fadeIn"
      dir="rtl"
    >
      <div
        className={`w-full max-w-5xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-[#0B0F17] border-white/10 text-slate-100'
            : isSepia
            ? 'bg-[#181411] border-[#E2B86E]/20 text-[#F3EBDD]'
            : 'bg-[#F8F7F2] border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Header Modal Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md font-bold"
              style={{
                backgroundColor: brandGold,
                color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
              }}
            >
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <span>مُستكشف وناسخ أكواد الأقسام البرمجية</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-500 font-nums font-semibold">
                  Source Code & Modules
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                اختر أي قسم (واجهات الويب، الجوال، المحركات، الصوتيات) واضغط زر النسخ لأخذه لمشروعك فوراً.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Navigation Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 bg-slate-900/30">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: 'كافة الأقسام', icon: Layers },
              { id: 'web', label: 'واجهات الويب (Desktop)', icon: Monitor },
              { id: 'mobile', label: 'واجهات الجوال (Mobile App)', icon: Smartphone },
              { id: 'engine', label: 'محركات الذكاء والصوت', icon: Mic },
              { id: 'data', label: 'بيانات القرآن والمقرئين', icon: Database },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : isDark || isSepia
                      ? 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/50'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {onSwitchViewport && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] hidden md:inline">معاينة مباشرة:</span>
              <button
                type="button"
                onClick={() => {
                  onSwitchViewport('web');
                  onClose();
                }}
                className="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 flex items-center gap-1 cursor-pointer font-semibold"
              >
                <Monitor className="w-3 h-3" />
                <span>شاشة الويب</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchViewport('mobile');
                  onClose();
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 flex items-center gap-1 cursor-pointer font-semibold"
              >
                <Smartphone className="w-3 h-3" />
                <span>شاشة الجوال</span>
              </button>
            </div>
          )}
        </div>

        {/* Master-Detail Body Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Sidebar: List of Sections */}
          <div className="md:col-span-5 p-3 sm:p-4 overflow-y-auto border-l border-white/5 space-y-2 max-h-[50vh] md:max-h-none">
            {filteredSections.map((sec) => {
              const isSelected = sec.id === selectedSectionId;
              const isWeb = sec.category === 'web';
              const isMobile = sec.category === 'mobile';
              const isEngine = sec.category === 'engine';

              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border text-right ${
                    isSelected
                      ? isDark
                        ? 'bg-amber-400/10 border-amber-400/50 shadow-sm'
                        : isSepia
                        ? 'bg-[#E2B86E]/15 border-[#E2B86E]/50'
                        : 'bg-amber-50 border-amber-300 shadow-xs'
                      : isDark
                      ? 'bg-slate-900/40 hover:bg-slate-800/50 border-white/5'
                      : isSepia
                      ? 'bg-[#14100D]/40 hover:bg-[#1E1813]/60 border-[#E2B86E]/10'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-amber-500 dark:text-amber-300' : ''
                      }`}
                    >
                      {sec.titleAr}
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                        isWeb
                          ? 'bg-sky-500/15 text-sky-400'
                          : isMobile
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : isEngine
                          ? 'bg-purple-500/15 text-purple-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {sec.category}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 truncate dir-ltr text-right" dir="ltr">
                    {sec.filePath}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detail Panel: Section Code & Instructions */}
          <div className="md:col-span-7 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Active Section Info Card */}
              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold" style={{ color: textColor }}>
                    {currentSection.titleAr}
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/50 text-slate-300 font-semibold border border-white/5">
                    البيئة: {currentSection.targetPlatform}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {currentSection.descriptionAr}
                </p>

                {/* File Path & Copy Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-800/30 px-2.5 py-1 rounded-lg">
                    <FileCode className="w-3.5 h-3.5 text-amber-400" />
                    <span className="select-all" dir="ltr">
                      {currentSection.filePath}
                    </span>
                  </div>

                  {/* One-click Copy Button */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyCode(currentSection.id, currentSection.sampleCode)
                    }
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer hover:opacity-95 smooth-press"
                    style={{
                      backgroundColor:
                        copiedId === currentSection.id ? '#10B981' : brandGold,
                      color:
                        copiedId === currentSection.id
                          ? '#FFFFFF'
                          : isDark || isSepia
                          ? '#0B0F17'
                          : '#FFFFFF',
                    }}
                  >
                    {copiedId === currentSection.id ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>تم نسخ الكود بنجاح! ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>نسخ كود هذا القسم</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Preview Box */}
              <div className="rounded-2xl border border-white/10 dark:border-slate-800 overflow-hidden bg-slate-950/90 text-slate-100 shadow-inner">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>نموذج التضمين والاستخدام السريع</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">TypeScript / JSX</span>
                </div>

                <div className="p-4 font-mono text-xs overflow-x-auto text-left leading-relaxed text-emerald-400/90" dir="ltr">
                  <pre>{currentSection.sampleCode}</pre>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
                <div className="font-bold text-amber-500 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>طريقة أخذ وتضمين الملف في تطبيقك الخارجي:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 dark:text-slate-300 pr-1">
                  <li>
                    انسخ ملف المكوّن من المسار: <code className="font-mono text-amber-400" dir="ltr">{currentSection.filePath}</code> وضعه في مجلد مشروعك.
                  </li>
                  <li>
                    تأكد من وجود التبعيات المطلوبة: <span className="font-mono text-sky-400">{currentSection.dependencies.join(', ')}</span>.
                  </li>
                  <li>
                    استورد المكوّن ومرر الـ Props (مثل theme و persona) كما في نموذج الكود أعلاه.
                  </li>
                </ol>
              </div>
            </div>

            {/* Bottom Footer Tip */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>💡 يمكنك أيضاً نسخ أي ملف مباشرة من مستودع المشروع ومجلّد <code className="text-amber-400 font-mono">src/components/</code></span>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
