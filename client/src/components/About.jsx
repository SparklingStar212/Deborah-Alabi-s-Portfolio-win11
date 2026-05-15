import React from 'react'
import { useData } from '../context/DataContext'

export default function About() {
  const { about, loading, error } = useData()

  // Authentic Windows 11 Dark Mode Palette
  const winBlue = '#60cdff'; // The "Vibrant Cyan" seen in Win11 Dark Mode
  const winBlueMuted = 'rgba(96, 205, 255, 0.08)';
  const winBlueBorder = 'rgba(96, 205, 255, 0.2)';

  return (
    <div style={{
      padding: '24px',
      fontFamily: '"Segoe UI Variable", "Segoe UI", sans-serif',
      color: '#ffffff'
    }}>

      {/* --- LOADING STATE --- */}
      {loading.about && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: '20%' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 0.2, 0.4].map((delay, i) => (
              <div key={i} style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: winBlue, // Using the correct blue here
                boxShadow: `0 0 8px ${winBlue}66`, // Subtle glow
                animation: `win-dot 1.4s infinite ease-in-out both`,
                animationDelay: `${delay}s`
              }} />
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#a1a1a1' }}>Loading...</span>
        </div>
      )}

      {/* --- CONTENT --- */}
      {!loading.about && about && (
        <div style={{ animation: 'win-slide-in 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '4px' }}>About</h2>
          <div style={{ width: '40px', height: '3px', background: winBlue, borderRadius: '2px', marginBottom: '24px' }}></div>

          <p style={{ color: '#d1d1d1', lineHeight: 1.6, fontSize: '14px', maxWidth: '550px' }}>
            {about.bio}
          </p>

          <h4 style={{ margin: '32px 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Technical Skills</h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {about.skills?.map((s, i) => (
              <div
                key={i}
                style={{
                  background: winBlueMuted,
                  border: `1px solid ${winBlueBorder}`,
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: winBlue, // Text uses the accent blue
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(96, 205, 255, 0.15)';
                  e.currentTarget.style.borderColor = winBlue;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = winBlueMuted;
                  e.currentTarget.style.borderColor = winBlueBorder;
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes win-dot {
          0%, 80%, 100% { transform: scale(0.3); opacity: 0.2; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes win-slide-in {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}