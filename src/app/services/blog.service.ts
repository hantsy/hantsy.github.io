import { Injectable } from '@angular/core';
import { XMLParser } from 'fast-xml-parser';

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
  private readonly MEDIUM_RSS = 'https://medium.com/feed/@hantsy';

  private readonly CORS_PROXIES = [
    (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    (url: string) =>
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`,
  ];

  async fetchMediumFeed(): Promise<MediumPost[]> {
    // Try each proxy until one works
    for (const proxyFn of this.CORS_PROXIES) {
      try {
        const proxyUrl = proxyFn(this.MEDIUM_RSS);
        const response = await fetch(proxyUrl);
        if (!response.ok) continue;

        const text = await response.text();

        // rss2json returns JSON, others return XML
        if (proxyUrl.includes('rss2json')) {
          return this.parseRss2JsonResponse(text);
        }
        return this.parseXmlResponse(text);
      } catch {
        continue;
      }
    }

    console.warn('All CORS proxies failed. Showing local posts only.');
    return [];
  }

  private parseXmlResponse(xml: string): MediumPost[] {
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const parsed = parser.parse(xml);
    const items: any[] = parsed?.rss?.channel?.item || [];

    return items.map((item: any) => this.mapItem(item));
  }

  private parseRss2JsonResponse(json: string): MediumPost[] {
    const data = JSON.parse(json);
    if (data.status !== 'ok' || !data.items) return [];
    return data.items.map((item: any) => ({
      title: item.title || '',
      link: item.link || '#',
      pubDate: item.pubDate || '',
      creator: item.author || 'Hantsy',
      summary: this.stripHtml(item.description || '').substring(0, 300),
      categories: item.categories || [],
    }));
  }

  private mapItem(item: any): MediumPost {
    const description = item['content:encoded'] || item.description || '';
    return {
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: item.pubDate || '',
      creator: item['dc:creator'] || 'Hantsy',
      summary: this.stripHtml(description).substring(0, 300),
      categories: item.category
        ? Array.isArray(item.category)
          ? item.category
          : [item.category]
        : [],
    };
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
