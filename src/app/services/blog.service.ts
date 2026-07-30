import { Injectable } from '@angular/core';
import { XMLParser } from 'fast-xml-parser';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  summary: string;
  thumbnail: string;
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
    for (const proxyFn of this.CORS_PROXIES) {
      try {
        const proxyUrl = proxyFn(this.MEDIUM_RSS);
        const response = await fetch(proxyUrl);
        if (!response.ok) continue;

        const text = await response.text();

        if (proxyUrl.includes('rss2json')) {
          return this.parseRss2JsonResponse(text);
        }
        return this.parseXmlResponse(text);
      } catch {
        continue;
      }
    }

    console.warn('All CORS proxies failed.');
    return [];
  }

  // --- Parse helpers ---

  private parseXmlResponse(xml: string): MediumPost[] {
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const parsed = parser.parse(xml);
    const items: any[] = parsed?.rss?.channel?.item || [];
    return items.map((item: any) => this.mapItem(item['content:encoded'] || item.description || '', item));
  }

  private parseRss2JsonResponse(json: string): MediumPost[] {
    const data = JSON.parse(json);
    if (data.status !== 'ok' || !data.items) return [];
    return data.items.map((item: any) => {
      const html = item.description || item.content || '';
      return {
        title: item.title || '',
        link: item.link || '#',
        pubDate: item.pubDate || '',
        creator: item.author || 'Hantsy',
        summary: this.firstParagraph(html),
        thumbnail: this.firstImage(html),
        categories: item.categories || [],
      };
    });
  }

  private mapItem(html: string, item: any): MediumPost {
    return {
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: item.pubDate || '',
      creator: item['dc:creator'] || 'Hantsy',
      summary: this.firstParagraph(html),
      thumbnail: this.firstImage(html),
      categories: item.category
        ? Array.isArray(item.category)
          ? item.category
          : [item.category]
        : [],
    };
  }

  /** Extract the src from the first <figure> or <img> tag. */
  private firstImage(html: string): string {
    // Medium wraps images in <figure><img .../></figure>
    const fig = html.match(/<figure[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
    if (fig) return fig[1];
    const img = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return img ? img[1] : '';
  }

  /** Extract text from the first <p> tag, truncating at a sentence boundary. */
  private firstParagraph(html: string): string {
    const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const raw = m ? this.stripHtml(m[1]) : this.stripHtml(html);
    return this.truncateToSentence(raw, 260);
  }

  /** Truncate text to end at the last . or ? within the limit, falling back to last space. */
  private truncateToSentence(text: string, limit: number): string {
    if (text.length <= limit) return text;
    const slice = text.substring(0, limit);
    // Try to break at a sentence-ending punctuation
    const lastDot = slice.lastIndexOf('.');
    const lastQ = slice.lastIndexOf('?');
    const breakAt = Math.max(lastDot, lastQ);
    if (breakAt > limit * 0.5) return slice.substring(0, breakAt + 1);
    // Fallback: break at last space
    const lastSpace = slice.lastIndexOf(' ');
    return (lastSpace > 0 ? slice.substring(0, lastSpace) : slice) + '…';
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
