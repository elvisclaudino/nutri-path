import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Observable,
  distinctUntilChanged,
  empty,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

import { FormValidators } from 'src/app/shared/form-validators';
import { Cities } from 'src/app/shared/models/cities';
import { States } from 'src/app/shared/models/states';
import { CepConsultService } from 'src/app/shared/services/cep-consult.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { RegisterService } from '../services/register.service';

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
    private http: HttpClient,
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
    let valueSumbit = Object.assign({}, this.form.value);
    this.registerService.userRegister(valueSumbit).subscribe(
      (res) => {
        console.log('Usuário cadastrado', res);
      },
      (error) => {
        console.log(error);
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
