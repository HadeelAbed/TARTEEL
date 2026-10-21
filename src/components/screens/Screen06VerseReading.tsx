import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, UserPersona, ScreenId, Ayah, QuranFontSize, Reciter } from '../../types';
import { SURAH_AL_MULK_AYAHS, RECITERS_LIST } from '../../data/quranData';
import { VerseMarker } from '../common/VerseMarker';
import { WaveformVisualizer } from '../common/WaveformVisualizer';
import { SoftDiffView } from '../common/SoftDiffView';
import {
  Eye,
  EyeOff,
  Repeat,
  Volume2,
  Mic,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  X,
  Radio,
  Sliders,
  Share2,
} from 'lucide-react';

interface Screen06VerseReadingProps {
  theme: ThemeMode;
  persona: UserPersona;
  onOpenAudioDock?: () => void;
  onOpenMicRecording?: () => void;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen06VerseReading: React.FC<Screen06VerseReadingProps> = ({
  theme,
  persona,
  onOpenAudioDock,
  onOpenMicRecording,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';

  const [activeAyahIdx, setActiveAyahIdx] = useState(0);
  const [hideMode, setHideMode] = useState<'visible' | 'blur' | 'hidden'>('visible');
  const [repeatCount, setRepeatCount] = useState<number>(3);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<QuranFontSize>('large');
  const [isZenFullscreen, setIsZenFullscreen] = useState(false);

  // In-Place Reciter Audio Dock state
  const [showInPlaceAudioDock, setShowInPlaceAudioDock] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS_LIST[2]); // Al-Husary
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // In-Place Voice Recitation & Soft Diff Modal state
  const [isRecitationModalOpen, setIsRecitationModalOpen] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'evaluating' | 'completed'>('idle');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recitationScore, setRecitationScore] = useState(96);

  const activeAyah: Ayah = SURAH_AL_MULK_AYAHS[activeAyahIdx];

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';

  // Eye comfort background
  const canvasBgClass = isDark
    ? 'glass-obsidian border-white/10'
    : isSepia
    ? 'glass-sepia border-amber-500/20'
    : 'surface-alabaster border-slate-200';

  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  // Font size mapping for eye-resting comfort
  const fontClass = {
    normal: 'text-2xl md:text-3xl leading-[2.4]',
    large: 'text-3xl md:text-4xl leading-[2.6]',
    xlarge: 'text-4xl md:text-5xl leading-[2.8]',
  }[fontSize];

  // Audio simulation timer with Web Audio API tone synthesis
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      setHighlightedWordIdx(0);
      interval = setInterval(() => {
        setHighlightedWordIdx((prev) => {
          if (prev === null) return 0;
          if (prev >= activeAyah.words.length - 1) {
            setIsPlayingAudio(false);
            return null;
          }
          return prev + 1;
        });
      }, 950 / playbackSpeed);
    } else {
      setHighlightedWordIdx(null);
    }

    return () => clearInterval(interval);
  }, [isPlayingAudio, activeAyah, playbackSpeed]);

  // Audio Play toggle with Web Audio gentle chime
  const togglePlayAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      // AudioContext fallback
    }
    setIsPlayingAudio(!isPlayingAudio);
  };

  // Recording Timer
  useEffect(() => {
    let timer: any;
    if (recordingStatus === 'recording') {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else if (recordingStatus === 'idle') {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [recordingStatus]);

  const handleStartRecording = () => {
    setRecordingStatus('recording');
    setRecordingSeconds(0);
  };

  const handleStopRecording = () => {
    setRecordingStatus('evaluating');
    setTimeout(() => {
      setRecordingStatus('completed');
    }, 1200);
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto py-4 px-4 md:px-8 font-ar space-y-4 transition-all duration-300 ${
        isZenFullscreen ? 'max-w-5xl py-8' : ''
      }`}
      dir="rtl"
    >
      {/* Top Reading Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateScreen(5)}
            className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/50 text-slate-300 dark:text-slate-400 hover:text-white transition-colors cursor-pointer smooth-press border border-white/5"
            title="العودة لفهرس السور"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div>
            <h1
              className="text-xl font-bold flex items-center gap-2"
              style={{ color: textColor }}
            >
              <span>سورة الملك</span>
              <span className="text-xs font-nums font-normal text-slate-400">
                (آية {activeAyah.numberInSurah} من ٣٠)
              </span>
            </h1>
            <div className="text-[11px] text-slate-400 font-nums flex items-center gap-2">
              <span>الجزء ٢٩</span>
              <span aria-hidden="true">·</span>
              <span>الحزب ٥٧</span>
              <span aria-hidden="true">·</span>
              <span>مكية</span>
            </div>
          </div>
        </div>

        {/* Eye Comfort Controls Cluster */}
        <div className="flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="flex items-center p-1 rounded-xl bg-slate-800/30 dark:bg-slate-900/40 border border-white/10 dark:border-white/5">
            <button
              type="button"
              onClick={() => {
                if (fontSize === 'xlarge') setFontSize('large');
                else if (fontSize === 'large') setFontSize('normal');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer smooth-press"
              title="تصغير حجم الخط (A-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-nums px-2 font-semibold text-slate-300">
              {fontSize === 'normal' ? 'عادي' : fontSize === 'large' ? 'مريح' : 'كبير جداً'}
            </span>
            <button
              type="button"
              onClick={() => {
                if (fontSize === 'normal') setFontSize('large');
                else if (fontSize === 'large') setFontSize('xlarge');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer smooth-press"
              title="تكبير حجم الخط لراحة العين (A+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Recall / Hide Toggle */}
          <button
            type="button"
            onClick={() => {
              if (hideMode === 'visible') setHideMode('blur');
              else if (hideMode === 'blur') setHideMode('hidden');
              else setHideMode('visible');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border smooth-press ${
              hideMode !== 'visible'
                ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                : 'bg-slate-800/40 text-slate-400 border-white/5 hover:text-slate-200'
            }`}
            title="مفتاح إخفاء/إظهار الكلمات لاختبار الحفظ والاسترجاع الذهني"
          >
            {hideMode === 'visible' ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">إخفاء للاختبار</span>
              </>
            ) : hideMode === 'blur' ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">وضع التمويه</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">إخفاء كامل</span>
              </>
            )}
          </button>

          {/* Zen Fullscreen Focus Toggle */}
          <button
            type="button"
            onClick={() => setIsZenFullscreen(!isZenFullscreen)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800/40 transition-colors cursor-pointer smooth-press"
            title={isZenFullscreen ? 'إلغاء وضع التركيز الكامل' : 'تفعيل وضع الخشوع الهادئ (Zen Fullscreen)'}
          >
            {isZenFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl transition-all cursor-pointer smooth-press ${
              isBookmarked
                ? 'text-[#E5C378] bg-[#E5C378]/15'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
            }`}
            title="حفظ العلامة المرجعية"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Zen Quran Reading Canvas */}
      <div
        className={`p-8 md:p-14 rounded-3xl min-h-[360px] flex flex-col justify-between relative transition-all duration-300 border ${canvasBgClass}`}
      >
        {/* Subtle Atmospheric Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.04]">
          <span className="text-8xl md:text-9xl font-quran">سُورَةُ المُلْك</span>
        </div>

        {/* Basmala Header */}
        <div className="text-center mb-6">
          <p
            className="font-quran text-lg md:text-xl font-normal tracking-wide"
            style={{ color: isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E' }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>

        {/* Quranic Verse Medina Uthmanic Text */}
        <div className="my-auto py-4 text-center">
          <div
            className={`font-quran select-text leading-loose transition-all duration-300 ${fontClass}`}
            style={{ color: textColor }}
          >
            {activeAyah.words.map((wordItem, idx) => {
              const isCurrentPlayingWord = highlightedWordIdx === idx;
              const isWordHidden = hideMode === 'hidden';
              const isWordBlurred = hideMode === 'blur';

              return (
                <span
                  key={idx}
                  className={`inline-block mx-1.5 px-1 py-0.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    isCurrentPlayingWord
                      ? 'bg-amber-400/25 text-[#E5C378] scale-105 shadow-xs font-bold'
                      : ''
                  } ${
                    isWordHidden
                      ? 'bg-slate-700/60 text-transparent select-none rounded min-w-[3rem]'
                      : isWordBlurred
                      ? 'blur-sm hover:blur-none transition-all'
                      : ''
                  }`}
                  onClick={() => {
                    // Play single word pronunciation chime
                    try {
                      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                      if (AudioCtx) {
                        const ctx = new AudioCtx();
                        const osc = ctx.createOscillator();
                        osc.frequency.setValueAtTime(520, ctx.currentTime);
                        osc.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.2);
                      }
                    } catch (e) {}
                  }}
                  title="انقر للاستماع لنطق هذه الكلمة"
                >
                  {wordItem.word}
                </span>
              );
            })}
            <VerseMarker
              numeral={activeAyah.arabicNumeral}
              theme={theme}
              size={fontSize === 'xlarge' ? 'lg' : 'md'}
              isActive={true}
            />
          </div>
        </div>

        {hideMode !== 'visible' && (
          <div className="text-center text-xs text-sky-400 font-medium py-1 animate-pulse">
            وضع التسميع الذاتي مفعل: انقر أو مرر الفأرة فوق الآية لإظهارها والتأكد من حفظك.
          </div>
        )}

        {/* Translation & Tafsir Footnote */}
        <div className="pt-4 border-t border-white/10 dark:border-slate-800 text-xs text-slate-400 leading-relaxed text-right flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/80 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold ml-1" style={{ color: isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E' }}>
              المعنى الميسر:
            </span>
            <span>{activeAyah.translationAr}</span>
          </div>
        </div>
      </div>

      {/* Guided Repetition & Navigation Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/30 dark:bg-slate-900/40 border border-white/10 dark:border-white/5">
        {/* Prev / Next Ayah Stepper */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={activeAyahIdx === 0}
            onClick={() => {
              setActiveAyahIdx((prev) => Math.max(0, prev - 1));
              setIsPlayingAudio(false);
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/60 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 cursor-pointer smooth-press border border-white/5"
          >
            <ChevronRight className="w-4 h-4" />
            <span>الآية السابقة</span>
          </button>

          <button
            type="button"
            disabled={activeAyahIdx === SURAH_AL_MULK_AYAHS.length - 1}
            onClick={() => {
              setActiveAyahIdx((prev) => Math.min(SURAH_AL_MULK_AYAHS.length - 1, prev + 1));
              setIsPlayingAudio(false);
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/60 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 cursor-pointer smooth-press border border-white/5"
          >
            <span>الآية التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Repetition Loop Selector (1x - 5x) */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Repeat className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">تكرار التثبيت:</span>
          <div className="flex gap-1 font-nums">
            {[1, 2, 3, 5].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setRepeatCount(count)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer smooth-press ${
                  repeatCount === count
                    ? 'bg-[#E5C378] text-slate-950 shadow-sm'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                {count}x
              </button>
            ))}
          </div>
        </div>

        {/* Recitation Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Synchronized Play Word-by-Word */}
          <button
            type="button"
            onClick={togglePlayAudio}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer smooth-press ${
              isPlayingAudio
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-sm'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-white/5'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Pause className="w-4 h-4 text-amber-400" />
                <span>إيقاف مؤقت</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-sky-400 fill-current" />
                <span>استماع كلمة بكلمة</span>
              </>
            )}
          </button>

          {/* Toggle Integrated Sheikh Audio Dock */}
          <button
            type="button"
            onClick={() => setShowInPlaceAudioDock(!showInPlaceAudioDock)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer smooth-press ${
              showInPlaceAudioDock
                ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-sm'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-white/5'
            }`}
          >
            <Volume2 className="w-4 h-4 text-sky-400" />
            <span>مشغل الشيوخ</span>
          </button>

          {/* In-Place Smart Mic Recording & AI Diff Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsRecitationModalOpen(true);
              setRecordingStatus('idle');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:opacity-95 smooth-press"
            style={{
              backgroundColor: goldPrimary,
              color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
            }}
          >
            <Mic className="w-4 h-4" />
            <span>ابدأ التسميع</span>
          </button>
        </div>
      </div>

      {/* Integrated In-Place Audio Dock Player (Smooth slide-in) */}
      {showInPlaceAudioDock && (
        <div
          className={`p-5 rounded-3xl border transition-all duration-300 space-y-4 ${
            isDark
              ? 'glass-obsidian border-white/10 glow-sky-pulse'
              : isSepia
              ? 'glass-sepia border-amber-500/20'
              : 'surface-alabaster border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold">مشغل التلاوة الصوتي المتقن</span>
            </div>
            <button
              type="button"
              onClick={() => setShowInPlaceAudioDock(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Reciter Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {RECITERS_LIST.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedReciter(r)}
                className={`p-2.5 rounded-xl border text-right text-xs transition-all cursor-pointer ${
                  selectedReciter.id === r.id
                    ? 'border-amber-400 bg-amber-400/15 font-bold text-amber-500 dark:text-amber-300 ring-1 ring-amber-400/30'
                    : 'border-white/5 bg-slate-800/40 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <div className="font-semibold block">{r.nameAr}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{r.styleAr}</div>
              </button>
            ))}
          </div>

          {/* Audio Waveform & Speed Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex-1 w-full">
              <WaveformVisualizer isPlaying={isPlayingAudio} theme={theme} height={40} />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 text-xs text-slate-400 font-nums">
                <span>السرعة:</span>
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      playbackSpeed === spd
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={togglePlayAudio}
                className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md cursor-pointer smooth-press"
              >
                {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-Place Smart Recitation & Soft Diff Modal */}
      {isRecitationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 font-ar" dir="rtl">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 transition-all duration-300 ${
              isDark
                ? 'bg-[#0B0F17] border-white/10 text-slate-100'
                : isSepia
                ? 'bg-[#181411] border-[#E2B86E]/20 text-[#F3EBDD]'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-500 dark:text-amber-300 flex items-center justify-center font-bold">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">التسميع الصوتي المباشر</h3>
                  <p className="text-xs text-slate-400">
                    رتّل الآية الكريمة بصوتك وتلقَّ تحليلاً فورياً وتوجيهاً تجويدياً لطيفاً
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRecitationModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/50 text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Verse Text */}
            <div className="p-4 rounded-2xl bg-slate-800/30 dark:bg-slate-900/50 border border-white/5 text-center">
              <span className="text-xs text-slate-400 block mb-1">الآية المطلوب تلاوتها:</span>
              <p className="font-quran text-xl md:text-2xl leading-relaxed" style={{ color: textColor }}>
                {activeAyah.textUthmanic}
              </p>
            </div>

            {/* Live Recording Interaction States */}
            {recordingStatus === 'idle' && (
              <div className="text-center py-6 space-y-4">
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center mx-auto shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Mic className="w-8 h-8" />
                </button>
                <div className="text-sm font-semibold">انقر على الميكروفون وابدأ التلاوة بهدوء</div>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  الخوارزمية الذكية تستمع لنطق الحركات والمدود والقلقلة دون إطلاق أحكام صارمة
                </p>
              </div>
            )}

            {recordingStatus === 'recording' && (
              <div className="text-center py-4 space-y-4">
                <div className="flex items-center justify-center gap-2 text-rose-500 font-nums font-bold text-lg animate-pulse">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span>00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>
                </div>

                <div className="max-w-md mx-auto py-2">
                  <WaveformVisualizer isRecording={true} theme={theme} height={54} />
                </div>

                <div className="text-xs text-slate-400">نحن نستمع لصوتك الجميل الآن...</div>

                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
                >
                  إنهاء التسميع وتحليل الإتقان
                </button>
              </div>
            )}

            {recordingStatus === 'evaluating' && (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto" />
                <div className="text-sm font-bold">جاري تحليل مخارج الحروف وأحكام التجويد...</div>
                <div className="text-xs text-slate-400">استجابة سريعة ومطابقة دقيقة للرسم العثماني</div>
              </div>
            )}

            {recordingStatus === 'completed' && (
              <div className="space-y-4">
                {/* Result Score Banner */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <div>
                      <div className="text-sm font-bold text-emerald-500 dark:text-emerald-300">
                        ما شاء الله! تلاوة مباركة ومتقنة
                      </div>
                      <div className="text-xs text-slate-400">
                        درجة الدقة: {recitationScore}٪ · تم حفظ التقدم في سجل الحفظ
                      </div>
                    </div>
                  </div>

                  <span className="font-nums text-2xl font-bold text-emerald-500">
                    {recitationScore}%
                  </span>
                </div>

                {/* Soft Diff Feedback */}
                <div className="p-4 rounded-2xl bg-slate-800/30 dark:bg-slate-900/40 border border-white/5 space-y-3">
                  <div className="text-xs font-semibold text-slate-400">
                    التغذية الراجعة التجويدية (التحليل اللطيف Soft Diff):
                  </div>
                  <SoftDiffView ayah={activeAyah} theme={theme} />
                </div>

                {/* Next Steps Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة التسميع</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsRecitationModalOpen(false);
                      if (activeAyahIdx < SURAH_AL_MULK_AYAHS.length - 1) {
                        setActiveAyahIdx(activeAyahIdx + 1);
                      }
                    }}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 shadow-md cursor-pointer hover:opacity-95"
                  >
                    <span>متابعة للآية التالية</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
