import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogService, MediumPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
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
      <div class="blog-list">
        @for (post of mediumPosts(); track post.link) {
          <a [href]="post.link" target="_blank" rel="noopener" class="card-link">
            <mat-card class="mat-elevation-z2 medium-card"
              [style.background-image]="post.thumbnail ? 'url(' + post.thumbnail + ')' : ''">
              <div class="card-overlay">
                <div class="card-text">
                  <h2>{{ post.title }}</h2>
                  <div class="card-meta">
                    <mat-icon inline style="font-size:1rem;width:1rem;height:1rem">calendar_today</mat-icon>
                    {{ post.pubDate | date:'longDate' }}
                    @if (post.creator) { · {{ post.creator }} }
                  </div>
                  @if (post.summary) {
                    <p class="card-summary">{{ post.summary }}</p>
                  }
                </div>
              </div>
            </mat-card>
          </a>
        }

        @if (mediumPosts().length === 0) {
          <div class="empty-state">Could not load Medium feed. Check back soon!</div>
        }
      </div>
    }
  `,
  styles: [`
    .card-link { text-decoration:none;color:inherit;display:block; }
    .medium-card {
      min-height:200px;background-size:cover;background-position:center;
      position:relative;border-radius:12px;overflow:hidden;
      transition: transform .2s,box-shadow .2s;
    }
    .medium-card:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.15); }
    .card-overlay {
      background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.75) 100%);
      min-height:200px;display:flex;flex-direction:column;justify-content:flex-end;
    }
    .card-text { padding:1.5rem; }
    .card-text h2 { color:#fff;margin:0 0 .5rem;font-size:1.3rem;line-height:1.3; }
    .card-meta { color:rgba(255,255,255,.8);font-size:.85rem;margin-bottom:.5rem;display:flex;align-items:center;gap:.25rem; }
    .card-summary { color:rgba(255,255,255,.9);margin:0;font-size:.95rem;line-height:1.5; }
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
