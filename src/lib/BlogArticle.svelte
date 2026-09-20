<script>
  import { onMount } from 'svelte';
  import AmbientBackground from './AmbientBackground.svelte';
  import { getPost } from './blogContent.js';

  export let slug;

  const post = getPost(slug);
  const sections = post?.sections || [];
  const structuredData = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        image: `https://yatinkare.com${post.hero}`,
        author: { '@type': 'Person', name: 'Yatin Kare', url: 'https://yatinkare.com/' },
        mainEntityOfPage: `https://yatinkare.com/blog/${post.slug}/`,
      }
    : null;

  let activeSection = sections[0]?.id || '';
  let progress = 0;
  let lightboxOpen = false;

  function handleScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
  }

  function closeLightbox(event) {
    if (event?.key && event.key !== 'Escape') return;
    lightboxOpen = false;
    document.body.classList.remove('dialog-open');
  }

  function openLightbox() {
    lightboxOpen = true;
    document.body.classList.add('dialog-open');
  }

  onMount(() => {
    if (!post) {
      document.title = 'Article not found — Yatin Kare';
      return;
    }

    document.title = `${post.title} — Yatin Kare`;
    const canonical = `https://yatinkare.com/blog/${post.slug}/`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', post.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', post.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', post.description);
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'article');
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', `https://yatinkare.com${post.hero}`);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) activeSection = visible[0].target.id;
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.25, 0.6] },
    );

    sections.forEach(({ id }) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', closeLightbox);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', closeLightbox);
      document.body.classList.remove('dialog-open');
    };
  });
</script>

<svelte:head><script type="application/ld+json">{JSON.stringify(structuredData || {})}</script></svelte:head>

<a class="skip-link" href="#article-body">Skip to article</a>
<AmbientBackground />
<div class="page-progress" style:transform={`scaleX(${progress})`} aria-hidden="true"></div>

<header id="top" class="blog-header article-nav">
  <a class="wordmark" href="/" aria-label="Yatin Kare home">Yatin Kare<span>.</span></a>
  <nav aria-label="Article navigation"><a href="/blog">← All writing</a><a href="https://yatinx.substack.com" target="_blank" rel="noreferrer">Substack ↗</a></nav>
</header>

{#if post}
  <main class="article-page">
    <header class="article-hero">
      <h1>{post.title}</h1>
      <p class="article-dek">{post.description}</p>
      <div class="article-byline">
        <span>By Yatin Kare</span><time datetime={post.date}>{post.dateLabel}</time><span>{post.readTime} read</span>
      </div>
    </header>

    <button class="article-cover" type="button" onclick={openLightbox} aria-label="Open the article image at full size">
      <img src={post.hero} alt={post.heroAlt} />
      <span>Click to expand <b>↗</b></span>
    </button>

    {#if sections.length}
      <aside class="article-rail" aria-label="Article sections">
        <span class="rail-label">In this note</span>
        <div class="rail-track"><span style:height={`${progress * 100}%`}></span></div>
        <nav>
          {#each sections as section, index}
            <a class:active={activeSection === section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.label}</a>
          {/each}
        </nav>
      </aside>
    {/if}

    <article id="article-body" class="article-body markdown-body">{@html post.html}</article>

    <section class="article-end">
      <div class="end-links"><a href="/blog">← All writing</a><a href={post.substack} target="_blank" rel="noreferrer">Read on Substack ↗</a></div>
      <a class="author-card" href="/">
        <img src="/images/yatin-kare-software-engineer.jpg" alt="Yatin Kare" />
        <span><small>About the author</small><strong>Yatin Kare</strong><p>Software engineer building AI-assisted products, cloud systems, and useful tools.</p><b>More about me ↗</b></span>
      </a>
    </section>
  </main>

  <a class="scroll-top" class:visible={progress > 0.12} href="#top" aria-label="Scroll to the top"><span>↑</span></a>
  <div class="reading-blur" aria-hidden="true"></div>

  {#if lightboxOpen}
    <div class="image-lightbox" role="dialog" aria-modal="true" aria-label="Expanded article image">
      <button class="lightbox-backdrop" type="button" aria-label="Close expanded image" onclick={closeLightbox}></button>
      <figure><img src={post.hero} alt={post.heroAlt} /><figcaption>{post.title}</figcaption></figure>
      <button class="lightbox-close" type="button" onclick={closeLightbox}>Close <span>×</span></button>
    </div>
  {/if}
{:else}
  <main class="article-missing"><span>404</span><h1>That note doesn’t exist.</h1><a href="/blog">← Back to all writing</a></main>
{/if}
