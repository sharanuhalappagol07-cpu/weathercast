import React, { useState } from 'react';
import { ForecastCard } from '../components/weather/ForecastCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import type { ForecastResponse, Unit } from '../types/weather';

interface ForecastPageProps {
  data: ForecastResponse | null;
  loading: boolean;
  error: string | null;
  units: Unit;
  onDaysChange: (days: number) => void;
}

export function Forecast({ data, loading, error, units, onDaysChange }: ForecastPageProps) {
  const [selectedDays, setSelectedDays] = useState(7);

  const handleDaysChange = (days: number) => {
    setSelectedDays(days);
    onDaysChange(days);
  };

  const forecastDays = data?.forecast ? Object.values(data.forecast) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard className="p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-rose-400">!</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Error Loading Forecast</h3>
        <p className="text-white/60">{error}</p>
      </GlassCard>
    );
  }

  if (!data) {
    return (
      <GlassCard className="p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white/60">?</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Forecast Data</h3>
        <p className="text-white/60">Search for a location to see weather forecast</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Weather Forecast</h1>
          <p className="text-white/60">
            {data.location.name}, {data.location.country}
          </p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-white/[0.05] rounded-xl border border-white/[0.1]">
          {[3, 7, 14].map((days) => (
            <button
              key={days}
              onClick={() => handleDaysChange(days)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-300
                ${selectedDays === days
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-teal text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
                }
              `}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecastDays.map((day, index) => (
          <ForecastCard key={index} forecast={day} units={units} />
        ))}
      </div>
    </div>
  );
}
