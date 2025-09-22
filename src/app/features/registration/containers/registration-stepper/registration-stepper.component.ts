import {
  Component,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { CustomValidators } from '../../../../validators/custom-validators';
import { PersonalInfoStepComponent } from '../../components/personal-info-step/personal-info-step.component';
import { ProfessionalInfoStepComponent } from '../../components/professional-info-step/professional-info-step.component';
import { ResidentialInfoStepComponent } from '../../components/residential-info-step/residential-info-step.component';
import { SummaryStepComponent } from '../summary-step/summary-step.component';

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
    SummaryStepComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-center mb-8">
        Formulário de Cadastro
      </h1>

      <mat-stepper
        [formGroup]="registrationForm"
        orientation="horizontal"
        #stepper
      >
        <mat-step
          formGroupName="personal"
          [stepControl]="personalFormGroup"
          errorMessage="Informações incompletas."
        >
          <ng-template matStepLabel>Informações Pessoais</ng-template>
          <app-personal-info-step
            [formGroup]="personalFormGroup"
          ></app-personal-info-step>
          <div class="mt-4">
            <button matButton matStepperNext>Próximo</button>
          </div>
        </mat-step>

        <mat-step
          formGroupName="residential"
          [stepControl]="residentialFormGroup"
          errorMessage="Informações incompletas."
        >
          <ng-template matStepLabel>Endereço</ng-template>
          <ng-template matStepContent>
            <app-residential-info-step
              [formGroup]="residentialFormGroup"
            ></app-residential-info-step>
            <div class="mt-4">
              <button matButton matStepperPrevious>Voltar</button>
              <button matButton matStepperNext class="ml-2">Próximo</button>
            </div>
          </ng-template>
        </mat-step>

        <mat-step
          formGroupName="professional"
          [stepControl]="professionalFormGroup"
          errorMessage="Informações incompletas."
        >
          <ng-template matStepLabel>Profissional</ng-template>
          <ng-template matStepContent>
            <app-professional-info-step
              [formGroup]="professionalFormGroup"
            ></app-professional-info-step>
            <div class="mt-4">
              <button matButton matStepperPrevious>Voltar</button>
              <button matButton matStepperNext class="ml-2">Próximo</button>
            </div>
          </ng-template>
        </mat-step>

        <mat-step>
          <ng-template matStepLabel>Resumo</ng-template>
          <app-summary-step [formGroup]="registrationForm"></app-summary-step>
          <div class="mt-4">
            <button matButton matStepperPrevious>Voltar</button>
            <button matButton (click)="stepper.reset()" class="ml-2">
              Reiniciar
            </button>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
})
export class RegistrationStepperComponent {
  private fb = inject(FormBuilder);

  get personalFormGroup() {
    return this.registrationForm.controls.personal as FormGroup;
  }

  get residentialFormGroup() {
    return this.registrationForm.controls.residential as FormGroup;
  }

  get professionalFormGroup() {
    return this.registrationForm.controls.professional as FormGroup;
  }

  registrationForm = this.fb.group({
    personal: this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      cpf: ['', [Validators.required, CustomValidators.cpf()]],
      phoneNumber: ['', [Validators.required, CustomValidators.phone()]],
    }),
    residential: this.fb.group({
      zipCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)],
      ],
      address: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    }),
    professional: this.fb.group({
      occupation: ['', Validators.required],
      company: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    }),
  });
}
