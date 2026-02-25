import type { Unit } from '../types/weather';

export function getTemperatureUnit(unit: Unit): string {
  switch (unit) {
    case 'm':
      return '°C';
    case 's':
      return 'K';
    case 'f':
      return '°F';
    default:
      return '°C';
  }
}

export function getSpeedUnit(unit: Unit): string {
  switch (unit) {
    case 'm':
      return 'km/h';
    case 's':
      return 'km/h';
    case 'f':
      return 'mph';
    default:
      return 'km/h';
  }
}

export function getPressureUnit(unit: Unit): string {
  return 'mb';
}

export function getDistanceUnit(unit: Unit): string {
  switch (unit) {
    case 'm':
      return 'km';
    case 's':
      return 'km';
    case 'f':
      return 'miles';
    default:
      return 'km';
  }
}

export function getPrecipitationUnit(unit: Unit): string {
  return 'mm';
}

export function formatValue(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}
