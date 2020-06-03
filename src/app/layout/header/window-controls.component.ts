import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'swe-window-controls',
    templateUrl: './window-controls.component.html',
    styleUrls: ['./window-controls.component.scss'],
})
export class WindowControlsComponent implements OnInit {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    preloaded: any | undefined;
    constructor() {
        console.log('WindowControls.constructor()');
    }

    ngOnInit() {
        this.preloaded =
            typeof window.preloaded === 'undefined'
                ? undefined
                : window.preloaded;
    }

    onClose() {
        if (this.preloaded !== undefined) {
            this.preloaded.close();
        }
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

    onMinimize() {
        if (this.preloaded !== undefined) {
            this.preloaded.minimize();
        }
    }
}
