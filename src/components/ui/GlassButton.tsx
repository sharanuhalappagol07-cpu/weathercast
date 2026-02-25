import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function GlassButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  icon,
}: GlassButtonProps) {
  const baseStyles = `
    font-medium px-6 py-3 rounded-xl
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-accent-cyan to-accent-teal
      text-white
      hover:shadow-lg hover:shadow-accent-cyan/25
      active:scale-[0.98]
    `,
    secondary: `
      bg-white/[0.08] backdrop-blur-[10px] 
      border border-white/[0.15]
      text-white
      hover:bg-white/[0.12] hover:border-white/[0.25]
      active:scale-[0.98]
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
