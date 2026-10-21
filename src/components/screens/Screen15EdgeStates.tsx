import React, { useState } from 'react';
import { ThemeMode, UserPersona, ScreenId } from '../../types';
import { WifiOff, MicOff, RefreshCw, AlertTriangle, Database, CheckCircle2, HeartHandshake, ArrowRight } from 'lucide-react';

interface Screen15EdgeStatesProps {
  theme: ThemeMode;
  persona: UserPersona;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen15EdgeStates: React.FC<Screen15EdgeStatesProps> = ({
  theme,
  persona,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const [activeEdgeTab, setActiveEdgeTab] = useState<'offline' | 'mic_lost' | 'unconfident'>('offline');

  const goldPrimary = isDark ? '#E5C378' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : '#0284C7';

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 md:px-8 font-ar space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-rose-400 font-nums uppercase tracking-wider block mb-1">
          • حالات الحواف والأخطاء والانقطاع
        </span>
        <h1 className="text-2xl font-bold text-slate-100">
          معالجة الحالات الحرجة وغير المتصلة (Edge & Offline States)
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          تصميم مرن يضمن استمرار الترتيل حتى مع انقطاع الإنترنت أو تعثر التقاط الميكروفون.
        </p>
      </div>

      {/* Edge State Selector Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveEdgeTab('offline')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeEdgeTab === 'offline'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-white/5'
          }`}
        >
          <WifiOff className="w-3.5 h-3.5" />
          <span>١. انقطاع الاتصال والطابور المحلي (Offline Queue)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveEdgeTab('mic_lost')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeEdgeTab === 'mic_lost'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-white/5'
          }`}
        >
          <MicOff className="w-3.5 h-3.5" />
          <span>٢. انفصال الميكروفون أو تعطل الإدخال الصوتي</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveEdgeTab('unconfident')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeEdgeTab === 'unconfident'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-white/5'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>٣. تعثر التعرف الصوتي وإعادة المحاولة التشجيعية</span>
        </button>
      </div>

      {/* Main Dynamic Edge State Container */}
      <div
        className={`p-6 sm:p-10 rounded-3xl border transition-all ${
          isDark ? 'glass-obsidian border-white/10' : 'surface-alabaster'
        }`}
      >
        {activeEdgeTab === 'offline' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-white/10 dark:border-slate-800">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-500/10 text-amber-400 border border-amber-500/25 shrink-0">
                <WifiOff className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  وضع الترتيل المحلي غير المتصل (Offline-First Queue)
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  فقد التطبيق الاتصال بخادم Laravel، ولكن لا تقلق: تم حفظ جلسة الترتيل الحالية ونقاط الخبرة في قاعدة البيانات المحلية (IndexedDB / WatermelonDB).
                </p>
              </div>
            </div>

            {/* Offline Local Cache Queue Specs */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 space-y-3 font-nums text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-slate-200 font-ar">
                  <Database className="w-4 h-4 text-sky-400" />
                  <span>طابور المزامنة الدُفعية المعلق</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-bold">
                  ٣ أحداث مخزنة محلياً
                </span>
              </div>

              <div className="divide-y divide-white/5 text-slate-400 text-[11px] pt-1 font-ar">
                <div className="py-2 flex justify-between">
                  <span>جلسة ترتيل سورة الملك (الآيات ١ - ٥)</span>
                  <span className="text-amber-400 font-nums">بانتظار عودة الشبكة</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>تمديد سلسلة الاستمرارية (اليوم ٢١)</span>
                  <span className="text-amber-400 font-nums">محفوظ في الكاش المحلي</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة فحص الاتصال بالإنترنت</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen(6)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
              >
                متابعة القراءة دون اتصال
              </button>
            </div>
          </div>
        )}

        {activeEdgeTab === 'mic_lost' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-white/10 dark:border-slate-800">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-rose-500/10 text-rose-400 border border-rose-500/25 shrink-0">
                <MicOff className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  انقطع اتصال الميكروفون أثناء التسميع
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  توقف دفق الصوت الرقمي (Web Audio stream disconnected). يرجى التأكد من توصيل سماعة الرأس أو اختيار جهاز الإدخال الصحيح.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-rose-400">خطوات الاستعادة السريعة:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>تأكد من عدم استخدام تطبيق آخر للميكروفون في الوقت نفسه.</li>
                <li>إن كنت تستخدم سماعة بلوتوث، تأكد من شحنها وثبات اقترانها.</li>
                <li>يمكنك دائماً الانتقال إلى وضع "القراءة الذاتية مع كشف الكلمات" بنقرة واحدة.</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#E5C378] hover:bg-[#E5C378]/90 cursor-pointer"
              >
                إعادة ضبط الميكروفون
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen(6)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                التحويل إلى نمط التسميع الصامت
              </button>
            </div>
          </div>
        )}

        {activeEdgeTab === 'unconfident' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-white/10 dark:border-slate-800">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-sky-500/10 text-sky-400 border border-sky-500/25 shrink-0">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  خذ نفساً عميقاً، القرآن نور يتنزل بتمهل
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  كان الصوت غير واضح في المقطع الأخير بسبب ضجيج خفيف في المكان أو تسارع في التلاوة. لا تثريب عليك، يمكنك الإعادة بكل طمأنينة وسكينة.
                </p>
              </div>
            </div>

            {/* Encouraging Supportive Pedagogical Guidance */}
            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-slate-200 space-y-2">
              <div className="font-semibold text-sky-400">نصائح من الشيخ المعلم:</div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                «من قرأ القرآن وهو عليه شاق فله أجران». اقترب قليلاً من الميكروفون، وتمهل عند الحروف المشددة، وسيتعرف النظام على صوتك فوراً.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onNavigateScreen(8)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer text-slate-950 bg-[#E5C378] hover:bg-[#E5C378]/90"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة المحاولة بروح هادئة</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateScreen(7)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                الاستماع أولاً لصوت الشيخ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
