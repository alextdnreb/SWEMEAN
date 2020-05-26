import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
/**
 * Komponente f&uuml;r das Tag <code>swe-details-nachname</code>
 */
@Component({
    selector: 'swe-details-homepage',
    templateUrl: './details-homepage.component.html',
})
export class DetailsHomepageComponent implements OnInit {
    @Input()
    readonly homepage: string;

    ngOnInit() {
        console.log(`DetailsNachnameComponent.homepage=${this.homepage}`);
    }
}
