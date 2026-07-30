import { Component } from '@angular/core';
import { profileData } from '../data/profile';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <!-- Hero -->
    <div class="hero">
      <div class="hero-avatar">
        <img src="/assets/img/avatar.png" alt="Hantsy Bai" />
      </div>
      <h1 class="hero-name">{{ profile.name }}</h1>
      <p class="hero-tagline">{{ profile.tagline }}</p>
      <div class="hero-social">
        <a class="social-btn github" href="https://github.com/hantsy" target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        </a>
        <a class="social-btn twitter" href="https://twitter.com/hantsy" target="_blank" rel="noopener" aria-label="Twitter">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a class="social-btn linkedin" href="https://www.linkedin.com/in/hantsy" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a class="social-btn medium" href="https://medium.com/@hantsy" target="_blank" rel="noopener" aria-label="Medium">
          <svg viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
        </a>
      </div>
      <div class="hero-actions">
        <a mat-raised-button color="accent" [href]="profile.cvUrl" target="_blank">
          <mat-icon>description</mat-icon> Download CV
        </a>
        <a mat-stroked-button color="primary" href="mailto:hantsy@gmail.com">
          <mat-icon>email</mat-icon> hantsy&#64;gmail.com
        </a>
      </div>
    </div>

    <!-- About -->
    <mat-card class="mat-elevation-z1 section-card">
      <mat-card-content>
        <h2 class="section-heading"><mat-icon inline>person</mat-icon> About Me</h2>
        <p class="bio-text">{{ profile.bio }}</p>
        <p class="availability-text">{{ profile.availability }}</p>
      </mat-card-content>
    </mat-card>

    <!-- Services -->
    <h2 class="section-heading standalone"><mat-icon inline>design_services</mat-icon> Professional Services</h2>
    <div class="service-grid">
      @for (service of profile.services; track service.title) {
        <mat-card class="mat-elevation-z2 service-card" [class]="'card-' + service.icon">
          <mat-card-content>
            <div class="svc-icon-wrap">
              <mat-icon class="svc-icon">{{ service.icon }}</mat-icon>
            </div>
            <h3 class="svc-title">{{ service.title }}</h3>
            <p class="svc-desc">{{ service.description }}</p>
          </mat-card-content>
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
    .hero-tagline { font-size:1.1rem;color:rgba(0,0,0,.55);max-width:520px;margin:0 auto 1.25rem; }

    .hero-social { display:flex;gap:.5rem;justify-content:center;margin-bottom:1.5rem; }
    .social-btn {
      display:inline-flex;align-items:center;justify-content:center;
      width:44px;height:44px;border-radius:50%;
      color:#fff;transition:transform .2s,box-shadow .2s;
    }
    .social-btn:hover { transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.2); }
    .social-btn svg { width:22px;height:22px;fill:currentColor; }
    .social-btn.github { background:#24292e; }
    .social-btn.twitter { background:#1da1f2; }
    .social-btn.linkedin { background:#0a66c2; }
    .social-btn.medium { background:#000; }

    .hero-actions { display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap; }

    /* Sections */
    .section-card { margin-bottom:2rem;border-radius:12px; }
    .section-heading { font-size:1.3rem;margin:0 0 1rem;display:flex;align-items:center;gap:.5rem; }
    .section-heading.standalone { margin-top:2.5rem; }
    .bio-text { line-height:1.85;color:rgba(0,0,0,.75);white-space:pre-line; }
    .availability-text {
      margin-top:1.25rem;padding:1rem 1.25rem;
      background:linear-gradient(135deg,rgba(63,81,181,.08),rgba(233,30,99,.06));
      border-left:4px solid #3f51b5;border-radius:0 8px 8px 0;
      font-weight:500;color:#3f51b5;line-height:1.6;
    }

    /* Service cards */
    .service-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;margin-bottom:3rem; }
    .service-card { border-radius:14px;text-align:center;padding:1.5rem 1rem;transition:transform .25s,box-shadow .25s;position:relative;overflow:hidden; }
    .service-card::before {
      content:'';position:absolute;top:0;left:0;right:0;height:5px;
    }
    .service-card.card-devices::before { background:linear-gradient(90deg,#3f51b5,#7986cb); }
    .service-card.card-psychology::before { background:linear-gradient(90deg,#e91e63,#f06292); }
    .service-card:hover { transform:translateY(-4px);box-shadow:0 10px 32px rgba(0,0,0,.15); }

    .svc-icon-wrap {
      width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;
      margin:0 auto 1rem;
    }
    .service-card.card-devices .svc-icon-wrap { background:rgba(63,81,181,.1);color:#3f51b5; }
    .service-card.card-psychology .svc-icon-wrap { background:rgba(233,30,99,.1);color:#e91e63; }
    .svc-icon { font-size:32px;width:32px;height:32px; }

    .svc-title { font-size:1.15rem;font-weight:600;margin:0 0 .5rem; }
    .svc-desc { font-size:.95rem;color:rgba(0,0,0,.6);line-height:1.6;margin:0; }

    @media(max-width:768px) {
      .hero-name { font-size:1.8rem; }
      .hero-avatar img { width:110px;height:110px; }
    }
  `],
})
export default class HomePage {
  profile = profileData;
}
