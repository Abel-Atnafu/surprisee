import { useEffect, useState } from 'react';
import { useSettings } from '../../../hooks/useSettings';
import { useAuth } from '../../../context/AuthContext';
import { seedDefaults } from '../../../lib/seed';
import { Field, Input, Textarea } from '../ui/Field';

export default function SettingsTab() {
  const { settings, exists, update } = useSettings();
  const { logout } = useAuth();
  const [form, setForm] = useState({
    phone: '',
    address: '',
    mapsEmbedUrl: '',
    tagline: '',
  });
  const [pw, setPw] = useState('');
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    setForm({
      phone: settings.phone ?? '',
      address: settings.address ?? '',
      mapsEmbedUrl: settings.mapsEmbedUrl ?? '',
      tagline: settings.tagline ?? '',
    });
  }, [settings.phone, settings.address, settings.mapsEmbedUrl, settings.tagline]);

  const saveBasic = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await update({
        phone: form.phone.trim(),
        address: form.address.trim(),
        mapsEmbedUrl: form.mapsEmbedUrl.trim(),
        tagline: form.tagline.trim(),
      });
      setStatus({ type: 'ok', text: 'Settings saved.' });
    } catch (err) {
      setStatus({ type: 'err', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (!pw || pw.length < 6) {
      setStatus({ type: 'err', text: 'Password must be at least 6 characters.' });
      return;
    }
    setSaving(true);
    try {
      await update({ adminPassword: pw });
      setPw('');
      setStatus({ type: 'ok', text: 'Password changed. Logging out\u2026' });
      setTimeout(() => logout(), 800);
    } catch (err) {
      setStatus({ type: 'err', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const onSeed = async () => {
    setSeeding(true);
    setStatus(null);
    try {
      await seedDefaults();
      setStatus({ type: 'ok', text: 'Defaults seeded. Reload if needed.' });
    } catch (err) {
      setStatus({ type: 'err', text: err.message });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-xl bg-white p-6 shadow-card">
        <h2 className="mb-4 font-display text-xl font-bold">Site settings</h2>

        {!exists && (
          <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-50 p-4 text-sm text-charcoal-700">
            <p className="font-semibold">First time here?</p>
            <p className="mt-1">Seed the default settings and opening hours to get started.</p>
            <button
              onClick={onSeed}
              disabled={seeding}
              className="btn-primary mt-3 py-2 text-xs"
            >
              {seeding ? 'Seeding\u2026' : 'Seed defaults'}
            </button>
          </div>
        )}

        <form onSubmit={saveBasic} className="space-y-4">
          <Field label="WhatsApp phone" hint="Digits only, include country code (e.g. 251911000000)">
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Address">
            <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>
          <Field label="Google Maps embed URL" hint="From Google Maps → Share → Embed a map → copy src">
            <Input value={form.mapsEmbedUrl} onChange={(e) => setForm({ ...form, mapsEmbedUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?pb=…" />
          </Field>
          <Field label="Hero tagline">
            <Textarea value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </Field>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving\u2026' : 'Save settings'}
          </button>
        </form>

        <button
          onClick={onSeed}
          disabled={seeding}
          className="mt-4 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900"
        >
          {seeding ? 'Seeding\u2026' : 'Re-seed hours defaults (skips existing)'}
        </button>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-card h-fit">
        <h2 className="mb-2 font-display text-xl font-bold">Admin password</h2>
        <p className="mb-4 text-sm text-charcoal-600">
          Change the password used to sign in here. You&rsquo;ll be signed out after saving.
        </p>
        <form onSubmit={savePassword} className="space-y-4">
          <Field label="New password" hint="At least 6 characters">
            <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
          </Field>
          <button type="submit" className="btn-dark" disabled={saving}>
            {saving ? 'Saving\u2026' : 'Change password'}
          </button>
        </form>

        {status && (
          <p className={`mt-4 text-sm ${status.type === 'ok' ? 'text-emerald-600' : 'text-tomato-500'}`}>
            {status.text}
          </p>
        )}
      </section>
    </div>
  );
}
