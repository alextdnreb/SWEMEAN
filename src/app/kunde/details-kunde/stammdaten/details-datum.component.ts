import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-datum</code>
 */
@Component({
    selector: 'swe-details-datum',
    templateUrl: './details-datum.component.html',
})
export class DetailsDatumComponent implements OnInit {
    @Input()
    readonly formatted!: string;

    ngOnInit() {
        console.log(`DetailsDatumComponent: formatted=${this.formatted}`);
    }
}
