import { useState } from 'react';
import { useCombos } from '../../../hooks/useCombos';
import { formatBirr, parseBirr } from '../../../utils/money';
import { Field, Input, Textarea } from '../ui/Field';

function blank() {
  return { name: '', description: '', itemsIncluded: '', price: '', featured: true };
}

export default function CombosTab() {
  const { items, loading, add, update, remove } = useCombos();
  const [form, setForm] = useState(blank());
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        itemsIncluded: form.itemsIncluded
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        price: parseBirr(form.price),
        featured: Boolean(form.featured),
      };
      if (editingId) await update(editingId, payload);
      else await add(payload);
      setForm(blank());
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setForm({
      name: c.name ?? '',
      description: c.description ?? '',
      itemsIncluded: Array.isArray(c.itemsIncluded) ? c.itemsIncluded.join('\n') : '',
      price: c.price ?? '',
      featured: c.featured !== false,
    });
  };

  const cancelEdit = () => { setEditingId(null); setForm(blank()); };

  const onRemove = (c) => { if (window.confirm(`Delete "${c.name}"?`)) remove(c.id); };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <section>
        <h2 className="mb-4 font-display text-xl font-bold">Combos</h2>
        {loading ? (
          <p className="text-sm text-charcoal-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="rounded-xl bg-cream-100 p-6 text-sm text-charcoal-600">
            No combos yet. Create one to feature on the site.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((c) => (
              <li key={c.id} className="rounded-xl bg-white p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold">{c.name}</p>
                    {c.featured === false && (
                      <span className="mt-1 inline-block rounded-full bg-charcoal-900/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider2 text-charcoal-500">
                        Hidden
                      </span>
                    )}
                  </div>
                  <span className="font-display font-semibold text-amber-600">{formatBirr(c.price)}</span>
                </div>
                {c.description && <p className="mt-2 text-sm text-charcoal-600">{c.description}</p>}
                {Array.isArray(c.itemsIncluded) && c.itemsIncluded.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-charcoal-700">
                    {c.itemsIncluded.map((line, i) => (
                      <li key={i}>&middot; {line}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex gap-3 text-xs font-semibold">
                  <button onClick={() => startEdit(c)} className="text-amber-600 hover:text-amber-700">Edit</button>
                  <button
                    onClick={() => update(c.id, { featured: !(c.featured !== false) })}
                    className="text-charcoal-600 hover:text-charcoal-900"
                  >
                    {c.featured === false ? 'Show' : 'Hide'}
                  </button>
                  <button onClick={() => onRemove(c)} className="text-tomato-500 hover:text-tomato-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="rounded-xl bg-white p-6 shadow-card h-fit sticky top-24">
        <h2 className="mb-4 font-display text-xl font-bold">
          {editingId ? 'Edit combo' : 'Add combo'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="Short description">
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="What's inside" hint="One item per line">
            <Textarea
              value={form.itemsIncluded}
              onChange={(e) => setForm({ ...form, itemsIncluded: e.target.value })}
              placeholder={'Classic burger\nFries\nSoft drink'}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (ETB)">
              <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </Field>
            <label className="flex items-end gap-2 pb-1 pt-6">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 rounded border-charcoal-900/30 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm font-semibold text-charcoal-900">Featured</span>
            </label>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving\u2026' : editingId ? 'Save changes' : 'Add combo'}
            </button>
            {editingId && <button type="button" onClick={cancelEdit} className="btn-secondary">Cancel</button>}
          </div>
        </form>
      </aside>
    </div>
  );
}
