import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { AppHeaderComponent } from './header/app-header.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        MatButtonModule, MatIconModule,

        ComponentsModule
    ],
    exports: [AppHeaderComponent],
    declarations: [AppHeaderComponent],
    providers: [],
})
export class LayoutModule {
}
