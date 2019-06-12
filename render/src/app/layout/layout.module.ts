import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { AppHeaderComponent } from './header/app-header.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MatButtonModule, MatIconModule,

    RouterModule,
    ComponentsModule
  ],
  exports: [AppHeaderComponent],
  declarations: [AppHeaderComponent],
  providers: [],
})
export class LayoutModule {
}
