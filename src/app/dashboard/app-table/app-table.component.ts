import { Component } from '@angular/core';

import { DietService } from '../services/diet.service';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
})
export class AppTableComponent {
  diet!: any[];
  emptyDiet: boolean = false;

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    this.dietService.getDietSortedByTime().subscribe((data) => {
      this.diet = data;

      if (this.diet.length === 0) {
        this.emptyDiet = true;
      }
    });
  }
}
