import express from 'express'
import Contact from '../models/Contact.js'
import nodemailer from 'nodemailer'

const router = express.Router()

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || GMAIL_USER

function createTransport() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_RECEIVER_EMAIL) {
    return null
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })
}

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

    const contact = new Contact({ name, email, message })
    await contact.save()

    const transporter = createTransport()
    if (!transporter) {
      return res.status(500).json({
        error: 'Email delivery is not configured. Set GMAIL_USER, GMAIL_APP_PASSWORD, and CONTACT_RECEIVER_EMAIL in server/.env.',
      })
    }

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${GMAIL_USER}>`,
      to: CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#111827">
          <h2 style="margin:0 0 12px">New contact message</h2>
          <p style="margin:0 0 8px"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong> ${email}</p>
          <div style="margin-top:16px;padding:16px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">
            <strong>Message</strong>
            <p style="white-space:pre-wrap;margin:8px 0 0">${message}</p>
          </div>
        </div>
      `,
    })

    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
