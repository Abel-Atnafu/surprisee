import { WEEKDAYS } from '../lib/collections';

const DAY_LABELS = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
  fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};

export const weekdayLabel = (key) => DAY_LABELS[key] ?? key;

export const weekdayOrder = WEEKDAYS;

// Parse "HH:mm" to minutes since midnight
export function toMinutes(hhmm) {
  if (!hhmm || typeof hhmm !== 'string') return null;
  const [h, m] = hhmm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

// Format "HH:mm" to "11:00 AM"
export function formatTime(hhmm) {
  const mins = toMinutes(hhmm);
  if (mins == null) return '';
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export function formatRange(dayDoc) {
  if (!dayDoc) return 'Closed';
  if (dayDoc.closed) return 'Closed';
  if (!dayDoc.open || !dayDoc.close) return 'Closed';
  return `${formatTime(dayDoc.open)} — ${formatTime(dayDoc.close)}`;
}

// Get weekday key for Addis Ababa timezone
export function addisWeekdayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Addis_Ababa',
    weekday: 'short',
  }).formatToParts(date);
  const w = parts.find((p) => p.type === 'weekday')?.value ?? '';
  const map = { Mon: 'mon', Tue: 'tue', Wed: 'wed', Thu: 'thu', Fri: 'fri', Sat: 'sat', Sun: 'sun' };
  return map[w] ?? 'mon';
}

// Get current minutes since midnight in Addis Ababa
export function addisMinutesNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Addis_Ababa',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return h * 60 + m;
}

// hoursByDay: { mon: {open, close, closed}, ... }
export function isOpenNow(hoursByDay) {
  if (!hoursByDay) return false;
  const key = addisWeekdayKey();
  const today = hoursByDay[key];
  if (!today || today.closed) return false;
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);
  if (open == null || close == null) return false;
  const now = addisMinutesNow();
  if (close <= open) {
    // overnight (e.g. 18:00 -> 02:00)
    return now >= open || now < close;
  }
  return now >= open && now < close;
}
