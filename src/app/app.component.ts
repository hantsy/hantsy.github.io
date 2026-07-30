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
