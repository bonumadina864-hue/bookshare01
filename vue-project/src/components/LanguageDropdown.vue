<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'

const { lang, setLang: updateLang } = useI18n()
const showLangs = ref(false)

const handleSetLang = (newLang: string) => {
  updateLang(newLang)
  showLangs.value = false
}
</script>

<template>
  <div class="lang-switcher">
    <button class="lang-btn" @click="showLangs = !showLangs">
      {{ lang }} <span class="chevron">▾</span>
    </button>
    <div v-if="showLangs" class="lang-dropdown">
      <div class="lang-item" @click="handleSetLang('UZ')">UZ</div>
      <div class="lang-item" @click="handleSetLang('RU')">RU</div>
      <div class="lang-item" @click="handleSetLang('EN')">EN</div>
    </div>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
}

.lang-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-heading);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 8px;
  min-width: 80px;
  z-index: 100;
}

.lang-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
  color: var(--text);
}

.lang-item:hover {
  background: var(--bg);
  color: var(--primary);
}
</style>
