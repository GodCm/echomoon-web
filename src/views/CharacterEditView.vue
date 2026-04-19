<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { characterApi } from '@/api'
import { RouterLink } from 'vue-router'
import { Moon, ArrowLeft, Save, Loader2, AlertTriangle } from 'lucide-vue-next'
import type { CharacterGoal } from '@/types'

const route = useRoute()
const router = useRouter()
const characterStore = useCharacterStore()

const isSubmitting = ref(false)
const isLoading = ref(true)
const errorMessage = ref('')

const formData = ref({
  name: '',
  gender: 'male' as 'male' | 'female' | 'other',
  goal: 'chat' as CharacterGoal,
  personality: '',
  storyMemories: '',
  reasonForSeparation: '',
  speakingStyleCatchphrases: '',
  importantMemories: '',
  forbiddenTopics: '',
  dateMet: '',
  anniversary: '',
  breakupDate: '',
  theirBirthday: '',
  myBirthday: '',
  whatTheyAreLike: ''
})

const goalOptions = [
  { value: 'regret', label: "I'm here to express regret", description: 'Share what you wish you had done differently' },
  { value: 'explain', label: "I'm here to explain things", description: 'Clear up misunderstandings and share your perspective' },
  { value: 'vent', label: "I'm here to vent/rant", description: 'Get things off your chest without being judged' },
  { value: 'chat', label: "I'm not sure, just wanna talk", description: 'No agenda, just see where the conversation goes' }
]

onMounted(async () => {
  const characterId = route.params.id as string
  try {
    await characterStore.getCharacter(characterId)
    const character = characterStore.currentCharacter
    if (character) {
      formData.value = {
        name: character.name || '',
        gender: character.gender || 'male',
        goal: character.goal || 'chat',
        personality: character.personality || '',
        storyMemories: character.storyMemories || '',
        reasonForSeparation: character.reasonForSeparation || '',
        speakingStyleCatchphrases: character.speakingStyleCatchphrases || '',
        importantMemories: character.importantMemories || '',
        forbiddenTopics: character.forbiddenTopics || '',
        dateMet: character.dateMet || '',
        anniversary: character.anniversary || '',
        breakupDate: character.breakupDate || '',
        theirBirthday: character.theirBirthday || '',
        myBirthday: character.myBirthday || '',
        whatTheyAreLike: character.whatTheyAreLike || ''
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to load character'
  } finally {
    isLoading.value = false
  }
})

async function handleSubmit() {
  if (!formData.value.name.trim()) return
  
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    const characterId = route.params.id as string
    await characterApi.update(characterId, formData.value)
    router.push(`/chat/${characterId}`)
  } catch (error: any) {
    console.error('Failed to update character:', error)
    errorMessage.value = error.message || 'Failed to update character'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-background-lighter/50 backdrop-blur-xl border-b border-white/5">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <RouterLink to="/dashboard" class="inline-flex items-center gap-2 text-text-secondary hover:text-text transition-colors">
          <ArrowLeft class="w-4 h-4" />
          Back to Dashboard
        </RouterLink>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-12">
      <div v-if="isLoading" class="text-center py-12">
        <Loader2 class="w-8 h-8 animate-spin mx-auto text-primary" />
      </div>

      <template v-else>
        <div class="text-center mb-8">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center mx-auto mb-4">
            <Moon class="w-8 h-8 text-background" />
          </div>
          <h1 class="text-3xl font-bold mb-2">Edit Character</h1>
          <p class="text-text-secondary">Update information about this person</p>
        </div>

        <div class="glass-card p-8 space-y-8">
          <!-- Basic Info -->
          <div>
            <h2 class="text-lg font-semibold mb-4">Basic Information</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Name <span class="text-functional-error">*</span></label>
                <input v-model="formData.name" type="text" placeholder="Their name" class="input-field" />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Conversation Goal</label>
                <div class="grid gap-3">
                  <button
                    v-for="option in goalOptions"
                    :key="option.value"
                    type="button"
                    @click="formData.goal = option.value as CharacterGoal"
                    class="p-4 rounded-xl border transition-all duration-300 text-left"
                    :class="formData.goal === option.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/10 hover:border-white/20'"
                  >
                    <p class="font-medium">{{ option.label }}</p>
                    <p class="text-sm text-text-secondary mt-1">{{ option.description }}</p>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Gender</label>
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="option in ['male', 'female', 'other']"
                    :key="option"
                    type="button"
                    @click="formData.gender = option as any"
                    class="p-4 rounded-xl border transition-all duration-300 text-center"
                    :class="formData.gender === option 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-white/10 hover:border-white/20'"
                  >
                    {{ option === 'male' ? '👨 Male' : option === 'female' ? '👩 Female' : '🧑 Other' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Important Dates -->
          <div class="border-t border-white/10 pt-6">
            <h2 class="text-lg font-semibold mb-4">Important Dates</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-text-secondary mb-2">When did you meet?</label>
                <input v-model="formData.dateMet" type="text" placeholder="YYYY-MM-DD" class="input-field" />
              </div>
              <div>
                <label class="block text-sm text-text-secondary mb-2">Anniversary</label>
                <input v-model="formData.anniversary" type="text" placeholder="YYYY-MM-DD" class="input-field" />
              </div>
              <div>
                <label class="block text-sm text-text-secondary mb-2">Breakup Date</label>
                <input v-model="formData.breakupDate" type="text" placeholder="YYYY-MM-DD" class="input-field" />
              </div>
              <div>
                <label class="block text-sm text-text-secondary mb-2">Their Birthday</label>
                <input v-model="formData.theirBirthday" type="text" placeholder="YYYY-MM-DD" class="input-field" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm text-text-secondary mb-2">Your Birthday</label>
                <input v-model="formData.myBirthday" type="text" placeholder="YYYY-MM-DD" class="input-field max-w-md" />
              </div>
            </div>
          </div>

          <!-- Relationship Background -->
          <div class="border-t border-white/10 pt-6">
            <h2 class="text-lg font-semibold mb-4">Relationship Background</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Personality</label>
                <textarea v-model="formData.personality" placeholder="How would you describe their personality?" class="input-field min-h-[80px] resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Story & Memories</label>
                <textarea v-model="formData.storyMemories" placeholder="Share your story together." class="input-field min-h-[100px] resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Reason for Separation</label>
                <textarea v-model="formData.reasonForSeparation" placeholder="What happened?" class="input-field min-h-[80px] resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- Communication Style -->
          <div class="border-t border-white/10 pt-6">
            <h2 class="text-lg font-semibold mb-4">Communication Style</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Speaking Style & Catchphrases</label>
                <textarea v-model="formData.speakingStyleCatchphrases" placeholder="How did they talk?" class="input-field min-h-[80px] resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Important Memories</label>
                <textarea v-model="formData.importantMemories" placeholder="What moments do you cherish most?" class="input-field min-h-[100px] resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Forbidden Topics</label>
                <textarea v-model="formData.forbiddenTopics" placeholder="Any topics that are off-limits?" class="input-field min-h-[60px] resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- Character Profile -->
          <div class="border-t border-white/10 pt-6">
            <h2 class="text-lg font-semibold mb-4">Character Profile</h2>
            <div>
              <label class="block text-sm font-medium mb-2">What They're Like</label>
              <textarea v-model="formData.whatTheyAreLike" placeholder="Paint a complete picture." class="input-field min-h-[150px] resize-none"></textarea>
            </div>
          </div>

          <!-- Warning -->
          <div class="flex items-start gap-3 p-4 bg-functional-warning/10 rounded-xl border border-functional-warning/20">
            <AlertTriangle class="w-5 h-5 text-functional-warning flex-shrink-0 mt-0.5" />
            <div class="text-sm">
              <p class="font-medium text-functional-warning mb-1">Sensitive Content Notice</p>
              <p class="text-text-secondary">Echo Moon is designed for reflection and closure. Please be respectful.</p>
            </div>
          </div>

          <!-- Submit -->
          <div class="flex justify-end pt-4">
            <button 
              @click="handleSubmit"
              :disabled="!formData.name.trim() || isSubmitting"
              class="btn-primary flex items-center gap-2"
              :class="{ 'opacity-50 cursor-not-allowed': !formData.name.trim() || isSubmitting }"
            >
              <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              <Save v-else class="w-4 h-4" />
              Save Changes
            </button>
          </div>

          <div v-if="errorMessage" class="p-4 bg-functional-error/10 border border-functional-error/30 rounded-lg">
            <p class="text-functional-error text-sm">{{ errorMessage }}</p>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>
