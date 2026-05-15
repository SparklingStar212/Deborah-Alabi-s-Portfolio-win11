import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, User } from 'lucide-react'
import '../styles/windows.css'
import { api } from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setToken } = useContext(AuthContext)

  const winBlue = '#60cdff'

  const submit = async (e) => {
    if (e) e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await api.login({ username, password })
      const { token } = res.data
      localStorage.setItem('token', token)
      setToken(token)
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="win-login-container"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.05, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="login-content">
        {/* User Avatar Section */}
        <div className="login-profile">
          <div className="avatar-circle">
            <User size={64} color="white" strokeWidth={1} />
          </div>
          <h2 className="login-username">{username || "User"}</h2>
        </div>

        <form onSubmit={submit} className="login-form">
          <div className="input-group">
            <input
              className="win-login-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoFocus
            />
            {/* The Submit Arrow inside the input like Windows */}
            <button
              type="submit"
              className="win-login-submit"
              disabled={loading || !password}
            >
              <ArrowRight size={18} color="white" />
            </button>
          </div>

          <div className="login-options">
            <span onClick={() => alert('Forgot password?')}>I forgot my password</span>
            <span>Sign-in options</span>
          </div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="login-error"
          >
            {error}
          </motion.div>
        )}

        {loading && <div className="win11-loader-dots"><span></span><span></span><span></span></div>}
      </div>
    </motion.div>
  )
}