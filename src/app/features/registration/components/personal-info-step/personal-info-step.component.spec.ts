import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { CustomValidators } from '../../../../validators/custom-validators';
import { PersonalInfoStepComponent } from './personal-info-step.component';

describe('PersonalInfoStepComponent', () => {
  let component: PersonalInfoStepComponent;
  let fixture: ComponentFixture<PersonalInfoStepComponent>;
  let formBuilder: FormBuilder;
  let testFormGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PersonalInfoStepComponent,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaskDirective,
        NoopAnimationsModule,
      ],
      providers: [FormBuilder, provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInfoStepComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    testFormGroup = formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      cpf: ['', [Validators.required, CustomValidators.cpf()]],
      phoneNumber: ['', [Validators.required, CustomValidators.phone()]],
    });

    fixture.componentRef.setInput('formGroup', testFormGroup);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct date constraints', () => {
    expect(component.minDate).toEqual(new Date(1900, 0, 1));
    expect(component.maxDate.toDateString()).toBe(new Date().toDateString());
  });

  it('should display required error for fullName', () => {
    testFormGroup.get('fullName')?.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement?.textContent?.trim()).toBe(
      'Nome completo é obrigatório'
    );
  });

  it('should display minlength error for fullName', () => {
    testFormGroup.get('fullName')?.setValue('A');
    testFormGroup.get('fullName')?.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement?.textContent?.trim()).toBe(
      'Nome deve ter pelo menos 2 caracteres'
    );
  });

  it('should display required error for dateOfBirth', () => {
    testFormGroup.get('dateOfBirth')?.markAsTouched();
    fixture.detectChanges();

    const errorElements = fixture.nativeElement.querySelectorAll('mat-error');
    const dateError = Array.from(errorElements).find(
      (el: any) => el.textContent?.trim() === 'Data de nascimento é obrigatória'
    );
    expect(dateError).toBeTruthy();
  });

  it('should display required error for cpf', () => {
    testFormGroup.get('cpf')?.markAsTouched();
    fixture.detectChanges();

    const errorElements = fixture.nativeElement.querySelectorAll('mat-error');
    const cpfError = Array.from(errorElements).find(
      (el: any) => el.textContent?.trim() === 'CPF é obrigatório'
    );
    expect(cpfError).toBeTruthy();
  });

  it('should display required error for phoneNumber', () => {
    testFormGroup.get('phoneNumber')?.markAsTouched();
    fixture.detectChanges();

    const errorElements = fixture.nativeElement.querySelectorAll('mat-error');
    const phoneError = Array.from(errorElements).find(
      (el: any) => el.textContent?.trim() === 'Número de telefone é obrigatório'
    );
    expect(phoneError).toBeTruthy();
  });

  it('should accept valid form data', () => {
    testFormGroup.patchValue({
      fullName: 'João Silva',
      dateOfBirth: new Date('1990-01-01'),
      cpf: '123.456.789-09',
      phoneNumber: '(11) 99999-9999',
    });

    expect(testFormGroup.valid).toBeTruthy();
  });
});
