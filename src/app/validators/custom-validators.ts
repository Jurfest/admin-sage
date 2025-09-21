import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static cpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const cpf = control.value.replace(/\D/g, '');
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return { cpf: true };

      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
      let digit = 11 - (sum % 11);
      if (digit > 9) digit = 0;
      if (parseInt(cpf[9]) !== digit) return { cpf: true };

      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
      digit = 11 - (sum % 11);
      if (digit > 9) digit = 0;
      if (parseInt(cpf[10]) !== digit) return { cpf: true };

      return null;
    };
  }

  static phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const phone = control.value.replace(/\D/g, '');
      return phone.length >= 10 && phone.length <= 11 ? null : { phone: true };
    };
  }
}
