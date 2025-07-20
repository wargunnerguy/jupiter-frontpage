import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Standalone service for fetching front page video data from ERR Jupiter
@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee';

  constructor(private http: HttpClient) {}

  // Returns an observable containing the API response
  fetchFrontPage(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
