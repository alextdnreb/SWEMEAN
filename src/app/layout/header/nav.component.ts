import { Component } from '@angular/core';

/**
 * Komponente f&uuml;r die Navigationsleiste mit dem Tag &lt;hs-nav&gt;.
 */
@Component({
    selector: 'swe-nav',
    templateUrl: './nav.component.html',
})
export class NavComponent {
    constructor() {
        console.log('NavComponent.constructor()');
    }
}
