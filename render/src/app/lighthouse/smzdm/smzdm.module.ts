import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { SmzdmComponent } from './components/smzdm.component';
import { SmzdmService } from './smzdm.service';
import { SmzdmItemComponent } from './components/smzdm-item.component';
import { SmzdmItemPageModalComponent } from './modals/smzdm-item-page-modal.component/SmzdmItemPageModal.component';

const routes: Routes = [
    {
        path: 'smzdm',
        children: [
            { path: '', component: SmzdmComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [
        SmzdmComponent,
        SmzdmItemComponent,
        SmzdmItemPageModalComponent
    ],
    providers: [
        SmzdmService
    ],
    entryComponents: [
        SmzdmItemPageModalComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SmzdmModule {
}
