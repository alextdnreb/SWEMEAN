import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
/**
 * Komponente f&uuml;r das Tag <code>swe-details-email</code>
 */
@Component({
    selector: 'swe-details-email',
    templateUrl: './details-email.component.html',
})
export class DetailsEmailComponent implements OnInit {
    @Input()
    readonly email: string;

    ngOnInit() {
        console.log(`DetailsEmailComponent.email=${this.email}`);
    }
}
