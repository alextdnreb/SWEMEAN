import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>swe-details-interessen</code>
 */
@Component({
    selector: 'swe-details-interessen',
    templateUrl: './details-interessen.component.html',
})
export class DetailsInteressenComponent implements OnInit {
    // <swe-interessen [values]="kunde.interessen">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    readonly values!: Array<string>;

    ngOnInit() {
        console.log('DetailsInteressenComponent.values=', this.values);
    }
}
