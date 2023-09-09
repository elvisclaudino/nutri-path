import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';
import { Categories } from 'src/app/shared/models/categories';

import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { AuthService } from './../../shared/services/auth.service';
import { DietService } from '../services/diet.service';

import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

@Component({
  selector: 'app-dieta-form',
  templateUrl: './dieta-form.component.html',
  styleUrls: ['./dieta-form.component.scss'],
})
export class DietaFormComponent
  extends FormBaseComponent
  implements IFormCanDeactivate
{
  categories!: Categories[];

  userId!: number | null;
  foodId!: number | null;

  private formChanges: boolean = false;
  private formSubmitted = false;

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

    this.form.valueChanges.subscribe(() => (this.formChanges = true));
  }

  submit() {
    this.formSubmitted = true;
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

  showButton(path: string): boolean {
    const currentRoute = this.router.url;

    return currentRoute !== path;
  }

  canChangeRoute() {
    if (this.formChanges && !this.formSubmitted) {
      return new Promise<boolean>((resolve) => {
        Swal.fire({
          title: 'Tem certeza que deseja sair dessa página?',
          text: 'Você perderá todos os dados preenchidos!',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
        }).then((result) => {
          if (result.isConfirmed) {
            this.form.reset();
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }

    return true;
  }

  canDeactivate() {
    return this.canChangeRoute();
  }
}
