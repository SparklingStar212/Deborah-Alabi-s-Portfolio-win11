import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const contactApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))

// API endpoints
export const api = {
  // Auth endpoints
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('token')
    return Promise.resolve()
  },

  // Projects endpoints
  getProjects: () => apiClient.get('/api/projects'),
  createProject: (project) => apiClient.post('/api/projects', project),
  updateProject: (id, project) => apiClient.put(`/api/projects/${id}`, project),
  deleteProject: (id) => apiClient.delete(`/api/projects/${id}`),

  // About endpoints
  getAbout: () => apiClient.get('/api/about'),
  updateAbout: (about) => apiClient.put('/api/about', about),

  // Contact endpoints
  submitContact: (contact) => contactApiClient.post('/api/contact', contact),

  // Test endpoints
  testConnection: () => apiClient.get('/api/test'),
  healthCheck: () => apiClient.get('/health'),
}

export default apiClient
