# hantsy.github.io

My personal website and blog — built with **Angular 19** and hosted on **GitHub Pages**.

🌐 [https://hantsy.github.io](https://hantsy.github.io)

## Tech Stack

- **Angular 19** — UI framework
- **marked** — Markdown rendering
- **GitHub Pages** — Static hosting
- **GitHub Actions** — CI/CD deploy + Medium RSS sync

## Pages

- **Home** (`/`) — Profile, bio, social links, and professional services
- **Blog** (`/#/blog`) — Local markdown posts + Medium RSS feed summaries
- **Tutorials** (`/#/tutorials`) — Publications and tutorials

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Sync Medium RSS posts
npm run sync:medium
```

## Content

Add blog posts as Markdown files in `src/content/blog/`:

```md
---
title: "My Post Title"
date: "2026-01-01"
description: "A short description"
tags: ["angular", "java"]
---

Post content in **markdown**...
```

Add tutorials in `src/content/tutorials/`:

```md
---
title: "Tutorial Title"
year: 2026
description: "Short description"
url: "https://example.com"
type: "article"
---

Optional description content.
```

## Deployment

Pushes to `master` trigger the deploy workflow, which builds the Angular app and deploys to GitHub Pages.
