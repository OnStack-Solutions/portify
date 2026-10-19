'use client';

import { useEffect, useId, useState } from 'react';
import { Close, Menu } from './icons';

/** Desktop: renders the nav inline. Mobile: a toggle that opens the same links as a sheet. */
export function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <Close /> : <Menu />}
      </button>
      <nav
        id={id}
        className="nav"
        aria-label="Primary"
        data-open={open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setOpen(false);
        }}
      >
        {children}
      </nav>
    </>
  );
}
