import { useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SETTINGS, DEFAULT_SETTINGS } from '../lib/collections';

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!db) { setLoading(false); return; }
    const ref = doc(db, SETTINGS, 'global');
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...snap.data() });
        setExists(true);
      } else {
        setSettings(DEFAULT_SETTINGS);
        setExists(false);
      }
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, []);

  const update = useCallback(async (patch) => {
    if (!db) throw new Error('Firebase not configured');
    return setDoc(
      doc(db, SETTINGS, 'global'),
      { ...patch, updatedAt: serverTimestamp() },
      { merge: true }
    );
  }, []);

  return { settings, loading, exists, update };
}
