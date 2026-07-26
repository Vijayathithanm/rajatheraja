import { Equalizer } from '@/components/ui/MusicNotes';

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 pt-[72px]">
      <Equalizer bars={7} className="h-8 scale-125" />
      <p className="text-xs font-semibold uppercase tracking-widest2 text-muted">Tuning up…</p>
    </div>
  );
}
