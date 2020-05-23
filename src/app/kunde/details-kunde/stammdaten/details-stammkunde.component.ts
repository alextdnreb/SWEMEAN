import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>swe-details-stammkunde</code>
 */
@Component({
    selector: 'swe-details-stammkunde',
    templateUrl: './details-stammkunde.component.html',
})
export class DetailsStammkundeComponent implements OnInit {
    @Input()
    readonly stammkunde: boolean | undefined;

    ngOnInit() {
        console.log(`DetailsStammkundeComponent.lieferbar=${this.stammkunde}`);
    }
}
