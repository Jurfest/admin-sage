import { AbstractControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
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
});
