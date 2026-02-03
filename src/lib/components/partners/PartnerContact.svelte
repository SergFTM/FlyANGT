<script lang="ts">
  /**
   * Partner Contact Component
   *
   * Displays partner contact information.
   */

  interface Props {
    title: string;
    website?: string;
    email?: string;
    telegram?: string;
    websiteLabel: string;
    emailLabel: string;
    telegramLabel: string;
  }

  let { title, website, email, telegram, websiteLabel, emailLabel, telegramLabel }: Props = $props();

  const hasContact = $derived(website || email || telegram);
</script>

{#if hasContact}
  <div class="bg-gray-50 rounded-lg p-6">
    <h3 class="font-semibold text-gray-900 mb-4">{title}</h3>
    <div class="space-y-3">
      {#if website}
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
          </svg>
          <div>
            <span class="text-sm text-gray-500">{websiteLabel}</span>
            <a href={website} target="_blank" rel="noopener noreferrer" class="block text-emerald-600 hover:text-emerald-700">
              {website}
            </a>
          </div>
        </div>
      {/if}

      {#if email}
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <div>
            <span class="text-sm text-gray-500">{emailLabel}</span>
            <a href="mailto:{email}" class="block text-emerald-600 hover:text-emerald-700">
              {email}
            </a>
          </div>
        </div>
      {/if}

      {#if telegram}
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.17.325.015.094.034.31.019.478z"/>
          </svg>
          <div>
            <span class="text-sm text-gray-500">{telegramLabel}</span>
            <span class="block text-emerald-600">{telegram}</span>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
