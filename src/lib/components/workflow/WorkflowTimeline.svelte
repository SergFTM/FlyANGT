<script lang="ts">
  /**
   * Workflow Timeline Component
   *
   * Horizontal timeline showing all workflow steps.
   */

  interface TimelineStep {
    id: string;
    title: string;
    order: number;
    href: string;
  }

  interface Props {
    steps: TimelineStep[];
    activeStepId?: string;
  }

  let { steps, activeStepId }: Props = $props();
</script>

<section class="py-12 px-4 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <!-- Desktop timeline -->
    <div class="hidden md:block">
      <div class="relative">
        <!-- Horizontal line -->
        <div class="absolute top-6 left-0 right-0 h-0.5 bg-blue-200"></div>

        <div class="flex justify-between">
          {#each steps as step (step.id)}
            {@const isActive = step.id === activeStepId}
            <a
              href={step.href}
              class="relative flex flex-col items-center group"
            >
              <!-- Circle marker -->
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10 transition-colors {isActive ? 'bg-blue-600 text-white' : 'bg-white border-2 border-blue-300 text-blue-600 group-hover:border-blue-500'}">
                {step.order}
              </div>
              <!-- Label -->
              <span class="mt-3 text-sm font-medium text-center max-w-[100px] {isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}">
                {step.title}
              </span>
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Mobile timeline (vertical) -->
    <div class="md:hidden">
      <div class="relative pl-8">
        <!-- Vertical line -->
        <div class="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-200"></div>

        <div class="space-y-4">
          {#each steps as step (step.id)}
            {@const isActive = step.id === activeStepId}
            <a
              href={step.href}
              class="relative flex items-center gap-4 group"
            >
              <!-- Circle marker -->
              <div class="absolute left-[-20px] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-colors {isActive ? 'bg-blue-600 text-white' : 'bg-white border-2 border-blue-300 text-blue-600 group-hover:border-blue-500'}">
                {step.order}
              </div>
              <!-- Label -->
              <span class="text-base font-medium {isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}">
                {step.title}
              </span>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
