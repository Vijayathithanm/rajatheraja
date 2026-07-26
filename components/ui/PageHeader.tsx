import { Reveal } from './Reveal';
import { Icon } from './Icon';
import { MusicNotes } from './MusicNotes';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  icon,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-[72px]">
      <MusicNotes count={8} />
      <div className="container-page relative py-16 text-center sm:py-20">
        <Reveal>
          <span className="eyebrow justify-center">
            {icon && <Icon name={icon} className="h-4 w-4" strokeWidth={1.75} />}
            {eyebrow}
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
