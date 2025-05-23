import { CurrencyPipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
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
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  protected products = signal<Product[]>([]);
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

      const timeoutId = setTimeout(() => {
        this.productsService
          .getAll(filters)
          .subscribe(({ data, ...paginationMetadata }) => {
            this.products.set(data);
            this.paginationMetadata.set(paginationMetadata);
          });
      }, 500);

      onCleanup(() => {
        clearTimeout(timeoutId);
      });
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      import('flowbite').then((flowbite) => {
        flowbite.initFlowbite();
      });
    }, 200);
  }

  search(searchTerm: string) {
    this.router.navigate(['/products'], {
      queryParams: { searchTerm },
      queryParamsHandling: 'merge',
    });
  }

  onProductCreated(product: Product) {
    this.products.update((products) => [product, ...products]);
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
    this.products.update((products) =>
      products.filter((p) => p.id !== product.id)
    );
  }
}
