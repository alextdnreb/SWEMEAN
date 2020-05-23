import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
/**
 * Komponente f&uuml;r das Tag <code>swe-details-kundennummer</code>
 */
@Component({
    selector: 'swe-details-kundennummer',
    templateUrl: './details-kundennummer.component.html',
})
export class DetailsKundennummerComponent implements OnInit {
    @Input()
    readonly kundennummer: string;

    ngOnInit() {
        console.log(
            `DetailsKundennummerComponent.kundennummer=${this.kundennummer}`,
        );
    }
}
