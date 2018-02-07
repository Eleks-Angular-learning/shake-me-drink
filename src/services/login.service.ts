import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  constructor (private http: HttpClient) {}

  loggedIn = false;

  isAuthenticated () {
    return this.loggedIn;
  }

  login (data) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.loggedIn = true;
        resolve(data);
      }, 2000);
    });
  }
}
