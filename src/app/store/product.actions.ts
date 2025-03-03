import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

export const loadProducts = createAction('[Product] Load');
export const loadProductsSuccess = createAction('[Product] Load Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product] Load Failure', props<{ error: string }>());

export const addProduct = createAction('[Product] Add', props<{ product: Product }>());
export const addProductSuccess = createAction('[Product] Add Success', props<{ product: Product }>());
export const addProductFailure = createAction('[Product] Add Failure', props<{ error: string }>());

export const editProduct = createAction('[Product] Edit', props<{ product: Product }>());
export const editProductSuccess = createAction('[Product] Edit Success', props<{ product: Product }>());
export const editProductFailure = createAction('[Product] Edit Failure', props<{ error: string }>());

export const deleteProduct = createAction('[Product] Delete', props<{ id: number }>());
export const deleteProductSuccess = createAction('[Product] Delete Success', props<{ id: number }>());
export const deleteProductFailure = createAction('[Product] Delete Failure', props<{ error: string }>());
