<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageDropdown from './LanguageDropdown.vue'
import { useI18n } from '../composables/useI18n'
import { withBasePath } from '../utils/baseHref'

const { t } = useI18n()

const isLoggedIn = ref(false)
const userName = ref('Jasur')

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  userName.value = localStorage.getItem('userName') || 'Jasur'
})

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  window.location.assign(withBasePath('/'))
}
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <div class="header-left" v-if="!isLoggedIn">
        <nav class="nav nav-row" aria-label="Main">
          <router-link to="/" class="logo">Book<span>share</span></router-link>
          <router-link to="/" class="nav-link" active-class="nav-link-active">{{ t('home') }}</router-link>
          <router-link to="/about" class="nav-link" active-class="nav-link-active">{{ t('about') }}</router-link>
          <router-link to="/how-it-works" class="nav-link" active-class="nav-link-active">{{ t('howItWorks') }}</router-link>
        </nav>
      </div>

      <router-link v-else to="/" class="logo">
        Book<span>share</span>
      </router-link>
      
      <div class="logged-in-nav-wrapper" v-if="isLoggedIn">
        <div class="logged-in-nav">
          <router-link to="/about" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </span>
            <span class="menu-label">{{ t('about') }}</span>
            <div class="active-indicator"></div>
          </router-link>

          <router-link to="/" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M9 22V12h6v10"/></svg>
            </span>
            <span class="menu-label">{{ t('home') }}</span>
            <div class="active-indicator"></div>
          </router-link>
          
          <router-link to="/search" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <span class="menu-label">{{ t('search') }}</span>
            <div class="active-indicator"></div>
          </router-link>
          
          <router-link to="/favorites" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </span>
            <span class="menu-label">{{ t('favorites') }}</span>
            <div class="active-indicator"></div>
          </router-link>
          
          <router-link to="/profile" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span class="menu-label">{{ t('profile') }}</span>
            <div class="active-indicator"></div>
          </router-link>
        </div>
      </div>


      <div class="actions">
        <LanguageDropdown />
        <ThemeToggle />
        <template v-if="!isLoggedIn">
          <a class="login-btn" :href="withBasePath('/login')">{{ t('login') }}</a>
          <a class="register-btn" :href="withBasePath('/register')">{{ t('register') }}</a>
        </template>
        <template v-else>
          <div class="user-profile-summary">
            <span class="user-name">{{ userName }}</span>
          </div>
          <button @click="logout" class="logout-btn" :title="t('logout')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
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
  gap: 24px;
}

.header-left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-row {
  flex: 1;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 0.75rem;
}

.logo {
  font-size: 24px;
  font-weight: 900;
  color: var(--primary);
  text-decoration: none;
  letter-spacing: -1px;
  flex-shrink: 0;
}

.logo span {
  color: var(--text-heading);
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

.nav-link-active {
  color: var(--primary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.login-btn {
  color: var(--text-heading);
  font-weight: 700;
  padding: 10px 20px;
  text-decoration: none;
  cursor: pointer;
}

.register-btn {
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(45, 49, 166, 0.15);
}

.register-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.user-profile-summary {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--text-heading);
  background: var(--surface-light);
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-size: 14px;
}

.logged-in-nav-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  height: 100%;
}

.logged-in-nav {
  display: flex;
  gap: 4px;
  background: var(--surface-light);
  padding: 5px;
  border-radius: 18px;
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 14px;
  text-decoration: none;
  color: var(--text-muted);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 90px;
  position: relative;
  overflow: hidden;
}

.menu-item:hover {
  color: var(--primary);
  background: rgba(var(--primary-rgb), 0.05);
}

.menu-item.active {
  background: white;
  color: var(--primary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.dark .menu-item.active {
  background: var(--surface);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.menu-icon {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.menu-item:hover .menu-icon {
  transform: translateY(-2px);
}

.menu-label {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.8;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--primary);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.menu-item.active .active-indicator {
  opacity: 1;
  bottom: 6px;
}

.logout-btn {
  background: var(--surface-light);
  border: 1px solid var(--border);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:hover {
  background: #fee2e2;
  color: #ef4444;
  border-color: #fecaca;
  transform: scale(1.05) rotate(5deg);
}

.dark .logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

@media (max-width: 1024px) {
  .logged-in-nav-wrapper {
    display: none; /* Mobile menu logic should be separate if needed */
  }
}
</style>


