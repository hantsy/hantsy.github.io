import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentService, ParsedContent, TutorialMeta } from '../services/content.service';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule],
  template: `
    <header class="page-header">
      <h1>Tutorials</h1>
      <p class="page-description">
        Publications, papers, and tutorials by categories.
      </p>
    </header>

    @if (loading()) {
      <div style="display: flex; justify-content: center; padding: 3rem;">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    }

    @if (!loading()) {
      @if (groupedTutorials().length > 0) {
        <div class="tutorial-list">
          @for (group of groupedTutorials(); track group.year) {
            <h2 class="tutorial-year">{{ group.year }}</h2>
            @for (tutorial of group.items; track tutorial.slug) {
              <mat-card class="mat-elevation-z1">
                <mat-card-header>
                  <mat-card-title>
                    @if (tutorial.attributes.url) {
                      <a [href]="tutorial.attributes.url" target="_blank" rel="noopener">
                        {{ tutorial.attributes.title }}
                      </a>
                    } @else {
                      {{ tutorial.attributes.title }}
                    }
                  </mat-card-title>
                  @if (tutorial.attributes.description) {
                    <mat-card-subtitle>{{ tutorial.attributes.description }}</mat-card-subtitle>
                  }
                </mat-card-header>
              </mat-card>
            }
          }
        </div>
      } @else {
        <div class="empty-state">Tutorials and publications coming soon.</div>
      }
    }
  `,
})
export default class TutorialsPage implements OnInit {
  groupedTutorials = signal<{ year: number; items: ParsedContent<TutorialMeta>[] }[]>([]);
  loading = signal(true);

  constructor(private contentService: ContentService) {}

  async ngOnInit(): Promise<void> {
    try {
      const tutorials = await this.contentService.getTutorials();
      const grouped = new Map<number, ParsedContent<TutorialMeta>[]>();
      for (const t of tutorials) {
        const year = t.attributes.year || 0;
        if (!grouped.has(year)) grouped.set(year, []);
        grouped.get(year)!.push(t);
      }
      this.groupedTutorials.set(
        Array.from(grouped.entries())
          .sort(([a], [b]) => b - a)
          .map(([year, items]) => ({ year, items }))
      );
    } finally {
      this.loading.set(false);
    }
  }
}
