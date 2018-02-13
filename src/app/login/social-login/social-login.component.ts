import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  @Output() loginAction = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  login (type: string) {
    this.loginAction.emit(type);
  }

}
