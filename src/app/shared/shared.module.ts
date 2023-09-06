import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormDebugComponent } from './components/form-debug/form-debug.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { FormBaseComponent } from './components/form-base/form-base.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormDebugComponent,
    ErrorMsgComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormDebugComponent,
    ErrorMsgComponent,
  ],
})
export class SharedModule {}
