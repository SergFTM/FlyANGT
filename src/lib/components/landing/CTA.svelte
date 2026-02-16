<script lang="ts">
  /**
   * CTA — финальный блок призыва к действию.
   * Телефон +357 991 02 991, кнопка «Связаться».
   * Тёмный фон, заголовок золотом.
   */
  import { reveal } from '$lib/actions/reveal';
</script>

<section class="cta" id="contact">
  <div class="cta-inner">
    <h2 class="cta-title" use:reveal>Зафиксируйте цену сейчас</h2>

    <p class="cta-text" use:reveal={{ delay: 100 }}>
      Количество самолётов ограничено. Запишитесь на персональную презентацию
      и зафиксируйте цену на ваш ANG Crown.
    </p>

    <a href="tel:+357991029991" class="cta-phone" use:reveal={{ delay: 200 }}>
      +357 991 02 991
    </a>

    <div class="cta-buttons" use:reveal={{ delay: 300 }}>
      <a href="tel:+357991029991" class="cta-btn cta-btn-primary">Связаться с нами</a>
      <a
        href="https://wa.me/357991029991"
        target="_blank"
        rel="noopener noreferrer"
        class="cta-btn cta-btn-secondary"
      >
        WhatsApp
      </a>
    </div>

    <p class="cta-note" use:reveal={{ delay: 400 }}>
      Crown Aero Group · Официальный дистрибьютор ANG на Кипре
    </p>
  </div>
</section>

<style>
  .cta {
    background-color: var(--color-bg-dark);
    padding: 6rem 2rem;
    text-align: center;
  }

  .cta-inner {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 600;
    color: var(--color-gold);
    margin: 0 0 1.5rem;
  }

  .cta-text {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--color-text-light);
    margin: 0 0 2.5rem;
  }

  .cta-phone {
    display: block;
    font-family: var(--font-ui);
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 300;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: 2px;
    margin: 0 0 2.5rem;
    transition: color 0.3s ease;
  }

  .cta-phone:hover {
    color: var(--color-gold);
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .cta-btn {
    display: inline-block;
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 16px 36px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cta-btn-primary {
    background: var(--color-gold);
    color: var(--color-bg-dark);
    border: 1px solid var(--color-gold);
  }

  .cta-btn-primary:hover {
    background: #d4b37a;
    color: var(--color-bg-dark);
  }

  .cta-btn-secondary {
    background: transparent;
    color: var(--color-gold);
    border: 1px solid var(--color-gold-dim);
  }

  .cta-btn-secondary:hover {
    border-color: var(--color-gold);
    color: #ffffff;
  }

  .cta-note {
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 2px;
    color: var(--color-text-muted);
    margin: 0;
  }

  /* Адаптив */
  @media (max-width: 480px) {
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .cta-btn {
      width: 100%;
      max-width: 280px;
      text-align: center;
    }
  }
</style>
