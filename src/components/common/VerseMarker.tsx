import React from 'react';
import { ThemeMode } from '../../types';

interface VerseMarkerProps {
  numeral: string;
  theme?: ThemeMode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isActive?: boolean;
}

export const VerseMarker: React.FC<VerseMarkerProps> = ({
  numeral,
  theme = 'dark',
  size = 'md',
  className = '',
  isActive = false,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size];

  // Colors strictly conforming to spec:
  // Brushed Brass / Champagne Gold: #E5C378 for Dark Mode
  // Deep Antique Brass: #96742E for Light Mode
  // Warm Amber Gold: #E2B86E for Sepia Mode
  const goldColor = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const textColor = isDark ? '#F8FAFC' : isSepia ? '#F3EBDD' : '#0F172A';

  return (
    <span
      className={`inline-flex items-center justify-center relative select-none mx-1.5 transition-all duration-200 ${sizeClasses} ${className}`}
      title={`آية ${numeral}`}
      aria-label={`آية رقم ${numeral}`}
    >
      <svg
        viewBox="0 0 36 36"
        className={`w-full h-full absolute inset-0 transition-transform ${
          isActive ? 'scale-105' : 'hover:scale-102'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer subtle halo ring if active */}
        {isActive && (
          <circle
            cx="18"
            cy="18"
            r="16.5"
            stroke={isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.35)'}
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        )}

        {/* Outer delicate brass ring */}
        <circle
          cx="18"
          cy="18"
          r="15"
          stroke={goldColor}
          strokeWidth="1.25"
          strokeOpacity={isActive ? '1' : '0.75'}
        />

        {/* Delicate inner decorative ring with 8 micro ticks */}
        <circle
          cx="18"
          cy="18"
          r="12.2"
          stroke={goldColor}
          strokeWidth="0.6"
          strokeDasharray="1.5 2"
          strokeOpacity="0.6"
        />

        {/* 4 Cardinal points: subtle geometric pips */}
        <circle cx="18" cy="3" r="1.1" fill={goldColor} />
        <circle cx="18" cy="33" r="1.1" fill={goldColor} />
        <circle cx="3" cy="18" r="1.1" fill={goldColor} />
        <circle cx="33" cy="18" r="1.1" fill={goldColor} />
      </svg>

      <span
        className="font-nums font-semibold relative z-10 pt-0.5 tracking-tighter"
        style={{ color: isActive ? goldColor : textColor }}
      >
        {numeral}
      </span>
    </span>
  );
};
