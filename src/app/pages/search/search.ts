import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchService } from '../../services/search';
import { QueryParams } from '../../models/query-params.model';
import { SearchResponse } from '../../models/search-response.model';
import { buildCropUrl } from '../../utils/image-cropper';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.scss'],
})
export class Search {
  private fb = inject(FormBuilder);
  private api = inject(SearchService);

  loading = signal(false);
  error = signal<string | null>(null);
  results = signal<SearchResponse | null>(null);

  form = this.fb.group({
    phrase: ['', [Validators.required, Validators.minLength(2)]],
    type: ['all'],
    sortOption: ['accuracy'],
    timeRange: ['all'],
    limit: [20],
  });

  page = signal(1);

  constructor() {
    effect(() => {
      this.error();
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.page.set(1);
    this.runSearch();
  }

  nextPage() {
    this.page.update(p => p + 1);
    this.runSearch();
  }

  prevPage() {
    this.page.update(p => Math.max(1, p - 1));
    this.runSearch();
  }

  private runSearch() {
    const v = this.form.value;
    const qp: QueryParams = {
      phrase: v.phrase!,
      type: v.type as any,
      sortOption: v.sortOption as any,
      page: this.page(),
      limit: v.limit!,
      timeRange: v.timeRange as any,
      timeRangeFrom: null,
      timeRangeTo: null,
      includeTranscription: false,
      advancedParams: [],
    };

    this.loading.set(true);
    this.error.set(null);

    this.api.search(qp).subscribe({
      next: (res: SearchResponse) => {
        this.results.set(res);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error(err);
        this.error.set('Tõrge päringuga. Proovi uuesti.');
        this.loading.set(false);
      }
    });
  }

  asGroup = <T,>(x: T) => x;

  crop(url?: string, opts?: { width?: number; height?: number }) {
    return url ? buildCropUrl(url, opts) : '';
  }
}
