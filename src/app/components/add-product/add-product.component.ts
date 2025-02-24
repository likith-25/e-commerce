import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  products: any[] = [];
  newProduct: any = { id: 0, name: '', description: '', type: '', price: 0, stock: 0 };
  isEditing = false;
  isFormOpen = false;
  viewMode: 'table' | 'card' = 'table';

  constructor(private router: Router) {
    this.loadProducts();
  }

  loadProducts() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  openForm() {
    this.isEditing = false;
    this.isFormOpen = true;
    this.newProduct = { id: 0, name: '', description: '', type: '', price: 0, stock: 0 };
  }

  closeForm() {
    this.isFormOpen = false;
  }

  addProduct() {
    if (this.newProduct.name.trim() === '' || this.newProduct.price <= 0) {
      alert("Please enter valid product details.");
      return;
    }

    if (this.isEditing) {
      const index = this.products.findIndex(p => p.id === this.newProduct.id);
      this.products[index] = { ...this.newProduct };
      this.isEditing = false;
    } else {
      this.newProduct.id = new Date().getTime();
      this.products.push({ ...this.newProduct });
    }

    localStorage.setItem('products', JSON.stringify(this.products));
    this.closeForm();
  }

  editProduct(index: number) {
    this.newProduct = { ...this.products[index] };
    this.isEditing = true;
    this.isFormOpen = true;
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

  navigateToViewProduct(productId: number) {
    this.router.navigate(['/view-product', productId]);
  }

  logout() {
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/login']);
  }
}
