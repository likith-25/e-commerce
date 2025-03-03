import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../store/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  constructor() {}

  addProduct(product: Product): Observable<Product> {
    this.products.push(product);
    return of(product);
  }

  editProduct(updatedProduct: Product): Observable<Product> {
    this.products = this.products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    return of(updatedProduct);
  }

  deleteProduct(id: number): Observable<void> {
    this.products = this.products.filter((p) => p.id !== id);
    return of(undefined);
  }
}
