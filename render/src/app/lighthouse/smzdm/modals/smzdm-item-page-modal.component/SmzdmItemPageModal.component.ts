import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    template: `
        <div class="smzdm-item-page-modal frow">
            <webview #webview [src]="data.src"
                     class="smzdm-item-page-modal__webview"
                     [style.visible]="animating ? 'hidden' : 'visible'"></webview>
        </div>
    `,
    styles: [`
        .smzdm-item-page-modal {
            height: calc(100% + 48px);
            margin: -24px;
        }

        .smzdm-item-page-modal__webview {
            width: 99%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.Default
})

export class SmzdmItemPageModalComponent implements OnInit {
    @ViewChild('webview', { static: true }) webview: ElementRef;

    animating = true;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { src: string }) {
    }

    ngOnInit() {
        // dialog animation take 400ms to enter
        setTimeout(() => {
            // need to keep these two to make it works
            this.webview.nativeElement.style.width = '100%';
            this.webview.nativeElement.style.maxWidth = '1067px';
            this.animating = false;
        }, 500);
    }
}
