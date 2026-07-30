import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ContentService, ParsedContent, PostMeta } from '../../services/content.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <a routerLink="/blog" class="back-link">← Back to Blog</a>

    @if (post(); as post) {
      <article>
        <header class="post-header">
          <h1>{{ post.attributes.title }}</h1>
          <div class="post-meta">
            <time>{{ post.attributes.date | date:'longDate' }}</time>
            @if (post.attributes.tags?.length) {
              · @for (tag of post.attributes.tags; track tag) {
                <span>{{ tag }}</span>
              }
            }
          </div>
        </header>

        <div class="post-content" [innerHTML]="post.html"></div>
      </article>
    } @else {
      <div class="empty-state">
        <p>Post not found.</p>
        <a routerLink="/blog">Back to Blog</a>
      </div>
    }
  `,
})
export default class BlogPostPage implements OnInit {
  post = signal<ParsedContent<PostMeta> | null>(null);

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.post.set(await this.contentService.getBlogPost(slug));
    }
  }
}
