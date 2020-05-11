import { Component } from '@angular/core';

@Component({
    selector: 'swe-home',
    templateUrl: './home.component.html',
    styles: [],
})
export class HomeComponent {
    constructor() {
        console.log('HomeComponent.Constructor()');
    }
}
