import express from 'express'
import About from '../models/About.js'

const router = express.Router()

// GET /api/about
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne()
    res.json(about || {})
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
