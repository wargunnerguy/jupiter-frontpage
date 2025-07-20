import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data';
import { HorizontalStripComponent } from './components/horizontal-strip/horizontal-strip';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalStripComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  loading = true;
  frontPageStrips: any[] = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.fetchFrontPage().subscribe({
      next: (res) => {
        const strips = res.data?.category?.frontPage ?? [];
        this.frontPageStrips = strips.filter((s: any) => s.highTimeline);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch front page:', err);
        this.loading = false;
      }
    });
  }
}
