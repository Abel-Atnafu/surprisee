import { firebaseConfigured } from '../../lib/firebase';

export default function ConfigNotice() {
  if (firebaseConfigured) return null;
  return (
    <div className="bg-tomato-500/10 border-y border-tomato-500/30 px-6 py-3 text-center text-sm text-tomato-600">
      <strong className="font-semibold">Firebase not configured.</strong>{' '}
      Add <code className="font-mono">VITE_FIREBASE_*</code> env vars to enable menu, hours & admin sync.
    </div>
  );
}
