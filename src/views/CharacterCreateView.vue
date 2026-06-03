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

// ───── Date helpers ─────
const yearOptions = Array.from({ length: 77 }, (_, i) => String(2026 - i)) // 1950–2026 desc
const monthOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
const dayOptions = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))

const dateParts = ref({
  dateMet: { year: '', month: '', day: '' },
  anniversary: { year: '', month: '', day: '' },
  breakupDate: { year: '', month: '', day: '' },
  theirBirthday: { year: '', month: '', day: '' },
  myBirthday: { year: '', month: '', day: '' }
})

function combineDate(parts: { year: string; month: string; day: string }): string {
  if (!parts.year || !parts.month || !parts.day) return ''
  return `${parts.year}-${parts.month}-${parts.day}`
}

const goalOptions = [
  { value: 'regret', label: "I'm here to express regret", description: 'Share what you wish you had done differently' },
  { value: 'explain', label: "I'm here to explain things", description: 'Clear up misunderstandings and share your perspective' },
  { value: 'vent', label: "I'm here to vent/rant", description: 'Get things off your chest without being judged' },
  { value: 'chat', label: "I'm not sure, just wanna talk", description: 'No agenda, just see where the conversation goes' }
] as const

// ───── Option definitions ─────

const personalityOptions = [
  { label: '🤫 Quiet but caring', value: 'Introverted and reserved, but shows deep care for people close to them' },
  { label: '😄 Warm and cheerful', value: 'Warm, optimistic, and always made others smile' },
  { label: '🧠 Thoughtful & analytical', value: 'Logical, thoughtful, tended to overthink things' },
  { label: '🎭 Funny & sarcastic', value: 'Had a sharp wit and a great sense of humor, often used sarcasm' },
  { label: '💪 Stubborn but loyal', value: 'Headstrong and stubborn at times, but fiercely loyal' },
  { label: '✏️ Other (type it)', value: '__custom__' },
]
const personalitySelected = ref<string[]>([])
const personalityCustom = ref('')

const reasonOptions = [
  { label: '💬 Poor communication', value: 'We stopped communicating well and drifted apart' },
  { label: '📍 Long distance', value: 'The distance made things too difficult to maintain' },
  { label: '🔀 Different life paths', value: 'We wanted different things in life and grew in different directions' },
  { label: '💔 Lost feelings', value: 'The feelings faded over time and we decided to end it' },
  { label: '⚡ A specific conflict', value: 'A major argument or incident that neither of us could move past' },
  { label: '🌱 They needed space', value: 'They said they needed time and space to find themselves' },
  { label: '✏️ Other (type it)', value: '__custom__' },
]
const reasonSelected = ref<string[]>([])
const reasonCustom = ref('')

const speakingStyleOptions = [
  { label: '😂 Loved using emojis', value: 'Always used lots of emojis in messages' },
  { label: '⏳ Slow to reply', value: 'Always took a long time to respond, but replies were thoughtful' },
  { label: '⚡ Fast & brief replies', value: 'Replied quickly but kept messages short and to the point' },
  { label: '📖 Long heartfelt messages', value: 'Wrote long, detailed messages when something mattered' },
  { label: '😏 Teasing & playful', value: 'Always teasing and playful, turned everything into a joke' },
  { label: '🧊 Reserved, hard to read', value: 'Hard to read — very reserved, rarely showed feelings in text' },
  { label: '✏️ Other (type it)', value: '__custom__' },
]
const speakingSelected = ref<string[]>([])
const speakingCustom = ref('')

const forbiddenTopicOptions = [
  { label: '👨‍👩‍👧 Family drama', value: 'Family issues or family conflicts' },
  { label: '💸 Money problems', value: 'Financial struggles or money arguments' },
  { label: '💚 Their new relationship', value: "Any mention of their new partner or who they're seeing now" },
  { label: '🧠 Mental health', value: 'Anything touching on mental health or emotional breakdowns' },
  { label: '🔥 That one big fight', value: 'The specific argument that caused the most damage' },
  { label: '🔒 Nothing off-limits', value: '' },
  { label: '✏️ Other (type it)', value: '__custom__' },
]
const forbiddenSelected = ref<string[]>([])
const forbiddenCustom = ref('')

const whatTheyAreLikeOptions = [
  { label: '🌅 Adventure lover', value: 'Loved adventure, travel, and trying new experiences' },
  { label: '🏠 Homebody at heart', value: 'Preferred cozy nights in over going out — a true homebody' },
  { label: '🎨 Creative & artistic', value: 'Creative soul — music, art, or writing was a big part of their life' },
  { label: '🏆 Driven & ambitious', value: 'Very career-focused and driven, always working toward a goal' },
  { label: '🤗 Social butterfly', value: 'Loved being around people, always the life of the party' },
  { label: '🌿 Quiet & introspective', value: 'Preferred deep one-on-one conversations over crowds' },
  { label: '✏️ Other (type it)', value: '__custom__' },
]
const whatTheySelected = ref<string[]>([])
const whatTheyCustom = ref('')

// ───── Helper: build text from selections ─────
function buildFieldValue(selected: string[], custom: string): string {
  const vals = selected
    .filter(v => v !== '__custom__' && v !== '')
    .join('. ')
  const parts: string[] = []
  if (vals) parts.push(vals)
  if (selected.includes('__custom__') && custom.trim()) parts.push(custom.trim())
  return parts.join('. ')
}

function toggleOption(arr: string[], value: string, isSingle = false) {
  if (value === '' ) {
    // "Nothing off-limits" clears all
    arr.splice(0, arr.length)
    arr.push(value)
    return
  }
  // If "nothing off-limits" was selected and user picks something else, remove it
  const noneIdx = arr.indexOf('')
  if (noneIdx !== -1) arr.splice(noneIdx, 1)

  const idx = arr.indexOf(value)
  if (idx !== -1) {
    arr.splice(idx, 1)
  } else {
    if (isSingle) arr.splice(0, arr.length)
    arr.push(value)
  }
}

// ───── Sync selections → formData before submit ─────
function syncFormData() {
  formData.value.personality = buildFieldValue(personalitySelected.value, personalityCustom.value)
  formData.value.reasonForSeparation = buildFieldValue(reasonSelected.value, reasonCustom.value)
  formData.value.speakingStyleCatchphrases = buildFieldValue(speakingSelected.value, speakingCustom.value)
  formData.value.forbiddenTopics = buildFieldValue(forbiddenSelected.value, forbiddenCustom.value)
  formData.value.whatTheyAreLike = buildFieldValue(whatTheySelected.value, whatTheyCustom.value)
  formData.value.dateMet = combineDate(dateParts.value.dateMet)
  formData.value.anniversary = combineDate(dateParts.value.anniversary)
  formData.value.breakupDate = combineDate(dateParts.value.breakupDate)
  formData.value.theirBirthday = combineDate(dateParts.value.theirBirthday)
  formData.value.myBirthday = combineDate(dateParts.value.myBirthday)
}

// ───── Validation ─────
const isStep1Valid = computed(() => formData.value.name.trim() !== '')
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
  syncFormData()
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
    if (result.personality) formData.value.personality = result.personality
    if (result.speakingStyle) formData.value.speakingStyleCatchphrases = result.speakingStyle
    if (result.importantMemories) formData.value.importantMemories = result.importantMemories
    if (result.goal) formData.value.goal = result.goal
    analyzeSuccess.value = 'Analysis complete! Fields auto-filled. You can edit below.'
    chatImportText.value = ''
    if (currentStep.value === 2) currentStep.value = 3
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

        <!-- ───── Step 1: Basic Info ───── -->
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
            <label class="block text-sm font-medium mb-2">Choose an avatar</label>
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
              Important Dates <span class="text-text-muted font-normal text-sm">(Optional)</span>
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-text-secondary mb-2">When did you meet?</label>
                <div class="grid grid-cols-3 gap-2">
                  <select v-model="dateParts.dateMet.year" class="input-field">
                    <option value="" disabled>Year</option>
                    <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                  </select>
                  <select v-model="dateParts.dateMet.month" class="input-field">
                    <option value="" disabled>Month</option>
                    <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}</option>
                  </select>
                  <select v-model="dateParts.dateMet.day" class="input-field">
                    <option value="" disabled>Day</option>
                    <option v-for="d in dayOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm text-text-secondary mb-2">Anniversary</label>
                <div class="grid grid-cols-3 gap-2">
                  <select v-model="dateParts.anniversary.year" class="input-field">
                    <option value="" disabled>Year</option>
                    <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                  </select>
                  <select v-model="dateParts.anniversary.month" class="input-field">
                    <option value="" disabled>Month</option>
                    <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}</option>
                  </select>
                  <select v-model="dateParts.anniversary.day" class="input-field">
                    <option value="" disabled>Day</option>
                    <option v-for="d in dayOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm text-text-secondary mb-2">Breakup Date</label>
                <div class="grid grid-cols-3 gap-2">
                  <select v-model="dateParts.breakupDate.year" class="input-field">
                    <option value="" disabled>Year</option>
                    <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                  </select>
                  <select v-model="dateParts.breakupDate.month" class="input-field">
                    <option value="" disabled>Month</option>
                    <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}</option>
                  </select>
                  <select v-model="dateParts.breakupDate.day" class="input-field">
                    <option value="" disabled>Day</option>
                    <option v-for="d in dayOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm text-text-secondary mb-2">Their Birthday</label>
                <div class="grid grid-cols-3 gap-2">
                  <select v-model="dateParts.theirBirthday.year" class="input-field">
                    <option value="" disabled>Year</option>
                    <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                  </select>
                  <select v-model="dateParts.theirBirthday.month" class="input-field">
                    <option value="" disabled>Month</option>
                    <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}</option>
                  </select>
                  <select v-model="dateParts.theirBirthday.day" class="input-field">
                    <option value="" disabled>Day</option>
                    <option v-for="d in dayOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm text-text-secondary mb-2">Your Birthday</label>
                <div class="grid grid-cols-3 gap-2 max-w-md">
                  <select v-model="dateParts.myBirthday.year" class="input-field">
                    <option value="" disabled>Year</option>
                    <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                  </select>
                  <select v-model="dateParts.myBirthday.month" class="input-field">
                    <option value="" disabled>Month</option>
                    <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}</option>
                  </select>
                  <select v-model="dateParts.myBirthday.day" class="input-field">
                    <option value="" disabled>Day</option>
                    <option v-for="d in dayOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ───── Step 2: Relationship Background ───── -->
        <div v-show="currentStep === 2" class="space-y-8">
          <div class="bg-moon-gold/10 border border-moon-gold/20 rounded-xl p-4">
            <p class="text-sm text-text-secondary">
              <span class="text-moon-gold font-medium">💡 All fields on this page are optional.</span>
              Tap cards to select — filling them in makes the conversation feel more authentic.
            </p>
          </div>

          <!-- Personality -->
          <div>
            <label class="block text-sm font-medium mb-3">
              Personality <span class="text-text-muted font-normal">(pick all that fit)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="opt in personalityOptions"
                :key="opt.value"
                type="button"
                @click="toggleOption(personalitySelected, opt.value)"
                class="px-3 py-2.5 rounded-xl border text-sm text-left transition-all duration-200"
                :class="personalitySelected.includes(opt.value)
                  ? 'border-primary bg-primary/15 text-text'
                  : 'border-white/10 hover:border-white/25 text-text-secondary'"
              >
                {{ opt.label }}
              </button>
            </div>
            <textarea
              v-if="personalitySelected.includes('__custom__')"
              v-model="personalityCustom"
              placeholder="Describe their personality in your own words…"
              class="input-field mt-3 min-h-[80px] resize-none text-sm"
            ></textarea>
          </div>

          <!-- Story & Memories — free text (already personal, keep as textarea) -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Story & Memories <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              v-model="formData.storyMemories"
              placeholder="How did you meet? What were the key moments of your time together?"
              class="input-field min-h-[100px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">Shared memories make conversations more meaningful</p>
          </div>

          <!-- Reason for Separation -->
          <div>
            <label class="block text-sm font-medium mb-3">
              Reason for Separation <span class="text-text-muted font-normal">(pick all that apply)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="opt in reasonOptions"
                :key="opt.value"
                type="button"
                @click="toggleOption(reasonSelected, opt.value)"
                class="px-3 py-2.5 rounded-xl border text-sm text-left transition-all duration-200"
                :class="reasonSelected.includes(opt.value)
                  ? 'border-primary bg-primary/15 text-text'
                  : 'border-white/10 hover:border-white/25 text-text-secondary'"
              >
                {{ opt.label }}
              </button>
            </div>
            <textarea
              v-if="reasonSelected.includes('__custom__')"
              v-model="reasonCustom"
              placeholder="What happened between you two?"
              class="input-field mt-3 min-h-[80px] resize-none text-sm"
            ></textarea>
          </div>

          <!-- Quick Import -->
          <div class="border border-dashed border-primary/30 rounded-xl p-4">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="font-medium text-sm">💡 Extract from their words</h4>
                <p class="text-xs text-text-muted">Paste things they used to say — we'll analyze the patterns</p>
              </div>
              <button
                @click="showChatImport = !showChatImport"
                class="text-primary text-sm hover:underline"
              >
                {{ showChatImport ? 'Hide' : 'Show' }}
              </button>
            </div>
            <div v-if="showChatImport" class="space-y-3">
              <textarea
                v-model="chatImportText"
                placeholder="Fill in things they used to say…&#10;&#10;e.g. Always replied late, used 'haha' instead of 'hahaha', loved emojis, seemed harsh but actually cared…"
                class="input-field min-h-[120px] resize-none text-sm"
              ></textarea>
              <div class="flex items-center justify-between">
                <p class="text-xs text-text-muted">✓ Only patterns are extracted, raw messages are never stored</p>
                <button
                  @click="analyzeChatHistory"
                  :disabled="isAnalyzing || chatImportText.trim().length < 50"
                  class="btn-secondary text-sm flex items-center gap-2"
                >
                  <Loader2 v-if="isAnalyzing" class="w-4 h-4 animate-spin" />
                  {{ isAnalyzing ? 'Analyzing…' : 'Analyze & Fill' }}
                </button>
              </div>
              <p v-if="analyzeError" class="text-red-400 text-xs">{{ analyzeError }}</p>
              <p v-if="analyzeSuccess" class="text-green-400 text-xs">{{ analyzeSuccess }}</p>
            </div>
          </div>
        </div>

        <!-- ───── Step 3: Communication Style ───── -->
        <div v-show="currentStep === 3" class="space-y-8">
          <div class="bg-moon-gold/10 border border-moon-gold/20 rounded-xl p-4">
            <p class="text-sm text-text-secondary">
              <span class="text-moon-gold font-medium">💡 All fields on this page are optional.</span>
              Knowing how they spoke helps recreate their voice.
            </p>
          </div>

          <!-- Speaking Style -->
          <div>
            <label class="block text-sm font-medium mb-3">
              Speaking Style <span class="text-text-muted font-normal">(pick all that fit)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="opt in speakingStyleOptions"
                :key="opt.value"
                type="button"
                @click="toggleOption(speakingSelected, opt.value)"
                class="px-3 py-2.5 rounded-xl border text-sm text-left transition-all duration-200"
                :class="speakingSelected.includes(opt.value)
                  ? 'border-primary bg-primary/15 text-text'
                  : 'border-white/10 hover:border-white/25 text-text-secondary'"
              >
                {{ opt.label }}
              </button>
            </div>
            <textarea
              v-if="speakingSelected.includes('__custom__')"
              v-model="speakingCustom"
              placeholder="e.g. Always started texts with 'yo', never used punctuation…"
              class="input-field mt-3 min-h-[80px] resize-none text-sm"
            ></textarea>
          </div>

          <!-- Important Memories — free text (very personal) -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Important Memories <span class="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              v-model="formData.importantMemories"
              placeholder="What moments do you cherish most? Inside jokes, shared experiences, meaningful gifts?"
              class="input-field min-h-[100px] resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-1">Shared memories give the AI context to reference</p>
          </div>

          <!-- Forbidden Topics -->
          <div>
            <label class="block text-sm font-medium mb-3">
              Forbidden Topics <span class="text-text-muted font-normal">(tap to exclude)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="opt in forbiddenTopicOptions"
                :key="opt.value"
                type="button"
                @click="toggleOption(forbiddenSelected, opt.value)"
                class="px-3 py-2.5 rounded-xl border text-sm text-left transition-all duration-200"
                :class="forbiddenSelected.includes(opt.value)
                  ? (opt.value === '' ? 'border-green-500/50 bg-green-500/10 text-green-300' : 'border-primary bg-primary/15 text-text')
                  : 'border-white/10 hover:border-white/25 text-text-secondary'"
              >
                {{ opt.label }}
              </button>
            </div>
            <textarea
              v-if="forbiddenSelected.includes('__custom__')"
              v-model="forbiddenCustom"
              placeholder="Describe what topics the AI should avoid…"
              class="input-field mt-3 min-h-[80px] resize-none text-sm"
            ></textarea>
            <p class="text-xs text-text-muted mt-2">The AI will gently avoid these sensitive topics</p>
          </div>
        </div>

        <!-- ───── Step 4: Character Profile ───── -->
        <div v-show="currentStep === 4" class="space-y-8">
          <div class="bg-moon-gold/10 border border-moon-gold/20 rounded-xl p-4">
            <p class="text-sm text-text-secondary">
              <span class="text-moon-gold font-medium">💡 This step is optional.</span>
              Picking a few cards paints a fuller picture — more detail means more authentic conversations.
            </p>
          </div>

          <!-- What They're Like -->
          <div>
            <label class="block text-sm font-medium mb-3">
              What They're Like <span class="text-text-muted font-normal">(pick all that fit)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="opt in whatTheyAreLikeOptions"
                :key="opt.value"
                type="button"
                @click="toggleOption(whatTheySelected, opt.value)"
                class="px-3 py-2.5 rounded-xl border text-sm text-left transition-all duration-200"
                :class="whatTheySelected.includes(opt.value)
                  ? 'border-primary bg-primary/15 text-text'
                  : 'border-white/10 hover:border-white/25 text-text-secondary'"
              >
                {{ opt.label }}
              </button>
            </div>
            <textarea
              v-if="whatTheySelected.includes('__custom__')"
              v-model="whatTheyCustom"
              placeholder="What made them unique? Their values, fears, dreams, quirks…"
              class="input-field mt-3 min-h-[120px] resize-none text-sm"
            ></textarea>
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
          <li>• Only the name is required — everything else helps create a more authentic experience</li>
          <li>• You can select multiple cards per section</li>
          <li>• Pick "Other (type it)" to add your own custom detail</li>
          <li>• The more cards you select, the more authentic the AI conversation will feel</li>
        </ul>
      </div>
    </main>
  </div>
</template>
