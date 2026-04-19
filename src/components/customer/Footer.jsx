import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

export default function Footer({ phone, address }) {
  const telHref = phone ? `tel:+${String(phone).replace(/[^\d]/g, '')}` : null;
  return (
    <footer className="bg-charcoal-950 text-cream-200/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 md:grid-cols-3 lg:px-16">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Hand-crafted burgers, done properly. Made fresh, served hot.
          </p>
        </div>
        <div>
          <p className="eyebrow text-amber-400">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            {telHref && (
              <li>
                <a href={telHref} className="transition hover:text-cream-50">
                  +{String(phone).replace(/[^\d]/g, '')}
                </a>
              </li>
            )}
            {address && (
              <li className="whitespace-pre-line">{address}</li>
            )}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-amber-400">Follow</p>
          <ul className="mt-4 flex gap-4 text-sm">
            <li><a href="#" className="transition hover:text-cream-50">Instagram</a></li>
            <li><a href="#" className="transition hover:text-cream-50">TikTok</a></li>
            <li><a href="#" className="transition hover:text-cream-50">Telegram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-50/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:px-10 lg:px-16">
          <p>&copy; {new Date().getFullYear()} SAR Burger. All rights reserved.</p>
          <Link to="/admin" className="transition hover:text-cream-50">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
