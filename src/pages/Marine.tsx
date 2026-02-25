import React, { useState } from 'react';
import { MarineWeatherCard } from '../components/weather/MarineWeatherCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import type { MarineResponse, Unit } from '../types/weather';
import { MapPin, Navigation } from 'lucide-react';

interface MarinePageProps {
  data: MarineResponse | null;
  loading: boolean;
  error: string | null;
  units: Unit;
  onCoordinatesChange: (lat: number, lon: number) => void;
}

export function Marine({ data, loading, error, units, onCoordinatesChange }: MarinePageProps) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lon)) {
      onCoordinatesChange(lat, lon);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Marine Weather</h1>
          <p className="text-white/60">Ocean conditions and marine forecasts</p>
        </div>
      </div>

      {/* Coordinates Input */}
      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Latitude
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  <MapPin size={18} />
                </div>
                <input
                  type="number"
                  step="any"
                  min="-90"
                  max="90"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="e.g., 40.7128"
                  className="w-full bg-white/[0.05] backdrop-blur-[10px] 
                    border border-white/[0.15] rounded-xl
                    text-white placeholder-white/50
                    focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.08]
                    transition-all duration-300
                    pl-12 pr-4 py-3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Longitude
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  <Navigation size={18} />
                </div>
                <input
                  type="number"
                  step="any"
                  min="-180"
                  max="180"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="e.g., -74.0060"
                  className="w-full bg-white/[0.05] backdrop-blur-[10px] 
                    border border-white/[0.15] rounded-xl
                    text-white placeholder-white/50
                    focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.08]
                    transition-all duration-300
                    pl-12 pr-4 py-3"
                />
              </div>
            </div>
          </div>
          <GlassButton type="submit" className="w-full sm:w-auto">
            Get Marine Data
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
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Marine Data</h3>
          <p className="text-white/60">{error}</p>
        </GlassCard>
      )}

      {/* Data Display */}
      {!loading && !error && data && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {data.location.name}
            </h2>
            <p className="text-sm text-white/50">
              Lat: {data.location.lat}, Lon: {data.location.lon}
            </p>
          </div>
          <MarineWeatherCard marine={data.marine} units={units} />
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !data && (
        <GlassCard className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white/60">?</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Coordinates Entered</h3>
          <p className="text-white/60">Enter latitude and longitude to view marine weather data</p>
          <p className="text-sm text-white/40 mt-2">
            Example: New York (40.7128, -74.0060)
          </p>
        </GlassCard>
      )}
    </div>
  );
}
