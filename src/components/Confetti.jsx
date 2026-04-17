import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Confetti({ trigger }) {
  const [particles, setParticles] = useState([])

  const createConfetti = () => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
      color: ['#ec4899', '#f472b6', '#fbcfe8', '#fce7f3'][Math.floor(Math.random() * 4)],
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 3000)
  }

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            y: -10,
            x: 0,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeIn',
          }}
          className="fixed pointer-events-none text-xl"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
          }}
        >
          {['💕', '✨', '💫', '💝'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </>
  )
}
