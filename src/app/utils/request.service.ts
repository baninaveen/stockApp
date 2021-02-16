import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { RequestModel } from './request.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  request(
    options: RequestModel,
    accept = 'application/json',
  ) {

    let header: HttpHeaders = new HttpHeaders({
      Accept: `${accept}`,
      'Content-Type': 'application/json',
    });;
    
    return this.apiCall(options, header).pipe(
      map(res => {
        if (options.method != 'get') {
        }
        return res;
      }),
      catchError(error => this.handleError(error))
    );
  }
  apiCall(options: RequestModel, header) {
    switch (options.method) {
      case 'get': {
        return this.httpClient.get(`${environment.base_url}${options.url}`, {
          headers: header,
        });
        break;
      }
      case 'post': {
        return this.httpClient.post(
          `${environment.base_url}${options.url}`,
          options.payload,

          { headers: header }
        );
        break;
      }
      case 'put': {
        return this.httpClient.put(
          `${environment.base_url}${options.url}`,
          options.payload,
          { headers: header }
        );
        break;
      }
      case 'delete': {
        return this.httpClient.delete(`${environment.base_url}${options.url}`, {
          headers: header,
        });
        break;
      }
      default: {
        return null;
      }
    }
  }
  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400: {
        if (error.error.message) {
          this.toastr.error(`${error.error.message} `);
        } else {
          return EMPTY;
        }
      }
      case 403: {
        console.error('403 occured');
        this.toastr.error(`${error.error.message}`);
        this.redirectTologinScreen();
        return EMPTY;
      }
      case 404: {
        console.error('404 occured');
        return EMPTY;
      }
      case 500: {
        const message = error.error.message
          ? error.error.message
          : 'Internal Server Error';
        this.toastr.error(message, '');
        return EMPTY;
      }
    }
  }
  showMessage(res) {
    if (res.message != undefined) {
      const message = res.message ? res.message : 'Success';
      this.toastr.success(message);
    }
  }

  redirectTologinScreen(){
    localStorage.removeItem('cn-user-token');
    this.router.navigate(['/auth/login']);
  }
}
