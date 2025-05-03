import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-dropdown',
  imports: [],
  templateUrl: './filter-dropdown.component.html',
})
export class FilterDropdownComponent {
  category = input<string>();
  private readonly router = inject(Router);

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;

    this.router.navigate(['/products'], {
      queryParams: { category: input.value },
      queryParamsHandling: 'merge',
    });
  }
}
