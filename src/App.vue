<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <RouterView class="flex-1" />
    <AppFooter />
  </div>
</template>

<style>
/* Global styles handled in main.css */
</style>
