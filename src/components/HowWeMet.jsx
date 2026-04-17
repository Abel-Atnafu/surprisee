import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (options.triggerOnce) observer.unobserve(entry.target)
      }
    }, { threshold: options.threshold || 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export default function HowWeMet() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const steps = [
    {
      number: '01',
      title: 'Your Art',
      description: 'I poured my creativity into something I loved',
      icon: '🎨',
    },
    {
      number: '02',
      title: 'Your Eyes Found It',
      description: 'You scrolled through my art page and something caught your attention',
      icon: '✨',
    },
    {
      number: '03',
      title: 'You Noticed Me',
      description: 'Not just the art, but me behind it. You liked the pictures and liked me',
      icon: '💫',
    },
    {
      number: '04',
      title: 'We Started Talking',
      description: 'From that moment, everything changed. A conversation that led to forever',
      icon: '💬',
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 font-montserrat">
            How We Met
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.2 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-100 hover:border-rose-300 transition-all hover:shadow-lg"
            >
              <div className="text-6xl mb-4">{step.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {step.number}
              </h3>
              <h4 className="text-2xl font-semibold text-gray-700 mb-3">
                {step.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16 text-lg text-gray-600 italic"
        >
          "It wasn't just about the art. It was about finding you." 💕
        </motion.p>
      </div>
    </section>
  )
}
