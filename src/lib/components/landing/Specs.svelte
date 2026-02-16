<script lang="ts">
  /**
   * Specs — технические характеристики в аккордеоне.
   * Svelte 5 $state для toggle.
   */
  import { reveal } from '$lib/actions/reveal';

  let isOpen = $state(false);

  const specs = [
    { label: 'Двигатель', value: 'Rotax 916, Австрия' },
    { label: 'Корпус', value: '100% углепластик' },
    { label: 'Мест', value: '5 (пилот + 4 пассажира)' },
    { label: 'Полезная нагрузка', value: '570 кг' },
    { label: 'Авионика', value: 'Garmin, автопилот' },
    { label: 'Топливо', value: 'Unleaded 95 (обычный бензин)' },
    { label: 'Макс. скорость', value: '370 км/ч' },
    { label: 'Дальность', value: '2 500+ км' },
    { label: 'Расход', value: '28 л/ч (≈ 8–10 л/100 км)' },
  ];
</script>

<section class="specs" id="specs">
  <div class="specs-inner">
    <button
      class="specs-toggle"
      onclick={() => isOpen = !isOpen}
      aria-expanded={isOpen}
      use:reveal
    >
      <span class="specs-toggle-label">ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ</span>
      <span class="specs-toggle-icon" class:open={isOpen}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </span>
    </button>

    {#if isOpen}
      <div class="specs-content">
        {#each specs as spec, i}
          <div class="spec-row" use:reveal={{ delay: i * 50 }}>
            <span class="spec-label">{spec.label}</span>
            <span class="spec-divider"></span>
            <span class="spec-value">{spec.value}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .specs {
    background-color: var(--color-bg-light);
    padding: 3rem 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .specs-inner {
    max-width: 700px;
    margin: 0 auto;
  }

  .specs-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 1rem;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: border-color 0.3s ease;
  }

  .specs-toggle:hover {
    border-color: var(--color-gold-dim);
  }

  .specs-toggle-label {
    font-family: var(--font-ui);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .specs-toggle-icon {
    color: var(--color-text-muted);
    transition: transform 0.3s ease;
    display: flex;
  }

  .specs-toggle-icon.open {
    transform: rotate(180deg);
  }

  .specs-content {
    padding: 2rem 0 1rem;
  }

  .spec-row {
    display: flex;
    align-items: baseline;
    padding: 0.75rem 0;
    gap: 0.75rem;
  }

  .spec-label {
    font-family: var(--font-ui);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .spec-divider {
    flex: 1;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.12);
    margin-bottom: 4px;
  }

  .spec-value {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 400;
    color: var(--color-text-dark);
    white-space: nowrap;
  }

  /* Адаптив */
  @media (max-width: 600px) {
    .spec-row {
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    }

    .spec-divider {
      display: none;
    }

    .spec-value {
      white-space: normal;
    }
  }
</style>
