import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_SALT = process.env.ADMIN_PASSWORD_SALT;

function hashPassword(password) {
  return crypto.scryptSync(password, ADMIN_PASSWORD_SALT, 64).toString('hex');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
import projectsRouter from './routes/projects.js'
import aboutRouter from './routes/about.js'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'

app.use('/api/projects', projectsRouter)
app.use('/api/about', aboutRouter)
app.use('/api/contact', contactRouter)
app.use('/auth', authRouter)

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    // Ensure the admin account exists in MongoDB without a signup flow.
    import('./models/User.js').then(async ({ default: User }) => {
      const hash = hashPassword(ADMIN_PASSWORD)
      await User.updateOne(
        { username: ADMIN_USERNAME },
        { $set: { username: ADMIN_USERNAME, passwordHash: hash } },
        { upsert: true }
      )
      console.log(`Admin user ready -> username: ${ADMIN_USERNAME}`)
    }).catch(() => { })
  })
  .catch((error) => {
    console.error('✗ MongoDB connection failed:', error.message);
  });

// Routes
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
});
