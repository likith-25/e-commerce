import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  product: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    const productId = this.route.snapshot.paramMap.get('id');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    this.product = products.find((p: any) => p.id == productId);
  }

  goBack() {
    this.router.navigate(['/add-product']);
  }
}
