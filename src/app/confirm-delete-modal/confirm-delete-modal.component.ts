import {
  Component,
  ElementRef,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-confirm-delete-modal',
  imports: [],
  templateUrl: './confirm-delete-modal.component.html',
})
export class ConfirmDeleteModalComponent {
  public product?: Product;
  public productDeletedEvent = output<Product>();

  private readonly productsService = inject(ProductsService);
  private readonly closeModalBtn =
    viewChild.required<ElementRef<HTMLButtonElement>>('closeModal');

  protected delete() {
    if (this.product) {
      this.productsService.delete(this.product.id).subscribe((product) => {
        this.productDeletedEvent.emit(product);
        this.closeModalBtn().nativeElement.click();
      });
    }
  }
}
