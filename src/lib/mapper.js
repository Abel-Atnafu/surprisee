// Convert Postgres snake_case rows ↔ JS camelCase objects so React
// components can stay in camelCase regardless of the column casing.

const toCamelKey = (k) => k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const toSnakeKey = (k) => k.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase());

export function toCamel(row) {
  if (row == null || typeof row !== 'object' || Array.isArray(row)) return row;
  const out = {};
  for (const [k, v] of Object.entries(row)) out[toCamelKey(k)] = v;
  return out;
}

export function toSnake(obj) {
  if (obj == null || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  const out = {};
  for (const [k, v] of Object.entries(obj)) out[toSnakeKey(k)] = v;
  return out;
}
