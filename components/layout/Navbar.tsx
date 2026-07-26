'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Menu, X, ChevronDown, Music4 } from 'lucide-react';
import { nav } from '@/data/site';
import { cn } from '@/lib/utils';
import { useScrolled } from '@/lib/hooks';
import { GlobalSearch } from '@/components/search/GlobalSearch';

export function Navbar() {
  const scrolled = useScrolled(10);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (href: string) => {
    const base = href.split('?')[0];
    return base === '/' ? pathname === '/' : pathname.startsWith(base);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth',
          scrolled
            ? 'border-b border-line bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70'
            : 'bg-transparent',
        )}
      >
        <nav className="container-page flex h-[72px] items-center justify-between gap-4" aria-label="Primary">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Ilaiyaraaja, home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
              <Music4 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight text-ink">Ilaiyaraaja</span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest2 text-gold">Isaignani</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                    isActive(item.href) ? 'text-gold' : 'text-ink hover:text-gold',
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
                {item.children && (
                  <AnimatePresence>
                    {openMenu === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-56 overflow-hidden rounded-xl border border-line bg-paper p-1.5 shadow-lift"
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-hover hover:text-ink"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-hover hover:text-gold"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-hover lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-y-auto bg-paper p-6 shadow-lift"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-bold">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-faint hover:text-ink">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block rounded-lg px-3 py-3 text-base font-semibold transition-colors',
                        isActive(item.href) ? 'bg-hover text-gold' : 'text-ink hover:bg-hover',
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="ml-3 border-l border-line pl-3">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
