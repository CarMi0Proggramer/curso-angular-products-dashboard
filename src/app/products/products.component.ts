import { CurrencyPipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/products.service';
import { CreateProductModalComponent } from '../create-product-modal/create-product-modal.component';
import { FilterDropdownComponent } from '../filter-dropdown/filter-dropdown.component';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    CreateProductModalComponent,
    UpdateProductModalComponent,
    ConfirmDeleteModalComponent,
    FilterDropdownComponent,
    CurrencyPipe,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  protected products = signal<Product[]>([]);
  category = input<string>();
  searchTerm = input<string>();

  constructor() {
    effect((onCleanup) => {
      const filters = {
        category: this.category(),
        searchTerm: this.searchTerm(),
      };

      const timeoutId = setTimeout(() => {
        this.productsService.getAll(filters).subscribe((products) => {
          this.products.set(products);
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
