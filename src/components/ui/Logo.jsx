export default function Logo({ dark = false }) {
  const main = dark ? 'text-cream-50' : 'text-charcoal-900';
  const accent = 'text-amber-500';
  return (
    <div className="flex items-baseline gap-1.5 select-none">
      <span className={`font-display font-black text-2xl leading-none ${main}`}>
        SAR
      </span>
      <span className={`font-sans text-[10px] font-bold uppercase tracking-wider2 ${accent}`}>
        Burger
      </span>
    </div>
  );
}
