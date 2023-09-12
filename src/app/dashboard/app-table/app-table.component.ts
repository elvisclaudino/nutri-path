import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { DietService } from '../services/diet.service';
import { Foods } from 'src/app/shared/models/foods';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
})
export class AppTableComponent {
  public emptyDiet: boolean = false;
  public selectedFood!: Foods;

  public diet!: Foods[];

  constructor(private router: Router, private dietService: DietService) {}

  ngOnInit(): void {
    this.dietService.getDietSortedByTime().subscribe((data) => {
      this.diet = data;

      if (this.diet.length === 0) {
        this.emptyDiet = true;
      }
    });
  }

  onEdit(id: number) {
    this.router.navigate(['dashboard/editar', id]);
  }

  onDelete(selectedFood: Foods) {
    this.selectedFood = selectedFood;

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja mesmo remover o item da dieta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dietService.removeFoodFromDiet(this.selectedFood.id).subscribe(
          (success) => {
            Swal.fire('Sucesso!', 'Item removido da dieta.', 'success');
            this.diet = this.diet.filter(
              (item) => item.id !== this.selectedFood.id
            );
            this.emptyDiet = this.diet.length === 0;
          },
          (error) =>
            Swal.fire('Erro!', 'Erro ao remover item da dieta.', 'error')
        );
      }
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
