import { useState, useEffect, useCallback } from 'react';
import { getCurrentWeather } from '../services/weatherApi';
import type { CurrentWeatherResponse, Unit } from '../types/weather';

interface UseWeatherReturn {
  data: CurrentWeatherResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWeather(query: string, units: Unit = 'm'): UseWeatherReturn {
  const [data, setData] = useState<CurrentWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    if (!query.trim()) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getCurrentWeather(query, units);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query, units]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    data,
    loading,
    error,
    refetch: fetchWeather,
  };
}
