<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const steps = [
  { titleKey: 'hiwS1Title', bodyKey: 'hiwS1Body' },
  { titleKey: 'hiwS2Title', bodyKey: 'hiwS2Body' },
  { titleKey: 'hiwS3Title', bodyKey: 'hiwS3Body' },
  { titleKey: 'hiwS4Title', bodyKey: 'hiwS4Body' },
  { titleKey: 'hiwS5Title', bodyKey: 'hiwS5Body' },
  { titleKey: 'hiwS6Title', bodyKey: 'hiwS6Body' }
] as const
</script>

<template>
  <div class="how-page">
    <section class="how-hero">
      <div class="container">
        <div class="badge">{{ t('howItWorksBadge') }}</div>
        <h1 class="hero-title">{{ t('howItWorksPageTitle') }}</h1>
        <p class="hero-desc">{{ t('howItWorksLead') }}</p>
      </div>
    </section>

    <section class="steps-section">
      <div class="container">
        <ol class="steps-list">
          <li v-for="step in steps" :key="step.titleKey" class="step-card">
            <h2 class="step-title">{{ t(step.titleKey) }}</h2>
            <p class="step-body">{{ t(step.bodyKey) }}</p>
          </li>
        </ol>

        <div class="cta-row">
          <router-link to="/register" class="cta primary">{{ t('register') }}</router-link>
          <router-link to="/" class="cta ghost">{{ t('home') }}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.how-page {
  padding-bottom: 100px;
}

.how-hero {
  padding: 100px 0 56px;
  text-align: center;
  background: linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(45, 49, 166, 0.1);
  color: var(--primary);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-heading);
  max-width: 840px;
  margin: 0 auto 20px;
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.hero-desc {
  font-size: 19px;
  color: var(--text-muted);
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.65;
}

.steps-section {
  padding: 40px 0 80px;
}

.steps-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.step-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-heading);
  margin: 0 0 12px;
}

.step-body {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: var(--text);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 48px;
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta.primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 8px 24px rgba(45, 49, 166, 0.25);
}

.cta.primary:hover {
  transform: translateY(-2px);
}

.cta.ghost {
  background: var(--surface-light);
  color: var(--text-heading);
  border: 1px solid var(--border);
}

.cta.ghost:hover {
  border-color: var(--primary);
  color: var(--primary);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 34px;
  }
  .step-card {
    padding: 22px 20px;
  }
}
</style>
