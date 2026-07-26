'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Award } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  city: string;
  reason: string;
}

export function CertificateForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', city: '', reason: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.city.trim()) e.city = 'Please enter your city.';
    if (form.reason.trim().length < 12) e.reason = 'Tell us a little more (min. 12 characters).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-3xl border border-line bg-paper p-10 text-center shadow-soft"
      >
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-display text-2xl font-bold text-ink">Application received</h3>
        <p className="mt-3 text-muted">
          Thank you, {form.name.split(' ')[0]}. Your appreciation certificate request has been submitted. In a
          live deployment you would receive it by email at <span className="text-ink">{form.email}</span>.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', email: '', city: '', reason: '' });
          }}
          className="btn-outline mt-7"
        >
          Submit another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-lg rounded-3xl border border-line bg-paper p-8 shadow-soft sm:p-10">
      <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
        <Award className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <Field label="Full name" error={errors.name}>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className="field"
          placeholder="Your name"
          aria-invalid={!!errors.name}
        />
      </Field>
      <Field label="Email address" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          className="field"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
        />
      </Field>
      <Field label="City" error={errors.city}>
        <input
          value={form.city}
          onChange={(e) => set('city', e.target.value)}
          className="field"
          placeholder="Your city"
          aria-invalid={!!errors.city}
        />
      </Field>
      <Field label="Why this means something to you" error={errors.reason}>
        <textarea
          value={form.reason}
          onChange={(e) => set('reason', e.target.value)}
          rows={4}
          className="field resize-none"
          placeholder="Share a memory or reason…"
          aria-invalid={!!errors.reason}
        />
      </Field>
      <button type="submit" className="btn-gold mt-2 w-full">
        Apply for certificate
      </button>

      <style jsx>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #ececec;
          background: #fff;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .field:focus {
          border-color: #c8a542;
        }
      `}</style>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="mb-5 block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
