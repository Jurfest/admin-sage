import { Component, ChangeDetectionStrategy, inject, input, effect } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ZipCodeService } from '../../services/zip-code.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-residential-info-step',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="formGroup()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <mat-form-field>
        <mat-label>ZIP Code</mat-label>
        <input matInput formControlName="zipCode" mask="00000-000" placeholder="00000-000">
        @if (formGroup().get('zipCode')?.hasError('required')) {
          <mat-error>ZIP code is required</mat-error>
        }
        @if (formGroup().get('zipCode')?.hasError('pattern')) {
          <mat-error>Invalid ZIP code format</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Address</mat-label>
        <input matInput formControlName="address" placeholder="Street address">
        @if (formGroup().get('address')?.hasError('required')) {
          <mat-error>Address is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Neighborhood</mat-label>
        <input matInput formControlName="neighborhood" placeholder="Neighborhood">
        @if (formGroup().get('neighborhood')?.hasError('required')) {
          <mat-error>Neighborhood is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>City</mat-label>
        <input matInput formControlName="city" placeholder="City">
        @if (formGroup().get('city')?.hasError('required')) {
          <mat-error>City is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>State</mat-label>
        <input matInput formControlName="state" placeholder="State">
        @if (formGroup().get('state')?.hasError('required')) {
          <mat-error>State is required</mat-error>
        }
      </mat-form-field>
    </form>
  `
})
export class ResidentialInfoStepComponent {
  formGroup = input.required<FormGroup>();
  private zipCodeService = inject(ZipCodeService);

  constructor() {
    effect(() => {
      const form = this.formGroup();
      form.get('zipCode')?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => value && value.replace(/\D/g, '').length === 8)
      ).subscribe(zipCode => {
        this.zipCodeService.getAddressByZipCode(zipCode).subscribe(response => {
          form.patchValue({
            address: response.address,
            neighborhood: response.neighborhood,
            city: response.city,
            state: response.state
          });
        });
      });
    });
  }
}