import React from 'react';

interface LogoProps {
  className?: string;
  height?: number | string;
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export default function Logo({
  className = 'h-10 w-auto',
  height,
  showSubtitle = true,
  variant = 'light',
}: LogoProps) {
  const textColor = variant === 'dark' ? '#ffffff' : '#2b2a33';
  const subTextColor = variant === 'dark' ? 'rgba(255, 255, 255, 0.75)' : '#413f4c';

  return (
    <div className={`inline-flex items-center select-none ${className}`} style={height ? { height } : undefined}>
      <svg
        viewBox="0 0 680 185"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-full"
      >
        <defs>
          {/* Left vertical block gradient: Indigo/Purple -> Cyan/Teal */}
          <linearGradient id="leftPillarGradient" x1="0" y1="0" x2="0" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4313b1" />
            <stop offset="25%" stopColor="#5321ab" />
            <stop offset="55%" stopColor="#2563bf" />
            <stop offset="80%" stopColor="#029da0" />
            <stop offset="100%" stopColor="#00bca0" />
          </linearGradient>

          {/* Right triangle gradient: Magenta -> Coral Orange -> Amber Yellow */}
          <linearGradient id="rightTriangleGradient" x1="165" y1="0" x2="215" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e81363" />
            <stop offset="35%" stopColor="#ea1f59" />
            <stop offset="70%" stopColor="#f36a21" />
            <stop offset="100%" stopColor="#fbbd19" />
          </linearGradient>
        </defs>

        {/* --- GEOMETRIC EMBLEM (LEFT) --- */}
        <g id="logo-icon">
          {/* Left Vertical Pillar with rounded left corners */}
          <path
            d="M 12 0 H 124 V 180 H 12 C 5.37 180 0 174.63 0 168 V 12 C 0 5.37 5.37 0 12 0 Z"
            fill="url(#leftPillarGradient)"
          />

          {/* Right Vibrant Triangle */}
          <path
            d="M 166 0 L 246 180 H 64 Z"
            fill="url(#rightTriangleGradient)"
          />
        </g>

        {/* --- TYPOGRAPHY (RIGHT) --- */}
        {/* DESIGN (Line 1) */}
        <text
          x="262"
          y="72"
          fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="800"
          fontSize="76"
          letterSpacing="0.03em"
          fill={textColor}
        >
          DESIGN
        </text>

        {/* ACADEMY. (Line 2) */}
        <g id="academy-row" transform="translate(262, 86)">
          {/* First A (Stylized Inverted Chevron) */}
          <path
            d="M 2 57 L 25 3 L 48 57"
            stroke={textColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="miter"
            fill="none"
          />

          {/* C */}
          <text
            x="58"
            y="55"
            fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="800"
            fontSize="70"
            letterSpacing="0.01em"
            fill={textColor}
          >
            C
          </text>

          {/* Second A (Stylized Inverted Chevron) */}
          <path
            d="M 121 57 L 144 3 L 167 57"
            stroke={textColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="miter"
            fill="none"
          />

          {/* DEMY */}
          <text
            x="178"
            y="55"
            fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="800"
            fontSize="70"
            letterSpacing="0.01em"
            fill={textColor}
          >
            DEMY
          </text>

          {/* Full Stop . */}
          <circle cx="418" cy="46" r="11" fill={textColor} />
        </g>

        {/* Subtitle: AN INITIATIVE BY SANFOLLX (Line 3) */}
        {showSubtitle && (
          <g id="initiative-by-sanfollx" transform="translate(265, 172)">
            <text
              x="0"
              y="0"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontWeight="500"
              fontSize="19"
              letterSpacing="0.32em"
              fill={subTextColor}
            >
              AN INITIATIVE BY
            </text>

            {/* SANFOLLX with stylized chevron A */}
            <g transform="translate(254, -18)">
              {/* S */}
              <text
                x="0"
                y="18"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontWeight="700"
                fontSize="19.5"
                letterSpacing="0.22em"
                fill={textColor}
              >
                S
              </text>

              {/* Chevron A */}
              <path
                d="M 21 18 L 27.5 4 L 34 18"
                stroke={textColor}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="miter"
                fill="none"
              />

              {/* NFOLLX */}
              <text
                x="40"
                y="18"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontWeight="700"
                fontSize="19.5"
                letterSpacing="0.22em"
                fill={textColor}
              >
                NFOLLX
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

