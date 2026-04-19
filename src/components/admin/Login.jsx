import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';
import { firebaseConfigured } from '../../lib/firebase';

export default function Login() {
  const { login } = useAuth();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = login(pw);
    if (!ok) {
      setErr(true);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl bg-cream-50 p-8 shadow-lift"
      >
        <div className="mb-6 flex items-center justify-between">
          <Logo />
          <span className="eyebrow">Admin</span>
        </div>

        <h1 className="font-display text-2xl font-bold text-charcoal-900">Sign in</h1>
        <p className="mt-1 text-sm text-charcoal-600">
          Enter the admin password to manage the menu.
        </p>

        {!firebaseConfigured && (
          <div className="mt-4 rounded-lg bg-tomato-500/10 p-3 text-xs text-tomato-600">
            Firebase isn&rsquo;t configured yet. Add <code>VITE_FIREBASE_*</code> env vars.
          </div>
        )}

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="label">Password</span>
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(false); }}
              className="input"
              placeholder="••••••••"
            />
          </label>
          {err && (
            <p className="text-xs text-tomato-500">Incorrect password. Try again.</p>
          )}
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </div>
      </form>
    </div>
  );
}
