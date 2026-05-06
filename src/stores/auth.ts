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
    const pub = (user.value?.publicMetadata as any)?.subscription
    return pub === 'pro'
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
    } catch (e) {
      console.error('Failed to update subscription', e)
    }
  }

  return {
    isAuthenticated,
    isPro,
    getAuthToken,
    logout,
    updateSubscription
  }
})
