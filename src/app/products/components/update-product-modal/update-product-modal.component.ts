import {
  Component,
  ElementRef,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { ProductsService } from '@core/services/products.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '@shared/interfaces/product';

@Component({
  selector: 'app-update-product-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-product-modal.component.html',
})
export class UpdateProductModalComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);
  private readonly closeModalBtn =
    viewChild.required<ElementRef<HTMLButtonElement>>('closeModal');

  productUpdatedEvent = output<Product>();

  protected form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(25)]],
    brand: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    category: [''],
  });

  protected product?: Product;

  setProduct(product: Product) {
    this.product = product;
    this.loadForm();
  }

  private loadForm() {
    this.form.patchValue({
      ...this.product,
    });
  }

  protected hasErrors(fieldName: string, errorType: string) {
    const field = this.form.get(fieldName);

    if (field) {
      return field.hasError(errorType) && field.touched;
    }

    return false;
  }

  protected onSubmit() {
    if (this.form.valid && this.product) {
      this.productsService
        .update(this.product.id, this.form.value as Partial<Product>)
        .subscribe((product) => {
          this.productUpdatedEvent.emit(product);
          this.closeModalBtn().nativeElement.click();
        });
    }
  }
}
