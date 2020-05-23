import { Component } from '@angular/core';

@Component({
    selector: 'swe-nav-search',
    templateUrl: './nav-search.component.html',
    styleUrls: ['./nav-search.component.scss'],
})
export class NavSearchComponent {
    nachname = '';

    constructor() {
        console.log('NavSearchComponent.constructor()');
    }
}
