<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Moon, Heart, MessageCircle, Sparkles, Star, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-background relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Stars -->
      <div class="absolute inset-0">
        <div v-for="i in 50" :key="i" 
             class="absolute w-1 h-1 rounded-full bg-white animate-pulse"
             :style="{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 60}%`,
               opacity: Math.random() * 0.5 + 0.2,
               animationDelay: `${Math.random() * 3}s`,
               animationDuration: `${Math.random() * 2 + 2}s`
             }">
        </div>
      </div>
      
      <!-- Moon Glow -->
      <div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-moon-gold/10 blur-3xl animate-glow"></div>
      <div class="absolute top-32 right-32 w-32 h-32 rounded-full bg-gradient-to-br from-moon-gold/40 to-transparent animate-float"></div>
      
      <!-- Gradient Orbs -->
      <div class="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div class="absolute top-1/3 left-10 w-64 h-64 rounded-full bg-moon-silver/5 blur-3xl"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-5 h-5 text-background" />
          </div>
          <span class="text-xl font-semibold text-gradient">Echo Moon</span>
        </div>
        
        <div class="flex items-center gap-4">
          <RouterLink to="/login" class="text-text-secondary hover:text-text transition-colors">
            Log In
          </RouterLink>
          <RouterLink to="/register" class="btn-primary text-sm">
            Get Started
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative z-10 px-6 pt-20 pb-32">
      <div class="max-w-4xl mx-auto text-center animate-stagger">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles class="w-4 h-4 text-primary" />
          <span class="text-sm text-primary-light">AI-Powered Conversations</span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span class="text-text">Continue the</span>
          <br />
          <span class="text-gradient">Conversation</span>
          <br />
          <span class="text-text">That Never Ended</span>
        </h1>

        <!-- Subheadline -->
        <p class="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          Whether it was goodbye, a misunderstanding, or words left unsaid — 
          Echo Moon helps you have the conversations you never finished.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink to="/register" class="btn-primary flex items-center gap-2 text-lg px-8 py-4">
            Begin Your Journey
            <ArrowRight class="w-5 h-5" />
          </RouterLink>
          <a href="#about" class="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
            Learn More
          </a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="relative z-10 px-6 py-24 bg-background-light/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">How It Works</h2>
          <p class="text-text-secondary text-lg max-w-xl mx-auto">
            Create a digital memory of your past relationship and let AI help you find closure
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-300">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Heart class="w-8 h-8 text-primary" />
            </div>
            <div class="text-moon-gold font-semibold mb-2">Step 1</div>
            <h3 class="text-xl font-semibold mb-3">Create Your Character</h3>
            <p class="text-text-secondary">
              Share the story, personality, and memories of your past relationship. Tell us who they were.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-300">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle class="w-8 h-8 text-primary" />
            </div>
            <div class="text-moon-gold font-semibold mb-2">Step 2</div>
            <h3 class="text-xl font-semibold mb-3">Start the Dialogue</h3>
            <p class="text-text-secondary">
              Engage in meaningful conversations with an AI that captures their unique voice and mannerisms.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-300">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Sparkles class="w-8 h-8 text-primary" />
            </div>
            <div class="text-moon-gold font-semibold mb-2">Step 3</div>
            <h3 class="text-xl font-semibold mb-3">Find Your Closure</h3>
            <p class="text-text-secondary">
              Express what you never could, understand what you didn't, and finally say goodbye — or hello again.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 px-6 py-24">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div>
            <h2 class="text-4xl font-bold mb-6">
              A Safe Space for
              <span class="text-gradient">Unfinished Stories</span>
            </h2>
            <p class="text-text-secondary text-lg mb-8 leading-relaxed">
              Echo Moon isn't about moving on or moving backward — it's about finding peace with what was. 
              Our AI learns from the details you share, creating a respectful space for reflection and dialogue.
            </p>
            
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-6 h-6 rounded-full bg-functional-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Star class="w-4 h-4 text-functional-success" />
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Personalized Experience</h4>
                  <p class="text-text-secondary text-sm">Every character is unique, shaped by your memories and stories.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-6 h-6 rounded-full bg-functional-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Star class="w-4 h-4 text-functional-success" />
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Privacy First</h4>
                  <p class="text-text-secondary text-sm">Your conversations are private and encrypted. You're in control.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-6 h-6 rounded-full bg-functional-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Star class="w-4 h-4 text-functional-success" />
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Therapeutic Approach</h4>
                  <p class="text-text-secondary text-sm">Designed with emotional wellbeing in mind, not just technology.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Visual -->
          <div class="relative">
            <div class="glass-card p-8 relative">
              <!-- Chat Preview -->
              <div class="space-y-4">
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex-shrink-0"></div>
                  <div class="bg-background-lighter rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                    <p class="text-sm text-text-secondary">Hey... it's been a while. I was thinking about that time we watched the sunrise together.</p>
                  </div>
                </div>
                <div class="flex gap-3 justify-end">
                  <div class="bg-primary/20 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                    <p class="text-sm">I remember that morning. The sky was painted in colors I've never seen before.</p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex-shrink-0"></div>
                  <div class="bg-background-lighter rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                    <p class="text-sm text-text-secondary">Sometimes I wonder what we could've been...</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Decorative Elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-xl"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-moon-gold/10 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 px-6 py-24">
      <div class="max-w-3xl mx-auto text-center">
        <div class="glass-card p-12 relative overflow-hidden">
          <!-- Background Glow -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-moon-gold/10"></div>
          
          <div class="relative z-10">
            <Moon class="w-16 h-16 text-moon-gold mx-auto mb-6" />
            <h2 class="text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p class="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Start your journey of understanding and closure. Create your first character today.
            </p>
            <RouterLink to="/register" class="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
              Start Your Journey
              <ArrowRight class="w-5 h-5" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="relative z-10 px-6 py-12">
      <div class="max-w-3xl mx-auto">
        <div class="bg-moon-gold/5 border border-moon-gold/20 rounded-xl p-6 text-center">
          <p class="text-sm text-text-secondary leading-relaxed">
            <span class="text-moon-gold font-medium">⚠️ Important:</span>
            Echo Moon is designed for <span class="text-text font-medium">entertainment and reflection</span> purposes only.
            It is <span class="text-text font-medium">not a substitute</span> for professional mental health services, therapy, or counseling.
            If you're experiencing emotional distress, please reach out to a qualified mental health professional.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 px-6 py-8 border-t border-white/5">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-text-secondary text-sm">
          <Moon class="w-4 h-4" />
          <span>Echo Moon — Continue the Conversation</span>
        </div>
        <div class="flex items-center gap-6 text-sm text-text-muted">
          <RouterLink to="/privacy" class="hover:text-text-secondary transition-colors">Privacy</RouterLink>
          <RouterLink to="/terms" class="hover:text-text-secondary transition-colors">Terms</RouterLink>
          <RouterLink to="/contact" class="hover:text-text-secondary transition-colors">Contact</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
