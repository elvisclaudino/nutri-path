import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchFoodComponent } from './search-food/search-food.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchFoodComponent, SearchInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SearchRoutingModule,
  ],
})
export class SearchModule {}
