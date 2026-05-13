<script setup lang="ts">
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref({
  name: '',
  email: '',
  password: ''
})

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const validatePassword = (pass: string) => {
  // Foydalanuvchi o'z email parolini kirityapti, shuning uchun murakkablikni olib tashlaymiz
  return pass.length >= 4
}

const handleSubmit = () => {
  // Reset errors
  errors.value = { name: '', email: '', password: '' }
  let isValid = true

  if (name.value.length < 3) {
    errors.value.name = "Ism kamida 3 ta harfdan iborat bo'lishi kerak"
    isValid = false
  }

  if (!validateEmail(email.value)) {
    errors.value.email = "Email manzili noto'g'ri kiritilgan"
    isValid = false
  }

  if (!validatePassword(password.value)) {
    errors.value.password = "Email parolini kiriting"
    isValid = false
  }

  if (isValid) {
    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!")
    // Bu yerda API ulanadi
  }
}
</script>

<template>
  <div class="register-page">
    <div class="container register-container">
      <div class="register-card">
        <div class="logo-box">
          <div class="logo-icon">📖</div>
        </div>

        <h1 class="title">Ro'yxatdan o'tish</h1>
        <p class="subtitle">BookShare hamjamiyatiga qo'shiling</p>

        <form class="register-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>To'liq ism</label>
            <div class="input-wrapper" :class="{ 'error': errors.name }">
              <span class="input-icon">👤</span>
              <input type="text" v-model="name" placeholder="Ismingizni kiriting" />
            </div>
            <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label>Email</label>
            <div class="input-wrapper" :class="{ 'error': errors.email }">
              <span class="input-icon">✉️</span>
              <input type="email" v-model="email" placeholder="emailingiz@misol.com" />
            </div>
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label>Email paroli</label>
            <div class="input-wrapper" :class="{ 'error': errors.password }">
              <span class="input-icon">🔒</span>
              <input type="password" v-model="password" placeholder="Email parolini kiriting" />
            </div>
            <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
          </div>

          <button type="submit" class="submit-btn">
            Ro'yxatdan o'tish <span class="arrow">></span>
          </button>
        </form>

        <p class="footer-text">
          Akkauntingiz bormi? <router-link to="/login" class="link">Kirish</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: var(--surface);
  background-image: 
    radial-gradient(at 0% 0%, rgba(45, 49, 166, 0.03) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(232, 130, 12, 0.03) 0px, transparent 50%);
}

.register-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.register-card {
  background: var(--surface);
  padding: 48px;
  border-radius: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border);
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
  box-shadow: 0 8px 16px rgba(45, 49, 166, 0.2);
}

.logo-icon {
  font-size: 36px;
  color: white;
}

.title {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-heading);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 16px;
  margin-bottom: 40px;
  font-weight: 500;
}

.register-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 18px;
  font-size: 20px;
  color: var(--text-muted);
}

.input-wrapper input {
  width: 100%;
  padding: 16px 16px 16px 52px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  color: var(--text);
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  font-weight: 500;
}

.input-wrapper.error input {
  border-color: #EF4444;
  background: #FEF2F2;
}

.input-wrapper input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(45, 49, 166, 0.05);
}

.error-msg {
  color: #EF4444;
  font-size: 13px;
  margin-top: 6px;
  font-weight: 600;
}

.hint {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
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
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.footer-text {
  margin-top: 32px;
  font-size: 14px;
  color: var(--text-muted);
}

.link {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}

/* Dark Mode */
:deep(body.dark) .register-card {
  background: var(--surface);
}
</style>
