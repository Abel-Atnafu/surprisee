import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';
import MenuTab from './tabs/MenuTab';
import CombosTab from './tabs/CombosTab';
import HoursTab from './tabs/HoursTab';
import OrdersTab from './tabs/OrdersTab';
import SettingsTab from './tabs/SettingsTab';

const TABS = [
  { id: 'menu', label: 'Menu', Component: MenuTab },
  { id: 'combos', label: 'Combos', Component: CombosTab },
  { id: 'hours', label: 'Hours', Component: HoursTab },
  { id: 'orders', label: 'Orders', Component: OrdersTab },
  { id: 'settings', label: 'Settings', Component: SettingsTab },
];

export default function AdminPanel() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('menu');
  const Current = TABS.find((t) => t.id === tab)?.Component ?? MenuTab;

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="sticky top-0 z-30 border-b border-charcoal-900/10 bg-cream-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden text-xs font-semibold uppercase tracking-wider2 text-amber-600 sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-900">
              View site
            </Link>
            <button onClick={logout} className="btn-secondary py-2 text-xs">Sign out</button>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl overflow-x-auto px-6 sm:px-10">
          <ul className="flex min-w-max gap-2 pb-2 pt-1">
            {TABS.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === t.id
                      ? 'bg-charcoal-900 text-cream-50'
                      : 'text-charcoal-600 hover:bg-charcoal-900/5'
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <Current />
      </main>
    </div>
  );
}
