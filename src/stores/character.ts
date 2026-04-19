import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character, Message } from '@/types'
import { characterApi } from '@/api'

export const useCharacterStore = defineStore('character', () => {
  const characters = ref<Character[]>([])
  const currentCharacter = ref<Character | null>(null)
  const messages = ref<Message[]>([])
  const isLoading = ref(false)

  const characterCount = computed(() => characters.value.length)
  const canCreateMore = computed(() => characters.value.length < 1) // Free tier limit

  async function fetchCharacters() {
    isLoading.value = true
    try {
      const result = await characterApi.getAll()
      characters.value = result.characters as Character[]
    } catch (error) {
      console.error('Failed to fetch characters:', error)
      characters.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function createCharacter(characterData: Omit<Character, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    isLoading.value = true
    try {
      const result = await characterApi.create(characterData)
      const newCharacter = result.character as Character
      characters.value.unshift(newCharacter)
      return newCharacter
    } catch (error) {
      console.error('Failed to create character:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function getCharacter(id: string) {
    try {
      const result = await characterApi.getOne(id)
      currentCharacter.value = result.character as Character
      return currentCharacter.value
    } catch (error) {
      console.error('Failed to get character:', error)
      return null
    }
  }

  async function deleteCharacter(id: string) {
    isLoading.value = true
    try {
      await characterApi.delete(id)
      characters.value = characters.value.filter(c => c.id !== id)
    } catch (error) {
      console.error('Failed to delete character:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  function addMessage(message: Omit<Message, 'id' | 'conversationId' | 'createdAt'>) {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      conversationId: currentCharacter.value?.id || '',
      createdAt: new Date().toISOString()
    }
    messages.value.push(newMessage)
  }

  function clearMessages() {
    messages.value = []
  }

  return {
    characters,
    currentCharacter,
    messages,
    isLoading,
    characterCount,
    canCreateMore,
    fetchCharacters,
    createCharacter,
    getCharacter,
    deleteCharacter,
    addMessage,
    clearMessages
  }
})
