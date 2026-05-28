<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const showFooter = computed(() => !route.meta.hideFooter)
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <AppHeader />
    <RouterView class="flex-1" />
    <AppFooter v-if="showFooter" />
  </div>
</template>
