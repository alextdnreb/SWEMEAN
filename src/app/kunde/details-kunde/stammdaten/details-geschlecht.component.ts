import { Component, Input } from '@angular/core';
import { Geschlecht } from '../../shared/kunde';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>swe-details-geschlecht</code>
 */
@Component({
    selector: 'swe-details-geschlecht',
    templateUrl: './details-geschlecht.component.html',
})
export class DetailsGeschlechtComponent implements OnInit {
    // <swe-geschlecht [values]="kunde.geschlecht">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    readonly geschlecht!: Geschlecht;

    ngOnInit() {
        console.log('DetailsGeschlechtComponent.values=', this.geschlecht);
    }
}
