<script lang="ts">
  /**
   * Advantages — 3 карточки преимуществ ANG Crown.
   * Светлый фон, staggered reveal.
   */
  import { reveal } from '$lib/actions/reveal';

  const advantages = [
    {
      number: '370',
      unit: 'км/ч',
      description: 'В 4 раза быстрее автомобиля'
    },
    {
      number: '8–10',
      unit: 'л/100 км',
      description: 'Расход как у вашего авто. Обычный бензин АИ-95'
    },
    {
      number: '2 500+',
      unit: 'км',
      description: 'Без дозаправки — от Кипра до Барселоны'
    }
  ];
</script>

<section class="advantages" id="advantages">
  <div class="advantages-inner">
    <p class="section-label" use:reveal>ПОЧЕМУ ANG CROWN</p>

    <div class="cards">
      {#each advantages as item, i}
        <div class="card" use:reveal={{ delay: (i + 1) * 100 }}>
          <span class="card-number">{item.number}</span>
          <span class="card-unit">{item.unit}</span>
          <p class="card-desc">{item.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .advantages {
    background-color: var(--color-bg-light);
    padding: 6rem 2rem;
  }

  .advantages-inner {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
  }

  .section-label {
    font-family: var(--font-ui);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin: 0 0 3rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .card {
    background: var(--color-bg-white);
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  .card-number {
    display: block;
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 700;
    color: var(--color-gold);
    line-height: 1.1;
  }

  .card-unit {
    display: block;
    font-family: var(--font-ui);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-top: 0.25rem;
    margin-bottom: 1.5rem;
  }

  .card-desc {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.6;
    color: var(--color-text-body);
    margin: 0;
    max-width: 240px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Адаптив */
  @media (max-width: 768px) {
    .cards {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      max-width: 400px;
      margin: 0 auto;
    }

    .card {
      padding: 2.5rem 1.5rem;
    }
  }
</style>
