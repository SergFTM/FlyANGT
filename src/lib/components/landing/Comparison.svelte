<script lang="ts">
  /**
   * Comparison — визуальное сравнение «Автомобиль vs ANG Crown».
   * Светлый фон, две колонки.
   */
  import { reveal } from '$lib/actions/reveal';

  const rows = [
    {
      label: 'Кипр → Афины',
      car: '24 ч (паром + авто)',
      plane: '2,5 ч'
    },
    {
      label: 'Кипр → Рим',
      car: 'Невозможно напрямую',
      plane: '5,5 ч'
    },
    {
      label: 'Расход на 100 км',
      car: '8 л',
      plane: '8–10 л'
    },
    {
      label: 'Стоимость',
      car: '€45 000–90 000',
      plane: 'от €370 000'
    }
  ];
</script>

<section class="comparison" id="comparison">
  <div class="comparison-inner">
    <p class="section-label" use:reveal>ЦИФРЫ ГОВОРЯТ САМИ</p>
    <h2 class="comparison-title" use:reveal={{ delay: 100 }}>
      Тот же бензин. В 4 раза быстрее.
    </h2>

    <div class="table-wrapper" use:reveal={{ delay: 200 }}>
      <!-- Заголовки колонок -->
      <div class="table-header">
        <div class="col-label"></div>
        <div class="col-car">Автомобиль</div>
        <div class="col-plane">ANG Crown</div>
      </div>

      <!-- Строки сравнения -->
      {#each rows as row, i}
        <div class="table-row" use:reveal={{ delay: 250 + i * 80 }}>
          <div class="col-label">{row.label}</div>
          <div class="col-car">{row.car}</div>
          <div class="col-plane">{row.plane}</div>
        </div>
      {/each}
    </div>

    <p class="comparison-note" use:reveal={{ delay: 600 }}>
      5 мест · Обычный бензин АИ-95 · Полная свобода перемещения
    </p>
  </div>
</section>

<style>
  .comparison {
    background-color: var(--color-bg-light);
    padding: 6rem 2rem;
  }

  .comparison-inner {
    max-width: 800px;
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
    margin: 0 0 1.5rem;
  }

  .comparison-title {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 600;
    color: var(--color-text-dark);
    margin: 0 0 3rem;
  }

  .table-wrapper {
    text-align: left;
  }

  .table-header,
  .table-row {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem 0;
    align-items: center;
  }

  .table-header {
    border-bottom: 1px solid var(--color-gold-dim);
    padding-bottom: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .table-header .col-car,
  .table-header .col-plane {
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-text-muted);
    text-align: center;
  }

  .table-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .table-row .col-label {
    font-family: var(--font-ui);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-dark);
  }

  .table-row .col-car {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 400;
    color: var(--color-text-body);
    text-align: center;
  }

  .table-row .col-plane {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    color: var(--color-gold);
    text-align: center;
  }

  .comparison-note {
    font-family: var(--font-ui);
    font-size: 12px;
    font-weight: 400;
    color: var(--color-text-muted);
    margin: 2.5rem 0 0;
    letter-spacing: 1px;
  }

  /* Адаптив */
  @media (max-width: 600px) {
    .table-header,
    .table-row {
      grid-template-columns: 1fr;
      gap: 0.25rem;
      text-align: left;
      padding: 0.75rem 0;
    }

    .table-header .col-car,
    .table-header .col-plane,
    .table-row .col-car,
    .table-row .col-plane {
      text-align: left;
    }

    .table-header .col-label {
      display: none;
    }

    .table-row .col-car::before {
      content: 'Авто: ';
      font-family: var(--font-ui);
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .table-row .col-plane::before {
      content: 'ANG Crown: ';
      font-family: var(--font-ui);
      font-size: 11px;
      font-weight: 600;
      color: var(--color-gold-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
</style>
