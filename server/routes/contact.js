import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router()

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || GMAIL_USER

// Create the transporter ONCE at the module level (Singleton Pattern)
let transporter = null

if (GMAIL_USER && GMAIL_APP_PASSWORD && CONTACT_RECEIVER_EMAIL) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  })
} else {
  // Warn on server startup instead of waiting for a user request to fail
  console.warn('⚠️ Nodemailer Warning: Missing email environment variables in server/.env.')
}

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // 1. Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // 2. Check Configuration Status
    if (!transporter) {
      return res.status(500).json({
        error: 'Email delivery service is currently unavailable. Please try again later.',
      })
    }

    // 3. Dispatch Email
    const info = await transporter.sendMail({
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

    console.log('Gmail delivery succeeded:', info.messageId)
    return res.status(201).json({ success: true })

  } catch (err) {
    // Keep detailed errors safe on your terminal logs
    console.error('Contact submission failed internally:', err)

    // Give the frontend a safe response
    return res.status(500).json({ error: 'Server encountered an error processing your message.' })
  }
})

export default router