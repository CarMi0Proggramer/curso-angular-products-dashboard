import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductCategory } from '../enums/product-category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  /*
  TODO: Implementar métodos para trabajar con el servicio
  */
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/products';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
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
