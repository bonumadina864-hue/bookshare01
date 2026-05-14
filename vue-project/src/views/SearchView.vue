<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import BookCard from '../components/BookCard.vue'
import NearbyBooksMap from '../components/NearbyBooksMap.vue'
import { booksData as initialBooks } from '../data/books'

type BookListItem = {
  id: number | string
  title: string
  rating: number
  location?: { district: string; distance: string }
  price: string
  pricePeriod?: string
  img: string
}

const { t } = useI18n()
const router = useRouter()

const showDiscovery = ref(false)

const books = ref<BookListItem[]>([...(initialBooks as BookListItem[])])

onMounted(() => {
  const globalBooks = JSON.parse(localStorage.getItem('global_books') || '[]') as BookListItem[]
  books.value = [...(initialBooks as BookListItem[]), ...globalBooks]
})

const openDiscovery = () => {
  showDiscovery.value = true
}

const popularTags = [
  "O'tkan kunlar",
  'Dune',
  'Atomic Habits',
  'Ufq',
  'Rich Dad Poor Dad'
]
const recentTags = ['Xamsa', 'Sariq devni minib', 'Python dasturlash']

const categoryOptions = computed(() => [
  { key: 'all', label: t('all') },
  { key: 'fiction', label: t('fiction') },
  { key: 'science', label: t('science') },
  { key: 'children', label: t('children') },
  { key: 'educational', label: t('educational') },
  { key: 'religion', label: t('religion') }
])

const languageOptions = computed(() => [
  { key: 'all', label: t('allLanguages') },
  { key: 'uz', label: t('uzbekLang') },
  { key: 'ru', label: t('russianLang') },
  { key: 'en', label: t('englishLang') }
])

const conditionOptions = computed(() => [
  { key: 'all', label: t('allLanguages') },
  { key: 'new', label: t('conditionNew') },
  { key: 'vg', label: t('conditionVeryGood') },
  { key: 'good', label: t('conditionGood') },
  { key: 'fair', label: t('conditionFair') }
])

const activeCategory = ref(0)
const activeLanguage = ref(0)
const activeCondition = ref(0)

/** Kategoriya tanlanguncha TIL, til tanlanguncha HOLATI ko‘rinmaydi */
const categoryChosen = ref(false)
const languageChosen = ref(false)

const onCategorySelect = (index: number) => {
  activeCategory.value = index
  categoryChosen.value = true
}

const onLanguageSelect = (index: number) => {
  activeLanguage.value = index
  languageChosen.value = true
}

const priceFrom = ref('0')
const priceTo = ref('1,000,000')

const nearbyCount = ref(23)
const booksBelowMap = ref<HTMLElement | null>(null)

const resultCount = computed(() => books.value.length)

const onNearbyCountUpdate = (n: number) => {
  nearbyCount.value = n
}

const scrollToBooks = () => {
  booksBelowMap.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const selectBook = (id: number | string) => {
  router.push(`/book/${id}`)
}
</script>

<template>
  <div class="search-view">
    <div v-if="!showDiscovery" class="search-gate">
      <button type="button" class="gate-btn" @click="openDiscovery">
        <span class="gate-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <span class="gate-label">{{ t('search') }}</span>
      </button>
    </div>

    <div v-else class="discovery">
      <div class="discovery-inner container">
        <div class="discovery-top">
          <span class="brand">Book<span class="brand-accent">Share</span></span>
          <button type="button" class="icon-btn" :aria-label="t('menu')">
            <span class="burger" />
          </button>
        </div>

        <div class="search-field">
          <span class="field-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input type="search" class="field-input" :placeholder="t('searchDiscoveryPlaceholder')" />
        </div>

        <section class="block">
          <h3 class="block-title">{{ t('popularSearches') }}</h3>
          <div class="pill-row">
            <button v-for="tag in popularTags" :key="tag" type="button" class="pill">{{ tag }}</button>
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">{{ t('recentSearches') }}</h3>
          <div class="pill-row">
            <button v-for="tag in recentTags" :key="tag" type="button" class="pill">{{ tag }}</button>
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">{{ t('categories') }}</h3>
          <div class="pill-row filter-row">
            <button
              v-for="(c, i) in categoryOptions"
              :key="c.key"
              type="button"
              class="filter-pill"
              :class="{ active: activeCategory === i }"
              @click="onCategorySelect(i)"
            >
              {{ c.label }}
            </button>
          </div>
        </section>

        <section v-if="categoryChosen" class="block">
          <h3 class="block-title">{{ t('language') }}</h3>
          <div class="pill-row filter-row">
            <button
              v-for="(c, i) in languageOptions"
              :key="c.key"
              type="button"
              class="filter-pill"
              :class="{ active: activeLanguage === i }"
              @click="onLanguageSelect(i)"
            >
              {{ c.label }}
            </button>
          </div>
        </section>

        <section v-if="languageChosen" class="block">
          <h3 class="block-title">{{ t('condition') }}</h3>
          <div class="pill-row filter-row">
            <button
              v-for="(c, i) in conditionOptions"
              :key="c.key"
              type="button"
              class="filter-pill"
              :class="{ active: activeCondition === i }"
              @click="activeCondition = i"
            >
              {{ c.label }}
            </button>
          </div>
        </section>

        <section class="block price-block">
          <h3 class="block-title">{{ t('priceRange') }}</h3>
          <div class="price-row">
            <label class="price-field">
              <span class="price-hint">{{ t('fromPrice') }}</span>
              <input v-model="priceFrom" type="text" class="price-input" />
            </label>
            <label class="price-field">
              <span class="price-hint">{{ t('toPrice') }}</span>
              <input v-model="priceTo" type="text" class="price-input" />
            </label>
          </div>
        </section>

        <section class="block map-block">
          <div class="section-head">
            <h3 class="block-title tight">{{ t('nearbyBooksMap') }}</h3>
            <button type="button" class="linkish" @click="scrollToBooks">{{ t('viewAll') }}</button>
          </div>
          <NearbyBooksMap @count-update="onNearbyCountUpdate" />
          <p class="map-caption">{{ t('booksFoundRadius', { n: nearbyCount }) }}</p>
        </section>

        <section ref="booksBelowMap" class="block books-block">
          <div class="section-head">
            <h3 class="block-title tight">{{ t('booksForYou') }}</h3>
          </div>
          <p class="result-line">{{ t('booksFoundShort', { n: resultCount }) }}</p>
          <div v-if="books.length === 0" class="empty-books">{{ t('noBooks') }}</div>
          <div v-else class="books-grid">
            <BookCard
              v-for="book in books"
              :key="book.id"
              :id="book.id"
              :title="book.title"
              :rating="book.rating"
              :location="`${book.location?.district ?? ''} • ${book.location?.distance ?? ''}`"
              :price="`${book.price} ${book.pricePeriod ?? ''}`"
              :image="book.img"
              @select="selectBook"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view {
  min-height: calc(100vh - 80px);
}

.search-gate {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.gate-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 22px 36px 20px;
  background: var(--surface);
  border: 1px solid #0f172a;
  border-radius: 22px;
  font: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
}

.gate-icon {
  color: #475569;
  display: flex;
}

.gate-label {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #475569;
  text-transform: uppercase;
}

.discovery {
  background: var(--bg);
  padding-bottom: 48px;
}

.discovery-inner {
  padding-top: 20px;
  max-width: 720px;
}

.discovery-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.brand {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--primary);
}

.brand-accent {
  color: var(--text-heading);
}

.icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger {
  width: 18px;
  height: 2px;
  background: var(--text-heading);
  border-radius: 1px;
  box-shadow: 0 -6px 0 var(--text-heading), 0 6px 0 var(--text-heading);
}

.search-field {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px 18px;
  margin-bottom: 22px;
  box-shadow: var(--shadow);
}

.field-icon {
  color: var(--text-muted);
  flex-shrink: 0;
}

.field-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-heading);
  outline: none;
}

.block {
  margin-bottom: 20px;
}

.block-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.block-title.tight {
  margin-bottom: 0;
}

.pill-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}

.pill {
  flex-shrink: 0;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}

.filter-pill {
  flex-shrink: 0;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-heading);
}

.filter-pill.active {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
  color: #fff;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.linkish {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: underline;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
}

.map-caption {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
}

.price-row {
  display: flex;
  gap: 12px;
}

.price-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.price-hint {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
}

.price-input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 600;
  background: var(--surface);
  color: var(--text-heading);
  font-family: inherit;
}

.result-line {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.empty-books {
  padding: 32px;
  text-align: center;
  color: var(--text-muted);
  font-weight: 600;
  background: var(--surface);
  border-radius: 16px;
  border: 1px dashed var(--border);
}

@media (min-width: 900px) {
  .books-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .discovery-inner {
    max-width: 960px;
  }
}
</style>
