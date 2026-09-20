import { marked } from 'marked';

const rawPosts = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  return trimmed.replace(/^(["'])(.*)\1$/, '$2');
}

function parseMarkdownFile(path, raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${path}`);

  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    metadata[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }

  const slug = path.split('/').at(-1).replace(/\.md$/, '');
  const markdown = match[2].trim();
  const sections = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((heading) => ({
    label: heading[1].replace(/[*_`[\]]/g, ''),
    id: heading[1]
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-'),
  }));

  let sectionIndex = 0;
  let html = marked.parse(markdown, { gfm: true });
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, headingHtml) => {
    const section = sections[sectionIndex++];
    return `<h2 id="${section.id}"><a href="#${section.id}">${headingHtml} <span>#</span></a></h2>`;
  });
  html = html.replace(/(^|<\/(?:blockquote|pre|ul|ol|h2)>\n)<p>/, '$1<p class="article-lead">');
  html = html.replace(/<a href="(https?:\/\/[^\"]+)"/g, '<a href="$1" target="_blank" rel="noreferrer"');

  const words = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`\[\]()-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const date = new Date(`${metadata.date}T12:00:00Z`);

  return {
    ...metadata,
    slug,
    html,
    sections,
    readTime: `${Math.max(1, Math.ceil(words / 220))} min`,
    dateLabel: new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date),
  };
}

export const posts = Object.entries(rawPosts)
  .map(([path, raw]) => parseMarkdownFile(path, raw))
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const featuredPost = posts.find((post) => post.featured) || posts[0];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}
