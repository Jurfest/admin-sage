import { Routes } from '@angular/router';
import { RegistrationStepperComponent } from './containers/registration-stepper/registration-stepper.component';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        component: RegistrationStepperComponent,
      },
      {
        path: 'summary',
        loadComponent: () =>
          import(
            './containers/summary-step/summary-step.component'
          ),
      },
    ],
  },
];
