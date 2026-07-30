import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ContentService, ParsedContent, PostMeta } from '../../services/content.service';
import { BlogService, MediumPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <header class="page-header">
      <h1>Blog</h1>
      <p class="page-description">
        Articles on Jakarta EE, Spring, Quarkus, and software development.
      </p>
    </header>

    <!-- Loading -->
    @if (loading()) {
      <div class="empty-state"><p>Loading posts...</p></div>
    }

    <!-- Posts -->
    @if (!loading()) {
      <div class="blog-list">
        <!-- Local markdown posts -->
        @for (post of localPosts(); track post.slug) {
          <article class="blog-card">
            <h2>
              <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
            </h2>
            <div class="blog-meta">
              <time>{{ post.attributes.date | date:'longDate' }}</time>
              @if (post.attributes.tags?.length) {
                · @for (tag of post.attributes.tags; track tag) {
                  <span>{{ tag }}</span>
                }
              }
            </div>
            @if (post.attributes.description) {
              <p class="blog-excerpt">{{ post.attributes.description }}</p>
            }
          </article>
        }

        <!-- Medium RSS posts -->
        @for (post of mediumPosts(); track post.link) {
          <article class="blog-card">
            <h2>
              <a [href]="post.link" target="_blank" rel="noopener">{{ post.title }}</a>
              <span class="blog-source">Medium</span>
            </h2>
            <div class="blog-meta">
              <time>{{ post.pubDate | date:'longDate' }}</time>
              @if (post.creator) {
                · {{ post.creator }}
              }
            </div>
            @if (post.summary) {
              <p class="blog-excerpt">{{ post.summary }}</p>
            }
          </article>
        }
      </div>

      <!-- Empty state (only after loading finishes) -->
      @if (localPosts().length === 0 && mediumPosts().length === 0) {
        <div class="empty-state">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      }
    }
  `,
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
