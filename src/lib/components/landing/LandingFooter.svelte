<script lang="ts">
  /**
   * LandingFooter — минималистичный подвал лендинга.
   * Логотип, копирайт, тонкая золотая линия сверху.
   */
</script>

<footer class="landing-footer">
  <div class="footer-inner">
    <p class="footer-brand">Crown Aero Group</p>
    <p class="footer-copy">© {new Date().getFullYear()} Crown Aero Group. Все права защищены.</p>
    <p class="footer-sub">Официальный дистрибьютор ANG на Кипре</p>
  </div>
</footer>

<style>
  .landing-footer {
    background: var(--color-bg-dark);
    border-top: 1px solid var(--color-gold-dim);
    padding: 2.5rem 2rem;
    text-align: center;
  }

  .footer-inner {
    max-width: 600px;
    margin: 0 auto;
  }

  .footer-brand {
    font-family: var(--font-ui);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--color-gold);
    margin: 0 0 0.75rem;
  }

  .footer-copy {
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 300;
    color: var(--color-text-muted);
    margin: 0 0 0.25rem;
  }

  .footer-sub {
    font-family: var(--font-ui);
    font-size: 10px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.3);
    margin: 0;
  }
</style>
