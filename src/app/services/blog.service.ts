import { Injectable } from '@angular/core';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  summary: string;
  categories: string[];
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly MEDIUM_RSS =
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@hantsy';

  async fetchMediumFeed(): Promise<MediumPost[]> {
    try {
      const response = await fetch(this.MEDIUM_RSS);
      if (!response.ok) return [];
      const data = await response.json();

      if (data.status !== 'ok' || !data.items) return [];

      return data.items.map((item: any) => ({
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        creator: item.author || 'Hantsy',
        summary: this.stripHtml(item.description || '').substring(0, 300),
        categories: item.categories || [],
      }));
    } catch {
      console.warn('Could not fetch Medium feed. Showing local posts only.');
      return [];
    }
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
