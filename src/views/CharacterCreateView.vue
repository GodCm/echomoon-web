<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { RouterLink } from 'vue-router'
import { Moon, ArrowLeft, ArrowRight, Check, Loader2, User, Heart, MessageCircle, Calendar, AlertTriangle } from 'lucide-vue-next'
import { characterApi } from '@/api'

const router = useRouter()
const characterStore = useCharacterStore()

const currentStep = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)

// Chat import state
const showChatImport = ref(false)
const chatImportText = ref('')
const isAnalyzing = ref(false)
const analyzeError = ref('')
const analyzeSuccess = ref('')

const formData = ref({
  name: '',
  avatar: '🌙',
  gender: 'male' as 'male' | 'female' | 'other',
  goal: 'chat' as 'regret' | 'explain' | 'vent' | 'chat',
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

const avatarOptions = ['🌙', '🌟', '💔', '🔥', '✨', '🎭', '👻', '🌸', '🦋', '🎨', '💫', '🌺', '🍂', '🌌', '💎', '🎸']

const goalOptions = [
  { value: 'regret', label: "I'm here to express regret", description: 'Share what you wish you had done differently' },
  { value: 'explain', label: "I'm here to explain things", description: 'Clear up misunderstandings and share your perspective' },
  { value: 'vent', label: "I'm here to vent/rant", description: 'Get things off your chest without being judged' },
  { value: 'chat', label: "I'm not sure, just wanna talk", description: 'No agenda, just see where the conversation goes' }
] as const

const isStep1Valid = computed(() => formData.value.name.trim() !== '')
// Steps 2, 3, 4 are optional - user can skip or fill partially
const isStep2Valid = computed(() => true)
const isStep3Valid = computed(() => true)
const isStep4Valid = computed(() => true)

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return isStep1Valid.value
    case 2: return isStep2Valid.value
    case 3: return isStep3Valid.value
    case 4: return isStep4Valid.value
    default: return false
  }
})

function nextStep() {
  if (canProceed.value && currentStep.value < totalSteps) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const errorMessage = ref('')

async function handleSubmit() {
  if (!canProceed.value) return
  
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    const character = await characterStore.createCharacter(formData.value)
    router.push(`/chat/${character.id}`)
  } catch (error: any) {
    console.error('Failed to create character:', error)
    errorMessage.value = error.message || 'Failed to create character'
  } finally {
    isSubmitting.value = false
  }
}

const stepTitles = [
  'Basic Information',
  'Relationship Background',
  'Communication Style',
  'Character Profile'
]

const stepDescriptions = [
  'Tell us who this person is',
  'Share your story together',
  'How did they express themselves?',
  'Paint a complete picture'
]

async function analyzeChatHistory() {
  if (chatImportText.value.trim().length < 50) {
    analyzeError.value = 'Please enter at least 50 characters'
    return
  }

  isAnalyzing.value = true
  analyzeError.value = ''
  analyzeSuccess.value = ''

  try {
    const result = await characterApi.analyzeChat(chatImportText.value)
    
    // Auto-fill the form with analyzed data
    if (result.personality) {
      formData.value.personality = result.personality
    }
    if (result.speakingStyle) {
      formData.value.speakingStyleCatchphrases = result.speakingStyle
    }
    if (result.importantMemories) {
      formData.value.importantMemories = result.importantMemories
    }
    if (result.goal) {
      formData.value.goal = result.goal
    }
    
    analyzeSuccess.value = 'Analysis complete! Fields auto-filled. You can edit below.'
    chatImportText.value = ''
    
    // Auto-advance to step 3 (Communication Style) to show filled fields
    if (currentStep.value === 2) {
      currentStep.value = 3
    }
  } catch (error: any) {
    analyzeError.value = error.message || 'Failed to analyze chat. Please try again.'
  } finally {
    isAnalyzing.value = false
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
      <div class="text-center mb-12">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-moon-gold to-moon-silver flex items-center justify-center mx-auto mb-4">
          <Moon class="w-8 h-8 text-background" />
        </div>
        <h1 class="text-3xl font-bold mb-2">Create Your Character</h1>
        <p class="text-text-secondary">Build a digital memory of someone important</p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-4">
          <div v-for="step in totalSteps" :key="step" class="flex items-center">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300"
              :class="currentStep >= step 
                ? 'bg-primary text-white' 
                : 'bg-background-lighter text-text-muted border border-white/10'"
            >
              <Check v-if="currentStep > step" class="w-5 h-5" />
              <span v-else>{{ step }}</span>
            </div>
            <div 
              v-if="step < totalSteps" 
              class="w-16 md:w-24 h-0.5 mx-2 transition-all duration-300"
              :class="currentStep > step ? 'bg-primary' : 'bg-white/10'"
            ></div>
          </div>
        </div>
        <div class="text-center">
          <p class="font-medium">{{ stepTitles[currentStep - 1] }}</p>
          <p class="text-sm text-text-secondary">{{ stepDescriptions[currentStep - 1] }}</p>
        </div>
      </div>

      <!-- Form -->
      <div class="glass-card p-8">
        <!-- Step 1: Basic Info -->
        <div v-show="currentStep === 1" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">
              Name <span class="text-functional-error">*</span>
            </label>
            <input 
              v-model="formData.name"
              type="text" 
              placeholder="Their name"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Choose an avatar
            </label>
            <div class="grid grid-cols-8 gap-2">
              <button
                v-for="avatar in avatarOptions"
                :key="avatar"
                type="button"
                @click="formData.avatar = avatar"
                class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200"
                :class="formData.avatar === avatar 
                  ? 'bg-primary/20 border-2 border-primary scale-110' 
                  : 'bg-background-lighter hover:bg-white/10 border-2 border-transparent'"
              >
                {{ avatar }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              What's your goal for this conversation? <span class="text-functional-error">*</span>
            </label>
            <div class="grid gap-3">
              <button
                v-for="option in goalOptions"
                :key="option.value"
                type="button"
                @click="formData.goal = option.value"
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

          <!-- Dates Section -->
          <div class="pt-6 border-t border-white/10">
            <h3 class="font-medium mb-4 flex items-center gap-2">
              <Calendar class="w-4 h-4 text-primary" />
              Important Dates (Optional)
            </h3>
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
        </div>

        <!-- Step 2: Relationship Background -->
        <div v-show="currentStep === 2" class="space-y-6">
          <div class="bg-moon-gold/10 border border-moon-gold/20 rounded-xl p-4 mb-6">
            <p class="text-sm text-text-secondary">
              <span class="text-moon-gold font-medium">💡 All fields on this page are optional.</span> 
              Filling them in will make the conversation feel more authentic and personal.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Personality <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea 
              v-model="formData.personality"
              placeholder="How would you describe their personality? (e.g., introverted but caring, always put others first, had a dry sense of humor)"
              class="input-field min-h-[100px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">Tip: Specific traits help create more authentic responses</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Story & Memories <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea 
              v-model="formData.storyMemories"
              placeholder="Share your story together. How did you meet? What were the key moments?"
              class="input-field min-h-[120px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">Tip: Shared memories make conversations more meaningful</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Reason for Separation <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea 
              v-model="formData.reasonForSeparation"
              placeholder="What happened? Why did you part ways?"
              class="input-field min-h-[100px] resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Quick Import: Chat History -->
        <div v-show="currentStep === 2" class="mb-6">
          <div class="border border-dashed border-primary/30 rounded-xl p-4">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="font-medium text-sm">💡 Extract from their words</h4>
                <p class="text-xs text-text-muted">Fill in things they used to say, we'll analyze their personality</p>
              </div>
              <button 
                @click="showChatImport = !showChatImport"
                class="text-primary text-sm hover:underline"
              >
                {{ showChatImport ? 'Hide' : 'Show more' }}
              </button>
            </div>
            
            <div v-if="showChatImport" class="space-y-3">
              <textarea
                v-model="chatImportText"
                placeholder="Fill in things they used to say - their expressions, tone, habits...
                
For example:
- Always replied late
- Used 'haha' instead of 'hahaha'
- Loved using emojis
- Seems harsh but actually cares about you..."
                class="input-field min-h-[150px] resize-none text-sm"
              ></textarea>
              
              <div class="flex items-center justify-between">
                <p class="text-xs text-text-muted">
                  ✓ Only extract patterns, never store raw messages
                </p>
                <button 
                  @click="analyzeChatHistory"
                  :disabled="isAnalyzing || chatImportText.trim().length < 50"
                  class="btn-secondary text-sm flex items-center gap-2"
                >
                  <Loader2 v-if="isAnalyzing" class="w-4 h-4 animate-spin" />
                  {{ isAnalyzing ? 'Analyzing...' : 'Analyze & Fill' }}
                </button>
              </div>
              
              <p v-if="analyzeError" class="text-red-400 text-xs">{{ analyzeError }}</p>
              <p v-if="analyzeSuccess" class="text-green-400 text-xs">{{ analyzeSuccess }}</p>
            </div>
          </div>
        </div>

        <!-- Step 3: Communication Style -->
        <div v-show="currentStep === 3" class="space-y-6">
          <div class="bg-moon-gold/10 border border-moon-gold/20 rounded-xl p-4 mb-6">
            <p class="text-sm text-text-secondary">
              <span class="text-moon-gold font-medium">💡 All fields on this page are optional.</span> 
              Knowing how they spoke helps recreate their voice.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Speaking Style & Catchphrases <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea 
              v-model="formData.speakingStyleCatchphrases"
              placeholder="How did they talk? Any favorite phrases, ways of expressing themselves? (e.g., 'Always started texts with emojis', 'Said 'you know what I mean' a lot')"
              class="input-field min-h-[100px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">Tip: Recreating their speech patterns makes conversations feel real</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Important Memories <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea 
              v-model="formData.importantMemories"
              placeholder="What moments do you cherish most? Inside jokes, shared experiences, meaningful gifts?"
              class="input-field min-h-[120px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">Tip: Shared memories give the AI context to reference</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Forbidden Topics <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea 
              v-model="formData.forbiddenTopics"
              placeholder="Are there any topics that are off-limits or painful to discuss?"
              class="input-field min-h-[80px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">The AI will gently avoid these sensitive topics</p>
          </div>
        </div>

        <!-- Step 4: Character Profile -->
        <div v-show="currentStep === 4" class="space-y-6">
          <div class="bg-moon-gold/10 border border-moon-gold/20 rounded-xl p-4 mb-6">
            <p class="text-sm text-text-secondary">
              <span class="text-moon-gold font-medium">💡 This field is optional.</span> 
              Filling it in makes the conversation more authentic and personal.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              What They're Like <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea 
              v-model="formData.whatTheyAreLike"
              placeholder="Paint a complete picture. What made them unique? Their values, fears, dreams, quirks? The more detail you provide, the more authentic the conversation will be."
              class="input-field min-h-[200px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">Tip: The more detail you provide, the more authentic the conversation will be</p>
          </div>

          <!-- Warning -->
          <div class="flex items-start gap-3 p-4 bg-functional-warning/10 rounded-xl border border-functional-warning/20">
            <AlertTriangle class="w-5 h-5 text-functional-warning flex-shrink-0 mt-0.5" />
            <div class="text-sm">
              <p class="font-medium text-functional-warning mb-1">Sensitive Content Notice</p>
              <p class="text-text-secondary">Echo Moon is designed for reflection and closure. Please be respectful and avoid creating characters that could be harmful to real people.</p>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button 
            v-if="currentStep > 1"
            @click="prevStep"
            class="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft class="w-4 h-4" />
            Previous
          </button>
          <div v-else></div>

          <button 
            v-if="currentStep < totalSteps"
            @click="nextStep"
            :disabled="!canProceed"
            class="btn-primary flex items-center gap-2"
            :class="{ 'opacity-50 cursor-not-allowed': !canProceed }"
          >
            Next
            <ArrowRight class="w-4 h-4" />
          </button>

          <button 
            v-else
            @click="handleSubmit"
            :disabled="!canProceed || isSubmitting"
            class="btn-primary flex items-center gap-2"
            :class="{ 'opacity-50 cursor-not-allowed': !canProceed || isSubmitting }"
          >
            <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
            <span v-else>Create Character</span>
          </button>
        </div>

        <div v-if="errorMessage" class="mt-4 p-4 bg-functional-error/10 border border-functional-error/30 rounded-lg">
          <p class="text-functional-error text-sm">{{ errorMessage }}</p>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-8 p-6 glass-card">
        <h3 class="font-medium mb-3 flex items-center gap-2">
          <Heart class="w-4 h-4 text-primary" />
          Tips for Better Results
        </h3>
        <ul class="text-sm text-text-secondary space-y-2">
          <li>• Only the name is required - everything else helps create a more authentic experience</li>
          <li>• Be specific about personality traits for realistic responses</li>
          <li>• Include real phrases or expressions they used</li>
          <li>• Think about memorable moments that defined your relationship</li>
          <li>• The more detail you provide, the more authentic the conversation will be</li>
        </ul>
      </div>
    </main>
  </div>
</template>
