import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { WindowButtonsComponent } from './window-buttons/window-buttons.component';

@NgModule({
    imports: [
        MatButtonModule, MatIconModule
    ],
    exports: [
        WindowButtonsComponent
    ],
    declarations: [
        WindowButtonsComponent
    ],
    providers: []
})
export class ComponentsModule {
}
