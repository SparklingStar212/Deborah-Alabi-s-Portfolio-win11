import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import Window from './Window'
import Projects from './Projects'
import Socials from './Socials'
import About from './About'
import Contact from './Contact'
import Admin from './Admin'
import AdminSignIn from './AdminSignIn'
import DesktopContextMenu from './DesktopContextMenu'
import { useWindowManager } from '../context/WindowManagerContext'
import '../styles/windows.css'

export default function Desktop() {
  const {
    windows,
    appDefinitions,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
  } = useWindowManager()

  const [icons, setIcons] = useState(null)
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 })
  const [adminPromptOpen, setAdminPromptOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    import('lucide-react')
      .then((mod) => { if (mounted) setIcons(mod) })
      .catch(() => { })
    return () => { mounted = false }
  }, [])

  const renderAppContent = (appId) => {
    const apps = {
      projects: <Projects />,
      about: <About />,
      contact: <Contact />,
      browser: <Socials />,
      admin: <Admin onLock={() => closeWindow('admin')} />,
    }
    return apps[appId] || null
  }

  const handleAppOpen = (appId) => {
    if (appId === 'admin') {
      setAdminPromptOpen(true)
      return
    }

    openApp(appId)
  }

  // Windows 11 Icon Colors (Moving away from "all blue")
  const getIcon = (id, emoji) => {
    if (!icons) return emoji
    const iconSize = 32
    switch (id) {
      case 'projects': return <icons.Folder size={iconSize} color="#f9d348" fill="#f9d348" fillOpacity={0.2} /> // Manila Yellow
      case 'about': return <icons.User size={iconSize} color="#60cdff" /> // Sky Blue
      case 'contact': return <icons.Mail size={iconSize} color="#ffffff" /> // White
      case 'browser': return <icons.Globe size={iconSize} color="#57e389" /> // Seafoam Green
      default: return emoji
    }
  }

  return (
    <div
      className="win-desktop-area"
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY })
      }}
      onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
    >
      {/* Desktop Wallpaper is handled in CSS for better performance */}

      <div className="win-icons-grid">
        {appDefinitions.map((app) => (
          <motion.div
            key={app.id}
            className="desktop-icon-item"
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              title={app.title}
              icon={getIcon(app.id, app.emoji)}
              onDoubleClick={() => handleAppOpen(app.id)}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {windows
          .filter((w) => !w.minimized)
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((w) => (
            <Window
              key={w.id}
              title={w.title}
              zIndex={w.zIndex}
              isMaximized={w.maximized}
              onFocus={() => focusWindow(w.id)}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={() => toggleMaximizeWindow(w.id)}
            >
              {renderAppContent(w.id)}
            </Window>
          ))}
      </AnimatePresence>

      <DesktopContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
        onRefresh={() => window.location.reload()}
      />

      {adminPromptOpen && (
        <AdminSignIn
          onSuccess={() => {
            setAdminPromptOpen(false)
            openApp('admin')
          }}
          onCancel={() => setAdminPromptOpen(false)}
        />
      )}
    </div>
  )
}