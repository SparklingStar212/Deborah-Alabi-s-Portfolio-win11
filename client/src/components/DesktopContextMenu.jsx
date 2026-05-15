import React, { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, RotateCw, LayoutGrid, Monitor } from 'lucide-react'
import '../styles/windows.css'

export default function DesktopContextMenu({ visible, x, y, onClose, onRefresh, onNewFolder }) {
  const menuRef = useRef(null)
  const [pos, setPos] = useState({ left: x, top: y })

  // Logic to prevent the menu from going off-screen
  useLayoutEffect(() => {
    if (visible && menuRef.current) {
      const menuWidth = 220; // Fixed width for Win11 feel
      const menuHeight = menuRef.current.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let newLeft = x;
      let newTop = y;

      if (x + menuWidth > screenWidth) newLeft = x - menuWidth;
      if (y + menuHeight > screenHeight) newTop = y - menuHeight;

      setPos({ left: newLeft, top: newTop });
    }
  }, [visible, x, y]);

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="context-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={menuRef}
        className="win11-context-menu"
        style={{ left: pos.left, top: pos.top }}
        initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top left' }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
      >
        <div className="context-section">
          <div className="context-item" onClick={() => { onRefresh?.(); onClose(); }}>
            <RotateCw size={14} className="context-icon" />
            <span>Refresh</span>
          </div>
        </div>

        <div className="context-divider" />

        <div className="context-section">
          <div className="context-item">
            <LayoutGrid size={14} className="context-icon" />
            <span>View</span>
            <span className="context-arrow">›</span>
          </div>
          <div className="context-item" onClick={() => { onNewFolder?.(); onClose(); }}>
            <Plus size={14} className="context-icon" />
            <span>New Folder</span>
          </div>
        </div>

        <div className="context-divider" />

        <div className="context-section">
          <div className="context-item">
            <Monitor size={14} className="context-icon" />
            <span>Display settings</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}