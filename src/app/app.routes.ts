import { Route } from '@angular/router';

import {
  RegistrationStepperComponent,
} from './features/registration/components/registration-stepper/registration-stepper.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registration',
  },
  {
    path: 'registration',
    component: RegistrationStepperComponent,
  },
  {
    path: 'summary',
    loadComponent: () =>
      import(
        './features/registration/components/summary-step/summary-step.component'
      ),
  },
  {
    path: '**',
    redirectTo: 'registration',
  },
];
