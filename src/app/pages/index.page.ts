import { Component } from '@angular/core';
import { profileData } from '../data/profile';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="profile-section">
      <div class="profile-avatar">
        <img src="/assets/img/avatar.png" alt="Hantsy Bai" />
      </div>

      <div class="profile-info">
        <h1>{{ profile.name }}</h1>
        <p class="lead">
          Independent Freelancer · Java/Jakarta EE & Spring Expert · Open Source
          Contributor
        </p>

        <p>{{ profile.bio }}</p>

        <p><strong>What is my dream job?</strong></p>
        <ul>
          @for (dream of profile.dreams; track $index) {
            <li>{{ dream }}</li>
          }
        </ul>

        <div class="availability-badge">
          {{ profile.availability }}
        </div>

        <!-- Social Icons -->
        <div class="social-icons">
          @for (social of profile.socials; track social.label) {
            <a [href]="social.url" target="_blank" rel="noopener" [attr.title]="social.label">
              @switch (social.icon) {
                @case ('github') { <span>🔗</span> }
                @case ('twitter') { <span>🐦</span> }
                @case ('linkedin') { <span>💼</span> }
                @case ('medium') { <span>📝</span> }
                @case ('rss') { <span>📡</span> }
                @default { <span>🔗</span> }
              }
            </a>
          }
        </div>

        <div class="btn-group">
          <a [href]="profile.cvUrl" class="btn btn-primary" target="_blank">📄 Check my CV (PDF)</a>
          <a [href]="profile.linkedinUrl" class="btn btn-outline" target="_blank" rel="noopener">💼 LinkedIn Profile</a>
          <a [href]="profile.githubUrl" class="btn btn-outline" target="_blank" rel="noopener">🔗 GitHub Projects</a>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <h2 class="section-title">🛠️ Professional Services</h2>
    <div class="service-grid">
      @for (service of profile.services; track service.title) {
        <div class="service-card">
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      }
    </div>
  `,
})
export default class HomePage {
  profile = profileData;
}
