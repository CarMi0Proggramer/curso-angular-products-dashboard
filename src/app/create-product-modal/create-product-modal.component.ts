import {
  Component,
  ElementRef,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCategory } from '../core/enums/product-category';
import { ProductsService } from '../core/services/products.service';
import { Product } from '../core/interfaces/product';

@Component({
  selector: 'app-create-product-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product-modal.component.html',
})
export class CreateProductModalComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);
  private readonly closeModalBtn =
    viewChild.required<ElementRef<HTMLButtonElement>>('closeModal');

  productCreatedEvent = output<Product>();

  protected form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(25)]],
    brand: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    category: [''],
  });

  hasErrors(fieldName: string, errorType: string) {
    const field = this.form.get(fieldName);

    if (field) {
      return field.hasError(errorType) && field.touched;
    }

    return false;
  }

  onSubmit() {
    if (this.form.valid) {
      const { name, description, brand, category, price } = this.form.value;

      this.productsService
        .create({
          name: name!,
          price: price!,
          description: description!,
          brand: brand!,
          category: category as ProductCategory,
        })
        .subscribe((product) => {
          this.productCreatedEvent.emit(product);
          this.closeModalBtn().nativeElement.click();
        });
    }
  }
}
