import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAuth, useUser } from '@clerk/vue'

// Subscribe to Clerk auth state and sync to this store
export const useAuthStore = defineStore('auth', () => {
  const { isSignedIn, getToken } = useAuth()
  const { user } = useUser()

  // Reactive state derived from Clerk
  const isAuthenticated = computed(() => !!isSignedIn.value)
  const isPro = computed(() => {
    // Check both unsafeMetadata (client-updatable) and publicMetadata (server-only)
    const meta = user.value as any
    const sub = meta?.unsafeMetadata?.subscription || meta?.publicMetadata?.subscription
    return sub === 'pro'
  })

  // Get JWT token for API calls
  async function getAuthToken() {
    // Returns Clerk JWT for backend auth (requires JWT template configured in Clerk)
    const token = await getToken.value?.()
    return token
  }

  // Logout via Clerk
  async function logout() {
    const clerk = window.Clerk
    if (clerk) {
      await clerk.signOut()
    }
  }

  // Update subscription in Clerk unsafeMetadata (keeps frontend in sync)
  async function updateSubscription(subscription: 'free' | 'pro') {
    try {
      await user.value?.update({
        unsafeMetadata: {
          ...((user.value.unsafeMetadata as object) || {}),
          subscription
        }
      })
      // Also update local state immediately for reactivity
      ;(user.value as any).__unsafeMetadata = {
        ...((user.value as any).__unsafeMetadata || {}),
        subscription
      }
    } catch (e) {
      console.error('Failed to update subscription', e)
    }
  }

  // Sync subscription from backend (MongoDB) to local state
  async function syncSubscriptionFromBackend() {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://echomoon-api-production.up.railway.app'
      const token = await getAuthToken()
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        if (data.user?.subscription === 'pro') {
          await updateSubscription('pro')
        }
      }
    } catch (e) {
      console.error('Failed to sync subscription', e)
    }
  }

  return {
    isAuthenticated,
    isPro,
    getAuthToken,
    logout,
    updateSubscription,
    syncSubscriptionFromBackend
  }
})
