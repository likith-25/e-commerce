import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../store/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey = 'productState';

  constructor() {}

  private getProducts(): Product[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data).products : [];
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify({ products }));
  }

  addProduct(product: Product): Observable<Product> {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
    return of(product);
  }

  editProduct(updatedProduct: Product): Observable<Product> {
    let products = this.getProducts();
    products = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.saveProducts(products);
    return of(updatedProduct);
  }

  deleteProduct(id: number): Observable<void> {
    let products = this.getProducts();
    products = products.filter((p) => p.id !== id);
    this.saveProducts(products);
    return of(undefined);
  }
}
