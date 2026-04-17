import { motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from './components/HeroSection'
import HowWeMet from './components/HowWeMet'
import Timeline from './components/Timeline'
import FirstDate from './components/FirstDate'
import MusicSection from './components/MusicSection'
import Footer from './components/Footer'

export default function App() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8])

  return (
    <motion.div style={{ opacity }} className="min-h-screen">
      <HeroSection />
      <HowWeMet />
      <Timeline />
      <FirstDate />
      <MusicSection />
      <Footer />
    </motion.div>
  )
}
