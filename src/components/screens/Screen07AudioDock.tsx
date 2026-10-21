import React, { useState } from 'react';
import { ThemeMode, UserPersona, Reciter, ScreenId } from '../../types';
import { RECITERS_LIST } from '../../data/quranData';
import { WaveformVisualizer } from '../common/WaveformVisualizer';
import { Play, Pause, RotateCcw, Volume2, FastForward, Repeat, Check, Radio, ChevronRight, BookOpen } from 'lucide-react';

interface Screen07AudioDockProps {
  theme: ThemeMode;
  persona: UserPersona;
  onClose?: () => void;
  onNavigateScreen?: (id: ScreenId) => void;
}

export const Screen07AudioDock: React.FC<Screen07AudioDockProps> = ({
  theme,
  persona,
  onClose,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS_LIST[2]); // Mahmoud Khalil Al-Husary
  const [repeatRange, setRepeatRange] = useState<number>(3);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentTimeSec, setCurrentTimeSec] = useState(8);
  const totalDurationSec = 22;

  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  // Smooth audio progression timer
  React.useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) return 0;
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const progressPercent = Math.round((currentTimeSec / totalDurationSec) * 100);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const containerBg = isDark
    ? 'glass-obsidian border-white/10 glow-sky-pulse'
    : isSepia
    ? 'glass-sepia border-amber-500/20'
    : 'surface-alabaster border-slate-200';

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 font-ar space-y-5" dir="rtl">
      {/* Return to Verse Reading Banner */}
      {onClose && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/40 hover:bg-slate-700/50 text-slate-300 transition-all cursor-pointer border border-white/5"
          >
            <ChevronRight className="w-4 h-4" />
            <span>العودة لقراءة الآية في المصحف</span>
          </button>

          <span className="text-xs text-slate-400 font-nums">
            سورة الملك · آية ٢
          </span>
        </div>
      )}

      {/* Audio Screen Header */}
      <div className="text-center">
        <span className="text-xs font-semibold text-sky-500 font-nums uppercase tracking-wider block mb-1">
          • مشغل التثبيت والاستماع العائم
        </span>
        <h2 className="text-2xl font-bold" style={{ color: textColor }}>
          تكرار الآية مع الشيخ المعتمد
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          سورة الملك — الآية ٢: «ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا...»
        </p>
      </div>

      {/* Floating Audio Dock Container */}
      <div
        className={`p-6 sm:p-8 rounded-3xl relative overflow-hidden transition-all shadow-2xl border ${containerBg}`}
      >
        {/* Reciter Info & Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-slate-950 font-ar shadow-md"
              style={{ backgroundColor: goldPrimary }}
            >
              {selectedReciter.avatarInitials}
            </div>
            <div>
              <div className="font-bold text-base" style={{ color: textColor }}>
                {selectedReciter.nameAr}
              </div>
              <div className="text-xs text-slate-400 font-nums flex items-center gap-2">
                <span>{selectedReciter.styleAr}</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-500">{selectedReciter.bitrate}</span>
              </div>
            </div>
          </div>

          {/* Quick Reciter Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {RECITERS_LIST.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedReciter(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer smooth-press ${
                  selectedReciter.id === r.id
                    ? 'bg-sky-500/20 text-sky-500 border border-sky-500/40 font-semibold'
                    : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {r.nameAr.split(' ')[0]} {r.nameAr.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Live Audio Visualizer Waveform */}
        <div className="py-6 space-y-2">
          <WaveformVisualizer isPlaying={isPlaying} theme={theme} height={60} />

          {/* Progress Timeline */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-nums px-1">
            <span>{formatTime(currentTimeSec)}</span>
            <span>{formatTime(totalDurationSec)}</span>
          </div>
        </div>

        {/* Playback Controls & Repeat Matrix */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10 dark:border-slate-800">
          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-nums">
            <span>السرعة:</span>
            {[0.75, 1.0, 1.25, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800/40 text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Core Transport Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentTimeSec(0)}
              className="p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 transition-colors cursor-pointer"
              title="إعادة الاستماع من البداية"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              style={{
                backgroundColor: goldPrimary,
                color: isDark || isSepia ? '#0B0F17' : '#FFFFFF',
              }}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current mr-0.5" />}
            </button>

            <button
              type="button"
              className="p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 transition-colors cursor-pointer"
              title="تقديم ٥ ثوانٍ"
            >
              <FastForward className="w-4 h-4" />
            </button>
          </div>

          {/* Repeat Range Count */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Repeat className="w-4 h-4 text-sky-500" />
            <span className="hidden sm:inline">عدد التكرار:</span>
            {[1, 2, 3, 5].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setRepeatRange(cnt)}
                className={`w-7 h-7 rounded-lg text-xs font-nums font-bold transition-all cursor-pointer ${
                  repeatRange === cnt
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-slate-800/40 text-slate-400 hover:text-white'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
