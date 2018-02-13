import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnChanges {
  @Input() errorMessage = '';
  @Input() userData = {email: ''};
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

  ngOnChanges() {
    if (this.userData && this.userData.email) {
      this.formState.email = this.userData.email;
    }
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

  get value () {
    return this.submitValue === 'Sign In' ? 'Sign Up' : 'Sign In';
  }
  createAccount () {
    this.createAccountAction.emit(this.formState);

    this.resetFormState();
    this.changeStateAction.emit(this.value);
  }

  changeState () {
    this.resetFormState();
    this.resetErrorMessage();
    this.changeStateAction.emit(this.value);
  }

  resetFormState () {
    Object.keys(this.formState).forEach(key => this.formState[key] = '');
  }
}
