import { supabase } from './supabase';
import {
  SETTINGS, HOURS, WEEKDAYS, DEFAULT_SETTINGS, DEFAULT_HOURS,
} from './collections';
import { toSnake } from './mapper';

// Idempotent: only inserts the settings row + 7 hours rows if missing.
// The supabase/schema.sql already handles this server-side; this button
// is a safety net for projects whose schema was applied without seeds.
export async function seedDefaults() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_* env vars.');
  }

  const { data: existingSettings, error: e1 } = await supabase
    .from(SETTINGS)
    .select('id')
    .eq('id', 'global')
    .maybeSingle();
  if (e1) throw e1;

  if (!existingSettings) {
    const { error } = await supabase
      .from(SETTINGS)
      .insert({ id: 'global', ...toSnake(DEFAULT_SETTINGS) });
    if (error) throw error;
  }

  for (const day of WEEKDAYS) {
    const { data: existing, error } = await supabase
      .from(HOURS)
      .select('day')
      .eq('day', day)
      .maybeSingle();
    if (error) throw error;
    if (!existing) {
      const { error: insertErr } = await supabase
        .from(HOURS)
        .insert({ day, ...DEFAULT_HOURS });
      if (insertErr) throw insertErr;
    }
  }
}
