<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import LanguageDropdown from './LanguageDropdown.vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const router = useRouter()
const isLoggedIn = ref(false)
const userName = ref('Jasur')

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  userName.value = localStorage.getItem('userName') || 'Jasur'
})

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  isLoggedIn.value = false
  router.push('/')
  window.location.reload() // Force refresh to update HomeView
}
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <router-link to="/" class="logo">
        Book<span>share</span>
      </router-link>
      
      <nav class="nav">
        <router-link to="/about" class="nav-link">{{ t('about') }}</router-link>
      </nav>

      <div class="actions">
        <LanguageDropdown />
        <ThemeToggle />
        <template v-if="!isLoggedIn">
          <router-link to="/login" class="login-btn">{{ t('login') }}</router-link>
          <router-link to="/register" class="register-btn">{{ t('register') }}</router-link>
        </template>
        <template v-else>
          <div class="user-profile">
            <span class="user-avatar">👤</span>
            <span class="user-name">{{ userName }}</span>
          </div>
          <button @click="logout" class="logout-btn">{{ t('logout') }}</button>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 80px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo {
  font-size: 24px;
  font-weight: 900;
  color: var(--primary);
  text-decoration: none;
  letter-spacing: -1px;
}

.logo span {
  color: var(--text-heading);
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--primary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-btn {
  color: var(--text-heading);
  font-weight: 700;
  padding: 10px 20px;
}

.register-btn {
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(45, 49, 166, 0.15);
}

.register-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-heading);
}

.user-avatar {
  font-size: 20px;
}

.logout-btn {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: var(--accent-red);
  color: white;
  border-color: var(--accent-red);
}
</style>
