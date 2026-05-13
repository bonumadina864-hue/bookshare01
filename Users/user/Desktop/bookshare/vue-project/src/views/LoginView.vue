<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="login-page">
    <div class="container login-container">
      <div class="login-card">
      <div class="logo-box">
        <div class="logo-icon">📖</div>
      </div>

      <h1 class="title">Xush kelibsiz</h1>
      <p class="subtitle">BookShare akkauntingizga kiring</p>

      <form class="login-form">
        <div class="form-group">
          <label>Email</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input type="email" v-model="email" placeholder="emailingiz@misol.com" />
          </div>
        </div>

        <div class="form-group">
          <label>Email paroli</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input type="password" v-model="password" placeholder="Email parolini kiriting" />
          </div>
          <a href="#" class="forgot-link">Parolni unutdingizmi?</a>
        </div>

        <button type="submit" class="submit-btn">
          Davom etish <span class="arrow">></span>
        </button>
      </form>

      <div class="separator">
        <span>yoki</span>
      </div>

      <div class="social-btns">
        <button class="social-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
          Google orqali kirish
        </button>
        <button class="social-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width="18" />
          Apple orqali kirish
        </button>
      </div>

      <p class="footer-text">
        Akkauntingiz yo'qmi? <router-link to="/register" class="link">Ro'yxatdan o'tish</router-link>
      </p>

      <p class="terms">
        Davom etish orqali siz BookShare <a href="#">Foydalanish shartlari</a> va <a href="#">Maxfiylik siyosatiga</a> rozilik bildirasiz
      </p>
    </div>
  </div>
</div>
</template>

<style scoped>
.login-page {
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

.login-container {
  display: flex;
  justify-content: center;
  width: 100%;
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

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 24px;
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
  opacity: 0.7;
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

.input-wrapper input:focus {
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px rgba(45, 49, 166, 0.05);
}

.forgot-link {
  align-self: flex-end;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  margin-top: 10px;
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
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(45, 49, 166, 0.2);
  transition: all 0.2s;
}

.submit-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(45, 49, 166, 0.3);
}

.arrow {
  font-size: 20px;
  transition: transform 0.2s;
}

.submit-btn:hover .arrow {
  transform: translateX(4px);
}

.separator {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 32px 0;
  color: var(--text-muted);
  font-size: 14px;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-btn {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
}

.footer-text {
  margin-top: 32px;
  font-size: 14px;
  color: var(--text-muted);
}

.link {
  color: var(--accent);
  font-weight: 700;
  text-decoration: none;
}

.terms {
  margin-top: 40px;
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.6;
}

.terms a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

/* Dark Mode */
:deep(body.dark) .login-card {
  background: var(--surface);
}
</style>
