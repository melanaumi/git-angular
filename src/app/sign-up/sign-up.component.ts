import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  userData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    this.authService.signUp(this.userData).subscribe(
      response => {
        this.router.navigate(['/signin']);
      },
      error => {
        console.error('Sign Up Error', error);
      }
    );
  }
}
