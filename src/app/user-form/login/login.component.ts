import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormBaseComponent {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submit() {}
}
