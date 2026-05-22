import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic',
    title: 'Pipes básicos',
    loadComponent: () => import('./pages/basic-page.component/basic-page.component'),
  },
  {
    path: 'numbers',
    title: 'Numbers pipes',
    loadComponent: () => import('./pages/numbers-page.component/numbers-page.component'),
  },
  {
    path: 'uncommon',
    title: 'Pipes no tan comunes',
    loadComponent: () => import('./pages/uncommon-page.component/uncommon-page.component'),
  },
  {
    path: 'custom',
    title: 'Pipes personalizados',
    loadComponent: () => import('./pages/custom-page.component/custom-page.component'),
  },
  {
    path: 'hero/:name',
    title: 'Detalle de Héroe',
    loadComponent: () => import('./pages/hero-page.component/hero-page.component'),
  },
  {
    path: '**',
    redirectTo: 'basic',
  },
];
