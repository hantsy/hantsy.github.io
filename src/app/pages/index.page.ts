import { Component } from '@angular/core';
import { profileData } from '../data/profile';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  template: `
    <mat-card class="mat-elevation-z2 profile-card">
      <mat-card-content>
        <div class="profile-section">
          <div class="profile-avatar">
            <img src="/assets/img/avatar.png" alt="Hantsy Bai" />
          </div>

          <div class="profile-info">
            <h1>{{ profile.name }}</h1>
            <p class="lead">
              Independent Freelancer · Java/Jakarta EE & Spring Expert ·
              Open Source Contributor
            </p>

            <p>{{ profile.bio }}</p>

            <p><strong>What is my dream job?</strong></p>
            <ul>
              @for (dream of profile.dreams; track $index) {
                <li>{{ dream }}</li>
              }
            </ul>

            <div class="availability-chip">
              <mat-chip highlighted color="accent">{{ profile.availability }}</mat-chip>
            </div>

            <!-- Social Icons -->
            <div class="social-icons">
              <a mat-mini-fab color="primary" href="https://github.com/hantsy" target="_blank" rel="noopener" aria-label="GitHub">
                <mat-icon>code</mat-icon>
              </a>
              <a mat-mini-fab href="https://twitter.com/hantsy" target="_blank" rel="noopener" aria-label="Twitter" style="background-color:#1da1f2;color:#fff">
                <mat-icon>alternate_email</mat-icon>
              </a>
              <a mat-mini-fab href="https://www.linkedin.com/in/hantsy" target="_blank" rel="noopener" aria-label="LinkedIn" style="background-color:#0a66c2;color:#fff">
                <mat-icon>work</mat-icon>
              </a>
              <a mat-mini-fab href="https://medium.com/@hantsy" target="_blank" rel="noopener" aria-label="Medium" style="background-color:#fff;color:#000">
                <mat-icon>article</mat-icon>
              </a>
              <a mat-mini-fab color="accent" href="/feed.xml" target="_blank" aria-label="RSS Feed">
                <mat-icon>rss_feed</mat-icon>
              </a>
            </div>

            <div class="btn-group">
              <a mat-raised-button color="accent" [href]="profile.cvUrl" target="_blank">
                <mat-icon>description</mat-icon> Check my CV (PDF)
              </a>
              <a mat-stroked-button color="primary" [href]="profile.linkedinUrl" target="_blank" rel="noopener">
                <mat-icon>work</mat-icon> LinkedIn
              </a>
              <a mat-stroked-button color="primary" [href]="profile.githubUrl" target="_blank" rel="noopener">
                <mat-icon>code</mat-icon> GitHub Projects
              </a>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

    <!-- Services Section -->
    <h2 class="section-title">
      <mat-icon inline style="vertical-align:middle">design_services</mat-icon>
      Professional Services
    </h2>
    <div class="service-grid">
      @for (service of profile.services; track service.title) {
        <mat-card class="service-card mat-elevation-z2">
          <mat-card-header>
            <mat-card-title>
              <mat-icon [inline]="true" style="vertical-align:middle;margin-right:0.5rem">
                {{ service.icon }}
              </mat-icon>
              {{ service.title }}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ service.description }}</p>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`.profile-card { margin-bottom: 1rem; }`],
})
export default class HomePage {
  profile = profileData;
}
