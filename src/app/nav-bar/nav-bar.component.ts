import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userData$: Observable<any>;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit () {
    this.userData$ = this.loginService.userDataChanges;
  }
}
