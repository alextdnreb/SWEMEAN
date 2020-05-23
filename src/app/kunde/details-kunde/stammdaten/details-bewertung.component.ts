import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-bewertung</code>
 */
@Component({
    selector: 'swe-details-bewertung',
    templateUrl: './details-bewertung.component.html',
})
export class DetailsBewertungComponent implements OnInit {
    @Input()
    readonly ratingArray: Array<boolean> | undefined;

    ngOnInit() {
        console.log('DetailsBewertungComponent.ratingArray=', this.ratingArray);
    }
}
