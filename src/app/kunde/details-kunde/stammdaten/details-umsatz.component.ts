import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>swe-details-umsatz</code>
 */
@Component({
    selector: 'swe-details-umsatz',
    templateUrl: './details-umsatz.component.html',
})
export class DetailsUmsatzComponent implements OnInit {
    @Input()
    readonly umsatz!: number | '';

    ngOnInit() {
        console.log(`DetailsUmsatzComponent.umsatz=${this.umsatz}`);
    }
}
