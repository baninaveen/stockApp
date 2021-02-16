import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

import { AuthService } from '../auth/services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private _routerNavigate: Router,
    private authService: AuthService
  ) {
  }

  canActivate(): boolean {
    // const token = localStorage.getItem('cn-auth-token');
    
    const token = this.authService.currentUser();
    if (token) {
      return true;
    }

    this._routerNavigate.navigate(['/auth']);
    return false;
  }
}
