import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { USER } from './mock.user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {
}

login(email: string, password: string) {
    return of(true)
        .pipe(map(() => {

            if(email === USER.username && password === USER.password) {
              localStorage.setItem('cn-auth-token', '123456fsdkfjds');
              return true;
            } else {
              return false
            }
        }));
}

logout(): void {
    localStorage.removeItem('cn-auth-token');
    this.router.navigate(['/auth']);

}

currentUser() {
  return localStorage.getItem('cn-auth-token')
}
}
