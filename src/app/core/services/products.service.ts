import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '@shared/interfaces/product';
import { ProductCategory } from '@shared/enums/product-category';
import { ApiResponse } from '@shared/interfaces/api-response';

interface Filters {
  category?: string;
  searchTerm?: string;
  page: number;
  perPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/products';

  getAll(filters: Filters): Observable<ApiResponse<Product>> {
    const params: Record<string, any> = {};

    const { category, searchTerm, page, perPage } = filters;

    params['_page'] = page;
    params['_per_page'] = perPage;
    if (category) params['category'] = category;
    if (searchTerm) params['name'] = searchTerm;

    return this.http.get<ApiResponse<Product>>(this.baseUrl, {
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
