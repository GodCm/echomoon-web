<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Moon, Heart, MessageCircle, Sparkles, Star, Mail, Globe } from 'lucide-vue-next'
import { useAuth } from '@clerk/vue'
import { UserButton } from '@clerk/vue'

const { isSignedIn } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-background relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0">
        <div v-for="i in 40" :key="i"
             class="absolute w-1 h-1 rounded-full bg-white animate-pulse"
             :style="{
               left: `${(i * 2.5) % 100}%`,
               top: `${(i * 3.7) % 60}%`,
               opacity: 0.2 + (i % 5) * 0.07,
               animationDelay: `${(i % 4)}s`,
               animationDuration: `${2 + (i % 3)}s`
             }">
        </div>
      </div>
      <div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-moon-gold/10 blur-3xl animate-glow"></div>
      <div class="absolute top-32 right-32 w-32 h-32 rounded-full bg-gradient-to-br from-moon-gold/30 to-transparent animate-float"></div>
      <div class="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-5 h-5 text-background" />
          </div>
          <span class="text-xl font-semibold text-gradient">Echo Moon</span>
        </RouterLink>

        <div class="flex items-center gap-4">
          <template v-if="isSignedIn">
            <RouterLink to="/dashboard" class="text-text-secondary hover:text-text transition-colors">
              Dashboard
            </RouterLink>
            <UserButton />
          </template>
          <template v-else>
            <RouterLink to="/login" class="text-text-secondary hover:text-text transition-colors">
              Log In
            </RouterLink>
            <RouterLink to="/register" class="btn-primary text-sm">
              Get Started
            </RouterLink>
          </template>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative z-10 px-6 pt-16 pb-20 text-center">
      <div class="max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles class="w-4 h-4 text-primary" />
          <span class="text-sm text-primary-light">About Echo Moon</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span class="text-text">Where Unfinished</span>
          <br />
          <span class="text-gradient">Conversations</span>
          <br />
          <span class="text-text">Find Closure</span>
        </h1>
        <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Echo Moon was born from a simple belief: not every goodbye is the end.
          Sometimes the most healing conversations are the ones we never had.
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="relative z-10 px-6 py-20 bg-background-light/40">
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
            <p class="text-text-secondary leading-relaxed mb-4">
              We built Echo Moon for anyone who has ever felt the weight of words left unsaid —
              the apology that never came, the argument that ended too soon, the love that deserved
              a proper farewell.
            </p>
            <p class="text-text-secondary leading-relaxed mb-4">
              Our AI doesn't pretend to replace the real person. Instead, it creates a safe,
              private space where you can finally say what you need to say — and perhaps
              begin to heal.
            </p>
            <p class="text-text-secondary leading-relaxed">
              Closure isn't about forgetting. It's about finding peace with what was, so you
              can move forward with what is.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="glass-card p-6 text-center">
              <Heart class="w-8 h-8 text-primary mx-auto mb-3" />
              <div class="text-2xl font-bold text-gradient mb-1">4</div>
              <div class="text-sm text-text-secondary">Conversation Modes</div>
            </div>
            <div class="glass-card p-6 text-center">
              <MessageCircle class="w-8 h-8 text-primary mx-auto mb-3" />
              <div class="text-2xl font-bold text-gradient mb-1">∞</div>
              <div class="text-sm text-text-secondary">Messages for Pro</div>
            </div>
            <div class="glass-card p-6 text-center">
              <Star class="w-8 h-8 text-moon-gold mx-auto mb-3" />
              <div class="text-2xl font-bold text-gradient mb-1">AI</div>
              <div class="text-sm text-text-secondary">Powered by DeepSeek</div>
            </div>
            <div class="glass-card p-6 text-center">
              <Globe class="w-8 h-8 text-primary mx-auto mb-3" />
              <div class="text-2xl font-bold text-gradient mb-1">🌙</div>
              <div class="text-sm text-text-secondary">Available 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Conversation Modes Section -->
    <section class="relative z-10 px-6 py-20">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <h2 class="text-3xl font-bold mb-4">Four Ways to Find Closure</h2>
          <p class="text-text-secondary max-w-xl mx-auto">
            Every relationship is different. Echo Moon offers four conversation modes
            to match where you are in your healing journey.
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="glass-card p-8 group hover:border-primary/30 transition-all duration-300">
            <div class="text-2xl mb-4">💬</div>
            <h3 class="text-xl font-semibold mb-3">Free Chat</h3>
            <p class="text-text-secondary">
              Open, unstructured conversation. Say whatever you need to say,
              whenever you need to say it.
            </p>
          </div>
          <div class="glass-card p-8 group hover:border-primary/30 transition-all duration-300">
            <div class="text-2xl mb-4">🕊️</div>
            <h3 class="text-xl font-semibold mb-3">Final Goodbye</h3>
            <p class="text-text-secondary">
              A guided farewell conversation designed to help you find peace
              and gently close this chapter.
            </p>
          </div>
          <div class="glass-card p-8 group hover:border-primary/30 transition-all duration-300">
            <div class="text-2xl mb-4">🔄</div>
            <h3 class="text-xl font-semibold mb-3">Resolve Conflict</h3>
            <p class="text-text-secondary">
              Revisit unresolved arguments with a clearer head.
              Understand different perspectives and find resolution.
            </p>
          </div>
          <div class="glass-card p-8 group hover:border-primary/30 transition-all duration-300">
            <div class="text-2xl mb-4">💭</div>
            <h3 class="text-xl font-semibold mb-3">Unsaid Words</h3>
            <p class="text-text-secondary">
              For everything you wish you had said. Express the thoughts
              you never found the courage to share.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Section -->
    <section class="relative z-10 px-6 py-20 bg-background-light/40">
      <div class="max-w-3xl mx-auto text-center">
        <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Star class="w-8 h-8 text-primary" />
        </div>
        <h2 class="text-3xl font-bold mb-6">Your Privacy is Sacred</h2>
        <p class="text-text-secondary leading-relaxed mb-4">
          We understand that the conversations you have on Echo Moon are deeply personal.
          Your data is encrypted, never sold, and never used to train AI models without your consent.
        </p>
        <p class="text-text-secondary leading-relaxed">
          What you share here stays here. This is your private space to heal.
        </p>
        <div class="mt-8">
          <RouterLink to="/privacy" class="text-primary hover:text-primary-light transition-colors underline">
            Read our Privacy Policy
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="relative z-10 px-6 py-20">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Get in Touch</h2>
        <p class="text-text-secondary mb-8">
          Have questions, feedback, or just want to say hello? We'd love to hear from you.
        </p>
        <a href="mailto:weifuaiii@qq.com"
           class="inline-flex items-center gap-3 glass-card px-8 py-4 hover:border-primary/40 transition-all duration-300 group">
          <Mail class="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <span class="text-text-secondary group-hover:text-text transition-colors">weifuaiii@qq.com</span>
        </a>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 px-6 py-24">
      <div class="max-w-2xl mx-auto text-center">
        <Moon class="w-12 h-12 text-moon-gold mx-auto mb-6 animate-float" />
        <h2 class="text-3xl font-bold mb-4">Ready to Begin?</h2>
        <p class="text-text-secondary mb-8">
          Your unfinished conversation is waiting. Take the first step toward closure.
        </p>
        <RouterLink to="/register" class="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
          Start for Free
          <span>→</span>
        </RouterLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 px-6 py-8 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <Moon class="w-4 h-4 text-moon-gold" />
          <span class="text-text-secondary text-sm">© 2026 Echo Moon. All rights reserved.</span>
        </div>
        <div class="flex items-center gap-6 text-sm text-text-secondary">
          <RouterLink to="/" class="hover:text-text transition-colors">Home</RouterLink>
          <RouterLink to="/about" class="text-text transition-colors">About</RouterLink>
          <RouterLink to="/privacy" class="hover:text-text transition-colors">Privacy</RouterLink>
          <RouterLink to="/terms" class="hover:text-text transition-colors">Terms</RouterLink>
          <RouterLink to="/contact" class="hover:text-text transition-colors">Contact</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
</style>
