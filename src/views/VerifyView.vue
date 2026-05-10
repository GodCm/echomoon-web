<script setup lang="ts">
import { useAuth } from '@clerk/vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const { isSignedIn } = useAuth()
const router = useRouter()

onMounted(() => {
  // If user is already signed in, redirect to dashboard
  if (isSignedIn.value) {
    router.push('/dashboard')
  }
})
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient mb-2">Verify Your Email</h1>
        <p class="text-text-secondary">
          Please check your email for the verification code and enter it below.
        </p>
      </div>
      
      <!-- Clerk's SignUp component will handle the verification -->
      <div class="glass-card p-8">
        <!-- This will show the verification step if user came from email link -->
        <SignIn 
          :appearance="{
            elements: {
              formButtonPrimary: 'btn-primary w-full',
              card: 'shadow-none p-0',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden'
            }
          }"
        />
      </div>
      
      <div class="text-center mt-6">
        <RouterLink to="/register" class="text-primary hover:underline">
          Back to Register
        </RouterLink>
      </div>
    </div>
  </div>
</template>
