import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '../models/query-params.model';
import { Observable, map } from 'rxjs';
import { SearchResponse } from '../models/search-response.model';
import { buildCropUrl } from '../utils/image-cropper';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  private readonly API = '/api/v1/search';

  search(queryParams: QueryParams): Observable<SearchResponse> {
    return this.http.post<SearchResponse>(this.API, { queryParams }).pipe(
      map((res) => {
        if (res.activeList?.data) {
          // Log the first item so we can confirm what the API returns
          const firstItem = res.activeList.data[0]?.data?.[0];
          console.log('Sample API item:', firstItem);

          res.activeList.data.forEach((group) => {
            group.data.forEach((item: any) => {
              let fileUrl: string | undefined;

              // 1️⃣ Photos usually have "file"
              if (group.type === 'photo' && item.file) {
                fileUrl = item.file;
              }

              // 2️⃣ Some videos/audios have "photoTypes" array
              else if (Array.isArray(item.photoTypes) && item.photoTypes.length) {
                const found = item.photoTypes.find((p: any) => p.file);
                if (found) fileUrl = found.file;
              }

              // 3️⃣ Direct image property
              else if (item.image) {
                fileUrl = item.image;
              }

              // 4️⃣ Some APIs use "imageUrl"
              else if (item.imageUrl) {
                fileUrl = item.imageUrl;
              }

              // 5️⃣ Thumbnails
              else if (item.thumbnail) {
                fileUrl = item.thumbnail;
              }

              // Apply crop if found
              if (fileUrl) {
                item.cropUrl = buildCropUrl(fileUrl, { height: 300 });
              } else {
                item.cropUrl = null;
              }
            });
          });
        }
        console.log('Full search API response:', res);
        return res;
      })
    );
  }
}
