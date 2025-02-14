import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
    { path: 'view-product/:id', component: ViewProductComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
