import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login () {
    console.error('login');
  }

}
