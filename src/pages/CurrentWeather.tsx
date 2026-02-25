import React from 'react';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GlassCard } from '../components/ui/GlassCard';
import type { CurrentWeatherResponse, Unit } from '../types/weather';

interface CurrentWeatherPageProps {
  data: CurrentWeatherResponse | null;
  loading: boolean;
  error: string | null;
  units: Unit;
}

export function CurrentWeather({ data, loading, error, units }: CurrentWeatherPageProps) {
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
        <h3 className="text-xl font-semibold text-white mb-2">Error Loading Weather</h3>
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
        <h3 className="text-xl font-semibold text-white mb-2">No Weather Data</h3>
        <p className="text-white/60">Search for a location to see current weather</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Current Weather</h1>
          <p className="text-white/60">Real-time weather conditions</p>
        </div>
      </div>

      <CurrentWeatherCard data={data} units={units} />
    </div>
  );
}
