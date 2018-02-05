import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';
import { CocktailComponent } from './cocktail/cocktail.component';

@NgModule({
  declarations: [
    AppComponent,
    CocktailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
