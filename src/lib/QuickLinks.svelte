<script>
  import { onMount, tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  const links = [
    { label: 'Email Yatin', href: 'mailto:kareyatin@gmail.com', search: 'email contact', key: '↵' },
    { label: 'Open GitHub', href: 'https://github.com/YatinKare', search: 'github code projects', key: 'G', external: true },
    { label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/yatin-kare', search: 'linkedin work profile', key: 'L', external: true },
  ];

  let open = false;
  let query = '';
  let filterInput;
  let dialog;
  let trigger;
  let previousFocus;
  let shortcut = 'Ctrl K';

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  $: visibleLinks = links.filter((link) => link.search.includes(query.trim().toLowerCase()));

  async function openDialog() {
    previousFocus = document.activeElement;
    query = '';
    open = true;
    document.body.classList.add('dialog-open');
    await tick();
    filterInput?.focus();
  }

  function closeDialog() {
    open = false;
    document.body.classList.remove('dialog-open');
    previousFocus?.focus();
  }

  function activateFirst(event) {
    if (event.key !== 'Enter' || !visibleLinks[0]) return;
    dialog.querySelector('.command-list a')?.click();
  }

  function trapFocus(event) {
    if (event.key === 'Escape') {
      closeDialog();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('input, a[href], button:not([tabindex="-1"])')]
      .filter((element) => element.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  onMount(() => {
    shortcut = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? '⌘ K' : 'Ctrl K';
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        open ? closeDialog() : openDialog();
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
      document.body.classList.remove('dialog-open');
    };
  });
</script>

<button bind:this={trigger} class="quick-trigger" type="button" aria-haspopup="dialog" aria-label="Open quick links" onclick={openDialog}>
  <span>Quick links</span><kbd>{shortcut}</kbd>
</button>

{#if open}
  <div bind:this={dialog} class="command-layer" role="dialog" aria-modal="true" aria-labelledby="quick-title" tabindex="-1" onkeydown={trapFocus} transition:fade={{ duration: prefersReducedMotion() ? 0 : 120 }}>
    <button class="command-backdrop" type="button" tabindex="-1" aria-label="Close quick links" onclick={closeDialog}></button>
    <div class="command-box" transition:fly={{ y: prefersReducedMotion() ? 0 : -8, duration: prefersReducedMotion() ? 0 : 150 }}>
      <div class="command-heading"><span id="quick-title">Go somewhere</span><kbd>Esc</kbd></div>
      <input bind:this={filterInput} bind:value={query} type="search" aria-label="Filter quick links" placeholder="Type a destination…" autocomplete="off" onkeydown={activateFirst} />
      <div class="command-list">
        {#each visibleLinks as link}
          <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
            <span>{link.label}</span><kbd>{link.key}</kbd>
          </a>
        {/each}
        {#if visibleLinks.length === 0}<p class="command-empty">No matching link</p>{/if}
      </div>
    </div>
  </div>
{/if}
