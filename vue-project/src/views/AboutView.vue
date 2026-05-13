<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <div class="badge">Biz haqimizda</div>
        <h1 class="hero-title">Kitobxonlar hamjamiyatini <span class="accent-text">birlashtiramiz</span></h1>
        <p class="hero-desc">
          BookShare — bu shunchaki platforma emas, balki bilim ulashish va kitobxonlik madaniyatini yuksaltirishga xizmat qiluvchi katta hamjamiyatdir.
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container grid-2">
        <div class="mission-content">
          <h2 class="section-title">Bizning maqsadimiz</h2>
          <p class="text-content">
            Bizning asosiy maqsadimiz — har bir inson uchun kitoblardan foydalanish imkoniyatini osonlashtirish. Biz odamlarga o'z javonlaridagi o'qilgan kitoblarni boshqalar bilan baham ko'rish, ijaraga berish yoki sotish imkonini beramiz.
          </p>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-num">10k+</span>
              <span class="stat-label">Kitoblar</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">5k+</span>
              <span class="stat-label">Foydalanuvchilar</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">20+</span>
              <span class="stat-label">Shaharlar</span>
            </div>
          </div>
        </div>
        <div class="mission-visual">
          <div class="image-placeholder">
            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80" alt="Library" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title center">Nima uchun BookShare?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="f-icon">🔄</div>
            <h3>Oson almashish</h3>
            <p>O'zingiz o'qigan kitobni boshqa qiziqarli asarga mutlaqo bepul almashtiring.</p>
          </div>
          <div class="feature-card">
            <div class="f-icon">💰</div>
            <h3>Qo'shimcha daromad</h3>
            <p>Shaxsiy kutubxonangizdagi kitoblarni ijaraga bering va foyda ko'ring.</p>
          </div>
          <div class="feature-card">
            <div class="f-icon">📍</div>
            <h3>Yaqin atrofdan topish</h3>
            <p>Geolokatsiya tizimi orqali uyingizga eng yaqin bo'lgan kitoblarni toping.</p>
          </div>
          <div class="feature-card">
            <div class="f-icon">🛡️</div>
            <h3>Xavfsiz bitim</h3>
            <p>Har bir foydalanuvchi reytingi va sharhlar orqali ishonchli hamkorlarni tanlang.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Join CTA -->
    <section class="join-section">
      <div class="container">
        <div class="join-card">
          <h2>Bugunoq bizga qo'shiling!</h2>
          <p>O'z kitoblaringizni ro'yxatdan o'tkazing va kitobxonlar dunyosiga kiring.</p>
          <router-link to="/register" class="cta-btn">Boshlash</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  padding-bottom: 100px;
}

/* Hero Section */
.about-hero {
  padding: 100px 0 80px;
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
  font-size: 56px;
  font-weight: 900;
  color: var(--text-heading);
  max-width: 800px;
  margin: 0 auto 24px;
  line-height: 1.1;
  letter-spacing: -2px;
}

.accent-text {
  color: var(--primary);
}

.hero-desc {
  font-size: 20px;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Mission Section */
.mission-section {
  padding: 100px 0;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.section-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 24px;
}

.section-title.center {
  text-align: center;
  margin-bottom: 60px;
}

.text-content {
  font-size: 18px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 32px;
  font-weight: 900;
  color: var(--primary);
}

.stat-label {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 600;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: var(--surface);
  border-radius: 32px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Features Section */
.features-section {
  padding: 100px 0;
  background: var(--bg);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.feature-card {
  background: var(--surface);
  padding: 40px 30px;
  border-radius: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.f-icon {
  font-size: 40px;
  margin-bottom: 24px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Join Section */
.join-section {
  padding: 100px 0;
}

.join-card {
  background: var(--primary);
  padding: 80px 40px;
  border-radius: 40px;
  text-align: center;
  color: white;
  box-shadow: 0 30px 60px rgba(45, 49, 166, 0.2);
}

.join-card h2 {
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 16px;
}

.join-card p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.cta-btn {
  display: inline-block;
  padding: 18px 48px;
  background: white;
  color: var(--primary);
  text-decoration: none;
  border-radius: 16px;
  font-weight: 800;
  font-size: 18px;
  transition: all 0.2s;
}

.cta-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

@media (max-width: 992px) {
  .hero-title { font-size: 40px; }
  .grid-2 { grid-template-columns: 1fr; gap: 40px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .hero-title { font-size: 32px; }
  .features-grid { grid-template-columns: 1fr; }
  .join-card { padding: 40px 20px; }
  .join-card h2 { font-size: 28px; }
}
</style>
