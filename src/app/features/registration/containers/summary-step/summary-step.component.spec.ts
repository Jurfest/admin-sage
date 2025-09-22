import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import SummaryStepComponent from './summary-step.component';
import { RegistrationFormService } from '../../services/registration-form.service';

// Mock Router
class RouterMock {
  navigate = jest.fn();
}

describe('SummaryStepComponent', () => {
  let component: SummaryStepComponent;
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
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useClass: RouterMock },
        { provide: RegistrationFormService, useValue: formServiceMock },
      ],
    });

    router = TestBed.inject(Router) as any;

    component = TestBed.runInInjectionContext(() => new SummaryStepComponent());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should populate signals with initial form values', () => {
      component.ngOnInit();

      formServiceMock.registrationForm
        .get('personal.fullName')
        ?.setValue('Jane Doe');
      formServiceMock.registrationForm
        .get('residential.address')
        ?.setValue('Rua Teste');
      formServiceMock.registrationForm
        .get('professional.occupation')
        ?.setValue('Developer');

      expect(component.personalInfo().fullName).toBe('Jane Doe');
      expect(component.residentialInfo().address).toBe('Rua Teste');
      expect(component.professionalInfo().occupation).toBe('Developer');
      expect(component.isFormValid()).toBe(false);
    });

    it('should update signals on form changes', () => {
      component.ngOnInit();

      formServiceMock.registrationForm
        .get('personal.fullName')
        ?.setValue('Jane Doe');

      expect(component.personalInfo().fullName).toBe('Jane Doe');
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroy$ subject', () => {
      const spy = jest.fn();
      (component as any).destroy$.subscribe({ complete: spy });

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('formatDate', () => {
    it('should return empty string if no date', () => {
      expect(component.formatDate(null)).toBe('');
    });
  });

  describe('formatSalary', () => {
    it('should format salary as BRL currency', () => {
      const result = component.formatSalary(1234.56);
      expect(result.replace(/\s/g, ' ')).toBe('R$ 1.234,56');
    });

    it('should return empty string if no salary', () => {
      expect(component.formatSalary(null)).toBe('');
    });
  });

  describe('goBack', () => {
    it('should navigate to registration route', () => {
      component.goBack();
      expect(router.navigate).toHaveBeenCalledWith(['/registration']);
    });
  });

  describe('exportToPDF', () => {
    it('should call jsPDF methods and save PDF', async () => {
      const text = jest.fn();
      const setFontSize = jest.fn();
      const save = jest.fn();

      jest.doMock('jspdf', () => ({
        jsPDF: jest.fn().mockImplementation(() => ({
          text,
          setFontSize,
          save,
        })),
      }));

      const { default: DynamicComponent } = await import(
        './summary-step.component'
      );
      const comp = TestBed.runInInjectionContext(() => new DynamicComponent());
      comp.ngOnInit();

      await comp.exportToPDF();

      expect(setFontSize).toHaveBeenCalled();
      expect(text).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number),
        expect.any(Number)
      );
      expect(save).toHaveBeenCalledWith('formulario-cadastro.pdf');
    });
  });
});
