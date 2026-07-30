import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentService, ParsedContent, PostMeta } from '../../services/content.service';
import { BlogService, MediumPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, DatePipe, MatCardModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <header class="page-header">
      <h1>Blog</h1>
      <p class="page-description">
        Articles on Jakarta EE, Spring, Quarkus, and software development.
      </p>
    </header>

    @if (loading()) {
      <div style="display: flex; justify-content: center; padding: 3rem;">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    }

    @if (!loading()) {
      <div class="blog-list">
        <!-- Local markdown posts -->
        @for (post of localPosts(); track post.slug) {
          <mat-card class="mat-elevation-z1">
            <mat-card-header>
              <mat-card-title>
                <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
              </mat-card-title>
              <mat-card-subtitle>
                <time>{{ post.attributes.date | date:'longDate' }}</time>
                @if (post.attributes.tags?.length) {
                  · @for (tag of post.attributes.tags; track tag) {
                    <mat-chip class="blog-tag">{{ tag }}</mat-chip>
                  }
                }
              </mat-card-subtitle>
            </mat-card-header>
            @if (post.attributes.description) {
              <mat-card-content>
                <p class="blog-excerpt">{{ post.attributes.description }}</p>
              </mat-card-content>
            }
          </mat-card>
        }

        <!-- Medium RSS posts with thumbnail backgrounds -->
        @for (post of mediumPosts(); track post.link) {
          <a [href]="post.link" target="_blank" rel="noopener" class="medium-card-link">
            <mat-card class="mat-elevation-z1 medium-card"
              [style.background-image]="post.thumbnail ? 'url(' + post.thumbnail + ')' : ''">
              <div class="medium-card-overlay">
                <mat-card-header>
                  <mat-card-title>{{ post.title }}</mat-card-title>
                  <mat-card-subtitle class="medium-subtitle">
                    <time>{{ post.pubDate | date:'longDate' }}</time>
                    @if (post.creator) { · {{ post.creator }} }
                    <span class="blog-source">· Medium</span>
                  </mat-card-subtitle>
                </mat-card-header>
                @if (post.summary) {
                  <mat-card-content>
                    <p class="blog-excerpt">{{ post.summary }}</p>
                  </mat-card-content>
                }
              </div>
            </mat-card>
          </a>
        }
      </div>

      @if (localPosts().length === 0 && mediumPosts().length === 0) {
        <div class="empty-state">No blog posts yet. Check back soon!</div>
      }
    }
  `,
  styles: [
    `.blog-tag { font-size: 0.7rem; min-height: 20px; }`,
    `
      .medium-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
      }
      .medium-card {
        min-height: 180px;
        background-size: cover;
        background-position: center;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
      }
      .medium-card-overlay {
        background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 100%);
        min-height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0;
      }
      .medium-card-overlay mat-card-title,
      .medium-card-overlay mat-card-title a {
        color: #fff !important;
      }
      .medium-card-overlay .medium-subtitle,
      .medium-card-overlay .medium-subtitle time,
      .medium-card-overlay mat-card-subtitle {
        color: rgba(255,255,255,0.85) !important;
      }
      .medium-card-overlay .blog-excerpt {
        color: rgba(255,255,255,0.9) !important;
      }
    `,
  ],
})
export default class BlogIndexPage implements OnInit {
  localPosts = signal<ParsedContent<PostMeta>[]>([]);
  mediumPosts = signal<MediumPost[]>([]);
  loading = signal(true);

  constructor(
    private contentService: ContentService,
    private blogService: BlogService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const [local, medium] = await Promise.all([
        this.contentService.getBlogPosts(),
        this.blogService.fetchMediumFeed(),
      ]);
      this.localPosts.set(local);
      this.mediumPosts.set(medium);
    } finally {
      this.loading.set(false);
    }
  }
}
