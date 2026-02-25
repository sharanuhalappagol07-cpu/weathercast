import React from 'react';
import { Droplets, Wind, Eye, Gauge, Sun, Thermometer } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import type { CurrentWeatherResponse, Unit } from '../../types/weather';
import { getTemperatureUnit, getSpeedUnit, getDistanceUnit, getPressureUnit } from '../../utils/unitConverter';

interface CurrentWeatherCardProps {
  data: CurrentWeatherResponse;
  units: Unit;
}

export function CurrentWeatherCard({ data, units }: CurrentWeatherCardProps) {
  const { location, current } = data;

  const weatherDetails = [
    {
      icon: <Droplets size={18} className="text-accent-cyan" />,
      label: 'Humidity',
      value: `${current.humidity}%`,
    },
    {
      icon: <Wind size={18} className="text-accent-cyan" />,
      label: 'Wind',
      value: `${current.wind_speed} ${getSpeedUnit(units)}`,
    },
    {
      icon: <Eye size={18} className="text-accent-cyan" />,
      label: 'Visibility',
      value: `${current.visibility} ${getDistanceUnit(units)}`,
    },
    {
      icon: <Gauge size={18} className="text-accent-cyan" />,
      label: 'Pressure',
      value: `${current.pressure} ${getPressureUnit(units)}`,
    },
    {
      icon: <Sun size={18} className="text-accent-cyan" />,
      label: 'UV Index',
      value: current.uv_index.toString(),
    },
    {
      icon: <Thermometer size={18} className="text-accent-cyan" />,
      label: 'Feels Like',
      value: `${current.feelslike}${getTemperatureUnit(units)}`,
    },
  ];

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{location.name}</h2>
          <p className="text-white/60">{location.region}, {location.country}</p>
          <p className="text-sm text-white/40 mt-1">{location.localtime}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/50">{current.observation_time}</p>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {current.weather_icons?.[0] && (
            <img
              src={current.weather_icons[0]}
              alt={current.weather_descriptions?.[0] || 'Weather'}
              className="w-20 h-20 object-contain"
            />
          )}
          <div>
            <div className="text-6xl font-bold text-white">
              {current.temperature}
              <span className="text-3xl text-white/60">{getTemperatureUnit(units)}</span>
            </div>
            <p className="text-lg text-white/80 capitalize">
              {current.weather_descriptions?.[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {weatherDetails.map((detail, index) => (
          <div
            key={index}
            className="bg-white/[0.05] rounded-xl p-4 border border-white/[0.1]"
          >
            <div className="flex items-center gap-2 mb-2">
              {detail.icon}
              <span className="text-sm text-white/60">{detail.label}</span>
            </div>
            <p className="text-xl font-semibold text-white">{detail.value}</p>
          </div>
        ))}
      </div>

      {/* Air Quality */}
      {current.air_quality && (
        <div className="mt-6 pt-6 border-t border-white/[0.1]">
          <h3 className="text-sm font-medium text-white/60 mb-4">Air Quality</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xs text-white/50 mb-1">PM2.5</p>
              <p className="text-lg font-semibold text-white">{current.air_quality.pm2_5}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/50 mb-1">PM10</p>
              <p className="text-lg font-semibold text-white">{current.air_quality.pm10}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/50 mb-1">O3</p>
              <p className="text-lg font-semibold text-white">{current.air_quality.o3}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/50 mb-1">NO2</p>
              <p className="text-lg font-semibold text-white">{current.air_quality.no2}</p>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
