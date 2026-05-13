<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="app-wrapper">
    <Header />
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import './assets/base.css';

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
