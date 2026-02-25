import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import type { LocationSearchResult } from '../../types/weather';

interface LocationSearchProps {
  onSelect: (location: LocationSearchResult) => void;
  placeholder?: string;
}

export function LocationSearch({ onSelect, placeholder = 'Search for a city...' }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, loading } = useLocationSearch(query);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: LocationSearchResult) => {
    onSelect(location);
    setQuery(location.name);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-white/[0.05] backdrop-blur-[10px] 
            border border-white/[0.15] rounded-xl
            text-white placeholder-white/50
            focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.08]
            transition-all duration-300
            pl-12 pr-4 py-3"
        />
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 
          bg-navy-800/95 backdrop-blur-[20px] 
          border border-white/[0.15] rounded-xl
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          max-h-64 overflow-y-auto z-50">
          {results.length === 0 ? (
            <div className="p-4 text-center text-white/50">
              {loading ? 'Searching...' : 'No locations found'}
            </div>
          ) : (
            <ul className="py-2">
              {results.map((location, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelect(location)}
                    className="w-full px-4 py-3 flex items-center gap-3
                      hover:bg-white/[0.08] transition-colors
                      text-left"
                  >
                    <MapPin size={16} className="text-accent-cyan flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">{location.name}</p>
                      <p className="text-sm text-white/50 truncate">
                        {location.region}{location.region ? ', ' : ''}{location.country}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
