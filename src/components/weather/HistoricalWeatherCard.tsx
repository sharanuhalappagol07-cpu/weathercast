import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import type { HistoricalDay, Unit } from '../../types/weather';
import { getTemperatureUnit } from '../../utils/unitConverter';
import { formatDate } from '../../utils/dateUtils';
import { Droplets, Wind, Sun, Moon } from 'lucide-react';

interface HistoricalWeatherCardProps {
  historical: HistoricalDay;
  units: Unit;
}

export function HistoricalWeatherCard({ historical, units }: HistoricalWeatherCardProps) {
  return (
    <GlassCard className="p-6">
      {/* Date Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.1]">
        <div>
          <h3 className="text-xl font-bold text-white">
            {formatDate(historical.date, 'EEEE, MMMM dd')}
          </h3>
          <p className="text-sm text-white/50">Historical Weather Data</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-amber-400" />
            <span className="text-sm text-white/60">{historical.astro?.sunrise}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Moon size={16} className="text-accent-violet" />
            <span className="text-sm text-white/60">{historical.astro?.sunset}</span>
          </div>
        </div>
      </div>

      {/* Temperature Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-white/[0.05] rounded-xl">
          <p className="text-sm text-white/50 mb-1">Min Temp</p>
          <p className="text-2xl font-bold text-accent-cyan">
            {Math.round(historical.mintemp)}{getTemperatureUnit(units)}
          </p>
        </div>
        <div className="text-center p-4 bg-white/[0.05] rounded-xl">
          <p className="text-sm text-white/50 mb-1">Avg Temp</p>
          <p className="text-2xl font-bold text-white">
            {Math.round(historical.avgtemp)}{getTemperatureUnit(units)}
          </p>
        </div>
        <div className="text-center p-4 bg-white/[0.05] rounded-xl">
          <p className="text-sm text-white/50 mb-1">Max Temp</p>
          <p className="text-2xl font-bold text-rose-400">
            {Math.round(historical.maxtemp)}{getTemperatureUnit(units)}
          </p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 bg-white/[0.05] rounded-xl">
          <Sun size={18} className="text-amber-400" />
          <div>
            <p className="text-xs text-white/50">Sun Hours</p>
            <p className="text-sm font-medium text-white">{historical.sunhour}h</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/[0.05] rounded-xl">
          <Droplets size={18} className="text-accent-cyan" />
          <div>
            <p className="text-xs text-white/50">Total Snow</p>
            <p className="text-sm font-medium text-white">{historical.totalsnow}mm</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/[0.05] rounded-xl">
          <Wind size={18} className="text-accent-cyan" />
          <div>
            <p className="text-xs text-white/50">Moon Phase</p>
            <p className="text-sm font-medium text-white">{historical.astro?.moon_phase}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/[0.05] rounded-xl">
          <Sun size={18} className="text-amber-400" />
          <div>
            <p className="text-xs text-white/50">UV Index</p>
            <p className="text-sm font-medium text-white">{historical.uv_index}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
