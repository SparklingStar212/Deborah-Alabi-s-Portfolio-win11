import React, { useState, useRef } from 'react'
import { Maximize2, Minus, X, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import '../styles/windows.css'

export default function Window({
  title = 'App',
  children,
  style,
  zIndex,
  isMaximized = false,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [snapZones, setSnapZones] = useState([])
  const windowRef = useRef(null)
  const headerRef = useRef(null) // Fixed the missing ref

  const SNAP_THRESHOLD = 50

  const calculateSnapZones = (x, y) => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const zones = []

    if (x < SNAP_THRESHOLD) {
      zones.push({ name: 'left', x: 0, y: 0, width: screenWidth / 2, height: screenHeight - 48 })
    }
    if (x > screenWidth - SNAP_THRESHOLD) {
      zones.push({ name: 'right', x: screenWidth / 2, y: 0, width: screenWidth / 2, height: screenHeight - 48 })
    }
    if (y < SNAP_THRESHOLD) {
      zones.push({ name: 'maximize', x: 0, y: 0, width: screenWidth, height: screenHeight - 48 })
    }
    return zones
  }

  const handleDrag = (event, info) => {
    const zones = calculateSnapZones(info.point.x, info.point.y)
    setSnapZones(zones)
  }

  const handleDragEnd = (event, info) => {
    setSnapZones([])
    setIsDragging(false)
    const dragX = info.point.x
    const dragY = info.point.y

    if (dragX < SNAP_THRESHOLD || dragX > window.innerWidth - SNAP_THRESHOLD || dragY < SNAP_THRESHOLD) {
      // Snap logic triggered
      if (dragY < SNAP_THRESHOLD && !isMaximized) onMaximize?.()
      // You can add logic here to set specific window dimensions for left/right snap
    }
  }

  return (
    <>
      {/* Snap Preview Overlay */}
      {snapZones.map((zone, i) => (
        <div
          key={`snap-${i}`}
          className="snap-preview-overlay"
          style={{
            left: zone.x,
            top: zone.y,
            width: zone.width,
            height: zone.height,
          }}
        />
      ))}

      <motion.div
        ref={windowRef}
        className={`win11-window ${isMaximized ? 'maximized' : ''}`}
        style={{ ...style, zIndex }}
        onMouseDown={onFocus}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        drag={!isMaximized}
        dragListener={true}
        dragControls={undefined} // Allows dragging from anywhere, or restrict to header below
        onDragStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
      >
        {/* Window Title Bar */}
        <div className="win-title-bar" ref={headerRef}>
          <div className="win-title-content">
            <span className="win-title-text">{title}</span>
          </div>

          <div className="win-controls">
            <div className="control-btn" onClick={onMinimize}>
              <Minus size={14} />
            </div>
            <div className="control-btn" onClick={onMaximize}>
              {isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
            </div>
            <div className="control-btn close-btn" onClick={onClose}>
              <X size={16} />
            </div>
          </div>
        </div>

        {/* Window Content */}
        <div className="win-content-area">
          {children}
        </div>
      </motion.div>
    </>
  )
}