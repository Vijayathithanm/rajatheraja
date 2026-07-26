'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, RotateCcw, Pencil, X } from 'lucide-react';
import { readCollection, writeCollection, resetCollection } from '@/lib/cms';
import { cn } from '@/lib/utils';

export interface FieldDef {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
}

export interface CollectionConfig {
  key: string;
  singular: string;
  seed: Record<string, unknown>[];
  fields: FieldDef[];
  /** Which field to show as the row title. */
  titleField: string;
}

function blankRecord(fields: FieldDef[]): Record<string, unknown> {
  const r: Record<string, unknown> = { id: `x${Date.now().toString(36)}` };
  fields.forEach((f) => (r[f.name] = f.type === 'number' ? 0 : ''));
  return r;
}

export function CollectionManager({ config }: { config: CollectionConfig }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItems(readCollection(config.key, config.seed));
  }, [config.key, config.seed]);

  const persist = (next: Record<string, unknown>[]) => {
    setItems(next);
    writeCollection(config.key, next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const startNew = () => {
    setEditing(blankRecord(config.fields));
    setIsNew(true);
  };
  const startEdit = (item: Record<string, unknown>) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    const next = isNew
      ? [editing, ...items]
      : items.map((it) => (it.id === editing.id ? editing : it));
    persist(next);
    setEditing(null);
  };

  const remove = (id: unknown) => persist(items.filter((it) => it.id !== id));

  const reset = () => {
    resetCollection(config.key);
    setItems(config.seed);
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Manage {config.singular}</h2>
          <p className="text-sm text-muted">
            {items.length} item{items.length === 1 ? '' : 's'}
            {saved && <span className="ml-2 text-gold">· saved ✓</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="btn-outline !px-4 !py-2 text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button onClick={startNew} className="btn-primary !px-4 !py-2 text-xs">
            <Plus className="h-3.5 w-3.5" /> Add {config.singular}
          </button>
        </div>
      </div>

      {/* Editor */}
      {editing && (
        <div className="mb-6 rounded-2xl border border-gold/40 bg-hover p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-ink">{isNew ? `New ${config.singular}` : `Edit ${config.singular}`}</h3>
            <button onClick={() => setEditing(null)} aria-label="Cancel" className="text-faint hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {config.fields.map((f) => (
              <label key={f.name} className={cn('block', f.type === 'textarea' && 'sm:col-span-2')}>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest2 text-muted">{f.label}</span>
                {f.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={String(editing[f.name] ?? '')}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full resize-none rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-gold"
                  />
                ) : f.type === 'select' ? (
                  <select
                    value={String(editing[f.name] ?? '')}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-gold"
                  >
                    <option value="">Select…</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type === 'number' ? 'number' : 'text'}
                    value={String(editing[f.name] ?? '')}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        [f.name]: f.type === 'number' ? Number(e.target.value) : e.target.value,
                      })
                    }
                    placeholder={f.placeholder}
                    className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-gold"
                  />
                )}
              </label>
            ))}
          </div>
          <button onClick={save} className="btn-gold mt-5 !px-5 !py-2.5 text-sm">
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      )}

      {/* List */}
      <ul className="divide-y divide-line rounded-2xl border border-line">
        {items.map((it) => (
          <li key={String(it.id)} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <span className="min-w-0 truncate text-sm font-medium text-ink">
              {String(it[config.titleField] ?? it.id)}
            </span>
            <div className="flex shrink-0 gap-1">
              <button
                onClick={() => startEdit(it)}
                aria-label="Edit"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-hover hover:text-gold"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => remove(it.id)}
                aria-label="Delete"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="px-5 py-8 text-center text-sm text-muted">No items yet.</li>}
      </ul>
    </div>
  );
}
