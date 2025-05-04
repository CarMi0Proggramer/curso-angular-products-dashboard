import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductCategory } from '../enums/product-category';
import { HttpClient } from '@angular/common/http';

interface Filters {
  category?: string;
  searchTerm?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/products';

  getAll(filters?: Filters): Observable<Product[]> {
    const params: Record<string, any> = {};

    if (filters) {
      const { category, searchTerm } = filters;

      if (category) params['category'] = category;
      if (searchTerm) params['name'] = searchTerm;
    }

    return this.http.get<Product[]>(this.baseUrl, {
      params,
    });
  }
  getById(): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }
  update(id: string, data: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, data);
  }
  create(data: {
    name: string;
    category: ProductCategory;
    brand: string;
    description: string;
    price: number;
  }): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, data);
  }
}
