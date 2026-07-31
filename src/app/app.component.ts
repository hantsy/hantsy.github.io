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
      <mat-progress-bar mode="indeterminate" class="global-loader" />
    }
    <app-header />
    <main class="container">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    .global-loader {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      height: 3px;
    }
  `],
})
export class AppComponent {
  private router = inject(Router);
  loading = signal(false);
  private showTimer: any = null;
  private minDuration = 300; // keep bar visible at least 300ms so it's noticeable

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        clearTimeout(this.showTimer);
        // Small debounce: don't flash the bar for sub-50ms navigations
        this.showTimer = setTimeout(() => this.loading.set(true), 50);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        clearTimeout(this.showTimer);
        // Keep the bar visible for at least minDuration from show time
        setTimeout(() => this.loading.set(false), this.minDuration);
      }
    });
  }
}
