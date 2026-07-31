import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BlogStore } from '../stores/blog.store';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <header class="page-header">
      <h1>Blog</h1>
      <p class="page-description">
        Articles on Jakarta EE, Spring, Quarkus, and software development —
        syndicated from my Medium feed.
      </p>
      <a mat-raised-button color="accent" href="https://medium.com/@hantsy" target="_blank" rel="noopener" style="margin-top:0.75rem">
        <mat-icon>article</mat-icon> Read more on Medium
      </a>
    </header>

    <div class="post-grid">
      @for (post of store.posts(); track post.link) {
        <a [href]="post.link" target="_blank" rel="noopener" class="post-card-link">
          <div class="post-card mat-elevation-z1">
            <div class="post-thumb">
              @if (post.thumbnail) {
                <img [src]="post.thumbnail" alt="" loading="lazy" />
              } @else {
                <div class="post-thumb-placeholder">
                  <mat-icon>article</mat-icon>
                </div>
              }
            </div>
            <div class="post-body">
              @if (post.categories.length) {
                <mat-chip-set class="post-tags" aria-label="Categories">
                  @for (cat of post.categories.slice(0, 4); track cat) {
                    <mat-chip-row class="post-tag-chip" [style.background]="tagColor(cat)" [style.color]="tagTextColor(cat)">{{ cat }}</mat-chip-row>
                  }
                </mat-chip-set>
              }
              <h2 class="post-title">{{ post.title }}</h2>
              <div class="post-meta">
                <mat-icon class="meta-icon">calendar_today</mat-icon>
                <span>{{ post.pubDate | date:'MMM d, y' }}</span>
                <span class="meta-dot">·</span>
                <span>{{ post.creator }}</span>
              </div>
              @if (post.summary) {
                <p class="post-summary">{{ post.summary }}</p>
              }
            </div>
          </div>
        </a>
      }

      @if (store.isEmpty()) {
        <div class="empty-state">Could not load Medium feed. Check back soon!</div>
      }
    </div>
  `,
  styles: [`
    .post-grid { column-count: 2; column-gap: 1.5rem; }
    .post-card-link { text-decoration: none; color: inherit; break-inside: avoid; display: block; margin-bottom: 1.5rem; }
    .post-card {
      border-radius: 14px; overflow: hidden; background: #fff;
      transition: transform .25s, box-shadow .25s; display: flex; flex-direction: column;
    }
    .post-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,.1); }
    .post-thumb { width: 100%; overflow: hidden; background: #f0f0f0; }
    .post-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
    .post-card:hover .post-thumb img { transform: scale(1.04); }
    .post-thumb-placeholder {
      width: 100%; height: 160px; display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #3f51b5, #7986cb); color: #fff;
    }
    .post-thumb-placeholder mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .post-body { padding: 1.25rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .post-tags { margin-bottom: 0.5rem; }
    .post-tag-chip {
      --mdc-chip-container-shape-radius: 999px;
      --mdc-chip-container-height: 24px;
    }
    .post-tag-chip .mdc-evolution-chip__text-label { font-size: 0.7rem !important; font-weight: 500 !important; }
    .post-title { font-size: 1.2rem; font-weight: 600; line-height: 1.4; margin: 0 0 0.5rem; color: #212121; }
    .post-card:hover .post-title { color: #3f51b5; }
    .post-meta { display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; }
    .meta-icon { font-size: 14px; width: 14px; height: 14px; }
    .meta-dot { font-weight: 700; }
    .post-summary { font-size: 0.9rem; line-height: 1.6; color: #666; margin: 0; }
    @media (max-width: 680px) { .post-grid { column-count: 1; } }
  `],
})
export default class BlogIndexPage {
  readonly store = inject(BlogStore);

  private readonly palette = [
    '#e8eaf6','#fce4ec','#e0f2f1','#fbe9e7','#ede7f6',
    '#e0f7fa','#f1f8e9','#fff3e0','#efebe9','#eceff1',
    '#e3f2fd','#ffebee','#e8f5e9','#f3e5f5','#f9fbe7',
  ];
  private readonly darkText = [
    '#283593','#880e4f','#00695c','#bf360c','#4527a0',
    '#00838f','#558b2f','#e65100','#4e342e','#37474f',
    '#0d47a1','#b71c1c','#1b5e20','#6a1b9a','#827717',
  ];
  private tagColorMap = new Map<string, string>();

  tagColor(tag: string): string {
    if (!this.tagColorMap.has(tag)) {
      const i = this.tagColorMap.size % this.palette.length;
      this.tagColorMap.set(tag, this.palette[i]);
    }
    return this.tagColorMap.get(tag)!;
  }

  tagTextColor(tag: string): string {
    const i = [...this.tagColorMap.keys()].indexOf(tag);
    return i >= 0 ? '#' + this.darkText[i % this.darkText.length] : '#333';
  }
}
