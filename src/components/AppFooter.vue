<template>
  <footer class="bg-gray-900 text-gray-300 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Echo Moon</h3>
          <p class="text-sm">
            与 AI 角色对话，续写未完的故事。
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white text-sm font-semibold mb-4">法律信息</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/terms" class="text-sm hover:text-white transition-colors">
                服务条款
              </router-link>
            </li>
            <li>
              <router-link to="/privacy" class="text-sm hover:text-white transition-colors">
                隐私政策
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-sm hover:text-white transition-colors">
                联系我们
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white text-sm font-semibold mb-4">联系我们</h4>
          <a href="mailto:weifuaiii@qq.com" class="text-sm hover:text-white transition-colors">
            weifuaiii@qq.com
          </a>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Echo Moon. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
