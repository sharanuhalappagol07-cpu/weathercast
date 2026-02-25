import React from 'react';
import { Cloud, CalendarDays, History, Waves, MapPin, Thermometer, Wind, Droplets } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import type { CurrentWeatherResponse, Unit } from '../types/weather';
import { getTemperatureUnit } from '../utils/unitConverter';

interface DashboardProps {
  weatherData: CurrentWeatherResponse | null;
  loading: boolean;
  units: Unit;
}

export function Dashboard({ weatherData, loading, units }: DashboardProps) {
  const features = [
    {
      icon: <Cloud size={24} />,
      title: 'Current Weather',
      description: 'Real-time weather conditions',
      path: '/current',
      color: 'from-accent-cyan to-accent-teal',
    },
    {
      icon: <CalendarDays size={24} />,
      title: 'Forecast',
      description: 'Up to 14-day weather forecast',
      path: '/forecast',
      color: 'from-accent-violet to-accent-cyan',
    },
    {
      icon: <History size={24} />,
      title: 'Historical',
      description: 'Past weather data analysis',
      path: '/historical',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: <Waves size={24} />,
      title: 'Marine',
      description: 'Ocean and marine conditions',
      path: '/marine',
      color: 'from-blue-400 to-cyan-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to <span className="text-gradient">WeatherCast Pro</span>
        </h1>
        <p className="text-white/60">
          Your professional weather intelligence platform
        </p>
      </div>

      {/* Current Weather Summary */}
      {weatherData && (
        <GlassCard className="p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-teal flex items-center justify-center">
                <MapPin size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{weatherData.location.name}</h2>
                <p className="text-white/60">{weatherData.location.region}, {weatherData.location.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <Thermometer size={20} className="text-accent-cyan" />
                  <span className="text-3xl font-bold text-white">
                    {weatherData.current.temperature}{getTemperatureUnit(units)}
                  </span>
                </div>
                <p className="text-sm text-white/50">Temperature</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <Wind size={20} className="text-accent-cyan" />
                  <span className="text-3xl font-bold text-white">
                    {weatherData.current.wind_speed}
                  </span>
                </div>
                <p className="text-sm text-white/50">Wind (km/h)</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <Droplets size={20} className="text-accent-cyan" />
                  <span className="text-3xl font-bold text-white">
                    {weatherData.current.humidity}%
                  </span>
                </div>
                <p className="text-sm text-white/50">Humidity</p>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <GlassCard
            key={index}
            hover
            className="p-6 cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-white">{feature.icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-white/60">{feature.description}</p>
          </GlassCard>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Cloud size={24} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Global</p>
              <p className="text-sm text-white/60">Weather Coverage</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <History size={24} className="text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Historical</p>
              <p className="text-sm text-white/60">Data Access</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-violet/20 flex items-center justify-center">
              <Waves size={24} className="text-accent-violet" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Marine</p>
              <p className="text-sm text-white/60">Ocean Data</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
