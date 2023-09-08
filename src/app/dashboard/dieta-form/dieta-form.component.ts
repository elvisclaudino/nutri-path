import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Categories } from 'src/app/shared/models/categories';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { AuthService } from './../../shared/services/auth.service';

import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

import { DietService } from '../services/diet.service';

@Component({
  selector: 'app-dieta-form',
  templateUrl: './dieta-form.component.html',
  styleUrls: ['./dieta-form.component.scss'],
})
export class DietaFormComponent extends FormBaseComponent {
  categories!: Categories[];
  userId!: number | null;

  constructor(
    private formBuilder: FormBuilder,
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

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      kcal: [null, [Validators.required]],
      category: [null, [Validators.required]],
      time: [null, [Validators.required]],
      userId: [this.userId],
    });
  }

  submit() {
    this.dietService.addFoodToDiet(this.form.value).subscribe(
      (res) => {
        Swal.fire(
          'Alimento adicionado!',
          'Alimento adicionado a dieta!',
          'success'
        );
      },
      (error) => {
        Swal.fire('Algo deu errado!', 'Tente novamente!', 'error');
      }
    );
  }
}
