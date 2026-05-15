import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const router = express.Router()

const PASSWORD_SALT = process.env.ADMIN_PASSWORD_SALT || 'win11-portfolio-admin-salt'

function hashPassword(password) {
  return crypto.scryptSync(password, PASSWORD_SALT, 64).toString('hex')
}

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ error: 'Missing credentials' })

    const user = await User.findOne({ username })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const ok = user.passwordHash === hashPassword(password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
