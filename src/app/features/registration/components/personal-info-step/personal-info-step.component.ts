import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Control, Field } from '@angular/forms/signals';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { PersonalInfo } from '../../models/registration.models';

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
          matInput
          placeholder="Digite seu nome completo"
          [control]="form().fullName"
        />
        <!-- FIXME: - Add proper error handling -->
        @if (form().fullName().errors()?.['required']) {
        <mat-error>Nome completo é obrigatório</mat-error>
        } @if (form().fullName().errors()?.['minlength']) {
        <mat-error>Nome deve ter pelo menos 2 caracteres</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Data de Nascimento</mat-label>
        <input
          matInput
          placeholder="dd/mm/aaaa"
          [control]="form().dateOfBirth"
          [min]="minDate"
          [max]="maxDate"
          [matDatepicker]="picker"
        />
        <mat-hint>DD/MM/AAAA</mat-hint>

        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <!-- FIXME: - Add proper error handling -->
        @if (form().dateOfBirth().errors()?.['required']) {
        <mat-error>Data de nascimento é obrigatória</mat-error>
        } @if (form().dateOfBirth().errors()?.['matDatepickerMin']) {
        <mat-error>Data deve ser posterior a 01/01/1900</mat-error>
        } @if (form().dateOfBirth().errors()?.['matDatepickerMax']) {
        <mat-error>Data não pode ser futura</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>CPF</mat-label>
        <input
          matInput
          mask="000.000.000-00"
          placeholder="000.000.000-00"
          [control]="form().cpf"
        />
        <!-- FIXME: - Add proper error handling -->
        @if (form().cpf().errors()?.['required']) {
        <mat-error>CPF é obrigatório</mat-error>
        } @if (form().cpf().errors()?.['cpf']) {
        <mat-error>CPF inválido</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Número de Telefone</mat-label>
        <input
          matInput
          mask="(00) 0000-0000||(00) 00000-0000"
          placeholder="(00) 0000-0000 ou (00) 00000-0000"
          [control]="form().phoneNumber"
        />
        <!-- FIXME: - Add proper error handling -->
        @if (form().phoneNumber().errors()?.['required']) {
        <mat-error>Número de telefone é obrigatório</mat-error>
        } @if (form().phoneNumber().errors()?.['phone']) {
        <mat-error
          >Formato inválido. Use (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX</mat-error
        >
        }
      </mat-form-field>
    </form>
  `,
})
export class PersonalInfoStepComponent {
  form = input.required<Field<PersonalInfo>>();

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
}
