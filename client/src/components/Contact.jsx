import React, { useState } from 'react'
import { api } from '../services/api'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  // Windows 11 Dark Mode Theme Constants
  const theme = {
    accent: '#60cdff',
    inputBg: 'rgba(255, 255, 255, 0.06)',
    inputHover: 'rgba(255, 255, 255, 0.09)',
    border: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1a1'
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      await api.submitContact({ name, email, message })
      setStatus({ ok: true, msg: 'Message sent successfully!' })
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      setStatus({ ok: false, msg: err.response?.data?.error || err.message })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    background: theme.inputBg,
    border: `1px solid ${theme.border}`,
    borderBottom: '1px solid rgba(255, 255, 255, 0.4)', // The classic Win11 bottom-heavy border
    borderRadius: '4px',
    color: theme.textPrimary,
    fontSize: '14px',
    outline: 'none',
    fontFamily: '"Segoe UI Variable", "Segoe UI", sans-serif',
    transition: 'all 0.2s ease'
  }

  return (
    <div style={{ padding: '24px', maxWidth: '500px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', color: theme.textPrimary }}>
        Contact Support
      </h2>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Name Field */}
        <div className="field-group">
          <label style={{ display: 'block', fontSize: '14px', color: theme.textPrimary, marginBottom: '8px' }}>
            Full Name
          </label>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
            className="win-input"
          />
        </div>

        {/* Email Field */}
        <div className="field-group">
          <label style={{ display: 'block', fontSize: '14px', color: theme.textPrimary, marginBottom: '8px' }}>
            Email address
          </label>
          <input
            placeholder="username@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            className="win-input"
          />
        </div>

        {/* Message Field */}
        <div className="field-group">
          <label style={{ display: 'block', fontSize: '14px', color: theme.textPrimary, marginBottom: '8px' }}>
            Message
          </label>
          <textarea
            placeholder="How can we help?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
            className="win-input"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '6px 32px',
              background: theme.accent,
              color: '#000', // Win11 primary buttons usually have dark text on bright accent
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>

          {loading && <div className="win-spinner-small"></div>}
        </div>
      </form>

      {status && (
        <div style={{
          marginTop: '24px',
          padding: '12px 16px',
          borderRadius: '4px',
          fontSize: '13px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderLeft: `4px solid ${status.ok ? '#6ccb5f' : '#ff9999'}`,
          color: status.ok ? '#6ccb5f' : '#ff9999',
          animation: 'win-slide-up 0.3s ease-out'
        }}>
          {status.msg}
        </div>
      )}

      {/* Embedded Styles for pseudo-classes */}
      <style>{`
        .win-input:hover {
          background: ${theme.inputHover} !important;
        }
        .win-input:focus {
          background: ${theme.inputBg} !important;
          border-bottom: 2px solid ${theme.accent} !important;
        }
        @keyframes win-slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .win-spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top: 2px solid ${theme.accent};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}