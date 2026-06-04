/**
 * components/shared/SectionHeader.tsx
 * Reusable section header component with optional eyebrow label,
 * title, subtitle, and decorative accent underline.
 */
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleClassName?: string;
  className?: string;
  subTextColor?: string;
  textColor?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  titleClassName,
  className,
  subTextColor = 'text-neutral-500 dark:text-neutral-300',
  textColor = 'text-primary-900 dark:text-white'
}: SectionHeaderProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  return (
    <div className={cn('flex flex-col gap-3 mb-12', alignClass, className)}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-widest text-safety-gold">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          `text-3xl md:text-4xl font-bold ${textColor} leading-tight`,
          titleClassName
        )}
      >
        {title}
      </h2>
      {/* Decorative accent underline */}
      <div
        className={cn(
          'h-1 w-16 rounded-full bg-gradient-to-r from-safety-gold to-safety-orange',
          align === 'center' && 'mx-auto',
          align === 'right' && 'ml-auto'
        )}
        aria-hidden="true"
      />
      {subtitle && (
        <p className={` ${subTextColor} text-base md:text-lg max-w-2xl leading-relaxed mt-1`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
