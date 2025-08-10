import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FavoritesService } from '../../services/favourites';

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
  loaded = false;
  @Input() loading!: boolean;

  constructor(public favSvc: FavoritesService) {}

  /** Build a srcset from all available verticalPhotos sizes */
  getSrcset(): string {
    const types = this.item.verticalPhotos?.[0]?.photoTypes || {};
    return Object.values(types)
      .map((t: any) => `${t.url} ${t.w}w`)
      .join(', ');
  }

  /** Fallback to the largest photoUrlOriginal if needed */
  getImageUrl(): string {
    return this.item.verticalPhotos?.[0]?.photoUrlOriginal || '';
  }
  getVideoUrl(): string {
    return this.item.canonicalUrl || '';
  }

  onImgLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }
  /** Toggle favorite state in localStorage-backed service */
  onToggleFav() {
    this.favSvc.toggle(this.item.id);
  }
}
