import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileData } from '../services/profile.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.css'],
})
export default class HomePage {
  profile = signal<ProfileData | null>(null);

  constructor(route: ActivatedRoute) {
    route.data.subscribe((data) => {
      if (data['profile']) this.profile.set(data['profile']);
    });
  }
}
