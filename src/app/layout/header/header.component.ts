import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'swe-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    private preloaded: any | undefined;

    constructor() {
        console.log('HeaderComponent.constructor()');
    }

    ngOnInit() {
        this.preloaded =
            typeof window.preloaded === 'undefined'
                ? undefined
                : window.preloaded;
    }

    onMaximize() {
        if (this.preloaded !== undefined) {
            if (this.preloaded.isMaximized() === true) {
                this.preloaded.unmaximize();
            } else {
                this.preloaded.maximize();
            }
        }
    }
}
