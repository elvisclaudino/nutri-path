import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, MdbCheckboxModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
