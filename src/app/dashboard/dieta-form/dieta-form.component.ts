import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Categories } from 'src/app/shared/models/categories';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { AuthService } from './../../shared/services/auth.service';

import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

import { DietService } from '../services/diet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dieta-form',
  templateUrl: './dieta-form.component.html',
  styleUrls: ['./dieta-form.component.scss'],
})
export class DietaFormComponent extends FormBaseComponent {
  categories!: Categories[];
  submitted = false;
  userId!: number | null;
  foodId!: number | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownService: DropdownService,
    private authService: AuthService,
    private dietService: DietService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.dropdownService
      .getCategories()
      .subscribe((data) => (this.categories = data));

    const food = this.route.snapshot.data['food'];

    this.form = this.formBuilder.group({
      foodId: [food.id],
      name: [food.name, [Validators.required]],
      quantity: [food.quantity, [Validators.required]],
      kcal: [food.kcal, [Validators.required]],
      category: [food.category, [Validators.required]],
      time: [food.time, [Validators.required]],
      userId: [this.userId],
    });
  }

  submit() {
    this.submitted = true;
    let titleSuccess = 'Alimento adicionado!';
    let descSuccess = 'Alimento adicionado a dieta!';

    if (this.form.value.foodId) {
      titleSuccess = 'Alimento atualizado!';
      descSuccess = 'Alimento atualizado na dieta!';
    }

    this.dietService.save(this.form.value).subscribe(
      (res) => {
        this.form.reset();
        Swal.fire(titleSuccess, descSuccess, 'success');
        this.router.navigate(['/dashboard/dieta']);
      },
      (error) => {
        Swal.fire('Algo deu errado!', 'Tente novamente!', 'error');
      }
    );
  }
}
