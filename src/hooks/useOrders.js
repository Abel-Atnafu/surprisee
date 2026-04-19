import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { ORDERS } from '../lib/collections';
import { toCamel, toSnake } from '../lib/mapper';

export function useOrders({ max = 200 } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    if (!supabase) { setLoading(false); return; }

    const load = async () => {
      const { data, error } = await supabase
        .from(ORDERS)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(max);
      if (!activeRef.current) return;
      if (error) { setLoading(false); return; }
      setItems((data ?? []).map(toCamel));
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`realtime:${ORDERS}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: ORDERS }, load)
      .subscribe();

    return () => {
      activeRef.current = false;
      supabase.removeChannel(channel);
    };
  }, [max]);

  const add = useCallback(async (order) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from(ORDERS).insert(toSnake(order));
    if (error) throw error;
  }, []);

  const remove = useCallback(async (id) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from(ORDERS).delete().eq('id', id);
    if (error) throw error;
  }, []);

  return { items, loading, add, remove };
}
