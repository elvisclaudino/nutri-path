import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-base',
  template: '<div></div>',
})
export abstract class FormBaseComponent {
  form!: FormGroup;

  abstract submit(): void;

  onSubmit(): void {
    if (this.form.valid) {
      this.submit();
    } else {
      this.verifyFormValidations(this.form);
    }
  }

  verifyFormValidations(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((campo: string) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();

      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verifyFormValidations(controle);
      }
    });
  }

  resetar(): void {
    this.form.reset();
  }

  verifyValidTouched(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  verifyRequired(campo: string): boolean {
    const control = this.form.get(campo);
    return (
      !!control &&
      control.hasError('required') &&
      (control.touched || control.dirty)
    );
  }
}
