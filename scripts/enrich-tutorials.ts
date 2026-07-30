/**
 * Enriches tutorial markdown files by fetching the linked URL
 * and extracting the page title / meta description as the description field.
 * Run via: npx tsx scripts/enrich-tutorials.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const TUTORIALS_DIR = path.resolve(import.meta.dirname, '..', 'src', 'content', 'tutorials');

function parseFrontmatter(raw: string): { attrs: Record<string, string>; body: string } | null {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const attrs: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const fm = line.match(/^(\w+):\s*(.*)$/);
    if (!fm) continue;
    let val = fm[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
      val = val.slice(1, -1);
    attrs[fm[1]] = val;
  }
  return { attrs, body: m[2] };
}

function serializeFrontmatter(attrs: Record<string, string>, body: string): string {
  const lines = ['---'];
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === '') continue;
    lines.push(`${k}: "${v.replace(/"/g, '\\"')}"`);
  }
  lines.push('---', '', body.trim(), '');
  return lines.join('\n');
}

async function fetchMeta(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return null;
    const html = await res.text();

    // Try Open Graph description first
    let m = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    if (m) return m[1];

    // Try standard meta description
    m = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    if (m) return m[1];

    // Fallback: first meaningful paragraph
    m = html.match(/<p[^>]*>([\s\S]{80,300}?)<\/p>/i);
    if (m) return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    return null;
  } catch {
    return null;
  }
}

async function main(): Promise<void> {
  console.log('Enriching tutorial descriptions...\n');
  const files = fs.readdirSync(TUTORIALS_DIR).filter((f) => f.endsWith('.md'));
  let updated = 0;

  for (const file of files) {
    const filepath = path.join(TUTORIALS_DIR, file);
    const raw = fs.readFileSync(filepath, 'utf-8');
    const parsed = parseFrontmatter(raw);
    if (!parsed) continue;

    const { attrs, body } = parsed;
    if (!attrs.url) continue;

    // Fetch description if missing or too short
    if (!attrs.description || attrs.description.length <= 40) {
      console.log(`  ${file}: fetching ${attrs.url}...`);
      const desc = await fetchMeta(attrs.url);
      if (desc) {
        attrs.description = desc;
        console.log(`    → ${desc.substring(0, 80)}...`);
      } else {
        console.log(`    → no description found`);
      }
    }

    // Move description into the body and remove it from frontmatter
    const desc = attrs.description;
    if (desc) {
      delete attrs.description;
      const newBody = desc || attrs.title || body;
      fs.writeFileSync(filepath, serializeFrontmatter(attrs, newBody), 'utf-8');
      updated++;
    }

    // Be nice to servers
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\nDone. Updated ${updated} files.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
