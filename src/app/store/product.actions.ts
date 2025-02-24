import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

export const addProduct = createAction(
  '[Product] Add',
  props<{ product: Product }>()
);

export const editProduct = createAction(
  '[Product] Edit',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product] Delete',
  props<{ id: number }>()
);
