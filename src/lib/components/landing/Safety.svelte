<script lang="ts">
  /**
   * Safety — секция безопасности.
   * Тёмный фон, 3 блока с иконками ✦.
   */
  import { reveal } from '$lib/actions/reveal';

  const features = [
    {
      title: 'Баллистический парашют',
      text: 'Система спасения всего самолёта. Срабатывает в любой ситуации за секунды.'
    },
    {
      title: 'Garmin Safe Glide',
      text: 'Автоматическая посадка одним нажатием кнопки. Самолёт сам найдёт ближайшую полосу.'
    },
    {
      title: 'Посадка на грунт',
      text: 'Сотни аэродромов и полос по всему Средиземноморью.'
    }
  ];
</script>

<section class="safety" id="safety">
  <div class="safety-inner">
    <p class="section-label" use:reveal>БЕЗОПАСНОСТЬ — НАШ ПРИОРИТЕТ</p>

    <h2 class="safety-title" use:reveal={{ delay: 100 }}>Летайте спокойно</h2>

    <p class="safety-intro" use:reveal={{ delay: 200 }}>
      Углепластиковый корпус, авионика Garmin с функцией автоматической посадки
      и баллистический парашют делают каждый полёт таким же безопасным, как поездку на автомобиле.
    </p>

    <div class="features">
      {#each features as item, i}
        <div class="feature" use:reveal={{ delay: (i + 1) * 150 }}>
          <div class="feature-icon">
            <span>✦</span>
          </div>
          <h3 class="feature-title">{item.title}</h3>
          <p class="feature-text">{item.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .safety {
    background-color: var(--color-bg-dark);
    padding: 6rem 2rem;
  }

  .safety-inner {
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
    color: var(--color-gold);
    margin: 0 0 2rem;
  }

  .safety-title {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 1.5rem;
  }

  .safety-intro {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto 3.5rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }

  .feature {
    text-align: center;
  }

  .feature-icon {
    width: 56px;
    height: 56px;
    border: 1px solid var(--color-gold-dim);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    transition: border-color 0.3s ease;
  }

  .feature-icon span {
    color: var(--color-gold);
    font-size: 18px;
  }

  .feature:hover .feature-icon {
    border-color: var(--color-gold);
  }

  .feature-title {
    font-family: var(--font-ui);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #ffffff;
    margin: 0 0 1rem;
  }

  .feature-text {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--color-text-light);
    margin: 0;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Адаптив */
  @media (max-width: 768px) {
    .features {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      max-width: 400px;
      margin: 0 auto;
    }
  }
</style>
