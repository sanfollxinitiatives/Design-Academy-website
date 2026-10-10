import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  className?: string;
  height?: number | string;
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export default function Logo({
  className = 'h-10 w-auto',
  height,
  variant = 'light',
}: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="Design Academy by Sanfollx"
      className={`object-contain select-none ${className} ${
        variant === 'dark' ? 'brightness-0 invert' : ''
      }`}
      style={height ? { height } : undefined}
      loading="eager"
    />
  );
}
