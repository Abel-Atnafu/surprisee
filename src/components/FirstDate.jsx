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

export default function FirstDate() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Image placeholder */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 rounded-3xl blur-2xl opacity-60" />
            <div className="relative bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-8 sm:p-12 aspect-square flex items-center justify-center border-4 border-rose-200">
              <div className="text-center">
                <p className="text-6xl mb-4">☕</p>
                <p className="text-2xl font-semibold text-gray-700">The Cafe</p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 font-montserrat">
              Our First Date
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We met at a cozy cafe, and the nervousness melted away the moment we saw each other. No more just messages—this was real.
              </p>
              <p>
                You were even more beautiful in person. The way you laughed, how you listened, the way you looked at me... I knew this was something special.
              </p>
              <p>
                That cafe, that moment, that conversation—it became one of my favorite memories. Because that's when I realized I wasn't just crushing on the girl who found my art. I was falling for the person behind those beautiful eyes.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
            >
              💕 That was just the beginning
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
