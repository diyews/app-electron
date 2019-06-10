import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmzdmModule } from './lighthouse/smzdm/smzdm.module';
import { LayoutModule } from './layout/layout.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatDialogModule,
    LayoutModule,
    SmzdmModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
