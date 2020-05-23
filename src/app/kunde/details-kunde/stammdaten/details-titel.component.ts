import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>swe-details-titel</code>
 */
@Component({
    selector: 'swe-details-titel',
    templateUrl: './details-titel.component.html',
})
export class DetailsTitelComponent implements OnInit {
    @Input()
    readonly titel!: string;

    ngOnInit() {
        console.log(`DetailsTitelComponent.titel=${this.titel}`);
    }
}
