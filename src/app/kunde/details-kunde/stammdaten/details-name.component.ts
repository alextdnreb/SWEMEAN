import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
/**
 * Komponente f&uuml;r das Tag <code>swe-details-name</code>
 */
@Component({
    selector: 'swe-details-name',
    templateUrl: './details-name.component.html',
})
export class DetailsNameComponent implements OnInit {
    @Input()
    readonly name: string;

    ngOnInit() {
        console.log(`DetailsNameComponent.name=${this.name}`);
    }
}
