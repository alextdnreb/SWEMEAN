import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
/**
 * Komponente f&uuml;r das Tag <code>swe-details-nachname</code>
 */
@Component({
    selector: 'swe-details-nachname',
    templateUrl: './details-nachname.component.html',
})
export class DetailsNachnameComponent implements OnInit {
    @Input()
    readonly nachname: string;

    ngOnInit() {
        console.log(`DetailsNachnameComponent.nachname=${this.nachname}`);
    }
}
