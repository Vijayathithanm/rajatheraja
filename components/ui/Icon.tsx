import { icons, type LucideProps } from 'lucide-react';

/**
 * Renders a Lucide icon by name so data files can reference icons as strings.
 * Falls back to a music note if the name is unknown.
 */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[name] ?? icons.Music2;
  return <Cmp {...props} />;
}
