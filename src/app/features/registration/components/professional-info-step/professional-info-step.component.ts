import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Control, Field } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import {
  CustomSelectComponent,
  SelectOption,
} from '../../../../ui/custom-select/custom-select.component';
import { ProfessionalInfo } from '../../models/registration.models';
import { OccupationService } from '../../services/occupation.service';

@Component({
  selector: 'app-professional-info-step',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    Control,
    CustomSelectComponent,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <app-custom-select
        [control]="form().occupation"
        [options]="occupationOptions()"
        label="Profissão"
        placeholder="Selecione uma profissão"
        defaultIcon="work"
      />

      <mat-form-field>
        <mat-label>Empresa</mat-label>
        <input
          [control]="form().company"
          matInput
          placeholder="Nome da empresa"
        />
        @for (error of form().company().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
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
        @for (error of form().salary().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>
    </div>
  `,
})
export class ProfessionalInfoStepComponent {
  form = input.required<Field<ProfessionalInfo>>();

  private occupationService = inject(OccupationService);
  occupations = this.occupationService.occupations;

  occupationOptions = computed((): SelectOption[] =>
    this.occupations().map((occupation) => ({
      value: occupation.name,
      label: occupation.name,
      icon: occupation.icon || 'work',
    }))
  );
}
