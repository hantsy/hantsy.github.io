/**
 * Scans content directories and generates index.json files
 * listing the available .md files for each content type.
 * Run via: npx tsx scripts/generate-content-index.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const CONTENT_DIRS = [
  { src: 'src/content/blog', public: 'public/content/blog' },
  { src: 'src/content/tutorials', public: 'public/content/tutorials' },
];

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyContentFiles(srcDir: string, publicDir: string): string[] {
  ensureDir(publicDir);

  if (!fs.existsSync(srcDir)) {
    console.log(`Source dir not found: ${srcDir}, creating empty public dir.`);
    return [];
  }

  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md'));
  const copiedFiles: string[] = [];

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(publicDir, file);
    fs.copyFileSync(srcPath, destPath);
    copiedFiles.push(file);
    console.log(`  Copied: ${file}`);
  }

  return copiedFiles;
}

function main(): void {
  console.log('Generating content indexes...\n');

  // Copy subdirectory content (blog/, tutorials/)
  for (const dir of CONTENT_DIRS) {
    console.log(`Processing: ${dir.src}`);
    const files = copyContentFiles(dir.src, dir.public);
    const indexPath = path.join(dir.public, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(files, null, 2));
    console.log(`  Index: ${indexPath} (${files.length} files)\n`);
  }

  // Copy root-level content files (e.g. profile.md)
  const rootSrc = 'src/content';
  const rootPublic = 'public/content';
  ensureDir(rootPublic);
  const rootFiles = fs.readdirSync(rootSrc)
    .filter((f) => f.endsWith('.md') && !fs.statSync(path.join(rootSrc, f)).isDirectory());
  for (const file of rootFiles) {
    fs.copyFileSync(path.join(rootSrc, file), path.join(rootPublic, file));
    console.log(`  Copied root: ${file}`);
  }
  if (rootFiles.length > 0) console.log();

  console.log('Done.');
}

main();
