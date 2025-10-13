import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Control, Field } from '@angular/forms/signals';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { PersonalInfo } from '../../models/registration.models';
import { RegistrationFormService } from '../../services/registration-form.service';

@Component({
  selector: 'app-personal-info-step',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
    Control,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <mat-form-field class="md:col-span-2">
        <mat-label>Nome Completo</mat-label>
        <input
          [control]="form().fullName"
          matInput
          placeholder="Digite seu nome completo"
        />
        @for (error of form().fullName().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Data de Nascimento</mat-label>
        <input
          [control]="form().dateOfBirth"
          [min]="minDate"
          [max]="maxDate"
          [matDatepicker]="picker"
          matInput
          placeholder="dd/mm/aaaa"
        />
        <mat-hint>DD/MM/AAAA</mat-hint>

        <mat-datepicker-toggle [for]="picker" matSuffix></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        @for (error of form().dateOfBirth().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>CPF</mat-label>
        <input
          [control]="form().cpf"
          matInput
          mask="000.000.000-00"
          placeholder="000.000.000-00"
        />
        @for (error of form().cpf().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Número de Telefone</mat-label>
        <input
          [control]="form().phoneNumber"
          matInput
          mask="(00) 0000-0000||(00) 00000-0000"
          placeholder="(00) 0000-0000 ou (00) 00000-0000"
        />
        @for (error of form().phoneNumber().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class PersonalInfoStepComponent {
  private registrationFormService = inject(RegistrationFormService);

  form = input.required<Field<PersonalInfo>>();

  minDate = this.registrationFormService.minDate;
  maxDate = this.registrationFormService.maxDate;
}
