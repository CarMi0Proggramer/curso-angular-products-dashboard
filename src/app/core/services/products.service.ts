import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductCategory } from '../enums/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  /*
  TODO: Implementar métodos para trabajar con el servicio
  */

  getAll(): Observable<Product[]> {
    throw new Error('Method not implemented.');
  }
  getById(): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<Product>): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  create(data: {
    name: string;
    category: ProductCategory;
    brand: string;
    description: string;
    price: number;
  }): Observable<Product> {
    throw new Error('Method not implemented.');
  }
}
