import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentService, ParsedContent, PostMeta } from '../../services/content.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, DatePipe, MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <a mat-button routerLink="/blog" class="back-link">
      <mat-icon>arrow_back</mat-icon> Back to Blog
    </a>

    @if (loading()) {
      <div style="display: flex; justify-content: center; padding: 3rem;">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    }

    @if (!loading()) {
      @if (post(); as post) {
        <article>
          <header class="post-header">
            <h1>{{ post.attributes.title }}</h1>
            <div class="post-meta">
              <time>{{ post.attributes.date | date:'longDate' }}</time>
              @if (post.attributes.tags?.length) {
                · @for (tag of post.attributes.tags; track tag) {
                  <mat-chip class="post-tag">{{ tag }}</mat-chip>
                }
              }
            </div>
          </header>

          <div class="post-content" [innerHTML]="post.html"></div>
        </article>
      } @else {
        <div class="empty-state">
          <p>Post not found.</p>
          <a mat-button routerLink="/blog">Back to Blog</a>
        </div>
      }
    }
  `,
  styles: [`.post-tag { font-size: 0.7rem; min-height: 20px; }`],
})
export default class BlogPostPage implements OnInit {
  post = signal<ParsedContent<PostMeta> | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.post.set(await this.contentService.getBlogPost(slug));
      }
    } finally {
      this.loading.set(false);
    }
  }
}
