import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DietService } from '../services/diet.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent {
  categoria!: string;
  diet!: any[];
  emptyDiet: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dietService: DietService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.categoria = params.get('categoria') || '';

      this.dietService
        .getDietSortByCategory(this.categoria)
        .subscribe((diet) => {
          this.diet = diet.sort((a, b) => a.time.localeCompare(b.time));

          this.emptyDiet = this.diet.length === 0;
        });
    });
  }

  calculateTotalCalories(): number {
    let totalCalories = 0;
    if (Array.isArray(this.diet)) {
      for (let food of this.diet) {
        totalCalories += parseFloat(food.kcal);
      }
    }

    return totalCalories;
  }
}
