import { AbstractControl } from '@angular/forms';

import { CustomValidators } from './custom-validators.legacy';

describe('Custom Validators - Legacy', () => {
  const createControl = (value: any): AbstractControl =>
    ({ value } as AbstractControl);

  describe('cpf', () => {
    it('should return null for valid CPF', () => {
      const control = createControl('529.982.247-25'); // valid CPF
      const result = CustomValidators.cpf()(control);
      expect(result).toBeNull();
    });

    it('should return error for invalid CPF', () => {
      const control = createControl('123.456.789-00');
      const result = CustomValidators.cpf()(control);
      expect(result).toEqual({ cpf: true });
    });

    it('should return null for empty value', () => {
      const control = createControl('');
      const result = CustomValidators.cpf()(control);
      expect(result).toBeNull();
    });

    it('should return error for repeated digits', () => {
      const control = createControl('111.111.111-11');
      const result = CustomValidators.cpf()(control);
      expect(result).toEqual({ cpf: true });
    });
  });

  describe('phone', () => {
    it('should validate residential phone (10 digits)', () => {
      const control = createControl('(11) 2345-6789');
      const result = CustomValidators.phone()(control);
      expect(result).toBeNull();
    });

    it('should validate mobile phone (11 digits)', () => {
      const control = createControl('(11) 91234-5678');
      const result = CustomValidators.phone()(control);
      expect(result).toBeNull();
    });

    it('should return error for invalid phone', () => {
      const control = createControl('1234');
      const result = CustomValidators.phone()(control);
      expect(result).toEqual({ phone: true });
    });

    it('should return null for empty value', () => {
      const control = createControl('');
      const result = CustomValidators.phone()(control);
      expect(result).toBeNull();
    });
  });

  describe('phone additional edge cases', () => {
    it('should return error for residential phone with wrong first digit', () => {
      const control = createControl('(11) 6123-4567'); // starts with 6 (residential must start 2-5)
      expect(CustomValidators.phone()(control)).toEqual({ phone: true });
    });

    it('should return error for mobile phone missing 9 after area code', () => {
      const control = createControl('(11) 81234-5678'); // should start with 9
      expect(CustomValidators.phone()(control)).toEqual({ phone: true });
    });

    it('should return error for phone longer than 11 digits', () => {
      const control = createControl('(11) 91234-56789'); // 12 digits
      expect(CustomValidators.phone()(control)).toEqual({ phone: true });
    });

    it('should return error for phone shorter than 10 digits', () => {
      const control = createControl('(11) 1234-567'); // 9 digits
      expect(CustomValidators.phone()(control)).toEqual({ phone: true });
    });
  });
});
