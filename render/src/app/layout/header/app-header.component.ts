import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})

export class AppHeaderComponent implements OnInit {
    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    back() {
        this.location.back();
    }
}
