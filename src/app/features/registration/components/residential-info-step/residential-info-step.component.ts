import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  effect,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

@Component({
  selector: 'app-residential-info-step',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
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
        <mat-label>CEP</mat-label>
        <input
          matInput
          formControlName="zipCode"
          mask="00000-000"
          placeholder="00000-000"
        />
        @if (formGroup().get('zipCode')?.hasError('required')) {
        <mat-error>CEP é obrigatório</mat-error>
        } @if (formGroup().get('zipCode')?.hasError('pattern')) {
        <mat-error>Formato de CEP inválido</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Endereço</mat-label>
        <input
          matInput
          formControlName="address"
          placeholder="Endereço da rua"
        />
        @if (formGroup().get('address')?.hasError('required')) {
        <mat-error>Endereço é obrigatório</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Bairro</mat-label>
        <input matInput formControlName="neighborhood" placeholder="Bairro" />
        @if (formGroup().get('neighborhood')?.hasError('required')) {
        <mat-error>Bairro é obrigatório</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Cidade</mat-label>
        <input matInput formControlName="city" placeholder="Cidade" />
        @if (formGroup().get('city')?.hasError('required')) {
        <mat-error>Cidade é obrigatória</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Estado</mat-label>
        <input matInput formControlName="state" placeholder="Estado" />
        @if (formGroup().get('state')?.hasError('required')) {
        <mat-error>Estado é obrigatório</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class ResidentialInfoStepComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  private destroyRef = inject(DestroyRef);
  private store = inject(ZipCodeStore);

  ngOnInit(): void {
    this.formGroup()
      .get('zipCode')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => (value ?? '').replace(/\D/g, '')), // keep only digits
        filter((digits) => digits.length === 8),
        tap((zipCode) => this.store.lookupZipCode(zipCode)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  constructor() {
    effect(() => {
      const data = this.store.data();
      if (data?.address) {
        this.formGroup().patchValue({
          address: data.address,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
        });
      }
    });
  }
}
