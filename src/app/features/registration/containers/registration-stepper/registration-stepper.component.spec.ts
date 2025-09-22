import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RegistrationStepperComponent } from './registration-stepper.component';
import { RegistrationFormService } from '../../services/registration-form.service';
import { PersonalInfoStepComponent } from '../../components/personal-info-step/personal-info-step.component';
import { ResidentialInfoStepComponent } from '../../components/residential-info-step/residential-info-step.component';
import { ProfessionalInfoStepComponent } from '../../components/professional-info-step/professional-info-step.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegistrationStepperComponent', () => {
  let component: RegistrationStepperComponent;
  let fixture: ComponentFixture<RegistrationStepperComponent>;
  let routerMock: { navigate: jest.Mock };
  let formServiceMock: RegistrationFormService;

  beforeEach(async () => {
    routerMock = { navigate: jest.fn() };

    formServiceMock = {
      registrationForm: new FormGroup({
        personal: new FormGroup({
          fullName: new FormControl('', Validators.required),
          dateOfBirth: new FormControl('', Validators.required),
          cpf: new FormControl('', Validators.required),
          phoneNumber: new FormControl('', Validators.required),
        }),
        residential: new FormGroup({
          zipCode: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          neighborhood: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
        }),
        professional: new FormGroup({
          occupation: new FormControl('', Validators.required),
          company: new FormControl('', Validators.required),
          salary: new FormControl('', Validators.required),
        }),
      }),
      personalFormGroup: new FormGroup({
        fullName: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
        cpf: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
      }),
      residentialFormGroup: new FormGroup({
        zipCode: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        neighborhood: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
      }),
      professionalFormGroup: new FormGroup({
        occupation: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        salary: new FormControl('', Validators.required),
      }),
    } as unknown as RegistrationFormService;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatStepperModule,
        MatButtonModule,
        NoopAnimationsModule,
        PersonalInfoStepComponent,
        ResidentialInfoStepComponent,
        ProfessionalInfoStepComponent,
      ],
      providers: [
        { provide: RegistrationFormService, useValue: formServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to summary when form is valid', () => {
    // Fill all required fields to make form valid
    formServiceMock.personalFormGroup.setValue({
      fullName: 'Diego',
      dateOfBirth: '1990-01-01',
    });
    formServiceMock.residentialFormGroup.setValue({
      zipCode: '12345-678',
      city: 'São Paulo',
    });
    formServiceMock.professionalFormGroup.setValue({
      occupation: 'Developer',
    });

    fixture.detectChanges();

    component.navigateToSummary();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/registration/summary']);
  });
});
