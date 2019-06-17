import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { AwayBottomDirective } from './directives/away-bottom.directive';

@NgModule({
  declarations: [
    AwayBottomDirective,
  ],
  imports: [
    CommonModule,

    MatInputModule,
    MatDialogModule,
    MatButtonModule,

    LayoutModule,
  ],
  exports: [
    CommonModule,

    MatInputModule,
    MatDialogModule,
    MatButtonModule,

    LayoutModule,
    
    AwayBottomDirective,
  ],
})
export class SharedModule {
}
