import { useState, useEffect } from 'react';
import { searchLocations } from '../services/weatherApi';
import { useDebounce } from './useDebounce';
import type { LocationSearchResult } from '../types/weather';

interface UseLocationSearchReturn {
  results: LocationSearchResult[];
  loading: boolean;
  error: string | null;
}

export function useLocationSearch(query: string): UseLocationSearchReturn {
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
        setResults([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchLocations(debouncedQuery);
        setResults(response.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search locations');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [debouncedQuery]);

  return {
    results,
    loading,
    error,
  };
}
