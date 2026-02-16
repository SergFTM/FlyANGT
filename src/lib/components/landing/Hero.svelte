<script lang="ts">
  /**
   * Hero — полноэкранный блок (100vh)
   * Фоновое фото самолёта с overlay-градиентом,
   * заголовок ANG Crown, CTA-кнопка, scroll-индикатор.
   */
  import { reveal } from '$lib/actions/reveal';

  // Лёгкий parallax-эффект на фоне
  let scrollY = $state(0);
  let parallaxOffset = $derived(scrollY * 0.3);
</script>

<svelte:window bind:scrollY={scrollY} />

<section class="hero" id="hero">
  <!-- Фоновый плейсхолдер с градиентом -->
  <!-- REPLACE: background-image: url('/images/hero.jpg') -->
  <div class="hero-bg" style="transform: translateY({parallaxOffset}px)"></div>
  <div class="hero-overlay"></div>

  <div class="hero-content">
    <!-- Метка бренда -->
    <p class="hero-label" use:reveal>CROWN AERO GROUP · CYPRUS</p>
    <p class="hero-sublabel" use:reveal={{ delay: 100 }}>Малая авиация нового поколения</p>

    <!-- Заголовок -->
    <h1 class="hero-title" use:reveal={{ delay: 200 }}>
      <span class="title-ang">ANG</span>
      <span class="title-crown">Crown</span>
    </h1>

    <!-- Подзаголовок -->
    <p class="hero-subtitle" use:reveal={{ delay: 300 }}>
      Персональный самолёт по цене автомобиля премиум-класса
    </p>

    <!-- Золотая линия -->
    <div class="hero-divider" use:reveal={{ delay: 400 }}></div>

    <!-- Описание -->
    <p class="hero-text" use:reveal={{ delay: 500 }}>
      Откройте небо для себя и своей семьи. ANG Crown — это свобода перемещения
      между столицами Средиземноморья без расписания, очередей и пересадок.
    </p>

    <!-- CTA -->
    <a href="#contact" class="hero-cta" use:reveal={{ delay: 600 }}>Узнать цену</a>
  </div>

  <!-- Scroll-индикатор -->
  <div class="scroll-indicator">
    <div class="scroll-arrow"></div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--color-bg-dark);
  }

  .hero-bg {
    position: absolute;
    inset: -20% 0 0 0;
    width: 100%;
    height: 120%;
    background: linear-gradient(135deg, #0a1628 0%, #1a3a5a 40%, #0d2240 70%, #0a1628 100%);
    /* REPLACE: background-image: url('/images/hero.jpg'); background-size: cover; background-position: center; */
    opacity: 0.4;
    will-change: transform;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 22, 40, 0.6) 0%,
      rgba(10, 22, 40, 0.3) 50%,
      rgba(10, 22, 40, 0.8) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    padding: 2rem;
  }

  .hero-label {
    font-family: var(--font-ui);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--color-gold);
    margin: 0 0 0.5rem;
  }

  .hero-sublabel {
    font-family: var(--font-ui);
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
    margin: 0 0 2.5rem;
  }

  .hero-title {
    margin: 0 0 1.5rem;
    line-height: 1;
  }

  .title-ang {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(72px, 12vw, 140px);
    font-weight: 700;
    color: var(--color-gold);
    letter-spacing: 4px;
  }

  .title-crown {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(72px, 12vw, 140px);
    font-weight: 400;
    font-style: italic;
    color: #ffffff;
    margin-top: -0.1em;
  }

  .hero-subtitle {
    font-family: var(--font-body);
    font-size: clamp(18px, 2.5vw, 24px);
    font-weight: 300;
    font-style: italic;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-divider {
    width: 60px;
    height: 1px;
    background: var(--color-gold);
    margin: 0 auto 2rem;
  }

  .hero-text {
    font-family: var(--font-body);
    font-size: clamp(16px, 1.8vw, 18px);
    font-weight: 300;
    line-height: 1.7;
    color: var(--color-text-light);
    max-width: 560px;
    margin: 0 auto 2.5rem;
  }

  .hero-cta {
    display: inline-block;
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-bg-dark);
    background: var(--color-gold);
    padding: 16px 40px;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .hero-cta:hover {
    background: #d4b37a;
    transform: translateY(-2px);
    color: var(--color-bg-dark);
  }

  /* Scroll-индикатор */
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 1px solid var(--color-gold-dim);
    border-bottom: 1px solid var(--color-gold-dim);
    transform: rotate(45deg);
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: rotate(45deg) translateY(0); }
    40% { transform: rotate(45deg) translateY(8px); }
    60% { transform: rotate(45deg) translateY(4px); }
  }

  /* Адаптив */
  @media (max-width: 768px) {
    .hero-content {
      padding: 1.5rem;
    }
    .hero-label {
      font-size: 8px;
      letter-spacing: 3px;
    }
    .hero-cta {
      padding: 14px 32px;
      font-size: 10px;
    }
  }

  @media (max-width: 480px) {
    .hero-sublabel {
      font-size: 8px;
    }
  }
</style>
