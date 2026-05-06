<script setup lang="ts">
import { SignUp } from '@clerk/vue'
import { Moon } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Left Side - Decorative -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-background via-background-lighter to-background"></div>
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-moon-gold/30 to-transparent blur-3xl animate-glow"></div>
      </div>
      <div class="relative z-10 flex flex-col justify-center px-16">
        <div class="flex items-center gap-3 mb-12">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-6 h-6 text-background" />
          </div>
          <span class="text-2xl font-bold text-gradient">Echo Moon</span>
        </div>
        <h1 class="text-4xl font-bold mb-6">
          Begin Your
          <br />
          <span class="text-gradient">New Chapter</span>
        </h1>
        <p class="text-text-secondary text-lg max-w-md">
          Start your journey of understanding and closure. Create your account and rediscover what was left unsaid.
        </p>
      </div>
    </div>

    <!-- Right Side - Clerk Sign Up -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-5 h-5 text-background" />
          </div>
          <span class="text-xl font-bold text-gradient">Echo Moon</span>
        </div>

        <SignUp
          :routing="'path'"
          :path="'/register'"
          :signInUrl="'/login'"
          :redirectUrl="'/dashboard'"
          :appearance="{
            elements: {
              formButtonPrimary: 'btn-primary',
              card: 'glass-card p-8 shadow-none border border-white/10',
              headerTitle: 'text-2xl font-bold text-text',
              headerSubtitle: 'text-text-secondary',
              formFieldLabel: 'text-sm font-medium text-text-secondary',
              formFieldInput: 'input-field',
              footerActionText: 'text-text-secondary',
              footerActionLink: 'text-primary hover:text-primary-light',
              dividerText: 'text-text-muted',
              socialButtonsBlockButton: 'bg-white/5 border-white/10 text-text hover:bg-white/10',
              formFieldInputShowPasswordButton: 'text-text-muted'
            }
          }"
        />
      </div>
    </div>
  </div>
</template>
