import { useCallback, useState, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import './styles/windows.css'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import StartMenu from './components/StartMenu'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { WindowManagerProvider, useWindowManager } from './context/WindowManagerContext'

function DesktopShell({ startOpen, setStartOpen }) {
  const { windows, openApp, restoreWindow, focusWindow } = useWindowManager()

  return (
    <motion.div
      className="desktop-shell"
      initial={{ opacity: 0, scale: 1.05 }} // Start slightly zoomed in
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }} // Zoom in further when leaving
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Smooth "Exponential" curve
    >
      <Desktop />
      <Taskbar
        onStartClick={() => setStartOpen((s) => !s)}
        startOpen={startOpen}
        windows={windows}
        onOpenApp={openApp}
        onRestoreWindow={restoreWindow}
        onFocusWindow={focusWindow}
      />
      <StartMenu
        visible={startOpen}
        onClose={() => setStartOpen(false)}
        onOpenApp={openApp}
      />
    </motion.div>
  )
}

function MainLayout() {
  const { token } = useContext(AuthContext)
  const [booted, setBooted] = useState(false)
  const [startOpen, setStartOpen] = useState(false)

  const handleBootFinish = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {!booted && (
          <BootScreen key="boot" onFinish={handleBootFinish} />
        )}

        {booted && (
          <WindowManagerProvider key="desktop-provider">
            <DesktopShell startOpen={startOpen} setStartOpen={setStartOpen} />
          </WindowManagerProvider>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainLayout />
      </DataProvider>
    </AuthProvider>
  )
}