import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-details-schlagwoerter',
    templateUrl: './details-schlagwoerter.component.html',
})
export class DetailsSchlagwoerterComponent implements OnInit {
    // <swe-schlagwoerter [values]="kunde.schlagwoerter">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    readonly values!: Array<string>;

    ngOnInit() {
        console.log('DetailsSchlagwoerterComponent.values=', this.values);
    }
}
