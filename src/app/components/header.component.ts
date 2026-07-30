import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z2">
      <a mat-button class="brand" routerLink="/">
        <span class="fw-bold">Hantsy</span>&nbsp;Bai
      </a>

      <span class="spacer"></span>

      <!-- Desktop nav -->
      <nav class="desktop-nav">
        <a mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a mat-button routerLink="/tutorials" routerLinkActive="active-link">Tutorials</a>
        <a mat-button routerLink="/blog" routerLinkActive="active-link">Blog</a>
      </nav>

      <a mat-icon-button href="https://github.com/hantsy" target="_blank" rel="noopener" aria-label="GitHub">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      </a>

      <a mat-icon-button href="https://twitter.com/hantsy" target="_blank" rel="noopener" aria-label="Twitter">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>

      <a mat-icon-button href="https://www.linkedin.com/in/hantsy" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>

      <a mat-icon-button href="https://medium.com/@hantsy" target="_blank" rel="noopener" aria-label="Medium">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
      </a>

      <!-- Mobile menu button -->
      <button mat-icon-button class="mobile-menu-btn" [matMenuTriggerFor]="mobileMenu" aria-label="Menu">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #mobileMenu="matMenu">
      <a mat-menu-item routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a mat-menu-item routerLink="/tutorials" routerLinkActive="active-link">Tutorials</a>
      <a mat-menu-item routerLink="/blog" routerLinkActive="active-link">Blog</a>
    </mat-menu>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .brand {
        font-size: 1.15rem;
        letter-spacing: 0.5px;
      }
      .fw-bold {
        font-weight: 700;
      }
      .desktop-nav {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .desktop-nav .active-link {
        background: rgba(255, 255, 255, 0.15);
      }
      .mobile-menu-btn {
        display: none;
      }
      @media (max-width: 768px) {
        .desktop-nav {
          display: none;
        }
        .mobile-menu-btn {
          display: inline-block;
        }
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}
}
