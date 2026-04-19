import { useEffect, useState } from 'react';
import Logo from '../ui/Logo';
import WhatsAppButton from './WhatsAppButton';

const LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#combos', label: 'Combos' },
  { href: '#hours', label: 'Hours' },
  { href: '#visit', label: 'Visit' },
];

export default function Nav({ phone }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? 'bg-cream-50/90 backdrop-blur border-b border-charcoal-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#top" className="flex items-center">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-charcoal-700 transition hover:text-charcoal-900"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <WhatsAppButton phone={phone} message="Hi SAR Burger, I'd like to place an order." />
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-charcoal-900/15 p-2 text-charcoal-900 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-charcoal-900/10 bg-cream-50 md:hidden">
          <div className="flex flex-col px-6 py-4 gap-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-charcoal-900"
              >
                {l.label}
              </a>
            ))}
            <WhatsAppButton phone={phone} />
          </div>
        </div>
      )}
    </header>
  );
}
