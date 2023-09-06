import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormRoutingModule } from './user-form-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [
    CommonModule,
    UserFormRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [HomeComponent, LoginComponent, RegisterComponent],
})
export class UserFormModule {}
