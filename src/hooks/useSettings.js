import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { SETTINGS, DEFAULT_SETTINGS } from '../lib/collections';
import { toCamel, toSnake } from '../lib/mapper';

// Singleton row (id = 'global'). Subscribes to realtime changes filtered
// to that one row.
export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    if (!supabase) { setLoading(false); return; }

    const load = async () => {
      const { data, error } = await supabase
        .from(SETTINGS)
        .select('*')
        .eq('id', 'global')
        .maybeSingle();
      if (!activeRef.current) return;
      if (error) { setLoading(false); return; }
      if (data) {
        setSettings({ ...DEFAULT_SETTINGS, ...toCamel(data) });
        setExists(true);
      } else {
        setSettings(DEFAULT_SETTINGS);
        setExists(false);
      }
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`realtime:${SETTINGS}:global`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: SETTINGS, filter: 'id=eq.global' },
        load
      )
      .subscribe();

    return () => {
      activeRef.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const update = useCallback(async (patch) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase
      .from(SETTINGS)
      .upsert({ id: 'global', ...toSnake(patch), updated_at: new Date().toISOString() });
    if (error) throw error;
  }, []);

  return { settings, loading, exists, update };
}
