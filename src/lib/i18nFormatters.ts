import { format, Locale } from 'date-fns';
import { es, fr, pt, de, it, nl } from 'date-fns/locale';

const locales: Record<string, Locale> = { es, fr, pt, de, it, nl };

const localeMap: Record<string, string> = {
  es: 'es-ES',
  fr: 'fr-FR',
  pt: 'pt-PT',
  de: 'de-DE',
  it: 'it-IT',
  nl: 'nl-NL'
};

/**
 * Format a date according to the specified language locale
 */
export const formatDate = (
  date: Date | string | number,
  formatStr: string,
  lang: string
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return format(dateObj, formatStr, { 
    locale: locales[lang] || locales.es 
  });
};

/**
 * Format a number as currency (EUR) according to the specified language locale
 */
export const formatCurrency = (
  amount: number,
  lang: string,
  currency: string = 'EUR'
): string => {
  return new Intl.NumberFormat(localeMap[lang] || 'es-ES', {
    style: 'currency',
    currency
  }).format(amount);
};

/**
 * Format a number according to the specified language locale
 */
export const formatNumber = (
  num: number,
  lang: string,
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(
    localeMap[lang] || 'es-ES',
    options
  ).format(num);
};

/**
 * Format a percentage according to the specified language locale
 */
export const formatPercent = (
  value: number,
  lang: string,
  decimals: number = 1
): string => {
  return new Intl.NumberFormat(localeMap[lang] || 'es-ES', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
};

/**
 * Format a compact number (e.g., 1.2K, 3.4M) according to the specified language locale
 */
export const formatCompactNumber = (
  num: number,
  lang: string
): string => {
  return new Intl.NumberFormat(localeMap[lang] || 'es-ES', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
};

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 */
export const formatRelativeTime = (
  date: Date | string | number,
  lang: string
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(localeMap[lang] || 'es-ES', {
    numeric: 'auto'
  });

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(-diffInHours, 'hour');
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (Math.abs(diffInDays) < 30) {
    return rtf.format(-diffInDays, 'day');
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(-diffInMonths, 'month');
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(-diffInYears, 'year');
};
