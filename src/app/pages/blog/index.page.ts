import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogService, MediumPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule],
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

    @if (loading()) {
      <div style="display:flex;justify-content:center;padding:3rem">
        <mat-spinner diameter="40"/>
      </div>
    }

    @if (!loading()) {
      <div class="post-grid">
        @for (post of mediumPosts(); track post.link) {
          <a [href]="post.link" target="_blank" rel="noopener" class="post-card-link">
            <div class="post-card mat-elevation-z1">
              <!-- Thumbnail -->
              <div class="post-thumb">
                @if (post.thumbnail) {
                  <img [src]="post.thumbnail" alt="" loading="lazy" />
                } @else {
                  <div class="post-thumb-placeholder">
                    <mat-icon>article</mat-icon>
                  </div>
                }
              </div>
              <!-- Content -->
              <div class="post-body">
                @if (post.categories.length) {
                  <div class="post-tags">
                    <mat-chip class="post-tag-chip">{{ post.categories[0] }}</mat-chip>
                  </div>
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

        @if (mediumPosts().length === 0) {
          <div class="empty-state">Could not load Medium feed. Check back soon!</div>
        }
      </div>
    }
  `,
  styles: [`
    /* Grid */
    .post-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.75rem;
    }

    /* Card */
    .post-card-link { text-decoration: none; color: inherit; }
    .post-card {
      border-radius: 14px;
      overflow: hidden;
      background: #fff;
      transition: transform .25s, box-shadow .25s;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .post-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,.12);
    }

    /* Thumbnail */
    .post-thumb {
      width: 100%;
      height: 180px;
      overflow: hidden;
      background: #f0f0f0;
    }
    .post-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .4s;
    }
    .post-card:hover .post-thumb img { transform: scale(1.04); }
    .post-thumb-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #3f51b5, #7986cb);
      color: #fff;
    }
    .post-thumb-placeholder mat-icon { font-size: 48px; width: 48px; height: 48px; }

    /* Body */
    .post-body {
      padding: 1.25rem 1.25rem 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .post-tags { margin-bottom: 0.5rem; }
    .post-tag-chip {
      font-size: 0.7rem !important;
      min-height: 22px !important;
      background: rgba(63,81,181,.08) !important;
      color: #3f51b5 !important;
    }
    .post-title {
      font-size: 1.15rem;
      font-weight: 600;
      line-height: 1.4;
      margin: 0 0 0.5rem;
      color: #212121;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .post-card:hover .post-title { color: #3f51b5; }

    .post-meta {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;
      color: #888;
      margin-bottom: 0.75rem;
    }
    .meta-icon { font-size: 14px; width: 14px; height: 14px; }
    .meta-dot { font-weight: 700; }

    .post-summary {
      font-size: 0.9rem;
      line-height: 1.6;
      color: #666;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .post-grid { grid-template-columns: 1fr; }
      .post-thumb { height: 160px; }
    }
  `],
})
export default class BlogIndexPage implements OnInit {
  mediumPosts = signal<MediumPost[]>([]);
  loading = signal(true);

  constructor(private blogService: BlogService) {}

  async ngOnInit(): Promise<void> {
    try { this.mediumPosts.set(await this.blogService.fetchMediumFeed()); }
    finally { this.loading.set(false); }
  }
}
