import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Control, Field } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { ProfessionalInfo } from '../../models/registration.models';
import { OccupationService } from '../../services/occupation.service';

@Component({
  selector: 'app-professional-info-step',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    Control,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <mat-form-field>
        <mat-label>Profissão</mat-label>
        <mat-select [control]="form().occupation">
          @for (occupation of occupations(); track occupation.name) {
            <mat-option [value]="occupation.name">
              {{ occupation.name }}
            </mat-option>
          }
        </mat-select>
        @if (form().occupation().errors()) {
          <mat-error>Profissão é obrigatória</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Empresa</mat-label>
        <input
          [control]="form().company"
          matInput
          placeholder="Nome da empresa"
        />
        @if (form().company().errors()) {
          <mat-error>Empresa é obrigatória</mat-error>
        }
      </mat-form-field>

      <mat-form-field class="md:col-span-2">
        <mat-label>Salário</mat-label>
        <input
          [control]="form().salary"
          matInput
          mask="separator.2"
          thousandSeparator=","
          prefix="R$ "
          placeholder="R$ 0,00"
        />
        <!-- FIXME: - Add proper error handling -->
        @if (form().salary().errors()?.['required']) {
          <mat-error>Salário é obrigatório</mat-error>
        } @else if (form().salary().errors()?.['min']) {
          <mat-error>Salário deve ser maior que 0</mat-error>
        }
      </mat-form-field>
    </div>
  `,
})
export class ProfessionalInfoStepComponent {
  form = input.required<Field<ProfessionalInfo>>();

  private occupationService = inject(OccupationService);
  occupations = this.occupationService.occupations;
}
