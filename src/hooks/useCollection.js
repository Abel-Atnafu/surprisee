import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { toCamel, toSnake } from '../lib/mapper';

// Generic realtime hook for a Supabase table with an `id` PK.
// Refetches the full list on any postgres_changes event — simple and
// correct for low-traffic tables (menu, combos).
export function useCollection(table) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    if (!supabase) { setLoading(false); return; }

    const load = async () => {
      const { data, error: err } = await supabase.from(table).select('*');
      if (!activeRef.current) return;
      if (err) { setError(err); setLoading(false); return; }
      setItems((data ?? []).map(toCamel));
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`realtime:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, load)
      .subscribe();

    return () => {
      activeRef.current = false;
      supabase.removeChannel(channel);
    };
  }, [table]);

  const add = useCallback(async (data) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error: err } = await supabase.from(table).insert(toSnake(data));
    if (err) throw err;
  }, [table]);

  const update = useCallback(async (id, patch) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error: err } = await supabase
      .from(table)
      .update(toSnake(patch))
      .eq('id', id);
    if (err) throw err;
  }, [table]);

  const remove = useCallback(async (id) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error: err } = await supabase.from(table).delete().eq('id', id);
    if (err) throw err;
  }, [table]);

  return { items, loading, error, add, update, remove };
}
