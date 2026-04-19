import { useMemo } from 'react';
import { useMenu } from '../../hooks/useMenu';
import MenuItemCard from './MenuItemCard';

export default function Menu() {
  const { items, loading } = useMenu();

  const grouped = useMemo(() => {
    const map = new Map();
    for (const it of items) {
      const cat = (it.category || 'Menu').trim();
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(it);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || (a.name ?? '').localeCompare(b.name ?? ''));
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <section id="menu" className="section bg-cream-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-start gap-3">
          <span className="eyebrow">The menu</span>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything on the board.
          </h2>
          <p className="max-w-2xl text-charcoal-600">
            Prices in Ethiopian Birr. Ask about today&rsquo;s specials when you order.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-cream-100" />
            ))}
          </div>
        ) : grouped.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-charcoal-900/15 bg-white p-12 text-center">
            <p className="font-display text-2xl font-semibold text-charcoal-900">
              Menu coming soon.
            </p>
            <p className="mt-2 text-charcoal-600">
              We&rsquo;re finalizing the board. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
            {grouped.map(([category, list]) => (
              <div key={category}>
                <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider2 text-amber-600">
                  {category}
                </h3>
                <div className="border-t border-charcoal-900/20">
                  {list.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
