import { PageHeader } from './PageHeader';
import { Section } from './Section';

export function LegalPage({
  title,
  eyebrow,
  sections,
}: {
  title: string;
  eyebrow: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} icon="FileText" title={title} />
      <Section>
        <div className="mx-auto max-w-3xl">
          {sections.map((s) => (
            <div key={s.heading} className="mb-10 last:mb-0">
              <h2 className="font-display text-xl font-bold text-ink">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="mt-12 border-t border-line pt-6 text-sm text-faint">
            This is a tribute portfolio built for demonstration using publicly available information.
            It is not an official commercial website of the artist.
          </p>
        </div>
      </Section>
    </>
  );
}
