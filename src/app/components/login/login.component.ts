import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) return;

    if (this.username === 'admin' && this.password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/add-product']);
    } else {
      alert('Invalid Credentials');
      form.resetForm();
    }
  }
}
