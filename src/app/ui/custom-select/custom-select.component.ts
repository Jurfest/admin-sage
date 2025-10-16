import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-custom-select',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  host: { '[class.disabled-state]': 'disabled()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field class="custom-select">
      <mat-label>
        {{ required() ? label() + '*' : label() }}
      </mat-label>
      <mat-select
        [(value)]="value"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
      >
        @if (loading()) {
          <mat-option>
            <div class="flex place-items-center gap-2">
              <mat-spinner diameter="16"></mat-spinner>
              <span>Loading...</span>
            </div>
          </mat-option>
        } @else {
          @for (option of options(); track option.value) {
            <mat-option class="custom-option" [value]="option.value">
              <div class="flex place-items-stretch gap-2">
                <mat-icon class="option-icon">
                  {{ option.icon || defaultIcon() }}
                </mat-icon>
                <span>{{ option.label }}</span>
              </div>
            </mat-option>
          }
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      .custom-select {
        width: 100%;

        ::ng-deep .mat-mdc-select-trigger {
          color: var(--mat-sys-primary);
        }

        ::ng-deep .mat-mdc-select-arrow {
          color: var(--mat-sys-primary);
        }

        ::ng-deep .mat-mdc-form-field-focus-overlay {
          background-color: var(--mat-sys-primary-container);
        }

        ::ng-deep
          .mat-mdc-form-field.mat-focused
          .mat-mdc-form-field-outline-thick {
          color: var(--mat-sys-primary);
        }
      }

      ::ng-deep .custom-option {
        &.mat-mdc-option.mdc-list-item--selected {
          background-color: var(--mat-sys-primary-container);
          color: var(--mat-sys-on-primary-container);
        }

        &:hover {
          background-color: var(--mat-sys-surface-variant);
        }

        .option-icon {
          color: var(--mat-sys-tertiary);
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    `,
  ],
})
export class CustomSelectComponent implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);

  label = input.required<string>();
  options = input.required<SelectOption[]>();
  placeholder = input<string>('');
  defaultIcon = input<string>('work');
  loading = input<boolean>(false);
}
