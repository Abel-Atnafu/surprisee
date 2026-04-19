import { useEffect, useState } from 'react';
import { useHours } from '../../../hooks/useHours';
import { WEEKDAYS, DEFAULT_HOURS } from '../../../lib/collections';
import { weekdayLabel } from '../../../utils/time';

export default function HoursTab() {
  const { byDay, loading, setDay } = useHours();
  const [local, setLocal] = useState({});
  const [savingDay, setSavingDay] = useState(null);

  useEffect(() => {
    // Seed local form state from remote values
    const next = {};
    for (const d of WEEKDAYS) {
      next[d] = { ...DEFAULT_HOURS, ...(byDay[d] || {}) };
    }
    setLocal(next);
  }, [byDay]);

  const save = async (day) => {
    setSavingDay(day);
    try {
      await setDay(day, local[day]);
    } finally {
      setSavingDay(null);
    }
  };

  return (
    <section>
      <h2 className="mb-1 font-display text-xl font-bold">Opening hours</h2>
      <p className="mb-6 text-sm text-charcoal-600">
        Times shown to customers in Addis Ababa timezone. Edit each day and click save.
      </p>

      {loading && Object.keys(local).length === 0 ? (
        <p className="text-sm text-charcoal-500">Loading…</p>
      ) : (
        <ul className="divide-y divide-charcoal-900/10 rounded-xl bg-white shadow-card">
          {WEEKDAYS.map((d) => {
            const row = local[d] || DEFAULT_HOURS;
            return (
              <li key={d} className="flex flex-wrap items-center gap-4 p-4">
                <span className="w-28 font-semibold">{weekdayLabel(d)}</span>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!row.closed}
                    onChange={(e) => setLocal((L) => ({ ...L, [d]: { ...L[d], closed: !e.target.checked } }))}
                    className="h-4 w-4 rounded border-charcoal-900/30 text-amber-500 focus:ring-amber-500"
                  />
                  Open
                </label>

                <input
                  type="time"
                  disabled={row.closed}
                  value={row.open || ''}
                  onChange={(e) => setLocal((L) => ({ ...L, [d]: { ...L[d], open: e.target.value } }))}
                  className="input w-[120px]"
                />
                <span className="text-charcoal-500">–</span>
                <input
                  type="time"
                  disabled={row.closed}
                  value={row.close || ''}
                  onChange={(e) => setLocal((L) => ({ ...L, [d]: { ...L[d], close: e.target.value } }))}
                  className="input w-[120px]"
                />

                <button
                  onClick={() => save(d)}
                  disabled={savingDay === d}
                  className="btn-primary ml-auto py-2 text-xs"
                >
                  {savingDay === d ? 'Saving\u2026' : 'Save'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
