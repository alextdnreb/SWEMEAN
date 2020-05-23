import { Component, Input } from '@angular/core';
import { Kunde } from '../../shared/kunde';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>swe-stammdaten</code>
 */
@Component({
    selector: 'swe-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <swe-details-stammdaten [kunde]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunde!: Kunde;

    ngOnInit() {
        console.log('DetailsStammdatenComponent.kunde=', this.kunde);
    }
}
