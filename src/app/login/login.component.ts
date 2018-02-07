import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

import {config} from '../../config/firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService,
              private router: Router) { }

  // TODO: uncomment this after integration with firebase
  // formState = {
  //   email: '',
  //   password: '',
  // };

  login () {
    this.loginService.login()
      .then(() => this.redirectToMainPage());
  }

  redirectToMainPage () {
    this.router.navigate(['/']);
  }

  // TODO: uncomment this after integration with firebase
  // resetFormState () {
  //   Object.keys(this.formState).forEach(key => this.formState[key] = '');
  // }

  // TODO: uncomment this after integration with firebase
  // onFormDataChanged (event) {
  //   const {target} = event;
  //   const {id, value} = target;
  //
  //   this.formState[id] = value;
  // }

  ngOnInit () {
    if (this.loginService.isAuthenticated()) {
      this.redirectToMainPage();
    } else {
      firebase.initializeApp(config);
    }
  }

}
