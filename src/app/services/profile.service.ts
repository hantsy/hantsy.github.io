import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { profileData } from '../data/profile';

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  availability: string;
  services: Service[];
  githubUrl: string;
  cvUrl: string;
  linkedinUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private data: ProfileData | null = null;
  private loading: Promise<ProfileData> | null = null;

  constructor(private http: HttpClient) {}

  async load(): Promise<ProfileData> {
    if (this.data) return this.data;
    if (this.loading) return this.loading;

    this.loading = (async () => {
      const bio = await firstValueFrom(
        this.http.get('/content/profile.md', { responseType: 'text' })
      );
      this.data = { ...profileData, bio: bio.trim() };
      return this.data;
    })();

    return this.loading;
  }
}
