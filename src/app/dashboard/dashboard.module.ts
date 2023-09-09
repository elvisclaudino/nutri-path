import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { FormDeactivateGuard } from '../guards/form-deactivate.guard';

import { AppHomeComponent } from './app-home/app-home.component';
import { AppTableComponent } from './app-table/app-table.component';
import { DietaFormComponent } from './dieta-form/dieta-form.component';
import { CategoryTableComponent } from './category-table/category-table.component';

@NgModule({
  declarations: [
    AppHomeComponent,
    AppTableComponent,
    DietaFormComponent,
    CategoryTableComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [AppHomeComponent, AppTableComponent],
  providers: [FormDeactivateGuard],
})
export class DashboardModule {}
