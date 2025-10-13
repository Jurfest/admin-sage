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
  readonly minDate = new Date(1900, 0, 1);
  readonly maxDate = new Date();

  // --- Validation Schemas --- Schema provide validation rules (and structure) for each form
  // and goes with the form definition, after the signal with initial values. Schema
  // has a path as a first argument, to access each field and apply validation rules.

  private fullNameSchema = schema<string>((path) => {
    required(path, { message: 'Nome completo é obrigatório' });
    minLength(path, 2, { message: 'Nome deve ter pelo menos 2 caracteres' });
  });

  private personalSchema = schema<Registration['personal']>((path) => {
    apply(path.fullName, this.fullNameSchema);

    required(path.dateOfBirth, { message: 'Data de nascimento é obrigatória' });
    validate(path.dateOfBirth, (ctx) => {
      const value = ctx.value();
      if (!value) return null;

      const date = new Date(value);

      if (date < this.minDate) {
        return customError({
          kind: 'matDatepickerMin',
          message: 'Data deve ser posterior a 01/01/1900',
        });
      }
      if (date > this.maxDate) {
        return customError({
          kind: 'matDatepickerMax',
          message: 'Data não pode ser futura',
        });
      }
      return null;
    });

    required(path.cpf, { message: 'CPF é obrigatório' });
    validate(path.cpf, CustomValidators.cpf());

    required(path.phoneNumber, { message: 'Número de telefone é obrigatório' });
    validate(path.phoneNumber, CustomValidators.phone());
  });

  private residentialSchema = schema<Registration['residential']>((path) => {
    required(path.zipCode, { message: 'CEP é obrigatório' });
    validate(path.zipCode, (ctx) => {
      const value = ctx.value();
      return /^\d{5}-?\d{3}$/.test(value)
        ? null
        : customError({ kind: 'invalid_zip', message: 'Formato do CEP inválido' });
    });

    required(path.address, { message: 'Endereço é obrigatório' });
    required(path.neighborhood, { message: 'Bairro é obrigatório' });
    required(path.city, { message: 'Cidade é obrigatória' });
    required(path.state, { message: 'Estado é obrigatório' });
  });

  private professionalSchema = schema<Registration['professional']>((path) => {
    required(path.occupation, { message: 'Profissão é obrigatória' });
    required(path.company, { message: 'Empresa é obrigatória' });
    required(path.salary, { message: 'Salário é obrigatório' });
    min(path.salary, 0.01, { message: 'Salário deve ser maior que 0' });
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
