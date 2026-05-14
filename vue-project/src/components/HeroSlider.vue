<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const currentSlide = ref(0)

const slides = computed(() => [
  {
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=85&w=1200',
    title: t('heroTitle1'),
    desc: t('heroDesc1'),
    color: '#3b82f6'
  },
  {
    img: 'https://images.unsplash.com/photo-1529148482759-b35b25c5f217?auto=format&fit=crop&q=80&w=1000',
    title: t('heroTitle2'),
    desc: t('heroDesc2'),
    color: '#10b981'
  },
  {
    img: 'https://images.unsplash.com/photo-1707256786447-542b820c4d1d?auto=format&fit=crop&q=80&w=1000',
    title: t('heroTitle3'),
    desc: t('heroDesc3'),
    color: '#8b5cf6'
  }
])

let interval: any
onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 6000)
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
            <div class="badge">{{ t('platformBadge') }}</div>
            <h1 class="title">{{ slide.title }}</h1>
            <p class="description">{{ slide.desc }}</p>
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
          
          <div class="slide-visual">
            <div class="visual-wrapper">
              <div class="blur-bg" :style="{ background: slide.color }"></div>
              <div class="image-box">
                <img :src="slide.img" class="slide-img" alt="Slide Image" />
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
  padding: 100px 0;
}

.slides-container {
  display: flex;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

.slide {
  min-width: 100%;
}

.slide-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  align-items: center;
  gap: 60px;
}

.slide-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.badge {
  display: inline-block;
  padding: 8px 18px;
  background: rgba(45, 49, 166, 0.1);
  color: var(--primary);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 24px;
}

.title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-heading);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -2px;
}

.description {
  font-size: 20px;
  color: var(--text-muted);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 48px;
}

.dots {
  display: flex;
  gap: 12px;
}

.dot {
  width: 10px;
  height: 10px;
  background: var(--border);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  width: 32px;
  border-radius: 6px;
  background: var(--primary);
}

.visual-wrapper {
  position: relative;
  width: 440px;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blur-bg {
  position: absolute;
  width: 350px;
  height: 350px;
  filter: blur(80px);
  border-radius: 50%;
  opacity: 0.4;
}

.image-box {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--surface);
  border-radius: 60px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.1);
  border: 8px solid var(--surface);
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 10s linear;
}

.slide:hover .slide-img {
  transform: scale(1.1);
}

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
  }
  .visual-wrapper {
    width: 100%;
    max-width: 400px;
    height: 350px;
    margin: 0 auto;
  }
  .title {
    font-size: 36px;
  }
  .description {
    font-size: 16px;
    margin-bottom: 32px;
  }
}

@media (max-width: 600px) {
  .hero-slider {
    padding: 40px 0;
  }
  .title {
    font-size: 28px;
    letter-spacing: -1px;
  }
  .visual-wrapper {
    height: 280px;
  }
  .image-box {
    border-radius: 40px;
  }
}
</style>
