import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './video-card.html',
  styleUrls: ['./video-card.scss']
})
export class VideoCardComponent {
  @Input() item!: any;
  @Input() index = 0;
  @Input() priority = false;

  // Build a srcset from all available verticalPhotos sizes
  getSrcset(): string {
    const types = this.item.verticalPhotos?.[0]?.photoTypes || {};
    return Object.values(types)
      .map((t: any) => `${t.url} ${t.w}w`)
      .join(', ');
  }

  getImageUrl(): string {
    // Fallback to the largest photoUrlOriginal if needed
    return this.item.verticalPhotos?.[0]?.photoUrlOriginal || '';
  }
}
