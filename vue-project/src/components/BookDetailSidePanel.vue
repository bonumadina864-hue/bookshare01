<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const props = defineProps<{
  book: any;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div class="side-panel">
    <div class="panel-header">
      <button class="close-btn" @click="emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <h2 class="panel-title">{{ t('bookDetails') }}</h2>
    </div>

    <div class="panel-content" v-if="book">
      <div class="image-wrapper">
        <img :src="book.img" :alt="book.title" class="panel-image" />
      </div>

      <div class="info-section">
        <h1 class="book-title">{{ book.title }}</h1>
        <p class="book-author">{{ book.author }}</p>
        
        <div class="rating-row">
          <span class="star">⭐</span>
          <span class="rating-val">{{ book.rating }}</span>
          <span class="reviews-count">({{ book.reviewsCount }} {{ t('reviews') }})</span>
        </div>

        <div class="price-box">
          <span class="price-amount">{{ book.price }}</span>
          <span class="price-period">{{ book.pricePeriod }}</span>
        </div>

        <div class="section-block">
          <h3 class="block-title">{{ t('aboutBook') }}</h3>
          <p class="description-text">{{ book.description }}</p>
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <span class="label">{{ t('language') }}</span>
            <span class="val">{{ book.details.language }}</span>
          </div>
          <div class="detail-item">
            <span class="label">{{ t('pages') }}</span>
            <span class="val">{{ book.details.pages }}</span>
          </div>
          <div class="detail-item">
            <span class="label">{{ t('condition') }}</span>
            <span class="val">{{ book.details.condition }}</span>
          </div>
        </div>

        <div class="owner-box">
          <div class="avatar">{{ book.owner.initials }}</div>
          <div class="owner-info">
            <div class="name">{{ book.owner.name }}</div>
            <div class="stats">⭐ {{ book.owner.rating }} • {{ book.owner.booksCount }} {{ t('booksCountText') }}</div>
          </div>
        </div>
      </div>
      
      <div class="panel-actions">
        <button class="btn-primary">{{ t('rentNow') }}</button>
        <button class="btn-outline">{{ t('writeMessage') }}</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.side-panel {
  width: 100%;
  height: 100%;
  background: var(--surface);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--surface);
  position: sticky;
  top: 0;
  z-index: 10;
}

.close-btn {
  background: var(--bg);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text);
}

.panel-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-heading);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.panel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--text-heading);
  margin-bottom: 8px;
}

.book-author {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.rating-val {
  font-weight: 700;
  color: var(--text-heading);
}

.reviews-count {
  color: var(--text-muted);
}

.price-box {
  background: var(--bg);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.price-amount {
  font-size: 24px;
  font-weight: 900;
  color: var(--primary);
}

.price-period {
  font-size: 14px;
  color: var(--text-muted);
  margin-left: 4px;
}

.section-block {
  margin-bottom: 24px;
}

.block-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 12px;
}

.description-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 12px;
  color: var(--text-muted);
}

.val {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
}

.owner-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--bg);
  border-radius: 12px;
  margin-bottom: 32px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.owner-info .name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
}

.owner-info .stats {
  font-size: 12px;
  color: var(--text-muted);
}

.panel-actions {
  display: flex;
  gap: 12px;
  position: sticky;
  bottom: 0;
  background: var(--surface);
  padding: 20px 0;
  border-top: 1px solid var(--border);
}

.btn-primary {
  flex: 1;
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.btn-outline {
  flex: 1;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-heading);
  padding: 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
</style>
