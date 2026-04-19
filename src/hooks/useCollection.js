import { useEffect, useState, useCallback } from 'react';
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Generic realtime collection hook.
export function useCollection(path, { orderField = null } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const base = collection(db, path);
    const q = orderField ? query(base, orderBy(orderField)) : base;
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return unsub;
  }, [path, orderField]);

  const add = useCallback(async (data) => {
    if (!db) throw new Error('Firebase not configured');
    return addDoc(collection(db, path), { ...data, createdAt: serverTimestamp() });
  }, [path]);

  const update = useCallback(async (id, patch) => {
    if (!db) throw new Error('Firebase not configured');
    return updateDoc(doc(db, path, id), patch);
  }, [path]);

  const remove = useCallback(async (id) => {
    if (!db) throw new Error('Firebase not configured');
    return deleteDoc(doc(db, path, id));
  }, [path]);

  return { items, loading, error, add, update, remove };
}
