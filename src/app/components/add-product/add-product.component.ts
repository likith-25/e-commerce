import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ViewProductComponent } from '../view-product/view-product.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent, ProductListComponent, ViewProductComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  products: any[] = [];
  newProduct: any = { id: 0, name: '', description: '', type: '', price: 0, stock: 0 };
  isEditing = false;
  viewMode: 'table' | 'card' = 'table';

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  resetForm() {
    this.isEditing = false;
    this.newProduct = { id: 0, name: '', description: '', type: '', price: 0, stock: 0 };
  }

  addProduct() {
    if (this.isEditing) {
      const index = this.products.findIndex(p => p.id === this.newProduct.id);
      this.products[index] = { ...this.newProduct };
      this.isEditing = false;
    } else {
      this.newProduct.id = new Date().getTime();
      this.products.push({ ...this.newProduct });
    }
    localStorage.setItem('products', JSON.stringify(this.products));
    this.resetForm();
  }

  editProduct(index: number) {
    this.newProduct = { ...this.products[index] };
    this.isEditing = true;
  }

  deleteProduct(index: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  toggleView(view: 'table' | 'card') {
    this.viewMode = view;
  }
}
