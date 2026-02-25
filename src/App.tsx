import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { CurrentWeather } from './pages/CurrentWeather';
import { Forecast } from './pages/Forecast';
import { Historical } from './pages/Historical';
import { Marine } from './pages/Marine';
import { useWeather } from './hooks/useWeather';
import { useForecast } from './hooks/useForecast';
import { useHistorical } from './hooks/useHistorical';
import { useMarine } from './hooks/useMarine';
import type { Unit } from './types/weather';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('New York');
  const [units, setUnits] = useState<Unit>('m');
  const [forecastDays, setForecastDays] = useState(7);
  const [historicalDate, setHistoricalDate] = useState('');
  const [marineCoords, setMarineCoords] = useState<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null,
  });

  // Fetch current weather
  const {
    data: weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather(searchQuery, units);

  // Fetch forecast
  const {
    data: forecastData,
    loading: forecastLoading,
    error: forecastError,
  } = useForecast(searchQuery, forecastDays, units);

  // Fetch historical
  const {
    data: historicalData,
    loading: historicalLoading,
    error: historicalError,
  } = useHistorical(searchQuery, historicalDate, units);

  // Fetch marine
  const {
    data: marineData,
    loading: marineLoading,
    error: marineError,
  } = useMarine(marineCoords.lat, marineCoords.lon, units);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleForecastDaysChange = (days: number) => {
    setForecastDays(days);
  };

  const handleHistoricalDateChange = (date: string) => {
    setHistoricalDate(date);
  };

  const handleMarineCoordinatesChange = (lat: number, lon: number) => {
    setMarineCoords({ lat, lon });
  };

  return (
    <BrowserRouter>
      <DashboardLayout searchQuery={searchQuery} onSearchChange={handleSearchChange}>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                weatherData={weatherData}
                loading={weatherLoading}
                units={units}
              />
            }
          />
          <Route
            path="/current"
            element={
              <CurrentWeather
                data={weatherData}
                loading={weatherLoading}
                error={weatherError}
                units={units}
              />
            }
          />
          <Route
            path="/forecast"
            element={
              <Forecast
                data={forecastData}
                loading={forecastLoading}
                error={forecastError}
                units={units}
                onDaysChange={handleForecastDaysChange}
              />
            }
          />
          <Route
            path="/historical"
            element={
              <Historical
                data={historicalData}
                loading={historicalLoading}
                error={historicalError}
                units={units}
                onDateChange={handleHistoricalDateChange}
              />
            }
          />
          <Route
            path="/marine"
            element={
              <Marine
                data={marineData}
                loading={marineLoading}
                error={marineError}
                units={units}
                onCoordinatesChange={handleMarineCoordinatesChange}
              />
            }
          />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
