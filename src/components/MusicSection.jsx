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

export default function MusicSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [playing, setPlaying] = useState(null)

  const playlist = [
    {
      title: 'Marvin\'s Room',
      artist: 'Drake',
      description: 'For the moments when I can\'t help but think of you',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      title: 'One Dance',
      artist: 'Drake ft. Wizkid & Kyla',
      description: 'Our song. The one that makes me think of you.',
      color: 'from-purple-400 to-pink-500',
      highlight: true,
    },
    {
      title: 'PnD Vibes',
      artist: 'Party and Bullshit Energy',
      description: 'The energy we bring together',
      color: 'from-pink-400 to-rose-500',
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 sm:px-8 bg-gradient-to-b from-white via-rose-50 to-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 font-montserrat">
            Our Soundtrack
          </h2>
          <p className="text-gray-600">The songs that remind me of you 🎵</p>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playlist.map((song, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -8 }}
              className={`cursor-pointer ${song.highlight ? 'md:col-span-3' : ''}`}
            >
              <div
                className={`bg-gradient-to-br ${song.color} p-0.5 rounded-2xl h-full ${
                  song.highlight ? 'md:max-w-2xl md:mx-auto' : ''
                }`}
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">
                        {song.artist}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">
                        {song.title}
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPlaying(playing === i ? null : i)}
                      className={`text-3xl transition-all ${
                        playing === i ? 'animate-pulse' : ''
                      }`}
                    >
                      {playing === i ? '⏸️' : '▶️'}
                    </motion.button>
                  </div>
                  <p className="text-gray-600">{song.description}</p>

                  {song.highlight && (
                    <div className="mt-6 pt-6 border-t border-rose-100">
                      <motion.p
                        animate={inView ? { opacity: [0.5, 1, 0.5] } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-center font-semibold text-rose-600"
                      >
                        ✨ This is our song ✨
                      </motion.p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600 italic"
        >
          Every beat reminds me why I fell for you 💕
        </motion.p>
      </div>
    </section>
  )
}
