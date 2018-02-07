import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CocktailComponent } from './cocktail/cocktail.component';
import { SearchComponent } from './search/search.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FilterCocktailsPipe } from '../pipes/filter-cocktails.pipe';
import { MainPageComponent } from './main-page/main-page.component';
import { MakeCocktailComponent } from './make-cocktail/make-cocktail.component';
import { VideoBackgroundComponent } from './video-background/video-background.component';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginService } from '../services/login.service';
import { LoaderService } from '../services/loader.service';
import { FirebaseService } from '../services/firebase.service';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CocktailComponent,
    SearchComponent,
    NavBarComponent,
    FilterCocktailsPipe,
    MainPageComponent,
    MakeCocktailComponent,
    VideoBackgroundComponent,
    LoaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CardModule
  ],
  providers: [
    LoginService,
    LoaderService,
    AuthGuardService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
