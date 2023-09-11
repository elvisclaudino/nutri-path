import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Output() searchTextChanged = new EventEmitter<string>();
  searchField = new FormControl();

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(
        startWith(''),
        map((value) => value.trim()),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.searchTextChanged.emit(searchTerm);
      });
  }
}
