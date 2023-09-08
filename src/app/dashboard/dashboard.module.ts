import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppTableComponent } from './app-table/app-table.component';
import { DietaFormComponent } from './dieta-form/dieta-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryTableComponent } from './category-table/category-table.component';

@NgModule({
  declarations: [AppHomeComponent, AppTableComponent, DietaFormComponent, CategoryTableComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [AppHomeComponent, AppTableComponent],
})
export class DashboardModule {}
