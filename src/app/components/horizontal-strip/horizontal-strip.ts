import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card';

@Component({
  selector: 'app-horizontal-strip',
  standalone: true,
  imports: [CommonModule, VideoCardComponent],
  templateUrl: './horizontal-strip.html',
  styleUrls: ['./horizontal-strip.scss']
})
export class HorizontalStripComponent {
  @Input() title = '';
  @Input() headerUrl = '';
  @Input() items: any[] = [];

  @ViewChild('scrollContainer', { static: true })
  scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    const el = this.scrollContainer.nativeElement;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: -step, behavior: 'smooth' });
  }

  scrollRight() {
    const el = this.scrollContainer.nativeElement;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: step, behavior: 'smooth' });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.scrollLeft();
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.scrollRight();
      event.preventDefault();
    }
  }

  trackById(_idx: number, itm: any) {
    return itm.id;
  }
}
