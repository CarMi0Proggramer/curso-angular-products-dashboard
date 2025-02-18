import { ProductCategory } from '../enums/product-category';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  description: string;
  price: number;
}
