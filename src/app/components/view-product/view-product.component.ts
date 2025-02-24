import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Product } from '../../store/product.model';
import { selectAllProducts } from '../../store/product.selectors';
import { ProductState } from '../../store/product.reducer';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  store = inject(Store<{ product: ProductState }>);
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.store.select(selectAllProducts).subscribe(products => {
      this.product = products.find(p => p.id === productId);
    });
  }

  goBack() {
    this.router.navigate(['/add-product']);
  }
}
