import React, { useState, useEffect } from 'react';
import { ThemeMode, UserPersona, ScreenId } from '../../types';
import { WaveformVisualizer } from '../common/WaveformVisualizer';
import { Mic, MicOff, Square, AlertCircle, RefreshCw, Volume2, ShieldAlert, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

interface Screen08VoiceRecordingProps {
  theme: ThemeMode;
  persona: UserPersona;
  onFinishedRecording: () => void;
  onNavigateScreen: (id: ScreenId) => void;
}

export const Screen08VoiceRecording: React.FC<Screen08VoiceRecordingProps> = ({
  theme,
  persona,
  onFinishedRecording,
  onNavigateScreen,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isChild = persona === 'child';

  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'processing'>('idle');
  const [permissionState, setPermissionState] = useState<'granted' | 'denied' | 'prompt'>('granted');
  const [seconds, setSeconds] = useState(0);

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  useEffect(() => {
    let timer: any;
    if (recordingState === 'recording') {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [recordingState]);

  const toggleRecording = () => {
    if (permissionState === 'denied') return;

    if (recordingState === 'idle') {
      setRecordingState('recording');
    } else if (recordingState === 'recording') {
      setRecordingState('processing');
      setTimeout(() => {
        setRecordingState('idle');
        onFinishedRecording();
      }, 1200);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-4 px-4 font-ar space-y-6" dir="rtl">
      {/* Return Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigateScreen(6)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/40 hover:bg-slate-700/50 text-slate-300 transition-all cursor-pointer border border-white/5"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة لقراءة الآية في المصحف</span>
        </button>

        <span className="text-xs text-slate-400 font-nums">
          سورة الملك · آية ٢
        </span>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1" style={{ color: textColor }}>
          {recordingState === 'recording'
            ? 'جاري الاستماع للترتيل بدقة...'
            : 'التسميع الصوتي المباشر'}
        </h2>
        <p className="text-xs text-slate-400">
          رتّل بصوت واضح ومعتدل، وسيقوم النظام بمطابقة مخارج الحروف وأحكام التجويد فورياً.
        </p>
      </div>

      {/* Target Ayah Reminder Box */}
      <div
        className={`p-5 rounded-2xl text-center border ${
          isDark
            ? 'glass-obsidian-subtle border-white/5'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200 shadow-xs'
        }`}
      >
        <span className="text-[11px] text-amber-500 font-nums font-semibold block mb-1">
          سورة الملك — الآية ٢
        </span>
        <div
          className="font-quran text-xl md:text-2xl leading-relaxed"
          style={{ color: textColor }}
        >
          «ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ»
        </div>
      </div>

      {/* Central Circular Mic Hub */}
      <div className="relative py-8 flex flex-col items-center justify-center">
        {recordingState === 'recording' && (
          <>
            <div className="absolute w-60 h-60 rounded-full bg-sky-400/15 animate-ping duration-1000 pointer-events-none" />
            <div className="absolute w-72 h-72 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
          </>
        )}

        {/* Circular Mic Button */}
        <button
          type="button"
          onClick={toggleRecording}
          disabled={permissionState === 'denied'}
          className={`relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer shadow-2xl border ${
            recordingState === 'recording'
              ? 'border-sky-400 bg-sky-500/20 glow-sky-pulse'
              : isDark
              ? 'glass-obsidian border-amber-400/40 hover:border-amber-400 hover:scale-105'
              : 'surface-alabaster border-amber-500/40 hover:scale-105'
          } ${permissionState === 'denied' ? 'opacity-40 cursor-not-allowed' : ''}`}
          aria-label={recordingState === 'recording' ? 'إيقاف التسجيل' : 'بدء التسميع الصوتي'}
        >
          {recordingState === 'recording' ? (
            <Square className="w-8 h-8 fill-sky-500 text-sky-500" />
          ) : recordingState === 'processing' ? (
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
          ) : (
            <Mic
              className="w-10 h-10 transition-colors"
              style={{ color: goldPrimary }}
            />
          )}

          <span
            className="text-[11px] font-nums font-semibold mt-1"
            style={{ color: recordingState === 'recording' ? skyColor : goldPrimary }}
          >
            {recordingState === 'recording'
              ? `00:0${seconds}`
              : recordingState === 'processing'
              ? 'معالجة...'
              : 'ابدأ التسميع'}
          </span>
        </button>

        {/* Real-time Dynamic Waveform Animation */}
        <div className="w-full max-w-sm mt-6">
          <WaveformVisualizer
            isRecording={recordingState === 'recording'}
            theme={theme}
            height={44}
          />
        </div>
      </div>

      {/* Helpful Recitation Guidelines */}
      <div className="p-4 rounded-2xl bg-slate-800/30 dark:bg-slate-900/40 border border-white/5 space-y-2 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-bold text-slate-300">
          <Volume2 className="w-4 h-4 text-amber-500" />
          <span>إرشادات التسميع للحصول على أفضل دقة:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 pr-2 leading-relaxed">
          <li>تأكد من الهدوء حولك والتحدث بمسافة ١٥-٢٠ سم من الميكروفون.</li>
          <li>راعِ إتمام الحركات وقلقلة الحروف الساكنة (ق، ط، ب، ج، د).</li>
          <li>يمكنك التوقف في أي وقت بالنقر على المربع الأزرق لمشاهدة التحليل.</li>
        </ul>
      </div>
    </div>
  );
};
