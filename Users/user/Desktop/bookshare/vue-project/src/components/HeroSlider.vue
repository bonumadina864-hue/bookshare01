<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import bookIcon from '../assets/book_icon.png'
import communityIcon from '../assets/community_icon.png'
import walletIcon from '../assets/wallet_icon.png'

const currentSlide = ref(0)
const slides = [
  {
    img: bookIcon,
    title: 'Yaqin atrofdagi kitoblarni toping',
    desc: 'Minglab kitoblar orasidan o\'zingizga ma\'qulini toping va bevosita egalari bilan bog\'laning.',
    color: '#F0F2FF'
  },
  {
    img: communityIcon,
    title: 'Ishonchli foydalanuvchilardan kitob ijaraga oling',
    desc: 'Hamjamiyatimiz a\'zolari bilan xavfsiz va ishonchli bitimlar tuzing.',
    color: '#FFF7F0'
  },
  {
    img: walletIcon,
    title: 'Kitoblaringiz orqali daromad oling',
    desc: 'O\'qilgan kitoblaringizni ijaraga bering yoki soting va qo\'shimcha daromadga ega bo\'ling.',
    color: '#F5F0FF'
  }
]

let interval: any
onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const goToSlide = (index: number) => {
  currentSlide.value = index
}
</script>

<template>
  <div class="hero-slider">
    <div class="slides-container" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <div class="slide-grid container">
          <div class="slide-text">
            <div class="badge">BookShare Platformasi</div>
            <h1 class="title">{{ slide.title }}</h1>
            <p class="description">{{ slide.desc }}</p>
            <div class="dots-wrapper">
              <div class="dots">
                <span 
                  v-for="(_, i) in slides" 
                  :key="i" 
                  class="dot" 
                  :class="{ active: currentSlide === i }"
                  @click="goToSlide(i)"
                ></span>
              </div>
            </div>
          </div>
          
          <div class="slide-visual">
            <div class="visual-wrapper">
              <div class="blur-bg" :style="{ background: slide.color }"></div>
              <div class="icon-box">
                <img :src="slide.img" class="slide-img" alt="Slide Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-slider {
  width: 100%;
  overflow: hidden;
  background: var(--bg);
  padding: 80px 0;
}

.slides-container {
  display: flex;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

.slide {
  min-width: 100%;
}

.slide-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
}

.slide-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(45, 49, 166, 0.1);
  color: var(--primary);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 24px;
}

.title {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-heading);
  line-height: 1.2;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.description {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 40px;
}

.dots-wrapper {
  margin-top: auto;
}

.dots {
  display: flex;
  gap: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--border);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  width: 28px;
  border-radius: 4px;
  background: var(--primary);
}

.slide-visual {
  display: flex;
  justify-content: center;
}

.visual-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blur-bg {
  position: absolute;
  width: 280px;
  height: 280px;
  filter: blur(60px);
  border-radius: 50%;
  opacity: 0.5;
}

.icon-box {
  position: relative;
  width: 240px;
  height: 240px;
  background: var(--surface);
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 30px;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .hero-slider {
    padding: 60px 0;
  }
  .slide-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  .slide-text {
    align-items: center;
    text-align: center;
  }
  .title {
    font-size: 32px;
  }
  .description {
    font-size: 16px;
    margin-bottom: 30px;
  }
  .visual-wrapper {
    width: 260px;
    height: 260px;
  }
  .icon-box {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 28px;
  }
  .visual-wrapper {
    width: 220px;
    height: 220px;
  }
  .icon-box {
    width: 160px;
    height: 160px;
  }
}
</style>
