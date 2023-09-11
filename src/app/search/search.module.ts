import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchFoodComponent } from './search-food/search-food.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchFoodComponent],
  imports: [CommonModule, ReactiveFormsModule, SearchRoutingModule],
})
export class SearchModule {}
