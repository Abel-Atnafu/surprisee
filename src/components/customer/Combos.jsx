import { useCombos } from '../../hooks/useCombos';
import { formatBirr } from '../../utils/money';

export default function Combos() {
  const { items, loading } = useCombos();
  const featured = items.filter((c) => c.featured !== false);

  return (
    <section id="combos" className="section section-dark">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-start gap-3">
          <span className="eyebrow">Combo deals</span>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-cream-50">
            Built to share. Or not.
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-charcoal-800" />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="rounded-2xl border border-cream-50/10 bg-charcoal-800 p-12 text-center text-cream-200/70">
            New combos land soon.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <article
                key={c.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cream-50/10 bg-charcoal-800 p-8 transition hover:-translate-y-1 hover:border-amber-500/50"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl transition group-hover:bg-amber-500/20" />
                <div>
                  <h3 className="font-display text-2xl font-bold text-cream-50">
                    {c.name}
                  </h3>
                  {c.description && (
                    <p className="mt-3 text-sm leading-relaxed text-cream-200/70">
                      {c.description}
                    </p>
                  )}
                  {Array.isArray(c.itemsIncluded) && c.itemsIncluded.length > 0 && (
                    <ul className="mt-5 space-y-1.5 text-sm text-cream-200/85">
                      {c.itemsIncluded.map((line, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-8 flex items-baseline justify-between border-t border-cream-50/10 pt-5">
                  <span className="eyebrow text-amber-400">Combo</span>
                  <span className="font-display text-2xl font-bold text-amber-500">
                    {formatBirr(c.price)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
