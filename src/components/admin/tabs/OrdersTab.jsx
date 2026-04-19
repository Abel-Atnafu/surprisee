import { useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import { formatBirr, parseBirr } from '../../../utils/money';
import { Field, Input, Textarea } from '../ui/Field';

function blank() {
  return { customerName: '', phone: '', items: '', total: '', note: '' };
}

function formatTimestamp(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('en-US', {
    timeZone: 'Africa/Addis_Ababa',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function OrdersTab() {
  const { items, loading, add, remove } = useOrders();
  const [form, setForm] = useState(blank());
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName.trim() && !form.phone.trim()) return;
    setSaving(true);
    try {
      await add({
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        items: form.items.trim(),
        total: parseBirr(form.total),
        note: form.note.trim(),
      });
      setForm(blank());
    } finally {
      setSaving(false);
    }
  };

  const onRemove = (o) => {
    if (window.confirm('Delete this order log entry?')) remove(o.id);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <section>
        <h2 className="mb-4 font-display text-xl font-bold">Orders log</h2>
        {loading ? (
          <p className="text-sm text-charcoal-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="rounded-xl bg-cream-100 p-6 text-sm text-charcoal-600">
            No orders logged yet. Log WhatsApp orders here to keep track.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((o) => (
              <li key={o.id} className="rounded-xl bg-white p-4 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{o.customerName || 'Walk-in'}</p>
                    <p className="text-xs text-charcoal-500">
                      {o.phone && <>{o.phone} &middot; </>}
                      {formatTimestamp(o.createdAt)}
                    </p>
                  </div>
                  <span className="font-display font-semibold">{formatBirr(o.total)}</span>
                </div>
                {o.items && <p className="mt-2 whitespace-pre-line text-sm text-charcoal-700">{o.items}</p>}
                {o.note && <p className="mt-1 text-xs italic text-charcoal-500">Note: {o.note}</p>}
                <button
                  onClick={() => onRemove(o)}
                  className="mt-3 text-xs font-semibold text-tomato-500 hover:text-tomato-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="rounded-xl bg-white p-6 shadow-card h-fit sticky top-24">
        <h2 className="mb-4 font-display text-xl font-bold">Log a new order</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Customer name">
            <Input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          </Field>
          <Field label="Phone">
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+251…" />
          </Field>
          <Field label="Items" hint="One line per item">
            <Textarea value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} placeholder={'1x Classic Burger\n1x Fries'} />
          </Field>
          <Field label="Total (ETB)">
            <Input type="number" min="0" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} />
          </Field>
          <Field label="Note">
            <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </Field>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Saving\u2026' : 'Log order'}
          </button>
        </form>
      </aside>
    </div>
  );
}
