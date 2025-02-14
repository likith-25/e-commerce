import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storageKey = 'products';

  getProducts() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addProduct(product: any) {
    let products = this.getProducts();
    product.id = new Date().getTime();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  updateProduct(updatedProduct: any) {
    let products = this.getProducts();
    products = products.map((p: any) => (p.id === updatedProduct.id ? updatedProduct : p));
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  deleteProduct(id: number) {
    let products = this.getProducts().filter((p: any) => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  getProductById(id: number) {
    return this.getProducts().find((p: any) => p.id === id);
  }
}
