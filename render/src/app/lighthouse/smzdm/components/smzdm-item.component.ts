import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { SmzdmItem } from "../smzdm.model";
import { SmzdmItemPageModalComponent } from "../modals/smzdm-item-page-modal.component/SmzdmItemPageModal.component";

@Component({
    selector: 'smzdm-item',
    templateUrl: '../views/smzdm-item.component.html',
    styleUrls: ['../styles/smzdm-item.component.scss']
})

export class SmzdmItemComponent implements OnInit {
    @Input() item: SmzdmItem;

    constructor(private matDialog: MatDialog) {
    }

    ngOnInit() {
    }

    openWebview() {
        this.matDialog.open(SmzdmItemPageModalComponent, {
            width: '80%',
            height: '90%',
            data: {
                src: this.item.article_url
            }
        })
    }
}
