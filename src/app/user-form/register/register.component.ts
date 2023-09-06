import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, empty, map, switchMap, tap } from 'rxjs';

import { FormValidators } from 'src/app/shared/form-validators';
import { Cities } from 'src/app/shared/models/cities';
import { States } from 'src/app/shared/models/states';
import { CepConsultService } from 'src/app/shared/services/cep-consult.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;

  states!: States[];
  cities!: Cities[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepConsultService: CepConsultService
  ) {}

  ngOnInit(): void {
    this.dropdownService.getStates().subscribe((data) => (this.states = data));

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
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
        tap((v) => console.log('valor do cep: ', v)),
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

  populateForm(data: any) {
    this.form.patchValue({
      cep: data.cep,
      state: data.uf,
      city: data.localidade,
    });
  }

  aplicaCssErro(campo: string) {
    return {
      'is-valid': this.form.get(campo)?.valid && this.form.get(campo)?.touched,
      'is-invalid':
        !this.form.get(campo)?.valid && this.form.get(campo)?.touched,
    };
  }
}
