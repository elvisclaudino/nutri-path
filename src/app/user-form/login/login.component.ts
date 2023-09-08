import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormBaseComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.loginService
      .userLogin(this.form.value.email, this.form.value.password)
      .subscribe(
        (user) => {
          if (user) {
            this.authService.setUserId(user.id);
            Swal.fire(
              'Login realizado!',
              `Olá ${user.name} ${user.lastName}`,
              'success'
            );
            this.router.navigate(['/dashboard']);
          } else {
            Swal.fire(
              'Erro ao fazer login!',
              `Email ou senha incorretos! Tente novamente.`,
              'error'
            );
          }
        },
        (error) => {
          console.log('Erro ao fazer login:', error);
          Swal.fire(
            'Erro ao fazer login!',
            `Tente novamente mais tarde.`,
            'error'
          );
        }
      );
  }
}
