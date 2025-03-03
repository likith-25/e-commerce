import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProductService } from '../services/product.service';
import {
  addProduct,
  addProductSuccess,
  addProductFailure,
  editProduct,
  editProductSuccess,
  editProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from './product.model';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService  ) {}

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      mergeMap((action) =>
        this.productService.addProduct(action.product).pipe(
          map((product: Product) => addProductSuccess({ product })),
          catchError((error) => of(addProductFailure({ error: error.message })))
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct),
      mergeMap((action) =>
        this.productService.editProduct(action.product).pipe(
          map((product: Product) => editProductSuccess({ product })),
          catchError((error) => of(editProductFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          map(() => deleteProductSuccess({ id: action.id })),
          catchError((error) => of(deleteProductFailure({ error: error.message })))
        )
      )
    )
  );
}
