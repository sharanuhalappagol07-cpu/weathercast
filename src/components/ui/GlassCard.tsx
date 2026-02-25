import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', hover = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white/[0.08] backdrop-blur-[20px] 
        border border-white/[0.15] rounded-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${hover ? 'hover:bg-white/[0.12] hover:border-white/[0.2] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]' : ''}
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
