import React from 'react';
import type { Unit } from '../../types/weather';

interface UnitToggleProps {
  value: Unit;
  onChange: (unit: Unit) => void;
}

export function UnitToggle({ value, onChange }: UnitToggleProps) {
  const units: { value: Unit; label: string }[] = [
    { value: 'm', label: 'Metric' },
    { value: 's', label: 'Scientific' },
    { value: 'f', label: 'Fahrenheit' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-white/[0.05] rounded-xl border border-white/[0.1]">
      {units.map((unit) => (
        <button
          key={unit.value}
          onClick={() => onChange(unit.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium
            transition-all duration-300
            ${value === unit.value
              ? 'bg-gradient-to-r from-accent-cyan to-accent-teal text-white'
              : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
            }
          `}
        >
          {unit.label}
        </button>
      ))}
    </div>
  );
}
