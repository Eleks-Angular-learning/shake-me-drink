import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  constructor (private http: HttpClient) {}

  isAuthenticated () {
    return sessionStorage.getItem('loginData');
  }

  login (data) {
    return new Promise(resolve => {
      setTimeout(() => {
        sessionStorage.setItem('loginData', data);
        resolve(data);
      }, 2000);
    });
  }
}
