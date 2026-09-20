# yatinkare.github.io

## Writing a blog post

Add a Markdown file to `src/content/blog/`. Its filename becomes the URL slug.

```md
---
title: Post title
date: 2026-09-20
description: A short description used on the collection page and in metadata.
hero: /images/post-cover.png
heroAlt: A useful description of the cover image
featured: false
draft: false
substack: https://yatinx.substack.com/p/post-slug
---

Opening paragraph.

## First section

Post content in standard Markdown.
```

Second-level headings generate the article progress rail. Reading time, the
collection entry, metadata, canonical URL, and static GitHub Pages route are
generated during the build. Set `draft: true` to hide a post from the site.
