<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { Moon, Check, ArrowLeft, Crown, Sparkles, MessageCircle, Infinity, Brain } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

function subscribePro() {
  // In production, this would integrate with Stripe
  authStore.updateSubscription('pro')
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-background-lighter/50 backdrop-blur-xl border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <RouterLink to="/dashboard" class="inline-flex items-center gap-2 text-text-secondary hover:text-text transition-colors">
          <ArrowLeft class="w-4 h-4" />
          Back to Dashboard
        </RouterLink>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-6 py-16">
      <!-- Hero -->
      <div class="text-center mb-16">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center mx-auto mb-6 animate-float">
          <Crown class="w-10 h-10 text-background" />
        </div>
        <h1 class="text-4xl font-bold mb-4">Upgrade to Pro</h1>
        <p class="text-text-secondary text-lg max-w-xl mx-auto">
          Unlock unlimited conversations and deeper connections with your past
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Free Plan -->
        <div class="glass-card p-8">
          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Free</h2>
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-bold">$0</span>
              <span class="text-text-muted">/ month</span>
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-functional-success/20 flex items-center justify-center">
                <Check class="w-3 h-3 text-functional-success" />
              </div>
              <span>1 character</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-functional-success/20 flex items-center justify-center">
                <Check class="w-3 h-3 text-functional-success" />
              </div>
              <span>2 messages per day</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-functional-success/20 flex items-center justify-center">
                <Check class="w-3 h-3 text-functional-success" />
              </div>
              <span>200 keyword memory</span>
            </li>
            <li class="flex items-center gap-3 text-text-muted">
              <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <span class="text-xs">✗</span>
              </div>
              <span>AI proactive messages</span>
            </li>
          </ul>

          <div class="py-3 px-4 rounded-xl bg-background text-text-muted text-center">
            Your current plan
          </div>
        </div>

        <!-- Pro Plan -->
        <div class="glass-card p-8 relative overflow-hidden border-primary/50">
          <!-- Popular Badge -->
          <div class="absolute top-0 right-0 bg-gradient-to-r from-moon-gold to-moon-silver text-background text-xs font-semibold px-4 py-1 rounded-bl-xl">
            RECOMMENDED
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
              <Sparkles class="w-5 h-5 text-moon-gold" />
              Pro
            </h2>
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-bold text-gradient">$9.99</span>
              <span class="text-text-muted">/ month</span>
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-moon-gold/20 flex items-center justify-center">
                <Infinity class="w-3 h-3 text-moon-gold" />
              </div>
              <span class="font-medium">Unlimited characters</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-moon-gold/20 flex items-center justify-center">
                <MessageCircle class="w-3 h-3 text-moon-gold" />
              </div>
              <span class="font-medium">Unlimited messages</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-moon-gold/20 flex items-center justify-center">
                <Brain class="w-3 h-3 text-moon-gold" />
              </div>
              <span class="font-medium">1500 word memory</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-moon-gold/20 flex items-center justify-center">
                <Sparkles class="w-3 h-3 text-moon-gold" />
              </div>
              <span class="font-medium">AI proactive messages</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-moon-gold/20 flex items-center justify-center">
                <Crown class="w-3 h-3 text-moon-gold" />
              </div>
              <span class="font-medium">Priority support</span>
            </li>
          </ul>

          <button 
            v-if="!authStore.isPro"
            @click="subscribePro"
            class="w-full btn-primary py-4"
          >
            Upgrade to Pro
          </button>
          <div v-else class="py-3 px-4 rounded-xl bg-gradient-to-r from-moon-gold to-moon-silver text-background text-center font-medium">
            You're already Pro! ✨
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mt-20">
        <h2 class="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div class="max-w-2xl mx-auto space-y-6">
          <div class="glass-card p-6">
            <h3 class="font-semibold mb-2">Can I cancel anytime?</h3>
            <p class="text-text-secondary text-sm">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
          </div>
          
          <div class="glass-card p-6">
            <h3 class="font-semibold mb-2">What is "AI proactive messages"?</h3>
            <p class="text-text-secondary text-sm">Pro subscribers receive occasional thoughtful messages from their AI characters, initiated by the AI itself, to continue the conversation naturally.</p>
          </div>
          
          <div class="glass-card p-6">
            <h3 class="font-semibold mb-2">What happens to my characters if I downgrade?</h3>
            <p class="text-text-secondary text-sm">Your characters are preserved. You'll just be limited to 1 character and 2 messages per day until you upgrade again.</p>
          </div>
          
          <div class="glass-card p-6">
            <h3 class="font-semibold mb-2">Is my data private?</h3>
            <p class="text-text-secondary text-sm">Absolutely. Your conversations are encrypted and private. We never share your personal data with third parties.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
