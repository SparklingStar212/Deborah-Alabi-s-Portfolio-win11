import express from 'express'

const router = express.Router()

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // 1. Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!RESEND_API_KEY || !CONTACT_RECEIVER_EMAIL) {
      return res.status(500).json({
        error: 'Email service configuration is missing on the server.',
      })
    }

    // 2. Dispatch via standard HTTP POST (Bypasses Render's port blocks entirely)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Form <onboarding@resend.dev>', // Resend's default free sandbox sender
        to: CONTACT_RECEIVER_EMAIL, // Your personal inbox email
        reply_to: email, // The visitor's email so you can hit "Reply" in your inbox
        subject: `New contact message from ${name}`,
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
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Resend API returned an error status.')
    }

    console.log('Email successfully routed via Resend HTTP API')
    return res.status(201).json({ success: true })

  } catch (err) {
    console.error('Contact submission failed:', err)
    return res.status(500).json({ error: err.message })
  }
})

export default router