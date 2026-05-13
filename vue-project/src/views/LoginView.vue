<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'
import { withBasePath } from '../utils/baseHref'

const { t } = useI18n()
const email = ref('')
const password = ref('')

const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''
  const em = email.value.trim()
  const pw = password.value
  if (!em || !pw) {
    errorMessage.value = 'Email va parolni kiriting'
    return
  }
  if (!em.includes('@')) {
    errorMessage.value = "To'g'ri email kiriting"
    return
  }

  localStorage.setItem('isLoggedIn', 'true')
  const existing = localStorage.getItem('userName')?.trim()
  if (!existing) {
    localStorage.setItem('userName', em.split('@')[0] || 'Foydalanuvchi')
  }

  window.location.assign(withBasePath('/'))
}
</script>

<template>
  <div class="login-page">
    <div class="container login-container">
      <div class="login-card">
      <div class="logo-box">
        <div class="logo-icon">📖</div>
      </div>

      <h1 class="title">{{ t('welcome') }}</h1>
      <p class="subtitle">BookShare {{ t('login').toLowerCase() }}</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>{{ t('email') }}</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input type="email" v-model="email" placeholder="emailingiz@misol.com" required />
          </div>
        </div>

        <div class="form-group">
          <label>{{ t('password') }}</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input type="password" v-model="password" placeholder="Parolingizni kiriting" required />
          </div>
          <a href="#" class="forgot-link" @click.prevent>{{ t('forgotPassword') }}</a>
        </div>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <button type="submit" class="submit-btn">
          {{ t('login') }} <span class="arrow">></span>
        </button>
      </form>

      <div class="separator">
        <span>{{ t('or') }}</span>
      </div>

      <div class="social-btns">
        <button type="button" class="social-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
          {{ t('socialLogin') }}
        </button>
      </div>

      <p class="footer-text">
        {{ t('noAccount') }} <a :href="withBasePath('/register')" class="link">{{ t('register') }}</a>
      </p>
    </div>
  </div>
</div>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.login-card {
  background: var(--surface);
  padding: 48px;
  border-radius: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-box {
  width: 72px;
  height: 72px;
  background: var(--primary);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.logo-icon {
  font-size: 36px;
}

.title {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-heading);
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 16px;
  margin-bottom: 40px;
}

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  display: block;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 16px 16px 52px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  outline: none;
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
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: center;
  gap: 12px;
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

.separator {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 32px 0;
  color: var(--text-muted);
}

.separator::before, .separator::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

.separator span {
  padding: 0 16px;
}

.social-btns {
  width: 100%;
}

.social-btn {
  width: 100%;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text);
}

.link {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}

.error-text {
  color: #dc2626;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin: -8px 0 8px;
}
</style>
