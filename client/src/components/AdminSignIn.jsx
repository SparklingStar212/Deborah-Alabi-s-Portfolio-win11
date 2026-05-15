import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react'
import { api } from '../services/api'
import { AuthContext } from '../context/AuthContext'
import '../styles/windows.css'

export default function AdminSignIn({ onSuccess, onCancel }) {
  const { setToken } = useContext(AuthContext)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.login(credentials)
      const token = response.data?.token

      if (token) {
        localStorage.setItem('token', token)
        setToken(token)
      }

      onSuccess?.()
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid admin credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-launch-overlay">
      <motion.form
        onSubmit={handleSubmit}
        className="project-card admin-launch-panel"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <div className="project-card-header" style={{ marginBottom: 16 }}>
          <div className="project-icon-wrapper">
            <Lock size={24} color="#60cdff" />
          </div>
          <div className="admin-launch-kicker">Admin sign-in required</div>
        </div>

        <p className="admin-launch-copy">
          Enter your admin credentials to unlock project management.
        </p>

        <div className="field-group" style={{ gap: 12 }}>
          <input
            className="win-input"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
            autoComplete="username"
            required
          />
          <div className="admin-password-field">
            <input
              className="win-input admin-password-input"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="admin-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button
            type="submit"
            className="win-login-submit"
            disabled={loading}
            style={{ position: 'static', transform: 'none', width: 'auto', padding: '0 14px', gap: 8 }}
          >
            <Lock size={16} />
            {loading ? 'Checking...' : 'Unlock'}
          </button>
          <button
            type="button"
            className="all-apps-btn"
            onClick={onCancel}
            disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <ArrowLeft size={14} />
            Cancel
          </button>
        </div>

        {error && (
          <div className="win-error-plate" style={{ marginTop: 16 }}>
            {error}
          </div>
        )}
      </motion.form>
    </div>
  )
}