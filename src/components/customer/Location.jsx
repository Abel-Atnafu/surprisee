import WhatsAppButton from './WhatsAppButton';

export default function Location({ settings }) {
  const { address, mapsEmbedUrl, phone } = settings || {};
  return (
    <section id="visit" className="section bg-cream-50">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow">Come find us</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The spot.
          </h2>
          <p className="mt-5 max-w-md whitespace-pre-line text-lg leading-relaxed text-charcoal-700">
            {address || 'Addis Ababa, Ethiopia'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton
              phone={phone}
              message="Hi SAR Burger, I'd like to place an order."
            />
            {phone && (
              <a href={`tel:+${String(phone).replace(/[^\d]/g, '')}`} className="btn-secondary">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M2.003 5.884a2 2 0 011.77-2.013l1.92-.24a2 2 0 012.166 1.36l.69 2.07a2 2 0 01-.45 2.005l-.9.9a12.04 12.04 0 005.4 5.4l.9-.9a2 2 0 012.005-.45l2.07.69a2 2 0 011.36 2.166l-.24 1.92a2 2 0 01-2.013 1.77C7.61 19.81.19 12.39.19 3.81a2 2 0 011.813-2.003z" />
                </svg>
                Call us
              </a>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-charcoal-900/10 shadow-card">
          {mapsEmbedUrl ? (
            <iframe
              title="SAR Burger location"
              src={mapsEmbedUrl}
              className="h-[420px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-cream-100 text-center text-charcoal-500">
              <div>
                <p className="font-display text-xl font-semibold text-charcoal-700">Map coming soon</p>
                <p className="mt-1 text-sm">Paste a Google Maps embed URL in the admin panel.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
