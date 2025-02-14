import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Input() product: any = { name: '', description: '', type: '', price: '', stock: '' };
  @Output() saveProduct = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  submitForm() {
    this.saveProduct.emit(this.product);
  }
}
