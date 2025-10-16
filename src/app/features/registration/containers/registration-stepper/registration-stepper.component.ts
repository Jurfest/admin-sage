import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';
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
    MatStepperModule,
    MatButtonModule,
    PersonalInfoStepComponent,
    ResidentialInfoStepComponent,
    ProfessionalInfoStepComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1 class="text-3xl font-bold text-center mb-8">
        Formulário de Cadastro
      </h1>

      <mat-stepper #stepper orientation="horizontal">
        <mat-step [completed]="personalForm()">
          <ng-template matStepLabel>Informações Pessoais</ng-template>
          <div class="mt-6">
            <app-personal-info-step
              [form]="personalForm()"
            ></app-personal-info-step>
          </div>
          <div class="mt-4">
            <button matButton matStepperNext>Próximo</button>
          </div>
        </mat-step>

        <!-- FIXME: Verify completed condition -->
        <mat-step [completed]="residentialForm()">
          <ng-template matStepLabel>Endereço</ng-template>
          <div class="mt-6">
            <app-residential-info-step
              [residentialForm]="residentialForm()"
            ></app-residential-info-step>
          </div>
          <div class="mt-4">
            <button matButton matStepperPrevious>Voltar</button>
            <button class="ml-2" matButton matStepperNext>Próximo</button>
          </div>
        </mat-step>

        <mat-step [completed]="professionalForm()">
          <ng-template matStepLabel>Profissional</ng-template>
          <div class="mt-6">
            <app-professional-info-step
              [form]="professionalForm()"
            ></app-professional-info-step>
          </div>
          <div class="mt-4">
            <button matButton matStepperPrevious>Voltar</button>
            <button
              class="ml-2"
              [disabled]="registrationForm().invalid()"
              (click)="navigateToSummary()"
              matButton
              color="primary"
            >
              Ver Resumo
            </button>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
})
export class RegistrationStepperComponent {
  formService = inject(RegistrationFormService);
  private router = inject(Router);

  // --- linked signals for each step ---
  registrationForm = this.formService.registrationForm;
  personalForm = linkedSignal(() => this.registrationForm.personal);
  residentialForm = linkedSignal(() => this.registrationForm.residential);
  professionalForm = linkedSignal(() => this.registrationForm.professional);

  navigateToSummary(): void {
    this.router.navigate(['/registration/summary']);
  }
}
