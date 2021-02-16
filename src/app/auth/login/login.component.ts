import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
  });
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService
        .login(email.toLowerCase(), password)
        .subscribe(data => {
          if(data) {
            this.toastr.success('Login is Succesful');
            this.router.navigate(['/']);
          } else {
            this.toastr.error('Please enter valid credentials');
          }
            },
            error => {
                this.toastr.error(error);
            }
        );
}

}
