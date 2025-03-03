import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addProduct, editProduct, deleteProduct } from '../../store/product.actions';
import { Product } from '../../store/product.model';
import { selectAllProducts } from '../../store/product.selectors';
import { ProductState } from '../../store/product.reducer';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  store = inject(Store<{ product: ProductState }>);
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', description: '', type: '', price: 0, stock: 0 };
  isEditing = false;
  isFormOpen = false;
  viewMode: 'table' | 'card' = 'table';

  constructor(private router: Router) {
    this.store.select(selectAllProducts).subscribe(products => {
      console.log('Products in Store:', products);
      this.products = products;
    });
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
    if (!this.newProduct.name.trim() || this.newProduct.price <= 0) {
      alert('Please enter valid product details.');
      return;
    }

    if (this.isEditing) {
      this.store.dispatch(editProduct({ product: this.newProduct }));
      this.isEditing = false;
    } else {
      this.newProduct.id = new Date().getTime();
      this.store.dispatch(addProduct({ product: this.newProduct }));
    }

    this.closeForm();
  }

  editProduct(product: Product) {
    this.newProduct = { ...product }; 
    this.isEditing = true;
    this.isFormOpen = true;
  }
  
  deleteProduct(id: number) {
    console.log('Deleting product with ID:', id); 
    if (confirm('Are you sure you want to delete this product?')) {
      this.store.dispatch(deleteProduct({ id }));
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
