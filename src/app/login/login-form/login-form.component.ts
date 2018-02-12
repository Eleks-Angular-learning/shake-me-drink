import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() errorMessage = '';
  @Input() submitValue: 'Sign In' | 'Sign Up' = 'Sign In';

  @Output() loginAction = new EventEmitter();
  @Output() clearErrorMessage = new EventEmitter();
  @Output() createAccountAction = new EventEmitter();
  @Output() changeStateAction = new EventEmitter();

  formState = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onFormDataChanged (event) {
    const {target} = event;
    const {id, value} = target;

    this.formState[id] = value;
    this.resetErrorMessage();
  }

  resetErrorMessage () {
    this.clearErrorMessage.emit();
  }

  login () {
    this.loginAction.emit(this.formState);

    this.resetFormState();
  }

  createAccount () {
    this.createAccountAction.emit(this.formState);

    this.resetFormState();
  }

  changeState () {
    const value = this.submitValue === 'Sign In' ? 'Sign Up' : 'Sign In';

    this.resetFormState();
    this.resetErrorMessage();
    this.changeStateAction.emit(value);
  }

  resetFormState () {
    Object.keys(this.formState).forEach(key => this.formState[key] = '');
  }
}
