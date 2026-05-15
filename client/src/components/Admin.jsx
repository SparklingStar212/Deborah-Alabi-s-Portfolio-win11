import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Plus, Save, Trash2, PencilLine } from 'lucide-react'
import { api } from '../services/api'
import { useData } from '../context/DataContext'
import '../styles/windows.css'

const emptyForm = {
  title: '',
  description: '',
  tech: '',
  link: '',
}

export default function Admin() {
  const { projects, loading, error, fetchProjects } = useData()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!projects.length && !loading.projects && !error.projects) {
      fetchProjects()
    }
  }, [projects.length, loading.projects, error.projects, fetchProjects])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const beginEdit = (project) => {
    setEditingId(project._id)
    setForm({
      title: project.title || '',
      description: project.description || '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
      link: project.link || '',
    })
    setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setStatus(null)

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tech: form.tech
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      link: form.link.trim(),
    }

    try {
      if (editingId) {
        await api.updateProject(editingId, payload)
        setStatus('Project updated successfully.')
      } else {
        await api.createProject(payload)
        setStatus('Project created successfully.')
      }

      resetForm()
      await fetchProjects()
    } catch (err) {
      setStatus(err.response?.data?.error || 'Unable to save project.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm('Delete this project?')
    if (!confirmed) return

    setSaving(true)
    setStatus(null)

    try {
      await api.deleteProject(projectId)
      setStatus('Project deleted.')
      await fetchProjects()
      if (editingId === projectId) {
        resetForm()
      }
    } catch (err) {
      setStatus(err.response?.data?.error || 'Unable to delete project.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: 24, color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Project Admin</h2>
          <p style={{ margin: '6px 0 0', color: '#a1a1a1', fontSize: 13 }}>
            Add, edit, and remove portfolio projects from the database.
          </p>
        </div>
        <button
          type="button"
          className="all-apps-btn"
          onClick={() => {
            resetForm()
            setStatus('Admin window locked.')
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <LogOut size={14} />
          Lock admin
        </button>
      </div>

      {status && (
        <div className="win-error-plate" style={{ marginBottom: 16, color: status.includes('success') || status.includes('deleted') ? '#b9f7c8' : '#ff9999' }}>
          {status}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 16, alignItems: 'start' }}>
        <motion.form
          onSubmit={handleSubmit}
          className="project-card"
          style={{ padding: 16, background: 'rgba(255, 255, 255, 0.04)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="project-card-header" style={{ marginBottom: 16 }}>
            <div className="project-icon-wrapper">
              <Plus size={24} color="#60cdff" />
            </div>
            <div style={{ color: '#a1a1a1', fontSize: 12 }}>{editingId ? 'Editing project' : 'New project'}</div>
          </div>

          <div className="field-group" style={{ gap: 12 }}>
            <input
              className="win-input"
              placeholder="Project title"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
            <textarea
              className="win-input"
              placeholder="Project description"
              rows={4}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            />
            <input
              className="win-input"
              placeholder="Technologies, separated by commas"
              value={form.tech}
              onChange={(e) => setForm((prev) => ({ ...prev, tech: e.target.value }))}
            />
            <input
              className="win-input"
              placeholder="Project link"
              value={form.link}
              onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button type="submit" className="win-login-submit" disabled={saving} style={{ position: 'static', transform: 'none', width: 'auto', padding: '0 14px', gap: 8 }}>
              <Save size={16} />
              {editingId ? 'Update' : 'Create'}
            </button>
            {editingId && (
              <button type="button" className="all-apps-btn" onClick={resetForm} disabled={saving}>
                Cancel edit
              </button>
            )}
          </div>
        </motion.form>

        <div className="project-card" style={{ padding: 16, background: 'rgba(255, 255, 255, 0.04)' }}>
          <div className="project-card-header" style={{ marginBottom: 16 }}>
            <div className="project-icon-wrapper">
              <PencilLine size={24} color="#f9d348" />
            </div>
            <div style={{ color: '#a1a1a1', fontSize: 12 }}>{projects.length} project(s)</div>
          </div>

          {loading.projects && <div className="win-loading-shimmer"><div className="win11-loader-dots"><span /><span /><span /></div></div>}

          {!loading.projects && projects.length === 0 && (
            <div style={{ color: '#a1a1a1', fontSize: 13 }}>No projects yet. Create one using the form.</div>
          )}

          <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            {projects.map((project) => (
              <div
                key={project._id}
                className="project-card"
                style={{ padding: 12, background: 'rgba(255, 255, 255, 0.02)' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <h3 className="project-title" style={{ marginBottom: 6 }}>{project.title}</h3>
                    <p style={{ margin: 0, color: '#a1a1a1', fontSize: 13, lineHeight: 1.5 }}>
                      {project.description || 'No description provided.'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" className="all-apps-btn" onClick={() => beginEdit(project)} disabled={saving}>
                      Edit
                    </button>
                    <button type="button" className="all-apps-btn" onClick={() => handleDelete(project._id)} disabled={saving}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {Array.isArray(project.tech) && project.tech.length > 0 && (
                  <div className="project-tech-tags" style={{ marginTop: 10 }}>
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
