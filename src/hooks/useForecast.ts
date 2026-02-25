import { useState, useEffect, useCallback } from 'react';
import { getForecast } from '../services/weatherApi';
import type { ForecastResponse, Unit } from '../types/weather';

interface UseForecastReturn {
  data: ForecastResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useForecast(
  query: string,
  forecastDays: number = 7,
  units: Unit = 'm'
): UseForecastReturn {
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = useCallback(async () => {
    if (!query.trim()) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getForecast(query, forecastDays, units);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query, forecastDays, units]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  return {
    data,
    loading,
    error,
    refetch: fetchForecast,
  };
}
