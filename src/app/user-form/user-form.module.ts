import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormRoutingModule } from './user-form-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [CommonModule, UserFormRoutingModule],
  exports: [HomeComponent, LoginComponent, RegisterComponent],
})
export class UserFormModule {}
