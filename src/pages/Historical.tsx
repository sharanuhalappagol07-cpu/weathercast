import React, { useState } from 'react';
import { HistoricalWeatherCard } from '../components/weather/HistoricalWeatherCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassInput } from '../components/ui/GlassInput';
import { GlassButton } from '../components/ui/GlassButton';
import type { HistoricalResponse, Unit } from '../types/weather';
import { getToday, getYesterday } from '../utils/dateUtils';

interface HistoricalPageProps {
  data: HistoricalResponse | null;
  loading: boolean;
  error: string | null;
  units: Unit;
  onDateChange: (date: string) => void;
}

export function Historical({ data, loading, error, units, onDateChange }: HistoricalPageProps) {
  const [selectedDate, setSelectedDate] = useState(getYesterday());

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDateChange(selectedDate);
  };

  const historicalDays = data?.historical ? Object.values(data.historical) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Historical Weather</h1>
          <p className="text-white/60">View past weather conditions</p>
        </div>
      </div>

      {/* Date Selector */}
      <GlassCard className="p-6">
        <form onSubmit={handleDateSubmit} className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              max={getYesterday()}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white/[0.05] backdrop-blur-[10px] 
                border border-white/[0.15] rounded-xl
                text-white px-4 py-3
                focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.08]
                transition-all duration-300"
            />
          </div>
          <GlassButton type="submit" className="w-full sm:w-auto">
            View Historical Data
          </GlassButton>
        </form>
      </GlassCard>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <GlassCard className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-rose-400">!</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Data</h3>
          <p className="text-white/60">{error}</p>
        </GlassCard>
      )}

      {/* Data Display */}
      {!loading && !error && data && historicalDays.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {data.location.name}, {data.location.country}
            </h2>
          </div>
          {historicalDays.map((day, index) => (
            <HistoricalWeatherCard key={index} historical={day} units={units} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !data && (
        <GlassCard className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white/60">?</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Data Selected</h3>
          <p className="text-white/60">Select a date to view historical weather data</p>
        </GlassCard>
      )}
    </div>
  );
}
