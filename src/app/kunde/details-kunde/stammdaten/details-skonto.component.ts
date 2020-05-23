import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>swe-details-skonto</code>
 */
@Component({
    selector: 'swe-details-skonto',
    templateUrl: './details-skonto.component.html',
})
export class DetailsSkontoComponent implements OnInit {
    @Input()
    readonly skonto!: number | '';

    ngOnInit() {
        console.log(`DetailsSkontoComponent.rabatt=${this.skonto}`);
    }
}
