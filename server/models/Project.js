import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tech: { type: [String], default: [] },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Project', ProjectSchema)
