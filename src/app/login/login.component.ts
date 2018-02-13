import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService,
              private router: Router) { }

  errorMessage = '';
  submitValue = 'Sign In';

  onChangeState (event) {
    console.error('onchangeState', event);
    this.submitValue = event;
  }

  onClearErrorMessage () {
    this.errorMessage = '';
  }

  onCreateAccount ({email, password}) {
    console.error('onCreateAccount', email, password);

    this.loginService.createAccount(email, password)
      .then(data => {
        console.error('onCreateAccount component data', data);
        this.redirectToMainPage();
      })
      .catch(error => {
        console.error('onCreateAccount component error', error);
        this.errorMessage = error;
      });
  }

  onLogin ({email, password}) {
    this.loginService.login(email, password)
      .then(data => {
        console.error('login component data', data);
        this.redirectToMainPage();
      })
      .catch(error => {
        console.error('login component error', error);
        this.errorMessage = error;
      });
  }

  onSocialLogin (type) {
    this.loginService.socialLogin(type)
      .then(() => this.redirectToMainPage());
  }

  redirectToMainPage () {
    this.router.navigate(['/']);
  }

  ngOnInit () {
    if (this.loginService.isAuthenticated()) {
      this.redirectToMainPage();
    }
  }
}
