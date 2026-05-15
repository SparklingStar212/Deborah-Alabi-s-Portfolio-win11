import express from 'express'
import Project from '../models/Project.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/projects
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, tech = [], githubLink, vercelLink, link } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const project = await Project.create({
      title,
      description,
      tech,
      githubLink: githubLink || link,
      vercelLink,
      link: githubLink || link,
    })

    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/projects/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, description, tech = [], githubLink, vercelLink, link } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        tech,
        githubLink: githubLink || link,
        vercelLink,
        link: githubLink || link,
      },
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/projects/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json({ message: 'Project deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
