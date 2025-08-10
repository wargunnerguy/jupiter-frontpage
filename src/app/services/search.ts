import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '../models/query-params.model';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/search-response.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  private readonly API = 'https://arhiiv.err.ee/api/v1/search';

  search(queryParams: QueryParams): Observable<SearchResponse> {
    return this.http.post<SearchResponse>(this.API, { queryParams });
  }
}
