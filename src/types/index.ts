// User types
export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  provider: 'google' | 'apple' | 'email'
  subscription: 'free' | 'pro'
  createdAt: string
}

// Character types
export type CharacterGoal = 'regret' | 'explain' | 'vent' | 'chat'

export interface Character {
  id: string
  userId: string
  name: string
  avatar: string
  gender: 'male' | 'female' | 'other'
  goal: CharacterGoal
  personality: string
  storyMemories: string
  reasonForSeparation: string
  speakingStyleCatchphrases: string
  importantMemories: string
  forbiddenTopics: string
  dateMet?: string
  anniversary?: string
  breakupDate?: string
  theirBirthday?: string
  myBirthday?: string
  whatTheyAreLike: string
  createdAt: string
  updatedAt: string
}

// Message types
export interface Message {
  id: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

// Conversation types
export interface Conversation {
  id: string
  characterId: string
  userId: string
  messages: Message[]
  keywordMemory: string[]
  lastUpdated: string
  createdAt: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
}

export interface AuthResponse {
  token: string
  user: User
}

// Subscription types
export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
}
