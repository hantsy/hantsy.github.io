import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileService, ProfileData } from '../data/profile';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.css'],
})
export default class HomePage {
  private profileService = inject(ProfileService);
  profile = signal<ProfileData | null>(null);

  constructor() {
    this.profileService.load().then((p) => this.profile.set(p));
  }
}
