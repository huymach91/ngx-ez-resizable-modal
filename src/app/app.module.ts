import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxEzResizableModalModule } from './ngx-ez-resizable-modal/ngx-ez-resizable-modal.module';

@NgModule({
  imports: [BrowserModule, FormsModule, NgxEzResizableModalModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
