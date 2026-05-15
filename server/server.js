import dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); // Explicitly fires first to beat the network error

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_SALT = process.env.ADMIN_PASSWORD_SALT;

const aboutSeed = {
  bio: "Hi, I'm Deborah Alabi, a software developer passionate about polished user experiences and practical backend systems.",
  skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
  contact: {
    email: 'deborah@example.com',
    location: 'Nigeria',
  },
};

function hashPassword(password) {
  return crypto.scryptSync(password, ADMIN_PASSWORD_SALT, 64).toString('hex');
}

// Global Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Standard Status Routes
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Asynchronous Startup Sequence
async function startServer() {
  try {
    // 1. Dynamically load routes AFTER DNS prioritizing rules are set
    const { default: projectsRouter } = await import('./routes/projects.js');
    const { default: aboutRouter } = await import('./routes/about.js');
    const { default: contactRouter } = await import('./routes/contact.js');
    const { default: authRouter } = await import('./routes/auth.js');

    // 2. Attach Router Handlers
    app.use('/api/projects', projectsRouter);
    app.use('/api/about', aboutRouter);
    app.use('/api/contact', contactRouter);
    app.use('/auth', authRouter);

    // 3. Fallback Route Mapping
    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });

    app.use((err, req, res, next) => {
      console.error('Error Exception Caught:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    // 4. Establish Persistent Storage Connection
    await mongoose.connect(MONGODB_URI);
    console.log('✓ MongoDB connected successfully');

    // 5. Build Core Database Records
    try {
      const { default: User } = await import('./models/User.js');
      const hash = hashPassword(ADMIN_PASSWORD);
      await User.updateOne(
        { username: ADMIN_USERNAME },
        { $set: { username: ADMIN_USERNAME, passwordHash: hash } },
        { upsert: true }
      );
      console.log(`Admin user ready -> username: ${ADMIN_USERNAME}`);
    } catch (err) {
      console.error('✗ User compilation failed during seed:', err.message);
    }

    try {
      const { default: About } = await import('./models/About.js');
      await About.updateOne({}, { $set: aboutSeed }, { upsert: true });
      console.log('About profile ready in MongoDB');
    } catch (err) {
      console.error('✗ Profiling component failed during seed:', err.message);
    }

    // 6. Start Receiving Connections
    app.listen(PORT, () => {
      console.log(`✓ Server is successfully running on port ${PORT}`);
    });

  } catch (initializationError) {
    console.error('✗ Runtime framework failed to start cleanly:', initializationError);
    process.exit(1);
  }
}

// Execute the server startup
startServer();