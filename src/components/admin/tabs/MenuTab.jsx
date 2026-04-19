import { useState } from 'react';
import { useMenu } from '../../../hooks/useMenu';
import { formatBirr, parseBirr } from '../../../utils/money';
import { Field, Input, Textarea, Select } from '../ui/Field';

const DEFAULT_CATS = ['Burgers', 'Chicken', 'Sides', 'Drinks', 'Shakes', 'Desserts'];

function blankItem() {
  return {
    name: '',
    description: '',
    price: '',
    category: 'Burgers',
    available: true,
    sortOrder: 0,
  };
}

export default function MenuTab() {
  const { items, loading, add, update, remove } = useMenu();
  const [form, setForm] = useState(blankItem());
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = Array.from(new Set([...DEFAULT_CATS, ...items.map((i) => i.category).filter(Boolean)]));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseBirr(form.price),
        category: form.category.trim() || 'Menu',
        available: Boolean(form.available),
        sortOrder: Number(form.sortOrder) || 0,
      };
      if (editingId) {
        await update(editingId, payload);
      } else {
        await add(payload);
      }
      setForm(blankItem());
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name ?? '',
      description: item.description ?? '',
      price: item.price ?? '',
      category: item.category ?? 'Burgers',
      available: item.available !== false,
      sortOrder: item.sortOrder ?? 0,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(blankItem());
  };

  const toggleAvailable = (item) => {
    update(item.id, { available: !(item.available !== false) });
  };

  const onRemove = (item) => {
    if (window.confirm(`Delete "${item.name}"?`)) remove(item.id);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <section>
        <h2 className="mb-4 font-display text-xl font-bold">Menu items</h2>
        {loading ? (
          <p className="text-sm text-charcoal-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="rounded-xl bg-cream-100 p-6 text-sm text-charcoal-600">
            No items yet. Add your first menu item using the form.
          </p>
        ) : (
          <ul className="divide-y divide-charcoal-900/10 rounded-xl bg-white shadow-card">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex flex-wrap items-start justify-between gap-3 p-4 ${
                  editingId === item.id ? 'bg-amber-50' : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-charcoal-900">{item.name}</p>
                    <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider2 text-charcoal-600">
                      {item.category || 'Menu'}
                    </span>
                    {item.available === false && (
                      <span className="rounded-full bg-tomato-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider2 text-tomato-500">
                        Unavailable
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-charcoal-600 line-clamp-2">{item.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold">{formatBirr(item.price)}</span>
                  <button
                    onClick={() => toggleAvailable(item)}
                    className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-900"
                    title="Toggle available"
                  >
                    {item.available === false ? 'Enable' : 'Disable'}
                  </button>
                  <button onClick={() => startEdit(item)} className="text-xs font-semibold text-amber-600 hover:text-amber-700">
                    Edit
                  </button>
                  <button onClick={() => onRemove(item)} className="text-xs font-semibold text-tomato-500 hover:text-tomato-600">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="rounded-xl bg-white p-6 shadow-card h-fit sticky top-24">
        <h2 className="mb-4 font-display text-xl font-bold">
          {editingId ? 'Edit item' : 'Add item'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="Description">
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (ETB)">
              <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </Field>
            <Field label="Category">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Sort order" hint="Lower shows first">
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
            </Field>
            <label className="flex items-end gap-2 pb-1 pt-6">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
                className="h-4 w-4 rounded border-charcoal-900/30 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm font-semibold text-charcoal-900">Available</span>
            </label>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving\u2026' : editingId ? 'Save changes' : 'Add item'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="btn-secondary">Cancel</button>
            )}
          </div>
        </form>
      </aside>
    </div>
  );
}
