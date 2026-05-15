import React from 'react'
import { useData } from '../context/DataContext'

export default function About() {
  const { about, loading, error } = useData()

  const winBlue = '#60cdff'
  const winBlueMuted = 'rgba(96, 205, 255, 0.08)'
  const winBlueBorder = 'rgba(96, 205, 255, 0.2)'
  const skills = about?.skills || []
  const contact = about?.contact || {}

  const initials = 'DA'

  return (
    <div style={{
      padding: '24px',
      minHeight: '100%',
      fontFamily: '"Segoe UI Variable", "Segoe UI", sans-serif',
      color: '#ffffff'
    }}>

      {loading.about && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '56vh', gap: 12 }}>
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

      {!loading.about && about && (
        <div style={{ animation: 'win-slide-in 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 600, margin: '0 0 6px' }}>About Me</h2>
              <div style={{ width: '56px', height: '3px', background: winBlue, borderRadius: '2px' }} />
            </div>
            <div style={{ color: '#a1a1a1', fontSize: '13px' }}>
              Profile overview
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            alignItems: 'start',
            maxWidth: '1180px',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 18px 40px rgba(0, 0, 0, 0.18)'
            }}>
              <div style={{
                width: '88px',
                height: '88px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(96, 205, 255, 0.28), rgba(37, 100, 235, 0.22))',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'grid',
                placeItems: 'center',
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#ffffff',
                marginBottom: '16px'
              }}>
                {initials}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: 4 }}>Deborah Alabi</div>
              <div style={{ color: '#a1a1a1', fontSize: '13px', lineHeight: 1.5 }}>
                Software developer focused on polished interfaces and practical backend systems.
              </div>

              <div style={{ marginTop: '18px', display: 'grid', gap: '10px' }}>
                <div style={{ padding: '10px 12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', color: '#a1a1a1', marginBottom: 4 }}>Location</div>
                  <div style={{ fontSize: '13px' }}>{contact.location || 'Nigeria'}</div>
                </div>
                <div style={{ padding: '10px 12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', color: '#a1a1a1', marginBottom: 4 }}>Email</div>
                  <div style={{ fontSize: '13px', wordBreak: 'break-word' }}>{contact.email || 'deborah@example.com'}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.18)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Bio</h3>
                  <span style={{ fontSize: '12px', color: '#a1a1a1' }}>{skills.length} skills listed</span>
                </div>
                <p style={{ color: '#d1d1d1', lineHeight: 1.75, fontSize: '14px', margin: 0, maxWidth: '68ch' }}>
                  {about.bio}
                </p>
              </div>

              <div style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.18)'
              }}>
                <h3 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 600 }}>Technical Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      style={{
                        background: winBlueMuted,
                        border: `1px solid ${winBlueBorder}`,
                        padding: '7px 14px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        color: winBlue,
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        boxShadow: '0 8px 18px rgba(0, 0, 0, 0.08)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(96, 205, 255, 0.15)'
                        e.currentTarget.style.borderColor = winBlue
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = winBlueMuted
                        e.currentTarget.style.borderColor = winBlueBorder
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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