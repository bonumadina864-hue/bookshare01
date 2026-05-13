<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import LanguageDropdown from './LanguageDropdown.vue'
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <router-link to="/" class="logo">
        Book<span>share</span>
      </router-link>
      
      <nav class="nav">
        <router-link to="/about" class="nav-link">About Us</router-link>
      </nav>

      <div class="actions">
        <LanguageDropdown />
        <ThemeToggle />
        <router-link to="/login" class="login-btn">Kirish</router-link>
        <router-link to="/register" class="register-btn">Ro'yxatdan o'tish</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 90px;
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
  font-size: 28px;
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
  text-decoration: none;
  color: var(--text-heading);
  font-weight: 700;
  padding: 10px 20px;
}

.register-btn {
  text-decoration: none;
  background: var(--primary);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(45, 49, 166, 0.15);
}

.register-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}
</style>
