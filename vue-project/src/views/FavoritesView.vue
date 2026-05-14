<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from '../composables/useI18n';
import BookCardPulled from '../components/BookCardPulled.vue';
import { booksData } from '../data/books';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const userName = ref('');
const favoriteBooks = ref<any[]>([]);

onMounted(() => {
  userName.value = localStorage.getItem('userName') || 'Anonym';
  loadFavorites();
});

const loadFavorites = () => {
  const userLikes = JSON.parse(localStorage.getItem('user_book_likes') || '{}');
  const userLikeKeys = Object.keys(userLikes).filter(k => k.startsWith(userName.value + '_'));
  
  // Tartiblash: oxirgi bosilganlari boshida chiqishi uchun
  userLikeKeys.sort((a, b) => (userLikes[b] || 0) - (userLikes[a] || 0));
  
  const top30Keys = userLikeKeys.slice(0, 30);
  const likedIds = top30Keys.map(k => k.split('_')[1]);
  
  // Barcha kitoblar (statik + foydalanuvchilar qo'shgan)
  const globalBooks = JSON.parse(localStorage.getItem('global_books') || '[]');
  const allAvailableBooks = [...booksData, ...globalBooks];
  
  favoriteBooks.value = allAvailableBooks
    .filter(b => likedIds.includes(String(b.id)))
    .map(b => ({
      ...b,
      location: typeof b.location === 'object' ? `${b.location.district}, ${b.location.distance}` : b.location,
      price: b.price.includes('so\'m') ? b.price : `${b.price} ${b.pricePeriod}`
    }));
};

const handleSelectBook = (id: number | string) => {
  router.push(`/book/${id}`);
};
</script>

<template>
  <div class="favorites-view">
    <div class="header-section">
      <h1 class="page-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="heart-icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        {{ t('savedBooks') }}
      </h1>
      <p class="subtitle">{{ favoriteBooks.length }} ta kitob saqlangan (Maksimum 30 ta)</p>
    </div>

    <div v-if="favoriteBooks.length === 0" class="empty-state">
      <div class="empty-icon">💔</div>
      <h2>Hali hech qanday kitobni yoqtirmadingiz</h2>
      <p>Kitoblarga "Like" bosing va ular shu yerda paydo bo'ladi!</p>
      <button class="browse-btn" @click="router.push('/')">Kitoblarni ko'rish</button>
    </div>

    <div v-else class="favorites-grid">
      <BookCardPulled
        v-for="book in favoriteBooks"
        :key="book.id"
        :book="book"
        @select="handleSelectBook"
      />
    </div>
  </div>
</template>

<style scoped>
.favorites-view {
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 80vh;
}

.header-section {
  margin-bottom: 40px;
  text-align: center;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text);
  margin: 0 0 8px 0;
}

.heart-icon {
  color: #ff4757;
}

.subtitle {
  color: var(--text-muted);
  font-size: 16px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  max-width: 600px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.8;
}

.empty-state h2 {
  font-size: 24px;
  margin: 0 0 12px 0;
}

.empty-state p {
  color: var(--text-muted);
  margin: 0 0 30px 0;
}

.browse-btn {
  padding: 12px 32px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.browse-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(45, 49, 166, 0.3);
}

@media (max-width: 768px) {
  .favorites-view {
    padding: 20px 16px;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }
  .subtitle {
    font-size: 13px;
  }
}
</style>
