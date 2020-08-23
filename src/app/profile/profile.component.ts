import { LoginService } from './../services/login.service';
import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User;
  currentPath: string;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) {
      this.currentPath = this.router.url;
    }

  ngOnInit() {
    this.loginService.currentUser.subscribe(
      data => {
        this.user = data;
      }
    );
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
