import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productReducer } from './app/store/product.reducer';
import { ProductEffects } from './app/store/product.effects';
import { ProductService } from './app/services/product.service';

function loadFromLocalStorage() {
  const data = localStorage.getItem('productState');
  return data ? JSON.parse(data) : { products: [] };
}

const initialState = loadFromLocalStorage();

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ product: productReducer }, { initialState }), 
    provideEffects(ProductEffects), 
    ProductService
  ],
}).catch(err => console.error(err)); 
                      