import { Component, Input } from '@angular/core';

@Component({
    selector: 'swe-details-kategorie',
    templateUrl: './details-kategorie.component.ts',
})
export class DetailsKategorieComponent {
    @Input()
    readonly kategorie: number;

    constructor() {
        console.log('DetailsKategorieComponent.constructor()');
    }
}
