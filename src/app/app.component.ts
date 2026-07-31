import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, HeaderComponent, FooterComponent],
  template: `
    @if (loading()) {
      <div class="loading-overlay">
        <mat-spinner diameter="56" strokeWidth="4" />
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
      background: rgba(255,255,255,.8);
      display: flex;
      align-items: center;
      justify-content: center;
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
