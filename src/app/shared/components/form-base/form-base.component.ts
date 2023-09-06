import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-base',
  template: '<div></div>',
})
export abstract class FormBaseComponent {
  form!: FormGroup;

  abstract submit(): any;

  onSubmit() {
    if (this.form.valid) {
      this.onSubmit();
    } else {
      this.verifyFormValidations(this.form);
    }
  }

  verifyFormValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo: any) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();

      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verifyFormValidations(controle);
      }
    });
  }

  resetar() {
    this.form.reset();
  }

  verifyValidTouched(campo: any) {
    return (
      !this.form.get(campo)?.valid &&
      (!!this.form.get(campo)?.touched || this.form.get(campo)?.dirty)
    );
  }

  verifyRequired(campo: any) {
    return (
      this.form.get(campo)?.hasError('required') &&
      (!!this.form.get(campo)?.touched || this.form.get(campo)?.dirty)
    );
  }
}
