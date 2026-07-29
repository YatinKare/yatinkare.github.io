<script>
  import { slide } from 'svelte/transition';

  export let project;
  let expanded = false;
  let active = false;

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

{#if project.href}
  <a
    class="project-row project-link"
    href={project.href}
    target="_blank"
    rel="noreferrer"
    onpointerenter={() => (active = true)}
    onpointerleave={() => (active = false)}
    onfocus={() => (active = true)}
    onblur={() => (active = false)}
  >
    <span class="project-number">{project.number}</span>
    <div>
      <h3>
        {project.name}<span class="row-arrow" aria-hidden="true">
          <svg viewBox="0 0 12 12" focusable="false"><path d="M3 9 9 3M4 3h5v5" /></svg>
        </span>
      </h3>
      <p>{project.description}</p>
    </div>
    <span class="project-meta">
      {#if active}
        Open source <svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M3 9 9 3M4 3h5v5" /></svg>
      {:else}
        {project.meta}
      {/if}
    </span>
  </a>
{:else}
  <article class="project-row private-project" class:is-expanded={expanded}>
    <span class="project-number">{project.number}</span>
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {#if expanded}
        <p class="project-detail" transition:slide={{ duration: prefersReducedMotion() ? 0 : 180 }}>{project.detail}</p>
      {/if}
    </div>
    <button class="details-toggle" type="button" aria-expanded={expanded} onclick={() => (expanded = !expanded)}>
      {expanded ? 'Less −' : 'One detail +'}
    </button>
  </article>
{/if}
