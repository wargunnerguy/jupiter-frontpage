import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
        width: '100%',
        height: '100%'
      },
    }),

  ]
};
