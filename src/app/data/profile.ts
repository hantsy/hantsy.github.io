import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { parseFrontmatter } from '../utils/frontmatter';

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
      const raw = await firstValueFrom(
        this.http.get('/content/profile.md', { responseType: 'text' })
      );
      this.data = this.parseMarkdown(raw);
      return this.data;
    })();

    return this.loading;
  }

  private parseMarkdown(raw: string): ProfileData {
    const { attrs, body } = parseFrontmatter(raw);
    return {
      name: attrs['name'] || '',
      tagline: attrs['tagline'] || '',
      bio: body,
      availability: attrs['availability'] || '',
      services: attrs['services'] || [],
      githubUrl: attrs['githubUrl'] || '',
      cvUrl: attrs['cvUrl'] || '',
      linkedinUrl: attrs['linkedinUrl'] || '',
    };
  }
}
