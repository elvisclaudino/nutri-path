import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, MdbCheckboxModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
