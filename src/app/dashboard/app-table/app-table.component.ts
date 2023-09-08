import { Component } from '@angular/core';

import { DietService } from 'src/app/user-form/services/diet.service';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
})
export class AppTableComponent {
  diet!: any[];

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    this.dietService.getDietSortedByTime().subscribe((data) => {
      this.diet = data;
    });
  }
}
