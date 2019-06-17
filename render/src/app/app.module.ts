import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmzdmModule } from './lighthouse/smzdm/smzdm.module';
import { LayoutModule } from './layout/layout.module';
import { MatDialogModule } from '@angular/material';
import { HomeModule } from './lighthouse/home/home.module';
import { ZhihuModule } from './lighthouse/zhihu/zhihu.module';

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
    HomeModule,
    SmzdmModule,
    ZhihuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
