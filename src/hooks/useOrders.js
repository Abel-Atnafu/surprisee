import { useEffect, useState, useCallback } from 'react';
import {
  collection, onSnapshot, addDoc, deleteDoc, doc,
  serverTimestamp, query, orderBy, limit,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ORDERS } from '../lib/collections';

export function useOrders({ max = 200 } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) { setLoading(false); return; }
    const q = query(collection(db, ORDERS), orderBy('createdAt', 'desc'), limit(max));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [max]);

  const add = useCallback(async (order) => {
    if (!db) throw new Error('Firebase not configured');
    return addDoc(collection(db, ORDERS), { ...order, createdAt: serverTimestamp() });
  }, []);

  const remove = useCallback(async (id) => {
    if (!db) throw new Error('Firebase not configured');
    return deleteDoc(doc(db, ORDERS, id));
  }, []);

  return { items, loading, add, remove };
}
