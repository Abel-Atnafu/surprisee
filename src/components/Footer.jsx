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

export default function Footer() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const [revealed, setRevealed] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-8 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 font-montserrat">
              Thank You For Being You
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-rose-200 mb-8"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every moment with you feels like a dream I don't want to wake up from. You've shown me what it means to be seen, understood, and loved just for being myself.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              From your art finding my heart to building memories together, you've made me the happiest version of myself. Thank you for taking a chance on me that day when you found my art page.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              You are my favorite person, my best adventure, and my forever reason to smile.
            </p>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRevealed(!revealed)}
            className="mb-8 px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
          >
            💌 Click for a secret message
          </motion.button>

          {revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 border-2 border-rose-300 mb-8"
            >
              <p className="text-2xl font-bold text-gray-800 mb-4">
                Will you keep building memories with me? 💕
              </p>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl"
              >
                💝
              </motion.div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600">
              I love you more than words can ever say
            </p>
            <div className="flex justify-center gap-2 text-3xl">
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1, delay: 0 }}>
                💕
              </motion.span>
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1, delay: 0.2 }}>
                💫
              </motion.span>
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1, delay: 0.4 }}>
                💕
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-rose-200"
          >
            <p className="text-sm text-gray-500">
              Made with 💕 and code for the girl who changed everything
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date().getFullYear()} • Our Story Begins
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
