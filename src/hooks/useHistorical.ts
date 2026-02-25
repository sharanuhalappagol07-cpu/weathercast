import { useState, useEffect, useCallback } from 'react';
import { getHistoricalWeather } from '../services/weatherApi';
import type { HistoricalResponse, Unit } from '../types/weather';

interface UseHistoricalReturn {
  data: HistoricalResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useHistorical(
  query: string,
  date: string,
  units: Unit = 'm'
): UseHistoricalReturn {
  const [data, setData] = useState<HistoricalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistorical = useCallback(async () => {
    if (!query.trim() || !date) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getHistoricalWeather(query, date, units);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query, date, units]);

  useEffect(() => {
    fetchHistorical();
  }, [fetchHistorical]);

  return {
    data,
    loading,
    error,
    refetch: fetchHistorical,
  };
}
