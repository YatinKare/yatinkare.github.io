<script>
  import { onMount } from 'svelte';
  import AmbientBackground from './AmbientBackground.svelte';
  import BlogMark from './BlogMark.svelte';
  import { featuredPost, posts } from './blogContent.js';

  const remainingPosts = posts.filter((post) => post.slug !== featuredPost.slug);

  onMount(() => {
    document.title = 'My Writing — Yatin Kare';
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://yatinkare.com/blog/');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'My Writing — Yatin Kare');
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://yatinkare.com/blog/');
  });
</script>

<svelte:head>
  <meta name="description" content="Writing by Yatin Kare about software, AI systems, and thoughtful interfaces." />
</svelte:head>

<a class="skip-link" href="#writing-main">Skip to writing</a>
<AmbientBackground />

<header class="blog-header">
  <a class="wordmark" href="/" aria-label="Yatin Kare home">Yatin Kare<span>.</span></a>
  <nav aria-label="Blog navigation">
    <a href="/">Home</a>
    <a class="active" href="/blog">Writing</a>
    <a href="https://github.com/YatinKare" target="_blank" rel="noreferrer">GitHub ↗</a>
  </nav>
</header>

<main id="writing-main" class="collection collection-writing">
  <h1>My Writing</h1>

  <a class="featured-story" href={`/blog/${featuredPost.slug}`}>
    <div class="featured-copy">
      <span class="latest-label">Latest</span>
      <h2>{featuredPost.title}</h2>
      <p>{featuredPost.description}</p>
      <span class="read-link">Read the essay <b>↗</b></span>
    </div>
    <BlogMark src={featuredPost.hero} alt={featuredPost.heroAlt} />
  </a>

  <section class="plain-index" aria-labelledby="all-writing">
    <div class="index-heading">
      <h2 id="all-writing">More writing</h2>
      <span>{remainingPosts.length} {remainingPosts.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    {#each remainingPosts as post, index}
      <a class="index-row" href={`/blog/${post.slug}`}>
        <span class="post-number">{String(index + 2).padStart(3, '0')}</span>
        <span class="index-title">{post.title}</span>
        <time datetime={post.date}>{post.dateLabel}</time>
        <span class="read-time">{post.readTime}</span>
        <span class="index-arrow">↗</span>
      </a>
    {/each}
  </section>

  <aside class="subscribe-note">
    <span>Prefer your reading elsewhere?</span>
    <a href="https://yatinx.substack.com" target="_blank" rel="noreferrer">Find me on Substack ↗</a>
  </aside>

  <footer class="blog-footer"><span>Yatin Kare · 2026</span></footer>
</main>
