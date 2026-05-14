<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import HeroSlider from '../components/HeroSlider.vue'
import BookGrid from '../components/BookGrid.vue'
import BookLandingPage from '../components/BookLandingPage.vue'
import BookDetailSidePanel from '../components/BookDetailSidePanel.vue'
import { booksData as initialBooks } from '../data/books'
import { db, isFirebaseLive } from '../firebase'
import { ref as dbRef, onValue } from 'firebase/database'

const isLoggedIn = ref(false)
const selectedBookId = ref<number | string | null>(null)
const books = ref([...initialBooks])

const selectedBook = computed(() => {
  if (selectedBookId.value === null) return null
  return books.value.find(b => b.id === selectedBookId.value)
})

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'

  if (isFirebaseLive() && db) {
    const globalBooksRef = dbRef(db, 'globalBooks');
    onValue(globalBooksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const remoteBooks = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        books.value = [...initialBooks, ...remoteBooks];
      }
    });
  } else {
    const globalBooks = JSON.parse(localStorage.getItem('global_books') || '[]');
    if (globalBooks.length > 0) {
      books.value = [...initialBooks, ...globalBooks];
    }
  }
})
</script>

<template>
  <div v-if="!isLoggedIn" class="home-layout" :class="{ 'panel-open': selectedBookId }">
    <div class="main-content">
      <div class="home-hero-wrapper">
        <HeroSlider />
      </div>
      <BookGrid @select="id => selectedBookId = id" />
    </div>
    <div class="side-panel-wrapper" v-if="selectedBookId">
      <BookDetailSidePanel :book="selectedBook" @close="selectedBookId = null" />
    </div>
  </div>
  <div v-else>
    <BookLandingPage />
  </div>
</template>

<style scoped>
.home-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  transition: all 0.3s ease;
  overflow-x: hidden;
  padding: 24px;
}

.home-hero-wrapper {
  margin: 0;
  margin-bottom: 60px;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.home-hero-wrapper :deep(.hero-slider) {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 48px 0 60px;
}

.side-panel-wrapper {
  width: 450px;
  position: sticky;
  top: 80px;
  height: calc(100vh - 80px);
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
  z-index: 100;
  background: var(--surface);
  border-left: 1px solid var(--border);
}

@media (max-width: 1024px) {
  .home-layout {
    flex-direction: column;
  }
  
  .main-content {
    padding: 16px;
  }
  
  .home-hero-wrapper {
    margin: 0;
    margin-bottom: 40px;
    border-radius: 24px;
  }

  .side-panel-wrapper {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: 85vh;
    border-left: none;
    border-top: 1px solid var(--border);
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    z-index: 2000;
  }
}

@media (max-width: 768px) {
  .home-hero-wrapper {
    border-radius: 0;
    margin: -16px -16px 32px -16px; /* Bleed out on mobile */
  }
}
</style>
