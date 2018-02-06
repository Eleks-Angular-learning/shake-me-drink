import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import {MainPageComponent} from './main-page/main-page.component';
import {MakeCocktailComponent} from './make-cocktail/make-cocktail.component';
import {AuthGuardService} from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'search', component: SearchComponent},
      {path: 'make-cocktail', component: MakeCocktailComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
