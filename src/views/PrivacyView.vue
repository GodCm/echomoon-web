<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">Last updated: April 2026</p>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p class="text-gray-700 mb-4">
              We collect the following types of information:
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li><strong>Account Information:</strong> Email, password (encrypted), and nickname provided at registration</li>
              <li><strong>Character Data:</strong> AI character settings and conversation logs you create</li>
              <li><strong>Usage Data:</strong> Login times and feature usage (used to improve our service)</li>
              <li><strong>Payment Information:</strong> Processed through third-party payment platforms; we do not store credit card information</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p class="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li>Provide and maintain the service</li>
              <li>Process AI conversation requests (content is sent to AI service providers)</li>
              <li>Send service notifications (e.g., subscription renewal reminders)</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p class="text-gray-700 mb-4">
              We do <strong>not</strong> sell your personal information. Information is shared only in the following circumstances:
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li><strong>AI Processing:</strong> Conversation content is sent to AI service providers (e.g., DeepSeek) to generate responses</li>
              <li><strong>Payment Processing:</strong> Necessary transaction information is shared with payment service providers</li>
              <li><strong>Legal Requirements:</strong> Disclosure as required by applicable laws and regulations</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">4. Data Storage & Security</h2>
            <p class="text-gray-700 mb-4">
              Your data is stored on MongoDB Atlas cloud database (AWS servers).
              We take reasonable security measures to protect your data, but please note that internet transmission cannot be guaranteed 100% secure.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">5. Data Retention & Deletion</h2>
            <p class="text-gray-700 mb-4">
              We retain your data for as long as you use our service.
              You may at any time:
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li>Log in to view and edit your character data</li>
              <li>Delete individual characters or conversation logs</li>
              <li>Delete your account (all personal data will be removed)</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">6. Cookie Usage</h2>
            <p class="text-gray-700 mb-4">
              We use localStorage to store authentication tokens (auth_token) to maintain your login session.
              We do not use third-party tracking cookies.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p class="text-gray-700 mb-4">
              This service is not intended for children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">8. Policy Updates</h2>
            <p class="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. Significant changes will be notified to you by email or through the website.
              Continued use of the service constitutes acceptance of the updated policy.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p class="text-gray-700 mb-4">
              If you have any privacy-related questions, please contact:<br>
              Email: <a href="mailto:weifuaiii@qq.com" class="text-indigo-600 hover:text-indigo-500">weifuaiii@qq.com</a>
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
