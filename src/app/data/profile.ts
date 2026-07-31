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
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    const frontmatter = match ? match[1] : '';
    const body = (match ? match[2] : raw).trim();
    const attrs = this.parseYaml(frontmatter);

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

  private parseYaml(yaml: string): Record<string, any> {
    const result: Record<string, any> = {};
    const lines = yaml.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      const arrayMatch = line.match(/^(\w[\w-]*):\s*$/);
      if (arrayMatch) {
        const key = arrayMatch[1];
        const items: any[] = [];
        i++;
        while (i < lines.length) {
          const itemMatch = lines[i].match(/^\s+-\s+(.*)/);
          if (!itemMatch) {
            if (!lines[i].trim()) { i++; continue; } // skip blank lines in arrays
            break;
          }
          const item: Record<string, any> = {};
          const itemVal = itemMatch[1];
          const itemKey = itemVal.match(/^(\w+):\s*(.*)/);
          if (itemKey) {
            item[itemKey[1]] = this.unquote(itemKey[2]);
          }
          i++;
          while (i < lines.length && lines[i].match(/^\s{2,}\w/)) {
            const sub = lines[i].trim().match(/^(\w+):\s*(.*)/);
            if (sub) item[sub[1]] = this.unquote(sub[2]);
            i++;
          }
          items.push(item);
        }
        result[key] = items;
        continue;
      }

      const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
      if (keyMatch) {
        result[keyMatch[1]] = this.unquote(keyMatch[2]);
      }
      i++;
    }

    return result;
  }

  private unquote(s: string): string {
    let v = s.trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    return v;
  }
}
