import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BlogStore } from '../stores/blog.store';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.css'],
})
export default class BlogIndexPage {
  readonly store = inject(BlogStore);

  private readonly palette = [
    '#e8eaf6','#fce4ec','#e0f2f1','#fbe9e7','#ede7f6',
    '#e0f7fa','#f1f8e9','#fff3e0','#efebe9','#eceff1',
    '#e3f2fd','#ffebee','#e8f5e9','#f3e5f5','#f9fbe7',
  ];
  private readonly darkText = [
    '#283593','#880e4f','#00695c','#bf360c','#4527a0',
    '#00838f','#558b2f','#e65100','#4e342e','#37474f',
    '#0d47a1','#b71c1c','#1b5e20','#6a1b9a','#827717',
  ];
  private tagColorMap = new Map<string, { bg: string; text: string }>();

  tagColor(tag: string): string {
    return this.ensureTag(tag).bg;
  }

  tagTextColor(tag: string): string {
    return this.ensureTag(tag).text;
  }

  private ensureTag(tag: string): { bg: string; text: string } {
    if (!this.tagColorMap.has(tag)) {
      const i = this.tagColorMap.size % this.palette.length;
      this.tagColorMap.set(tag, { bg: this.palette[i], text: '#' + this.darkText[i] });
    }
    return this.tagColorMap.get(tag)!;
  }
}
