import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFoodComponent } from './search-food/search-food.component';

const routes: Routes = [
  {
    path: '',
    component: SearchFoodComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
