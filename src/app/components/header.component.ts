import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z2">
      <a mat-button class="brand" routerLink="/">
        <span class="fw-bold">Hantsy</span>&nbsp;Bai
      </a>
      <span class="spacer"></span>

      <nav class="desktop-nav">
        <a mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
          <mat-icon>home</mat-icon> Home
        </a>
        <a mat-button routerLink="/tutorials" routerLinkActive="active-link">
          <mat-icon>menu_book</mat-icon> Tutorials
        </a>
        <a mat-button routerLink="/blog" routerLinkActive="active-link">
          <mat-icon>rss_feed</mat-icon> Blog
        </a>
      </nav>

      <a mat-icon-button href="https://github.com/hantsy" target="_blank" rel="noopener" aria-label="GitHub">
        <mat-icon>code</mat-icon>
      </a>
      <a mat-icon-button href="https://twitter.com/hantsy" target="_blank" rel="noopener" aria-label="Twitter">
        <mat-icon>alternate_email</mat-icon>
      </a>
      <a mat-icon-button href="https://www.linkedin.com/in/hantsy" target="_blank" rel="noopener" aria-label="LinkedIn">
        <mat-icon>work</mat-icon>
      </a>
      <a mat-icon-button href="https://medium.com/@hantsy" target="_blank" rel="noopener" aria-label="Medium">
        <mat-icon>article</mat-icon>
      </a>

      <button mat-icon-button class="mobile-menu-btn" [matMenuTriggerFor]="mobileMenu" aria-label="Menu">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #mobileMenu="matMenu">
      <a mat-menu-item routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
        <mat-icon>home</mat-icon> Home
      </a>
      <a mat-menu-item routerLink="/tutorials" routerLinkActive="active-link">
        <mat-icon>menu_book</mat-icon> Tutorials
      </a>
      <a mat-menu-item routerLink="/blog" routerLinkActive="active-link">
        <mat-icon>rss_feed</mat-icon> Blog
      </a>
    </mat-menu>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .brand { font-size: 1.15rem; letter-spacing: 0.5px; }
    .fw-bold { font-weight: 700; }
    .desktop-nav { display: flex; align-items: center; gap: 0.25rem; }
    .desktop-nav .active-link { background: rgba(255,255,255,0.15); }
    .mobile-menu-btn { display: none; }
    @media (max-width: 768px) {
      .desktop-nav { display: none; }
      .mobile-menu-btn { display: inline-block; }
    }
  `],
})
export class HeaderComponent {}
