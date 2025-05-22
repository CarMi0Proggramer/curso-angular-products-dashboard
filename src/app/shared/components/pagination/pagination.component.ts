import { Component, computed, inject, input } from '@angular/core';
import { MAX_VISIBLE_PAGES } from './constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  private router = inject(Router);

  currentPage = input.required<number>();
  totalPages = input.required<number>();
  totalItems = input.required<number>();
  redirectTo = input.required<string>();
  perPage = input.required<number>();

  protected pages = computed<number[]>(() => {
    const pages: number[] = [];

    const currentBlock = Math.ceil(this.currentPage() / MAX_VISIBLE_PAGES);
    const finalBlockPage = Math.min(
      this.totalPages(),
      currentBlock * MAX_VISIBLE_PAGES
    );

    const startPage = Math.max(1, finalBlockPage - MAX_VISIBLE_PAGES + 1);

    for (let i = startPage; i <= finalBlockPage; i++) {
      pages.push(i);
    }

    return pages;
  });

  protected showingText = computed(() => {
    const start = (this.currentPage() - 1) * this.perPage() + 1;
    const end = Math.min(
      this.currentPage() * this.perPage(),
      this.totalItems()
    );

    return `${start}-${end}`;
  });

  protected loadPage(page: number) {
    if (page == 0 || page > this.totalPages()) {
      return;
    }

    this.router.navigate([this.redirectTo()], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
