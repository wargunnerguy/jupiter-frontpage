import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/frontpage/frontpage').then(m => m.Frontpage),
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search').then(m => m.Search),
  },
];
