<script lang="ts">
  /**
   * CyprusRoutes — таблица маршрутов из Кипра.
   * 8 направлений с временем и стоимостью топлива.
   * Расчёт: 28 л/ч × €1,30/л × время.
   */
  import { reveal } from '$lib/actions/reveal';

  const routes = [
    { city: 'Тель-Авив', time: '≈ 1 ч', fuel: '~ €36' },
    { city: 'Бейрут', time: '≈ 0,5 ч', fuel: '~ €18' },
    { city: 'Афины', time: '≈ 2,5 ч', fuel: '~ €91' },
    { city: 'Каир', time: '≈ 1,5 ч', fuel: '~ €55' },
    { city: 'Стамбул', time: '≈ 2,5 ч', fuel: '~ €87' },
    { city: 'Тбилиси', time: '≈ 3,5 ч', fuel: '~ €127' },
    { city: 'Рим', time: '≈ 5,5 ч', fuel: '~ €200' },
    { city: 'Барселона', time: '≈ 7 ч', fuel: '~ €255' },
  ];
</script>

<section class="cyprus" id="cyprus">
  <div class="cyprus-inner">
    <h2 class="cyprus-title" use:reveal>Кипр — ваш аэропорт в центре мира</h2>
    <p class="cyprus-subtitle" use:reveal={{ delay: 100 }}>Прямые перелёты без расписания</p>

    <p class="cyprus-intro" use:reveal={{ delay: 200 }}>
      Живя на Кипре, вы уже находитесь в идеальной точке. Час до Тель-Авива, два с половиной — до Афин.
      Завтрак дома, обед в другой стране.
    </p>

    <div class="routes-grid" use:reveal={{ delay: 300 }}>
      {#each routes as route, i}
        <div class="route-card" style="animation-delay: {i * 80}ms">
          <span class="route-city">{route.city}</span>
          <span class="route-time">{route.time}</span>
          <span class="route-fuel">{route.fuel}</span>
        </div>
      {/each}
    </div>

    <p class="routes-note" use:reveal={{ delay: 400 }}>
      Расчёт: расход 28 л/ч × €1,30/л × время полёта
    </p>
  </div>
</section>

<style>
  .cyprus {
    background-color: var(--color-bg-dark);
    padding: 6rem 2rem;
    border-top: 1px solid rgba(198, 163, 107, 0.15);
  }

  .cyprus-inner {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .cyprus-title {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 0.75rem;
  }

  .cyprus-subtitle {
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: var(--color-text-light);
    margin: 0 0 1.5rem;
  }

  .cyprus-intro {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--color-text-light);
    max-width: 560px;
    margin: 0 auto 3rem;
  }

  .routes-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: rgba(198, 163, 107, 0.12);
    border: 1px solid rgba(198, 163, 107, 0.12);
  }

  .route-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    background: var(--color-bg-dark);
    transition: background 0.3s ease;
  }

  .route-card:hover {
    background: rgba(198, 163, 107, 0.05);
  }

  .route-city {
    font-family: var(--font-ui);
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    flex: 1;
    text-align: left;
  }

  .route-time {
    font-family: var(--font-ui);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-gold);
    margin: 0 1.5rem;
  }

  .route-fuel {
    font-family: var(--font-ui);
    font-size: 13px;
    font-weight: 400;
    color: var(--color-text-muted);
    min-width: 70px;
    text-align: right;
  }

  .routes-note {
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 300;
    color: var(--color-text-muted);
    margin: 1.5rem 0 0;
    letter-spacing: 0.5px;
  }

  /* Адаптив */
  @media (max-width: 768px) {
    .routes-grid {
      grid-template-columns: 1fr;
    }

    .route-card {
      padding: 1rem 1.25rem;
    }
  }
</style>
