import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: any = {};

  constructor(private loginService: LoginService) {
    this.user = this.loginService.getUser();
  }

  ngOnInit () {
    this.loginService.userDataChanges$.subscribe((user: any) => {
      this.user.displayName = user.displayName;
    });
  }
}
