<script lang="ts">
  /**
   * Главная страница лендинга ANG Crown.
   * Импортирует и рендерит все секции по порядку:
   * Hero → Advantages → Safety → CyprusRoutes → Comparison → Specs → CTA → Footer
   */
  import Hero from '$lib/components/landing/Hero.svelte';
  import Advantages from '$lib/components/landing/Advantages.svelte';
  import Safety from '$lib/components/landing/Safety.svelte';
  import CyprusRoutes from '$lib/components/landing/CyprusRoutes.svelte';
  import Comparison from '$lib/components/landing/Comparison.svelte';
  import Specs from '$lib/components/landing/Specs.svelte';
  import CTA from '$lib/components/landing/CTA.svelte';
  import LandingFooter from '$lib/components/landing/LandingFooter.svelte';
</script>

<main>
  <!-- 1. Hero: полноэкранный блок -->
  <Hero />

  <!-- 2. Преимущества: 3 карточки -->
  <Advantages />

  <!-- 3. Безопасность: тёмная секция -->
  <Safety />

  <!-- 4. Маршруты из Кипра -->
  <CyprusRoutes />

  <!-- 5. Сравнение с автомобилем -->
  <Comparison />

  <!-- 6. Технические характеристики (аккордеон) -->
  <Specs />

  <!-- 7. CTA / Контакт -->
  <CTA />

  <!-- 8. Footer -->
  <LandingFooter />
</main>
