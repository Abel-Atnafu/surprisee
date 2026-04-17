import { motion } from 'framer-motion'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-50" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-8 max-w-2xl"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl font-bold text-gray-800 mb-6 font-montserrat"
        >
          Our Story
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed"
        >
          A moment that changed everything
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-500 mb-12 max-w-xl mx-auto"
        >
          From your art to my heart, this is our beginning
        </motion.p>

        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
