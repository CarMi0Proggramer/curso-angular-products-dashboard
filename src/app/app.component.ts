import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { UpdateProductModalComponent } from './update-product-modal/update-product-modal.component';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { ProductsService } from './core/services/products.service';
import { Product } from './core/interfaces/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CreateProductModalComponent,
    UpdateProductModalComponent,
    ConfirmDeleteModalComponent,
    FilterDropdownComponent,
    CurrencyPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  protected products = signal<Product[]>([]);

  /*
  TODO: Inicializar los eventos para mostrar los componentes interactivos usando flowbite

  * Se debe elegir el momento del ciclo de vida adecuado
  */
  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products.set(products);

      setTimeout(() => {
        import('flowbite').then((flowbite) => {
          flowbite.initFlowbite();
        });
      }, 200);
    });
  }

  onProductCreated(product: Product) {
    this.products.update((products) => [product, ...products]);
  }
}
