import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './app-home/app-home.component';
import { DietaFormComponent } from './dieta-form/dieta-form.component';
import { AppTableComponent } from './app-table/app-table.component';
import { CategoryTableComponent } from './category-table/category-table.component';

const routes: Routes = [
  {
    path: '',
    component: AppHomeComponent,
    children: [
      { path: '', redirectTo: 'dieta', pathMatch: 'full' },
      { path: 'novo', component: DietaFormComponent },
      { path: 'dieta', component: AppTableComponent },
      { path: 'categoria/:categoria', component: CategoryTableComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
