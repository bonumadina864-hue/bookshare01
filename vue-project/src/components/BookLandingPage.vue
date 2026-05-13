<script setup lang="ts">
import { ref, computed } from 'vue';
import BookCard from './BookCard.vue';
import CategoryPill from './CategoryPill.vue';
import BookDetailSidePanel from './BookDetailSidePanel.vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const categories = computed(() => [
  { name: t('all'), active: true, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
  { name: t('fiction'), active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>' },
  { name: t('science'), active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3h15"></path><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"></path><path d="M6 14h12"></path></svg>' },
  { name: t('business'), active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>' },
  { name: t('art'), active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.688-1.688h1.906c3.11 0 5.625-2.515 5.625-5.625 0-4.836-4.59-8.75-10-8.75z"></path></svg>' },
]);

const activeCategoryIndex = ref(0);

import { booksData as books } from '../data/books';

const userName = ref(localStorage.getItem('userName') || 'Jasur');
const isEditingName = ref(false);
const tempName = ref(userName.value);
const profilePic = ref(localStorage.getItem('profilePic') || '');
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      profilePic.value = result;
      localStorage.setItem('profilePic', result);
    };
    reader.readAsDataURL(file);
  }
};

const saveName = () => {
  if (tempName.value.trim()) {
    userName.value = tempName.value;
    localStorage.setItem('userName', userName.value);
  }
  isEditingName.value = false;
};

const selectedBookId = ref<number | null>(null);
const selectedBook = computed(() => {
  if (selectedBookId.value === null) return null;
  return books.find(b => b.id === selectedBookId.value);
});

const selectBook = (id: number) => {
  selectedBookId.value = id;
};

const closePanel = () => {
  selectedBookId.value = null;
};
</script>

<template>
  <div class="landing-page" :class="{ 'panel-open': selectedBookId }">
    <div class="main-layout">
      <div class="content-wrapper">
        <header class="main-header">
          <div class="container header-content profile-centered">
            <div class="profile-widget">
              <div class="avatar-wrapper" @click="triggerFileInput">
                <img :src="profilePic" alt="Profile" class="avatar-img" v-if="profilePic" />
                <div class="avatar-placeholder" v-else>{{ userName.charAt(0).toUpperCase() }}</div>
                <div class="avatar-overlay">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </div>
              </div>
              <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none" />
              
              <div class="name-wrapper">
                <h1 class="user-name" v-if="!isEditingName">
                  {{ userName }}
                  <button class="edit-btn" @click="isEditingName = true" :title="t('edit')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  </button>
                </h1>
                <div class="edit-name-form" v-else>
                  <input type="text" v-model="tempName" @keyup.enter="saveName" class="name-input" />
                  <button @click="saveName" class="save-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="header-actions">
              <button class="notification-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </button>
            </div>
          </div>
          
          <div class="container search-container">
            <div class="search-bar">
              <span class="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input type="text" :placeholder="t('searchPlaceholder')" class="search-input" />
            </div>
          </div>
        </header>

        <main class="container">
          <section class="categories-section">
            <div class="category-pills">
              <CategoryPill v-for="(cat, index) in categories" :key="cat.name"
                           :name="cat.name"
                           :icon="cat.icon"
                           :active="activeCategoryIndex === index"
                           @click="activeCategoryIndex = index" />
            </div>
          </section>

          <section class="books-section">
            <div class="section-header">
              <h2>{{ t('nearby') }}</h2>
              <a href="#" class="view-all">{{ t('viewAll') }} ></a>
            </div>
            <div class="books-grid">
              <BookCard v-for="book in books" :key="book.id" 
                       :id="book.id"
                       :title="book.title"
                       :rating="book.rating"
                       :location="`${book.location.district}, ${book.location.distance}`"
                       :price="`${book.price} ${book.pricePeriod}`"
                       :image="book.img"
                       @select="selectBook" />
            </div>
          </section>

          <section class="books-section">
            <div class="section-header">
              <h2>{{ t('popularBooks') }}</h2>
              <a href="#" class="view-all">{{ t('viewAll') }} ></a>
            </div>
            <div class="books-grid">
              <BookCard v-for="book in books.slice().reverse()" :key="book.id + '-popular'"
                       :id="book.id"
                       :title="book.title"
                       :rating="book.rating"
                       :location="`${book.location.district}, ${book.location.distance}`"
                       :price="`${book.price} ${book.pricePeriod}`"
                       :image="book.img"
                       @select="selectBook" />
            </div>
          </section>
        </main>
      </div>

      <div class="side-panel-wrapper" v-if="selectedBookId">
        <BookDetailSidePanel :book="selectedBook" @close="closePanel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  background: var(--bg);
  min-height: 100vh;
}

.main-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

.side-panel-wrapper {
  width: 450px;
  position: sticky;
  top: 0;
  height: 100vh;
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

.main-header {
  background-color: var(--header-bg);
  color: white;
  padding: 40px 0 80px 0;
  position: relative;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.profile-centered {
  flex-direction: column;
  align-items: center;
  position: relative;
}

.header-actions {
  position: absolute;
  top: 0;
  right: 16px;
}

.profile-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
}

.avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  cursor: pointer;
  overflow: hidden;
  border: 4px solid rgba(255,255,255,0.3);
  transition: all 0.3s;
}

.avatar-wrapper:hover {
  transform: scale(1.05);
  border-color: white;
}

.avatar-img, .avatar-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 900;
  color: white;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.name-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.user-name {
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.edit-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: rgba(255,255,255,0.3);
}

.edit-name-form {
  display: flex;
  align-items: center;
  gap: 12px;
}

.name-input {
  background: rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 24px;
  font-weight: 800;
  outline: none;
  text-align: center;
  width: 220px;
  transition: border-color 0.2s;
}

.name-input:focus {
  border-color: white;
}

.save-btn {
  background: var(--primary-light, #4f46e5);
  border: 2px solid white;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.save-btn:hover {
  transform: scale(1.1);
}

.notification-btn {
  background: rgba(255, 255, 255, 0.1);
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: white;
}

.notification-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.search-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -28px;
  display: flex;
  justify-content: center;
}

.search-bar {
  background: var(--surface);
  border-radius: 20px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
}

.search-icon {
  margin-right: 16px;
  color: var(--text-muted);
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  background: transparent;
  color: var(--text-heading);
}

.categories-section {
  margin-top: 80px;
  margin-bottom: 32px;
}

.category-pills {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
}

.category-pills::-webkit-scrollbar {
  display: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 48px 0 24px 0;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-heading);
}

.view-all {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}

@media (max-width: 1200px) {
  .books-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
