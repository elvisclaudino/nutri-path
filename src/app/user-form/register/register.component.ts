import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged, empty, map, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { CepConsultService } from 'src/app/shared/services/cep-consult.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { RegisterService } from '../services/register.service';

import { FormValidators } from 'src/app/shared/form-validators';
import { Cities } from 'src/app/shared/models/cities';
import { States } from 'src/app/shared/models/states';

import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormBaseComponent {
  states!: States[];
  cities!: Cities[];

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private cepConsultService: CepConsultService,
    private registerService: RegisterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dropdownService.getStates().subscribe((data) => (this.states = data));

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.email],
        [this.verifyEmail.bind(this)],
      ],
      password: [null, [Validators.required, FormValidators.passwordValidator]],
      confirmPassword: [null, [FormValidators.equalsTo('password')]],

      age: [null, [Validators.required, Validators.min(18)]],
      weigth: [null, [Validators.required, Validators.min(20)]],
      heigth: [null, [Validators.required, Validators.min(30)]],

      cep: [null, [Validators.required, FormValidators.cepValidator]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });

    this.form
      .get('cep')
      ?.statusChanges.pipe(
        distinctUntilChanged(),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepConsultService.cepConsult(this.form.get('cep')?.value)
            : empty()
        )
      )
      .subscribe((data: any) => this.populateForm(data));

    this.form
      .get('state')
      ?.valueChanges.pipe(
        map((state) => this.states.filter((e) => e.sigla === state)),
        map((states) => (states && states.length > 0 ? states[0].id : empty())),
        switchMap((stateId: any) => this.dropdownService.getCities(stateId))
      )
      .subscribe((data) => (this.cities = data));
  }

  submit() {
    let valueSubmit = Object.assign({}, this.form.value);
    this.registerService.userRegister(valueSubmit).subscribe(
      (res) => {
        Swal.fire('Conta cadastrada!', 'Realize seu login...', 'success');
      },
      (error) => {
        Swal.fire('Algo deu errado!', 'Tente novamente!', 'error');
      }
    );
  }

  populateForm(data: any) {
    this.form.patchValue({
      cep: data.cep,
      state: data.uf,
      city: data.localidade,
    });
  }

  resetForm() {
    this.form.patchValue({
      state: null,
      city: null,
    });
  }

  verifyEmail(formControl: FormControl) {
    return this.registerService
      .verifyEmail(formControl.value)
      .pipe(map((emailExists) => (emailExists ? { emailExists: true } : null)));
  }
}
