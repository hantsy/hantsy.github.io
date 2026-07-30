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

        @for (post of mediumPosts(); track post.link) {
          <mat-card class="mat-elevation-z1">
            <mat-card-header>
              <mat-card-title>
                <a [href]="post.link" target="_blank" rel="noopener">{{ post.title }}</a>
                <span class="blog-source">· Medium</span>
              </mat-card-title>
              <mat-card-subtitle>
                <time>{{ post.pubDate | date:'longDate' }}</time>
                @if (post.creator) { · {{ post.creator }} }
              </mat-card-subtitle>
            </mat-card-header>
            @if (post.summary) {
              <mat-card-content>
                <p class="blog-excerpt">{{ post.summary }}</p>
              </mat-card-content>
            }
          </mat-card>
        }
      </div>

      @if (localPosts().length === 0 && mediumPosts().length === 0) {
        <div class="empty-state">No blog posts yet. Check back soon!</div>
      }
    }
  `,
  styles: [`.blog-tag { font-size: 0.7rem; min-height: 20px; }`],
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
