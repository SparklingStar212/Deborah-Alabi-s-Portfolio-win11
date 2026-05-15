import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, BellOff, Sun, Moon, LayoutGrid } from 'lucide-react'
import '../styles/windows.css'

export default function Taskbar({
  onStartClick,
  startOpen,
  windows = [],
  onOpenApp,
  onRestoreWindow,
  onFocusWindow,
}) {
  const [icons, setIcons] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [clock, setClock] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  const [notificationVisible, setNotificationVisible] = useState(false)

  const winBlue = '#60cdff';

  const pinnedApps = [
    { id: 'projects', title: 'Projects', color: '#f9d348' },
    { id: 'browser', title: 'Socials', color: '#57e389' },
    { id: 'about', title: 'About Me', color: '#60cdff' },
  ]

  useEffect(() => {
    let mounted = true
    import('lucide-react').then((mod) => mounted && setIcons(mod)).catch(() => { })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme])

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="win11-taskbar-container">
      {/* 1. Start & Pinned Apps (Centered Group) */}
      <div className="taskbar-center-group">

        {/* Start Button */}
        <motion.button
          className={`task-icon-item start-btn ${startOpen ? 'active' : ''}`}
          onClick={onStartClick}
          whileTap={{ scale: 0.9 }}
        >
          <LayoutGrid size={20} color={winBlue} fill={winBlue} />
        </motion.button>

        {/* Pinned & Running Apps */}
        <div className="taskbar-divider-v" />

        {pinnedApps.map((app) => {
          const isRunning = windows.some(w => w.id === app.id);
          const isFocused = windows.find(w => w.id === app.id && w.zIndex === Math.max(...windows.map(win => win.zIndex)));

          return (
            <div key={app.id} className="task-icon-wrapper">
              <motion.button
                className={`task-icon-item ${isFocused ? 'focused' : ''}`}
                onClick={() => onOpenApp(app.id)}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.9 }}
              >
                {icons && app.id === 'projects' && <icons.Folder size={20} color={app.color} />}
                {icons && app.id === 'browser' && <icons.Globe size={20} color={app.color} />}
                {icons && app.id === 'about' && <icons.User size={20} color={app.color} />}
              </motion.button>

              {/* Active Indicator (The Pill) */}
              <AnimatePresence>
                {isRunning && (
                  <motion.div
                    className={`active-indicator ${isFocused ? 'active-long' : ''}`}
                    initial={{ width: 0 }}
                    animate={{ width: isFocused ? 12 : 6 }}
                    exit={{ width: 0 }}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 2. System Tray (Right Group) */}
      <div className="taskbar-tray-group">
        <div className="tray-section" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
        </div>

        <div className={`tray-section ${notificationVisible ? 'active' : ''}`} onClick={() => setNotificationVisible(!notificationVisible)}>
          <Bell size={14} />
        </div>

        <div className="taskbar-divider-v" />

        <div className="tray-section clock-section">
          <span>{clock}</span>
          <span style={{ fontSize: '10px', opacity: 0.7 }}>{new Date().toLocaleDateString([], { day: 'numeric', month: 'short' })}</span>
        </div>
      </div>

      {/* Notifications Popup */}
      <AnimatePresence>
        {notificationVisible && (
          <motion.div
            className="win11-notification-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="notif-header">Notifications</div>
            <div className="notif-content">No new notifications</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}