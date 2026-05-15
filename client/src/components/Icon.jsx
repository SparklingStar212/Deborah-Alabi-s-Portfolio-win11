import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/windows.css'

export default function Icon({ title, icon, onDoubleClick }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleDoubleClick = (e) => {
    e.stopPropagation(); // Prevents the desktop click handler from firing
    onDoubleClick && onDoubleClick();
    setIsSelected(false);
  };

  const handleSingleClick = (e) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  return (
    <motion.div
      className={`win11-icon-container ${isSelected ? 'is-selected' : ''}`}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="icon-wrapper">
        {icon || '🗂️'}
      </div>
      <span className="icon-text">
        {title}
      </span>
    </motion.div>
  )
}