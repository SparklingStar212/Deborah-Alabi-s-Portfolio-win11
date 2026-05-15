import React from 'react'
import { Search, Folder, User, Globe, Mail, Power, Settings } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/windows.css'

export default function StartMenu({ visible, onClose, onOpenApp }) {
  const pinnedApps = [
    { id: 'about', label: 'About Me', icon: <User size={24} color="#60cdff" /> },
    { id: 'projects', label: 'Projects', icon: <Folder size={24} color="#f9d348" /> },
    { id: 'browser', label: 'Socials', icon: <Globe size={24} color="#57e389" /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={24} color="#ffffff" /> },
  ]

  const launch = (appId) => {
    onOpenApp && onOpenApp(appId)
    onClose && onClose()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="start-menu-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="win11-start-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 300, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 300, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          >
            {/* --- Search Bar --- */}
            <div className="start-search-container">
              <Search size={14} className="search-icon" />
              <input className="start-search-input" placeholder="Search for apps, settings, and documents" />
            </div>

            {/* --- Pinned Section --- */}
            <div className="start-section">
              <div className="section-header">
                <span className="section-title">Pinned</span>
                <button className="all-apps-btn">All apps ›</button>
              </div>

              <div className="pinned-grid">
                {pinnedApps.map((app) => (
                  <div key={app.id} className="pinned-item" onClick={() => launch(app.id)}>
                    <div className="pinned-icon">{app.icon}</div>
                    <span className="pinned-label">{app.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Recommended Section (Placeholder) --- */}
            <div className="start-section recommended">
              <div className="section-header">
                <span className="section-title">Recommended</span>
                <button className="all-apps-btn">More ›</button>
              </div>
              <div className="recommended-placeholder">
                <p>Recently opened files and new apps will show up here.</p>
              </div>
            </div>

            {/* --- Footer Bar --- */}
            <div className="start-footer">
              <div className="footer-user">
                <div className="user-avatar-small">
                  <User size={14} />
                </div>
                <span>User</span>
              </div>
              <div className="footer-actions">
                <Power size={18} className="power-icon" onClick={() => window.location.reload()} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}