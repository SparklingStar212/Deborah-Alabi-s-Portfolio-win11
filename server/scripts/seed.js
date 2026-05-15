import mongoose from 'mongoose'
import dotenv from 'dotenv'
import crypto from 'crypto'
import User from '../models/User.js'
import Project from '../models/Project.js'
import About from '../models/About.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI 
const ADMIN_USERNAME = process.env.ADMIN_USERNAME 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD 
const ADMIN_PASSWORD_SALT = process.env.ADMIN_PASSWORD_SALT 

function hashPassword(password) {
  return crypto.scryptSync(password, ADMIN_PASSWORD_SALT, 64).toString('hex')
}

const projectSeeds = [
  {
    title: 'Windows 11 Portfolio',
    description: 'A desktop-style interactive portfolio built with React and Express.',
    tech: ['React', 'Express', 'MongoDB', 'CSS'],
    link: 'https://github.com/',
  },
  {
    title: 'Student Result Tracker',
    description: 'A simple dashboard for managing student records, results, and class performance.',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/',
  },
  {
    title: 'Task Manager Clone',
    description: 'A productivity app for tracking tasks with categories and status.',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/',
  },
  {
    title: 'Weather Dashboard',
    description: 'A weather analytics dashboard with city search and trend charts.',
    tech: ['React', 'Chart.js', 'REST API'],
    link: 'https://github.com/',
  },
]

const aboutSeed = {
  bio: "Hi, I'm Deborah Alabi, a software developer passionate about polished user experiences and practical backend systems.",
  skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
  contact: {
    email: 'deborah@example.com',
    location: 'Nigeria',
  },
}

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✓ MongoDB connected for seeding')

  const passwordHash = hashPassword(ADMIN_PASSWORD)
  await User.updateOne(
    { username: ADMIN_USERNAME },
    { $set: { username: ADMIN_USERNAME, passwordHash } },
    { upsert: true }
  )

  await About.updateOne({}, { $set: aboutSeed }, { upsert: true })

  const existingProjects = await Project.countDocuments()
  if (existingProjects === 0) {
    await Project.insertMany(projectSeeds)
  }

  console.log('✓ Seed complete')
  console.log(`Admin login stored -> username: ${ADMIN_USERNAME}`)
  await mongoose.disconnect()
}

seed().catch(async (error) => {
  console.error('✗ Seed failed:', error.message)
  await mongoose.disconnect()
  process.exit(1)
})
