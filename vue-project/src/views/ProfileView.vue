<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from '../composables/useI18n';
import AddBookModal from '../components/AddBookModal.vue';
import { db, isFirebaseLive } from '../firebase';
import { ref as dbRef, push, set, onValue } from 'firebase/database';

const { t } = useI18n();
const showAddBookModal = ref(false);
const showDeleteConfirm = ref(false);
const bookIdToDelete = ref<number | string | null>(null);

const userName = ref(localStorage.getItem('userName') || 'Jasur');
const isEditingName = ref(false);
const newName = ref(userName.value);
const profilePic = ref(localStorage.getItem('profilePic') || '');

// Mock user's books - Empty for fresh start
const userBooks = ref<any[]>([]);

// Other stats
const savedCount = ref(12);
const rentedCount = ref(3);

const totalLikes = computed(() => {
  return userBooks.value.reduce((sum, book) => sum + (book.likes || 0), 0);
});

onMounted(() => {
  // Eski test ma'lumotlarini tozalash (Faqat bir marta)
  if (!localStorage.getItem('fresh_start_v2')) {
    localStorage.removeItem('myUploadedBooks');
    localStorage.removeItem('global_books');
    localStorage.setItem('fresh_start_v2', 'true');
  }

  console.log('ProfileView mounted');
  try {
    const storedBooks = localStorage.getItem('myUploadedBooks');
    if (storedBooks) {
      userBooks.value = JSON.parse(storedBooks);
    }
  } catch (err) {
    console.error('Failed to load books from localStorage:', err);
  }
});

const saveName = () => {
  if (newName.value.trim()) {
    userName.value = newName.value;
    localStorage.setItem('userName', userName.value);
    isEditingName.value = false;
  }
};

const cancelEdit = () => {
  newName.value = userName.value;
  isEditingName.value = false;
};

const deleteBook = (id: number | string) => {
  bookIdToDelete.value = id;
  showDeleteConfirm.value = true;
};

const confirmDelete = () => {
  if (bookIdToDelete.value !== null) {
    const bookToRemove = userBooks.value.find(b => b.id === bookIdToDelete.value);
    
    // 1. Profil (local view) dan o'chirish
    userBooks.value = userBooks.value.filter(b => b.id !== bookIdToDelete.value);
    localStorage.setItem('myUploadedBooks', JSON.stringify(userBooks.value));

    // 2. Global bazadan o'chirish (Firebase yoki localStorage fallback)
    if (isFirebaseLive() && db) {
      // Firebase dan o'chirish (id bo'yicha)
      const globalBooksRef = dbRef(db, 'globalBooks');
      onValue(globalBooksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach(key => {
            // Agar id yoki sarlavha mos kelsa o'chirish
            if (data[key].id === bookIdToDelete.value || data[key].title === bookToRemove?.title) {
              set(dbRef(db, `globalBooks/${key}`), null);
            }
          });
        }
      }, { onlyOnce: true });
    } else {
      // LocalStorage global_books dan o'chirish
      let globalBooks = JSON.parse(localStorage.getItem('global_books') || '[]');
      globalBooks = globalBooks.filter((b: any) => b.id !== bookIdToDelete.value && b.title !== bookToRemove?.title);
      localStorage.setItem('global_books', JSON.stringify(globalBooks));
    }

    showDeleteConfirm.value = false;
    bookIdToDelete.value = null;
  }
};

const handleSaveBook = (bookData: any) => {
  const newBook = {
    id: Date.now(),
    title: bookData.title,
    author: bookData.author,
    img: bookData.images[0] || 'https://via.placeholder.com/400x600?text=No+Image',
    rating: 0,
    reviewsCount: 0,
    price: bookData.price,
    pricePeriod: bookData.pricePeriod,
    minPeriod: '1 ' + bookData.pricePeriod,
    owner: { name: userName.value, initials: userName.value.charAt(0).toUpperCase(), rating: 5.0, booksCount: userBooks.value.length + 1 },
    description: bookData.description,
    details: { language: "O'zbek", pages: 0, year: new Date().getFullYear(), condition: bookData.condition },
    location: { district: bookData.location, distance: "Yaqin" },
    coords: bookData.coords,
    likes: 0
  };

  // Add to local user profile
  userBooks.value.push(newBook);
  localStorage.setItem('myUploadedBooks', JSON.stringify(userBooks.value));

  // Push to global store (Firebase or localStorage fallback)
  if (isFirebaseLive() && db) {
    const globalBooksRef = dbRef(db, 'globalBooks');
    const newBookRef = push(globalBooksRef);
    set(newBookRef, newBook);
  } else {
    const globalBooks = JSON.parse(localStorage.getItem('global_books') || '[]');
    globalBooks.push(newBook);
    localStorage.setItem('global_books', JSON.stringify(globalBooks));
  }

  showAddBookModal.value = false;
};

const triggerFileInput = () => {
  const input = document.getElementById('profile-upload') as HTMLInputElement;
  input?.click();
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
</script>

<template>
  <div class="profile-page">
    <div class="container">
      <!-- Profile Header Card -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-container" @click="triggerFileInput">
            <img :src="profilePic" alt="Profile" class="profile-img" v-if="profilePic" />
            <div class="profile-placeholder" v-else>{{ userName.charAt(0).toUpperCase() }}</div>
            <div class="upload-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </div>
          </div>
          <input type="file" id="profile-upload" @change="onFileChange" accept="image/*" style="display: none" />
          
          <div class="name-edit-wrapper">
            <div v-if="!isEditingName" class="name-display">
              <h1 class="user-name">{{ userName }}</h1>
              <button class="edit-icon-btn" @click="isEditingName = true" :title="t('edit')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
              </button>
            </div>
            <div v-else class="name-input-group">
              <input v-model="newName" class="name-input" @keyup.enter="saveName" @keyup.esc="cancelEdit" autofocus />
              <div class="edit-actions">
                <button class="save-btn" @click="saveName">✓</button>
                <button class="cancel-btn" @click="cancelEdit">✕</button>
              </div>
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ userBooks.length }}</div>
            <div class="stat-label">{{ t('myBooks') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ savedCount }}</div>
            <div class="stat-label">{{ t('savedBooks') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ rentedCount }}</div>
            <div class="stat-label">{{ t('rentedBooks') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ totalLikes }}</div>
            <div class="stat-label">{{ t('likes') }} (Total)</div>
          </div>
        </div>
      </div>


      <!-- My Books Section -->
      <section class="my-books-section">
        <div class="section-header">
          <h2 class="section-title">{{ t('myBooks') }}</h2>
        </div>

        <div class="books-grid">
          <div v-for="book in userBooks" :key="book.id" class="book-card">
            <div class="book-img-wrapper">
              <img :src="book.img" :alt="book.title" class="book-img" />
              <button class="delete-btn" @click="deleteBook(book.id)" :title="t('deleteBook')">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <div class="book-footer">
                <span class="book-price">{{ book.price }} {{ book.pricePeriod }}</span>
                <span class="book-likes">❤️ {{ book.likes }}</span>
              </div>
            </div>
          </div>
          <div class="book-card add-book-card" @click="showAddBookModal = true">
            <div class="add-icon">+</div>
            <div class="add-text">Yangi kitob qo'shish</div>
          </div>
        </div>
      </section>
    </div>
  </div>
  
  <AddBookModal v-if="showAddBookModal" @close="showAddBookModal = false" @save="handleSaveBook" />

  <!-- Custom Delete Confirmation Modal -->
  <Transition name="scale">
    <div v-if="showDeleteConfirm" class="confirm-overlay" @click.self="showDeleteConfirm = false">
      <div class="confirm-modal">
        <div class="confirm-icon">🗑️</div>
        <h3 class="confirm-title">Kitobni o'chirish</h3>
        <p class="confirm-text">Haqiqatan ham ushbu kitobni o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
        <div class="confirm-actions">
          <button class="btn-cancel" @click="showDeleteConfirm = false">Bekor qilish</button>
          <button class="btn-delete" @click="confirmDelete">O'chirib tashlash</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.profile-page {
  padding: 40px 0 100px;
  background: var(--bg);
  min-height: calc(100vh - 80px);
}

.profile-card {
  background: var(--surface);
  border-radius: 32px;
  padding: 40px;
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.03);
  margin-bottom: 60px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.avatar-container {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-bottom: 20px;
  cursor: pointer;
  border: 4px solid var(--primary-light);
  padding: 4px;
  background: var(--bg);
  transition: all 0.3s;
}

.avatar-container:hover {
  transform: scale(1.05);
}

.profile-img, .profile-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-placeholder {
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  font-weight: 900;
}

.upload-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-container:hover .upload-overlay {
  opacity: 1;
}

.user-name {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-heading);
}

.name-edit-wrapper {
  margin-top: 10px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.edit-icon-btn {
  background: var(--surface-light);
  border: 1px solid var(--border);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s;
}

.edit-icon-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: scale(1.1);
}

.name-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface-light);
  padding: 4px 4px 4px 16px;
  border-radius: 14px;
  border: 2px solid var(--primary);
}

.name-input {
  background: transparent;
  border: none;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-heading);
  outline: none;
  width: 200px;
}

.edit-actions {
  display: flex;
  gap: 4px;
}

.save-btn, .cancel-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 900;
  transition: all 0.2s;
}

.save-btn {
  background: var(--primary);
  color: white;
}

.save-btn:hover {
  background: #10b981;
}

.cancel-btn {
  background: var(--border);
  color: var(--text-muted);
}

.cancel-btn:hover {
  background: #ef4444;
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  border-top: 1px solid var(--border);
  padding-top: 32px;
}


.stat-item {
  text-align: center;
  padding: 16px;
  border-radius: 20px;
  background: var(--bg);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.stat-item:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
}

.stat-value {
  font-size: 24px;
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-header {
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-heading);
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

.book-card {
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  overflow: hidden;
  transition: all 0.3s;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.book-img-wrapper {
  position: relative;
  aspect-ratio: 3/4;
}

.book-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #ef4444;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

.book-info {
  padding: 16px;
}

.book-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 4px;
}

.book-author {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.book-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.book-price {
  font-weight: 800;
  color: var(--primary);
}

.book-likes {
  font-weight: 700;
  color: var(--text-muted);
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.add-book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--primary);
  background: transparent;
  cursor: pointer;
  min-height: 300px;
  color: var(--primary);
}

.add-book-card:hover {
  background: rgba(99, 102, 241, 0.05);
}

.add-icon {
  font-size: 64px;
  font-weight: 300;
  margin-bottom: 16px;
}

.add-text {
  font-size: 16px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 20px 0 80px;
  }
  .profile-card {
    padding: 24px;
    border-radius: 24px;
    margin-bottom: 40px;
  }
  .user-name {
    font-size: 24px;
  }
  .avatar-container {
    width: 100px;
    height: 100px;
  }
  .profile-placeholder {
    font-size: 40px;
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding-top: 24px;
  }
  .stat-item {
    padding: 12px;
  }
  .stat-value {
    font-size: 20px;
  }
  .stat-label {
    font-size: 11px;
  }
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .add-book-card {
    min-height: 200px;
  }
}

@media (max-width: 480px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .book-info {
    padding: 10px;
  }
  .book-title {
    font-size: 14px;
  }
  .book-author {
    font-size: 12px;
    margin-bottom: 8px;
  }
  .book-price {
    font-size: 12px;
  }
  .add-book-card {
    min-height: 180px;
  }
  .add-icon {
    font-size: 40px;
  }
  .add-text {
    font-size: 12px;
  }
}


/* Custom Confirm Modal Styles */
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
}

.confirm-modal {
  background: var(--surface);
  padding: 32px;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  border: 1px solid var(--border);
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
}

.confirm-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.confirm-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--text-heading);
  margin-bottom: 12px;
}

.confirm-text {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.confirm-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel, .btn-delete {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: var(--bg);
  color: var(--text-heading);
  border: 1px solid var(--border);
}

.btn-cancel:hover {
  background: var(--surface-light);
}

.btn-delete {
  background: #ef4444;
  color: white;
  border: none;
}

.btn-delete:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
}

/* Animations */
.scale-enter-active, .scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from, .scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
