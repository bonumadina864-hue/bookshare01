<script setup lang="ts">
import { ref } from 'vue';
import BookCard from './BookCard.vue';
import CategoryPill from './CategoryPill.vue';

const categories = ref([
  { name: 'Barchasi', active: true, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
  { name: 'Badiiy', active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>' },
  { name: 'Ilmiy', active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3h15"></path><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"></path><path d="M6 14h12"></path></svg>' },
  { name: 'Biznes', active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>' },
  { name: 'San\'at', active: false, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.688-1.688h1.906c3.11 0 5.625-2.515 5.625-5.625 0-4.836-4.59-8.75-10-8.75z"></path></svg>' },
]);

const books = [
  {
    id: 1,
    title: "O'tkan kunlar",
    rating: 4.9,
    location: 'Chilonzor, 2 km',
    price: '5,000 so\'m/kun',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    title: 'Dunyoning ishlari',
    rating: 4.8,
    location: 'Yunusobod, 3 km',
    price: '7,500 so\'m/kun',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    title: 'Mehnat va g\'alabalar',
    rating: 5.0,
    location: 'Mirzo Ulug\'bek, 1 km',
    price: '6,000 so\'m/kun',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    title: 'Ikki eshik orasi',
    rating: 4.7,
    location: 'Shayxontohur, 4 km',
    price: '4,500 so\'m/kun',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    title: 'Qalbim senga oshno',
    rating: 4.9,
    location: 'Yakkasaroy, 2.5 km',
    price: '5,500 so\'m/kun',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 6,
    title: 'Yoshlik xotiralari',
    rating: 4.6,
    location: 'Mirobod, 5 km',
    price: '3,000 so\'m/kun',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400'
  }
];
</script>

<template>
  <div class="landing-page">
    <header class="main-header">
      <div class="container header-content">
        <div class="user-info">
          <span class="greeting">Assalomu alaykum,</span>
          <h1 class="user-name">Jasur 👋</h1>
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
          <input type="text" placeholder="Kitob qidiring..." class="search-input" />
        </div>
      </div>
    </header>

    <main class="container">
      <section class="categories-section">
        <div class="category-pills">
          <CategoryPill v-for="cat in categories" :key="cat.name"
                       :name="cat.name"
                       :icon="cat.icon"
                       :active="cat.active"
                       @click="categories.forEach(c => c.active = (c === cat))" />
        </div>
      </section>

      <section class="books-section">
        <div class="section-header">
          <h2>Yaqin atrofda</h2>
          <a href="#" class="view-all">Hammasi ></a>
        </div>
        <div class="books-grid">
          <BookCard v-for="book in books" :key="book.id" 
                   :title="book.title"
                   :rating="book.rating"
                   :location="book.location"
                   :price="book.price"
                   :image="book.image" />
        </div>
      </section>

      <section class="books-section">
        <div class="section-header">
          <h2>Mashhur kitoblar</h2>
          <a href="#" class="view-all">Hammasi ></a>
        </div>
        <div class="books-grid">
          <BookCard v-for="book in books.slice().reverse()" :key="book.id + '-popular'"
                   :title="book.title"
                   :rating="book.rating"
                   :location="book.location"
                   :price="book.price"
                   :image="book.image" />
        </div>
      </section>
    </main>

  </div>
</template>

<style scoped>
.landing-page {
  background: var(--bg);
  min-height: 100vh;
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
  margin-bottom: 32px;
}

.greeting {
  font-size: 16px;
  opacity: 0.8;
}

.user-name {
  font-size: 32px;
  font-weight: 800;
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
