import React from 'react';
import { ThemeMode } from '../../types';

interface OctagonBadgeProps {
  size?: number;
  theme?: ThemeMode;
  level?: number;
  unlocked?: boolean;
  title?: string;
  className?: string;
  tier?: 'brass' | 'silver' | 'gold' | 'celestial';
}

export const OctagonBadge: React.FC<OctagonBadgeProps> = ({
  size = 64,
  theme = 'dark',
  level = 1,
  unlocked = true,
  title = '',
  className = '',
  tier = 'gold',
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  // Tier color definitions:
  const goldPrimary = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';
  const goldAccent = isDark ? '#F5DEB3' : isSepia ? '#FDE68A' : '#B8860B';
  const skyAccent = isDark ? '#38BDF8' : '#0284C7';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title={title}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`goldGrad-${tier}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={goldAccent} stopOpacity={unlocked ? 0.95 : 0.3} />
            <stop offset="50%" stopColor={goldPrimary} stopOpacity={unlocked ? 0.8 : 0.25} />
            <stop offset="100%" stopColor={goldPrimary} stopOpacity={unlocked ? 1 : 0.2} />
          </linearGradient>

          <radialGradient id={`glowGrad-${tier}-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={tier === 'celestial' ? skyAccent : goldPrimary} stopOpacity={unlocked ? 0.18 : 0.02} />
            <stop offset="100%" stopColor={tier === 'celestial' ? skyAccent : goldPrimary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial glow background */}
        <circle cx="50" cy="50" r="46" fill={`url(#glowGrad-${tier}-${size})`} />

        {/* Outer Square 1 */}
        <rect
          x="14"
          y="14"
          width="72"
          height="72"
          rx="6"
          stroke={`url(#goldGrad-${tier}-${size})`}
          strokeWidth="1.75"
          fill={isDark ? 'rgba(20, 28, 44, 0.45)' : 'rgba(255, 255, 255, 0.65)'}
        />

        {/* Rotated Square 2 (at 45deg to create pristine 8-point geometric star/octagon) */}
        <rect
          x="14"
          y="14"
          width="72"
          height="72"
          rx="6"
          transform="rotate(45 50 50)"
          stroke={`url(#goldGrad-${tier}-${size})`}
          strokeWidth="1.75"
          fill={isDark ? 'rgba(20, 28, 44, 0.25)' : 'rgba(255, 255, 255, 0.35)'}
        />

        {/* Inner concentric geometric circle */}
        <circle
          cx="50"
          cy="50"
          r="26"
          stroke={goldPrimary}
          strokeWidth="1"
          strokeDasharray="2 3"
          strokeOpacity={unlocked ? '0.7' : '0.2'}
        />

        {/* Center micro core or Level marker */}
        {unlocked && (
          <circle
            cx="50"
            cy="50"
            r="16"
            fill={isDark ? 'rgba(11, 15, 23, 0.85)' : 'rgba(246, 244, 238, 0.95)'}
            stroke={goldPrimary}
            strokeWidth="1"
          />
        )}
      </svg>

      {/* Center Label (e.g., Level or Icon) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="font-nums font-bold text-xs pt-0.5"
          style={{ color: unlocked ? goldPrimary : (isDark ? '#475569' : '#94A3B8') }}
        >
          {level}
        </span>
      </div>
    </div>
  );
};
