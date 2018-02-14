import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {MakeCocktailComponent} from './make-cocktail/make-cocktail.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {CocktailPageComponent} from './cocktail-page/cocktail-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'make-cocktail', component: MakeCocktailComponent},
      {path: 'cocktail', children: [{path: ':id', component: CocktailPageComponent}]}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
