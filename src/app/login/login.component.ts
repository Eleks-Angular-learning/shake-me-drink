import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FirebaseService } from '../../services/firebase.service';

import { config } from '../../config/firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private loginService: LoginService,
    private firebase: FirebaseService
  ) { }

  // TODO: uncomment this after integration with firebase
  // formState = {
  //   email: '',
  //   password: '',
  // };

  login () {
    this.loginService.login()
      .then(this.redirectToMainPage.bind(this));
  }

  redirectToMainPage () {
    this.location.go('/');
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
    const firebaseRef = this.firebase.getRef();
    if (this.loginService.isAuthenticated()) {
      this.redirectToMainPage();
    } else {
      firebaseRef.initializeApp(config);
    }
  }
}
