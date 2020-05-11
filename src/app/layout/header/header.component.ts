import { Component } from '@angular/core';

@Component({
    selector: 'swe-header',
    templateUrl: './header.component.html',
    styles: [],
})
export class HeaderComponent {
    constructor() {
        console.log('HeaderComponent.constructor()');
    }
}
