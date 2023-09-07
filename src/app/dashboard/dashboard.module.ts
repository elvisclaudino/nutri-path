import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppTableComponent } from './app-table/app-table.component';

@NgModule({
  declarations: [AppHomeComponent, AppTableComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [AppHomeComponent, AppTableComponent],
})
export class DashboardModule {}
