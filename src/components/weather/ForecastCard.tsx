import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import type { ForecastDay, Unit } from '../../types/weather';
import { getTemperatureUnit } from '../../utils/unitConverter';
import { formatDate } from '../../utils/dateUtils';
import { Droplets, Wind, Sun } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastDay;
  units: Unit;
}

export function ForecastCard({ forecast, units }: ForecastCardProps) {
  return (
    <GlassCard className="p-4 hover:bg-white/[0.12] transition-all duration-300">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-white/60">
          {formatDate(forecast.date, 'EEE')}
        </p>
        <p className="text-xs text-white/40">
          {formatDate(forecast.date, 'MMM dd')}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 mb-4">
        {forecast.hourly?.[12]?.weather_icons?.[0] && (
          <img
            src={forecast.hourly[12].weather_icons[0]}
            alt={forecast.hourly[12].weather_descriptions?.[0] || 'Weather'}
            className="w-12 h-12 object-contain"
          />
        )}
        <p className="text-xs text-white/60 text-center capitalize line-clamp-1">
          {forecast.hourly?.[12]?.weather_descriptions?.[0]}
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <span className="text-lg font-bold text-white">
          {Math.round(forecast.maxtemp)}{getTemperatureUnit(units)}
        </span>
        <span className="text-lg font-medium text-white/50">
          {Math.round(forecast.mintemp)}{getTemperatureUnit(units)}
        </span>
      </div>

      <div className="space-y-2 pt-3 border-t border-white/[0.1]">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-white/50">
            <Droplets size={12} />
            <span>Rain</span>
          </div>
          <span className="text-white/80">{forecast.hourly?.[12]?.chanceofrain || 0}%</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-white/50">
            <Wind size={12} />
            <span>Wind</span>
          </div>
          <span className="text-white/80">{forecast.hourly?.[12]?.wind_speed || 0}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-white/50">
            <Sun size={12} />
            <span>UV</span>
          </div>
          <span className="text-white/80">{forecast.uv_index}</span>
        </div>
      </div>
    </GlassCard>
  );
}
