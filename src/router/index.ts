import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { auth: 'signed-out' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { auth: 'signed-out' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { auth: 'signed-in' }
    },
    {
      path: '/character/create',
      name: 'character-create',
      component: () => import('@/views/CharacterCreateView.vue'),
      meta: { auth: 'signed-in' }
    },
    {
      path: '/character/edit/:id',
      name: 'character-edit',
      component: () => import('@/views/CharacterEditView.vue'),
      meta: { auth: 'signed-in' }
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('@/views/ChatView.vue'),
      meta: { auth: 'signed-in' }
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: () => import('@/views/SubscribeView.vue'),
      meta: { auth: 'signed-in' }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/TermsView.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/PrivacyView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    }
  ]
})

export default router
