<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['close', 'save']);

const form = ref({
  title: '',
  author: '',
  category: '',
  condition: '',
  price: '',
  pricePeriod: 'kun',
  location: '',
  description: '',
  images: [] as string[],
  coords: null as { lat: number, lng: number } | null
});

const showError = ref(false);
const errorMessage = ref('');

let map: any = null;
let marker: any = null;

onMounted(() => {
  // Mapni initialize qilish (Markaz: O'zbekiston)
  setTimeout(() => {
    // @ts-ignore
    if (typeof L !== 'undefined') {
      // @ts-ignore
      map = L.map('map-selector').setView([41.311081, 69.240562], 12);
      // @ts-ignore
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      map.on('click', (e: any) => {
        if (marker) {
          marker.setLatLng(e.latlng);
        } else {
          // @ts-ignore
          marker = L.marker(e.latlng).addTo(map);
        }
        form.value.coords = { lat: e.latlng.lat, lng: e.latlng.lng };
      });
    }
  }, 400);
});

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const newFiles = Array.from(target.files);
  const remainingSlots = 5 - form.value.images.length;
  
  if (remainingSlots <= 0) {
    triggerError("Maksimal 5 ta rasm yuklash mumkin");
    return;
  }

  const filesToAdd = newFiles.slice(0, remainingSlots);

  filesToAdd.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        form.value.images.push(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index: number) => {
  form.value.images.splice(index, 1);
};

const triggerUpload = () => {
  document.getElementById('bookImagesUpload')?.click();
};

const triggerError = (msg: string) => {
  errorMessage.value = msg;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 4000);
};

const handleSubmit = () => {
  if (!form.value.title || !form.value.author || form.value.images.length === 0 || !form.value.location || !form.value.coords) {
    triggerError("Barcha maydonlarni to'ldiring va xaritadan joyni belgilang!");
    return;
  }
  emit('save', { ...form.value });
};
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <!-- Xatolik xabari (Custom Alert) -->
    <Transition name="fade">
      <div v-if="showError" class="error-toast">
        <div class="error-icon">⚠️</div>
        <div class="error-content">
          <div class="error-title">Xatolik yuz berdi:</div>
          <div class="error-msg">{{ errorMessage }}</div>
        </div>
        <button class="error-close" @click="showError = false">✕</button>
      </div>
    </Transition>

    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Kitob qo'shish</h2>
        <button class="close-btn" @click="emit('close')">✕</button>
      </div>

      <div class="modal-body">
        <!-- Kitob rasmlari -->
        <div class="form-section">
          <h3 class="section-title">Kitob rasmlari *</h3>
          <p class="section-desc">Kitobingizning aniq rasmlarini yuklang (Maksimal 5 ta)</p>
          
          <div class="image-upload-area" @click="form.images.length < 5 ? triggerUpload() : null">
            <input type="file" id="bookImagesUpload" multiple accept="image/*" style="display: none" @change="handleImageUpload" />
            
            <div class="upload-placeholder" v-if="form.images.length === 0">
              <div class="upload-icon">📷</div>
              <p>Rasmlarni yuklang</p>
              <span>yoki shu yerga bosing</span>
              <button class="btn-outline-primary" @click.stop="triggerUpload">Rasm tanlash</button>
              <small>PNG, JPG (maks. 5MB)</small>
            </div>
            
            <div class="uploaded-images-grid" v-else>
              <div class="uploaded-image" v-for="(img, idx) in form.images" :key="idx">
                <img :src="img" />
                <button class="remove-img-btn" @click.stop="removeImage(idx)">✕</button>
              </div>
              <div class="add-more-image" v-if="form.images.length < 5" @click.stop="triggerUpload">
                <span>+</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Kitob ma'lumotlari -->
        <div class="form-section">
          <h3 class="section-title">Kitob ma'lumotlari</h3>
          
          <div class="input-group">
            <label>Kitob nomi *</label>
            <input type="text" v-model="form.title" placeholder="Masalan: O'tkan kunlar" />
          </div>
          
          <div class="input-group">
            <label>Muallif *</label>
            <input type="text" v-model="form.author" placeholder="Masalan: Abdulla Qodiriy" />
          </div>

          <div class="input-group">
            <label>Kategoriya</label>
            <select v-model="form.category">
              <option value="" disabled>Kategoriyani tanlang</option>
              <option value="badiiy">Badiiy adabiyot</option>
              <option value="ilmiy">Ilmiy</option>
              <option value="biznes">Biznes va rivojlanish</option>
            </select>
          </div>

          <div class="input-group">
            <label>Holati</label>
            <select v-model="form.condition">
              <option value="" disabled>Kitob holatini tanlang</option>
              <option value="yangi">Yangi</option>
              <option value="alo">A'lo</option>
              <option value="yaxshi">Yaxshi</option>
              <option value="ortacha">O'rtacha</option>
            </select>
          </div>
        </div>

        <!-- Ijara ma'lumotlari -->
        <div class="form-section">
          <h3 class="section-title">Ijara ma'lumotlari</h3>
          
          <div class="row-inputs">
            <div class="input-group">
              <label>Ijara narxi (so'm) *</label>
              <input type="number" v-model="form.price" placeholder="50000" />
            </div>
            <div class="input-group">
              <label>Muddat</label>
              <select v-model="form.pricePeriod">
                <option value="kun">Kuniga</option>
                <option value="hafta">Haftasiga</option>
                <option value="oy">Oyiga</option>
              </select>
            </div>
          </div>

          <div class="input-group">
            <label>Joylashuv (Viloyat) *</label>
            <select v-model="form.location">
              <option value="" disabled>Viloyatni tanlang</option>
              <option value="Toshkent sh.">Toshkent sh.</option>
              <option value="Toshkent vil.">Toshkent vil.</option>
              <option value="Andijon vil.">Andijon vil.</option>
              <option value="Buxoro vil.">Buxoro vil.</option>
              <option value="Farg'ona vil.">Farg'ona vil.</option>
              <option value="Jizzax vil.">Jizzax vil.</option>
              <option value="Xorazm vil.">Xorazm vil.</option>
              <option value="Namangan vil.">Namangan vil.</option>
              <option value="Navoiy vil.">Navoiy vil.</option>
              <option value="Qashqadaryo vil.">Qashqadaryo vil.</option>
              <option value="Samarqand vil.">Samarqand vil.</option>
              <option value="Sirdaryo vil.">Sirdaryo vil.</option>
              <option value="Surxondaryo vil.">Surxondaryo vil.</option>
              <option value="Qoraqalpog'iston Rep.">Qoraqalpog'iston Rep.</option>
            </select>
          </div>

          <div class="input-group">
            <label>Xaritada belgilang *</label>
            <p class="section-desc">Kitobni topshirish joyini xaritada bosing</p>
            <div id="map-selector" class="map-box"></div>
          </div>
        </div>

        <!-- Tavsif -->
        <div class="form-section">
          <h3 class="section-title">Tavsif</h3>
          <p class="section-desc">Kitob haqida qo'shimcha ma'lumot</p>
          <div class="input-group">
            <textarea v-model="form.description" rows="4" placeholder="Kitobingiz haqida batafsil yozing..." maxlength="500"></textarea>
            <div class="char-count">{{ form.description.length }} / 500 belgi</div>
          </div>
        </div>

      </div>

      <div class="modal-footer">
        <button class="btn-submit" @click="handleSubmit">E'lon qilish</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

/* Error Toast Styling */
.error-toast {
  position: absolute;
  top: 40px;
  background: #ffffff;
  border-left: 8px solid #ef4444;
  padding: 16px 28px;
  border-radius: 14px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1100;
  min-width: 350px;
  border-bottom: 1px solid rgba(239, 68, 68, 0.1);
}

.error-icon {
  font-size: 28px;
}

.error-title {
  font-weight: 900;
  color: #b91c1c; /* To'qroq qizil */
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.error-msg {
  color: #1f2937; /* To'qroq kulrang/qora */
  font-size: 16px;
  font-weight: 800; /* Boldroq */
  line-height: 1.4;
}

.error-close {
  background: #f3f4f6;
  border: none;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  margin-left: auto;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.error-close:hover {
  background: #ef4444;
  color: white;
}

.modal-content {
  background: var(--surface);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--text-heading);
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 4px;
}

.section-desc {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.image-upload-area {
  border: 2px dashed var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  background: var(--bg);
  transition: all 0.2s;
}

.image-upload-area:hover {
  border-color: var(--primary);
  background: var(--surface-light);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.btn-outline-primary {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin: 8px 0;
}

.uploaded-images-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.uploaded-image {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.uploaded-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-img-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
}

.add-more-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 2px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: var(--text-muted);
  cursor: pointer;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
}

.input-group input, .input-group select, .input-group textarea {
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  outline: none;
  font-family: inherit;
  transition: all 0.2s;
}

.input-group input:focus, .input-group select:focus, .input-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.row-inputs {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.map-box {
  width: 100%;
  height: 250px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg);
  z-index: 1;
}

.char-count {
  font-size: 12px;
  color: var(--text-muted);
  text-align: right;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.btn-submit {
  width: 100%;
  padding: 18px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
