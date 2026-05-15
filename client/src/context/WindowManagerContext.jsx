import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const APP_DEFINITIONS = [
  { id: 'projects', title: 'Projects', emoji: '📁' },
  { id: 'about', title: 'About Me', emoji: '👤' },
  { id: 'contact', title: 'Contact', emoji: '✉️' },
  { id: 'browser', title: 'Socials', emoji: '🌐' },
  { id: 'admin', title: 'Admin', emoji: '🔐' },
]

const WindowManagerContext = createContext(null)

function getAppById(appId) {
  return APP_DEFINITIONS.find((app) => app.id === appId)
}

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState([])
  const zCounter = useRef(100)

  const nextZ = useCallback(() => {
    zCounter.current += 1
    return zCounter.current
  }, [])

  const openApp = useCallback((appId) => {
    const app = getAppById(appId)
    if (!app) return

    setWindows((prev) => {
      const existing = prev.find((windowItem) => windowItem.id === appId)
      const zIndex = zCounter.current + 1
      zCounter.current = zIndex

      if (existing) {
        return prev.map((windowItem) => (
          windowItem.id === appId
            ? { ...windowItem, minimized: false, zIndex }
            : windowItem
        ))
      }

      return [...prev, {
        id: app.id,
        title: app.title,
        minimized: false,
        maximized: false,
        zIndex,
      }]
    })
  }, [])

  const closeWindow = useCallback((appId) => {
    setWindows((prev) => prev.filter((windowItem) => windowItem.id !== appId))
  }, [])

  const focusWindow = useCallback((appId) => {
    setWindows((prev) => {
      const exists = prev.some((windowItem) => windowItem.id === appId)
      if (!exists) return prev

      const zIndex = zCounter.current + 1
      zCounter.current = zIndex
      return prev.map((windowItem) => (
        windowItem.id === appId ? { ...windowItem, zIndex } : windowItem
      ))
    })
  }, [])

  const minimizeWindow = useCallback((appId) => {
    setWindows((prev) => prev.map((windowItem) => (
      windowItem.id === appId ? { ...windowItem, minimized: true } : windowItem
    )))
  }, [])

  const restoreWindow = useCallback((appId) => {
    const zIndex = nextZ()
    setWindows((prev) => prev.map((windowItem) => (
      windowItem.id === appId ? { ...windowItem, minimized: false, zIndex } : windowItem
    )))
  }, [nextZ])

  const toggleMaximizeWindow = useCallback((appId) => {
    setWindows((prev) => prev.map((windowItem) => (
      windowItem.id === appId ? { ...windowItem, maximized: !windowItem.maximized } : windowItem
    )))
  }, [])

  const value = useMemo(() => ({
    windows,
    appDefinitions: APP_DEFINITIONS,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximizeWindow,
  }), [windows, openApp, closeWindow, focusWindow, minimizeWindow, restoreWindow, toggleMaximizeWindow])

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext)
  if (!context) throw new Error('useWindowManager must be used within WindowManagerProvider')
  return context
}
