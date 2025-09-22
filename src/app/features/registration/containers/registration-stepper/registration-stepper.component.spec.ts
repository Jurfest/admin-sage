import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { RegistrationStepperComponent } from './registration-stepper.component';
import { RegistrationFormService } from '../../services/registration-form.service';
import { PersonalInfoStepComponent } from '../../components/personal-info-step/personal-info-step.component';
import { ResidentialInfoStepComponent } from '../../components/residential-info-step/residential-info-step.component';
import { ProfessionalInfoStepComponent } from '../../components/professional-info-step/professional-info-step.component';

// Mock Router
class RouterMock {
  navigate = jest.fn();
}

describe('RegistrationStepperComponent', () => {
  let component: RegistrationStepperComponent;
  let router: RouterMock;
  let formServiceMock: RegistrationFormService;

  beforeEach(() => {
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

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatStepperModule,
        MatButtonModule,
        PersonalInfoStepComponent,
        ResidentialInfoStepComponent,
        ProfessionalInfoStepComponent,
      ],
      providers: [
        { provide: Router, useClass: RouterMock },
        { provide: RegistrationFormService, useValue: formServiceMock },
      ],
    });

    router = TestBed.inject(Router) as any;
    component = TestBed.runInInjectionContext(
      () => new RegistrationStepperComponent()
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to summary when navigateToSummary is called', () => {
    component.navigateToSummary();
    expect(router.navigate).toHaveBeenCalledWith(['/registration/summary']);
  });

  it('should disable summary button if form is invalid', () => {
    formServiceMock.registrationForm.controls.professional
      .get('salary')
      ?.setValue(null);
    expect(formServiceMock.registrationForm.valid).toBe(false);
  });
});
