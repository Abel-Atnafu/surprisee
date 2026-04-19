export function formatBirr(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return 'ETB —';
  return `ETB ${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export function parseBirr(str) {
  if (typeof str === 'number') return str;
  const cleaned = String(str ?? '').replace(/[^\d.]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}
