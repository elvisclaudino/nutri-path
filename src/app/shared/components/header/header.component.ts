import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../user-form/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .isLoggedIn$()
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
  }

  shouldShowLoginButton(path: string): boolean {
    const currentRoute = this.router.url;

    return currentRoute !== path;
  }

  logout() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja mesmo sair?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Você saiu!', 'Voltando a tela de login.', 'success');
        this.authService.logout();
        this.router.navigate(['/home/login']);
      }
    });
  }
}
