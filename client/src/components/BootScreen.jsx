import { useEffect } from 'react'
import { motion } from 'framer-motion'
import '../styles/windows.css'

export default function BootScreen({ onFinish }) {
  useEffect(() => {
    // Windows usually stays on this screen a bit longer for "effect"
    const t = setTimeout(() => onFinish && onFinish(), 4000)
    return () => clearTimeout(t)
  }, [onFinish])

  return (
    <motion.div
      className="win-boot-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="boot-content">
        {/* The Logo */}
        <motion.img
          src="/icons.svg"
          alt="Windows"
          className="boot-logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* The Iconic Chasing Dots Loader */}
        <div className="win11-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        <motion.h2
          className="welcome-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Welcome
        </motion.h2>
      </div>
    </motion.div>
  )
}