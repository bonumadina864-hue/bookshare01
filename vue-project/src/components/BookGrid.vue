<script setup lang="ts">
import { computed } from 'vue'
import BookCardPulled from './BookCardPulled.vue'
import { booksData } from '../data/books'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const mappedBooks = computed(() => {
  return booksData.map(b => ({
    id: b.id,
    title: b.title,
    img: b.img,
    rating: b.rating,
    location: `${b.location.district}, ${b.location.distance}`,
    price: `${b.price} ${b.pricePeriod}`
  }))
})
defineEmits(['select']);
</script>

<template>
  <section class="book-grid-section container">
    <div class="section-header">
      <h2 class="section-title">{{ t('nearby') }}</h2>
      <a href="#" class="view-all">{{ t('viewAll') }} ></a>
    </div>
    
    <div class="grid">
      <BookCardPulled v-for="book in mappedBooks" :key="book.id" :book="book" @select="$emit('select', $event)" />
    </div>
  </section>
</template>

<style scoped>
.book-grid-section {
  padding: 80px 0 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-heading);
}

.view-all {
  font-size: 14px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    display: flex;
    overflow-x: auto;
    gap: 16px;
    padding: 4px 0 20px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    margin: 0 calc(var(--container-px) * -1);
    padding: 4px var(--container-px) 20px;
  }
  .grid::-webkit-scrollbar {
    display: none;
  }
  .grid > * {
    flex: 0 0 180px;
  }
}
</style>
