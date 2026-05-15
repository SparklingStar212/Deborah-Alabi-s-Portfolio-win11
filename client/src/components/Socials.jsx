import React from 'react'
import { ExternalLink, ChevronRight } from 'lucide-react'
import '../styles/windows.css'
import GithubIcon from './GithubIcon';
import LinkedinIcon from './LinkedinIcon';
import XIcon from './XIcon';

export default function Socials() {
  const links = [
    { id: 'github', label: 'GitHub', url: 'https://github.com/SparklingStar212', icon: <GithubIcon size={20} />, color: '#ffffff' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/deborah-alabi-3250ba384/', icon: <LinkedinIcon size={20} />, color: '#0077b5' },
    { id: 'twitter', label: 'Twitter', url: 'https://x.com/alabi_debo55272', icon: <XIcon size={20} />, color: '#1da1f2' },
  ]

  const winBlue = '#60cdff'

  return (
    <div style={{ padding: '24px', color: '#fff' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Connected Accounts</h2>

      <div className="socials-list">
        {links.map((l) => (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="social-row-link"
          >
            <div className="social-row-content">
              <div className="social-icon-plate" style={{ color: l.color }}>
                {l.icon}
              </div>
              <div className="social-text">
                <span className="social-label">{l.label}</span>
                <span className="social-description">View my profile on {l.label}</span>
              </div>
            </div>
            <div className="social-row-action">
              <ChevronRight size={18} className="chevron-icon" />
            </div>
          </a>
        ))}
      </div>

      <div className="social-footer-note">
        <ExternalLink size={12} style={{ marginRight: 6 }} />
        <span>Links open in a new browser window</span>
      </div>
    </div>
  )
}