import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import type { MarineData, Unit } from '../../types/weather';
import { Waves, Navigation, Thermometer, Clock } from 'lucide-react';

interface MarineWeatherCardProps {
  marine: MarineData;
  units: Unit;
}

export function MarineWeatherCard({ marine, units }: MarineWeatherCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
          <Waves size={24} className="text-accent-cyan" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Marine Conditions</h3>
          <p className="text-sm text-white/50">Real-time ocean data</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white/[0.05] rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Waves size={16} className="text-accent-cyan" />
            <span className="text-sm text-white/60">Wave Height</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {marine.significant_wave_height}m
          </p>
        </div>

        <div className="p-4 bg-white/[0.05] rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Navigation size={16} className="text-accent-cyan" />
            <span className="text-sm text-white/60">Swell Direction</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {marine.swell_direction}
          </p>
        </div>

        <div className="p-4 bg-white/[0.05] rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Waves size={16} className="text-accent-cyan" />
            <span className="text-sm text-white/60">Swell Height</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {marine.swell_height}m
          </p>
        </div>

        <div className="p-4 bg-white/[0.05] rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-accent-cyan" />
            <span className="text-sm text-white/60">Swell Period</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {marine.swell_period}s
          </p>
        </div>

        <div className="col-span-2 p-4 bg-white/[0.05] rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer size={16} className="text-accent-cyan" />
            <span className="text-sm text-white/60">Water Temperature</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {marine.water_temperature}{units === 'f' ? '°F' : '°C'}
          </p>
        </div>
      </div>

      {marine.tide && (
        <div className="pt-4 border-t border-white/[0.1]">
          <h4 className="text-sm font-medium text-white/60 mb-4">Tide Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white/[0.05] rounded-xl">
              <p className="text-xs text-white/50 mb-1">High Tide</p>
              <p className="text-sm font-medium text-white">{marine.tide.high_tide_time}</p>
              <p className="text-xs text-accent-cyan">{marine.tide.high_tide_height}m</p>
            </div>
            <div className="p-3 bg-white/[0.05] rounded-xl">
              <p className="text-xs text-white/50 mb-1">Low Tide</p>
              <p className="text-sm font-medium text-white">{marine.tide.low_tide_time}</p>
              <p className="text-xs text-accent-cyan">{marine.tide.low_tide_height}m</p>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
