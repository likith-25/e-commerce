import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = 'admin';
  password = 'password';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/add-product']);
    } else {
      alert('Invalid Credentials');
    }
  }
}
