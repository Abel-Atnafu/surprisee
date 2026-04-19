import { motion } from 'framer-motion';
import WhatsAppButton from './WhatsAppButton';

export default function Hero({ phone, tagline }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-charcoal-900 text-cream-50"
    >
      {/* Warm gradient wash */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,166,75,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,67,44,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(11,9,8,0.75))]" />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-40 sm:px-10 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-amber-400"
        >
          Addis Ababa · Est. 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.95] tracking-tight"
        >
          Burgers, <em className="not-italic text-amber-500">done</em>
          <br />
          properly.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-cream-200/80 sm:text-xl"
        >
          {tagline || 'Smashed patties. Soft brioche. Sauces that mean it. Order on WhatsApp and we\u2019ll have it ready.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <WhatsAppButton phone={phone} message="Hi SAR Burger, I'd like to place an order." />
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/25 px-6 py-3 text-sm font-semibold tracking-wide text-cream-50 transition hover:bg-cream-50 hover:text-charcoal-900"
          >
            See the menu
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12l5 5 5-5M10 4v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Hero "burger" mark — stacked CSS discs, no image required */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="pointer-events-none absolute -right-16 top-24 hidden h-[540px] w-[540px] lg:block"
      >
        <div className="relative h-full w-full">
          {/* top bun */}
          <div className="absolute left-1/2 top-[6%] h-[34%] w-[78%] -translate-x-1/2 rounded-t-[50%] bg-gradient-to-b from-amber-400 to-amber-600 shadow-lift" />
          <div className="absolute left-1/2 top-[8%] h-[3%] w-[6%] -translate-x-[220%] rounded-full bg-cream-100/90" />
          <div className="absolute left-1/2 top-[11%] h-[2.5%] w-[5%] -translate-x-[20%] rounded-full bg-cream-100/80" />
          <div className="absolute left-1/2 top-[9%] h-[3%] w-[6%] translate-x-[140%] rounded-full bg-cream-100/80" />
          {/* lettuce */}
          <div className="absolute left-1/2 top-[40%] h-[5%] w-[84%] -translate-x-1/2 rounded-full bg-emerald-700/90" />
          {/* cheese */}
          <div className="absolute left-1/2 top-[45%] h-[4%] w-[86%] -translate-x-1/2 rounded-[20%] bg-amber-400" />
          {/* patty */}
          <div className="absolute left-1/2 top-[49%] h-[11%] w-[82%] -translate-x-1/2 rounded-[40%] bg-gradient-to-b from-charcoal-700 to-charcoal-900 shadow-lift" />
          {/* bottom bun */}
          <div className="absolute left-1/2 top-[60%] h-[26%] w-[78%] -translate-x-1/2 rounded-b-[50%] bg-gradient-to-b from-amber-600 to-amber-700" />
        </div>
      </motion.div>
    </section>
  );
}
