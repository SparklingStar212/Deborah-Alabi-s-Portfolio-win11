import React from 'react'
import { useData } from '../context/DataContext'
import { Folder, ExternalLink, Code2 } from 'lucide-react'
import '../styles/windows.css'

export default function Projects() {
  const { projects, loading, error } = useData()

  const sampleProject = {
    _id: 'sample-project',
    title: 'Windows 11 Portfolio',
    description: 'A desktop-style interactive portfolio built with React, Express, and MongoDB.',
    tech: ['React', 'Express', 'MongoDB', 'CSS'],
    link: 'https://github.com/',
  }

  // Theme Constants
  const theme = {
    accent: '#60cdff',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    cardHover: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1a1'
  }

  return (
    <div style={{ padding: '24px', color: theme.textPrimary }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Projects</h2>

      {loading.projects && (
        <div className="win-loading-shimmer">
          <div className="win11-loader-dots"><span></span><span></span><span></span></div>
          <p style={{ fontSize: '13px', color: theme.textSecondary }}>Searching files...</p>
        </div>
      )}

      {error.projects && (
        <div className="win-error-plate">{error.projects}</div>
      )}

      {!loading.projects && !error.projects && projects.length === 0 && (
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-card-header">
              <div className="project-icon-wrapper">
                <Folder size={24} color="#f9d348" fill="#f9d348" fillOpacity={0.2} />
              </div>
              <a
                href={sampleProject.link}
                target="_blank"
                rel="noreferrer"
                className="project-link-icon"
              >
                <ExternalLink size={14} color={theme.accent} />
              </a>
            </div>

            <div className="project-info">
              <h3 className="project-title">{sampleProject.title}</h3>
              <p style={{ margin: '0 0 12px', color: theme.textSecondary, fontSize: '13px', lineHeight: 1.5 }}>
                {sampleProject.description}
              </p>
              <div className="project-tech-tags">
                {sampleProject.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading.projects && projects.length > 0 && (
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p._id} className="project-card">
              <div className="project-card-header">
                <div className="project-icon-wrapper">
                  <Folder size={24} color="#f9d348" fill="#f9d348" fillOpacity={0.2} />
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-icon"
                >
                  <ExternalLink size={14} color={theme.accent} />
                </a>
              </div>

              <div className="project-info">
                <h3 className="project-title">{p.title}</h3>
                {p.description && (
                  <p style={{ margin: '0 0 12px', color: theme.textSecondary, fontSize: '13px', lineHeight: 1.5 }}>
                    {p.description}
                  </p>
                )}
                {p.tech && (
                  <div className="project-tech-tags">
                    {p.tech.map((t, index) => (
                      <span key={index} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}