import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-details-bearbeiten',
    templateUrl: './details-bearbeiten.component.html',
})
export class DetailsBearbeitenComponent implements OnInit {
    @Input()
    readonly id: string | undefined;

    ngOnInit() {
        console.log(`DetailsBearbeitenComponent.id=${this.id}`);
    }
}
