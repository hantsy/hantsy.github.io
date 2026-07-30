import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <span class="font-weight-bold">Hantsy</span> Bai
        </a>

        <div class="nav-actions">
          <ul class="nav-links" [class.open]="menuOpen">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="menuOpen = false">Home</a></li>
            <li><a routerLink="/tutorials" routerLinkActive="active" (click)="menuOpen = false">Tutorials</a></li>
            <li><a routerLink="/blog" routerLinkActive="active" (click)="menuOpen = false">Blog</a></li>
          </ul>

          <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="'Toggle ' + (isDark ? 'light' : 'dark') + ' mode'">
            {{ isDark ? '☀️' : '🌙' }}
          </button>

          <button class="nav-toggle" (click)="menuOpen = !menuOpen" aria-label="Toggle navigation">
            <span class="hamburger"></span>
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent implements OnInit {
  isDark = false;
  menuOpen = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    this.isDark = saved === 'dark'
      || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }
}
