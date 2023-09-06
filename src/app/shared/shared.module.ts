import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormDebugComponent } from './components/form-debug/form-debug.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, FormDebugComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent, FormDebugComponent],
})
export class SharedModule {}
