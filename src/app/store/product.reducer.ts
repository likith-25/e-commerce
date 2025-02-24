import { createReducer, on } from '@ngrx/store';
import { addProduct, editProduct, deleteProduct } from './product.actions';
import { Product } from './product.model';

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: []
};

export const productReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => ({
    products: [...state.products, product]
  })),
  on(editProduct, (state, { product }) => ({
    products: state.products.map(p => (p.id === product.id ? product : p))
  })),
  on(deleteProduct, (state, { id }) => ({
    products: state.products.filter(p => p.id !== id)
  }))
);
