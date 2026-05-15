import express from 'express'
import About from '../models/About.js'

const router = express.Router()

const fallbackAbout = {
  bio: "Hi, I'm Deborah Alabi, a software developer passionate about polished user experiences and practical backend systems.",
  skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
  contact: {
    email: 'deborah@example.com',
    location: 'Nigeria',
  },
}

// GET /api/about
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne()
    res.json(about || fallbackAbout)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
