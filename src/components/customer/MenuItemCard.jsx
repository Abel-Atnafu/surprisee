import { formatBirr } from '../../utils/money';

export default function MenuItemCard({ item }) {
  const unavailable = item.available === false;
  return (
    <article
      className={`group flex items-start justify-between gap-6 border-b border-charcoal-900/10 py-6 first:pt-0 last:border-b-0 ${
        unavailable ? 'opacity-60' : ''
      }`}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-bold text-charcoal-900">
            {item.name}
          </h3>
          {unavailable && (
            <span className="rounded-full bg-tomato-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider2 text-tomato-500">
              Unavailable
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">
            {item.description}
          </p>
        )}
      </div>
      <div className="shrink-0 pt-1 font-display text-lg font-semibold text-charcoal-900">
        {formatBirr(item.price)}
      </div>
    </article>
  );
}
