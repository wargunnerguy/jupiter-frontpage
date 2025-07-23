import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
        width: '100%',
        height: '100%'
      },
    }),

  ]
};
