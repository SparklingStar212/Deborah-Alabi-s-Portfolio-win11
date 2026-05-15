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

const aboutSeed = {
  bio: "Hi, I'm Deborah Alabi, a software developer passionate about polished user experiences and practical backend systems.",
  skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'CSS', 'HTML'],
  contact: {
    email: 'deborahalabi49@gmail.com',
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
    // await Project.insertMany(projectSeeds)
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
