import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchFoodComponent } from './search-food/search-food.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [SearchFoodComponent, SearchInputComponent],
  imports: [CommonModule, ReactiveFormsModule, SearchRoutingModule],
})
export class SearchModule {}
