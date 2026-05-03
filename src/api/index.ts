import axios from 'axios'

// 本地开发用 localhost，生产环境用环境变量
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

// Helper to convert _id to id
function convertId(data: any): any {
  if (!data) return data
  if (Array.isArray(data)) {
    return data.map(convertId)
  }
  if (typeof data === 'object') {
    const result: any = {}
    for (const key in data) {
      if (key === '_id') {
        result.id = String(data[key])
      } else if (key === 'id' && data._id) {
        // Already has id, skip _id
      } else {
        result[key] = convertId(data[key])
      }
    }
    return result
  }
  return data
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem('auth_token')
  
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  }

  if (options.body) {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || error.message || 'Request failed')
  }

  const data = await response.json()
  return convertId(data)
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: unknown }>('/auth/login', {
      method: 'POST',
      body: { email, password }
    }),

  register: (email: string, password: string, name?: string) =>
    request<{ token: string; user: unknown }>('/auth/register', {
      method: 'POST',
      body: { email, password, name }
    })
}

// Characters API
export const characterApi = {
  getAll: () =>
    request<{ characters: unknown[] }>('/characters'),

  getOne: (id: string) =>
    request<{ character: unknown }>(`/characters/${id}`),

  create: (data: unknown) =>
    request<{ character: unknown }>('/characters', {
      method: 'POST',
      body: data
    }),

  update: (id: string, data: unknown) =>
    request<{ character: unknown }>(`/characters/${id}`, {
      method: 'PUT',
      body: data
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/characters/${id}`, {
      method: 'DELETE'
    }),

  // Analyze chat history
  analyzeChat: (chatText: string) =>
    request<{
      personality: string
      speakingStyle: string
      importantMemories: string
      goal: 'regret' | 'explain' | 'vent' | 'chat'
    }>('/characters/analyze-chat', {
      method: 'POST',
      body: { chatText }
    })
}

// Conversations API
export const conversationApi = {
  getHistory: (characterId: string) =>
    request<{ conversation: unknown }>(`/conversations/${characterId}`),

  sendMessage: (characterId: string, message: string) =>
    request<{ response: string; conversation: unknown }>('/conversations/message', {
      method: 'POST',
      body: { characterId, message }
    })
}
