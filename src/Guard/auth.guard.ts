import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const authToken = this.authService.getAuthToken();
    if (!authToken) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
