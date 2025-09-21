import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';

import { Occupation } from '../../models/registration.models';
import { OccupationService } from '../../services/occupation.service';

@Component({
  selector: 'app-professional-info-step',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      [formGroup]="formGroup()"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <mat-form-field>
        <mat-label>Profissão</mat-label>
        <mat-select formControlName="occupation">
          @for (occupation of occupations$ | async; track occupation.name) {
          <mat-option [value]="occupation.name">
            {{ occupation.name }}
          </mat-option>
          }
        </mat-select>
        @if (formGroup().get('occupation')?.hasError('required')) {
        <mat-error>Profissão é obrigatória</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Empresa</mat-label>
        <input matInput formControlName="company" placeholder="Nome da empresa" />
        @if (formGroup().get('company')?.hasError('required')) {
        <mat-error>Empresa é obrigatória</mat-error>
        }
      </mat-form-field>

      <mat-form-field class="md:col-span-2">
        <mat-label>Salário</mat-label>
        <input
          matInput
          formControlName="salary"
          mask="separator.2"
          thousandSeparator=","
          prefix="R$ "
          placeholder="R$ 0,00"
        />
        @if (formGroup().get('salary')?.hasError('required')) {
        <mat-error>Salário é obrigatório</mat-error>
        } @if (formGroup().get('salary')?.hasError('min')) {
        <mat-error>Salário deve ser maior que 0</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class ProfessionalInfoStepComponent {
  formGroup = input.required<FormGroup>();
  occupations$: Observable<Occupation[]> =
    inject(OccupationService).getOccupations();
}
