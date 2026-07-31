import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TutorialsStore } from '../stores/tutorials.store';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <header class="page-header">
      <h1>Tutorials</h1>
      <p class="page-description">Publications, papers, and tutorials — grouped by year.</p>
    </header>

    @if (store.tutorials().length > 0) {
      <div class="timeline">
        @for (group of store.tutorials(); track group.year) {
          <div class="timeline-row">
            <div class="timeline-left">
              <span class="year-badge">{{ group.year }}</span>
            </div>
            <div class="timeline-dot"></div>
            <mat-card class="mat-elevation-z1 timeline-card">
              <mat-card-content>
                @for (tutorial of group.items; track tutorial.slug) {
                  <div class="tutorial-entry">
                    <a [href]="tutorial.attributes.url" target="_blank" rel="noopener" class="tutorial-link">
                      {{ tutorial.attributes.title }}
                    </a>
                    @if (tutorial.content) {
                      <p class="tutorial-desc">{{ tutorial.content }}</p>
                    }
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        }
      </div>
    } @else {
      <div class="empty-state">Tutorials and publications coming soon.</div>
    }
  `,
  styles: [`
    .timeline { position:relative;padding-left:0; }
    .timeline::before {
      content:'';position:absolute;left:104px;top:0;bottom:0;
      width:2px;background:#e0e0e0;
    }
    .timeline-row { display:flex;align-items:flex-start;margin-bottom:1.5rem;position:relative; }
    .timeline-left { width:90px;flex-shrink:0;text-align:right;padding-right:28px; }
    .year-badge {
      display:inline-block;background:#3f51b5;color:#fff;border-radius:16px;
      padding:2px 12px;font-size:.85rem;font-weight:600;margin-top:2px;
    }
    .timeline-dot {
      position:absolute;left:98px;top:6px;
      width:14px;height:14px;border-radius:50%;background:#3f51b5;
      border:3px solid #fff;box-shadow:0 0 0 2px #3f51b5;
    }
    .timeline-card { flex:1;margin-left:24px;border-radius:10px; }
    .tutorial-entry { padding:.5rem 0; }
    .tutorial-entry + .tutorial-entry { border-top:1px solid rgba(0,0,0,.08); }
    .tutorial-link { font-weight:500;font-size:1rem;color:#3f51b5;text-decoration:none; }
    .tutorial-link:hover { text-decoration:underline; }
    .tutorial-desc { display:block;font-size:.9rem;color:rgba(0,0,0,.65);margin-top:4px;line-height:1.5; }
  `],
})
export default class TutorialsPage {
  readonly store = inject(TutorialsStore);
}
