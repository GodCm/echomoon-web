<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCharacterStore } from '@/stores/character'
import { RouterLink } from 'vue-router'
import { Moon, Plus, MessageCircle, Crown, Star, ChevronRight, LogOut, User, Sparkles, Edit2, Trash2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const characterStore = useCharacterStore()

// Delete confirmation modal
const showDeleteModal = ref(false)
const characterToDelete = ref<{ id: string; name: string } | null>(null)

onMounted(() => {
  characterStore.fetchCharacters()
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}

function startChat(characterId: string) {
  router.push(`/chat/${characterId}`)
}

function upgradeToPro() {
  authStore.updateSubscription('pro')
  router.push('/subscribe')
}

function confirmDelete(character: { id: string; name: string }) {
  characterToDelete.value = character
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!characterToDelete.value) return
  
  try {
    await characterStore.deleteCharacter(characterToDelete.value.id)
    showDeleteModal.value = false
    characterToDelete.value = null
  } catch (error) {
    console.error('Failed to delete character:', error)
  }
}

function cancelDelete() {
  showDeleteModal.value = false
  characterToDelete.value = null
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-background-lighter/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
            <Moon class="w-5 h-5 text-background" />
          </div>
          <span class="text-xl font-semibold text-gradient">Echo Moon</span>
        </RouterLink>

        <div class="flex items-center gap-4">
          <RouterLink 
            v-if="!authStore.isPro"
            to="/subscribe"
            class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-moon-gold to-moon-silver text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Crown class="w-4 h-4" />
            Upgrade to Pro
          </RouterLink>
          
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User class="w-5 h-5 text-primary" />
            </div>
            <button @click="handleLogout" class="p-2 text-text-muted hover:text-text transition-colors">
              <LogOut class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-12">
      <!-- Welcome Section -->
      <div class="mb-12">
        <h1 class="text-3xl font-bold mb-2">
          Welcome back{{ authStore.user?.name ? `, ${authStore.user.name}` : '' }}
        </h1>
        <p class="text-text-secondary">
          {{ authStore.isPro 
            ? 'You have unlimited access to create characters and conversations.' 
            : 'Create your first character to begin your journey.' }}
        </p>
      </div>

      <!-- Subscription Badge (if free) -->
      <div v-if="!authStore.isPro" class="mb-8">
        <div class="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-moon-gold/10">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center">
              <Sparkles class="w-6 h-6 text-background" />
            </div>
            <div>
              <h3 class="font-semibold mb-1">Upgrade to Pro</h3>
              <p class="text-sm text-text-secondary">Unlimited characters, conversations, and AI memory.</p>
            </div>
          </div>
          <button @click="upgradeToPro" class="btn-primary whitespace-nowrap">
            Learn More
          </button>
        </div>
      </div>

      <!-- Characters Section -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">Your Characters</h2>
        <RouterLink 
          v-if="authStore.isPro || characterStore.canCreateMore"
          to="/character/create" 
          class="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
        >
          <Plus class="w-5 h-5" />
          Create New Character
        </RouterLink>
      </div>

      <!-- Characters Grid -->
      <div v-if="characterStore.characters.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="character in characterStore.characters" 
          :key="character.id"
          class="glass-card p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
          @click="startChat(character.id)"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-moon-gold/40 to-moon-silver/40 flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">{{ character.avatar || '🌙' }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold mb-1 truncate">{{ character.name }}</h3>
              <p class="text-sm text-text-secondary line-clamp-2">{{ character.personality || 'No description' }}</p>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span class="text-xs text-text-muted">Created {{ new Date(character.createdAt).toLocaleDateString() }}</span>
            <div class="flex items-center gap-1">
              <button 
                @click.stop="router.push(`/character/edit/${character.id}`)"
                class="p-2 rounded-lg hover:bg-white/10 transition-colors text-text-secondary hover:text-primary"
                title="Edit character"
              >
                <Edit2 class="w-4 h-4" />
              </button>
              <button 
                @click.stop="confirmDelete({ id: character.id, name: character.name })"
                class="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-text-secondary hover:text-red-400"
                title="Delete character"
              >
                <Trash2 class="w-4 h-4" />
              </button>
              <div class="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <MessageCircle class="w-4 h-4" />
                <span class="text-sm">Chat</span>
                <ChevronRight class="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="glass-card p-12 text-center">
        <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Moon class="w-10 h-10 text-primary" />
        </div>
        <h3 class="text-xl font-semibold mb-2">No Characters Yet</h3>
        <p class="text-text-secondary mb-6 max-w-md mx-auto">
          Create your first character to begin having meaningful conversations about your past.
        </p>
        <RouterLink to="/character/create" class="btn-primary inline-flex items-center gap-2">
          <Plus class="w-5 h-5" />
          Create Your First Character
        </RouterLink>
      </div>

      <!-- Quick Stats (if has characters) -->
      <div v-if="characterStore.characters.length > 0" class="mt-12 grid md:grid-cols-3 gap-6">
        <div class="glass-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Moon class="w-6 h-6 text-primary" />
            </div>
            <div>
              <p class="text-2xl font-bold">{{ characterStore.characters.length }}</p>
              <p class="text-sm text-text-secondary">Characters Created</p>
            </div>
          </div>
        </div>

        <div class="glass-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-functional-success/10 flex items-center justify-center">
              <Star class="w-6 h-6 text-functional-success" />
            </div>
            <div>
              <p class="text-2xl font-bold">0</p>
              <p class="text-sm text-text-secondary">Conversations</p>
            </div>
          </div>
        </div>

        <div class="glass-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-moon-gold/10 flex items-center justify-center">
              <Crown class="w-6 h-6 text-moon-gold" />
            </div>
            <div>
              <p class="text-2xl font-bold">{{ authStore.isPro ? 'Pro' : 'Free' }}</p>
              <p class="text-sm text-text-secondary">Current Plan</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="glass-card p-8 max-w-md mx-4 text-center">
          <div class="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <Trash2 class="w-8 h-8 text-red-400" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Are you sure?</h3>
          <p class="text-text-secondary mb-6">
            Are you ready to say goodbye to {{ characterToDelete?.name }}? This conversation and all its memories will be permanently deleted.
          </p>
          <p class="text-lg italic text-text-muted mb-6">
            "确定告别这段感情？"
          </p>
          <div class="flex gap-4 justify-center">
            <button @click="cancelDelete" class="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              Cancel
            </button>
            <button @click="handleDelete" class="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
              Yes, Say Goodbye
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
