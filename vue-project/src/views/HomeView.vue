<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import HeroSlider from '../components/HeroSlider.vue'
import BookGrid from '../components/BookGrid.vue'
import BookLandingPage from '../components/BookLandingPage.vue'
import BookDetailSidePanel from '../components/BookDetailSidePanel.vue'
import { booksData as initialBooks } from '../data/books'
import { db } from '../firebase'
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

  const isFirebaseConfigured = !db.app.options.apiKey?.includes('SINING_API_KEY');
  if (isFirebaseConfigured) {
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
      <HeroSlider />
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
}

.side-panel-wrapper {
  width: 450px;
  position: sticky;
  top: 80px; /* Below header */
  height: calc(100vh - 80px);
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
  z-index: 100;
  background: var(--surface);
  border-left: 1px solid var(--border);
}

@media (max-width: 1024px) {
  .side-panel-wrapper {
    position: fixed;
    right: 0;
    width: 90%;
    max-width: 400px;
  }
}
</style>
