import { Injectable, signal } from '@angular/core';
import {
  apply,
  customError,
  form,
  min,
  minLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';

import { CustomValidators } from '../../../validators/custom-validators';
import { Registration } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  // --- Validation Schemas --- Schema provide validation rules (and structure) for each form
  // and goes with the form definition, after the signal with initial values. Schema
  // has a path as a first argument, to access each field and apply validation rules.

  private fullNameSchema = schema<string>((path) => {
    required(path, { message: 'Nome completo é obrigatório' });
    minLength(path, 2, { message: 'Nome deve ter pelo menos 2 caracteres' });
  });

  private personalSchema = schema<Registration['personal']>((path) => {
    apply(path.fullName, this.fullNameSchema);

    required(path.dateOfBirth);

    required(path.cpf);
    validate(path.cpf, CustomValidators.cpf());

    required(path.phoneNumber);
    validate(path.phoneNumber, CustomValidators.phone());
  });

  private residentialSchema = schema<Registration['residential']>((path) => {
    required(path.zipCode);
    validate(path.zipCode, (ctx) => {
      const value = ctx.value();
      return /^\d{5}-?\d{3}$/.test(value)
        ? null
        : customError({ kind: 'invalid_zip', message: 'Invalid ZIP format' });
    });

    required(path.address);
    required(path.neighborhood);
    required(path.city);
    required(path.state);
  });

  private professionalSchema = schema<Registration['professional']>((path) => {
    required(path.occupation);
    required(path.company);
    required(path.salary);
    min(path.salary, 0);
  });

  private registrationSchema = schema<Registration>((path) => {
    apply(path.personal, this.personalSchema);
    apply(path.residential, this.residentialSchema);
    apply(path.professional, this.professionalSchema);
  });

  // --- Form instance ---
  readonly registrationForm = form<Registration>(
    signal<Registration>({
      personal: {
        fullName: '',
        dateOfBirth: '',
        cpf: '',
        phoneNumber: '',
      },
      residential: {
        zipCode: '',
        address: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      professional: {
        occupation: '',
        company: '',
        salary: 0,
      },
    }),
    this.registrationSchema
  );
}
