<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Moon, Mail, Lock, User, ArrowLeft, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const error = ref('')

async function handleRegister() {
  if (!name.value || !email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await authStore.registerWithEmail(email.value, password.value, name.value)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

function handleGoogleRegister() {
  alert('Google OAuth will be configured during deployment')
}

function handleAppleRegister() {
  alert('Apple Sign-In will be configured during deployment')
}
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Left Side - Decorative -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-background via-background-lighter to-background"></div>
      
      <!-- Decorative Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-moon-gold/30 to-transparent blur-3xl animate-glow"></div>
        
        <div v-for="i in 30" :key="i" 
             class="absolute w-1 h-1 rounded-full bg-white animate-pulse"
             :style="{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               opacity: Math.random() * 0.5 + 0.3,
               animationDelay: `${Math.random() * 3}s`
             }">
        </div>
      </div>

      <div class="relative z-10 flex flex-col justify-center px-16">
        <RouterLink to="/" class="flex items-center gap-3 mb-12">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-6 h-6 text-background" />
          </div>
          <span class="text-2xl font-semibold text-gradient">Echo Moon</span>
        </RouterLink>

        <h1 class="text-4xl font-bold mb-6">
          Begin Your
          <br />
          <span class="text-gradient">New Chapter</span>
        </h1>
        
        <p class="text-text-secondary text-lg max-w-md">
          Start your journey of understanding and closure. Create your first character and rediscover what was left unsaid.
        </p>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <RouterLink to="/" class="lg:hidden flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-5 h-5 text-background" />
          </div>
          <span class="text-xl font-semibold text-gradient">Echo Moon</span>
        </RouterLink>

        <RouterLink to="/" class="inline-flex items-center gap-2 text-text-secondary hover:text-text mb-8 transition-colors">
          <ArrowLeft class="w-4 h-4" />
          Back to Home
        </RouterLink>

        <div class="glass-card p-8">
          <h2 class="text-2xl font-bold mb-2">Create Account</h2>
          <p class="text-text-secondary mb-8">Start your journey of closure and understanding</p>

          <!-- Social Login Buttons -->
          <div class="space-y-3 mb-8">
            <button @click="handleGoogleRegister" class="w-full flex items-center justify-center gap-3 bg-white text-gray-800 rounded-xl px-4 py-3 font-medium hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button @click="handleAppleRegister" class="w-full flex items-center justify-center gap-3 bg-white text-gray-800 rounded-xl px-4 py-3 font-medium hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <div class="relative mb-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/10"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-background-lighter text-text-muted">or register with email</span>
            </div>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Name</label>
              <div class="relative">
                <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  v-model="name"
                  type="text" 
                  placeholder="Your name"
                  class="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="your@email.com"
                  class="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Password</label>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  v-model="password"
                  type="password" 
                  placeholder="Create a password"
                  class="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Confirm Password</label>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  v-model="confirmPassword"
                  type="password" 
                  placeholder="Confirm your password"
                  class="input-field pl-12"
                />
              </div>
            </div>

            <div v-if="error" class="text-functional-error text-sm">
              {{ error }}
            </div>

            <button 
              type="submit" 
              class="btn-primary w-full flex items-center justify-center gap-2"
              :disabled="isLoading"
            >
              <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
              <span v-else>Create Account</span>
            </button>
          </form>

          <p class="text-center mt-6 text-text-secondary">
            Already have an account? 
            <RouterLink to="/login" class="text-primary hover:text-primary-light transition-colors">
              Sign in
            </RouterLink>
          </p>

          <p class="text-center mt-4 text-text-muted text-xs">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
