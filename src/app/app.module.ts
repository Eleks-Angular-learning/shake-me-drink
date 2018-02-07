import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CocktailComponent } from './cocktail/cocktail.component';
import { SearchComponent } from './search/search.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MakeCocktailComponent } from './make-cocktail/make-cocktail.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { CocktailsService } from '../services/cocktails.service';
import { VideoBackgroundComponent } from './video-background/video-background.component';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IngredientsComponent } from './ingredients/ingredients.component';

import { LoginService } from '../services/login.service';
import { LoaderService } from '../services/loader.service';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CocktailComponent,
    SearchComponent,
    NavBarComponent,
    MainPageComponent,
    MakeCocktailComponent,
    SearchPageComponent,
    ResultsListComponent,
    MakeCocktailComponent,
    VideoBackgroundComponent,
    LoaderComponent,
    PageNotFoundComponent,
    IngredientsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RadioButtonModule
  ],
  providers: [CocktailsService, LoginService, LoaderService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
