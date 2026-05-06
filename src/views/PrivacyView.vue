<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">隐私政策</h1>
        
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">最后更新：2026年4月</p>
          
          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">1. 信息收集</h2>
            <p class="text-gray-700 mb-4">
              我们收集以下类型的信息：
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li><strong>账户信息：</strong>注册时提供的邮箱、密码（加密存储）、昵称</li>
              <li><strong>角色数据：</strong>您创建的 AI 角色设定、对话记录</li>
              <li><strong>使用数据：</strong>登录时间、功能使用情况（用于改进服务）</li>
              <li><strong>支付信息：</strong>通过第三方支付平台处理，我们不存储信用卡信息</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">2. 信息使用</h2>
            <p class="text-gray-700 mb-4">
              我们使用收集的信息用于：
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li>提供和维护服务</li>
              <li>处理 AI 对话请求（会发送至 AI 服务提供商）</li>
              <li>发送服务通知（如订阅到期提醒）</li>
              <li>改进产品和服务</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">3. 信息共享</h2>
            <p class="text-gray-700 mb-4">
              我们<strong>不会</strong>出售您的个人信息。仅在以下情况下共享信息：
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li><strong>AI 处理：</strong>对话内容会发送至 AI 服务提供商（如 DeepSeek）以生成回复</li>
              <li><strong>支付处理：</strong>与支付服务商共享必要的交易信息</li>
              <li><strong>法律要求：</strong>根据法律法规要求披露</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">4. 数据存储与安全</h2>
            <p class="text-gray-700 mb-4">
              您的数据存储在 MongoDB Atlas 云数据库（AWS 服务器）。
              我们采取合理的安全措施保护您的数据，但请注意互联网传输无法保证 100% 安全。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">5. 数据保留与删除</h2>
            <p class="text-gray-700 mb-4">
              我们会在您使用服务期间保留您的数据。
              您可以随时：
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li>登录账户查看和编辑您的角色数据</li>
              <li>删除单个角色或对话记录</li>
              <li>注销账户（将删除所有个人数据）</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">6. Cookie 使用</h2>
            <p class="text-gray-700 mb-4">
              我们使用 localStorage 存储身份验证令牌（auth_token），用于保持登录状态。
              我们不使用第三方跟踪 Cookie。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">7. 儿童隐私</h2>
            <p class="text-gray-700 mb-4">
              本服务不适用于 13 岁以下儿童。我们不会故意收集儿童的个人信息。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">8. 政策更新</h2>
            <p class="text-gray-700 mb-4">
              我们可能会不时更新本隐私政策。重大变更会通过邮件或网站通知您。
              继续使用服务即表示您同意更新后的政策。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">9. 联系我们</h2>
            <p class="text-gray-700 mb-4">
              如有任何隐私相关问题，请联系：<br>
              邮箱：weifuaiii@qq.com
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
