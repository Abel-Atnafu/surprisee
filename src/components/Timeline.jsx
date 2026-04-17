import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Confetti from './Confetti'

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

export default function Timeline() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [confettiTrigger, setConfettiTrigger] = useState(0)

  const handleExpandClick = (i) => {
    setExpandedIndex(expandedIndex === i ? -1 : i)
    if (expandedIndex !== i) {
      setConfettiTrigger(prev => prev + 1)
    }
  }

  const milestones = [
    {
      date: 'March 8',
      title: 'We Met',
      description: 'The beginning of everything. Online, but it felt like destiny.',
      details: 'You found my art, and I found you. That one moment changed my entire life.',
      color: 'from-rose-400 to-pink-500',
    },
    {
      date: 'First Date',
      title: 'Coffee & Connection',
      description: 'At a cafe, getting to know the person behind the messages',
      details: 'You were even more beautiful in person. The nervousness melted away the moment I saw your smile.',
      color: 'from-pink-400 to-rose-500',
    },
    {
      date: 'Today',
      title: 'Growing Stronger',
      description: 'Every day with you is a gift I cherish',
      details: 'With every passing day, I fall for you more. Thank you for being my person.',
      color: 'from-red-400 to-rose-500',
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 sm:px-8 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 font-montserrat">
            Our Timeline
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-200 via-pink-300 to-rose-200" />

          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className={`flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Content */}
                <div className="flex-1 cursor-pointer" onClick={() => handleExpandClick(i)}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-r ${milestone.color} p-0.5 rounded-2xl`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={expandedIndex === i ? 'expanded' : 'collapsed'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white rounded-2xl p-6 sm:p-8"
                      >
                        <p className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
                          {milestone.date}
                        </p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {milestone.description}
                        </p>
                        {expandedIndex === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-700 italic border-t border-rose-200 pt-3 mt-3"
                          >
                            {milestone.details}
                          </motion.p>
                        )}
                        <p className="text-xs text-rose-500 mt-3">
                          {expandedIndex === i ? '✨ Click to hide' : '✨ Click to read more'}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Center circle */}
                <motion.div
                  animate={inView ? { scale: [0.8, 1.1, 1] } : {}}
                  transition={{ delay: i * 0.2 }}
                  className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${milestone.color} border-4 border-white shadow-lg`}
                />

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Confetti trigger={confettiTrigger} />
    </section>
  )
}
