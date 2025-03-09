import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tab6',
    loadComponent: () =>
      import('./pages/tab6/tab6.page').then((m) => m.Tab6Page),
  },
];
