import { useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { HOURS, WEEKDAYS, DEFAULT_HOURS } from '../lib/collections';

export function useHours() {
  const [byDay, setByDay] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) { setLoading(false); return; }
    const unsubs = WEEKDAYS.map((day) =>
      onSnapshot(doc(db, HOURS, day), (snap) => {
        setByDay((prev) => ({
          ...prev,
          [day]: snap.exists() ? snap.data() : null,
        }));
        setLoading(false);
      })
    );
    return () => unsubs.forEach((u) => u());
  }, []);

  const setDay = useCallback(async (day, data) => {
    if (!db) throw new Error('Firebase not configured');
    return setDoc(doc(db, HOURS, day), { ...DEFAULT_HOURS, ...data }, { merge: true });
  }, []);

  return { byDay, loading, setDay };
}
