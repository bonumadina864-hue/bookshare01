<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: number;
  title: string;
  rating: number;
  location: string;
  price: string;
  image: string;
}>();

const router = useRouter();

const emit = defineEmits(['select']);

const goToDetail = () => {
  emit('select', props.id);
};
</script>

<template>
  <div class="book-card" @click="goToDetail">
    <div class="image-container">
      <img :src="image" :alt="title" class="book-image" />
      <div class="rating-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        {{ rating }}
      </div>
    </div>
    <div class="book-info">
      <h3 class="book-title">{{ title }}</h3>
      <div class="book-details">
        <span class="location">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {{ location }}
        </span>
        <div class="price-row">
          <span class="price">{{ price }}</span>
          <button class="add-btn">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  background: var(--surface);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.image-container {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
}

.book-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.book-card:hover .book-image {
  transform: scale(1.1);
}

.rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #1e293b;
  backdrop-filter: blur(4px);
}

:deep(body.dark) .rating-badge {
  background: rgba(30, 41, 59, 0.8);
  color: white;
}

.star {
  color: #f59e0b;
}

.book-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.book-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
}

.book-details {
  margin-top: auto;
}

.location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 16px;
  font-weight: 900;
  color: var(--primary);
}

.add-btn {
  width: 32px;
  height: 32px;
  background: var(--primary);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  transition: all 0.2s;
}

.add-btn:hover {
  background: var(--primary-light);
  transform: scale(1.1);
}
</style>
