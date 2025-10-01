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
      // Brazilian phone: 10 digits (residential) or 11 digits (mobile)
      // Format: (XX) XXXX-XXXX or (XX) 9XXXX-XXXX
      if (phone.length === 10) {
        // Residential: area code + 8 digits
        return /^\d{2}[2-5]\d{7}$/.test(phone) ? null : { phone: true };
      }
      if (phone.length === 11) {
        // Mobile: area code + 9 + 8 digits
        return /^\d{2}9\d{8}$/.test(phone) ? null : { phone: true };
      }
      return { phone: true };
    };
  }
}
