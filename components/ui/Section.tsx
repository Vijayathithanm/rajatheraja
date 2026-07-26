import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';
import { Icon } from './Icon';

export function Section({
  id,
  children,
  className,
  tone = 'paper',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'paper' | 'hover';
}) {
  return (
    <section
      id={id}
      className={cn('py-20 sm:py-24 lg:py-28', tone === 'hover' && 'bg-hover', className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  align?: 'center' | 'left';
}) {
  return (
    <Reveal className={cn('mb-14', align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl')}>
      {eyebrow && (
        <span className={cn('eyebrow', align === 'center' && 'justify-center')}>
          {icon && <Icon name={icon} className="h-4 w-4" strokeWidth={1.75} />}
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
