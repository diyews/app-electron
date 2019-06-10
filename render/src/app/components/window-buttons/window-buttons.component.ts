import { Component, OnInit } from '@angular/core';
import { Remote, BrowserWindow } from 'electron';

@Component({
    selector: 'app-window-buttons',
    templateUrl: './window-buttons.component.html',
    styleUrls:  ['./window-buttons.component.scss']
})

export class WindowButtonsComponent implements OnInit {
    remote: Remote;
    currentWindow: BrowserWindow;

    constructor() {
    }

    ngOnInit() {
        const { remote } = window.require('electron');
        this.remote = remote;
        this.currentWindow = remote.getCurrentWindow();
    }

    minimize() {
        this.currentWindow.minimize();
    }

    switchMaximize() {
        if (this.currentWindow.isMaximized()) {
            this.currentWindow.unmaximize();
        } else {
            this.currentWindow.maximize();
        }
    }

    close() {
        this.currentWindow.close();
    }
}
