import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  effect,
  computed,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';

import { ZipCodeStore } from '../../+state/zip-code.store';
import { Control, Field } from '@angular/forms/signals';
import { ResidentialInfo } from '../../models/registration.models';
import { debounceSignal } from '../../../../utils/signal-utilities';

@Component({
  selector: 'app-residential-info-step',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    Control,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <mat-form-field>
        <mat-label>CEP</mat-label>
        <input
          [control]="residentialForm().zipCode"
          matInput
          mask="00000-000"
          placeholder="00000-000"
        />
        @for (error of residentialForm().zipCode().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Endereço</mat-label>
        <input
          [control]="residentialForm().address"
          matInput
          placeholder="Endereço da rua"
        />
        @for (error of residentialForm().address().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Bairro</mat-label>
        <input
          [control]="residentialForm().neighborhood"
          matInput
          placeholder="Bairro"
        />
        @for (
          error of residentialForm().neighborhood().errors();
          track $index
        ) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Cidade</mat-label>
        <input
          [control]="residentialForm().city"
          matInput
          placeholder="Cidade"
        />
        @for (error of residentialForm().city().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Estado</mat-label>
        <input
          [control]="residentialForm().state"
          matInput
          placeholder="Estado"
        />
        @for (error of residentialForm().state().errors(); track $index) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class ResidentialInfoStepComponent {
  residentialForm = input.required<Field<ResidentialInfo>>();
  private store = inject(ZipCodeStore);

  // ngOnInit(): void {
  //   this.formGroup()
  //     .get('zipCode')
  //     ?.valueChanges.pipe(
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       map((value) => (value ?? '').replace(/\D/g, '')), // keep only digits
  //       filter((digits) => digits.length === 8),
  //       tap((zipCode) => this.store.lookupZipCode(zipCode)),
  //       takeUntilDestroyed(this.destroyRef)
  //     )
  //     .subscribe();
  // }
  private zipCodeValue = computed(() =>
    this.residentialForm().zipCode().value()
  );
  private debouncedZipCode = debounceSignal(this.zipCodeValue, 500);

  constructor() {
    effect(() => {
      const rawValue = this.debouncedZipCode() ?? '';
      const digits = rawValue.replace(/\D/g, '');
      if (digits.length === 8) {
        console.log('Looking up ZIP code:', digits);
        this.store.lookupZipCode(digits);
      }
    });

    effect(() => {
      const data = this.store.data();
      if (!data || !data.address) return;

      const address = this.residentialForm().address().value();
      if (address === data.address) return; // prevent infinite re-triggers

      this.residentialForm().address().value.set(data.address);
      this.residentialForm().neighborhood().value.set(data.neighborhood);
      this.residentialForm().city().value.set(data.city);
      this.residentialForm().state().value.set(data.state);
    });
  }
}
