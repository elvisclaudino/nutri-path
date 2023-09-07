import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { States } from '../models/states';
import { Cities } from '../models/cities';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private httpClient: HttpClient) {}

  getStates() {
    return this.httpClient.get<States[]>('assets/data/states.json');
  }

  getCities(stateId: number) {
    return this.httpClient
      .get<Cities[]>('assets/data/cities.json')
      .pipe(
        map((cities: Cities[]) => cities.filter((c) => c.estado == stateId))
      );
  }
}
