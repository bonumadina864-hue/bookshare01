<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'
import { withBasePath } from '../utils/baseHref'

const { t } = useI18n()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const handleRegister = () => {
  errorMessage.value = ''
  const nm = name.value.trim()
  const em = email.value.trim()

  if (nm.length < 2) {
    errorMessage.value = "Ism kamida 2 ta belgidan iborat bo'lishi kerak"
    return
  }
  if (!em.includes('@')) {
    errorMessage.value = "To'g'ri email kiriting"
    return
  }
  if (password.value.length < 8) {
    errorMessage.value = "Parol kamida 8 ta belgidan iborat bo'lishi kerak"
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Parollar mos kelmadi"
    return
  }

  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userName', nm)

  window.location.assign(withBasePath('/'))
}
</script>

<template>
  <div class="register-page">
    <div class="container register-container">
      <div class="register-card">
      <h1 class="title">{{ t('register') }}</h1>
      <p class="subtitle">{{ t('footerText') }}</p>

      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label>{{ t('name') }}</label>
          <input type="text" v-model="name" placeholder="Ismingizni kiriting" required />
        </div>

        <div class="form-group">
          <label>{{ t('email') }}</label>
          <input type="email" v-model="email" placeholder="Emailingizni kiriting" required />
        </div>

        <div class="form-group">
          <label>{{ t('password') }}</label>
          <input type="password" v-model="password" placeholder="Parol yarating" required />
        </div>

        <div class="form-group">
          <label>{{ t('confirmPassword') }}</label>
          <input type="password" v-model="confirmPassword" placeholder="Parolni qayta kiriting" required />
        </div>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <button type="submit" class="submit-btn">{{ t('register') }}</button>
      </form>

      <p class="footer-text">
        {{ t('haveAccount') }} <a :href="withBasePath('/login')" class="link">{{ t('login') }}</a>
      </p>
    </div>
  </div>
</div>
</template>

<style scoped>
.register-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.register-card {
  background: var(--surface);
  padding: 48px;
  border-radius: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.05);
}

.title {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-heading);
  margin-bottom: 8px;
  text-align: center;
}

.subtitle {
  color: var(--text-muted);
  font-size: 16px;
  margin-bottom: 40px;
  text-align: center;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-weight: 700;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg);
  color: var(--text);
  outline: none;
}

.error-text {
  color: #ff4d4f;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  padding: 18px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 800;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}

.footer-text {
  margin-top: 32px;
  text-align: center;
  color: var(--text-muted);
}

.link {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}
</style>
