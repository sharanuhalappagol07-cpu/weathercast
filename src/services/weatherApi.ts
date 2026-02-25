import axios from 'axios';
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  HistoricalResponse,
  MarineResponse,
  LocationSearchResponse,
  Unit,
  ApiError,
} from '../types/weather';

const API_KEY = 'b4b428a399195473316e0c705108df3a';
const BASE_URL = 'https://api.weatherstack.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

function isApiError(response: unknown): response is ApiError {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    response.success === false &&
    'error' in response
  );
}

export async function getCurrentWeather(
  query: string,
  units: Unit = 'm'
): Promise<CurrentWeatherResponse> {
  const response = await apiClient.get<CurrentWeatherResponse | ApiError>('/current', {
    params: {
      access_key: API_KEY,
      query,
      units,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function getForecast(
  query: string,
  forecastDays: number = 7,
  units: Unit = 'm'
): Promise<ForecastResponse> {
  const response = await apiClient.get<ForecastResponse | ApiError>('/forecast', {
    params: {
      access_key: API_KEY,
      query,
      forecast_days: forecastDays,
      units,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function getHistoricalWeather(
  query: string,
  historicalDate: string,
  units: Unit = 'm'
): Promise<HistoricalResponse> {
  const response = await apiClient.get<HistoricalResponse | ApiError>('/historical', {
    params: {
      access_key: API_KEY,
      query,
      historical_date: historicalDate,
      units,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function getMarineWeather(
  lat: number,
  lon: number,
  units: Unit = 'm'
): Promise<MarineResponse> {
  const response = await apiClient.get<MarineResponse | ApiError>('/marine', {
    params: {
      access_key: API_KEY,
      query: `${lat},${lon}`,
      units,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function searchLocations(query: string): Promise<LocationSearchResponse> {
  const response = await apiClient.get<LocationSearchResponse | ApiError>('/autocomplete', {
    params: {
      access_key: API_KEY,
      query,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}
