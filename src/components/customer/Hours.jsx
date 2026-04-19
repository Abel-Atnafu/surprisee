import { useHours } from '../../hooks/useHours';
import { formatRange, weekdayLabel, weekdayOrder, isOpenNow, addisWeekdayKey } from '../../utils/time';

export default function Hours() {
  const { byDay, loading } = useHours();
  const open = isOpenNow(byDay);
  const todayKey = addisWeekdayKey();

  return (
    <section id="hours" className="section bg-cream-100">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="eyebrow">Opening hours</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            When we&rsquo;re flipping.
          </h2>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal-900/10 bg-white px-4 py-2 text-sm">
            <span
              className={`h-2.5 w-2.5 rounded-full ${open ? 'bg-emerald-500' : 'bg-tomato-500'} ${open ? 'shadow-[0_0_0_4px_rgba(16,185,129,0.18)]' : ''}`}
            />
            <span className="font-semibold">
              {loading ? 'Checking\u2026' : open ? 'Open now' : 'Closed right now'}
            </span>
            <span className="text-charcoal-500">· Addis Ababa time</span>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <ul className="divide-y divide-charcoal-900/10">
            {weekdayOrder.map((key) => {
              const day = byDay[key];
              const isToday = key === todayKey;
              return (
                <li
                  key={key}
                  className={`flex items-center justify-between py-3 text-sm ${
                    isToday ? 'font-semibold text-charcoal-900' : 'text-charcoal-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {weekdayLabel(key)}
                    {isToday && (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider2 text-amber-700">
                        Today
                      </span>
                    )}
                  </span>
                  <span className={day?.closed ? 'text-charcoal-500' : ''}>
                    {formatRange(day)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
