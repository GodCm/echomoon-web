<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">联系我们</h1>
        
        <div class="prose max-w-none">
          <p class="text-gray-700 mb-8">
            如果您有任何问题、建议或需要帮助，请通过以下方式联系我们。
          </p>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">联系方式</h2>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">电子邮件</h3>
                  <p class="text-gray-700 mt-1">
                    客服支持：<a href="mailto:support@echomoon.app" class="text-indigo-600 hover:text-indigo-500">support@echomoon.app</a><br>
                    隐私相关问题：<a href="mailto:privacy@echomoon.app" class="text-indigo-600 hover:text-indigo-500">privacy@echomoon.app</a>
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">响应时间</h3>
                  <p class="text-gray-700 mt-1">
                    我们会在 24-48 小时内回复您的邮件。<br>
                    节假日响应时间可能延长。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">常见问题</h2>
            <p class="text-gray-700 mb-4">
              在联系我们之前，您可以先查看：
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li><router-link to="/" class="text-indigo-600 hover:text-indigo-500">首页</router-link> - 了解 Echo Moon 的功能</li>
              <li>检查 <router-link to="/terms" class="text-indigo-600 hover:text-indigo-500">服务条款</router-link> 和 <router-link to="/privacy" class="text-indigo-600 hover:text-indigo-500">隐私政策</router-link></li>
            </ul>
          </section>

          <section class="mb-8 bg-gray-50 rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">反馈建议</h2>
            <p class="text-gray-700">
              我们非常重视您的反馈！如果您有功能建议或发现 bug，
              请发邮件至 <a href="mailto:support@echomoon.app" class="text-indigo-600 hover:text-indigo-500">support@echomoon.app</a>，
              我们会认真考虑每一条建议。
            </p>
          </section>
        </div>

        <div class="mt-8 pt-8 border-t">
          <router-link to="/" class="text-indigo-600 hover:text-indigo-500">
            ← 返回首页
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
