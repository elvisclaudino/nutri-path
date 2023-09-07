import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormDebugComponent } from './components/form-debug/form-debug.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { FormBaseComponent } from './components/form-base/form-base.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormDebugComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormDebugComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
})
export class SharedModule {}
