import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registration',
  },
  {
    path: 'registration',
    loadChildren: () => import('./features/registration/registration.routes'),
  },
  {
    path: '**',
    redirectTo: 'registration',
  },
];
