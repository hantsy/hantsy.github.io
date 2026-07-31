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

  constructor(private http: HttpClient) {}

  async load(): Promise<ProfileData> {
    if (this.data) return this.data;

    const raw = await firstValueFrom(
      this.http.get('/content/profile.md', { responseType: 'text' })
    );

    const parsed = this.parseMarkdown(raw);
    this.data = parsed;
    return parsed;
  }

  private parseMarkdown(raw: string): ProfileData {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
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
    const lines = yaml.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      // Array key
      const arrayMatch = line.match(/^(\w[\w-]*):\s*$/);
      if (arrayMatch) {
        const key = arrayMatch[1];
        const items: any[] = [];
        i++;
        while (i < lines.length && lines[i].match(/^\s+-\s/)) {
          const item: Record<string, any> = {};
          const itemLine = lines[i].replace(/^\s+-\s+/, '');
          const itemKey = itemLine.match(/^(\w+):\s*(.*)/);
          if (itemKey) {
            item[itemKey[1]] = this.unquote(itemKey[2]);
          }
          // Read indented sub-fields
          i++;
          while (i < lines.length && lines[i].match(/^\s{4,}\w/)) {
            const sub = lines[i].trim().match(/^(\w+):\s*(.*)/);
            if (sub) item[sub[1]] = this.unquote(sub[2]);
            i++;
          }
          items.push(item);
        }
        result[key] = items;
        continue;
      }

      // Simple key: value
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
