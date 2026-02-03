<script lang="ts">
  /**
   * Trust Center Header Component
   *
   * Displays title, subtitle, and search box for the Trust Center.
   */

  interface Props {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchValue: string;
    onSearch: (value: string) => void;
  }

  let { title, subtitle, searchPlaceholder, searchValue, onSearch }: Props = $props();

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    onSearch(target.value);
  }
</script>

<div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-2">{title}</h1>
    <p class="text-blue-100 text-lg mb-8">{subtitle}</p>

    <div class="relative max-w-xl">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchValue}
        oninput={handleInput}
        placeholder={searchPlaceholder}
        class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  </div>
</div>
