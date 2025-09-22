import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { ProfessionalInfoStepComponent } from './professional-info-step.component';
import { OccupationService } from '../../services/occupation.service';
import { signal } from '@angular/core';
import { Occupation } from '../../models/registration.models';

describe('ProfessionalInfoStepComponent', () => {
  let fixture: ComponentFixture<ProfessionalInfoStepComponent>;
  let mockFormGroup: ReturnType<FormBuilder['group']>;
  let mockOccupationService: Partial<OccupationService>;

  beforeEach(async () => {
    const fb = new FormBuilder();
    mockFormGroup = fb.group({
      occupation: ['', Validators.required],
      company: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(1)]],
    });

    mockOccupationService = {
      occupations: signal<Occupation[]>([
        { id: '1', name: 'Engenheiro' },
        { id: '2', name: 'Professor' },
      ]),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProfessionalInfoStepComponent],
      providers: [
        { provide: OccupationService, useValue: mockOccupationService },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalInfoStepComponent);

    // 🚀 Novo jeito para Input Signals
    fixture.componentRef.setInput('formGroup', mockFormGroup);

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve mostrar erro quando campo "empresa" for requerido', () => {
    mockFormGroup.get('company')?.markAsTouched();
    mockFormGroup.get('company')?.setValue('');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('mat-error');
    expect(error?.textContent).toContain('Empresa é obrigatória');
  });
});
