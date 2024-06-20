import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {
  userId: string;
  userProfile: any;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.authService.getUserProfile(this.userId).subscribe(
      profile => {
        this.userProfile = profile;
      },
      error => {
        console.error('Profile Fetch Error', error);
      }
    );
  }
}

