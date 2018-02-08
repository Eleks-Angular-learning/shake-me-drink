import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: any = {};

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit () {
    this.user = this.loginService.user;
  }

  logout () {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
