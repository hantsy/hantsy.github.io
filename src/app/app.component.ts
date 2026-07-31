import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressBarModule, HeaderComponent, FooterComponent],
  template: `
    @if (loading()) {
      <div class="loading-overlay">
        <mat-progress-bar mode="indeterminate" />
        <p class="loading-text">Loading...</p>
      </div>
    }
    <app-header />
    <main class="container">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(255,255,255,.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .loading-overlay mat-progress-bar {
      width: 320px;
    }
    .loading-text {
      font-size: 1.1rem;
      color: #888;
      margin: 0;
      letter-spacing: 1px;
    }
  `],
})
export class AppComponent {
  private router = inject(Router);
  loading = signal(false);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading.set(false);
      }
    });
  }
}
