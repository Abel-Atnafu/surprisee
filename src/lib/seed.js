import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { SETTINGS, HOURS, WEEKDAYS, DEFAULT_SETTINGS, DEFAULT_HOURS } from './collections';

export async function seedDefaults() {
  if (!db) throw new Error('Firebase is not configured. Add VITE_FIREBASE_* env vars.');

  const settingsRef = doc(db, SETTINGS, 'global');
  const snap = await getDoc(settingsRef);
  if (!snap.exists()) {
    await setDoc(settingsRef, { ...DEFAULT_SETTINGS, updatedAt: serverTimestamp() });
  }

  for (const day of WEEKDAYS) {
    const ref = doc(db, HOURS, day);
    const s = await getDoc(ref);
    if (!s.exists()) {
      await setDoc(ref, { ...DEFAULT_HOURS });
    }
  }
}
