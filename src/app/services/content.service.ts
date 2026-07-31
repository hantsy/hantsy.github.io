import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { marked } from 'marked';

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
  source?: string;
  mediumUrl?: string;
}

export interface TutorialMeta {
  title: string;
  year: number;
  url?: string;
  type?: string;
}

export interface ParsedContent<T> {
  attributes: T;
  content: string;
  html: string;
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private http: HttpClient) {}

  async getBlogPosts(): Promise<ParsedContent<PostMeta>[]> {
    return this.loadMarkdownFiles<PostMeta>('/content/blog/', 'blog');
  }

  async getBlogPost(slug: string): Promise<ParsedContent<PostMeta> | null> {
    const posts = await this.getBlogPosts();
    return posts.find((p) => p.slug === slug) || null;
  }

  async getTutorials(): Promise<ParsedContent<TutorialMeta>[]> {
    return this.loadMarkdownFiles<TutorialMeta>('/content/tutorials/', 'tutorials');
  }

  private async loadMarkdownFiles<T>(
    dir: string,
    type: string
  ): Promise<ParsedContent<T>[]> {
    // Fetch the index of markdown files
    const indexUrl = `${dir}index.json`;
    try {
      const fileList = await firstValueFrom(
        this.http.get<string[]>(indexUrl)
      );
      const results: ParsedContent<T>[] = [];

      for (const filename of fileList) {
        try {
          const raw = await firstValueFrom(
            this.http.get(`${dir}${filename}`, { responseType: 'text' })
          );
          const parsed = this.parseFrontmatter<T>(raw);
          parsed.slug = filename.replace(/\.md$/, '');
          results.push(parsed);
        } catch {
          console.warn(`Could not load ${filename}`);
        }
      }

      return results.sort((a, b) => {
        const dateA = (a.attributes as any).date || '';
        const dateB = (b.attributes as any).date || '';
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    } catch {
      console.warn(`Could not load content from ${dir}`);
      return [];
    }
  }

  private parseFrontmatter<T>(raw: string): ParsedContent<T> {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    let data: any = {};
    let content = raw;

    if (match) {
      content = match[2].trim();
      for (const line of match[1].split(/\r?\n/)) {
        const m = line.match(/^(\w[\w-]*):\s*(.*)/);
        if (!m) continue;
        let val: any = m[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
          val = val.slice(1, -1);
        else if (/^\d+$/.test(val)) val = parseInt(val, 10);
        else if (val === '' || val === '~') val = undefined;
        data[m[1]] = val;
      }
    }

    return {
      attributes: data as T,
      content,
      html: marked.parse(content) as string,
      slug: '',
    };
  }
}
