import express from 'express'
import Contact from '../models/Contact.js'

const router = express.Router()

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

    const contact = new Contact({ name, email, message })
    await contact.save()

    // TODO: send email notification

    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
