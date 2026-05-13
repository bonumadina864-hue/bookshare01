<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSlider from '../components/HeroSlider.vue'
import BookGrid from '../components/BookGrid.vue'
import BookLandingPage from '../components/BookLandingPage.vue'

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
})
</script>

<template>
  <div v-if="!isLoggedIn">
    <HeroSlider />
    <BookGrid />
  </div>
  <div v-else>
    <BookLandingPage />
  </div>
</template>
