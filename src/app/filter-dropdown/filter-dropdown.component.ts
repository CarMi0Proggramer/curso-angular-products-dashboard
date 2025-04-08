import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-dropdown',
  imports: [],
  templateUrl: './filter-dropdown.component.html',
})
export class FilterDropdownComponent {
  categories = input.required<string[]>();
  private readonly router = inject(Router);

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let categories = [...this.categories()];

    if (input.checked) {
      categories.push(input.value);
    } else {
      categories = categories.filter((category) => category != input.value);
    }

    this.router.navigate(['/products'], {
      queryParams: { categories },
      queryParamsHandling: 'merge',
    });
  }
}
