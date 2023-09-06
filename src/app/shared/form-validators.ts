import { FormControl, FormGroup } from '@angular/forms';

export class FormValidators {
  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const cepPattern = /^[0-9]{5}[0-9]{3}$/;
      return cepPattern.test(cep) ? null : { invalidCep: true };
    }

    return null;
  }

  static passwordValidator(control: FormControl) {
    const password = control.value;
    if (password && password !== '') {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return passwordPattern.test(password) ? null : { invalidPassword: true };
    }

    return null;
  }

  static equalsTo(otherField: string) {
    const validator = (control: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!control.root || !(<FormGroup>control.root).controls) {
        return null;
      }

      const field = (<FormGroup>control.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== control.value) {
        return { equalsTo: otherField };
      }

      return null;
    };

    return validator;
  }
}
