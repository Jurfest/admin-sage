import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { ZipCodeService } from '../../services/zip-code.service';

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
  private zipCodeService = inject(ZipCodeService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.formGroup()
      .get('zipCode')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => (value ?? '').replace(/\D/g, '')), // keep only digits
        filter((digits) => digits.length === 8),
        switchMap((zipCode) => this.zipCodeService.lookupZipCode(zipCode)),
        tap((response) => {
          this.formGroup().patchValue({
            address: response.address,
            neighborhood: response.neighborhood,
            city: response.city,
            state: response.state,
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

  }
}
