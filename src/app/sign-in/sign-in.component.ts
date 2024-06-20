import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})

export class SignInComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  signIn() {
    this.authService.signIn(this.username, this.password).subscribe(
      response => {
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Sign In Error', error);
      }
    );
  }
}
