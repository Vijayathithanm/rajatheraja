/**
 * cart.ts — a small client-side shopping cart persisted to localStorage and
 * shared across pages (Shop grid, navbar indicator, Checkout) via a
 * `cart:update` event. There is no payment backend — checkout is a
 * demonstration flow (see components/checkout/CheckoutClient.tsx).
 */
import type { Product } from '@/lib/types';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  qty: number;
}

const KEY = 'ilaiyaraaja.cart';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function getCart(): CartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart:update'));
}

export function addToCart(product: Pick<Product, 'id' | 'name' | 'price' | 'currency' | 'image'>, qty = 1) {
  const items = getCart();
  const existing = items.find((i) => i.id === product.id);
  if (existing) existing.qty += qty;
  else
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image,
      qty,
    });
  write(items);
}

export function setQty(id: string, qty: number) {
  let items = getCart();
  if (qty <= 0) items = items.filter((i) => i.id !== id);
  else items = items.map((i) => (i.id === id ? { ...i, qty } : i));
  write(items);
}

export function removeFromCart(id: string) {
  write(getCart().filter((i) => i.id !== id));
}

export function clearCart() {
  write([]);
}

export function cartCount(items = getCart()) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartSubtotal(items = getCart()) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

/** Flat demo shipping: free over ₹1000, otherwise ₹99. */
export function shippingFor(subtotal: number) {
  if (subtotal === 0) return 0;
  return subtotal >= 1000 ? 0 : 99;
}
