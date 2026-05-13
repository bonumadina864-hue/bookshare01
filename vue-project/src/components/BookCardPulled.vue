<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  book: {
    id: number;
    title: string;
    img: string;
    rating: number;
    location: string;
    price: string;
  }
}>()

const router = useRouter();

const emit = defineEmits(['select']);

const goToDetail = () => {
  emit('select', props.book.id);
};
</script>

<template>
  <div class="book-card" @click="goToDetail">
    <div class="book-img-wrapper">
      <img :src="book.img" :alt="book.title" class="book-img" />
    </div>
    <div class="book-info">
      <h3 class="book-title">{{ book.title }}</h3>
      <div class="book-rating">
        <span class="star">⭐</span> {{ book.rating }}
      </div>
      <div class="book-location">
        <span class="loc-icon">📍</span> {{ book.location }}
      </div>
      <div class="book-price">{{ book.price }}</div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  background: var(--surface);
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}

.book-img-wrapper {
  aspect-ratio: 3 / 4;
  width: 100%;
  overflow: hidden;
}

.book-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.book-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-heading);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-rating {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  color: #F59E0B;
}

.book-location {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.loc-icon {
  font-size: 12px;
}

.book-price {
  font-size: 15px;
  font-weight: 800;
  color: #EF4444;
  margin-top: 4px;
}
</style>
