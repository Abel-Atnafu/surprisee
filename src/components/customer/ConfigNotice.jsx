import { supabaseConfigured } from '../../lib/supabase';

export default function ConfigNotice() {
  if (supabaseConfigured) return null;
  return (
    <div className="bg-tomato-500/10 border-y border-tomato-500/30 px-6 py-3 text-center text-sm text-tomato-600">
      <strong className="font-semibold">Supabase not configured.</strong>{' '}
      Add <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
      <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to enable menu, hours & admin sync.
    </div>
  );
}
