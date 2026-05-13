<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { booksData } from '../data/books'

const route = useRoute()
const router = useRouter()

const bookId = Number(route.params.id)
const foundBook = booksData.find(b => b.id === bookId)

const book = ref(foundBook || booksData[0]) // fallback to first book if not found

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="book-detail-page">
    <!-- Top Bar -->
    <div class="top-bar">
      <button class="icon-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>
      <div class="top-actions">
        <button class="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        </button>
        <button class="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </div>
    </div>

    <!-- Image Gallery -->
    <div class="image-gallery">
      <img :src="book.img" :alt="book.title" class="main-image" />
      <div class="gallery-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <div class="content-container">
      <!-- Title & Status -->
      <div class="header-section">
        <div class="title-row">
          <h1 class="book-title">{{ book.title }}</h1>
          <span class="status-badge">Mavjud</span>
        </div>
        <p class="book-author">{{ book.author }}</p>
        <div class="rating-row">
          <span class="star">⭐</span>
          <span class="rating-val">{{ book.rating }}</span>
          <span class="reviews-count">({{ book.reviewsCount }} sharh)</span>
        </div>
      </div>

      <!-- Price Card -->
      <div class="price-card">
        <div class="price-main">
          <span class="price-amount">{{ book.price }}</span>
          <span class="price-period">{{ book.pricePeriod }}</span>
        </div>
        <div class="min-period">Minimal ijara muddati: {{ book.minPeriod }}</div>
      </div>

      <!-- Owner Card -->
      <div class="owner-card">
        <div class="owner-avatar">{{ book.owner.initials }}</div>
        <div class="owner-info">
          <h4 class="owner-name">{{ book.owner.name }}</h4>
          <div class="owner-stats">
            <span class="star">⭐</span> {{ book.owner.rating }} • {{ book.owner.booksCount }} ta kitob
          </div>
        </div>
        <div class="chevron">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </div>

      <!-- About Book -->
      <div class="section-block">
        <h3 class="section-title">Kitob haqida</h3>
        <p class="description-text">{{ book.description }}</p>
      </div>

      <!-- Details Grid -->
      <div class="details-grid">
        <div class="detail-item">
          <span class="detail-label">Til</span>
          <span class="detail-val">{{ book.details.language }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Sahifalar</span>
          <span class="detail-val">{{ book.details.pages }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Nashr yili</span>
          <span class="detail-val">{{ book.details.year }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Holati</span>
          <span class="detail-val">{{ book.details.condition }}</span>
        </div>
      </div>

      <!-- Location Card -->
      <div class="location-card">
        <div class="loc-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div class="loc-info">
          <div class="loc-title">Joylashuv</div>
          <div class="loc-desc">{{ book.location.district }}</div>
          <div class="loc-distance">{{ book.location.distance }}</div>
        </div>
      </div>

      <!-- Reviews Summary -->
      <div class="section-block reviews-block">
        <div class="reviews-header">
          <h3 class="section-title">Sharhlar</h3>
          <a href="#" class="view-all">Barchasini ko'rish</a>
        </div>
        <div class="reviews-summary">
          <div class="score-box">
            <span class="big-score">4.9</span>
            <div class="stars-row">⭐⭐⭐⭐⭐</div>
          </div>
          <div class="bars-box">
            <!-- Simulated rating bars -->
            <div class="bar-row"><span class="bar-num">5</span><div class="bar-bg"><div class="bar-fill" style="width: 90%"></div></div></div>
            <div class="bar-row"><span class="bar-num">4</span><div class="bar-bg"><div class="bar-fill" style="width: 15%"></div></div></div>
            <div class="bar-row"><span class="bar-num">3</span><div class="bar-bg"><div class="bar-fill" style="width: 2%"></div></div></div>
            <div class="bar-row"><span class="bar-num">2</span><div class="bar-bg"><div class="bar-fill" style="width: 0%"></div></div></div>
            <div class="bar-row"><span class="bar-num">1</span><div class="bar-bg"><div class="bar-fill" style="width: 0%"></div></div></div>
          </div>
        </div>
      </div>
      
      <!-- Bottom spacing for sticky bar -->
      <div class="bottom-spacer"></div>
    </div>

    <!-- Sticky Bottom Bar -->
    <div class="sticky-bottom-bar">
      <button class="btn-primary">Ijaraga olish</button>
      <button class="btn-outline">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        Yozish
      </button>
    </div>
  </div>
</template>

<style scoped>
.book-detail-page {
  background: var(--bg);
  min-height: 100vh;
  position: relative;
  max-width: 600px; /* Mobile layout simulation on desktop */
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
}

.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}

.icon-btn {
  background: rgba(255,255,255,0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.2s;
}

.icon-btn:hover {
  background: white;
  transform: scale(1.05);
}

.top-actions {
  display: flex;
  gap: 12px;
}

.image-gallery {
  position: relative;
  width: 100%;
  height: 450px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
}

.dot.active {
  background: white;
  width: 20px;
  border-radius: 4px;
}

.content-container {
  padding: 24px;
  background: var(--bg);
  border-radius: 24px 24px 0 0;
  margin-top: -24px;
  position: relative;
  z-index: 5;
}

.header-section {
  margin-bottom: 24px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.book-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-heading);
  line-height: 1.2;
}

.status-badge {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.book-author {
  font-size: 16px;
  color: var(--text);
  margin-bottom: 12px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.rating-val {
  font-weight: 700;
  color: var(--text-heading);
}

.reviews-count {
  color: var(--text-muted);
}

.price-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.price-main {
  margin-bottom: 8px;
}

.price-amount {
  font-size: 28px;
  font-weight: 900;
  color: var(--text-heading);
}

.price-period {
  font-size: 16px;
  color: var(--text-muted);
}

.min-period {
  font-size: 13px;
  color: var(--text-muted);
}

.owner-card {
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 32px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.owner-card:hover {
  border-color: var(--primary);
}

.owner-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  margin-right: 16px;
}

.owner-info {
  flex: 1;
}

.owner-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-heading);
  margin-bottom: 4px;
}

.owner-stats {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.chevron {
  color: var(--text-muted);
}

.section-block {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 16px;
}

.description-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 13px;
  color: var(--text-muted);
}

.detail-val {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-heading);
}

.location-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--surface);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 32px;
}

.loc-icon {
  color: var(--text-muted);
  margin-top: 2px;
}

.loc-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
  margin-bottom: 4px;
}

.loc-desc {
  font-size: 14px;
  color: var(--text);
  margin-bottom: 4px;
}

.loc-distance {
  font-size: 13px;
  color: var(--text-muted);
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.view-all {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
}

.reviews-summary {
  display: flex;
  gap: 24px;
  align-items: center;
  background: var(--surface);
  padding: 20px;
  border-radius: 16px;
}

.score-box {
  text-align: center;
}

.big-score {
  font-size: 36px;
  font-weight: 900;
  color: var(--text-heading);
  line-height: 1;
}

.stars-row {
  font-size: 12px;
  margin-top: 8px;
}

.bars-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar-num {
  font-size: 12px;
  color: var(--text-muted);
  width: 10px;
}

.bar-bg {
  flex: 1;
  height: 6px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #f59e0b;
  border-radius: 4px;
}

.bottom-spacer {
  height: 100px;
}

.sticky-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background: var(--surface);
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 16px;
  z-index: 20;
}

.btn-primary {
  flex: 2;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--primary-light);
}

.btn-outline {
  flex: 1;
  background: transparent;
  color: var(--text-heading);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  padding: 14px 0;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: var(--text-heading);
}

@media (max-width: 600px) {
  .book-detail-page {
    box-shadow: none;
  }
}
</style>
