import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '../../../validators/custom-validators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormLegacyService {
  private fb = inject(FormBuilder);

  registrationForm = this.fb.group({
    personal: this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      cpf: ['', [Validators.required, CustomValidators.cpf()]],
      phoneNumber: ['', [Validators.required, CustomValidators.phone()]],
    }),
    residential: this.fb.group({
      zipCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)],
      ],
      address: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    }),
    professional: this.fb.group({
      occupation: ['', Validators.required],
      company: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    }),
  });

  get personalFormGroup() {
    return this.registrationForm.controls.personal as FormGroup;
  }

  get residentialFormGroup() {
    return this.registrationForm.controls.residential as FormGroup;
  }

  get professionalFormGroup() {
    return this.registrationForm.controls.professional as FormGroup;
  }
}
