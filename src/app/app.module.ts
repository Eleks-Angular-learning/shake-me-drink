import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgDragDropModule } from 'ng-drag-drop';
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
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageService } from '../services/message.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CocktailPageComponent } from './cocktail-page/cocktail-page.component';
import { SortPipe } from '../pipes/sort.pipe';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SocialLoginComponent } from './login/social-login/social-login.component';
import { HomeComponent } from './home/home.component';

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
    IngredientsComponent,
    CocktailPageComponent,
    SortPipe,
    LoginFormComponent,
    SocialLoginComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RadioButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    CocktailsService,
    LoginService,
    LoaderService,
    AuthGuardService,
    MessageService,
    HttpErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
