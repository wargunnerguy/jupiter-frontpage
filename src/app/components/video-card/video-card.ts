import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-card.html',
  styleUrls: ['./video-card.scss']
})
export class VideoCardComponent {
  @Input() item: any;

  getImageUrl(): string {
    const photos = this.item?.verticalPhotos;
    const photoTypes = photos?.[0]?.photoTypes;

    return (
      photoTypes?.[80]?.url ||
      photoTypes?.[60]?.url ||
      photoTypes?.[17]?.url ||
      photos?.[0]?.photoUrlOriginal ||
      ''
    );
  }
}
