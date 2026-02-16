<script lang="ts">
  /**
   * Landing Layout — чистый layout без Header/Footer основного приложения.
   * Сброс на корневой app.html через @-синтаксис.
   */
  import '../../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>ANG Crown · Малая авиация на Кипре — Crown Aero Group</title>
</svelte:head>

{@render children()}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(a) {
    color: inherit;
  }
</style>
