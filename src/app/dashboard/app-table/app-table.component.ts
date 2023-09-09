import { Component } from '@angular/core';

import { DietService } from '../services/diet.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
})
export class AppTableComponent {
  diet!: any[];
  emptyDiet: boolean = false;

  SelectedFood!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dietService: DietService
  ) {}

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

  onDelete(selectedFood: any) {
    this.SelectedFood = selectedFood;

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
        this.dietService.removeFoodFromDiet(this.SelectedFood.id).subscribe(
          (success) =>
            Swal.fire('Sucesso!', 'Item removido da dieta.', 'success'),
          (error) =>
            Swal.fire('Erro!', 'Erro ao remover item da dieta.', 'error')
        );
      }
    });
  }
}
