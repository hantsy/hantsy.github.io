/**
 * Medium RSS Sync Script
 *
 * Fetches the Medium RSS feed and converts posts to markdown files
 * in src/content/blog/. Run via: npx tsx scripts/sync-medium.ts
 *
 * Used by the scheduled GitHub Action to keep blog content in sync.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const MEDIUM_RSS = 'https://medium.com/feed/@hantsy';
const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS)}`;
const OUTPUT_DIR = path.resolve(import.meta.dirname, '..', 'src', 'content', 'blog');

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function descriptionFromHtml(html: string): string {
  return stripHtml(html).substring(0, 250) + '...';
}

function generateFrontmatter(item: any): string {
  const title = item.title || 'Untitled';
  const date = item.pubDate
    ? new Date(item.pubDate).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
  const slug = slugify(title);
  const summary = descriptionFromHtml(item.description || '');
  const categories = item.categories || [];

  return [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `slug: "${slug}"`,
    `description: "${summary.replace(/"/g, '\\"')}"`,
    `mediumUrl: "${item.link || ''}"`,
    `source: "medium"`,
    `tags: [${categories.map((c: string) => `"${c}"`).join(', ')}]`,
    '---',
    '',
    stripHtml(item.description || ''),
    '',
    `> Originally published on [Medium](${item.link || '#'}).`,
    '',
  ].join('\n');
}

async function main(): Promise<void> {
  console.log('Fetching Medium RSS feed...');

  const response = await fetch(RSS2JSON_API);
  if (!response.ok) {
    console.error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const data = await response.json();
  if (data.status !== 'ok' || !data.items) {
    console.error('RSS2JSON returned non-ok status or no items.');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let newCount = 0;

  for (const item of data.items) {
    const title = item.title || 'Untitled';
    const slug = slugify(title);
    const filename = `${slug}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Don't overwrite existing local posts
    if (fs.existsSync(filepath)) {
      const existing = fs.readFileSync(filepath, 'utf-8');
      if (!existing.includes('source: "medium"')) {
        console.log(`Skipping local post: ${filename}`);
        continue;
      }
    }

    const markdown = generateFrontmatter(item);
    fs.writeFileSync(filepath, markdown, 'utf-8');
    console.log(`Wrote: ${filename}`);
    newCount++;
  }

  console.log(`Done. ${newCount} posts synced.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
