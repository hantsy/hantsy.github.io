import { Component } from '@angular/core';
import { profileData } from '../data/profile';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatChipsModule,MatIconModule,MatDividerModule],
  template: `
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-avatar">
        <img src="/assets/img/avatar.png" alt="Hantsy Bai"/>
      </div>
      <h1 class="hero-name">{{ profile.name }}</h1>
      <p class="hero-tagline">Independent Freelancer · Jakarta&nbsp;EE &amp; Spring Expert · Open&nbsp;Source Contributor</p>
      <div class="hero-badges">
        <mat-chip highlighted color="accent" class="hero-chip">{{ profile.availability }}</mat-chip>
      </div>
      <div class="hero-social">
        <a mat-mini-fab color="primary" href="https://github.com/hantsy" target="_blank" rel="noopener" aria-label="GitHub">
          <mat-icon>code</mat-icon>
        </a>
        <a mat-mini-fab href="https://twitter.com/hantsy" target="_blank" rel="noopener" aria-label="Twitter" style="background:#1da1f2;color:#fff">
          <mat-icon>alternate_email</mat-icon>
        </a>
        <a mat-mini-fab href="https://www.linkedin.com/in/hantsy" target="_blank" rel="noopener" aria-label="LinkedIn" style="background:#0a66c2;color:#fff">
          <mat-icon>work</mat-icon>
        </a>
        <a mat-mini-fab href="https://medium.com/@hantsy" target="_blank" rel="noopener" aria-label="Medium" style="background:#000;color:#fff">
          <mat-icon>article</mat-icon>
        </a>
      </div>
      <div class="hero-actions">
        <a mat-raised-button color="accent" [href]="profile.cvUrl" target="_blank">
          <mat-icon>description</mat-icon> Download CV
        </a>
        <a mat-stroked-button color="primary" [href]="profile.linkedinUrl" target="_blank" rel="noopener">
          <mat-icon>work</mat-icon> LinkedIn
        </a>
        <a mat-stroked-button color="primary" [href]="profile.githubUrl" target="_blank" rel="noopener">
          <mat-icon>code</mat-icon> GitHub Projects
        </a>
      </div>
    </div>

    <!-- About -->
    <mat-card class="mat-elevation-z1 section-card">
      <mat-card-content>
        <h2 class="section-heading"><mat-icon inline>person</mat-icon> About Me</h2>
        <p>{{ profile.bio }}</p>
        <p class="dreams-heading"><strong>What is my dream job?</strong></p>
        <ul class="dreams-list">
          @for (dream of profile.dreams; track $index) { <li>{{ dream }}</li> }
        </ul>
      </mat-card-content>
    </mat-card>

    <!-- Services -->
    <h2 class="section-heading standalone"><mat-icon inline>design_services</mat-icon> Professional Services</h2>
    <div class="service-grid">
      @for (service of profile.services; track service.title) {
        <mat-card class="mat-elevation-z2 service-card">
          <mat-card-header>
            <div mat-card-avatar class="service-avatar">
              <mat-icon>{{ service.icon }}</mat-icon>
            </div>
            <mat-card-title>{{ service.title }}</mat-card-title>
          </mat-card-header>
          <mat-card-content><p>{{ service.description }}</p></mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    /* Hero */
    .hero { text-align:center;padding:3rem 1rem 2rem; }
    .hero-avatar img {
      width:140px;height:140px;border-radius:50%;object-fit:cover;
      border:4px solid #3f51b5;box-shadow:0 6px 24px rgba(63,81,181,.25);
      margin-bottom:1.5rem;
    }
    .hero-name { font-size:2.4rem;font-weight:300;margin:0 0 .5rem;letter-spacing:-.5px; }
    .hero-tagline { font-size:1.1rem;color:rgba(0,0,0,.55);max-width:500px;margin:0 auto 1rem; }
    .hero-badges { margin-bottom:1.25rem; }
    .hero-chip { font-weight:600;font-size:.9rem;padding:4px 8px; }
    .hero-social { display:flex;gap:.5rem;justify-content:center;margin-bottom:1.5rem; }
    .hero-actions { display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap; }

    /* Sections */
    .section-card { margin-bottom:2rem;border-radius:12px; }
    .section-heading { font-size:1.3rem;margin:0 0 1rem;display:flex;align-items:center;gap:.5rem; }
    .section-heading.standalone { margin-top:2.5rem; }
    .dreams-heading { margin-top:1rem;margin-bottom:.25rem; }
    .dreams-list { color:rgba(0,0,0,.65);padding-left:1.25rem; }
    .dreams-list li { margin-bottom:.25rem; }

    /* Service cards */
    .service-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-bottom:3rem; }
    .service-card { border-radius:12px;transition:transform .2s,box-shadow .2s; }
    .service-card:hover { transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.12); }
    .service-avatar {
      background:#3f51b5;color:#fff;display:flex;align-items:center;justify-content:center;
      border-radius:50%;width:44px;height:44px;
    }
    .service-avatar mat-icon { font-size:24px;width:24px;height:24px; }

    @media(max-width:768px) {
      .hero-name { font-size:1.8rem; }
      .hero-avatar img { width:110px;height:110px; }
    }
  `],
})
export default class HomePage {
  profile = profileData;
}
