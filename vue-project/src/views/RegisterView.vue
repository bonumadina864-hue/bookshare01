<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = () => {
  localStorage.setItem('isLoggedIn', 'true')
  router.push('/')
  setTimeout(() => window.location.reload(), 100) // Force refresh to update HomeView
}
</script>

<template>
  <div class="register-page">
    <div class="container register-container">
      <div class="register-card">
      <h1 class="title">Ro'yxatdan o'tish</h1>
      <p class="subtitle">BookShare hamjamiyatiga qo'shiling</p>

      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Ismingiz</label>
          <input type="text" v-model="name" placeholder="Ismingizni kiriting" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Emailingizni kiriting" required />
        </div>

        <div class="form-group">
          <label>Parol</label>
          <input type="password" v-model="password" placeholder="Parol yarating" required />
        </div>

        <button type="submit" class="submit-btn">Ro'yxatdan o'tish</button>
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
}

.footer-text {
  margin-top: 32px;
  text-align: center;
  color: var(--text-muted);
}

.link {
  color: var(--primary);
  font-weight: 700;
}
</style>
