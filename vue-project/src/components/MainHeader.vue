<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageDropdown from './LanguageDropdown.vue'
import { useI18n } from '../composables/useI18n'
import { withBasePath } from '../utils/baseHref'

const { t } = useI18n()

const isLoggedIn = ref(false)
const userName = ref('Jasur')
const isMobileMenuOpen = ref(false)

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  userName.value = localStorage.getItem('userName') || 'Jasur'
})

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  window.location.assign(withBasePath('/'))
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="header" :class="{ 'is-logged-in': isLoggedIn }">
    <div class="container header-container">
      <!-- Left side: Logo & Desktop Nav (Guest) -->
      <div class="header-left">
        <router-link to="/" class="logo">Book<span>share</span></router-link>
        
        <nav class="nav desktop-only" v-if="!isLoggedIn" aria-label="Main">
          <router-link to="/" class="nav-link" active-class="nav-link-active">{{ t('home') }}</router-link>
          <router-link to="/about" class="nav-link" active-class="nav-link-active">{{ t('about') }}</router-link>
          <router-link to="/how-it-works" class="nav-link" active-class="nav-link-active">{{ t('howItWorks') }}</router-link>
        </nav>
      </div>
      
      <!-- Center: Desktop Nav (Logged In) -->
      <div class="logged-in-nav-wrapper desktop-only" v-if="isLoggedIn">
        <div class="logged-in-nav">
          <router-link to="/" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M9 22V12h6v10"/></svg>
            </span>
            <span class="menu-label">{{ t('home') }}</span>
          </router-link>
          
          <router-link to="/search" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <span class="menu-label">{{ t('search') }}</span>
          </router-link>
          
          <router-link to="/favorites" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </span>
            <span class="menu-label">{{ t('favorites') }}</span>
          </router-link>
          
          <router-link to="/profile" class="menu-item" active-class="active">
            <span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span class="menu-label">{{ t('profile') }}</span>
          </router-link>
        </div>
      </div>

      <!-- Right side: Actions -->
      <div class="actions">
        <div class="desktop-only flex-actions">
          <LanguageDropdown />
          <ThemeToggle />
        </div>

        <!-- Mobile Hamburger (Visible for guests only) -->
        <button v-if="!isLoggedIn" class="mobile-only hamburger-btn" @click="isMobileMenuOpen = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <template v-if="!isLoggedIn">
          <div class="desktop-only flex-actions">
            <a class="login-btn" :href="withBasePath('/login')">{{ t('login') }}</a>
            <a class="register-btn" :href="withBasePath('/register')">{{ t('register') }}</a>
          </div>
        </template>

        <template v-else>
          <div class="user-profile-summary desktop-only">
            <span class="user-name">{{ userName }}</span>
          </div>
          <button @click="logout" class="logout-btn" :title="t('logout')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </template>
      </div>
    </div>

    <!-- Mobile Bottom Nav (Logged In Only) -->
    <nav class="mobile-bottom-nav mobile-only" v-if="isLoggedIn">
      <router-link to="/" class="mobile-nav-item" active-class="active">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M9 22V12h6v10"/></svg>
        <span>{{ t('home') }}</span>
      </router-link>
      <router-link to="/search" class="mobile-nav-item" active-class="active">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span>{{ t('search') }}</span>
      </router-link>
      <router-link to="/favorites" class="mobile-nav-item" active-class="active">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        <span>{{ t('favorites') }}</span>
      </router-link>
      <router-link to="/profile" class="mobile-nav-item" active-class="active">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>{{ t('profile') }}</span>
      </router-link>
    </nav>

    <!-- Mobile Overlay Menu -->
    <Transition name="fade">
      <div class="mobile-overlay" v-if="isMobileMenuOpen" @click.self="isMobileMenuOpen = false">
        <div class="mobile-menu">
          <div class="mobile-menu-header">
            <div class="logo">Book<span>share</span></div>
            <button @click="isMobileMenuOpen = false" class="close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="mobile-links">
            <router-link to="/" class="mobile-link" active-class="active" @click="isMobileMenuOpen = false">
              {{ t('home') }}
            </router-link>
            <router-link to="/about" class="mobile-link" active-class="active" @click="isMobileMenuOpen = false">
              {{ t('about') }}
            </router-link>
            <router-link to="/how-it-works" class="mobile-link" active-class="active" @click="isMobileMenuOpen = false">
              {{ t('howItWorks') }}
            </router-link>
            
            <div class="divider"></div>
            
            <a :href="withBasePath('/login')" class="mobile-link login-link">
              {{ t('login') }}
            </a>
            <a :href="withBasePath('/register')" class="mobile-link register-link">
              {{ t('register') }}
            </a>
          </div>
          <div class="mobile-menu-footer">
            <LanguageDropdown />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Transition>
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
  transition: all 0.3s ease;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
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
  align-items: center;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  transition: color 0.2s;
  font-size: 15px;
}

.nav-link:hover, .nav-link-active {
  color: var(--primary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.flex-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.login-btn {
  color: var(--text-heading);
  font-weight: 700;
  padding: 10px 16px;
  text-decoration: none;
}

.register-btn {
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(45, 49, 166, 0.15);
}

.hamburger-btn {
  color: var(--text-heading);
  padding: 8px;
}

/* Logged In Styles */
.logged-in-nav-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logged-in-nav {
  display: flex;
  gap: 4px;
  background: var(--bg);
  padding: 4px;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-muted);
  min-width: 80px;
}

.menu-item.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.menu-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 2px;
}

.logout-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-light);
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.logout-btn:hover {
  color: #ef4444;
  background: #fee2e2;
}

/* Mobile Bottom Nav */
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  z-index: 1000;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-muted);
  gap: 4px;
  flex: 1;
}

.mobile-nav-item span {
  font-size: 11px;
  font-weight: 600;
}

.mobile-nav-item.active {
  color: var(--primary);
}

/* Mobile Overlay Menu */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
}

.mobile-menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: var(--surface);
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-link {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-heading);
  text-decoration: none;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  transition: all 0.2s;
}

.mobile-link .icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-light);
  border-radius: 8px;
  color: var(--text-muted);
}

.mobile-link.active {
  background: rgba(45, 49, 166, 0.08);
  color: var(--primary);
}

.mobile-link.active .icon {
  background: var(--primary);
  color: white;
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 8px 0;
}

.login-link {
  color: var(--primary);
}

.register-link {
  background: var(--primary);
  color: white;
  padding: 12px;
  border-radius: 12px;
  text-align: center;
}

.logout-link {
  color: #ef4444;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
}

.user-details .user-name {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-heading);
}

.user-details .view-profile {
  font-size: 13px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.mobile-menu-footer {
  margin-top: auto;
  display: flex;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

/* Helper Classes */
.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

@media (max-width: 1024px) {
  .desktop-only {
    display: none;
  }
  
  .mobile-only {
    display: flex;
  }
  
  .header {
    height: 70px;
  }
  
  .logo {
    font-size: 20px;
  }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>


