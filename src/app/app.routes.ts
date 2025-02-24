import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'view-product/:id', component: ViewProductComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
