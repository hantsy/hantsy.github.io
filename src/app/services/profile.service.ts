import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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

const profileData: Omit<ProfileData, 'bio'> = {
  name: 'Hantsy Bai',
  tagline: 'Independent Freelancer · Jakarta EE & Spring Expert · Open Source Contributor',
  availability: "I'm currently available for new projects and opportunities — feel free to reach out if you need help with application development, architecture consulting, or team coaching.",
  cvUrl: '/assets/pdf/cv.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/hantsy',
  githubUrl: 'https://github.com/hantsy',
  services: [
    {
      icon: 'devices',
      title: 'Application Development',
      description: 'End-to-end development with Jakarta EE, Spring Boot, MicroProfile, Quarkus, and Angular — from prototype to cloud-native production.',
    },
    {
      icon: 'psychology',
      title: 'Consulting Services',
      description: 'Architecture review, code audits, tech stack selection, performance tuning, and hands-on mentoring to help your team ship better software.',
    },
  ],
};

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
