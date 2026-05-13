<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import BookCommentsPanel from './BookCommentsPanel.vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const props = defineProps<{
  book: any;
}>();

const emit = defineEmits(['close']);
const showComments = ref(false);
const bookLikes = ref(0);
const isLiked = ref(false);
const userName = ref(localStorage.getItem('userName') || 'Anonym');

onMounted(() => {
  userName.value = localStorage.getItem('userName') || 'Anonym';
  loadBookLikes();
  
  if (props.book.coords) {
    setTimeout(() => {
      // @ts-ignore
      if (typeof L !== 'undefined') {
        // @ts-ignore
        const miniMap = L.map('mini-map', {
          zoomControl: false,
          attributionControl: false
        }).setView([props.book.coords.lat, props.book.coords.lng], 14);
        
        // @ts-ignore
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(miniMap);
        // @ts-ignore
        L.marker([props.book.coords.lat, props.book.coords.lng]).addTo(miniMap);
      }
    }, 400);
  }
});

const loadBookLikes = () => {
  const userLikes = JSON.parse(localStorage.getItem('user_book_likes') || '{}');
  isLiked.value = !!userLikes[`${userName.value}_${props.book.id}`];

  // Lokal rejimda kitobga qo'shilgan likelarni hisoblash
  const allLikes = JSON.parse(localStorage.getItem('all_book_likes') || '{}');
  bookLikes.value = allLikes[props.book.id] || 0;
};

const toggleBookLike = () => {
  const userLikes = JSON.parse(localStorage.getItem('user_book_likes') || '{}');
  const userKey = `${userName.value}_${props.book.id}`;
  const allLikes = JSON.parse(localStorage.getItem('all_book_likes') || '{}');
  
  if (isLiked.value) {
    allLikes[props.book.id] = Math.max(0, (allLikes[props.book.id] || 0) - 1);
    delete userLikes[userKey];
    isLiked.value = false;
  } else {
    allLikes[props.book.id] = (allLikes[props.book.id] || 0) + 1;
    userLikes[userKey] = Date.now();
    isLiked.value = true;

    // Limit to 30 likes per user
    const userLikeKeys = Object.keys(userLikes).filter(k => k.startsWith(userName.value + '_'));
    if (userLikeKeys.length > 30) {
      // Sort by timestamp ascending (oldest first)
      userLikeKeys.sort((a, b) => (userLikes[a] || 0) - (userLikes[b] || 0));
      const oldestKey = userLikeKeys[0];
      const oldestBookId = oldestKey.split('_')[1];
      
      delete userLikes[oldestKey];
      if (allLikes[oldestBookId]) {
        allLikes[oldestBookId] = Math.max(0, allLikes[oldestBookId] - 1);
      }
    }
  }
  
  localStorage.setItem('all_book_likes', JSON.stringify(allLikes));
  localStorage.setItem('user_book_likes', JSON.stringify(userLikes));
  bookLikes.value = allLikes[props.book.id];
};
</script>

<template>
  <div class="side-panel">
    <div class="panel-header">
      <button class="close-btn" @click="emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <h2 class="panel-title">{{ t('bookDetails') }}</h2>
      <button class="book-like-btn" :class="{ active: isLiked }" @click="toggleBookLike">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" :fill="isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <span class="like-count">{{ bookLikes }}</span>
      </button>
    </div>

    <BookCommentsPanel v-if="showComments" :bookId="book.id" @close="showComments = false" />

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
          <span class="reviews-count">({{ book.reviewsCount }} {{ t('reviews') }}) • ❤️ {{ bookLikes }} likes</span>
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

        <div class="section-block" v-if="book.location">
          <h3 class="block-title">📍 Joylashuv</h3>
          <p class="description-text">{{ book.location.district || book.location }}</p>
          <div id="mini-map" class="mini-map" v-if="book.coords"></div>
        </div>
      </div>
      
      <div class="panel-actions">
        <button class="btn-primary">{{ t('rentNow') }}</button>
        <button class="btn-outline">{{ t('writeMessage') }}</button>
        <button class="btn-comments-new" @click="showComments = !showComments">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>{{ t('comments') }}</span>
        </button>
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
  flex: 1;
}

.debug-label {
  font-size: 10px;
  font-weight: 700;
  margin-left: 4px;
}

.comments-toggle-btn {
  background: var(--primary);
  border: none;
  padding: 0 12px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  position: relative;
  transition: all 0.2s;
  z-index: 20;
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

.mini-map {
  width: 100%;
  height: 180px;
  border-radius: 16px;
  margin-top: 12px;
  border: 1px solid var(--border);
  z-index: 1;
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

.btn-comments-new {
  flex: 1;
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-comments-new:hover {
  background: #e60000;
  transform: translateY(-2px);
}

.book-like-btn {
  background: var(--bg);
  border: none;
  padding: 0 16px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s;
}

.book-like-btn.active {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}

.like-count {
  font-weight: 800;
  font-size: 14px;
}
</style>
