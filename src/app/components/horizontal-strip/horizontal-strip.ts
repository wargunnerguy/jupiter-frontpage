import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
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
export class HorizontalStripComponent
  implements AfterViewInit, OnDestroy, OnChanges
{
  @Input() title = '';
  @Input() headerUrl = '';
  @Input() items: any[] = [];
  @Input() loading = true;

  @ViewChild('scrollContainer', { static: true })
  scrollContainer!: ElementRef<HTMLDivElement>;

  showLeft = false;
  showRight = false;
  private scrollEl!: HTMLDivElement;
  private scrollListener = () => this.updateScrollButtons();

  ngAfterViewInit() {
    this.scrollEl = this.scrollContainer.nativeElement;
    this.scrollEl.addEventListener('scroll', this.scrollListener);
    // also compute initial state in case items were already set
    this.updateScrollButtons();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      // items changed → wait for DOM update then recompute
      setTimeout(() => this.updateScrollButtons());
    }
  }

  ngOnDestroy() {
    this.scrollEl.removeEventListener('scroll', this.scrollListener);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScrollButtons();
  }

  private updateScrollButtons() {
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollEl;
    this.showLeft  = scrollLeft > 0;
    this.showRight = scrollLeft + clientWidth < scrollWidth;
  }

  scrollLeft() {
    this.scrollEl.scrollBy({ left: -this.scrollEl.clientWidth * 0.8, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollEl.scrollBy({ left:  this.scrollEl.clientWidth * 0.8, behavior: 'smooth' });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.scrollLeft(); event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.scrollRight(); event.preventDefault();
    }
  }
}
