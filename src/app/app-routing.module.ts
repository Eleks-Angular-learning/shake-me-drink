import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {MakeCocktailComponent} from './make-cocktail/make-cocktail.component';
import {SearchPageComponent} from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {path: 'search', component: SearchPageComponent},
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
