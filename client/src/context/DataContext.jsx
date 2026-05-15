import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState({
    projects: false,
    about: false,
  })
  const [error, setError] = useState({
    projects: null,
    about: null,
  })

  // Fetch projects
  const fetchProjects = async () => {
    setLoading((prev) => ({ ...prev, projects: true }))
    setError((prev) => ({ ...prev, projects: null }))
    try {
      const response = await api.getProjects()
      setProjects(response.data || [])
    } catch (err) {
      setError((prev) => ({
        ...prev,
        projects: err.response?.data?.message || 'Failed to load projects',
      }))
      console.error('Error fetching projects:', err)
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }))
    }
  }

  // Fetch about
  const fetchAbout = async () => {
    setLoading((prev) => ({ ...prev, about: true }))
    setError((prev) => ({ ...prev, about: null }))
    try {
      const response = await api.getAbout()
      setAbout(response.data)
    } catch (err) {
      setError((prev) => ({
        ...prev,
        about: err.response?.data?.message || 'Failed to load about info',
      }))
      console.error('Error fetching about:', err)
    } finally {
      setLoading((prev) => ({ ...prev, about: false }))
    }
  }

  // Fetch all data on mount
  useEffect(() => {
    fetchProjects()
    fetchAbout()
  }, [])

  const value = {
    projects,
    about,
    loading,
    error,
    fetchProjects,
    fetchAbout,
    setProjects,
    setAbout,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
