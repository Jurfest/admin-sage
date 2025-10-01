import { customError, FieldValidator } from '@angular/forms/signals';

export class CustomValidators {
  static cpf(): FieldValidator<string> {
    return (ctx) => {
      const value = ctx.value();
      if (!value) return null;

      const cpf = value.replace(/\D/g, '');
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return customError({ kind: 'cpf', message: 'Invalid CPF' });
      }

      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
      let digit = 11 - (sum % 11);
      if (digit > 9) digit = 0;
      if (parseInt(cpf[9]) !== digit) {
        return customError({ kind: 'cpf', message: 'Invalid CPF' });
      }

      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
      digit = 11 - (sum % 11);
      if (digit > 9) digit = 0;
      if (parseInt(cpf[10]) !== digit) {
        return customError({ kind: 'cpf', message: 'Invalid CPF' });
      }

      return null;
    };
  }

  static phone(): FieldValidator<string> {
    return (ctx) => {
      const value = ctx.value();
      if (!value) return null;

      const phone = value.replace(/\D/g, '');

      if (phone.length === 10) {
        return /^\d{2}[2-5]\d{7}$/.test(phone)
          ? null
          : customError({ kind: 'phone', message: 'Invalid phone number' });
      }

      if (phone.length === 11) {
        return /^\d{2}9\d{8}$/.test(phone)
          ? null
          : customError({ kind: 'phone', message: 'Invalid phone number' });
      }

      return customError({ kind: 'phone', message: 'Invalid phone number' });
    };
  }
}
