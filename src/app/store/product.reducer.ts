import { createReducer, on } from '@ngrx/store';
import { addProduct, editProduct, deleteProduct } from './product.actions';
import { Product } from './product.model';

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = { products: [] };

function saveToLocalStorage(state: ProductState) {
  localStorage.setItem('productState', JSON.stringify(state));
}

export const productReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => {
    const newState = { products: [...state.products, product] };
    saveToLocalStorage(newState);
    return newState;
  }),
  on(editProduct, (state, { product }) => {
    const newState = { products: state.products.map(p => (p.id === product.id ? product : p)) };
    saveToLocalStorage(newState);
    return newState;
  }),
  on(deleteProduct, (state, { id }) => {
    const newState = { products: state.products.filter(p => p.id !== id) };
    saveToLocalStorage(newState); 
    return newState;
  })
);
