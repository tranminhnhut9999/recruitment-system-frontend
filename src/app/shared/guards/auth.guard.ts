import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated by verifying the presence of a JWT token
    console.log("Logged in:" + this.authService.isLoggedIn() );

    if (this.authService.isLoggedIn()) {
      return true; // Allow access to the route
    } else {
      // If not authenticated, redirect the user to the login page
      this.router.navigate(['login']);
      return false;
    }
  }
}
