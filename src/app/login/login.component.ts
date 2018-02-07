import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {LoaderService} from '../../services/loader.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService,
              private loaderService: LoaderService,
              private router: Router) { }

  formState = {
    organizationID: '',
    username: '',
    password: '',
  };

  login () {
    this.loaderService.display(true);
    this.loginService.login(this.formState).then(response => {
      console.error('response', response);
      this.resetFormState();
      this.loaderService.display(false);
      this.redirectToMainPage();
    });
  }

  redirectToMainPage () {
    this.router.navigate(['/']);
  }

  resetFormState () {
    Object.keys(this.formState).forEach(key => this.formState[key] = '');
  }

  onFormDataChanged (event) {
    const {target} = event;
    const {id, value} = target;

    this.formState[id] = value;
  }

  ngOnInit () {
    if (this.loginService.isAuthenticated()) {
      this.redirectToMainPage();
    }
  }

}
