import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Komponente f&uuml;r die Navigationsleiste mit dem Tag &lt;hs-nav&gt;.
 */
@Component({
    selector: 'swe-nav',
    templateUrl: './nav.component.html',
})
export class NavComponent {
    constructor(public dialog: MatDialog) {
        console.log('NavComponent.constructor()');
    }
}
