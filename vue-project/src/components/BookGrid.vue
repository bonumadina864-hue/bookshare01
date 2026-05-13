<script setup lang="ts">
import BookCardPulled from './BookCardPulled.vue'

const books = [
  {
    id: 1,
    title: "O'tkan kunlar",
    img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    location: "Chilonzor, 2 km",
    price: "5,000 so'm/kun"
  },
  {
    id: 2,
    title: "Dunyoning ishlari",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    location: "Yunusobod, 3 km",
    price: "7,500 so'm/kun"
  },
  {
    id: 3,
    title: "Mehnat va g'alabalar",
    img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    location: "Mirzo Ulug'bek, 1 km",
    price: "6,000 so'm/kun"
  },
  {
    id: 4,
    title: "Ikki eshik orasi",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    location: "Shayxontohur, 4 km",
    price: "4,500 so'm/kun"
  },
  {
    id: 5,
    title: "Qalbim senga oshno",
    img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    location: "Yakkasaroy, 2.5 km",
    price: "5,500 so'm/kun"
  },
  {
    id: 6,
    title: "Yoshlik xotiralari",
    img: "https://images.unsplash.com/photo-1524578271613-d550eebaa650?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    location: "Mirobod, 5 km",
    price: "3,000 so'm/kun"
  }
]
</script>

<template>
  <section class="book-grid-section container">
    <div class="section-header">
      <h2 class="section-title">Yaqin atrofda</h2>
      <a href="#" class="view-all">Hammasi ></a>
    </div>
    
    <div class="grid">
      <BookCardPulled v-for="book in books" :key="book.id" :book="book" />
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
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
</style>
