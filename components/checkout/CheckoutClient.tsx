'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Check, Lock, ArrowLeft } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { useCart } from '@/lib/hooks';
import { setQty, removeFromCart, clearCart, shippingFor } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

interface Form {
  name: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
}
const EMPTY: Form = { name: '', email: '', address: '', city: '', pincode: '', phone: '' };

interface Placed {
  orderId: string;
  total: number;
  currency: string;
  email: string;
}

export function CheckoutClient() {
  const { items, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [placed, setPlaced] = useState<Placed | null>(null);

  useEffect(() => setMounted(true), []);

  const currency = items[0]?.currency ?? '₹';
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!/^\d{4,8}$/.test(form.pincode.trim())) e.pincode = 'Enter a valid PIN/ZIP';
    if (!/^[\d+\-\s]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const orderId = `IR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setPlaced({ orderId, total, currency, email: form.email });
    clearCart();
    setForm(EMPTY);
  };

  /* ---------- Order confirmation ---------- */
  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl rounded-3xl border border-line bg-paper p-10 text-center shadow-soft"
      >
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="font-display text-2xl font-bold text-ink">Thank you for your order</h2>
        <p className="mt-3 text-muted">
          Your order <span className="font-semibold text-ink">{placed.orderId}</span> has been placed. A
          confirmation would be sent to <span className="text-ink">{placed.email}</span>.
        </p>
        <p className="mt-1 text-muted">
          Total paid: <span className="font-semibold text-ink">{formatPrice(placed.total, placed.currency)}</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-primary">
            Continue shopping
          </Link>
          <Link href="/" className="btn-outline">
            Back to home
          </Link>
        </div>
        <p className="mt-8 text-xs text-faint">
          This is a demonstration checkout — no payment was processed and no goods will be shipped.
        </p>
      </motion.div>
    );
  }

  /* ---------- Loading / empty ---------- */
  if (!mounted) {
    return <div className="mx-auto h-64 max-w-2xl animate-pulse rounded-3xl bg-hover" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-line bg-paper p-10 text-center shadow-soft">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-line text-faint">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <h2 className="font-display text-xl font-bold text-ink">Your bag is empty</h2>
        <p className="mt-2 text-muted">Explore the collection and add a keepsake or two.</p>
        <Link href="/shop" className="btn-gold mt-6">
          Browse the shop
        </Link>
      </div>
    );
  }

  /* ---------- Cart + checkout ---------- */
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
      {/* Line items */}
      <div>
        <Link href="/shop" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-gold">
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>
        <ul className="divide-y divide-line rounded-2xl border border-line">
          {items.map((it) => (
            <li key={it.id} className="flex items-center gap-4 p-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-hover">
                <Media src={it.image} alt={it.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold text-ink">{it.name}</p>
                <p className="mt-0.5 text-sm text-muted">{formatPrice(it.price, it.currency)}</p>
                <div className="mt-2 inline-flex items-center rounded-full border border-line">
                  <button
                    onClick={() => setQty(it.id, it.qty - 1)}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-ink"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
                  <button
                    onClick={() => setQty(it.id, it.qty + 1)}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-ink"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-display text-sm font-bold text-ink">
                  {formatPrice(it.price * it.qty, it.currency)}
                </span>
                <button
                  onClick={() => removeFromCart(it.id)}
                  aria-label={`Remove ${it.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-faint transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary + form */}
      <form onSubmit={placeOrder} noValidate className="h-fit rounded-3xl border border-line bg-paper p-6 shadow-soft lg:sticky lg:top-24 sm:p-8">
        <h2 className="font-display text-xl font-bold text-ink">Order summary</h2>
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between text-muted">
            <dt>Subtotal</dt>
            <dd className="font-medium text-ink">{formatPrice(subtotal, currency)}</dd>
          </div>
          <div className="flex justify-between text-muted">
            <dt>Shipping</dt>
            <dd className="font-medium text-ink">{shipping === 0 ? 'Free' : formatPrice(shipping, currency)}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-line pt-3 text-base font-bold text-ink">
            <dt>Total</dt>
            <dd>{formatPrice(total, currency)}</dd>
          </div>
        </dl>

        <div className="my-6 hairline" />

        <h3 className="mb-4 font-display text-base font-bold text-ink">Shipping details</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name" error={errors.name} className="sm:col-span-2">
            <input className="field" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
          </Field>
          <Field label="Email" error={errors.email} className="sm:col-span-2">
            <input className="field" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
          </Field>
          <Field label="Address" error={errors.address} className="sm:col-span-2">
            <input className="field" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Street address" />
          </Field>
          <Field label="City" error={errors.city}>
            <input className="field" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="City" />
          </Field>
          <Field label="PIN / ZIP" error={errors.pincode}>
            <input className="field" value={form.pincode} onChange={(e) => set('pincode', e.target.value)} placeholder="600024" />
          </Field>
          <Field label="Phone" error={errors.phone} className="sm:col-span-2">
            <input className="field" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 …" />
          </Field>
        </div>

        <button type="submit" className="btn-gold mt-6 w-full">
          <Lock className="h-4 w-4" /> Place order · {formatPrice(total, currency)}
        </button>
        <p className="mt-3 text-center text-xs text-faint">
          Demonstration checkout — no payment is processed.
        </p>

        <style jsx>{`
          .field {
            width: 100%;
            border-radius: 0.75rem;
            border: 1px solid #ececec;
            background: #fff;
            padding: 0.6rem 0.85rem;
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.2s;
          }
          .field:focus {
            border-color: #c8a542;
          }
        `}</style>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest2 text-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
