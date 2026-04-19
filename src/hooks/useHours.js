import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { HOURS, DEFAULT_HOURS } from '../lib/collections';

// Stores hours as { mon: {open, close, closed}, tue: {...}, ... }
// keyed by the `day` PK (text).
export function useHours() {
  const [byDay, setByDay] = useState({});
  const [loading, setLoading] = useState(true);
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    if (!supabase) { setLoading(false); return; }

    const load = async () => {
      const { data, error } = await supabase.from(HOURS).select('*');
      if (!activeRef.current) return;
      if (error) { setLoading(false); return; }
      const map = {};
      for (const row of data ?? []) {
        map[row.day] = { open: row.open, close: row.close, closed: row.closed };
      }
      setByDay(map);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`realtime:${HOURS}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: HOURS }, load)
      .subscribe();

    return () => {
      activeRef.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const setDay = useCallback(async (day, data) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase
      .from(HOURS)
      .upsert({ day, ...DEFAULT_HOURS, ...data });
    if (error) throw error;
  }, []);

  return { byDay, loading, setDay };
}
