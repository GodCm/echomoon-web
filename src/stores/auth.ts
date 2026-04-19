import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { authApi } from '@/api'

function getStoredUser(): User | null {
  const stored = localStorage.getItem('auth_user')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(getStoredUser())
  const token = ref<string | null>(localStorage.getItem('auth_token'))

  const isAuthenticated = computed(() => !!token.value)
  const isPro = computed(() => user.value?.subscription === 'pro')

  function setAuth(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('auth_token', newToken)
    localStorage.setItem('auth_user', JSON.stringify(newUser))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  async function loginWithEmail(email: string, password: string) {
    const result = await authApi.login(email, password)
    setAuth(result.token, result.user as User)
    return result
  }

  async function registerWithEmail(email: string, password: string, name?: string) {
    const result = await authApi.register(email, password, name)
    setAuth(result.token, result.user as User)
    return result
  }

  function updateSubscription(subscription: 'free' | 'pro') {
    if (user.value) {
      user.value.subscription = subscription
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isPro,
    loginWithEmail,
    registerWithEmail,
    logout,
    updateSubscription
  }
})
