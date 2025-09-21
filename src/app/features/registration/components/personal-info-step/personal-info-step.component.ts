import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-personal-info-step',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      [formGroup]="formGroup()"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <mat-form-field class="md:col-span-2">
        <mat-label>Full Name</mat-label>
        <input
          matInput
          formControlName="fullName"
          placeholder="Enter your full name"
        />
        @if (formGroup().get('fullName')?.hasError('required')) {
        <mat-error>Full name is required</mat-error>
        } @if (formGroup().get('fullName')?.hasError('minlength')) {
        <mat-error>Name must be at least 2 characters</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Date of Birth</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          formControlName="dateOfBirth"
        />
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        @if (formGroup().get('dateOfBirth')?.hasError('required')) {
        <mat-error>Date of birth is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>CPF</mat-label>
        <input
          matInput
          formControlName="cpf"
          mask="000.000.000-00"
          placeholder="000.000.000-00"
        />
        @if (formGroup().get('cpf')?.hasError('required')) {
        <mat-error>CPF is required</mat-error>
        } @if (formGroup().get('cpf')?.hasError('cpf')) {
        <mat-error>Invalid CPF</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Phone Number</mat-label>
        <input
          matInput
          formControlName="phoneNumber"
          mask="(00) 00000-0000"
          placeholder="(00) 00000-0000"
        />
        @if (formGroup().get('phoneNumber')?.hasError('required')) {
        <mat-error>Phone number is required</mat-error>
        } @if (formGroup().get('phoneNumber')?.hasError('phone')) {
        <mat-error>Invalid phone number</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class PersonalInfoStepComponent {
  formGroup = input.required<FormGroup>();
}
