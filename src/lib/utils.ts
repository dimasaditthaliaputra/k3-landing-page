import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() — Utility for merging Tailwind CSS classes conditionally.
 * Combines clsx (conditional classes) + tailwind-merge (dedup Tailwind conflicts).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary-700', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * formatNumber — Format angka dengan locale id-ID
 * @example formatNumber(50000000) → '50.000.000'
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('id-ID');
}

/**
 * formatDate — Format tanggal dengan locale id-ID
 * @example formatDate(new Date()) → '4 Juni 2026'
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * slugify — Convert string to URL-friendly slug
 * @example slugify('Tanggap Darurat') → 'tanggap-darurat'
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * truncate — Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength).trim()}…`;
}
