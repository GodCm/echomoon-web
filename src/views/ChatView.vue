<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { Moon, Send, ArrowLeft, Trash2, Sparkles } from 'lucide-vue-next'
import { conversationApi } from '@/api'

const route = useRoute()
const router = useRouter()
const characterStore = useCharacterStore()
const authStore = useAuthStore()

const messageInput = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const errorMessage = ref('')

const characterId = computed(() => route.params.id as string)
const isFree = computed(() => !authStore.isPro)
const dailyLimit = 10
const usedMessages = computed(() => {
  // Count user messages only
  return characterStore.messages.filter(m => m.role === 'user').length
})
const remainingMessages = computed(() => Math.max(0, dailyLimit - usedMessages.value))

onMounted(async () => {
  await characterStore.getCharacter(characterId.value)
  characterStore.clearMessages()
  
  if (characterStore.currentCharacter) {
    // Load conversation history
    try {
      const result = await conversationApi.getHistory(characterId.value)
      if (result.conversation && (result.conversation as any).messages) {
        const historyMessages = (result.conversation as any).messages
        for (const msg of historyMessages) {
          characterStore.addMessage({
            role: msg.role,
            content: msg.content
          })
        }
        scrollToBottom()
        return
      }
    } catch (e) {
      // No history yet, show welcome message
    }
    
    const goal = characterStore.currentCharacter.goal || 'chat'
    const welcomeMessages = {
      regret: "I didn't expect to hear from you... but I'm listening.",
      explain: "You wanted to talk? I always wondered what you'd say.",
      vent: "Oh great, here we go again... okay, I'm listening.",
      chat: "Hey... this is unexpected. What's up?"
    }
    
    characterStore.addMessage({
      role: 'assistant',
      content: welcomeMessages[goal as keyof typeof welcomeMessages] || welcomeMessages.chat
    })
  }
})

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

async function sendMessage() {
  if (!messageInput.value.trim() || isTyping.value) return
  
  errorMessage.value = ''
  const userMessage = messageInput.value.trim()
  messageInput.value = ''
  
  characterStore.addMessage({
    role: 'user',
    content: userMessage
  })
  
  scrollToBottom()
  isTyping.value = true
  
  try {
    const result = await conversationApi.sendMessage(characterId.value, userMessage)
    
    characterStore.addMessage({
      role: 'assistant',
      content: result.response
    })
  } catch (error: unknown) {
    const err = error as { message?: string; error?: string }
    
    // Check if it's a daily limit error
    if (err.message?.includes('daily_limit_reached') || err.error?.includes('daily_limit_reached')) {
      errorMessage.value = 'Daily limit reached! Upgrade to Pro for unlimited messages.'
      characterStore.addMessage({
        role: 'assistant',
        content: "Oh no, I think I've run out of my daily messages... Maybe you could try upgrading to Pro so we can keep chatting!"
      })
    } else {
      const message = err.message || 'Failed to get response'
      errorMessage.value = message
      
      // Add error message from AI character
      characterStore.addMessage({
        role: 'assistant',
        content: "I'm having trouble connecting right now. Could you try again in a moment?"
      })
    }
  }
  
  isTyping.value = false
  scrollToBottom()
}

function deleteConversation() {
  if (confirm('Are you sure you want to delete this conversation? This cannot be undone.')) {
    characterStore.deleteCharacter(characterId.value)
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="h-screen bg-background flex flex-col">
    <!-- Header -->
    <header class="bg-background-lighter/50 backdrop-blur-xl border-b border-white/5 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <RouterLink to="/dashboard" class="p-2 text-text-muted hover:text-text transition-colors">
            <ArrowLeft class="w-5 h-5" />
          </RouterLink>
          
          <div v-if="characterStore.currentCharacter" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-moon-gold/40 to-moon-silver/40 flex items-center justify-center">
              <span class="text-lg">{{ characterStore.currentCharacter.avatar || '🌙' }}</span>
            </div>
            <div>
              <h1 class="font-semibold">{{ characterStore.currentCharacter.name }}</h1>
              <p class="text-xs text-text-muted">AI Character</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-moon-gold/10 text-moon-gold text-sm">
            <Sparkles class="w-4 h-4" />
            <span>Memory: Good</span>
          </div>
          <button 
            @click="deleteConversation"
            class="p-2 text-text-muted hover:text-functional-error transition-colors"
          >
            <Trash2 class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <!-- Messages Area -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto px-6 py-8">
      <div class="max-w-3xl mx-auto space-y-6">
        <div 
          v-for="message in characterStore.messages" 
          :key="message.id"
          class="flex animate-fade-in"
          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <!-- AI Message -->
          <div v-if="message.role === 'assistant'" class="flex gap-3 max-w-[80%]">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex-shrink-0 flex items-center justify-center">
              <Moon class="w-4 h-4 text-background" />
            </div>
            <div class="bg-background-lighter rounded-2xl rounded-tl-none px-5 py-4">
              <p class="text-text whitespace-pre-wrap">{{ message.content }}</p>
              <p class="text-xs text-text-muted mt-2">
                {{ new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </p>
            </div>
          </div>

          <!-- User Message -->
          <div v-else class="flex gap-3 max-w-[80%]">
            <div class="bg-primary/20 rounded-2xl rounded-tr-none px-5 py-4">
              <p class="text-text whitespace-pre-wrap">{{ message.content }}</p>
              <p class="text-xs text-text-muted/70 mt-2 text-right">
                {{ new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex gap-3 max-w-[80%]">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex-shrink-0 flex items-center justify-center">
            <Moon class="w-4 h-4 text-background" />
          </div>
          <div class="bg-background-lighter rounded-2xl rounded-tl-none px-5 py-4">
            <div class="flex gap-1">
              <div class="w-2 h-2 rounded-full bg-text-muted animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 rounded-full bg-text-muted animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 rounded-full bg-text-muted animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="bg-background-lighter/50 backdrop-blur-xl border-t border-white/5 px-6 py-4">
      <div class="max-w-3xl mx-auto">
        <form @submit.prevent="sendMessage" class="relative">
          <input 
            v-model="messageInput"
            type="text" 
            placeholder="Type your message..."
            class="w-full bg-background border border-white/10 rounded-full px-6 py-4 pr-14 text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            :disabled="isTyping"
          />
          <button 
            type="submit"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            :disabled="!messageInput.trim() || isTyping"
          >
            <Send class="w-5 h-5 text-white" />
          </button>
        </form>
        <p v-if="isFree" class="text-center text-xs text-text-muted mt-3">
          {{ remainingMessages }} of {{ dailyLimit }} messages remaining today
        </p>
        <p v-else class="text-center text-xs text-primary/70 mt-3">
          Pro Member - Unlimited messages ✨
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
