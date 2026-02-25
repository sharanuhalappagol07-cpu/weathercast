import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch {
    return dateString;
  }
}

export function formatTime(timeString: string, formatStr: string = 'h:mm a'): string {
  try {
    const date = new Date(`2000-01-01T${timeString}`);
    return format(date, formatStr);
  } catch {
    return timeString;
  }
}

export function getToday(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getYesterday(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return format(yesterday, 'yyyy-MM-dd');
}

export function getLastWeek(): string {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  return format(lastWeek, 'yyyy-MM-dd');
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
