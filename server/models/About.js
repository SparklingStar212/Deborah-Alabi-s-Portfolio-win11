import mongoose from 'mongoose'

const AboutSchema = new mongoose.Schema({
  bio: { type: String },
  skills: { type: [String], default: [] },
  contact: { type: Object, default: {} },
})

export default mongoose.model('About', AboutSchema)
