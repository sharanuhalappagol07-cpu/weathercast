import { useState, useEffect, useCallback } from 'react';
import { getMarineWeather } from '../services/weatherApi';
import type { MarineResponse, Unit } from '../types/weather';

interface UseMarineReturn {
  data: MarineResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMarine(
  lat: number | null,
  lon: number | null,
  units: Unit = 'm'
): UseMarineReturn {
  const [data, setData] = useState<MarineResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarine = useCallback(async () => {
    if (lat === null || lon === null) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getMarineWeather(lat, lon, units);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marine data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [lat, lon, units]);

  useEffect(() => {
    fetchMarine();
  }, [fetchMarine]);

  return {
    data,
    loading,
    error,
    refetch: fetchMarine,
  };
}
