import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ProductsService } from '@core/services/products.service';
import { Router } from '@angular/router';
import { Product } from '@shared/interfaces/product';
import {
  CreateProductModalComponent,
  UpdateProductModalComponent,
  ConfirmDeleteModalComponent,
  FilterDropdownComponent,
} from './components';
import { MAX_PRODUCTS_PER_PAGE } from './constants';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationMetadata } from '@shared/interfaces/pagination-metadata';
import { initFlowbite } from '@shared/helpers/init-flowbite';

@Component({
  selector: 'app-products',
  imports: [
    CreateProductModalComponent,
    UpdateProductModalComponent,
    ConfirmDeleteModalComponent,
    FilterDropdownComponent,
    CurrencyPipe,
    PaginationComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  protected products = signal<Product[]>([]);
  private readonly products$ = toObservable(this.products);
  protected paginationMetadata = signal<PaginationMetadata | null>(null);
  protected perPage = MAX_PRODUCTS_PER_PAGE;

  category = input<string>();
  searchTerm = input<string>();
  page = input.required({
    transform: (val: string | undefined) => (val ? Number(val) : 1),
  });

  constructor() {
    effect((onCleanup) => {
      const filters = {
        category: this.category(),
        searchTerm: this.searchTerm(),
        page: this.page(),
        perPage: this.perPage,
      };

      const timeoutId = setTimeout(() => this.loadProducts(filters), 300);

      onCleanup(() => {
        clearTimeout(timeoutId);
      });
    });

    this.products$.subscribe(() => initFlowbite());
  }

  search(searchTerm: string) {
    this.router.navigate(['/products'], {
      queryParams: { searchTerm },
      queryParamsHandling: 'merge',
    });
  }

  onProductCreated(product: Product) {
    this.paginationMetadata.update((metadata) => ({
      ...metadata!,
      items: metadata!.items + 1,
      pages: Math.ceil((metadata!.items + 1) / this.perPage),
    }));

    if (this.products().length < 5) {
      this.products.update((products) => [product, ...products]);
    }
  }

  onProductUpdated(updatedProduct: Product) {
    this.products.update((products) => {
      const index = products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      products[index] = updatedProduct;
      return products;
    });
  }

  onProductDeleted(product: Product) {
    const page =
      this.products().length === 1 ? Math.max(1, this.page() - 1) : this.page();

    this.loadProducts({
      page,
      perPage: this.perPage,
      category: this.category(),
      searchTerm: this.searchTerm(),
    });
  }

  private loadProducts(filters: {
    category?: string;
    searchTerm?: string;
    page: number;
    perPage: number;
  }) {
    this.productsService
      .getAll(filters)
      .subscribe(({ data, ...paginationMetadata }) => {
        this.products.set(data);
        this.paginationMetadata.set(paginationMetadata);
      });
  }
}
