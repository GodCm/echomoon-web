<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div class="prose max-w-none">
          <p class="text-gray-700 mb-8">
            If you have any questions, feedback, or need help, please reach out to us using the information below.
          </p>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>

            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Email</h3>
                  <p class="text-gray-700 mt-1">
                    Customer Support: <a href="mailto:weifuaiii@qq.com" class="text-indigo-600 hover:text-indigo-500">weifuaiii@qq.com</a><br>
                    Privacy Inquiries: <a href="mailto:weifuaiii@qq.com" class="text-indigo-600 hover:text-indigo-500">weifuaiii@qq.com</a>
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
                  <h3 class="text-lg font-medium text-gray-900">Response Time</h3>
                  <p class="text-gray-700 mt-1">
                    We typically respond to emails within 24–48 hours.<br>
                    Response times may be longer during holidays.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">FAQ</h2>
            <p class="text-gray-700 mb-4">
              Before contacting us, you may want to check:
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li><router-link to="/" class="text-indigo-600 hover:text-indigo-500">Home</router-link> — Learn about Echo Moon's features</li>
              <li><router-link to="/terms" class="text-indigo-600 hover:text-indigo-500">Terms of Service</router-link> and <router-link to="/privacy" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</router-link></li>
            </ul>
          </section>

          <section class="mb-8 bg-gray-50 rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Feedback & Suggestions</h2>
            <p class="text-gray-700">
              We value your feedback! If you have feature suggestions or have found a bug,
              please email us at <a href="mailto:weifuaiii@qq.com" class="text-indigo-600 hover:text-indigo-500">weifuaiii@qq.com</a>.
              We carefully consider every suggestion.
            </p>
          </section>
        </div>

        <div class="mt-8 pt-8 border-t">
          <router-link to="/" class="text-indigo-600 hover:text-indigo-500">
            &larr; Back to Home
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
