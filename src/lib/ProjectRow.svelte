<script>
  import { slide } from 'svelte/transition';

  export let project;
  let expanded = false;
  let active = false;
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
      <h3>{project.name}<span class="row-arrow" aria-hidden="true">↗</span></h3>
      <p>{project.description}</p>
    </div>
    <span class="project-meta">{active ? 'Open source ↗' : project.meta}</span>
  </a>
{:else}
  <article class="project-row private-project" class:is-expanded={expanded}>
    <span class="project-number">{project.number}</span>
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {#if expanded}
        <p class="project-detail" transition:slide={{ duration: 180 }}>{project.detail}</p>
      {/if}
    </div>
    <button class="details-toggle" type="button" aria-expanded={expanded} onclick={() => (expanded = !expanded)}>
      {expanded ? 'Less −' : 'One detail +'}
    </button>
  </article>
{/if}
