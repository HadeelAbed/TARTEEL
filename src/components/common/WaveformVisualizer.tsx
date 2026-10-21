import React, { useEffect, useState } from 'react';
import { ThemeMode } from '../../types';

interface WaveformVisualizerProps {
  isRecording?: boolean;
  isPlaying?: boolean;
  theme?: ThemeMode;
  height?: number;
  barCount?: number;
  className?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isRecording = false,
  isPlaying = false,
  theme = 'dark',
  height = 56,
  barCount = 36,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const activeColor = isDark ? '#38BDF8' : isSepia ? '#38BDF8' : '#0284C7'; // Atmospheric Sky Blue / Oceanic Cyan
  const inactiveColor = isDark
    ? 'rgba(255, 255, 255, 0.14)'
    : isSepia
    ? 'rgba(226, 184, 110, 0.18)'
    : 'rgba(15, 23, 42, 0.12)';

  const [amplitudes, setAmplitudes] = useState<number[]>(() =>
    Array.from({ length: barCount }, (_, i) => 0.15 + Math.sin(i * 0.4) * 0.1)
  );

  useEffect(() => {
    if (!isRecording && !isPlaying) {
      // Gentle idle wave
      setAmplitudes(Array.from({ length: barCount }, (_, i) => 0.12 + Math.abs(Math.sin(i * 0.25)) * 0.12));
      return;
    }

    const interval = setInterval(() => {
      setAmplitudes((prev) =>
        prev.map(() => {
          const base = isRecording ? 0.25 : 0.2;
          const factor = isRecording ? 0.75 : 0.65;
          return base + Math.random() * factor;
        })
      );
    }, 90);

    return () => clearInterval(interval);
  }, [isRecording, isPlaying, barCount]);

  return (
    <div
      className={`flex items-center justify-center gap-[3px] px-3 py-2 w-full transition-all duration-300 ${className}`}
      style={{ height }}
      aria-label="مؤشر ترددات الصوت الحية"
    >
      {amplitudes.map((amp, idx) => {
        const barHeight = Math.max(4, Math.round(amp * (height - 12)));
        const isActive = isRecording || isPlaying;

        return (
          <div
            key={idx}
            className="w-[3px] rounded-full transition-all duration-100 ease-out"
            style={{
              height: `${barHeight}px`,
              backgroundColor: isActive ? activeColor : inactiveColor,
              opacity: isActive ? 0.85 + Math.sin(idx) * 0.15 : 0.5,
              boxShadow: isRecording && amp > 0.6 ? `0 0 8px ${activeColor}` : 'none',
            }}
          />
        );
      })}
    </div>
  );
};
