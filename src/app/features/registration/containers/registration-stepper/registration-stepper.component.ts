import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';

import { PersonalInfoStepComponent } from '../../components/personal-info-step/personal-info-step.component';
import { ProfessionalInfoStepComponent } from '../../components/professional-info-step/professional-info-step.component';
import { ResidentialInfoStepComponent } from '../../components/residential-info-step/residential-info-step.component';
import { RegistrationFormService } from '../../services/registration-form.service';

@Component({
  selector: 'app-registration-stepper',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    PersonalInfoStepComponent,
    ResidentialInfoStepComponent,
    ProfessionalInfoStepComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-center mb-8">
        Formulário de Cadastro
      </h1>

      <mat-stepper
        [formGroup]="formService.registrationForm"
        orientation="horizontal"
        #stepper
      >
        <mat-step
          formGroupName="personal"
          [stepControl]="formService.personalFormGroup"
          errorMessage="Informações incompletas."
        >
          <ng-template matStepLabel>Informações Pessoais</ng-template>
          <app-personal-info-step
            [formGroup]="formService.personalFormGroup"
          ></app-personal-info-step>
          <div class="mt-4">
            <button matButton matStepperNext>Próximo</button>
          </div>
        </mat-step>

        <mat-step
          formGroupName="residential"
          [stepControl]="formService.residentialFormGroup"
          errorMessage="Informações incompletas."
        >
          <ng-template matStepLabel>Endereço</ng-template>
          <ng-template matStepContent>
            <app-residential-info-step
              [formGroup]="formService.residentialFormGroup"
            ></app-residential-info-step>
            <div class="mt-4">
              <button matButton matStepperPrevious>Voltar</button>
              <button matButton matStepperNext class="ml-2">Próximo</button>
            </div>
          </ng-template>
        </mat-step>

        <mat-step
          formGroupName="professional"
          [stepControl]="formService.professionalFormGroup"
          errorMessage="Informações incompletas."
        >
          <ng-template matStepLabel>Profissional</ng-template>
          <ng-template matStepContent>
            <app-professional-info-step
              [formGroup]="formService.professionalFormGroup"
            ></app-professional-info-step>
            <div class="mt-4">
              <button matButton matStepperPrevious>Voltar</button>
              <button
                matButton
                color="primary"
                (click)="navigateToSummary()"
                [disabled]="!formService.registrationForm.valid"
                class="ml-2"
              >
                Ver Resumo
              </button>
            </div>
          </ng-template>
        </mat-step>
      </mat-stepper>
    </div>
  `,
})
export class RegistrationStepperComponent {
  formService = inject(RegistrationFormService);
  private router = inject(Router);

  navigateToSummary(): void {
    this.router.navigate(['/registration/summary']);
  }
}
