import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card';

@Component({
  selector: 'app-horizontal-strip',
  standalone: true, //
  imports: [CommonModule, VideoCardComponent],
  templateUrl: './horizontal-strip.html',
  styleUrls: ['./horizontal-strip.scss']
})
export class HorizontalStripComponent {
  @Input() title = '';
  @Input() items: any[] = []; //
}
