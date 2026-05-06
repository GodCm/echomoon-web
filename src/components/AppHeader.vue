<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ClerkLoaded, UserButton, useAuth } from '@clerk/vue'
import { Moon } from 'lucide-vue-next'
import { computed } from 'vue'

const { isSignedIn } = useAuth()
const router = useRouter()

const isAuthenticated = computed(() => !!isSignedIn.value)
</script>

<template>
  <ClerkLoaded>
    <header class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-4 h-4 text-background" />
          </div>
          <span class="text-lg font-semibold text-gradient">Echo Moon</span>
        </RouterLink>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <template v-if="!isAuthenticated">
            <div class="flex items-center gap-3">
              <RouterLink
                to="/login"
                class="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Sign in
              </RouterLink>
              <RouterLink
                to="/register"
                class="btn-primary text-sm px-4 py-2"
              >
                Sign up
              </RouterLink>
            </div>
          </template>

          <template v-else>
            <div class="flex items-center gap-3">
              <RouterLink
                to="/dashboard"
                class="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Dashboard
              </RouterLink>
              <UserButton
                :appearance="{
                  elements: {
                    avatarBox: 'w-8 h-8',
                    userButtonBox: 'focus:shadow-none hover:opacity-80',
                    userButtonTrigger: 'focus:shadow-none'
                  }
                }"
              />
            </div>
          </template>
        </div>
      </div>
    </header>

    <!-- Spacer -->
    <div class="h-16"></div>
  </ClerkLoaded>
</template>
