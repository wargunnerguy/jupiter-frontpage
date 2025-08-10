import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
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
  @Input() isFirstStrip = false;


  @ViewChild('scrollContainer', { static: true })
  scrollContainer!: ElementRef<HTMLDivElement>;

  showLeft = false;
  showRight = false;
  private scrollEl!: HTMLDivElement;
  private scrollListener = () => this.updateScrollButtons();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.scrollEl = this.scrollContainer.nativeElement;
    this.scrollEl.addEventListener('scroll', this.scrollListener);

    // Defer the initial scroll button calculation to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.updateScrollButtons();
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      // items changed → wait for DOM update then recompute
      setTimeout(() => {
        this.updateScrollButtons();
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    this.scrollEl.removeEventListener('scroll', this.scrollListener);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScrollButtons();
    this.cdr.detectChanges();
  }

  private updateScrollButtons() {
    if (!this.scrollEl) return;
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollEl;
    this.showLeft = scrollLeft > 0;
    this.showRight = scrollLeft + clientWidth < scrollWidth;
  }

  scrollLeft() {
    this.scrollEl.scrollBy({ left: -this.scrollEl.clientWidth * 0.8, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollEl.scrollBy({ left: this.scrollEl.clientWidth * 0.8, behavior: 'smooth' });
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
}
