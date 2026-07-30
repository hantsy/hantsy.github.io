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
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
      return {
        attributes: {} as T,
        content: raw,
        html: marked.parse(raw) as string,
        slug: '',
      };
    }

    const frontmatterStr = match[1];
    const body = match[2];
    const attributes = this.parseYamlLike<T>(frontmatterStr);

    return {
      attributes,
      content: body,
      html: marked.parse(body) as string,
      slug: '',
    };
  }

  private parseYamlLike<T>(yaml: string): T {
    const obj: any = {};
    const lines = yaml.split('\n');

    for (const line of lines) {
      const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)$/);
      if (!keyMatch) continue;

      const key = keyMatch[1];
      let value: any = keyMatch[2].trim();

      // Array notation: [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((s: string) => s.trim().replace(/["']/g, ''));
      }
      // Quoted strings
      else if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      // Numbers
      else if (/^\d+$/.test(value)) {
        value = parseInt(value, 10);
      }
      // Empty
      else if (value === '' || value === '~') {
        value = undefined;
      }

      obj[key] = value;
    }

    return obj as T;
  }
}
